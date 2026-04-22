'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BookOpen, Clock, BarChart2, Zap, CheckCircle2,
    Lock, ArrowRight, Star, Check, Users, Atom
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface Module {
    id: string;
    title: string;
    slug: string;
    description: string;
    order_index: number;
}

interface CourseLandingClientProps {
    courseSlug: string;
    courseTitle: string;
    courseDescription: string;
    modules: Module[];
    passedModuleIds: string[];
    firstUnlockedSlug: string;
    userId: string;
    isEnrolled: boolean;
}

// Course-specific metadata
const COURSE_META: Record<string, {
    level: string;
    duration: string;
    whatYouLearn: string[];
    skills: string[];
    color: 'brand-cyan' | 'brand-purple';
    icon: React.ReactNode;
}> = {
    'mathematics': {
        level: 'Beginner',
        duration: '~4 hours',
        color: 'brand-cyan',
        icon: <BarChart2 className="w-8 h-8" />,
        whatYouLearn: [
            'Represent quantum states as vectors in complex Hilbert spaces',
            'Perform matrix operations critical to quantum gate computations',
            'Work fluently with complex numbers and Euler\'s formula',
            'Understand tensor products to model multi-qubit systems',
        ],
        skills: ['Linear Algebra', 'Complex Numbers', 'Matrix Operations', 'Tensor Products', 'Dirac Notation', 'Vector Spaces'],
    },
    'physics': {
        level: 'Beginner',
        duration: '~3 hours',
        color: 'brand-purple',
        icon: <Atom className="w-8 h-8" />,
        whatYouLearn: [
            'Explain wave-particle duality and what it means for computation',
            'Describe quantum measurement and the collapse of superposition',
            'Understand quantum entanglement and its implications',
            'Grasp why decoherence is the central challenge for quantum hardware',
        ],
        skills: ['Wave-Particle Duality', 'Superposition', 'Quantum Measurement', 'Entanglement', 'Decoherence', 'Bell States'],
    },
    'programming': {
        level: 'Beginner',
        duration: '~3 hours',
        color: 'brand-cyan',
        icon: <BookOpen className="w-8 h-8" />,
        whatYouLearn: [
            'Implement classical logic gates and understand their quantum analogs',
            'Analyze algorithm complexity using Big-O notation',
            'Write clean Python and use key scientific libraries',
            'Recognize the computational advantages quantum algorithms provide',
        ],
        skills: ['Logic Gates', 'Python', 'Big-O Complexity', 'Algorithms', 'Computational Thinking', 'NumPy'],
    },
    'quantum-computing': {
        level: 'Intermediate',
        duration: '~6 hours',
        color: 'brand-purple',
        icon: <Zap className="w-8 h-8" />,
        whatYouLearn: [
            'Represent qubits on the Bloch sphere and manipulate them with gates',
            'Build multi-qubit circuits using entanglement and interference',
            "Understand Shor's Algorithm and its threat to classical cryptography",
            "Implement Grover's Algorithm for quadratic search speedups",
        ],
        skills: ["Qubits", "Bloch Sphere", "Quantum Gates", "Entanglement", "Shor's Algorithm", "Grover's Algorithm", "Circuit Design"],
    },
};

const DEFAULT_META = COURSE_META['mathematics'];

