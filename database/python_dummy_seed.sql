-- ============================================================
-- Python Modules Dummy Quiz Seed
-- Run this in the Supabase SQL Editor.
-- ============================================================

DO $$
DECLARE
  v_mod_id uuid;
BEGIN
  -- Find Python Modules Module
  SELECT id INTO v_mod_id FROM public.modules WHERE slug = 'python-and-modules' LIMIT 1;

  IF v_mod_id IS NULL THEN
    RAISE EXCEPTION 'python-and-modules module missing. Run the revamp migration first.';
  END IF;

  -- Clear existing tests for safety
  DELETE FROM public.quiz_questions WHERE module_id = v_mod_id;

  INSERT INTO public.quiz_questions (module_id, question_type, question_text, options, correct_answer, tags, order_index, points, is_final_test)
  VALUES 
  (v_mod_id, 'multiple_choice', 'Dummy Question 1 - Select A', '["A", "B", "C", "D"]', 'A', ARRAY['dummy'], 1, 1, false),
  (v_mod_id, 'multiple_choice', 'Dummy Question 2 - Select A', '["A", "B", "C", "D"]', 'A', ARRAY['dummy'], 2, 1, false),
  (v_mod_id, 'multiple_choice', 'Dummy Question 3 - Select A', '["A", "B", "C", "D"]', 'A', ARRAY['dummy'], 3, 1, false),
  (v_mod_id, 'multiple_choice', 'Dummy Question 4 - Select A', '["A", "B", "C", "D"]', 'A', ARRAY['dummy'], 4, 1, false),
  (v_mod_id, 'multiple_choice', 'Dummy Question 5 - Select A', '["A", "B", "C", "D"]', 'A', ARRAY['dummy'], 5, 1, false),
  (v_mod_id, 'multiple_choice', 'Dummy Question 6 - Select A', '["A", "B", "C", "D"]', 'A', ARRAY['dummy'], 6, 1, false),
  (v_mod_id, 'multiple_choice', 'Dummy Question 7 - Select A', '["A", "B", "C", "D"]', 'A', ARRAY['dummy'], 7, 1, false),
  (v_mod_id, 'multiple_choice', 'Dummy Question 8 - Select A', '["A", "B", "C", "D"]', 'A', ARRAY['dummy'], 8, 1, false),
  (v_mod_id, 'multiple_choice', 'Dummy Question 9 - Select A', '["A", "B", "C", "D"]', 'A', ARRAY['dummy'], 9, 1, false),
  (v_mod_id, 'multiple_choice', 'Dummy Question 10 - Select A', '["A", "B", "C", "D"]', 'A', ARRAY['dummy'], 10, 1, false);

  RAISE NOTICE 'Successfully inserted dummy questions for Python Modules.';
END $$;
