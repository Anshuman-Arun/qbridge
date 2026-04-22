"use client";

import { motion } from 'framer-motion';
import { BookOpen, CheckCircle2, Star, Clock, TrendingUp, Atom, Zap } from 'lucide-react';

interface CourseProgressItem {
    id: string;
    title: string;
    slug: string;
    totalLessons: number;
    passedLessons: number;
    finalTestPassed: boolean;
}

interface TagItem {
    label: string;
    subtitle: string;
    percent: number;
    correct: number;
    attempted: number;
}

interface AttemptItem {
    module_id: string;
    module_title?: string;
    is_final_test: boolean;
    score: number;
    max_score: number;
    completed_at: string;
}

interface ProfileClientProps {
    userEmail: string;
    fullName: string;
    avatarUrl: string;
    overallGrade: number | null;
    latestAttemptsCount: number;
    totalAttemptsCount: number;
    courseProgress: CourseProgressItem[];
    tags: TagItem[];
    recentAttempts: AttemptItem[];
    historyAttempts: AttemptItem[];
    enrolledAdvanced: boolean;
}

function GradeRing({ percent }: { percent: number }) {
    const r = 54;
    const circ = 2 * Math.PI * r;
    const offset = circ - (percent / 100) * circ;
    const color = percent >= 80 ? '#00e5ff' : percent >= 60 ? '#a855f7' : '#f59e0b';
    return (
        <svg width="128" height="128" viewBox="0 0 128 128" className="rotate-[-90deg]">
            <circle cx="64" cy="64" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
            <circle
                cx="64" cy="64" r={r} fill="none"
                stroke={color} strokeWidth="10"
                strokeDasharray={circ}
                strokeDashoffset={offset}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 1s ease' }}
            />
        </svg>
    );
}

