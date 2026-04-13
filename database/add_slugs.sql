-- Add slug column to modules
ALTER TABLE public.modules ADD COLUMN IF NOT EXISTS slug text;

-- Create a unique constraint (optional but good practice, scoped to course or global?)
-- Let's make it unique per course for now, or globally unique if we want /learn/[module-slug]
-- For /learn/[course]/[module], unique per course is sufficient.
-- But unique globally is safer for future flexibility.
CREATE UNIQUE INDEX IF NOT EXISTS modules_slug_idx ON public.modules (slug);

-- Backfill existing data with simplified slugs based on title
UPDATE public.modules
SET slug = lower(regexp_replace(title, '[^a-zA-Z0-9]+', '-', 'g'))
WHERE slug IS NULL;

-- Make it not null after backfill
ALTER TABLE public.modules ALTER COLUMN slug SET NOT NULL;
