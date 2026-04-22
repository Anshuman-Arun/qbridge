-- ============================================================
-- PHYSICS MODULE REVAMP PHASE 2 (NO-BLOCK VERSION)
-- This version uses standard SQL subqueries to avoid variable errors.
-- ============================================================

-- 1. Clean up old redundant modules
DELETE FROM public.modules WHERE slug IN ('ent-sup-1', 'ent-sup-2', 'implications-1', 'implications-2');

-- 2. Upsert "Measurement and Decoherence"
INSERT INTO public.modules (course_id, title, slug, description, order_index, module_type)
VALUES (
  (SELECT id FROM public.courses WHERE slug = 'physics' LIMIT 1), 
  'Measurement and Decoherence', 
  'measurement-and-decoherence', 
  'The Born Rule and why the world looks classical.', 
  3, 
  'lesson'
)
ON CONFLICT (slug) DO UPDATE SET 
  order_index = 3, 
  title = EXCLUDED.title, 
  description = EXCLUDED.description;

-- 3. Upsert "Quantum Entanglement"
INSERT INTO public.modules (course_id, title, slug, description, order_index, module_type)
VALUES (
  (SELECT id FROM public.courses WHERE slug = 'physics' LIMIT 1), 
  'Quantum Entanglement', 
  'quantum-entanglement', 
  'Spooky action at a distance and the speed of light.', 
  4, 
  'lesson'
)
ON CONFLICT (slug) DO UPDATE SET 
  order_index = 4, 
  title = EXCLUDED.title, 
  description = EXCLUDED.description;

-- 4. Wipe old questions to prevent duplicates
DELETE FROM public.quiz_questions 
WHERE module_id IN (
  SELECT id FROM public.modules WHERE slug IN ('measurement-and-decoherence', 'quantum-entanglement')
);

-- 5. Seed questions for Measurement and Decoherence
INSERT INTO public.quiz_questions (module_id, question_type, question_text, options, correct_answer, tags, order_index, points, is_final_test)
SELECT id, 'multiple_choice', 'What is the "Measurement Problem" in quantum mechanics?', '["Trying to find where a particle starts its journey", "The mystery of how a spreading wave decides exactly where to appear as a solid particle", "The difficulty of measuring a particle without using any energy", "The fact that particles move too fast to be seen"]', 'B', ARRAY['physics', 'measurement'], 1, 1, false
FROM public.modules WHERE slug = 'measurement-and-decoherence';

INSERT INTO public.quiz_questions (module_id, question_type, question_text, options, correct_answer, tags, order_index, points, is_final_test)
SELECT id, 'multiple_choice', 'The Born Rule states that the probability of finding a particle is tied to which property of its wave function?', '["Its velocity", "Its mass", "Its amplitude (height) squared", "Its distance from the source"]', 'C', ARRAY['physics', 'born-rule'], 2, 1, false
FROM public.modules WHERE slug = 'measurement-and-decoherence';

INSERT INTO public.quiz_questions (module_id, question_type, question_text, options, correct_answer, tags, order_index, points, is_final_test)
SELECT id, 'multiple_choice', 'If a quantum wave has a massive peak on the left and a shallow peak on the right, which is true?', '["The particle will always land on the left", "The particle is significantly more likely to appear on the left", "The particle will split in two", "The particle will disappear"]', 'B', ARRAY['physics', 'born-rule'], 3, 1, false
FROM public.modules WHERE slug = 'measurement-and-decoherence';

INSERT INTO public.quiz_questions (module_id, question_type, question_text, options, correct_answer, tags, order_index, points, is_final_test)
SELECT id, 'multiple_choice', 'Einstein famously said "God does not play dice" because he hated which quantum idea?', '["That light is a wave", "That matter has mass", "That the universe is driven by underlying probability and randomness", "That cats could be in boxes"]', 'C', ARRAY['physics', 'history'], 4, 1, false
FROM public.modules WHERE slug = 'measurement-and-decoherence';

