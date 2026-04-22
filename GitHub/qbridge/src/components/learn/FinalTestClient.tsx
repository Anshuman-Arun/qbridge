'use client';

import { QuizBlock, QuizQuestionData } from '@/components/features/QuizBlock';
import { useRouter } from 'next/navigation';
import { Trophy, RotateCcw } from 'lucide-react';
import { useState } from 'react';

interface FinalTestClientProps {
    questions: QuizQuestionData[];
    moduleId: string;
    courseSlug: string;
}

export function FinalTestClient({ questions, moduleId, courseSlug }: FinalTestClientProps) {
    const router = useRouter();
    const [testResult, setTestResult] = useState<{ passed: boolean; score: number; maxScore: number } | null>(null);

    const handleSubmit = (result: { score: number; maxScore: number; passed: boolean }) => {
        setTestResult(result);
    };

    return (
        <div className="space-y-8">
            <QuizBlock
                questions={questions}
                moduleId={moduleId}
                isFinalTest={true}
                onSubmit={handleSubmit}
            />

            {testResult && (
                <div className={`p-8 rounded-xl border text-center ${testResult.passed ? 'border-green-500/30 bg-green-500/5' : 'border-red-500/30 bg-red-500/5'}`}>
                    {testResult.passed ? (
                        <>
                            <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                            <h2 className="text-2xl font-bold text-white mb-2">🎉 Congratulations!</h2>
                            <p className="text-gray-300 mb-4">
                                You scored {Math.round((testResult.score / testResult.maxScore) * 100)}% — Module Complete!
                            </p>
                            <button
                                onClick={() => router.push('/learn')}
                                className="px-6 py-3 bg-brand-purple text-white rounded-xl hover:bg-brand-purple/90 transition-colors"
                            >
                                Return to Learning Path
                            </button>
                        </>
                    ) : (
                        <>
                            <h2 className="text-2xl font-bold text-white mb-2">Not Quite</h2>
                            <p className="text-gray-300 mb-4">
                                You scored {Math.round((testResult.score / testResult.maxScore) * 100)}% — You need at least 80% to pass.
                            </p>
                            <button
                                onClick={() => { setTestResult(null); window.location.reload(); }}
                                className="flex items-center gap-2 mx-auto px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors"
                            >
                                <RotateCcw className="w-4 h-4" />
                                Try Again
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
