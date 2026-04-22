-- Migration: course_interest table
-- Tracks users who have expressed interest in upcoming courses (e.g., Advanced Quantum Computing)

create table if not exists public.course_interest (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  course_slug text not null,
  enrolled_at timestamp with time zone default timezone('utc'::text, now()) not null,

  -- Each user can only enroll once per course
  unique(user_id, course_slug)
);

alter table public.course_interest enable row level security;

-- Only authenticated users can enroll
drop policy if exists "Users can insert their own interest." on public.course_interest;
create policy "Users can insert their own interest."
  on public.course_interest for insert
  with check (auth.uid() = user_id);

-- Users can only see their own enrollments
drop policy if exists "Users can view their own interest." on public.course_interest;
create policy "Users can view their own interest."
  on public.course_interest for select
  using (auth.uid() = user_id);

-- Users can remove their enrollment
drop policy if exists "Users can delete their own interest." on public.course_interest;
create policy "Users can delete their own interest."
  on public.course_interest for delete
  using (auth.uid() = user_id);
