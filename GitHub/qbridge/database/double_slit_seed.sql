-- Unified SQL seed for Double Slit Experiment
-- Uses slug-based lookup to avoid UUID mismatch errors

DO $$
DECLARE
    v_course_id uuid;
    v_module_id uuid;
BEGIN
    -- 1. Get the Physics Course ID
    SELECT id INTO v_course_id FROM public.courses WHERE slug = 'physics' LIMIT 1;
    
    -- If course doesn't exist, create it (fallback)
    IF v_course_id IS NULL THEN
        INSERT INTO public.courses (title, slug, description)
        VALUES ('Physics & Quantum Mechanics', 'physics', 'Explore the fundamental nature of reality.')
        RETURNING id INTO v_course_id;
    END IF;

    -- 2. Check if Module exists, otherwise create it
    SELECT id INTO v_module_id FROM public.modules WHERE slug = 'double-slit-experiment' LIMIT 1;
    
    IF v_module_id IS NULL THEN
        INSERT INTO public.modules (course_id, title, description, slug, order_index, module_type)
        VALUES (v_course_id, 'The Double Slit Experiment', 'Discover the fundamental mystery of quantum mechanics.', 'double-slit-experiment', 2, 'lesson')
        RETURNING id INTO v_module_id;
    ELSE
        -- Update existing module to match metadata
        UPDATE public.modules 
        SET title = 'The Double Slit Experiment', 
            description = 'Discover the fundamental mystery of quantum mechanics.',
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
        VALUES (v_module_id, 'What fundamental problem did the Double Slit Experiment aim to solve?', 'multiple_choice', 1, 10)
        RETURNING id
    )
    INSERT INTO public.quiz_options (question_id, option_text, is_correct) VALUES 
    ((SELECT id FROM q), 'Why electrons have negative charge', false),
    ((SELECT id FROM q), 'How to measure the exact speed of light', false),
    ((SELECT id FROM q), 'Where a solid particle is located when it acts as a wave', true),
    ((SELECT id FROM q), 'How gravity affects subatomic particles', false);

    -- Q2
    WITH q AS (
        INSERT INTO public.quiz_questions (module_id, question_text, question_type, order_index, points)
        VALUES (v_module_id, 'If classical physics were correct and electrons were just hard billiard balls, what pattern would appear on the back screen?', 'multiple_choice', 2, 10)
        RETURNING id
    )
    INSERT INTO public.quiz_options (question_id, option_text, is_correct) VALUES 
    ((SELECT id FROM q), 'A solid block of hits', false),
    ((SELECT id FROM q), 'Two distinct vertical bands directly behind the slits', true),
    ((SELECT id FROM q), 'An interference pattern with multiple bands', false),
    ((SELECT id FROM q), 'A completely clear screen', false);

    -- Q3
    WITH q AS (
        INSERT INTO public.quiz_questions (module_id, question_text, question_type, order_index, points)
        VALUES (v_module_id, 'When multiple electrons are fired individually over a long period (one at a time) with the detector OFF, what pattern forms?', 'multiple_choice', 3, 10)
        RETURNING id
    )
    INSERT INTO public.quiz_options (question_id, option_text, is_correct) VALUES 
    ((SELECT id FROM q), 'A single dot directly in the center', false),
    ((SELECT id FROM q), 'Two distinct vertical bands', false),
    ((SELECT id FROM q), 'An interference pattern of alternating bright and dark bands', true),
    ((SELECT id FROM q), 'Scattered random noise with no discernible pattern', false);

    -- Q4
    WITH q AS (
        INSERT INTO public.quiz_questions (module_id, question_text, question_type, order_index, points)
        VALUES (v_module_id, 'What creates the dark bands in an interference pattern?', 'multiple_choice', 4, 10)
        RETURNING id
    )
    INSERT INTO public.quiz_options (question_id, option_text, is_correct) VALUES 
    ((SELECT id FROM q), 'The electron gun missing the target', false),
    ((SELECT id FROM q), 'High-velocity particles punching through the screen', false),
    ((SELECT id FROM q), 'Constructive interference magnifying the wave', false),
    ((SELECT id FROM q), 'Destructive interference where crests and troughs cancel each other out', true);

    -- Q5
    WITH q AS (
        INSERT INTO public.quiz_questions (module_id, question_text, question_type, order_index, points)
        VALUES (v_module_id, 'How is it possible for a single isolated electron to contribute to an interference pattern?', 'multiple_choice', 5, 10)
        RETURNING id
    )
    INSERT INTO public.quiz_options (question_id, option_text, is_correct) VALUES 
    ((SELECT id FROM q), 'It breaks into two smaller electrons mid-flight', false),
    ((SELECT id FROM q), 'It travels as a wave, passes through both slits simultaneously, and interferes with itself', true),
    ((SELECT id FROM q), 'It bounces back and forth rapidly between the slits', false),
    ((SELECT id FROM q), 'Gravity bends its trajectory around the barrier', false);

    -- Q6
    WITH q AS (
        INSERT INTO public.quiz_questions (module_id, question_text, question_type, order_index, points)
        VALUES (v_module_id, 'What happens to the electron''s state the moment a detector (camera) is placed at the slits to observe it?', 'multiple_choice', 6, 10)
        RETURNING id
    )
    INSERT INTO public.quiz_options (question_id, option_text, is_correct) VALUES 
    ((SELECT id FROM q), 'The wave function collapses and it behaves purely as a classical particle', true),
    ((SELECT id FROM q), 'The interference pattern becomes sharper', false),
    ((SELECT id FROM q), 'The electron is destroyed', false),
    ((SELECT id FROM q), 'It splits into multiple particles', false);

    -- Q7
    WITH q AS (
        INSERT INTO public.quiz_questions (module_id, question_text, question_type, order_index, points)
        VALUES (v_module_id, 'In quantum computing, what is the equivalent of an unobserved electron in the Double Slit experiment?', 'multiple_choice', 7, 10)
        RETURNING id
    )
    INSERT INTO public.quiz_options (question_id, option_text, is_correct) VALUES 
    ((SELECT id FROM q), 'A classical bit locked as a 1', false),
    ((SELECT id FROM q), 'A qubit in superposition, holding multiple states simultaneously', true),
    ((SELECT id FROM q), 'A completely broken processing core', false),
    ((SELECT id FROM q), 'Data storage measuring zero', false);

    -- Q8
    WITH q AS (
        INSERT INTO public.quiz_questions (module_id, question_text, question_type, order_index, points)
        VALUES (v_module_id, 'What is the "Observer Effect"?', 'multiple_choice', 8, 10)
        RETURNING id
    )
    INSERT INTO public.quiz_options (question_id, option_text, is_correct) VALUES 
    ((SELECT id FROM q), 'The phenomenon where particles speed up when watched', false),
    ((SELECT id FROM q), 'The rule that measuring a quantum system inherently changes or collapses its state', true),
    ((SELECT id FROM q), 'The idea that experiments only work if a human is present', false),
    ((SELECT id FROM q), 'The optical illusion seen in wave crests', false);

    -- Q9
    WITH q AS (
        INSERT INTO public.quiz_questions (module_id, question_text, question_type, order_index, points)
        VALUES (v_module_id, 'Why does an interference pattern prove matter acts as a wave?', 'multiple_choice', 9, 10)
        RETURNING id
    )
    INSERT INTO public.quiz_options (question_id, option_text, is_correct) VALUES 
    ((SELECT id FROM q), 'Particles cannot cancel each other out in empty space, only overlapping waves can', true),
    ((SELECT id FROM q), 'Because it matches the ripples seen in water perfectly', false),
    ((SELECT id FROM q), 'Because particles only travel in straight lines', false),
    ((SELECT id FROM q), 'Because the camera recorded a wave shape', false);

    -- Q10
    WITH q AS (
        INSERT INTO public.quiz_questions (module_id, question_text, question_type, order_index, points)
        VALUES (v_module_id, 'Why is maintaining superposition critical for a quantum computer?', 'multiple_choice', 10, 10)
        RETURNING id
    )
    INSERT INTO public.quiz_options (question_id, option_text, is_correct) VALUES 
    ((SELECT id FROM q), 'It prevents the computer from overheating', false),
    ((SELECT id FROM q), 'It allows the computer to process a single logical pathway extremely fast', false),
    ((SELECT id FROM q), 'It allows the qubit to explore massive algorithmic landscapes simultaneously', true),
    ((SELECT id FROM q), 'It converts the classical bits into high-energy photons', false);

    RAISE NOTICE 'Double Slit quiz seed completed successfully.';
END $$;
