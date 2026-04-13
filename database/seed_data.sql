-- Insert Math Course
DO $$
DECLARE
  math_course_id uuid;
BEGIN
  INSERT INTO public.courses (title, slug, description, image_url)
  VALUES ('Mathematics Foundation', 'math-foundation', 'Build your foundation in Quantum Computing step-by-step.', 'math.png')
  RETURNING id INTO math_course_id;

  -- Insert Math Modules
  INSERT INTO public.modules (course_id, title, slug, description, order_index, module_type) VALUES
  (math_course_id, 'Divisibility', 'divisibility', 'Understanding factors and multiples.', 1, 'lesson'),
  (math_course_id, 'Modular Arithmetic', 'modular-arithmetic', 'The clock arithmetic essential for encryption.', 2, 'lesson'),
  (math_course_id, 'Complex Numbers', 'complex-numbers', 'Visualizing imaginary numbers on the complex plane.', 3, 'lesson'),
  (math_course_id, 'Linear Algebra Intro', 'linear-algebra-intro', 'Vectors and matrices basics.', 4, 'lesson');

END $$;

-- Insert Quantum Course
DO $$
DECLARE
  quantum_course_id uuid;
BEGIN
  INSERT INTO public.courses (title, slug, description, image_url)
  VALUES ('Quantum Physics', 'quantum-physics', 'Dive into the weird world of quantum mechanics.', 'quantum.png')
  RETURNING id INTO quantum_course_id;

  -- Insert Quantum Modules
  INSERT INTO public.modules (course_id, title, slug, description, order_index, module_type) VALUES
  (quantum_course_id, 'Superposition', 'superposition', 'How a qubit can be 0 and 1 at the same time.', 1, 'lesson'),
  (quantum_course_id, 'Entanglement', 'entanglement', 'Spooky action at a distance.', 2, 'lesson'),
  (quantum_course_id, 'Quantum Gates', 'quantum-gates', 'Manipulating qubits with logic gates.', 3, 'lesson');

END $$;
