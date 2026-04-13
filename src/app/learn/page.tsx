import { createClient } from '@/lib/supabase/server';
import { LearnClient } from './LearnClient';

export default async function LearnPage() {
    const supabase = await createClient();

    // Fetch all courses with their modules
    const { data: courses } = await supabase
        .from('courses')
        .select(`
            id,
            title,
            slug,
            modules (
                id,
                title,
                slug,
                description,
                order_index,
                module_type
            )
        `)
        .order('created_at', { ascending: true });

    // Fetch user and quiz attempts
    const { data: { user } } = await supabase.auth.getUser();

    let quizAttempts: any[] = [];
    if (user) {
        const { data } = await supabase
            .from('quiz_attempts')
            .select('module_id, is_final_test, score, max_score')
            .eq('user_id', user.id);
        quizAttempts = data || [];
    }

    // Sort modules by order_index
    const sortedCourses = courses?.map(course => ({
        ...course,
        modules: course.modules.sort((a: any, b: any) => a.order_index - b.order_index)
    })) || [];

    // Check if Quantum Computing course should be locked
    // It's locked unless Math, Physics, and Programming all have passing final tests
    const isQCLocked = (): boolean => {
        if (!user) return true;
        const prerequisiteSlugs = ['mathematics', 'programming', 'physics'];
        for (const slug of prerequisiteSlugs) {
            const course = sortedCourses.find(c => c.slug === slug);
            if (!course) return true;
            // Check that every module in this course has a passing final test attempt (>=80%)
            for (const mod of course.modules) {
                const bestFinal = quizAttempts
                    .filter(a => a.module_id === mod.id && a.is_final_test)
                    .sort((a: any, b: any) => (b.score / b.max_score) - (a.score / a.max_score))[0];
                if (!bestFinal || (bestFinal.score / bestFinal.max_score) < 0.8) {
                    return true;
                }
            }
        }
        return false;
    };

    return (
        <LearnClient 
            sortedCourses={sortedCourses}
            quizAttempts={quizAttempts}
            isQCLocked={isQCLocked()}
        />
    );
}
