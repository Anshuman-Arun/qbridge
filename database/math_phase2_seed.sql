-- ============================================================
-- Math Phase 2 Lessons & Quizzes — SQL Insert
-- Run this in the Supabase SQL Editor.
-- Adds 'tensor-products' module and populates quizzes for:
--   1. complex-numbers
--   2. planar-relationships (Linear Transformations)
--   3. tensor-products
-- 
-- IMPORTANT: 
-- 1. Backslashes in question_text must be doubled (\\) for SQL.
-- 2. Backslashes in options (JSONB) must be quadrupled (\\\\) 
-- ============================================================

DO $$
DECLARE
  v_math_id uuid;
  v_cn_id uuid;
  v_pr_id uuid;
  v_tp_id uuid;
BEGIN
  -- 1. Find Course ID
  SELECT id INTO v_math_id
  FROM public.courses
  WHERE slug = 'mathematics'
  LIMIT 1;

  IF v_math_id IS NULL THEN
    RAISE EXCEPTION 'Course with slug "mathematics" not found. Did you run the revamp migration?';
  END IF;

  -- 2. Insert or find 'tensor-products' and find existing ones
  SELECT id INTO v_cn_id FROM public.modules WHERE slug = 'complex-numbers' LIMIT 1;
  SELECT id INTO v_pr_id FROM public.modules WHERE slug = 'planar-relationships' LIMIT 1;

  IF v_cn_id IS NULL OR v_pr_id IS NULL THEN
    RAISE EXCEPTION 'complex-numbers or planar-relationships missing. Run the revamp migration first.';
  END IF;

  -- Insert tensor-products
  INSERT INTO public.modules (course_id, title, slug, description, order_index, module_type)
  VALUES (v_math_id, 'Tensor Products', 'tensor-products', 'Combining multiple mathematical systems.', 5, 'lesson')
  ON CONFLICT (slug) DO NOTHING
  RETURNING id INTO v_tp_id;

  -- If it already existed, fetch it
  IF v_tp_id IS NULL THEN
     SELECT id INTO v_tp_id FROM public.modules WHERE slug = 'tensor-products' LIMIT 1;
  END IF;


  -- ==========================================
  -- QUIZ: Complex Numbers (v_cn_id)
  -- ==========================================
  DELETE FROM public.quiz_questions WHERE module_id = v_cn_id;

  INSERT INTO public.quiz_questions (module_id, question_type, question_text, options, correct_answer, tags, order_index, points, is_final_test)
  VALUES 
  (v_cn_id, 'multiple_choice', 'What does the unit $i$ stand for?', '["Infinite", "Imaginary", "Integral", "Inverse"]', 'B', ARRAY['complex-numbers', 'vocabulary'], 1, 1, false),
  (v_cn_id, 'multiple_choice', 'By mathematical definition, what is the value of $i^2$?', '["1", "0", "-1", "$\\sqrt{-1}$"]', 'C', ARRAY['complex-numbers', 'vocabulary'], 2, 1, false),
  (v_cn_id, 'multiple_choice', 'In the standard form of a complex number $a + bi$, what does $a$ represent?', '["The imaginary part", "The transformation part", "The vector part", "The real part"]', 'D', ARRAY['complex-numbers', 'vocabulary'], 3, 1, false),
  (v_cn_id, 'multiple_choice', 'Add the following complex numbers: $(4 - 2i) + (-1 + 5i)$', '["$3 - 3i$", "$3 + 3i$", "$5 + 3i$", "$5 - 7i$"]', 'B', ARRAY['complex-numbers', 'addition'], 4, 1, false),
  (v_cn_id, 'multiple_choice', 'Subtract the following complex numbers: $(7 + i) - (4 - 3i)$', '["$3 + 4i$", "$3 - 2i$", "$11 - 2i$", "$11 + 4i$"]', 'A', ARRAY['complex-numbers', 'subtraction'], 5, 1, false),
  (v_cn_id, 'multiple_choice', 'True or False: When adding complex numbers, you can mix the real parts with the imaginary parts.', '["True", "False"]', 'B', ARRAY['complex-numbers', 'vocabulary'], 6, 1, false),
  (v_cn_id, 'multiple_choice', 'According to the FOIL method, what is the \"Last\" term when expanding $(2 + 3i)(1 + 4i)$?', '["$3i$", "$12i$", "$12i^2$", "$-12$"]', 'C', ARRAY['complex-numbers', 'multiplication'], 7, 1, false),
  (v_cn_id, 'multiple_choice', 'Multiply the complex numbers: $(3 + i)(2 - i)$', '["$6 - i$", "$5 + 5i$", "$7 - i$", "$7 + i$"]', 'C', ARRAY['complex-numbers', 'multiplication', 'hard'], 8, 1, false),
  (v_cn_id, 'multiple_choice', 'Using the properties of $i$, what is $i^3$?', '["1", "-1", "$i$", "$-i$"]', 'D', ARRAY['complex-numbers', 'conceptual', 'hard'], 9, 1, false),
  (v_cn_id, 'multiple_choice', 'What is the result of multiplying a complex number by its distinct pair $(1 + 2i)(1 - 2i)$?', '["5", "-3", "$1 - 4i$", "$1 + 4i$"]', 'A', ARRAY['complex-numbers', 'multiplication', 'hard'], 10, 1, false);

  -- ==========================================
  -- QUIZ: Linear Transformations (v_pr_id)
  -- ==========================================
  DELETE FROM public.quiz_questions WHERE module_id = v_pr_id;

  INSERT INTO public.quiz_questions (module_id, question_type, question_text, options, correct_answer, tags, order_index, points, is_final_test)
  VALUES 
  (v_pr_id, 'multiple_choice', 'When graphing a complex number, what are the names of the horizontal and vertical axes?', '["X and Y", "Real and Imaginary", "Sine and Cosine", "Vector and Scalar"]', 'B', ARRAY['linear-transformations', 'vocabulary'], 1, 1, false),
  (v_pr_id, 'multiple_choice', 'Plotting a complex number like $3 + 4i$ on the complex plane creates a shape that looks exactly like a:', '["2D Vector", "3D Vector", "Sine Wave", "Sphere"]', 'A', ARRAY['linear-transformations', 'vocabulary'], 2, 1, false),
  (v_pr_id, 'multiple_choice', 'Intuitively, what is the best way to think about a Matrix when it is applied to a vector?', '["As a passive grid of numbers", "As a new coordinate plane", "As an action or machine that moves the vector", "As a scalar multiplier"]', 'C', ARRAY['linear-transformations', 'vocabulary'], 3, 1, false),
  (v_pr_id, 'multiple_choice', 'What is the formal mathematical term for the process of moving a vector to a new location using a matrix?', '["Matrix Expansion", "Linear Transformation", "Complex Conjugation", "Scalar Derivation"]', 'B', ARRAY['linear-transformations', 'vocabulary'], 4, 1, false),
  (v_pr_id, 'multiple_choice', 'A vector points exactly 1 unit to the right on the Real axis. If it is multiplied by a Reflection Matrix $\\\\begin{bmatrix} 0 & 1 \\\\\\\\ 1 & 0 \\\\end{bmatrix}$, where does it point now?', '["1 unit left", "1 unit down", "1 unit up on the Imaginary axis", "It does not change"]', 'C', ARRAY['linear-transformations', 'transformations'], 5, 1, false),
  (v_pr_id, 'multiple_choice', 'What is the result of applying a Scaling Matrix $\\\\begin{bmatrix} 3 & 0 \\\\\\\\ 0 & 3 \\\\end{bmatrix}$ to the vector $\\\\begin{bmatrix} 2 \\\\\\\\ 1 \\\\end{bmatrix}$?', '["$\\begin{bmatrix} 5 \\\\\\\\ 4 \\end{bmatrix}$", "$\\begin{bmatrix} 6 \\\\\\\\ 3 \\end{bmatrix}$", "$\\begin{bmatrix} 2 \\\\\\\\ 3 \\end{bmatrix}$", "$\\begin{bmatrix} 6 \\\\\\\\ 1 \\end{bmatrix}$"]', 'B', ARRAY['linear-transformations', 'transformations'], 6, 1, false),
  (v_pr_id, 'multiple_choice', 'Which of the following matrices represents a 90-degree Rotation Matrix to the left?', '["$\\begin{bmatrix} 1 & 0 \\\\\\\\ 0 & 1 \\end{bmatrix}$", "$\\begin{bmatrix} 0 & 1 \\\\\\\\ 1 & 0 \\end{bmatrix}$", "$\\begin{bmatrix} 0 & -1 \\\\\\\\ 1 & 0 \\end{bmatrix}$", "$\\begin{bmatrix} -1 & 0 \\\\\\\\ 0 & -1 \\end{bmatrix}$"]', 'C', ARRAY['linear-transformations', 'transformations', 'hard'], 7, 1, false),
  (v_pr_id, 'multiple_choice', 'Apply the Rotation Matrix $\\\\begin{bmatrix} 0 & -1 \\\\\\\\ 1 & 0 \\\\end{bmatrix}$ to the vector $\\\\begin{bmatrix} 0 \\\\\\\\ 1 \\\\end{bmatrix}$. What is the resulting vector?', '["$\\begin{bmatrix} 1 \\\\\\\\ 0 \\end{bmatrix}$", "$\\begin{bmatrix} 0 \\\\\\\\ -1 \\end{bmatrix}$", "$\\begin{bmatrix} -1 \\\\\\\\ 0 \\end{bmatrix}$", "$\\begin{bmatrix} 1 \\\\\\\\ 1 \\end{bmatrix}$"]', 'C', ARRAY['linear-transformations', 'transformations', 'hard'], 8, 1, false),
  (v_pr_id, 'multiple_choice', 'True or False: Every unique 2x2 matrix represents a specific, unique visual movement on the 2D plane.', '["True", "False"]', 'A', ARRAY['linear-transformations', 'vocabulary'], 9, 1, false),
  (v_pr_id, 'multiple_choice', 'Apply the matrix $\\\\begin{bmatrix} 1 & 0 \\\\\\\\ 0 & -1 \\\\end{bmatrix}$ to the vector $\\\\begin{bmatrix} 3 \\\\\\\\ 4 \\\\end{bmatrix}$. Visually, what transformation just occurred?', '["Reflection across the Y-axis", "Reflection across the X-axis", "180-degree rotation", "Scaling by a factor of -1"]', 'B', ARRAY['linear-transformations', 'transformations', 'hard'], 10, 1, false);

  -- ==========================================
  -- QUIZ: Tensor Products (v_tp_id)
  -- ==========================================
  DELETE FROM public.quiz_questions WHERE module_id = v_tp_id;

  INSERT INTO public.quiz_questions (module_id, question_type, question_text, options, correct_answer, tags, order_index, points, is_final_test)
  VALUES 
  (v_tp_id, 'multiple_choice', 'What visual mathematical symbol is used to represent a Tensor Product?', '["A dot ($\\cdot$)", "A cross ($\\times$)", "A circle with an X inside ($\\otimes$)", "An asterisk ($\\ast$)"]', 'C', ARRAY['tensor-products', 'vocabulary'], 1, 1, false),
  (v_tp_id, 'multiple_choice', 'What is the primary purpose of a tensor product in this context?', '["To divide a vector into smaller parts", "To relate multiple vectors or systems together", "To find the length of a vector", "To convert real numbers to imaginary numbers"]', 'B', ARRAY['tensor-products', 'vocabulary'], 2, 1, false),
  (v_tp_id, 'multiple_choice', 'True or False: When taking the tensor product of vectors $A$ and $B$, $A \\otimes B$ is exactly the same as $B \\otimes A$.', '["True", "False"]', 'B', ARRAY['tensor-products', 'vocabulary'], 3, 1, false),
  (v_tp_id, 'multiple_choice', 'True or False: In order to take the tensor product of two vectors, they must have the exact same dimensions.', '["True", "False"]', 'B', ARRAY['tensor-products', 'vocabulary'], 4, 1, false),
  (v_tp_id, 'multiple_choice', 'If Vector A is 2-dimensional and Vector B is 2-dimensional, what is the total dimension of the tensor product $A \\otimes B$?', '["2D", "3D", "4D", "8D"]', 'C', ARRAY['tensor-products', 'dimension'], 5, 1, false),
  (v_tp_id, 'multiple_choice', 'What is the tensor product of Vector $A = \\\\begin{bmatrix} 2 \\\\\\\\ 3 \\\\end{bmatrix}$ and Vector $B = \\\\begin{bmatrix} 1 \\\\\\\\ 0 \\\\end{bmatrix}$?', '["$\\begin{bmatrix} 2 \\\\\\\\ 0 \\\\\\\\ 3 \\\\\\\\ 0 \\end{bmatrix}$", "$\\begin{bmatrix} 2 \\\\\\\\ 3 \\\\\\\\ 0 \\\\\\\\ 0 \\end{bmatrix}$", "$\\begin{bmatrix} 2 \\\\\\\\ 1 \\\\\\\\ 3 \\\\\\\\ 0 \\end{bmatrix}$", "$\\begin{bmatrix} 3 \\\\\\\\ 0 \\\\\\\\ 4 \\\\\\\\ 0 \\end{bmatrix}$"]', 'A', ARRAY['tensor-products', 'calculation'], 6, 1, false),
  (v_tp_id, 'multiple_choice', 'What is the last element (bottom-most number) of the tensor product $A \\otimes B$, where $A = \\\\begin{bmatrix} 1 \\\\\\\\ 2 \\\\end{bmatrix}$ and $B = \\\\begin{bmatrix} 3 \\\\\\\\ 4 \\\\end{bmatrix}$?', '["4", "6", "8", "12"]', 'C', ARRAY['tensor-products', 'calculation'], 7, 1, false),
  (v_tp_id, 'multiple_choice', 'When computing the tensor product of two 2x2 matrices, what is the dimension of the resulting new matrix?', '["2x2", "4x2", "4x4", "8x8"]', 'C', ARRAY['tensor-products', 'dimension', 'hard'], 8, 1, false),
  (v_tp_id, 'multiple_choice', 'What is the top-left 2x2 block of the matrix resulting from $\\\\begin{bmatrix} 1 & 0 \\\\\\\\ 0 & 2 \\\\end{bmatrix} \\otimes \\\\begin{bmatrix} 2 & 1 \\\\\\\\ 1 & 3 \\\\end{bmatrix}$?', '["$\\begin{bmatrix} 0 & 0 \\\\\\\\ 0 & 0 \\end{bmatrix}$", "$\\begin{bmatrix} 1 & 0 \\\\\\\\ 0 & 1 \\end{bmatrix}$", "$\\begin{bmatrix} 2 & 1 \\\\\\\\ 1 & 3 \\end{bmatrix}$", "$\\begin{bmatrix} 4 & 2 \\\\\\\\ 2 & 6 \\end{bmatrix}$"]', 'C', ARRAY['tensor-products', 'calculation', 'hard'], 9, 1, false),
  (v_tp_id, 'multiple_choice', 'If Vector V is $\\\\begin{bmatrix} 1 \\\\\\\\ -1 \\\\end{bmatrix}$ and Vector W is $\\\\begin{bmatrix} 2 \\\\\\\\ 0 \\\\\\\\ -1 \\\\end{bmatrix}$, what is the third element of the tensor product $V \\otimes W$?', '["0", "-1", "2", "-2"]', 'B', ARRAY['tensor-products', 'calculation', 'hard'], 10, 1, false);

  RAISE NOTICE 'Successfully inserted fixed 30 questions for Phase 2.';
END $$;
