# QBridge AI Agent Context & Standards

This document serves as the absolute source of truth for any AI agent interacting with the QBridge project. It outlines the overarching goals, structural conventions, database seeding rules, and the strict UI/UX constraints that distinguish this application. 

**If you are an AI working on this repository, you must adhere strictly to these guidelines.**

---

## 1. Project Profile & Core Goals
**Mission**: To teach Quantum Computing and applied linear algebra to high school students (Algebra 2 background) taking them to "Junior Developer" proficiency. 
**Philosophy**: We do not use "dumbed-down" analogies. We bridge classical mathematics (matrices, vectors, logic gates) directly to quantum mechanics (superposition, entanglement, state vectors). 
**Aesthetic Core**: The platform must feel premium, mysterious, and cutting-edge. It should use dark themes, glassmorphism, subtle micro-animations, and vibrant brand colors (Cyan, Purple, Green). 
**Pedagogy**: Interactive-first. Active learning trumps passive reading.

---

## 2. Standardized Tech Stack & Methods
*   **Framework**: Next.js 16+, React 19.
*   **Styling**: Tailwind CSS v4. No generic Bootstrap-style forms. Every component must feel custom-built.
*   **Database & Auth**: Supabase (PostgreSQL).
*   **Animations**: Framer Motion. All lessons smoothly fade and slide in.
*   **Math Rendering**: KaTeX (via `katex`), `<LatexBlock>`, and `<MathText>`.
*   **Interactive Visuals**: Custom React components, HTML5 Canvas, `mafs` for 2D math plotting, and potentially Three.js/React-Three-Fiber for 3D (`@react-three/fiber`, `@react-three/drei`).
*   **Drag-and-Drop**: `@dnd-kit/core`
*   **Deployment**: Cloudflare Pages (via OpenNext wrapper `@opennextjs/cloudflare`).

---

## 3. Database & Seeding Standards
The database relies on a structured hierarchy of `courses` -> `modules` -> `lessons`/`questions`.
When creating or updating `.sql` seed files (found in the `/database/` directory):

*   **File Naming Convention**: Use `[topic]_seed.sql` (e.g., `algorithms_seed.sql`, `double_slit_seed.sql`, `master_content_seed.sql`).
*   **UUID Handling**: Use `DO $$ DECLARE ... BEGIN ... END $$;` blocks to fetch Course/Module IDs dynamically by their `slug` before inserting associated materials.
*   **Escape Characters in SQL**:
    *   Single quotes in SQL text must be escaped via doubling (e.g., `'don''t'`).
    *   **LaTeX in SQL**: Backslashes for KaTeX commands must be strictly managed. Standard LaTeX backslashes (`\begin`) become double (`\\begin`) inside raw SQL text fields.
    *   **LaTeX in JSONB**: When inserting options arrays natively represented as JSONB strings, backslashes must be quadrupled (`\\\\`) so they parse correctly down to double backslashes in the DB (e.g., `["\\\\begin{bmatrix}"]`).
*   **Clearing Before Seeding**: Always include a safe `DELETE FROM public.quiz_questions WHERE module_id = ...` before inserting new seeds to make scripts idempotent.

---

## 4. The UI/UX Golden Standard: The Lesson Blueprint

The lesson **"Wave-Particle Duality"** (`src/components/content/physics/WaveParticleDualityLesson.tsx`) is the absolute baseline for all future lesson content. **Never** create a boring, text-heavy page. 

Every new lesson must conform to this exact structural hierarchy and visual design language:

### I. The Wrapper
*   Surround the entire lesson in a div with spacing and entry animations:
    `<div className="space-y-20 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">`
*   Maintain huge visual breathing room (`space-y-20`).

### II. The Hook / Introduction
*   **Title**: `<h1 className="text-4xl font-bold text-white mb-5 leading-tight">`
*   **Intro Text**: 1-2 paragraphs of bold, captivating context. Give the "why". Make text `text-gray-300 text-lg leading-relaxed` with localized `strong` highlights (`text-white`).

### III. The Interactive Video (Mandatory)
*   Every lesson must start (or follow the intro) with an integrated video containing timeline checkpoints.
*   **Component**: `<InteractiveVideo url="..." checkpoints={checkpoints} />`
*   Checkpoints should interrupt the viewer with conceptual active recall questions.

### IV. Content Segments & Layouts
*   **Avoid text walls.** Break content into grids using `grid-cols-1 md:grid-cols-2`.
*   **Cards/Panels**: Use glassmorphism (`bg-white/5` or `bg-black/60`) with subtle borders (`border-white/10` or a colored accent `border-brand-purple/20`), alongside rounded corners (`rounded-2xl` or `rounded-3xl`).
*   **Math Rendering**: Always use `<LatexBlock displayMode expression="..." />` for standalone equations (often centered inside a distinct pill or card) and `<MathText>` for inline math text. 

### V. Interactive Elements (2+ Minimum)
*   A lesson is not a blog post. **At least two strictly custom interactive simulations/visualizations must be embedded in the lesson body.**
*   These are usually built as separate components in `src/components/features/` (e.g., `<WaveInterferencePond />`, `<PhotoelectricLabSim />`).
*   They should be highly reactive, visually appealing, and allow the student to poke, drag, input, or toggle variables. 

### VI. Concept Nuggets (Key Takeaways)
*   To punctuate difficult sections, embed the standard Concept Nugget.
*   **Component**: `<ConceptNugget text="The core, distilled takeaway goes here." />`
*   These act as rest stops for the brain.

### VII. "Going Further" Section
*   The final section of the lesson must challenge the student with an advanced implication, paradox, or transition into the next topic.
*   **Aesthetic Wrap**: It should be visually distinct from the rest of the page. It often features a glowing background gradient wrapper to signal a "bonus" or deep-dive section. 
    *   *Example*: `<div className="bg-gradient-to-br from-brand-purple/15 via-transparent to-brand-cyan/10 border border-white/10 rounded-3xl p-10 shadow-2xl relative overflow-hidden">`
    *   Must include the "Going Further" glowing pill badge:
        `<div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs text-gray-400 uppercase tracking-wider">Going Further</div>`

---

## 5. Summary Developer Checklist for New Lessons:
- [ ] Added `animate-in` and spacious `space-y-something` wrappers.
- [ ] Replaced plain H2s or bolded text with styled HTML cards or grids.
- [ ] Checked that there is exactly 1 `<InteractiveVideo>` with active checkpoints.
- [ ] Implemented at least 2 highly bespoke interactive sandboxes/components.
- [ ] Injected `<ConceptNugget>` elements periodically.
- [ ] Ended with a styled "Going Further" conceptual wrap-up.
- [ ] Confirmed there are no white-background elements. It is an exclusively dark mode platform.
- [ ] Used KaTeX for all math representations instead of raw text.
