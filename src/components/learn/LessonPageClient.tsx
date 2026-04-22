'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Lock, Unlock } from 'lucide-react';
import { useMinTime } from '@/hooks/useMinTime';
import { LessonQuizSection } from './LessonQuizSection';
import { type QuizQuestionData } from '@/components/features/QuizBlock';

interface LessonPageClientProps {
    questions: QuizQuestionData[];
    moduleId: string;
    courseSlug: string;
    devUnlockAll: boolean;
}

const MIN_TIME_BY_COURSE: Record<string, number> = {
    'quantum-computing': 5 * 60,   // 5 minutes
    'mathematics': 3 * 60,          // 3 minutes
    'physics': 3 * 60,              // 3 minutes
    'programming': 3 * 60,          // 3 minutes
};
const DEFAULT_MIN_TIME = 3 * 60;

export function LessonPageClient({ questions, moduleId, courseSlug, devUnlockAll }: LessonPageClientProps) {
    const requiredSeconds = devUnlockAll ? 0 : (MIN_TIME_BY_COURSE[courseSlug] ?? DEFAULT_MIN_TIME);
    const { ready, remaining, minutesRequired } = useMinTime(requiredSeconds, devUnlockAll);

    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;
    const progressPct = requiredSeconds > 0 ? ((requiredSeconds - remaining) / requiredSeconds) * 100 : 100;

    if (questions.length === 0) return null;

    return (
        <div className="border-t border-white/10 pt-12">
            <AnimatePresence mode="wait">
                {!ready ? (
                    <motion.div
                        key="gate"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="flex flex-col items-center gap-6 py-12 px-6 text-center"
                    >
                        {/* Timer ring */}
                        <div className="relative w-28 h-28">
                            <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 112 112">
                                <circle cx="56" cy="56" r="48" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
                                <circle
                                    cx="56" cy="56" r="48"
                                    fill="none"
                                    stroke="#a855f7"
                                    strokeWidth="8"
                                    strokeLinecap="round"
                                    strokeDasharray={2 * Math.PI * 48}
                                    strokeDashoffset={2 * Math.PI * 48 * (1 - progressPct / 100)}
                                    style={{ transition: 'stroke-dashoffset 1s linear' }}
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <Clock className="w-5 h-5 text-brand-purple mb-1" />
                                <span className="text-white font-black text-lg tabular-nums">
                                    {minutes}:{String(seconds).padStart(2, '0')}
                                </span>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <Lock className="w-4 h-4 text-gray-500" />
                                <p className="text-gray-300 font-semibold text-lg">Quiz Locked</p>
                            </div>
                            <p className="text-gray-500 text-sm max-w-sm">
                                Spend at least <strong className="text-gray-400">{minutesRequired} {minutesRequired === 1 ? 'minute' : 'minutes'}</strong> reading
                                the lesson before taking the quiz. This ensures you engage with the material.
                            </p>
                        </div>

                        {/* Progress track */}
                        <div className="w-64 h-1.5 rounded-full bg-white/10 overflow-hidden">
                            <motion.div
                                className="h-full rounded-full bg-gradient-to-r from-brand-purple to-brand-cyan"
                                animate={{ width: `${progressPct}%` }}
                                transition={{ duration: 1, ease: 'linear' }}
                            />
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="quiz"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {/* Unlocked badge */}
                        <div className="flex items-center gap-2 mb-6 text-brand-cyan text-sm font-semibold">
                            <Unlock className="w-4 h-4" />
                            Quiz unlocked — good luck!
                        </div>
                        <LessonQuizSection questions={questions} moduleId={moduleId} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
