-- ============================================================
-- Vector Lesson Quiz — SQL Insert (LaTeX, JSON-escaped)
-- Run this in the Supabase SQL Editor AFTER the vectors module
-- exists in the `modules` table (slug = 'vectors').
--
-- IMPORTANT: 
-- 1. Backslashes in question_text must be doubled (\\) for SQL.
-- 2. Backslashes in options (JSONB) must be quadrupled (\\\\) 
--    so that they remain doubled (\\) in the stored JSON.
-- ============================================================

DO $$
DECLARE
  v_module_id uuid;
BEGIN
  SELECT id INTO v_module_id
  FROM public.modules
  WHERE slug = 'vectors'
  LIMIT 1;

  IF v_module_id IS NULL THEN
    RAISE EXCEPTION 'Module with slug "vectors" not found.';
  END IF;

  DELETE FROM public.quiz_questions WHERE module_id = v_module_id;

  -- Q1: Vector definition
  INSERT INTO public.quiz_questions
    (module_id, question_type, question_text, options, correct_answer, tags, order_index, points, is_final_test)
  VALUES (
    v_module_id, 'multiple_choice',
    'Which of the following best describes a vector?',
    '["A single number that represents size", "An ordered set of numbers called components", "A variable in an equation", "A shape drawn on a coordinate plane"]',
    'B', ARRAY['vectors', 'definition'], 1, 1, false
  );

  -- Q2: Dimension
  INSERT INTO public.quiz_questions
    (module_id, question_type, question_text, options, correct_answer, tags, order_index, points, is_final_test)
  VALUES (
    v_module_id, 'multiple_choice',
    'What is the dimension of the vector $\\begin{bmatrix} 5 \\\\ 3 \\\\ 2 \\end{bmatrix}$?',
    '["1", "2", "3", "6"]',
    'C', ARRAY['vectors', 'dimension'], 2, 1, false
  );

  -- Q3: Geometric representation
  INSERT INTO public.quiz_questions
    (module_id, question_type, question_text, options, correct_answer, tags, order_index, points, is_final_test)
  VALUES (
    v_module_id, 'multiple_choice',
    'When we graph a 2D vector, we typically draw it as:',
    '["An arrow starting at the tip and ending at the origin", "A point only, with no arrow", "An arrow with the tail at the origin and the tip at the point described by the vector", "A line segment connecting two random points"]',
    'C', ARRAY['vectors', 'geometry'], 3, 1, false
  );

  -- Q4: Vector addition
  INSERT INTO public.quiz_questions
    (module_id, question_type, question_text, options, correct_answer, tags, order_index, points, is_final_test)
  VALUES (
    v_module_id, 'multiple_choice',
    'If $\\vec{u} = \\begin{bmatrix} 2 \\\\ 1 \\end{bmatrix}$ and $\\vec{v} = \\begin{bmatrix} 1 \\\\ 1 \\end{bmatrix}$, what is $\\vec{u} + \\vec{v}$?',
    '["$\\begin{bmatrix} 2 \\\\\\\\ 1 \\end{bmatrix}$", "$\\begin{bmatrix} 3 \\\\\\\\ 2 \\end{bmatrix}$", "$\\begin{bmatrix} 1 \\\\\\\\ 0 \\end{bmatrix}$", "$\\begin{bmatrix} 3 \\\\\\\\ 1 \\end{bmatrix}$"]',
    'B', ARRAY['vectors', 'addition'], 4, 1, false
  );

  -- Q5: Graphical addition
  INSERT INTO public.quiz_questions
    (module_id, question_type, question_text, options, correct_answer, tags, order_index, points, is_final_test)
  VALUES (
    v_module_id, 'multiple_choice',
    'When adding two vectors graphically, the second vector is drawn:',
    '["Starting from the origin; the sum is their crossing point", "Starting from the tip of the first vector; the sum goes from the origin to the tip of the second vector", "Starting from the tail of the first vector, going backward", "Parallel to the first vector, then averaged"]',
    'B', ARRAY['vectors', 'addition', 'geometry'], 5, 1, false
  );

  -- Q6: Scalar multiplication
  INSERT INTO public.quiz_questions
    (module_id, question_type, question_text, options, correct_answer, tags, order_index, points, is_final_test)
  VALUES (
    v_module_id, 'multiple_choice',
    'What is $3 \\times \\begin{bmatrix} 2 \\\\ 4 \\end{bmatrix}$?',
    '["$\\begin{bmatrix} 5 \\\\\\\\ 7 \\end{bmatrix}$", "$\\begin{bmatrix} 6 \\\\\\\\ 4 \\end{bmatrix}$", "$\\begin{bmatrix} 2 \\\\\\\\ 12 \\end{bmatrix}$", "$\\begin{bmatrix} 6 \\\\\\\\ 12 \\end{bmatrix}$"]',
    'D', ARRAY['vectors', 'scalar-multiplication'], 6, 1, false
  );

  -- Q7: Scalar definition
  INSERT INTO public.quiz_questions
    (module_id, question_type, question_text, options, correct_answer, tags, order_index, points, is_final_test)
  VALUES (
    v_module_id, 'multiple_choice',
    'In the context of vectors, a \"scalar\" is:',
    '["A special type of vector with only one component", "A standard number (not a vector) used to multiply a vector", "The direction of a vector", "The sum of a vector''s components"]',
    'B', ARRAY['vectors', 'scalar-multiplication', 'definition'], 7, 1, false
  );

  -- Q8: Magnitude 2D
  INSERT INTO public.quiz_questions
    (module_id, question_type, question_text, options, correct_answer, tags, order_index, points, is_final_test)
  VALUES (
    v_module_id, 'multiple_choice',
    'What is the magnitude of $\\vec{v} = \\begin{bmatrix} 3 \\\\ 4 \\end{bmatrix}$?',
    '["7", "5", "25", "$\\sqrt{7}$"]',
    'B', ARRAY['vectors', 'magnitude'], 8, 1, false
  );

  -- Q9: Practice Problem (N-dimensional magnitude)
  INSERT INTO public.quiz_questions
    (module_id, question_type, question_text, options, correct_answer, tags, order_index, points, is_final_test)
  VALUES (
    v_module_id, 'short_answer',
    'Given the practice problem in the lesson, if $a+b = \\begin{bmatrix} 8 \\\\ 3 \\\\ 4 \\\\ 14 \\end{bmatrix}$, what is $|a+b|$?',
    NULL,
    '15', ARRAY['vectors', 'magnitude', 'higher-dimensions', 'addition'], 9, 1, false
  );

  -- Q10: Magnitude notation
  INSERT INTO public.quiz_questions
    (module_id, question_type, question_text, options, correct_answer, tags, order_index, points, is_final_test)
  VALUES (
    v_module_id, 'multiple_choice',
    'Which notation correctly represents the magnitude of a vector $\\vec{a}$?',
    '["$\\vec{a}^2$", "$|\\vec{a}|$ or $||\\vec{a}||$", "$\\hat{a}$", "$\\bar{a}$"]',
    'B', ARRAY['vectors', 'magnitude', 'notation'], 10, 1, false
  );

  RAISE NOTICE 'Successfully inserted fixed 10 questions for vectors.';
END $$;
