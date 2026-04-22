import { redirect, notFound } from 'next/navigation';

// All sub-course slugs are now unified under the intro dashboard.
// Lesson pages (/learn/[courseSlug]/[moduleSlug]) are handled by the nested route and are unaffected.
const UNIFIED_COURSE_SLUGS = new Set(['mathematics', 'physics', 'programming', 'quantum-computing']);

interface PageProps {
    params: Promise<{ courseSlug: string }>;
}

export default async function CourseLandingPage({ params }: PageProps) {
    const { courseSlug } = await params;

    if (UNIFIED_COURSE_SLUGS.has(courseSlug)) {
        redirect('/learn/intro-quantum-computing');
    }

    notFound();
}