INSERT INTO public.quiz_questions (module_id, question_type, question_text, options, correct_answer, tags, order_index, points, is_final_test)
SELECT id, 'multiple_choice', 'In the Schrödinger’s Cat experiment, what physical event is the cat''s fate directly tied to?', '["The opening of the box", "The sound of the Geiger counter", "A single radioactive atom in superposition", "The presence of a human observer"]', 'C', ARRAY['physics', 'schrodinger-cat'], 5, 1, false
FROM public.modules WHERE slug = 'measurement-and-decoherence';

INSERT INTO public.quiz_questions (module_id, question_type, question_text, options, correct_answer, tags, order_index, points, is_final_test)
SELECT id, 'multiple_choice', 'True or False: In quantum logic, until the box is opened, the cat is both entirely dead AND entirely alive at the same time.', '["True", "False"]', 'A', ARRAY['physics', 'schrodinger-cat'], 6, 1, false
FROM public.modules WHERE slug = 'measurement-and-decoherence';

INSERT INTO public.quiz_questions (module_id, question_type, question_text, options, correct_answer, tags, order_index, points, is_final_test)
SELECT id, 'multiple_choice', 'What does "Observation" actually mean in a quantum mechanical sense?', '["A human looking with their eyes", "Any physical interaction or exchange of information", "Recording data onto a hard drive", "Thinking about the experiment"]', 'B', ARRAY['physics', 'measurement'], 7, 1, false
FROM public.modules WHERE slug = 'measurement-and-decoherence';

INSERT INTO public.quiz_questions (module_id, question_type, question_text, options, correct_answer, tags, order_index, points, is_final_test)
SELECT id, 'multiple_choice', 'What is the concept of "Decoherence"?', '["The process of two waves adding together", "The instant a particle starts moving faster than light", "Interaction with the environment causing a wave function to collapse into a classical state", "The loss of energy in a vacuum"]', 'C', ARRAY['physics', 'decoherence'], 8, 1, false
FROM public.modules WHERE slug = 'measurement-and-decoherence';

INSERT INTO public.quiz_questions (module_id, question_type, question_text, options, correct_answer, tags, order_index, points, is_final_test)
SELECT id, 'multiple_choice', 'Why don’t we see everyday objects like chairs or baseballs in multiple places at once?', '["Because they have too much mass for gravity to allow it", "Because they are constantly interacting with air, light, and heat, causing them to decohere instantly", "Because quantum mechanics only applies to electricity", "Because we look at them too much"]', 'B', ARRAY['physics', 'decoherence'], 9, 1, false
FROM public.modules WHERE slug = 'measurement-and-decoherence';

INSERT INTO public.quiz_questions (module_id, question_type, question_text, options, correct_answer, tags, order_index, points, is_final_test)
SELECT id, 'multiple_choice', 'True or False: If a box were perfectly soundproofed and shielded from all interaction, macroscopic superposition (like the Cat) would theoretically be possible.', '["True", "False"]', 'A', ARRAY['physics', 'thought-experiment'], 10, 1, false
FROM public.modules WHERE slug = 'measurement-and-decoherence';

-- 6. Seed questions for Quantum Entanglement
INSERT INTO public.quiz_questions (module_id, question_type, question_text, options, correct_answer, tags, order_index, points, is_final_test)
SELECT id, 'multiple_choice', 'What was Albert Einstein’s famous name for quantum entanglement?', '["Ghostly connection", "Spooky action at a distance", "The universal link", "The probability trap"]', 'B', ARRAY['physics', 'entanglement'], 1, 1, false
FROM public.modules WHERE slug = 'quantum-entanglement';

INSERT INTO public.quiz_questions (module_id, question_type, question_text, options, correct_answer, tags, order_index, points, is_final_test)
SELECT id, 'multiple_choice', 'How are two electrons typically entangled?', '["By shining a bright light on them", "By pushing them incredibly close together until their probability waves overlap", "By cooling them to absolute zero", "By measuring them at the same time"]', 'B', ARRAY['physics', 'entanglement'], 2, 1, false
FROM public.modules WHERE slug = 'quantum-entanglement';