export function ProfileClient({
    userEmail, fullName, avatarUrl, overallGrade,
    latestAttemptsCount, totalAttemptsCount,
    courseProgress, tags, recentAttempts, historyAttempts,
    enrolledAdvanced,
}: ProfileClientProps) {
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 260, damping: 22 } },
    };

    const formatDate = (iso: string) =>
        new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    return (
        <div className="min-h-screen bg-[#05050A] text-gray-200 overflow-hidden">
            {/* Background gradients */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brand-purple/10 blur-[140px] rounded-full" />
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-brand-cyan/10 blur-[140px] rounded-full" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-4 py-28 space-y-8">

                {/* === Header Card === */}
                <motion.div
                    variants={itemVariants} initial="hidden" animate="show"
                    className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 flex flex-col sm:flex-row items-center gap-6"
                >
                    <img
                        src={avatarUrl} alt={fullName}
                        className="w-20 h-20 rounded-full ring-2 ring-brand-cyan/40 object-cover shrink-0"
                    />
                    <div className="flex-1 text-center sm:text-left">
                        <h1 className="text-2xl font-bold text-white">{fullName}</h1>
                        <p className="text-gray-400 text-sm mt-1">{userEmail}</p>
                    </div>
                    <div className="flex gap-6 text-center text-sm">
                        <div>
                            <p className="text-2xl font-bold text-white">{latestAttemptsCount}</p>
                            <p className="text-gray-500">Quizzes</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-white">{totalAttemptsCount}</p>
                            <p className="text-gray-500">Attempts</p>
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* === Overall Grade === */}
                    <motion.div
                        variants={itemVariants} initial="hidden" animate="show" transition={{ delay: 0.1 }}
                        className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 flex flex-col items-center justify-center gap-4"
                    >
                        <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold flex items-center gap-2">
                            <Star size={12} /> Overall Grade
                        </p>
                        {overallGrade !== null ? (
                            <div className="relative flex items-center justify-center">
                                <GradeRing percent={overallGrade} />
                                <span className="absolute text-3xl font-black text-white">
                                    {overallGrade}%
                                </span>
                            </div>
                        ) : (
                            <p className="text-gray-500 text-sm text-center">No quizzes completed yet.</p>
                        )}
                    </motion.div>

                    {/* === Course Progress === */}
                    <motion.div
                        variants={itemVariants} initial="hidden" animate="show" transition={{ delay: 0.15 }}
                        className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 space-y-4"
                    >
                        <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold flex items-center gap-2">
                            <BookOpen size={12} /> Course Progress
                        </p>
                        {courseProgress.length === 0 ? (
                            <p className="text-gray-500 text-sm">No courses found.</p>
                        ) : (
                            <div className="space-y-4">
                                {courseProgress.map(course => {
                                    const pct = course.totalLessons > 0
                                        ? Math.round((course.passedLessons / course.totalLessons) * 100)
                                        : 0;
                                    return (
                                        <div key={course.id} className="space-y-1.5">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-300 font-medium">{course.title}</span>
                                                <span className="text-gray-500">
                                                    {course.passedLessons}/{course.totalLessons} lessons
                                                    {course.finalTestPassed && (
                                                        <span className="ml-2 text-brand-cyan text-xs">✓ Final</span>
                                                    )}
                                                </span>
                                            </div>
                                            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${pct}%` }}
                                                    transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                                                    className="h-full rounded-full bg-gradient-to-r from-brand-cyan to-brand-purple"
                                                />
                                            </div>
                                        </div>
                                    );
                                })}

                                {/* Advanced QC enrollment row */}
                                <div className="space-y-1.5 pt-2 border-t border-white/5">
                                    <div className="flex justify-between items-center text-sm">
                                        <div className="flex items-center gap-2">
                                            <Atom className="w-3.5 h-3.5 text-brand-purple shrink-0" />
                                            <span className="text-gray-300 font-medium">Advanced Quantum Computing</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {enrolledAdvanced ? (
                                                <span className="flex items-center gap-1.5 text-xs px-2.5 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 font-semibold">
                                                    <Zap className="w-3 h-3" /> Enrolled
                                                </span>
                                            ) : (
                                                <span className="text-xs px-2.5 py-0.5 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple font-semibold">
                                                    Coming Soon
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                                        <div className="h-full w-0 rounded-full bg-gradient-to-r from-brand-purple to-brand-cyan opacity-30" />
                                    </div>
                                    <p className="text-xs text-gray-600">
                                        {enrolledAdvanced
                                            ? "You'll be notified when this course launches."
                                            : 'Head to the Learn page to enroll.'}
                                    </p>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>

                {/* === Skill Breakdown === */}
                {tags.length > 0 && (
                    <motion.div
                        variants={itemVariants} initial="hidden" animate="show" transition={{ delay: 0.2 }}
                        className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 space-y-5"
                    >
                        <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold flex items-center gap-2">
                            <TrendingUp size={12} /> Skill Breakdown
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {tags.map(tag => (
                                <div key={tag.label} className="space-y-1.5">
                                    <div className="flex justify-between text-sm">
                                        <div>
                                            <span className="text-gray-300 font-medium">{tag.label}</span>
                                            {tag.subtitle && (
                                                <span className="block text-xs text-gray-600">{tag.subtitle}</span>
                                            )}
                                        </div>
                                        <span className={`font-bold text-sm ${tag.percent >= 80 ? 'text-brand-cyan' : tag.percent >= 60 ? 'text-brand-purple' : 'text-amber-400'}`}>
                                            {tag.percent}%
                                        </span>
                                    </div>
                                    <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${tag.percent}%` }}
                                            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.4 }}
                                            className={`h-full rounded-full ${tag.percent >= 80 ? 'bg-brand-cyan' : tag.percent >= 60 ? 'bg-brand-purple' : 'bg-amber-400'}`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* === Recent Activity === */}
                {recentAttempts.length > 0 && (
                    <motion.div
                        variants={itemVariants} initial="hidden" animate="show" transition={{ delay: 0.25 }}
                        className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 space-y-4"
                    >
                        <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold flex items-center gap-2">
                            <Clock size={12} /> Recent Activity
                        </p>
                        <div className="divide-y divide-white/5">
                            {recentAttempts.map((a, i) => {
                                const pct = Math.round((a.score / a.max_score) * 100);
                                const passed = a.is_final_test ? pct >= 80 : pct >= 70;
                                return (
                                    <div key={i} className="py-3 flex justify-between items-center text-sm">
                                        <div>
                                            <span className="text-gray-300">{a.module_title || 'Quiz'}</span>
                                            <span className="ml-2 text-xs text-gray-600 px-1.5 py-0.5 rounded bg-white/5 border border-white/10">
                                                {a.is_final_test ? 'Final Test' : 'Lesson Quiz'}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={`font-bold ${passed ? 'text-brand-cyan' : 'text-amber-400'}`}>
                                                {pct}%
                                            </span>
                                            {passed
                                                ? <CheckCircle2 size={14} className="text-brand-cyan" />
                                                : <span className="text-xs text-gray-600">{formatDate(a.completed_at)}</span>
                                            }
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                )}

            </div>
        </div>
    );
}
