-- Unified SQL seed for Algorithms & The Search Problem
-- Uses slug-based lookup to avoid UUID mismatch errors

DO $$
DECLARE
    v_course_id uuid;
    v_module_id uuid;
BEGIN
    -- 1. Get the Programming Course ID
    SELECT id INTO v_course_id FROM public.courses WHERE slug = 'programming' LIMIT 1;
    
    -- If course doesn't exist, create it (fallback)
    IF v_course_id IS NULL THEN
        INSERT INTO public.courses (title, slug, description)
        VALUES ('Computer Science & Programming', 'programming', 'The foundations of classical computing.')
        RETURNING id INTO v_course_id;
    END IF;

    -- 2. Check if Module exists, otherwise create it
    SELECT id INTO v_module_id FROM public.modules WHERE slug = 'algorithms' LIMIT 1;
    
    IF v_module_id IS NULL THEN
        INSERT INTO public.modules (course_id, title, description, slug, order_index, module_type)
        VALUES (v_course_id, 'Algorithms: The Recipe of Computation', 'Understanding search problems and bitwise comparisons.', 'algorithms', 2, 'lesson')
        RETURNING id INTO v_module_id;
    ELSE
        -- Update existing module to match metadata
        UPDATE public.modules 
        SET title = 'Algorithms: The Recipe of Computation', 
            description = 'Understanding search problems and bitwise comparisons.',
            order_index = 2
        WHERE id = v_module_id;
    END IF;

    -- 3. Clear existing questions for this module to prevent duplicates
    DELETE FROM public.quiz_options WHERE question_id IN (SELECT id FROM public.quiz_questions WHERE module_id = v_module_id);
    DELETE FROM public.quiz_questions WHERE module_id = v_module_id;

    -- 4. Insert Questions & Options
    
    -- Q1
    WITH q AS (
        INSERT INTO public.quiz_questions (module_id, question_text, question_type, order_index, points)
        VALUES (v_module_id, 'What is the most accurate definition of an algorithm?', 'multiple_choice', 1, 10)
        RETURNING id
    )
    INSERT INTO public.quiz_options (question_id, option_text, is_correct) VALUES 
    ((SELECT id FROM q), 'A hardware component like a CPU', false),
    ((SELECT id FROM q), 'A finite, ordered sequence of instructions that maps input to output', true),
    ((SELECT id FROM q), 'A random set of numbers used for security', false),
    ((SELECT id FROM q), 'A type of high-speed internet connection', false);

    -- Q2
    WITH q AS (
        INSERT INTO public.quiz_questions (module_id, question_text, question_type, order_index, points)
        VALUES (v_module_id, 'What is the "Search Problem" in computer science?', 'multiple_choice', 2, 10)
        RETURNING id
    )
    INSERT INTO public.quiz_options (question_id, option_text, is_correct) VALUES 
    ((SELECT id FROM q), 'Finding a specific element or target within a collection of data', true),
    ((SELECT id FROM q), 'Googling for an answer to a question', false),
    ((SELECT id FROM q), 'Scanning a hard drive for viruses', false),
    ((SELECT id FROM q), 'Replacing one variable with another', false);

    -- Q3
    WITH q AS (
        INSERT INTO public.quiz_questions (module_id, question_text, question_type, order_index, points)
        VALUES (v_module_id, 'In the absolute worst-case scenario, how many items must Linear Search check in an array of size N?', 'multiple_choice', 3, 10)
        RETURNING id
    )
    INSERT INTO public.quiz_options (question_id, option_text, is_correct) VALUES 
    ((SELECT id FROM q), '1 item', false),
    ((SELECT id FROM q), 'Half of the items ($N/2$)', false),
    ((SELECT id FROM q), 'All $N$ items', true),
    ((SELECT id FROM q), 'None of the items', false);

    -- Q4
    WITH q AS (
        INSERT INTO public.quiz_questions (module_id, question_text, question_type, order_index, points)
        VALUES (v_module_id, 'Why is Linear Search necessary when data is completely scrambled or unsorted?', 'multiple_choice', 4, 10)
        RETURNING id
    )
    INSERT INTO public.quiz_options (question_id, option_text, is_correct) VALUES 
    ((SELECT id FROM q), 'Because you can safely skip every other item', false),
    ((SELECT id FROM q), 'Because there is no pattern allowing the algorithm to skip any potential match', true),
    ((SELECT id FROM q), 'Because computers prefer linear patterns', false),
    ((SELECT id FROM q), 'It isn''t; you should always use Binary Search instead', false);

    -- Q5
    WITH q AS (
        INSERT INTO public.quiz_questions (module_id, question_text, question_type, order_index, points)
        VALUES (v_module_id, 'Under the hood, what logical gate is primarily used to check if two bits are different?', 'multiple_choice', 5, 10)
        RETURNING id
    )
    INSERT INTO public.quiz_options (question_id, option_text, is_correct) VALUES 
    ((SELECT id FROM q), 'AND gate', false),
    ((SELECT id FROM q), 'OR gate', false),
    ((SELECT id FROM q), 'XOR gate', true),
    ((SELECT id FROM q), 'NOT gate', false);

    -- Q6
    WITH q AS (
        INSERT INTO public.quiz_questions (module_id, question_text, question_type, order_index, points)
        VALUES (v_module_id, 'If two bits are identical (e.g., both are 1), what is the output of an XOR gate?', 'multiple_choice', 6, 10)
        RETURNING id
    )
    INSERT INTO public.quiz_options (question_id, option_text, is_correct) VALUES 
    ((SELECT id FROM q), '1 (True)', false),
    ((SELECT id FROM q), '0 (False)', true),
    ((SELECT id FROM q), '-1', false),
    ((SELECT id FROM q), 'It depends on the hardware temperature', false);

    -- Q7
    WITH q AS (
        INSERT INTO public.quiz_questions (module_id, question_text, question_type, order_index, points)
        VALUES (v_module_id, 'How is a string comparison like "Alice" == "Alice" physically implemented in hardware?', 'multiple_choice', 7, 10)
        RETURNING id
    )
    INSERT INTO public.quiz_options (question_id, option_text, is_correct) VALUES 
    ((SELECT id FROM q), 'The computer looks at the shape of the letters', false),
    ((SELECT id FROM q), 'Corresponding bits of each character are compared using XOR gates', true),
    ((SELECT id FROM q), 'The computer guesses based on string length', false),
    ((SELECT id FROM q), 'A human must manually verify the match', false);

    -- Q8
    WITH q AS (
        INSERT INTO public.quiz_questions (module_id, question_text, question_type, order_index, points)
        VALUES (v_module_id, 'Why is hardware-level XOR comparison relevant to quantum computing?', 'multiple_choice', 8, 10)
        RETURNING id
    )
    INSERT INTO public.quiz_options (question_id, option_text, is_correct) VALUES 
    ((SELECT id FROM q), 'Quantum computers cannot use XOR gates', false),
    ((SELECT id FROM q), 'Quantum "oracles" often use reversible quantum-XOR logic (CNOT) to mark target data', true),
    ((SELECT id FROM q), 'It isn''t relevant; quantum computers don''t use logic', false),
    ((SELECT id FROM q), 'It is only used for quantum security, not searching', false);

    -- Q9
    WITH q AS (
        INSERT INTO public.quiz_questions (module_id, question_text, question_type, order_index, points)
        VALUES (v_module_id, 'How does Grover''s Algorithm improve on classical Linear Search?', 'multiple_choice', 9, 10)
        RETURNING id
    )
    INSERT INTO public.quiz_options (question_id, option_text, is_correct) VALUES 
    ((SELECT id FROM q), 'It makes the hardware run at higher clock speeds', false),
    ((SELECT id FROM q), 'It reduces the number of steps from $N$ to roughly $\sqrt{N}$', true),
    ((SELECT id FROM q), 'It converts the search into a simple $O(1)$ lookup', false),
    ((SELECT id FROM q), 'It prevents the computer from needing any energy', false);

    -- Q10
    WITH q AS (
        INSERT INTO public.quiz_questions (module_id, question_text, question_type, order_index, points)
        VALUES (v_module_id, 'Does a classical computer "understand" the semantic meaning of search results?', 'multiple_choice', 10, 10)
        RETURNING id
    )
    INSERT INTO public.quiz_options (question_id, option_text, is_correct) VALUES 
    ((SELECT id FROM q), 'Yes, modern CPUs have artificial consciousness', false),
    ((SELECT id FROM q), 'Only when running specific neural networks', false),
    ((SELECT id FROM q), 'No; it only processes binary signals through predetermined logic gate patterns', true),
    ((SELECT id FROM q), 'Only if the "search" button is pressed', false);

    RAISE NOTICE 'Algorithms quiz seed completed successfully.';
END $$;