export function CourseLandingClient({
    courseSlug, courseTitle, courseDescription,
    modules, passedModuleIds, firstUnlockedSlug,
    userId, isEnrolled: initialEnrolled,
}: CourseLandingClientProps) {
    const [enrolled, setEnrolled] = useState(initialEnrolled);
    const [enrolling, setEnrolling] = useState(false);
    const supabase = createClient();

    const meta = COURSE_META[courseSlug] || DEFAULT_META;
    const passedSet = new Set(passedModuleIds);
    const completedCount = modules.filter(m => passedSet.has(m.id)).length;
    const sortedModules = [...modules].sort((a, b) => a.order_index - b.order_index);

    const handleEnroll = async () => {
        if (enrolled || enrolling) return;
        setEnrolling(true);
        await supabase.from('course_interest').upsert({
            user_id: userId,
            course_slug: courseSlug,
        }, { onConflict: 'user_id,course_slug' });
        setEnrolled(true);
        setEnrolling(false);
    };

    const colorClass = meta.color === 'brand-cyan' ? 'text-brand-cyan' : 'text-brand-purple';
    const bgClass = meta.color === 'brand-cyan' ? 'bg-brand-cyan' : 'bg-brand-purple';
    const borderClass = meta.color === 'brand-cyan' ? 'border-brand-cyan' : 'border-brand-purple';
    const glowClass = meta.color === 'brand-cyan'
        ? 'shadow-[0_0_40px_rgba(6,182,212,0.25)]'
        : 'shadow-[0_0_40px_rgba(168,85,247,0.25)]';

    return (
        <div className="min-h-screen bg-[#05050A] text-gray-200">
            {/* Background ambient */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className={`absolute top-0 left-1/4 w-[600px] h-[600px] ${meta.color === 'brand-cyan' ? 'bg-brand-cyan' : 'bg-brand-purple'}/8 blur-[160px] rounded-full`} />
                <div className={`absolute bottom-0 right-1/4 w-[400px] h-[400px] ${meta.color === 'brand-purple' ? 'bg-brand-cyan' : 'bg-brand-purple'}/6 blur-[120px] rounded-full`} />
            </div>

            {/* Hero Section */}
            <div className="relative z-10 pt-28 pb-16 px-4">
                <div className="max-w-5xl mx-auto">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 font-mono uppercase tracking-widest">
                        <Link href="/learn" className="hover:text-white transition-colors">Learn</Link>
                        <span>/</span>
                        <span className={colorClass}>{courseTitle}</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
                        {/* Left: Info */}
                        <div className="lg:col-span-3 space-y-6">
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${borderClass}/30 bg-white/5 text-xs font-semibold uppercase tracking-widest mb-4 ${colorClass}`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${bgClass} animate-pulse`} />
                                    {meta.level} · Free
                                </div>
                                <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight mb-4">
                                    {courseTitle}
                                </h1>
                                <p className="text-gray-400 text-lg leading-relaxed">
                                    {courseDescription}
                                </p>
                            </motion.div>

                            {/* Stats row */}
                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="grid grid-cols-2 sm:grid-cols-4 gap-4"
                            >
                                {[
                                    { icon: <BookOpen className="w-4 h-4" />, value: `${modules.length} lessons`, label: 'Structured curriculum' },
                                    { icon: <Clock className="w-4 h-4" />, value: meta.duration, label: 'To complete' },
                                    { icon: <BarChart2 className="w-4 h-4" />, value: meta.level, label: 'Recommended level' },
                                    { icon: <Star className="w-4 h-4" />, value: 'Free', label: 'No cost, ever' },
                                ].map(stat => (
                                    <div key={stat.label} className="p-4 rounded-2xl bg-white/[0.03] border border-white/8">
                                        <div className={`flex items-center gap-1.5 ${colorClass} mb-2`}>
                                            {stat.icon}
                                            <span className="font-bold text-sm text-white">{stat.value}</span>
                                        </div>
                                        <p className="text-xs text-gray-500">{stat.label}</p>
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Right: Enroll card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.15 }}
                            className={`lg:col-span-2 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-7 space-y-5 sticky top-24 ${glowClass}`}
                        >
                            {/* Progress bar if started */}
                            {completedCount > 0 && (
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs text-gray-400">
                                        <span>Your progress</span>
                                        <span className="font-bold text-white">{completedCount}/{modules.length} lessons</span>
                                    </div>
                                    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(completedCount / modules.length) * 100}%` }}
                                            transition={{ duration: 1, ease: 'easeOut' }}
                                            className={`h-full rounded-full ${meta.color === 'brand-cyan'
                                                ? 'bg-gradient-to-r from-brand-cyan to-blue-400'
                                                : 'bg-gradient-to-r from-brand-purple to-brand-cyan'}`}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* CTA */}
                            <Link
                                href={firstUnlockedSlug ? `/learn/${courseSlug}/${firstUnlockedSlug}` : `/learn/${courseSlug}`}
                                className={`flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-black text-lg text-white transition-all duration-300
                                    ${meta.color === 'brand-cyan'
                                        ? 'bg-gradient-to-r from-brand-cyan to-blue-500 shadow-[0_0_30px_rgba(6,182,212,0.35)] hover:shadow-[0_0_50px_rgba(6,182,212,0.5)]'
                                        : 'bg-gradient-to-r from-brand-purple to-brand-cyan shadow-[0_0_30px_rgba(168,85,247,0.35)] hover:shadow-[0_0_50px_rgba(168,85,247,0.5)]'}
                                    hover:-translate-y-0.5`}
                            >
                                {completedCount > 0 ? 'Continue Learning' : 'Start Course'}
                                <ArrowRight className="w-5 h-5" />
                            </Link>

                            {/* Enroll for updates */}
                            <button
                                onClick={handleEnroll}
                                disabled={enrolled || enrolling}
                                className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 border
                                    ${enrolled
                                        ? 'bg-green-500/10 border-green-500/20 text-green-400 cursor-default'
                                        : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20'}`}
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

                            <p className="text-center text-xs text-gray-600">Free forever · No account sharing · No ads</p>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Body sections */}
            <div className="relative z-10 max-w-5xl mx-auto px-4 pb-24 space-y-16">

                {/* What you'll learn */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.5 }}
                >
                    <h2 className="text-2xl font-bold text-white mb-6">What you'll learn</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {meta.whatYouLearn.map((item, i) => (
                            <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 ${colorClass}`} />
                                <p className="text-sm text-gray-300 leading-relaxed">{item}</p>
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* Skills you'll gain */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.5 }}
                >
                    <h2 className="text-2xl font-bold text-white mb-6">Skills you'll gain</h2>
                    <div className="flex flex-wrap gap-2">
                        {meta.skills.map(skill => (
                            <span key={skill} className={`px-4 py-2 rounded-full text-sm font-semibold border ${borderClass}/25 bg-white/[0.03] ${colorClass}`}>
                                {skill}
                            </span>
                        ))}
                    </div>
                </motion.section>

                {/* Course Curriculum */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.5 }}
                >
                    <h2 className="text-2xl font-bold text-white mb-6">
                        Course curriculum
                        <span className="ml-3 text-base font-normal text-gray-500">({modules.length} lessons)</span>
                    </h2>
                    <div className="space-y-3">
                        {sortedModules.map((m, i) => {
                            const passed = passedSet.has(m.id);
                            const isFirst = i === 0;
                            const prevPassed = i > 0 && passedSet.has(sortedModules[i - 1].id);
                            const isUnlocked = passed || isFirst || prevPassed;
                            return (
                                <div key={m.id}>
                                    {isUnlocked ? (
                                        <Link
                                            href={`/learn/${courseSlug}/${m.slug}`}
                                            className={`flex items-center justify-between p-5 rounded-2xl border transition-all duration-200
                                                ${passed
                                                    ? 'bg-white/[0.03] border-white/8 hover:bg-white/8'
                                                    : 'bg-white/[0.02] border-white/8 hover:bg-white/8'}`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-black
                                                    ${passed ? `${bgClass}/20 ${colorClass}` : 'bg-white/5 text-gray-500'}`}>
                                                    {passed ? <Check className="w-4 h-4" /> : i + 1}
                                                </div>
                                                <div>
                                                    <p className={`font-semibold ${passed ? 'text-white' : colorClass}`}>{m.title}</p>
                                                    <p className="text-xs text-gray-500 mt-0.5">{m.description}</p>
                                                </div>
                                            </div>
                                            <ArrowRight className={`w-4 h-4 shrink-0 ml-4 ${colorClass}`} />
                                        </Link>
                                    ) : (
                                        <div className="flex items-center justify-between p-5 rounded-2xl border border-white/5 bg-black/20 opacity-50">
                                            <div className="flex items-center gap-4">
                                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 text-xs font-black text-gray-600">
                                                    {i + 1}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-500">{m.title}</p>
                                                    <p className="text-xs text-gray-600 mt-0.5">{m.description}</p>
                                                </div>
                                            </div>
                                            <Lock className="w-4 h-4 shrink-0 ml-4 text-gray-700" />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </motion.section>
            </div>
        </div>
    );
}
