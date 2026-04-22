-- ============================================================
-- Programming Phase 1 Lessons & Quizzes — SQL Insert
-- Run this in the Supabase SQL Editor.
-- Populates quizzes for:
--   1. bits-and-gates
--   2. algorithms
--   3. big-o-and-efficiency
-- 
-- IMPORTANT: Backslashes in the options JSONB field must be
-- doubled (\ → \\) so PostgreSQL's JSON parser sees them as
-- literal backslashes.
-- ============================================================

DO $$
DECLARE
  v_prog_id uuid;
  v_bg_id uuid;
  v_alg_id uuid;
  v_bo_id uuid;
BEGIN
  -- 1. Find Course ID for Programming
  SELECT id INTO v_prog_id
  FROM public.courses
  WHERE slug = 'programming'
  LIMIT 1;

  IF v_prog_id IS NULL THEN
    RAISE EXCEPTION 'Course with slug "programming" not found. Did you run the revamp migration?';
  END IF;

  -- 2. Find Module IDs
  SELECT id INTO v_bg_id FROM public.modules WHERE slug = 'bits-and-gates' LIMIT 1;
  SELECT id INTO v_alg_id FROM public.modules WHERE slug = 'algorithms' LIMIT 1;
  SELECT id INTO v_bo_id FROM public.modules WHERE slug = 'big-o-and-efficiency' LIMIT 1;

  IF v_bg_id IS NULL OR v_alg_id IS NULL OR v_bo_id IS NULL THEN
    RAISE EXCEPTION 'One or more programming modules missing. Run the revamp migration first.';
  END IF;

  -- ==========================================
  -- QUIZ: Bits and Gates (v_bg_id)
  -- ==========================================
  -- Clear existing tests for safety during active dev
  DELETE FROM public.quiz_questions WHERE module_id = v_bg_id;

  INSERT INTO public.quiz_questions (module_id, question_type, question_text, options, correct_answer, tags, order_index, points, is_final_test)
  VALUES 
  (v_bg_id, 'multiple_choice', 'What is the fundamental unit of classical information?', '["Byte", "Qubit", "Bit", "Transistor"]', 'C', ARRAY['bits', 'vocabulary'], 1, 1, false),
  (v_bg_id, 'multiple_choice', 'Physically, inside a computer''s processor, a bit is represented by a tiny electrical switch called a:', '["Capacitor", "Resistor", "Diode", "Transistor"]', 'D', ARRAY['hardware', 'vocabulary'], 2, 1, false),
  (v_bg_id, 'multiple_choice', 'Using State Vectors, the logical state `0` is represented by which column vector?', '["$\\begin{bmatrix} 1 \\\\ 1 \\end{bmatrix}$", "$\\begin{bmatrix} 0 \\\\ 1 \\end{bmatrix}$", "$\\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix}$", "$\\begin{bmatrix} 0 \\\\ 0 \\end{bmatrix}$"]', 'C', ARRAY['state-vectors', 'vocabulary'], 3, 1, false),
  (v_bg_id, 'multiple_choice', 'A logic gate that takes a single bit as an input and flips it to the opposite state is called a:', '["AND gate", "NOT gate", "OR gate", "XOR gate"]', 'B', ARRAY['logic-gates', 'vocabulary'], 4, 1, false),
  (v_bg_id, 'multiple_choice', 'If you multiply the "1" vector $\\begin{bmatrix} 0 \\\\ 1 \\end{bmatrix}$ by the NOT matrix $\\begin{bmatrix} 0 & 1 \\\\ 1 & 0 \\end{bmatrix}$, what is the final output?', '["$\\begin{bmatrix} 0 \\\\ 1 \\end{bmatrix}$", "$\\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix}$", "$\\begin{bmatrix} 0 \\\\ 0 \\end{bmatrix}$", "$\\begin{bmatrix} 1 \\\\ 1 \\end{bmatrix}$"]', 'B', ARRAY['matrices', 'calculation'], 5, 1, false),
  (v_bg_id, 'multiple_choice', 'Which logic gate outputs a 1 if and *only if* both of its inputs are 1?', '["AND", "OR", "XOR", "NAND"]', 'A', ARRAY['logic-gates', 'vocabulary'], 6, 1, false),
  (v_bg_id, 'multiple_choice', 'If input $A = 0$ and input $B = 1$, what is the output of an OR gate?', '["0", "1", "None", "Overload"]', 'B', ARRAY['logic-gates', 'calculation'], 7, 1, false),
  (v_bg_id, 'multiple_choice', 'The XOR (Exclusive OR) gate outputs a 1 only if the inputs are different. What is the output if you run $A = 1$ and $B = 1$ through an XOR gate?', '["1", "0", "Unpredictable", "Both"]', 'B', ARRAY['logic-gates', 'calculation', 'hard'], 8, 1, false),
  (v_bg_id, 'multiple_choice', 'True or False: Every single piece of digital data in the world is simply a massive sequence of 0s and 1s.', '["True", "False"]', 'A', ARRAY['bits', 'vocabulary'], 9, 1, false),
  (v_bg_id, 'multiple_choice', 'Which logic gate is known as a "Universal Gate" because chaining enough of them together can build any other logic circuit?', '["AND", "OR", "XOR", "NAND"]', 'D', ARRAY['logic-gates', 'vocabulary', 'hard'], 10, 1, false);

  -- ==========================================
  -- QUIZ: Algorithms (v_alg_id)
  -- ==========================================
  DELETE FROM public.quiz_questions WHERE module_id = v_alg_id;

  INSERT INTO public.quiz_questions (module_id, question_type, question_text, options, correct_answer, tags, order_index, points, is_final_test)
  VALUES 
  (v_alg_id, 'multiple_choice', 'What is an algorithm?', '["A random assortment of data", "A physical logic gate", "A finite set of instructions to process input and produce output", "A type of computer memory"]', 'C', ARRAY['algorithms', 'vocabulary'], 1, 1, false),
  (v_alg_id, 'multiple_choice', 'Which real-world activity does the lesson compare to executing an algorithm?', '["Riding a bike", "Baking a cake", "Painting a fence", "Sleeping"]', 'B', ARRAY['algorithms', 'vocabulary'], 2, 1, false),
  (v_alg_id, 'multiple_choice', 'What is the "Search Problem" in computer science?', '["Looking for a virus", "Finding a specific element in a list", "Surfing the web", "Discovering new hardware"]', 'B', ARRAY['search', 'vocabulary'], 3, 1, false),
  (v_alg_id, 'multiple_choice', 'To search an unorganized list on a classical computer, what algorithm must be used?', '["Binary Search", "Fast Fourier Transform", "Quantum Search", "Linear Search"]', 'D', ARRAY['search', 'vocabulary'], 4, 1, false),
  (v_alg_id, 'multiple_choice', 'In the first step of Linear Search, what does the algorithm do?', '["It deletes the first item.", "It looks at the first item and compares it to the target.", "It randomly selects an item in the middle.", "It sorts the list alphabetically."]', 'B', ARRAY['search', 'algorithms'], 5, 1, false),
  (v_alg_id, 'multiple_choice', 'True or False: If you skip a step in an algorithm, you will still get the exact desired output.', '["True", "False"]', 'B', ARRAY['algorithms', 'vocabulary'], 6, 1, false),
  (v_alg_id, 'multiple_choice', 'When a computer compares two words under the hood, what logical operation does it primarily run the bits through?', '["AND gates", "OR gates", "NOT gates", "XOR gates"]', 'D', ARRAY['logic-gates', 'hardware'], 7, 1, false),
  (v_alg_id, 'multiple_choice', 'If you XOR the binary code of the name "Bob" against the binary code of the exact same name "Bob", what will the total output be?', '["All 1s", "All 0s", "Random bits", "An error"]', 'B', ARRAY['logic-gates', 'calculation', 'hard'], 8, 1, false),
  (v_alg_id, 'multiple_choice', 'What does the Linear Search algorithm do if the first item is NOT a match?', '["It stops running.", "It outputs an error.", "It moves to the next item and repeats the process.", "It deletes the item."]', 'C', ARRAY['search', 'algorithms'], 9, 1, false),
  (v_alg_id, 'multiple_choice', 'Why are algorithms absolutely necessary for computers?', '["Because logic gates automatically know how to solve problems.", "Because hardware needs specific step-by-step instructions to perform any useful task.", "Because they make computers look cool.", "Because electricity requires algorithms to flow."]', 'B', ARRAY['algorithms', 'vocabulary', 'hard'], 10, 1, false);

  -- ==========================================
  -- QUIZ: Big-O Notation (v_bo_id)
  -- ==========================================
  DELETE FROM public.quiz_questions WHERE module_id = v_bo_id;

  INSERT INTO public.quiz_questions (module_id, question_type, question_text, options, correct_answer, tags, order_index, points, is_final_test)
  VALUES 
  (v_bo_id, 'multiple_choice', 'What does Big-O notation measure?', '["Memory size in gigabytes", "Processing speed in seconds", "The visual size of output text", "The worst-case number of steps an algorithm takes as problem size grows"]', 'D', ARRAY['big-o', 'vocabulary'], 1, 1, false),
  (v_bo_id, 'multiple_choice', 'In Big-O notation, what does the variable N represent?', '["Network speed", "Number of hours", "Total size of the input data", "Nanoseconds"]', 'C', ARRAY['big-o', 'vocabulary'], 2, 1, false),
  (v_bo_id, 'multiple_choice', 'Why do computer scientists avoid measuring algorithm efficiency using standard time (seconds/minutes)?', '["Because clocks are inaccurate.", "Because processing time is heavily skewed by the hardware''s speed.", "Because it takes too long to measure.", "Because algorithms run instantly."]', 'B', ARRAY['efficiency', 'vocabulary'], 3, 1, false),
  (v_bo_id, 'multiple_choice', 'What is the absolute best-case scenario for an algorithm''s complexity, described as "Constant Time"?', '["$O(N)$", "$O(1)$", "$O(N^2)$", "$O(\\log N)$"]', 'B', ARRAY['big-o', 'vocabulary'], 4, 1, false),
  (v_bo_id, 'multiple_choice', 'If you only need to determine if the very first name in a 10-million-name list is "Bob", what is the time complexity of this specific algorithm?', '["$O(N)$", "$O(N^2)$", "$O(1)$", "$O(\\log N)$"]', 'C', ARRAY['big-o', 'conceptual'], 5, 1, false),
  (v_bo_id, 'multiple_choice', 'A Linear Search algorithm has what worst-case time complexity?', '["$O(1)$", "$O(2^N)$", "$O(N)$", "$O(N^2)$"]', 'C', ARRAY['big-o', 'search'], 6, 1, false),
  (v_bo_id, 'multiple_choice', 'What happens directly to the worst-case number of steps in an $O(N)$ algorithm if the data size doubles?', '["The steps stay the same.", "The steps double.", "The steps quadruple.", "The steps become exponential."]', 'B', ARRAY['big-o', 'conceptual'], 7, 1, false),
  (v_bo_id, 'multiple_choice', 'True or False: Exponential time algorithmic functions, like $O(2^N)$, are generally highly efficient for massive data sets.', '["True", "False"]', 'B', ARRAY['efficiency', 'vocabulary', 'hard'], 8, 1, false),
  (v_bo_id, 'multiple_choice', 'Among the following Big-O notations, which one is considered the "Classical Wall" that causes algorithms to run impossibly slow when $N$ gets even slightly big?', '["$O(1)$", "$O(N)$", "$O(N \\log N)$", "$O(N!)$"]', 'D', ARRAY['big-o', 'conceptual', 'hard'], 9, 1, false),
  (v_bo_id, 'multiple_choice', 'The reason why some problems require quantum computing is because they are currently locked behind which type of classical time complexity algorithms?', '["Constant or Logarithmic", "Exponential or Factorial", "Linear", "Linearithmic"]', 'B', ARRAY['efficiency', 'conceptual', 'hard'], 10, 1, false);

  RAISE NOTICE 'Successfully inserted quiz questions for Programming modules.';
END $$;
