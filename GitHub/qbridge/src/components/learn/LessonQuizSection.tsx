'use client';
// Force re-compile

import { QuizBlock, QuizQuestionData } from '@/components/features/QuizBlock';

interface LessonQuizSectionProps {
    questions: QuizQuestionData[];
    moduleId: string;
}

export function LessonQuizSection({ questions, moduleId }: LessonQuizSectionProps) {
    const handleSubmit = (result: { score: number; maxScore: number; passed: boolean }) => {
        if (result.passed) {
            // Reload the page to update navigation state
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }
    };

    return (
        <QuizBlock
            questions={questions}
            moduleId={moduleId}
            isFinalTest={false}
            onSubmit={handleSubmit}
        />
    );
}
