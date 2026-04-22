-- ============================================================
-- PHYSICS MODULE CONTENT SEED
-- Run this in the Supabase SQL Editor.
-- ============================================================

DO $$
DECLARE
  v_phys_id uuid;
  v_wpd_id uuid;
  v_ds_id uuid;
BEGIN
  -- 1. Get Course ID
  SELECT id INTO v_phys_id FROM public.courses WHERE slug = 'physics' LIMIT 1;
  IF v_phys_id IS NULL THEN RAISE EXCEPTION 'Course missing.'; END IF;

  -- 2. Get Module IDs
  SELECT id INTO v_wpd_id FROM public.modules WHERE slug = 'wave-particle-duality' LIMIT 1;
  SELECT id INTO v_ds_id  FROM public.modules WHERE slug = 'double-slit' LIMIT 1;

  IF v_wpd_id IS NULL OR v_ds_id IS NULL THEN
    RAISE EXCEPTION 'One or more modules are missing.';
  END IF;

  -- Clear questions for safe active-dev replacement
  DELETE FROM public.quiz_questions WHERE module_id IN (v_wpd_id, v_ds_id);

  -- =======================================================
  -- 1. Wave Particle Duality
  -- =======================================================
  INSERT INTO public.quiz_questions (module_id, question_type, question_text, options, correct_answer, tags, order_index, points, is_final_test) VALUES 
  (v_wpd_id, 'multiple_choice', 'For centuries, classical physics successfully divided the entire universe tightly into which two distinct boxes?', '["Space and Time", "Matter and Energy", "Mass and Gravity", "Protons and Electrons"]', 'B', ARRAY['physics', 'wave-particle-duality', 'vocabulary'], 1, 1, false),
  (v_wpd_id, 'multiple_choice', 'In classical physics, what is a fundamental action that a wave can do, but a discrete piece of matter absolutely cannot do?', '["Travel through space", "Move at the speed of light", "Interfere with other waves", "Transfer energy"]', 'C', ARRAY['physics', 'wave-particle-duality', 'conceptual'], 2, 1, false),
  (v_wpd_id, 'multiple_choice', 'According to Isaac Newton, light fundamentally consisted of a stream of tiny microscopic particles called:', '["Nuclei", "Photons", "Corpuscles", "Quarks"]', 'C', ARRAY['physics', 'wave-particle-duality', 'vocabulary'], 3, 1, false),
  (v_wpd_id, 'multiple_choice', 'What definitive proof did Thomas Young find in the early 1800s that proved light was a continuous wave instead of particles?', '["He measured its mass", "He recorded its velocity", "He separated it with a prism", "He created an overlapping interference pattern using two slits"]', 'D', ARRAY['physics', 'wave-particle-duality', 'conceptual'], 4, 1, false),
  (v_wpd_id, 'multiple_choice', 'Louis de Broglie completely flipped our understanding of physics by proposing that:', '["Every wave eventually slows down into matter", "Light only behaves as a particle", "Every physical particle has an associated wavelength", "Waves and particles cannot coexist"]', 'C', ARRAY['physics', 'wave-particle-duality', 'conceptual'], 5, 1, false);

  -- =======================================================
  -- 2. Double Slit Experiment
  -- =======================================================
  INSERT INTO public.quiz_questions (module_id, question_type, question_text, options, correct_answer, tags, order_index, points, is_final_test) VALUES 
  (v_ds_id, 'multiple_choice', 'If classical physics was correct, firing a machine gun of solid electrons at a barrier with two slits should result in:', '["A single dot in the center of the screen", "Two distinct vertical bands of dots directly behind the slits", "An overlapping series of light and dark bands", "A random splashing pattern everywhere"]', 'B', ARRAY['physics', 'double-slit', 'conceptual'], 1, 1, false),
  (v_ds_id, 'multiple_choice', 'In the interference pattern, what causes the dark, empty spaces where absolutely no electrons hit?', '["The electrons were blocked by the solid barrier", "The electrons evaporated before reaching the screen", "The crests and troughs of overlapping waves met and canceled each other out", "The camera was broken"]', 'C', ARRAY['physics', 'double-slit', 'destructive-interference', 'conceptual'], 2, 1, false),
  (v_ds_id, 'multiple_choice', 'Scientists worried that electrons were simply bumping into each other mid-air to create a splashing wave effect. To completely rule this out, what did they do?', '["They put the experiment in a vacuum chamber", "They filmed it with a high-speed camera", "They tuned the gun down and fired one single electron at a time", "They shot heavier protons instead"]', 'C', ARRAY['physics', 'double-slit', 'experimentation'], 3, 1, false),
  (v_ds_id, 'multiple_choice', 'How is it mathematically and physically possible for a single isolated electron to create a wave interference pattern on its own?', '["It must have traveled as a wave through both slits simultaneously and interfered with itself", "It must have ricocheted off the tunnel multiple times", "Gravity distorted its path", "The detector screen malfunctioned"]', 'A', ARRAY['physics', 'double-slit', 'conceptual', 'hard'], 4, 1, false),
  (v_ds_id, 'multiple_choice', 'The core mechanism of quantum computing relies on an electron existing in all possible paths until it is forced to interact with the screen. This phenomenon is called:', '["Decoherence", "Superposition", "Entanglement", "Interference"]', 'B', ARRAY['physics', 'double-slit', 'superposition', 'vocabulary'], 5, 1, false);

  RAISE NOTICE 'Successfully inserted 10 physics questions.';
END $$;
