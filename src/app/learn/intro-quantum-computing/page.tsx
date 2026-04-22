import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { IntroDashboardClient } from './IntroDashboardClient';

const PHYSICS_VISIBLE_SLUGS = new Set([
    'wave-particle-duality', 'wave-particle', 'double-slit',
    'double-slit-experiment', 'measurement-and-decoherence', 'quantum-entanglement',
]);
const PHYSICS_VISIBLE_TITLES = new Set([
    'Wave Particle Duality', 'The Double Slit Experiment', 'Double Slit',
    'Measurement and Decoherence', 'Quantum Entanglement',
]);

export default async function IntroDashboardPage() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect('/login?from=/learn/intro-quantum-computing');

    // Fetch all sub-courses + modules
    const { data: courses } = await supabase
        .from('courses')
        .select(`
            id, title, slug, description,
            modules (id, title, slug, description, order_index, module_type)
        `)
        .order('created_at', { ascending: true });

    // Fetch quiz attempts for this user
    const { data: attemptsData } = await supabase
        .from('quiz_attempts')
        .select('module_id, is_final_test, score, max_score')
        .eq('user_id', user.id);

    const quizAttempts = attemptsData || [];

    // Filter physics modules + sort all by order_index
    const sortedCourses = ((courses ?? []) as any[]).map(course => ({
        ...course,
        modules: (course.modules as any[])
            .filter(m =>
                course.slug !== 'physics' ||
                PHYSICS_VISIBLE_SLUGS.has(m.slug) ||
                PHYSICS_VISIBLE_TITLES.has(m.title)
            )
            .sort((a: any, b: any) => a.order_index - b.order_index),
    }));

    // QC lock: requires passing final tests in math, physics, programming
    const passedModuleIds = new Set(
        quizAttempts
            .filter(a => !a.is_final_test && (a.score / a.max_score) >= 0.7)
            .map(a => a.module_id)
    );

    const isQCLocked = (): boolean => {
        const prerequisiteSlugs = ['mathematics', 'programming', 'physics'];
        for (const slug of prerequisiteSlugs) {
            const course = sortedCourses.find(c => c.slug === slug);
            if (!course) return true;
            for (const mod of course.modules) {
                const best = quizAttempts
                    .filter(a => a.module_id === mod.id && a.is_final_test)
                    .sort((a: any, b: any) => (b.score / b.max_score) - (a.score / a.max_score))[0];
                if (!best || best.score / best.max_score < 0.8) return true;
            }
        }
        return false;
    };

    // Check enrollment in the unified intro course
    const { data: enrollment } = await supabase
        .from('course_interest')
        .select('id')
        .eq('user_id', user.id)
        .eq('course_slug', 'intro-quantum-computing')
        .maybeSingle();

    // Find first unlocked lesson href
    let firstUnlockedHref = '/learn/intro-quantum-computing';
    const qcLocked = isQCLocked();
    for (const course of sortedCourses) {
        if (course.slug === 'quantum-computing' && qcLocked) continue;
        const firstNotPassed = course.modules.find((m: any) => !passedModuleIds.has(m.id));
        if (firstNotPassed) {
            firstUnlockedHref = `/learn/${course.slug}/${firstNotPassed.slug}`;
            break;
        }
    }

    const totalModules = sortedCourses.reduce((acc, c) => acc + c.modules.length, 0);
    const completedModules = sortedCourses.reduce(
        (acc, c) => acc + c.modules.filter((m: any) => passedModuleIds.has(m.id)).length,
        0
    );

    return (
        <IntroDashboardClient
            sortedCourses={sortedCourses}
            quizAttempts={quizAttempts}
            isQCLocked={qcLocked}
            isEnrolled={!!enrollment}
            userId={user.id}
            firstUnlockedHref={firstUnlockedHref}
            totalModules={totalModules}
            completedModules={completedModules}
        />
    );
}
