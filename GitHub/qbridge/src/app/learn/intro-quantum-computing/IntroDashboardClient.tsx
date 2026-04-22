'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowRight, BookOpen, Clock, Star, BarChart2,
    CheckCircle2, Check, Users, Atom, Code2, Zap,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { CourseSection } from '@/components/learn/CourseSection';
import { AdvancedCourseTeaser } from '@/components/learn/AdvancedCourseTeaser';

interface IntroDashboardClientProps {
    sortedCourses: any[];
    quizAttempts: any[];
    isQCLocked: boolean;
    isEnrolled: boolean;
    userId: string;
    firstUnlockedHref: string;
    totalModules: number;
    completedModules: number;
}

const WHAT_YOU_LL_LEARN = [
    'Represent quantum states using vectors, matrices, and complex numbers',
    'Explain wave–particle duality, superposition, and quantum entanglement',
    'Implement classical logic gates and understand their quantum analogs',
    'Write Python and use key scientific computing libraries',
    'Represent qubits on the Bloch sphere and manipulate them with gates',
    "Understand Shor's Algorithm and its threat to classical cryptography",
    "Implement Grover's Algorithm for quadratic search speedups",
    'Build multi-qubit circuits using entanglement and interference',
];

const SKILLS = [
    'Linear Algebra', 'Complex Numbers', 'Matrix Operations',
    'Wave-Particle Duality', 'Superposition', 'Entanglement',
    'Python', 'Logic Gates', 'Big-O Complexity',
    'Qubits', 'Bloch Sphere', 'Quantum Gates',
    "Shor's Algorithm", "Grover's Algorithm",
];

const COURSE_COLORS: Record<string, 'brand-cyan' | 'brand-purple'> = {
    mathematics: 'brand-cyan',
    physics: 'brand-purple',
    programming: 'brand-cyan',
    'quantum-computing': 'brand-purple',
};

