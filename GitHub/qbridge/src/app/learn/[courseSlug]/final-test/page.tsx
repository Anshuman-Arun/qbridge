import { createClient } from '@/lib/supabase/server';
import { notFound, redirect } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { FinalTestClient } from '@/components/learn/FinalTestClient';

interface PageProps {
    params: Promise<{
        courseSlug: string;
    }>;
}

export default async function FinalTestPage({ params }: PageProps) {
    const { courseSlug } = await params;
    const supabase = await createClient();

    // Fetch course
    const { data: course } = await supabase
        .from('courses')
        .select('id, title, slug')
        .eq('slug', courseSlug)
        .single();

    if (!course) notFound();

    // Fetch all modules for this course
    const { data: modules } = await supabase
        .from('modules')
        .select('id, title, slug, order_index')
        .eq('course_id', course.id)
        .order('order_index', { ascending: true });

    if (!modules || modules.length === 0) notFound();

    // Fetch all final test questions across all modules in this course
    const moduleIds = modules.map(m => m.id);
    const { data: questions } = await supabase
        .from('quiz_questions')
        .select('*')
        .in('module_id', moduleIds)
        .eq('is_final_test', true)
        .order('order_index', { ascending: true });

    // Check authentication
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect('/auth/sign-in');

    // Check that all lesson quizzes are passed (prerequisite)
    const { data: attempts } = await supabase
        .from('quiz_attempts')
        .select('module_id, score, max_score, is_final_test')
        .eq('user_id', user.id)
        .in('module_id', moduleIds);

    const allLessonsPassed = modules.every(m => {
        const moduleAttempts = (attempts || []).filter(a => a.module_id === m.id && !a.is_final_test);
        return moduleAttempts.some(a => (a.score / a.max_score) >= 0.7);
    });

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-12 px-6">
            <div className="max-w-4xl mx-auto space-y-8">
                <Link
                    href="/learn"
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Learning Path
                </Link>

                <div className="space-y-4 border-b border-white/10 pb-8">
                    <div className="flex items-center gap-3 text-brand-purple text-sm font-mono uppercase tracking-wider">
                        <span>{course.title}</span>
                        <span>/</span>
                        <span>Final Test</span>
                    </div>
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        Module Final Test
                    </h1>
                    <p className="text-xl text-gray-400 leading-relaxed">
                        Score at least 80% to complete this module. This test covers all lessons in {course.title}.
                    </p>
                </div>

                {!allLessonsPassed ? (
                    <div className="p-8 text-center border border-white/10 rounded-xl bg-white/5">
                        <p className="text-gray-400 text-lg mb-2">You need to pass all lesson quizzes first.</p>
                        <p className="text-gray-600 text-sm">Complete each lesson with at least 70% to unlock the final test.</p>
                        <Link href="/learn" className="inline-block mt-4 px-6 py-3 bg-brand-purple text-white rounded-xl hover:bg-brand-purple/90 transition-colors">
                            Return to Learning Path
                        </Link>
                    </div>
                ) : questions && questions.length > 0 ? (
                    <FinalTestClient
                        questions={questions.map(q => ({
                            id: q.id,
                            type: q.question_type,
                            questionText: q.question_text,
                            options: q.options,
                            correctAnswer: q.correct_answer,
                            tags: q.tags || [],
                            points: q.points,
                        }))}
                        moduleId={modules[0].id}
                        courseSlug={courseSlug}
                    />
                ) : (
                    <div className="p-8 text-center border border-white/10 rounded-xl bg-white/5">
                        <p className="text-gray-400">No final test questions have been created for this course yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
