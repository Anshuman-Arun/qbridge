-- ============================================================
-- Math Phase 3 Matrices Lesson — SQL Insert
-- Run this in the Supabase SQL Editor.
-- Populates quizzes for:
--   1. matrices
-- 
-- IMPORTANT: 
-- 1. Backslashes in question_text must be doubled (\\) for SQL.
-- 2. Backslashes in options (JSONB) must be quadrupled (\\\\) 
-- ============================================================

DO $$
DECLARE
  v_math_id uuid;
  v_mat_id uuid;
BEGIN
  -- 1. Find Course ID
  SELECT id INTO v_math_id
  FROM public.courses
  WHERE slug = 'mathematics'
  LIMIT 1;

  IF v_math_id IS NULL THEN
    RAISE EXCEPTION 'Course with slug "mathematics" not found. Did you run the revamp migration?';
  END IF;

  -- 2. Find Matrices Module
  SELECT id INTO v_mat_id FROM public.modules WHERE slug = 'matrices' LIMIT 1;

  IF v_mat_id IS NULL THEN
    RAISE EXCEPTION 'matrices module missing. Run the revamp migration first.';
  END IF;

  -- ==========================================
  -- QUIZ: Matrices (v_mat_id)
  -- ==========================================
  DELETE FROM public.quiz_questions WHERE module_id = v_mat_id;

  INSERT INTO public.quiz_questions (module_id, question_type, question_text, options, correct_answer, tags, order_index, points, is_final_test)
  VALUES 
  (v_mat_id, 'multiple_choice', 'What is the simplest mathematical definition of a matrix?', '["A single variable like $X$", "A straight line on a graph", "A rectangular grid or table of ordered numbers", "A standard equation"]', 'C', ARRAY['matrices', 'vocabulary'], 1, 1, false),
  (v_mat_id, 'multiple_choice', 'True or False: Vectors are technically just special, single-column matrices.', '["True", "False"]', 'A', ARRAY['matrices', 'vectors', 'vocabulary'], 2, 1, false),
  (v_mat_id, 'multiple_choice', 'The size of a matrix is described by its dimensions, which means knowing the number of:', '["Squares and Triangles", "Roots and Powers", "X and Y intercepts", "Rows and Columns"]', 'D', ARRAY['matrices', 'dimensions', 'vocabulary'], 3, 1, false),
  (v_mat_id, 'multiple_choice', 'In order to add or subtract two matrices together, what must be absolutely true about them?', '["They must contain only positive numbers", "They must be multiplied by a scalar first", "They must have the exact same dimensions", "They must have a zero in the top left"]', 'C', ARRAY['matrices', 'arithmetic', 'vocabulary'], 4, 1, false),
  (v_mat_id, 'multiple_choice', 'Calculate the following matrix addition: $\\\\begin{bmatrix} 2 & 1 \\\\\\\\ 3 & 4 \\\\end{bmatrix} + \\\\begin{bmatrix} 1 & 0 \\\\\\\\ 2 & 1 \\\\end{bmatrix}$', '["$\\begin{bmatrix} 3 & 1 \\\\\\\\ 5 & 5 \\end{bmatrix}$", "$\\begin{bmatrix} 2 & 1 \\\\\\\\ 5 & 5 \\end{bmatrix}$", "$\\begin{bmatrix} 3 & 0 \\\\\\\\ 6 & 4 \\end{bmatrix}$", "$\\begin{bmatrix} 1 & 1 \\\\\\\\ 1 & 3 \\end{bmatrix}$"]', 'A', ARRAY['matrices', 'arithmetic', 'calculation'], 5, 1, false),
  (v_mat_id, 'multiple_choice', 'What is the result of subtracting $\\\\begin{bmatrix} 5 & 6 \\\\\\\\ 7 & 8 \\\\end{bmatrix} - \\\\begin{bmatrix} 1 & 2 \\\\\\\\ 3 & 4 \\\\end{bmatrix}$?', '["$\\begin{bmatrix} 4 & 4 \\\\\\\\ 4 & 4 \\end{bmatrix}$", "$\\begin{bmatrix} 6 & 8 \\\\\\\\ 10 & 12 \\end{bmatrix}$", "$\\begin{bmatrix} -4 & -4 \\\\\\\\ -4 & -4 \\end{bmatrix}$", "$\\begin{bmatrix} 4 & 4 \\\\\\\\ 10 & 12 \\end{bmatrix}$"]', 'A', ARRAY['matrices', 'arithmetic', 'calculation'], 6, 1, false),
  (v_mat_id, 'multiple_choice', 'When multiplying a matrix by a regular number (a scalar), what do you do with that scalar?', '["Multiply it only by the top-left component", "Multiply it only by the bottom row", "Multiply it by every single component inside the matrix", "Add it to every single component instead"]', 'C', ARRAY['matrices', 'scalars', 'vocabulary'], 7, 1, false),
  (v_mat_id, 'multiple_choice', 'What is $3 \\times \\\\begin{bmatrix} 1 & 2 \\\\\\\\ 0 & 4 \\\\end{bmatrix}$?', '["$\\begin{bmatrix} 4 & 5 \\\\\\\\ 3 & 7 \\end{bmatrix}$", "$\\begin{bmatrix} 3 & 6 \\\\\\\\ 0 & 12 \\end{bmatrix}$", "$\\begin{bmatrix} 3 & 2 \\\\\\\\ 0 & 4 \\end{bmatrix}$", "$\\begin{bmatrix} 3 & 6 \\\\\\\\ 3 & 12 \\end{bmatrix}$"]', 'B', ARRAY['matrices', 'scalars', 'calculation', 'hard'], 8, 1, false),
  (v_mat_id, 'multiple_choice', 'Unlike addition, multiplying a matrix by a vector uses what specific process?', '["Component by Component", "Diagonal Addition", "The \"Row by Column\" Method", "Matrix Splitting"]', 'C', ARRAY['matrices', 'multiplication', 'vocabulary', 'hard'], 9, 1, false),
  (v_mat_id, 'multiple_choice', 'If you try to add a $2 \\times 2$ matrix to a $3 \\times 3$ matrix, what happens?', '["Information turns into $0s$", "A $5 \\times 5$ matrix forms", "The matching components add appropriately", "It''s mathematically impossible/you get an error"]', 'D', ARRAY['matrices', 'arithmetic', 'conceptual', 'hard'], 10, 1, false);

  RAISE NOTICE 'Successfully inserted fixed 10 questions for Matrices.';
END $$;
