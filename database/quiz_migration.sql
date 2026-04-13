-- Quiz System Migration
-- Run this in the Supabase SQL Editor

-- 1. Quiz Questions (per-module, includes lesson quizzes + module final tests)
create table public.quiz_questions (
  id uuid default uuid_generate_v4() primary key,
  module_id uuid references public.modules(id) on delete cascade not null,
  question_type text check (question_type in
    ('multiple_choice', 'short_answer', 'true_false', 'python_output', 'graph_vector')) not null,
  question_text text not null,
  options jsonb,              -- MC: ["Option A", "Option B", "Option C", "Option D"]
  correct_answer text not null, -- MC: "B", SA: "answer", TF: "true"/"false", python: expected stdout, graph: "2,3"
  tags text[] not null default '{}',
  order_index integer default 0,
  points integer default 1,
  is_final_test boolean default false, -- true = belongs to module final test
  created_at timestamptz default now()
);

alter table public.quiz_questions enable row level security;
create policy "Quiz questions are viewable by everyone."
  on public.quiz_questions for select using (true);


-- 2. Quiz Attempts (one row per submission)
create table public.quiz_attempts (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  module_id uuid references public.modules(id) on delete cascade not null,
  is_final_test boolean default false,
  score integer not null,
  max_score integer not null,
  answers jsonb not null,      -- { "question_id": "user_answer" }
  completed_at timestamptz default now()
);

alter table public.quiz_attempts enable row level security;

create policy "Users can view their own quiz attempts."
  on public.quiz_attempts for select
  using (auth.uid() = user_id);

create policy "Users can insert their own quiz attempts."
  on public.quiz_attempts for insert
  with check (auth.uid() = user_id);


-- 3. Per-tag score aggregation (for profile)
create table public.quiz_scores (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  tag text not null,
  total_correct integer default 0,
  total_attempted integer default 0,
  updated_at timestamptz default now(),
  unique(user_id, tag)
);

alter table public.quiz_scores enable row level security;

create policy "Users can view their own quiz scores."
  on public.quiz_scores for select
  using (auth.uid() = user_id);

create policy "Users can insert their own quiz scores."
  on public.quiz_scores for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own quiz scores."
  on public.quiz_scores for update
  using (auth.uid() = user_id);
