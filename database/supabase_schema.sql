-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- PUBLIC PROFILES (Linked to Auth Users)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  full_name text,
  avatar_url text,
  updated_at timestamp with time zone,
  
  constraint username_length check (char_length(full_name) >= 3)
);

-- Turn on Row Level Security
alter table public.profiles enable row level security;

-- Policies for Profiles
create policy "Public profiles are viewable by everyone."
  on public.profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on public.profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on public.profiles for update
  using ( auth.uid() = id );

-- TRIGGER: Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- COURSES TABLE
create table public.courses (
  id uuid default uuid_generate_v4() primary key,
  slug text unique not null,
  title text not null,
  description text,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.courses enable row level security;
create policy "Courses are viewable by everyone." on public.courses for select using (true);


-- MODULES TABLE (Lessons/Units within a course)
create table public.modules (
  id uuid default uuid_generate_v4() primary key,
  course_id uuid references public.courses(id) on delete cascade not null,
  title text not null,
  description text,
  order_index integer not null,
  content text, -- Markdown content or JSON for rich text
  module_type text check (module_type in ('lesson', 'video', 'quiz', 'lab')) default 'lesson',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.modules enable row level security;
create policy "Modules are viewable by everyone." on public.modules for select using (true);


-- USER PROGRESS TABLE
create table public.user_progress (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  module_id uuid references public.modules(id) on delete cascade not null,
  status text check (status in ('started', 'completed')) default 'started',
  completed_at timestamp with time zone,
  
  unique(user_id, module_id)
);

alter table public.user_progress enable row level security;

create policy "Users can view their own progress."
  on public.user_progress for select
  using ( auth.uid() = user_id );

create policy "Users can update their own progress."
  on public.user_progress for insert
  with check ( auth.uid() = user_id );

create policy "Users can modify their own progress."
  on public.user_progress for update
  using ( auth.uid() = user_id );

