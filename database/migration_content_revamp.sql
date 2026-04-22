-- Revamp Content Migration Script
-- 1. Clean up existing content (Cascade will remove modules and progress)
TRUNCATE TABLE public.courses CASCADE;

-- 2. Insert Courses and capture IDs
DO $$
DECLARE
    math_id uuid;
    coding_id uuid;
    physics_id uuid;
    qc_id uuid;
BEGIN
    -- Insert Courses
    INSERT INTO public.courses (title, slug, description, image_url) VALUES 
    ('Mathematics', 'mathematics', 'Foundational math for Quantum Computing', '/icons/math.png') RETURNING id INTO math_id;

    INSERT INTO public.courses (title, slug, description, image_url) VALUES 
    ('Programming', 'programming', 'Python and Computer Science basics', '/icons/code.png') RETURNING id INTO coding_id;

    INSERT INTO public.courses (title, slug, description, image_url) VALUES 
    ('Physics', 'physics', 'Wave mechanics and quantum phenomena', '/icons/physics.png') RETURNING id INTO physics_id;

    INSERT INTO public.courses (title, slug, description, image_url) VALUES 
    ('Quantum Computing', 'quantum-computing', 'Qubits, Gates, and Algorithms', '/icons/qc.png') RETURNING id INTO qc_id;

    -- Insert Modules for Mathematics
    INSERT INTO public.modules (course_id, title, slug, description, order_index) VALUES
    (math_id, 'Vectors', 'vectors', 'Introduction to Vectors', 1),
    (math_id, 'Matrices', 'matrices', 'Matrix operations and properties', 2),
    (math_id, 'Complex Numbers', 'complex-numbers', 'Real and Imaginary numbers', 3),
    (math_id, 'Planar relationships', 'planar-relationships', 'Connecting vectors and complex numbers', 4);

    -- Insert Modules for Programming
    INSERT INTO public.modules (course_id, title, slug, description, order_index) VALUES
    (coding_id, 'Bits and Gates', 'bits-and-gates', 'Classical bits and logic gates', 1),
    (coding_id, 'Algorithms', 'algorithms', 'Introduction to algorithms', 2),
    (coding_id, 'Big-O and efficiency', 'big-o-and-efficiency', 'Analyzing algorithmic complexity', 3),
    (coding_id, 'Python and Modules', 'python-and-modules', 'Basics of Python programming', 4);

    -- Insert Modules for Physics
    INSERT INTO public.modules (course_id, title, slug, description, order_index) VALUES
    (physics_id, 'Wave Particle Duality', 'wave-particle-duality', 'Light as both wave and particle', 1),
    (physics_id, 'Double Slit', 'double-slit', 'The classic experiment', 2),
    (physics_id, 'Entanglement/Superposition I', 'entanglement-superposition-i', 'Basic concepts of quantum states', 3),
    (physics_id, 'Entanglement/Superposition II', 'entanglement-superposition-ii', 'Advanced implications', 4),
    (physics_id, 'Implications of Superposition I', 'implications-of-superposition-i', 'What it means for reality - Part 1', 5),
    (physics_id, 'Implications of Superposition II', 'implications-of-superposition-ii', 'What it means for reality - Part 2', 6);

    -- Insert Modules for Quantum Computing
    INSERT INTO public.modules (course_id, title, slug, description, order_index) VALUES
    (qc_id, 'Qubits', 'qubits', 'The fundamental unit of quantum info', 1),
    (qc_id, 'The Bloch Sphere', 'the-bloch-sphere', 'Visualizing single qubit states', 2),
    (qc_id, 'Quantum Gates', 'quantum-gates', 'Manipulating qubits', 3),
    (qc_id, 'Reversibility and Information', 'reversibility-and-information', 'Thermodynamics of computation', 4),
    (qc_id, 'Quantum Algorithms I (Shor''s)', 'quantum-algorithms-i-shors', 'Factoring large numbers', 5),
    (qc_id, 'Quantum Algorithms II (Grover''s)', 'quantum-algorithms-ii-grovers', 'Search algorithms', 6),
    (qc_id, 'Multi-Qubit Systems/Circuits I', 'multi-qubit-systems-circuits-i', 'Entangling multiple qubits', 7),
    (qc_id, 'Multi-Qubit Systems/Circuits II', 'multi-qubit-systems-circuits-ii', 'Complex circuit design', 8);

END $$;
