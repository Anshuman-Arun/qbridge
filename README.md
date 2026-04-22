# qBridge — Quantum Computing Learning Platform

> A free, interactive platform designed to take high school students from Algebra 2 to quantum algorithm literacy.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ecf8e?logo=supabase)](https://supabase.com)
[![Cloudflare Pages](https://img.shields.io/badge/Deployed-Cloudflare%20Pages-F38020?logo=cloudflare)](https://pages.cloudflare.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org)

---

## What is qBridge?

qBridge is a structured, interactive-first curriculum that bridges classical mathematics directly to quantum computing — without dumbing anything down. Students build genuine intuition through custom simulations, interactive videos, and progressive quizzes before unlocking quantum algorithms.

**Core philosophy**: We don't use vague analogies. A qubit is a unit vector in ℂ². Superposition is a linear combination. Measurement is projection. We teach it properly.

---

## Curriculum Structure

```
Introduction to Quantum Computing (Free)
├── Mathematics        — Vectors, matrices, complex numbers, tensor products
├── Physics            — Wave-particle duality, entanglement, decoherence
├── Programming        — Logic gates, Python, Big-O, algorithms
└── Quantum Computing  — Qubits, gates, Shor's algorithm, Grover's algorithm

Advanced Quantum Computing (Coming Soon)
├── Quantum Error Correction
├── Variational Quantum Algorithms
├── Quantum Cryptography
├── Fault-Tolerant Quantum Computing
└── Advanced Quantum Circuit Design
```

Each lesson includes:
- An **interactive video** with active-recall checkpoints
- At minimum **two custom interactive simulations**
- **KaTeX-rendered math** throughout
- **Concept nuggets** and a "Going Further" deep-dive section

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router), React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Database & Auth | Supabase (PostgreSQL + Row Level Security) |
| Animations | Framer Motion |
| Math Rendering | KaTeX |
| Interactive Visuals | Custom React, HTML5 Canvas, `mafs`, Three.js / React Three Fiber |
| Drag & Drop | `@dnd-kit/core` |
| Deployment | Cloudflare Pages via `@opennextjs/cloudflare` |

---

## Getting Started

### Prerequisites

- Node.js 20+
- A [Supabase](https://supabase.com) project
- A [Cloudflare](https://cloudflare.com) account (for deployment)

### 1. Clone & install

```bash
git clone https://github.com/your-org/qbridge.git
cd qbridge
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env.local` and fill in your Supabase credentials:

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Set up the database

Run the SQL migration files in the `/database` directory against your Supabase project in order:

```
database/
├── course_interest_migration.sql   # Enrollment tracking table
└── ...                             # Other seed files
```

You can run these directly in the Supabase SQL editor or via the Supabase CLI.

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deployment

This project is configured for **Cloudflare Pages** using the OpenNext adapter.

```bash
# Build for Cloudflare
npm run cf:build

# Preview locally with Wrangler
npm run cf:preview

# Deploy to Cloudflare
npm run cf:deploy
```

Make sure your Cloudflare Pages environment variables match your `.env.local` values.

> **Note**: The `saveLesson` server action is currently a stub — local filesystem writes are not supported on Cloudflare Workers. Implement a storage backend (Supabase Storage or GitHub API) to enable it.

---

## Project Structure

```
src/
├── app/
│   ├── auth/                          # Auth callback route
│   ├── learn/
│   │   ├── page.tsx                   # Course selection (Intro + Advanced)
│   │   ├── LearnClient.tsx            # Course picker UI
│   │   ├── intro-quantum-computing/   # Unified course dashboard
│   │   └── [courseSlug]/
│   │       └── [moduleSlug]/          # Lesson pages
│   ├── login/ signup/                 # Auth pages
│   ├── profile/                       # User profile & enrollment history
│   ├── programs/                      # Live sessions / upcoming programs
│   └── tools/                         # Lesson builder (auth-protected)
├── components/
│   ├── content/                       # Lesson content components (per topic)
│   ├── features/                      # Reusable interactive simulations
│   └── learn/                         # Course navigation UI
├── lib/
│   └── supabase/                      # Supabase client helpers
├── actions/                           # Server actions
└── middleware.ts                      # Auth middleware + route guards
```

---

## Database Schema (Key Tables)

| Table | Purpose |
|---|---|
| `courses` | Top-level course definitions (mathematics, physics, etc.) |
| `modules` | Individual lessons within a course |
| `quiz_questions` | Questions attached to each module |
| `quiz_attempts` | User quiz attempt history + scores |
| `course_interest` | Enrollment/interest tracking for any course or program |

**To query program enrollments** (from the Programs page):
```sql
SELECT u.email, ci.course_slug, ci.enrolled_at
FROM course_interest ci
JOIN auth.users u ON u.id = ci.user_id
ORDER BY ci.enrolled_at DESC;
```

---

## Contributing

This is a private project. For questions, reach out via [Instagram](https://www.instagram.com/qbridgelearn/) or [YouTube](https://www.youtube.com/@qbridgelearn).

---

## AI Agent Context

If you are an AI agent working on this codebase, read `AI_CONTEXT.md` first. It contains the absolute standards for lesson design, database seeding conventions, and UI/UX requirements.

plug