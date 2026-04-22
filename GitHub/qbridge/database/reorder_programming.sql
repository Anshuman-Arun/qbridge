-- ============================================================
-- REORDER PROGRAMMING MODULES
-- Moves "Python and Modules" to the end of the course.
-- ============================================================

BEGIN;

-- Move Bits and Gates to #1
UPDATE public.modules 
SET order_index = 1 
WHERE slug = 'bits-and-gates';

-- Move Algorithms to #2
UPDATE public.modules 
SET order_index = 2 
WHERE slug = 'algorithms';

-- Move Big-O and efficiency to #3
-- Note: Checking both possible slugs 'big-o-and-efficiency' and 'big-o-efficiency'
UPDATE public.modules 
SET order_index = 3 
WHERE slug IN ('big-o-and-efficiency', 'big-o-efficiency');

-- Move Python and Modules to #4
UPDATE public.modules 
SET order_index = 4 
WHERE slug = 'python-and-modules';

COMMIT;

-- Verify results
SELECT title, slug, order_index 
FROM public.modules 
WHERE course_id = (SELECT id FROM public.courses WHERE slug = 'programming')
ORDER BY order_index ASC;