INSERT INTO public.quiz_questions (module_id, question_type, question_text, options, correct_answer, tags, order_index, points, is_final_test)
SELECT id, 'multiple_choice', 'According to the Pauli Exclusion principle, what is true about two entangled electrons in the same space?', '["They must be doing the exact same thing", "They cannot have the same spin direction", "They will eventually explode", "They will both disappear"]', 'B', ARRAY['physics', 'pauli-exclusion'], 3, 1, false
FROM public.modules WHERE slug = 'quantum-entanglement';

INSERT INTO public.quiz_questions (module_id, question_type, question_text, options, correct_answer, tags, order_index, points, is_final_test)
SELECT id, 'multiple_choice', 'Once two particles are entangled, what happens to their separate probability waves?', '["They become twice as large", "They cancel each other out", "They dissolve and fuse into one single, massive wave", "They begin to vibrate at different frequencies"]', 'C', ARRAY['physics', 'entanglement'], 4, 1, false
FROM public.modules WHERE slug = 'quantum-entanglement';

INSERT INTO public.quiz_questions (module_id, question_type, question_text, options, correct_answer, tags, order_index, points, is_final_test)
SELECT id, 'multiple_choice', 'If Particle A is on Earth and Particle B is a billion light-years away, what happens when Earth Base measures Particle A as an "Up" spin?', '["Particle B instantly becomes a \"Down\" spin", "Particle B becomes a \"Down\" spin after one billion years", "Particle A and B both disappear", "Nothing happens to Particle B"]', 'A', ARRAY['physics', 'entanglement'], 5, 1, false
FROM public.modules WHERE slug = 'quantum-entanglement';

INSERT INTO public.quiz_questions (module_id, question_type, question_text, options, correct_answer, tags, order_index, points, is_final_test)
SELECT id, 'multiple_choice', 'How fast does the correlation between entangled particles occur?', '["At the speed of light", "At half the speed of sound", "Instantly—in literally no time at all", "It depends on the distance"]', 'C', ARRAY['physics', 'entanglement'], 6, 1, false
FROM public.modules WHERE slug = 'quantum-entanglement';

INSERT INTO public.quiz_questions (module_id, question_type, question_text, options, correct_answer, tags, order_index, points, is_final_test)
SELECT id, 'multiple_choice', 'Why is it impossible to use entanglement to send a text message faster than the speed of light?', '["Because the particles are too small", "Because we cannot control the outcome of the measurement (the Born Rule)", "Because the signal gets lost in space", "Because light is always faster"]', 'B', ARRAY['physics', 'no-communication'], 7, 1, false
FROM public.modules WHERE slug = 'quantum-entanglement';

INSERT INTO public.quiz_questions (module_id, question_type, question_text, options, correct_answer, tags, order_index, points, is_final_test)
SELECT id, 'multiple_choice', 'To send a message, you must be able to choose the outcome. Why does the Born Rule block this in entanglement?', '["It makes all particles disappear", "It ensures that measurement is driven by random probability, not our choice", "It forces all spins to be the same", "It slows down the wave collapse"]', 'B', ARRAY['physics', 'born-rule'], 8, 1, false
FROM public.modules WHERE slug = 'quantum-entanglement';

INSERT INTO public.quiz_questions (module_id, question_type, question_text, options, correct_answer, tags, order_index, points, is_final_test)
SELECT id, 'multiple_choice', 'Where are we currently using entangled particles in modern technology?', '["Inside high-efficiency rocket engines", "Inside quantum microchips for computing", "For faster-than-light radio broadcasts", "Inside household lightbulbs"]', 'B', ARRAY['physics', 'application'], 9, 1, false
FROM public.modules WHERE slug = 'quantum-entanglement';

INSERT INTO public.quiz_questions (module_id, question_type, question_text, options, correct_answer, tags, order_index, points, is_final_test)
SELECT id, 'multiple_choice', 'True or False: Quantum entanglement breaks Einstein’s universal speed limit for pieces of information.', '["True", "False"]', 'B', ARRAY['physics', 'relativity'], 10, 1, false
FROM public.modules WHERE slug = 'quantum-entanglement';
