-- Unified SQL seed for Big-O & Efficiency
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
    SELECT id INTO v_module_id FROM public.modules WHERE slug = 'big-o-efficiency' LIMIT 1;
    
    IF v_module_id IS NULL THEN
        INSERT INTO public.modules (course_id, title, description, slug, order_index, module_type)
        VALUES (v_course_id, 'Big-O & Algorithm Efficiency', 'Understand how algorithms scale and the classical wall.', 'big-o-efficiency', 3, 'lesson')
        RETURNING id INTO v_module_id;
    ELSE
        -- Update existing module to match new metadata if needed
        UPDATE public.modules 
        SET title = 'Big-O & Algorithm Efficiency', 
            description = 'Understand how algorithms scale and the classical wall.',
            order_index = 3
        WHERE id = v_module_id;
    END IF;

    -- 3. Clear existing questions for this module to prevent duplicates
    DELETE FROM public.quiz_options WHERE question_id IN (SELECT id FROM public.quiz_questions WHERE module_id = v_module_id);
    DELETE FROM public.quiz_questions WHERE module_id = v_module_id;

    -- 4. Insert Questions & Options
    -- We'll use a nested loop or multiple inserts. For simplicity in this script:
    
    -- Q1
    WITH q AS (
        INSERT INTO public.quiz_questions (module_id, question_text, question_type, order_index, points)
        VALUES (v_module_id, 'Why is measuring an algorithm''s speed in seconds a bad metric?', 'multiple_choice', 1, 10)
        RETURNING id
    )
    INSERT INTO public.quiz_options (question_id, option_text, is_correct) VALUES 
    ((SELECT id FROM q), 'Because seconds are too small a unit', false),
    ((SELECT id FROM q), 'Because a fast computer running a bad algorithm might beat a slow computer running a good one', true),
    ((SELECT id FROM q), 'Because hardware speeds are identical everywhere', false),
    ((SELECT id FROM q), 'Because seconds cannot be quantified in loops', false);

    -- Q2
    WITH q AS (
        INSERT INTO public.quiz_questions (module_id, question_text, question_type, order_index, points)
        VALUES (v_module_id, 'What does the "N" typically represent in Big-O notation?', 'multiple_choice', 2, 10)
        RETURNING id
    )
    INSERT INTO public.quiz_options (question_id, option_text, is_correct) VALUES 
    ((SELECT id FROM q), 'The number of steps the algorithm takes', false),
    ((SELECT id FROM q), 'The size of the input data or problem', true),
    ((SELECT id FROM q), 'The speed of the processor in nanoseconds', false),
    ((SELECT id FROM q), 'The number of seconds remaining', false);

    -- Q3
    WITH q AS (
        INSERT INTO public.quiz_questions (module_id, question_text, question_type, order_index, points)
        VALUES (v_module_id, 'In the worst-case scenario, how many steps does it take to find a name in a completely scrambled list of 1 million names using Linear Search?', 'multiple_choice', 3, 10)
        RETURNING id
    )
    INSERT INTO public.quiz_options (question_id, option_text, is_correct) VALUES 
    ((SELECT id FROM q), '1 step', false),
    ((SELECT id FROM q), '100 steps', false),
    ((SELECT id FROM q), '1 Million steps', true),
    ((SELECT id FROM q), '1 Billion steps', false);

    -- Q4
    WITH q AS (
        INSERT INTO public.quiz_questions (module_id, question_text, question_type, order_index, points)
        VALUES (v_module_id, 'If looking up the very first index of an array always takes exactly 1 step regardless of array size, what is the Big-O notation?', 'multiple_choice', 4, 10)
        RETURNING id
    )
    INSERT INTO public.quiz_options (question_id, option_text, is_correct) VALUES 
    ((SELECT id FROM q), 'O(N)', false),
    ((SELECT id FROM q), 'O(N^2)', false),
    ((SELECT id FROM q), 'O(1)', true),
    ((SELECT id FROM q), 'O(log N)', false);

    -- Q5
    WITH q AS (
        INSERT INTO public.quiz_questions (module_id, question_text, question_type, order_index, points)
        VALUES (v_module_id, 'Which of the following Big-O complexities grows the FASTEST (takes the longest time) as N gets large?', 'multiple_choice', 5, 10)
        RETURNING id
    )
    INSERT INTO public.quiz_options (question_id, option_text, is_correct) VALUES 
    ((SELECT id FROM q), 'O(1)', false),
    ((SELECT id FROM q), 'O(N)', false),
    ((SELECT id FROM q), 'O(N^2)', false),
    ((SELECT id FROM q), 'O(2^N)', true);

    -- Q6
    WITH q AS (
        INSERT INTO public.quiz_questions (module_id, question_text, question_type, order_index, points)
        VALUES (v_module_id, 'What is meant by the "Classical Wall"?', 'multiple_choice', 6, 10)
        RETURNING id
    )
    INSERT INTO public.quiz_options (question_id, option_text, is_correct) VALUES 
    ((SELECT id FROM q), 'Hardware melting from overheating', false),
    ((SELECT id FROM q), 'The mathematical limitation where exponential O(2^N) problems become impossible for classical computers to solve in a reasonable universe lifetime', true),
    ((SELECT id FROM q), 'The physical size limit of a hard drive', false),
    ((SELECT id FROM q), 'An algorithm that refuses to output an answer', false);

    -- Q7
    WITH q AS (
        INSERT INTO public.quiz_questions (module_id, question_text, question_type, order_index, points)
        VALUES (v_module_id, 'How does O(log N) (Logarithmic Time) scale compared to O(N) (Linear Time)?', 'multiple_choice', 7, 10)
        RETURNING id
    )
    INSERT INTO public.quiz_options (question_id, option_text, is_correct) VALUES 
    ((SELECT id FROM q), 'Logarithmic time is significantly slower than Linear time', false),
    ((SELECT id FROM q), 'They scale at the exact same rate', false),
    ((SELECT id FROM q), 'Logarithmic time scales significantly better (flatter) than Linear time as N gets extremely large', true),
    ((SELECT id FROM q), 'Logarithmic time scales purely exponentially', false);

    -- Q8
    WITH q AS (
        INSERT INTO public.quiz_questions (module_id, question_text, question_type, order_index, points)
        VALUES (v_module_id, 'If an algorithm''s steps grow proportionally to the square of its input data, what is its Big-O notation?', 'multiple_choice', 8, 10)
        RETURNING id
    )
    INSERT INTO public.quiz_options (question_id, option_text, is_correct) VALUES 
    ((SELECT id FROM q), 'O(1)', false),
    ((SELECT id FROM q), 'O(N)', false),
    ((SELECT id FROM q), 'O(log N)', false),
    ((SELECT id FROM q), 'O(N^2)', true);

    -- Q9
    WITH q AS (
        INSERT INTO public.quiz_questions (module_id, question_text, question_type, order_index, points)
        VALUES (v_module_id, 'Why is Big-O important to understanding Quantum Computing?', 'multiple_choice', 9, 10)
        RETURNING id
    )
    INSERT INTO public.quiz_options (question_id, option_text, is_correct) VALUES 
    ((SELECT id FROM q), 'Because quantum computers use faster clock cycles', false),
    ((SELECT id FROM q), 'Because quantum algorithms can fundamentally change the Big-O complexity of a problem, such as dropping an O(2^N) problem to a polynomial time', true),
    ((SELECT id FROM q), 'Because quantum computers cannot process O(1) structures', false),
    ((SELECT id FROM q), 'Because Big-O proves quantum computers are impossible', false);

    -- Q10
    WITH q AS (
        INSERT INTO public.quiz_questions (module_id, question_text, question_type, order_index, points)
        VALUES (v_module_id, 'A supercomputer runs an O(N^2) algorithm, and an old laptop runs an O(N) algorithm. What happens as N gets massive?', 'multiple_choice', 10, 10)
        RETURNING id
    )
    INSERT INTO public.quiz_options (question_id, option_text, is_correct) VALUES 
    ((SELECT id FROM q), 'The supercomputer will always win because of its clock speed', false),
    ((SELECT id FROM q), 'They will eventually tie', false),
    ((SELECT id FROM q), 'The old laptop will win because O(N) requires vastly fewer steps than O(N^2) at large scales, eventually overcoming the hardware gap', true),
    ((SELECT id FROM q), 'Both computers will crash simultaneously at exactly N=100', false);

    RAISE NOTICE 'Big-O quiz seed completed successfully.';
END $$;
