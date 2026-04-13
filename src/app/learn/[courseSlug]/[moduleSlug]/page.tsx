import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Lock } from 'lucide-react';
import Link from 'next/link';
import { lessonRegistry } from '@/components/content/registry';
import { LessonQuizSection } from '../../../../components/learn/LessonQuizSection';

interface PageProps {
    params: Promise<{
        courseSlug: string;
        moduleSlug: string;
    }>;
}

export default async function LessonPage({ params }: PageProps) {
    const { courseSlug, moduleSlug } = await params;
    const supabase = await createClient();

    // Fetch module data by slug
    const { data: moduleData } = await supabase
        .from('modules')
        .select(`
            *,
            course:courses(id, title, slug)
        `)
        .eq('slug', moduleSlug)
        .single();

    // Verify module exists and belongs to the correct course
    if (!moduleData || moduleData.course.slug !== courseSlug) {
        notFound();
    }

    // Fetch quiz questions for this module (lesson quiz only, not final test)
    const { data: quizQuestions } = await supabase
        .from('quiz_questions')
        .select('*')
        .eq('module_id', moduleData.id)
        .eq('is_final_test', false)
        .order('order_index', { ascending: true });

    // Fetch all modules in the course to determine prev/next
    const { data: courseModules } = await supabase
        .from('modules')
        .select('id, title, slug, order_index')
        .eq('course_id', moduleData.course.id)
        .order('order_index', { ascending: true });

    const modules = courseModules || [];
    const currentIndex = modules.findIndex(m => m.id === moduleData.id);
    const prevModule = currentIndex > 0 ? modules[currentIndex - 1] : null;
    const nextModule = currentIndex < modules.length - 1 ? modules[currentIndex + 1] : null;

    // Check if user has passed the current lesson quiz
    const { data: { user } } = await supabase.auth.getUser();
    let currentLessonPassed = false;
    if (user) {
        const { data: attempts } = await supabase
            .from('quiz_attempts')
            .select('score, max_score')
            .eq('user_id', user.id)
            .eq('module_id', moduleData.id)
            .eq('is_final_test', false);

        if (attempts && attempts.length > 0) {
            currentLessonPassed = attempts.some(a => (a.score / a.max_score) >= 0.7);
        }
    }

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-12 px-6">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Navigation */}
                <Link
                    href="/learn"
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Learning Path
                </Link>

                {/* Header */}
                <div className="space-y-4 border-b border-white/10 pb-8">
                    <div className="flex items-center gap-3 text-brand-purple text-sm font-mono uppercase tracking-wider">
                        <span>{moduleData.course.title}</span>
                        <span>/</span>
                        <span>Lesson {moduleData.order_index}</span>
                    </div>
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        {moduleData.title}
                    </h1>
                    <p className="text-xl text-gray-400 leading-relaxed">
                        {moduleData.description}
                    </p>
                </div>

                {/* Content Area */}
                <div className="space-y-12">
                    {(() => {
                        const registryKey = moduleData.slug.toLowerCase().trim();
                        const LessonComponent = lessonRegistry[registryKey] || lessonRegistry['reference-lesson'];

                        if (lessonRegistry[registryKey]) {
                            return <LessonComponent />;
                        }

                        return (
                            <div className="prose prose-invert max-w-none">
                                <p className="text-gray-400 italic mb-8">
                                    Content for &quot;{moduleData.title}&quot; is being prepared.
                                    Below is a reference placeholder showing available features.
                                </p>
                                <LessonComponent />
                            </div>
                        );
                    })()}
                </div>

                {/* Lesson Quiz Section */}
                {quizQuestions && quizQuestions.length > 0 && (
                    <div className="border-t border-white/10 pt-12">
                        <LessonQuizSection
                            questions={quizQuestions.map(q => ({
                                id: q.id,
                                type: q.question_type,
                                questionText: q.question_text,
                                options: q.options,
                                correctAnswer: q.correct_answer,
                                tags: q.tags || [],
                                points: q.points,
                            }))}
                            moduleId={moduleData.id}
                        />
                    </div>
                )}

                {/* Navigation Footer */}
                <div className="border-t border-white/10 pt-8 flex justify-between">
                    {prevModule ? (
                        <Link
                            href={`/learn/${courseSlug}/${prevModule.slug}`}
                            className="px-6 py-3 rounded-xl bg-white/5 text-gray-300 hover:bg-white/10 transition-colors"
                        >
                            ← {prevModule.title}
                        </Link>
                    ) : (
                        <div />
                    )}
                    {nextModule ? (
                        currentLessonPassed ? (
                            <Link
                                href={`/learn/${courseSlug}/${nextModule.slug}`}
                                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-purple text-white hover:bg-brand-purple/90 transition-colors"
                            >
                                {nextModule.title} <ArrowRight className="w-4 h-4" />
                            </Link>
                        ) : (
                            <div className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 text-gray-500 cursor-not-allowed">
                                <Lock className="w-4 h-4" />
                                Pass the quiz to continue
                            </div>
                        )
                    ) : (
                        <Link
                            href={`/learn/${courseSlug}/final-test`}
                            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-purple text-white hover:bg-brand-purple/90 transition-colors"
                        >
                            Module Final Test <ArrowRight className="w-4 h-4" />
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
