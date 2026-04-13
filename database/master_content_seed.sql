-- ============================================================
-- MASTER UNIFIED CONTENT SEED
-- Run this in the Supabase SQL Editor.
-- Populates 70 quiz questions across 7 modules using the
-- unified taxonomy standard.
--
-- IMPORTANT: 
-- 1. Backslashes in question_text must be doubled (\\) for SQL.
-- 2. Backslashes in options (JSONB) must be quadrupled (\\\\) 
-- ============================================================

DO $$
DECLARE
  v_math_id uuid;
  v_prog_id uuid;
  v_mat_id uuid;
  v_cn_id uuid;
  v_pr_id uuid;
  v_tp_id uuid;
  v_bg_id uuid;
  v_alg_id uuid;
  v_bo_id uuid;
BEGIN
  -- 1. Get Course IDs
  SELECT id INTO v_math_id FROM public.courses WHERE slug = 'mathematics' LIMIT 1;
  SELECT id INTO v_prog_id FROM public.courses WHERE slug = 'programming' LIMIT 1;
  IF v_math_id IS NULL OR v_prog_id IS NULL THEN RAISE EXCEPTION 'Courses missing.'; END IF;

  -- 2. Get Module IDs
  SELECT id INTO v_mat_id FROM public.modules WHERE slug = 'matrices' LIMIT 1;
  SELECT id INTO v_cn_id  FROM public.modules WHERE slug = 'complex-numbers' LIMIT 1;
  SELECT id INTO v_pr_id  FROM public.modules WHERE slug = 'planar-relationships' LIMIT 1;
  SELECT id INTO v_tp_id  FROM public.modules WHERE slug = 'tensor-products' LIMIT 1;
  SELECT id INTO v_bg_id  FROM public.modules WHERE slug = 'bits-and-gates' LIMIT 1;
  SELECT id INTO v_alg_id FROM public.modules WHERE slug = 'algorithms' LIMIT 1;
  SELECT id INTO v_bo_id  FROM public.modules WHERE slug = 'big-o-and-efficiency' LIMIT 1;

  IF v_mat_id IS NULL OR v_cn_id IS NULL OR v_pr_id IS NULL OR v_bg_id IS NULL OR v_alg_id IS NULL OR v_bo_id IS NULL THEN
    RAISE EXCEPTION 'One or more modules are missing. Run the revamp migrations first.';
  END IF;

  -- Fallback logic for tensor-products missing
  IF v_tp_id IS NULL THEN
    INSERT INTO public.modules (course_id, title, slug, description, order_index, module_type)
    VALUES (v_math_id, 'Tensor Products', 'tensor-products', 'Combining matrices mathematically.', 5, 'lesson')
    ON CONFLICT (slug) DO NOTHING RETURNING id INTO v_tp_id;
    IF v_tp_id IS NULL THEN SELECT id INTO v_tp_id FROM public.modules WHERE slug = 'tensor-products' LIMIT 1; END IF;
  END IF;

  -- Clear questions for safe active-dev replacement
  DELETE FROM public.quiz_questions WHERE module_id IN (v_mat_id, v_cn_id, v_pr_id, v_tp_id, v_bg_id, v_alg_id, v_bo_id);

  -- =======================================================
  -- 1. Matrices (math, matrices)
  -- =======================================================
  INSERT INTO public.quiz_questions (module_id, question_type, question_text, options, correct_answer, tags, order_index, points, is_final_test) VALUES 
  (v_mat_id, 'multiple_choice', 'What is the simplest mathematical definition of a matrix?', '["A single variable like $X$", "A straight line on a graph", "A rectangular grid or table of ordered numbers", "A standard equation"]', 'C', ARRAY['math', 'matrices', 'vocabulary'], 1, 1, false),
  (v_mat_id, 'multiple_choice', 'True or False: Vectors are technically just special, single-column matrices.', '["True", "False"]', 'A', ARRAY['math', 'matrices', 'conceptual'], 2, 1, false),
  (v_mat_id, 'multiple_choice', 'The size of a matrix is described by its dimensions, which means knowing the number of:', '["Squares and Triangles", "Roots and Powers", "X and Y intercepts", "Rows and Columns"]', 'D', ARRAY['math', 'matrices', 'vocabulary'], 3, 1, false),
  (v_mat_id, 'multiple_choice', 'In order to add or subtract two matrices together, what must be absolutely true about them?', '["They must contain only positive numbers", "They must be multiplied by a scalar first", "They must have the exact same dimensions", "They must have a zero in the top left"]', 'C', ARRAY['math', 'matrices', 'addition', 'conceptual'], 4, 1, false),
  (v_mat_id, 'multiple_choice', 'Calculate the following matrix addition: $\\\\begin{bmatrix} 2 & 1 \\\\\\\\ 3 & 4 \\\\end{bmatrix} + \\\\begin{bmatrix} 1 & 0 \\\\\\\\ 2 & 1 \\\\end{bmatrix}$', '["$\\begin{bmatrix} 3 & 1 \\\\\\\\ 5 & 5 \\end{bmatrix}$", "$\\begin{bmatrix} 2 & 1 \\\\\\\\ 5 & 5 \\end{bmatrix}$", "$\\begin{bmatrix} 3 & 0 \\\\\\\\ 6 & 4 \\end{bmatrix}$", "$\\begin{bmatrix} 1 & 1 \\\\\\\\ 1 & 3 \\end{bmatrix}$"]', 'A', ARRAY['math', 'matrices', 'addition', 'calculation'], 5, 1, false),
  (v_mat_id, 'multiple_choice', 'What is the result of subtracting $\\\\begin{bmatrix} 5 & 6 \\\\\\\\ 7 & 8 \\\\end{bmatrix} - \\\\begin{bmatrix} 1 & 2 \\\\\\\\ 3 & 4 \\\\end{bmatrix}$?', '["$\\begin{bmatrix} 4 & 4 \\\\\\\\ 4 & 4 \\end{bmatrix}$", "$\\begin{bmatrix} 6 & 8 \\\\\\\\ 10 & 12 \\end{bmatrix}$", "$\\begin{bmatrix} -4 & -4 \\\\\\\\ -4 & -4 \\end{bmatrix}$", "$\\begin{bmatrix} 4 & 4 \\\\\\\\ 10 & 12 \\end{bmatrix}$"]', 'A', ARRAY['math', 'matrices', 'calculation'], 6, 1, false),
  (v_mat_id, 'multiple_choice', 'When multiplying a matrix by a regular number (a scalar), what do you do with that scalar?', '["Multiply it only by the top-left component", "Multiply it only by the bottom row", "Multiply it by every single component inside the matrix", "Add it to every single component instead"]', 'C', ARRAY['math', 'matrices', 'scalar', 'vocabulary'], 7, 1, false),
  (v_mat_id, 'multiple_choice', 'What is $3 \\times \\\\begin{bmatrix} 1 & 2 \\\\\\\\ 0 & 4 \\\\end{bmatrix}$?', '["$\\begin{bmatrix} 4 & 5 \\\\\\\\ 3 & 7 \\end{bmatrix}$", "$\\begin{bmatrix} 3 & 6 \\\\\\\\ 0 & 12 \\end{bmatrix}$", "$\\begin{bmatrix} 3 & 2 \\\\\\\\ 0 & 4 \\end{bmatrix}$", "$\\begin{bmatrix} 3 & 6 \\\\\\\\ 3 & 12 \\end{bmatrix}$"]', 'B', ARRAY['math', 'matrices', 'scalar', 'calculation', 'hard'], 8, 1, false),
  (v_mat_id, 'multiple_choice', 'Unlike addition, multiplying a matrix by a vector uses what specific process?', '["Component by Component", "Diagonal Addition", "The ''Row by Column'' Method", "Matrix Splitting"]', 'C', ARRAY['math', 'matrices', 'multiplication', 'vocabulary', 'hard'], 9, 1, false),
  (v_mat_id, 'multiple_choice', 'If you try to add a $2 \\times 2$ matrix to a $3 \\times 3$ matrix, what happens?', '["Information turns into $0s$", "A $5 \\times 5$ matrix forms", "The matching components add appropriately", "It''s mathematically impossible/you get an error"]', 'D', ARRAY['math', 'matrices', 'conceptual', 'hard'], 10, 1, false);

  -- =======================================================
  -- 2. Complex Numbers (math, complex-numbers)
  -- =======================================================
  INSERT INTO public.quiz_questions (module_id, question_type, question_text, options, correct_answer, tags, order_index, points, is_final_test) VALUES 
  (v_cn_id, 'multiple_choice', 'What does the unit $i$ stand for?', '["Infinite", "Imaginary", "Integral", "Inverse"]', 'B', ARRAY['math', 'complex-numbers', 'vocabulary'], 1, 1, false),
  (v_cn_id, 'multiple_choice', 'By mathematical definition, what is the value of $i^2$?', '["1", "0", "-1", "$\\sqrt{-1}$"]', 'C', ARRAY['math', 'complex-numbers', 'vocabulary'], 2, 1, false),
  (v_cn_id, 'multiple_choice', 'In the standard form of a complex number $a + bi$, what does $a$ represent?', '["The imaginary part", "The transformation part", "The vector part", "The real part"]', 'D', ARRAY['math', 'complex-numbers', 'vocabulary'], 3, 1, false),
  (v_cn_id, 'multiple_choice', 'Add the following complex numbers: $(4 - 2i) + (-1 + 5i)$', '["$3 - 3i$", "$3 + 3i$", "$5 + 3i$", "$5 - 7i$"]', 'B', ARRAY['math', 'complex-numbers', 'addition', 'calculation'], 4, 1, false),
  (v_cn_id, 'multiple_choice', 'Subtract the following complex numbers: $(7 + i) - (4 - 3i)$', '["$3 + 4i$", "$3 - 2i$", "$11 - 2i$", "$11 + 4i$"]', 'A', ARRAY['math', 'complex-numbers', 'addition', 'calculation'], 5, 1, false),
  (v_cn_id, 'multiple_choice', 'True or False: When adding complex numbers, you can mix the real parts with the imaginary parts.', '["True", "False"]', 'B', ARRAY['math', 'complex-numbers', 'conceptual'], 6, 1, false),
  (v_cn_id, 'multiple_choice', 'According to the FOIL method, what is the \"Last\" term when expanding $(2 + 3i)(1 + 4i)$?', '["$3i$", "$12i$", "$12i^2$", "$-12$"]', 'C', ARRAY['math', 'complex-numbers', 'multiplication', 'calculation'], 7, 1, false),
  (v_cn_id, 'multiple_choice', 'Multiply the complex numbers: $(3 + i)(2 - i)$', '["$6 - i$", "$5 + 5i$", "$7 - i$", "$7 + i$"]', 'C', ARRAY['math', 'complex-numbers', 'multiplication', 'calculation', 'hard'], 8, 1, false),
  (v_cn_id, 'multiple_choice', 'Using the properties of $i$, what is $i^3$?', '["1", "-1", "$i$", "$-i$"]', 'D', ARRAY['math', 'complex-numbers', 'conceptual', 'hard'], 9, 1, false),
  (v_cn_id, 'multiple_choice', 'What is the result of multiplying a complex number by its distinct pair $(1 + 2i)(1 - 2i)$?', '["5", "-3", "$1 - 4i$", "$1 + 4i$"]', 'A', ARRAY['math', 'complex-numbers', 'multiplication', 'calculation', 'hard'], 10, 1, false);

  -- =======================================================
  -- 3. Planar Relationships / Linear Transformations 
  -- =======================================================
  INSERT INTO public.quiz_questions (module_id, question_type, question_text, options, correct_answer, tags, order_index, points, is_final_test) VALUES 
  (v_pr_id, 'multiple_choice', 'When graphing a complex number, what are the names of the horizontal and vertical axes?', '["X and Y", "Real and Imaginary", "Sine and Cosine", "Vector and Scalar"]', 'B', ARRAY['math', 'linear-transformations', 'vocabulary'], 1, 1, false),
  (v_pr_id, 'multiple_choice', 'Plotting a complex number like $3 + 4i$ on the complex plane creates a shape that looks exactly like a:', '["2D Vector", "3D Vector", "Sine Wave", "Sphere"]', 'A', ARRAY['math', 'linear-transformations', 'conceptual'], 2, 1, false),
  (v_pr_id, 'multiple_choice', 'Intuitively, what is the best way to think about a Matrix when it is applied to a vector?', '["As a passive grid of numbers", "As a new coordinate plane", "As an action or machine that moves the vector", "As a scalar multiplier"]', 'C', ARRAY['math', 'linear-transformations', 'conceptual'], 3, 1, false),
  (v_pr_id, 'multiple_choice', 'What is the formal mathematical term for the process of moving a vector to a new location using a matrix?', '["Matrix Expansion", "Linear Transformation", "Complex Conjugation", "Scalar Derivation"]', 'B', ARRAY['math', 'linear-transformations', 'vocabulary'], 4, 1, false),
  (v_pr_id, 'multiple_choice', 'A vector points exactly 1 unit to the right on the Real axis. If it is multiplied by a Reflection Matrix $\\\\begin{bmatrix} 0 & 1 \\\\\\\\ 1 & 0 \\\\end{bmatrix}$, where does it point now?', '["1 unit left", "1 unit down", "1 unit up on the Imaginary axis", "It does not change"]', 'C', ARRAY['math', 'linear-transformations', 'rotation', 'calculation'], 5, 1, false),
  (v_pr_id, 'multiple_choice', 'What is the result of applying a Scaling Matrix $\\\\begin{bmatrix} 3 & 0 \\\\\\\\ 0 & 3 \\\\end{bmatrix}$ to the vector $\\\\begin{bmatrix} 2 \\\\\\\\ 1 \\\\end{bmatrix}$?', '["$\\begin{bmatrix} 5 \\\\\\\\ 4 \\end{bmatrix}$", "$\\begin{bmatrix} 6 \\\\\\\\ 3 \\end{bmatrix}$", "$\\begin{bmatrix} 2 \\\\\\\\ 3 \\end{bmatrix}$", "$\\begin{bmatrix} 6 \\\\\\\\ 1 \\end{bmatrix}$"]', 'B', ARRAY['math', 'linear-transformations', 'scalar', 'calculation'], 6, 1, false),
  (v_pr_id, 'multiple_choice', 'Which of the following matrices represents a 90-degree Rotation Matrix to the left?', '["$\\begin{bmatrix} 1 & 0 \\\\\\\\ 0 & 1 \\end{bmatrix}$", "$\\begin{bmatrix} 0 & 1 \\\\\\\\ 1 & 0 \\end{bmatrix}$", "$\\begin{bmatrix} 0 & -1 \\\\\\\\ 1 & 0 \\end{bmatrix}$", "$\\begin{bmatrix} -1 & 0 \\\\\\\\ 0 & -1 \\end{bmatrix}$"]', 'C', ARRAY['math', 'linear-transformations', 'rotation', 'hard'], 7, 1, false),
  (v_pr_id, 'multiple_choice', 'Apply the Rotation Matrix $\\\\begin{bmatrix} 0 & -1 \\\\\\\\ 1 & 0 \\\\end{bmatrix}$ to the vector $\\\\begin{bmatrix} 0 \\\\\\\\ 1 \\\\end{bmatrix}$. What is the resulting vector?', '["$\\begin{bmatrix} 1 \\\\\\\\ 0 \\end{bmatrix}$", "$\\begin{bmatrix} 0 \\\\\\\\ -1 \\end{bmatrix}$", "$\\begin{bmatrix} -1 \\\\\\\\ 0 \\end{bmatrix}$", "$\\begin{bmatrix} 1 \\\\\\\\ 1 \\end{bmatrix}$"]', 'C', ARRAY['math', 'linear-transformations', 'rotation', 'calculation', 'hard'], 8, 1, false),
  (v_pr_id, 'multiple_choice', 'True or False: Every unique 2x2 matrix represents a specific, unique visual movement on the 2D plane.', '["True", "False"]', 'A', ARRAY['math', 'linear-transformations', 'conceptual'], 9, 1, false),
  (v_pr_id, 'multiple_choice', 'Apply the matrix $\\\\begin{bmatrix} 1 & 0 \\\\\\\\ 0 & -1 \\\\end{bmatrix}$ to the vector $\\\\begin{bmatrix} 3 \\\\\\\\ 4 \\\\end{bmatrix}$. Visually, what transformation just occurred?', '["Reflection across the Y-axis", "Reflection across the X-axis", "180-degree rotation", "Scaling by a factor of -1"]', 'B', ARRAY['math', 'linear-transformations', 'rotation', 'conceptual', 'hard'], 10, 1, false);

  -- =======================================================
  -- 4. Tensor Products
  -- =======================================================
  INSERT INTO public.quiz_questions (module_id, question_type, question_text, options, correct_answer, tags, order_index, points, is_final_test) VALUES 
  (v_tp_id, 'multiple_choice', 'What visual mathematical symbol is used to represent a Tensor Product?', '["A dot ($\\cdot$)", "A cross ($\\times$)", "A circle with an X inside ($\\otimes$)", "An asterisk ($\\ast$)"]', 'C', ARRAY['math', 'tensor-products', 'vocabulary'], 1, 1, false),
  (v_tp_id, 'multiple_choice', 'What is the primary purpose of a tensor product in this context?', '["To divide a vector into smaller parts", "To relate multiple vectors or systems together", "To find the length of a vector", "To convert real numbers to imaginary numbers"]', 'B', ARRAY['math', 'tensor-products', 'conceptual'], 2, 1, false),
  (v_tp_id, 'multiple_choice', 'True or False: When taking the tensor product of vectors $A$ and $B$, $A \\otimes B$ is exactly the same as $B \\otimes A$.', '["True", "False"]', 'B', ARRAY['math', 'tensor-products', 'conceptual'], 3, 1, false),
  (v_tp_id, 'multiple_choice', 'True or False: In order to take the tensor product of two vectors, they must have the exact same dimensions.', '["True", "False"]', 'B', ARRAY['math', 'tensor-products', 'conceptual'], 4, 1, false),
  (v_tp_id, 'multiple_choice', 'If Vector A is 2-dimensional and Vector B is 2-dimensional, what is the total dimension of the tensor product $A \\otimes B$?', '["2D", "3D", "4D", "8D"]', 'C', ARRAY['math', 'tensor-products', 'multiplication', 'calculation'], 5, 1, false),
  (v_tp_id, 'multiple_choice', 'What is the tensor product of Vector $A = \\\\begin{bmatrix} 2 \\\\\\\\ 3 \\\\end{bmatrix}$ and Vector $B = \\\\begin{bmatrix} 1 \\\\\\\\ 0 \\\\end{bmatrix}$?', '["$\\begin{bmatrix} 2 \\\\\\\\ 0 \\\\\\\\ 3 \\\\\\\\ 0 \\end{bmatrix}$", "$\\begin{bmatrix} 2 \\\\\\\\ 3 \\\\\\\\ 0 \\\\\\\\ 0 \\end{bmatrix}$", "$\\begin{bmatrix} 2 \\\\\\\\ 1 \\\\\\\\ 3 \\\\\\\\ 0 \\end{bmatrix}$", "$\\begin{bmatrix} 3 \\\\\\\\ 0 \\\\\\\\ 4 \\\\\\\\ 0 \\end{bmatrix}$"]', 'A', ARRAY['math', 'tensor-products', 'multiplication', 'calculation'], 6, 1, false),
  (v_tp_id, 'multiple_choice', 'What is the last element (bottom-most number) of the tensor product $A \\otimes B$, where $A = \\\\begin{bmatrix} 1 \\\\\\\\ 2 \\\\end{bmatrix}$ and $B = \\\\begin{bmatrix} 3 \\\\\\\\ 4 \\\\end{bmatrix}$?', '["4", "6", "8", "12"]', 'C', ARRAY['math', 'tensor-products', 'multiplication', 'calculation'], 7, 1, false),
  (v_tp_id, 'multiple_choice', 'When computing the tensor product of two 2x2 matrices, what is the dimension of the resulting new matrix?', '["2x2", "4x2", "4x4", "8x8"]', 'C', ARRAY['math', 'tensor-products', 'multiplication', 'conceptual', 'hard'], 8, 1, false),
  (v_tp_id, 'multiple_choice', 'What is the top-left 2x2 block of the matrix resulting from $\\\\begin{bmatrix} 1 & 0 \\\\\\\\ 0 & 2 \\\\end{bmatrix} \\otimes \\\\begin{bmatrix} 2 & 1 \\\\\\\\ 1 & 3 \\\\end{bmatrix}$?', '["$\\begin{bmatrix} 0 & 0 \\\\\\\\ 0 & 0 \\end{bmatrix}$", "$\\begin{bmatrix} 1 & 0 \\\\\\\\ 0 & 1 \\end{bmatrix}$", "$\\begin{bmatrix} 2 & 1 \\\\\\\\ 1 & 3 \\end{bmatrix}$", "$\\begin{bmatrix} 4 & 2 \\\\\\\\ 2 & 6 \\end{bmatrix}$"]', 'C', ARRAY['math', 'tensor-products', 'multiplication', 'calculation', 'hard'], 9, 1, false),
  (v_tp_id, 'multiple_choice', 'If Vector V is $\\\\begin{bmatrix} 1 \\\\\\\\ -1 \\\\end{bmatrix}$ and Vector W is $\\\\begin{bmatrix} 2 \\\\\\\\ 0 \\\\\\\\ -1 \\\\end{bmatrix}$, what is the third element of the tensor product $V \\otimes W$?', '["0", "-1", "2", "-2"]', 'B', ARRAY['math', 'tensor-products', 'multiplication', 'calculation', 'hard'], 10, 1, false);


  -- =======================================================
  -- 5. Bits and Gates
  -- =======================================================
  INSERT INTO public.quiz_questions (module_id, question_type, question_text, options, correct_answer, tags, order_index, points, is_final_test) VALUES 
  (v_bg_id, 'multiple_choice', 'What is the fundamental unit of classical information?', '["Byte", "Qubit", "Bit", "Transistor"]', 'C', ARRAY['programming', 'bits-and-gates', 'vocabulary'], 1, 1, false),
  (v_bg_id, 'multiple_choice', 'Physically, inside a computer''s processor, a bit is represented by a tiny electrical switch called a:', '["Capacitor", "Resistor", "Diode", "Transistor"]', 'D', ARRAY['programming', 'bits-and-gates', 'hardware', 'vocabulary'], 2, 1, false),
  (v_bg_id, 'multiple_choice', 'Using State Vectors, the logical state `0` is represented by which column vector?', '["$\\begin{bmatrix} 1 \\\\\\\\ 1 \\end{bmatrix}$", "$\\begin{bmatrix} 0 \\\\\\\\ 1 \\end{bmatrix}$", "$\\begin{bmatrix} 1 \\\\\\\\ 0 \\end{bmatrix}$", "$\\begin{bmatrix} 0 \\\\\\\\ 0 \\end{bmatrix}$"]', 'C', ARRAY['programming', 'bits-and-gates', 'conceptual'], 3, 1, false),
  (v_bg_id, 'multiple_choice', 'A logic gate that takes a single bit as an input and flips it to the opposite state is called a:', '["AND gate", "NOT gate", "OR gate", "XOR gate"]', 'B', ARRAY['programming', 'bits-and-gates', 'logic', 'vocabulary'], 4, 1, false),
  (v_bg_id, 'multiple_choice', 'If you multiply the \"1\" vector $\\\\begin{bmatrix} 0 \\\\\\\\ 1 \\\\end{bmatrix}$ by the NOT matrix $\\\\begin{bmatrix} 0 & 1 \\\\\\\\ 1 & 0 \\\\end{bmatrix}$, what is the final output?', '["$\\begin{bmatrix} 0 \\\\\\\\ 1 \\end{bmatrix}$", "$\\begin{bmatrix} 1 \\\\\\\\ 0 \\end{bmatrix}$", "$\\begin{bmatrix} 0 \\\\\\\\ 0 \\end{bmatrix}$", "$\\begin{bmatrix} 1 \\\\\\\\ 1 \\end{bmatrix}$"]', 'B', ARRAY['programming', 'bits-and-gates', 'logic', 'calculation'], 5, 1, false),
  (v_bg_id, 'multiple_choice', 'Which logic gate outputs a 1 if and *only if* both of its inputs are 1?', '["AND", "OR", "XOR", "NAND"]', 'A', ARRAY['programming', 'bits-and-gates', 'logic', 'vocabulary'], 6, 1, false),
  (v_bg_id, 'multiple_choice', 'If input $A = 0$ and input $B = 1$, what is the output of an OR gate?', '["0", "1", "None", "Overload"]', 'B', ARRAY['programming', 'bits-and-gates', 'logic', 'calculation'], 7, 1, false),
  (v_bg_id, 'multiple_choice', 'The XOR (Exclusive OR) gate outputs a 1 only if the inputs are different. What is the output if you run $A = 1$ and $B = 1$ through an XOR gate?', '["1", "0", "Unpredictable", "Both"]', 'B', ARRAY['programming', 'bits-and-gates', 'logic', 'calculation', 'hard'], 8, 1, false),
  (v_bg_id, 'multiple_choice', 'True or False: Every single piece of digital data in the world is simply a massive sequence of 0s and 1s.', '["True", "False"]', 'A', ARRAY['programming', 'bits-and-gates', 'conceptual'], 9, 1, false),
  (v_bg_id, 'multiple_choice', 'Which logic gate is known as a \"Universal Gate\" because chaining enough of them together can build any other logic circuit?', '["AND", "OR", "XOR", "NAND"]', 'D', ARRAY['programming', 'bits-and-gates', 'logic', 'vocabulary', 'hard'], 10, 1, false);

  -- ... (Algorithms and Big-O are mostly fine, but I'll ensure LaTeX symbols are doubled if present)
  -- 7. Big-O
  INSERT INTO public.quiz_questions (module_id, question_type, question_text, options, correct_answer, tags, order_index, points, is_final_test) VALUES 
  (v_bo_id, 'multiple_choice', 'What is the absolute best-case scenario for an algorithm''s complexity, described as \"Constant Time\"?', '["$O(N)$", "$O(1)$", "$O(N^2)$", "$O(\\\\log N)$"]', 'B', ARRAY['programming', 'big-o', 'vocabulary'], 4, 1, false),
  (v_bo_id, 'multiple_choice', 'If you only need to determine if the very first name in a 10-million-name list is \"Bob\", what is the time complexity of this specific algorithm?', '["$O(N)$", "$O(N^2)$", "$O(1)$", "$O(\\\\log N)$"]', 'C', ARRAY['programming', 'big-o', 'conceptual'], 5, 1, false),
  (v_bo_id, 'multiple_choice', 'Among the following Big-O notations, which one is considered the \"Classical Wall\" that causes algorithms to run impossibly slow when $N$ gets even slightly big?', '["$O(1)$", "$O(N)$", "$O(N \\\\log N)$", "$O(N!)$"]', 'D', ARRAY['programming', 'big-o', 'conceptual', 'hard'], 9, 1, false);

  RAISE NOTICE 'Successfully inserted fixed unified questions.';
END $$;
