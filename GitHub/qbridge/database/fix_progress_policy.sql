-- Add missing DELETE policy for user_progress
create policy "Users can delete their own progress."
  on public.user_progress for delete
  using ( auth.uid() = user_id );