export function IntroDashboardClient({
    sortedCourses, quizAttempts, isQCLocked,
    isEnrolled: initialEnrolled, userId,
    firstUnlockedHref, totalModules, completedModules,
}: IntroDashboardClientProps) {
    const [enrolled, setEnrolled] = useState(initialEnrolled);
    const [enrolling, setEnrolling] = useState(false);
    const supabase = createClient();

    const progressPercent = totalModules > 0
        ? Math.round((completedModules / totalModules) * 100)
        : 0;

    const handleEnroll = async () => {
        if (enrolled || enrolling) return;
        setEnrolling(true);
        await supabase.from('course_interest').upsert(
            { user_id: userId, course_slug: 'intro-quantum-computing' },
            { onConflict: 'user_id,course_slug' }
        );
        setEnrolled(true);
        setEnrolling(false);
    };

    return (
        <div className="min-h-screen bg-[#05050A] text-gray-200">
            {/* Ambient background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brand-cyan/5 blur-[160px] rounded-full" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-brand-purple/5 blur-[120px] rounded-full" />
            </div>

            {/* Page header — full width */}
            <div className="relative z-10 pt-28 pb-10 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-6 font-mono uppercase tracking-widest">
                        <Link href="/learn" className="hover:text-white transition-colors">Learn</Link>
                        <span>/</span>
                        <span className="text-brand-cyan">Introduction to Quantum Computing</span>
                    </div>

                    <div className="flex items-start justify-between flex-wrap gap-4">
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-[10px] font-black uppercase tracking-widest text-brand-cyan bg-brand-cyan/15 border border-brand-cyan/30 rounded-full px-2.5 py-0.5">
                                    Beginner
                                </span>
                                <span className="text-[10px] font-black uppercase tracking-widest text-green-400 bg-green-500/10 border border-green-500/20 rounded-full px-2.5 py-0.5">
                                    Free
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight mb-3">
                                Introduction to Quantum Computing
                            </h1>
                            <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
                                Build your foundation step-by-step. Master the math, physics, and programming prerequisites to unlock the world of quantum algorithms.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Two-column body */}
            <div className="relative z-10 px-6 pb-24">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-8 gap-10 items-start">

                        {/* ── LEFT: Curriculum ── */}
                        <div className="lg:col-span-5 space-y-4">
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                                <span className="w-1 h-6 rounded-full bg-brand-cyan" />
                                Your Learning Path
                            </h2>

                            {sortedCourses.length > 0 ? (
                                sortedCourses.map((course, index) => {
                                    const isQC = course.slug === 'quantum-computing';
                                    return (
                                        <CourseSection
                                            key={course.id}
                                            courseId={course.id}
                                            courseSlug={course.slug}
                                            title={course.title}
                                            color={COURSE_COLORS[course.slug] ?? (index % 2 === 0 ? 'brand-cyan' : 'brand-purple')}
                                            modules={course.modules}
                                            quizAttempts={quizAttempts.filter((a: any) =>
                                                course.modules.some((m: any) => m.id === a.module_id)
                                            )}
                                            locked={isQC ? isQCLocked : false}
                                            lockMessage={isQC
                                                ? 'Complete all lessons and final tests in Mathematics, Physics, and Programming to unlock Quantum Computing.'
                                                : undefined}
                                            defaultExpanded={index === 0}
                                        />
                                    );
                                })
                            ) : (
                                <div className="text-center text-gray-500 p-12 bg-white/5 border border-white/10 rounded-3xl">
                                    <p>No courses found. Please seed the database.</p>
                                </div>
                            )}

                            {/* What comes next */}
                            <div className="mt-6">
                                <AdvancedCourseTeaser />
                            </div>
                        </div>

                        {/* ── RIGHT: Details Card (sticky) ── */}
                        <div className="lg:col-span-3">
                            <div className="sticky top-24 space-y-5">

                                {/* Main "Start / Continue" card */}
                                <motion.div
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 space-y-5 shadow-[0_0_40px_rgba(6,182,212,0.1)]"
                                >
                                    {/* Progress */}
                                    {completedModules > 0 && (
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-xs text-gray-400">
                                                <span>Your progress</span>
                                                <span className="font-bold text-white">{completedModules}/{totalModules} lessons</span>
                                            </div>
                                            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${progressPercent}%` }}
                                                    transition={{ duration: 1, ease: 'easeOut' }}
                                                    className="h-full rounded-full bg-gradient-to-r from-brand-cyan to-blue-400"
                                                />
                                            </div>
                                            <p className="text-[11px] text-gray-500">{progressPercent}% complete</p>
                                        </div>
                                    )}

                                    {/* CTA */}
                                    <Link
                                        href={firstUnlockedHref}
                                        className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-black text-white bg-gradient-to-r from-brand-cyan to-blue-500 shadow-[0_0_25px_rgba(6,182,212,0.3)] hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] hover:-translate-y-0.5 transition-all duration-300"
                                    >
                                        {completedModules > 0 ? 'Continue Learning' : 'Start Course'}
                                        <ArrowRight className="w-5 h-5" />
                                    </Link>

                                    {/* Enroll for updates */}
                                    <button
                                        onClick={handleEnroll}
                                        disabled={enrolled || enrolling}
                                        className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 border ${
                                            enrolled
                                                ? 'bg-green-500/10 border-green-500/20 text-green-400 cursor-default'
                                                : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20'
                                        }`}
                                    >
                                        <AnimatePresence mode="wait">
                                            {enrolled ? (
                                                <motion.span key="enrolled" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                                                    <Check className="w-4 h-4" /> Enrolled
                                                </motion.span>
                                            ) : (
                                                <motion.span key="enroll" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                                                    <Users className="w-4 h-4" />
                                                    {enrolling ? 'Enrolling...' : 'Enroll for course updates'}
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    </button>

                                    <p className="text-center text-[11px] text-gray-600">Free forever · No ads · No account sharing</p>
                                </motion.div>

                                {/* Stats */}
                                <motion.div
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.15 }}
                                    className="rounded-3xl border border-white/8 bg-white/[0.02] p-5"
                                >
                                    <div className="grid grid-cols-2 gap-3">
                                        {[
                                            { icon: BookOpen, value: `${totalModules}`, label: 'Lessons' },
                                            { icon: Clock, value: '~10 hrs', label: 'To complete' },
                                            { icon: BarChart2, value: 'Beginner', label: 'Level' },
                                            { icon: Star, value: 'Free', label: 'No cost, ever' },
                                        ].map(stat => (
                                            <div key={stat.label} className="p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                                                <div className="flex items-center gap-1.5 text-brand-cyan mb-1">
                                                    <stat.icon className="w-3.5 h-3.5" />
                                                    <span className="font-bold text-sm text-white">{stat.value}</span>
                                                </div>
                                                <p className="text-[11px] text-gray-500">{stat.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* What you'll learn */}
                                <motion.div
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="rounded-3xl border border-white/8 bg-white/[0.02] p-5"
                                >
                                    <h3 className="text-sm font-bold text-white mb-4">What you&apos;ll learn</h3>
                                    <ul className="space-y-2.5">
                                        {WHAT_YOU_LL_LEARN.map((item, i) => (
                                            <li key={i} className="flex items-start gap-2.5">
                                                <CheckCircle2 className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
                                                <span className="text-xs text-gray-300 leading-relaxed">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>

                                {/* Skills */}
                                <motion.div
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.25 }}
                                    className="rounded-3xl border border-white/8 bg-white/[0.02] p-5"
                                >
                                    <h3 className="text-sm font-bold text-white mb-4">Skills you&apos;ll gain</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {SKILLS.map(skill => (
                                            <span
                                                key={skill}
                                                className="px-2.5 py-1 rounded-full text-[11px] font-semibold border border-brand-cyan/20 bg-brand-cyan/5 text-brand-cyan"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
