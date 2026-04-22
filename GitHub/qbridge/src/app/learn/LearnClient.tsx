"use client";

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { AdvancedCourseTeaser } from '@/components/learn/AdvancedCourseTeaser';
import { ArrowRight, BookOpen, Clock, Star, BarChart2, Atom, Code2, Zap, CheckCircle2 } from 'lucide-react';

interface LearnClientProps {
    isEnrolled: boolean;
    totalLessons: number;
}

const SUB_COURSES = [
    { label: 'Mathematics', icon: BarChart2, color: 'text-brand-cyan' },
    { label: 'Physics', icon: Atom, color: 'text-brand-purple' },
    { label: 'Programming', icon: Code2, color: 'text-blue-400' },
    { label: 'Quantum Computing', icon: Zap, color: 'text-brand-cyan' },
];

export function LearnClient({ isEnrolled, totalLessons }: LearnClientProps) {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.12 } },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
    };

    return (
        <div className="relative min-h-screen bg-black text-gray-100 overflow-hidden py-24 px-6">
            {/* Animated Mesh Gradients */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, -30, 0] }}
                    transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-brand-cyan/20 blur-[120px] mix-blend-screen"
                />
                <motion.div
                    animate={{ scale: [1, 1.3, 1], x: [0, -40, 0], y: [0, 40, 0] }}
                    transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                    className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-brand-purple/20 blur-[120px] mix-blend-screen"
                />
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="relative z-10 max-w-4xl mx-auto"
            >
                {/* Header */}
                <motion.div variants={itemVariants} className="text-center mb-14 px-4">
                    <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs text-gray-400 uppercase tracking-widest mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
                        Learning Paths
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 mb-5 tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] pb-2 leading-tight">
                        Choose Your Path
                    </h1>
                    <p className="text-gray-400 font-medium text-lg max-w-2xl mx-auto leading-relaxed">
                        Start your quantum computing journey with our structured curriculum — from foundational math to quantum algorithms.
                    </p>
                </motion.div>

                {/* Intro Quantum Computing Card */}
                <motion.div variants={itemVariants}>
                    <div className="relative overflow-hidden rounded-3xl border border-brand-cyan/30 bg-gradient-to-br from-brand-cyan/5 via-black/80 to-brand-purple/5 backdrop-blur-xl shadow-[0_0_60px_rgba(6,182,212,0.08)] mb-6">
                        {/* Ambient glows */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-cyan/10 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/3 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-purple/10 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

                        <div className="relative z-10 p-8 md:p-10">
                            {/* Top row: badge + enrolled check */}
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-brand-cyan bg-brand-cyan/15 border border-brand-cyan/30 rounded-full px-2.5 py-0.5">
                                        Beginner
                                    </span>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-green-400 bg-green-500/10 border border-green-500/20 rounded-full px-2.5 py-0.5">
                                        Free
                                    </span>
                                </div>
                                {isEnrolled && (
                                    <div className="flex items-center gap-1.5 text-green-400 text-xs font-bold">
                                        <CheckCircle2 className="w-4 h-4" />
                                        Enrolled
                                    </div>
                                )}
                            </div>

                            {/* Title & Description */}
                            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-3 leading-tight">
                                Introduction to<br />Quantum Computing
                            </h2>
                            <p className="text-gray-400 text-base leading-relaxed mb-6 max-w-2xl">
                                Build your foundation step-by-step. Master the mathematics, physics, and programming prerequisites to unlock quantum algorithms.
                            </p>

                            {/* Sub-course tags */}
                            <div className="flex flex-wrap gap-2 mb-8">
                                {SUB_COURSES.map(c => (
                                    <span key={c.label} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold ${c.color}`}>
                                        <c.icon className="w-3.5 h-3.5" />
                                        {c.label}
                                    </span>
                                ))}
                            </div>

                            {/* Stats row */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                                {[
                                    { icon: BookOpen, value: `${totalLessons}`, label: 'Lessons' },
                                    { icon: Clock, value: '~10 hrs', label: 'To complete' },
                                    { icon: BarChart2, value: '4', label: 'Modules' },
                                    { icon: Star, value: 'Free', label: 'No cost, ever' },
                                ].map(stat => (
                                    <div key={stat.label} className="p-3 rounded-2xl bg-white/[0.03] border border-white/8 text-center">
                                        <div className="flex items-center justify-center gap-1.5 text-brand-cyan mb-1">
                                            <stat.icon className="w-4 h-4" />
                                            <span className="font-bold text-sm text-white">{stat.value}</span>
                                        </div>
                                        <p className="text-[11px] text-gray-500">{stat.label}</p>
                                    </div>
                                ))}
                            </div>

                            {/* CTA */}
                            <Link
                                href="/learn/intro-quantum-computing"
                                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-white bg-gradient-to-r from-brand-cyan to-blue-500 shadow-[0_0_30px_rgba(6,182,212,0.35)] hover:shadow-[0_0_50px_rgba(6,182,212,0.5)] hover:-translate-y-0.5 transition-all duration-300 text-base"
                            >
                                {isEnrolled ? 'Continue Learning' : 'Start Learning'}
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </motion.div>

                {/* Advanced QC Coming Soon */}
                <motion.div variants={itemVariants}>
                    <AdvancedCourseTeaser />
                </motion.div>
            </motion.div>
        </div>
    );
}
