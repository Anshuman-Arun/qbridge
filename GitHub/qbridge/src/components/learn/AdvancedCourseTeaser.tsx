'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Sparkles, Atom, BrainCircuit, ChevronDown, Check, Zap } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

const COURSE_SLUG = 'advanced-quantum-computing';

const comingSoonModules = [
    { title: "Quantum Error Correction", desc: "Protect quantum information from decoherence." },
    { title: "Variational Quantum Algorithms", desc: "Hybrid classical-quantum optimization." },
    { title: "Quantum Cryptography", desc: "Unbreakable keys from physics, not math." },
    { title: "Fault-Tolerant Quantum Computing", desc: "Path to logical qubits at scale." },
    { title: "Advanced Quantum Circuit Design", desc: "Implement Shor's and Grover's algorithms." },
];

export function AdvancedCourseTeaser() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [enrolled, setEnrolled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [checkingStatus, setCheckingStatus] = useState(true);
    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
        const checkEnrollment = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) { setCheckingStatus(false); return; }
            const { data } = await supabase
                .from('course_interest')
                .select('id')
                .eq('user_id', user.id)
                .eq('course_slug', COURSE_SLUG)
                .maybeSingle();
            setEnrolled(!!data);
            setCheckingStatus(false);
        };
        checkEnrollment();
    }, []);

    const handleEnroll = async () => {
        if (enrolled || loading) return;
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            router.push('/login?from=/learn');
            setLoading(false);
            return;
        }
        await supabase.from('course_interest').upsert({
            user_id: user.id,
            course_slug: COURSE_SLUG,
        }, { onConflict: 'user_id,course_slug' });
        setEnrolled(true);
        setLoading(false);
    };

    return (
        <div className="relative mt-6">
            {/* Connector line from above */}
            <div className="absolute -top-6 left-8 w-px h-6 bg-gradient-to-b from-white/10 to-transparent" />

            <div className="relative overflow-hidden rounded-3xl border border-brand-purple/30 bg-gradient-to-br from-brand-purple/10 via-black/80 to-brand-cyan/5 backdrop-blur-xl shadow-[0_0_60px_rgba(168,85,247,0.1)]">
                {/* Ambient glow */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-brand-purple/15 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-cyan/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/3 pointer-events-none" />

                {/* Header */}
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between p-6 md:p-8 gap-4">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-brand-purple/20 border border-brand-purple/30">
                            <Atom className="w-7 h-7 text-brand-purple" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-[10px] font-black uppercase tracking-widest text-brand-purple bg-brand-purple/15 border border-brand-purple/30 rounded-full px-2.5 py-0.5">
                                    Coming Soon
                                </span>
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-pulse" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white">
                                Advanced Quantum Computing
                            </h2>
                            <p className="text-gray-400 text-sm mt-1">
                                Deep-dive algorithms, error correction, and quantum hardware.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 md:shrink-0">
                        {/* Enroll button */}
                        <motion.button
                            onClick={handleEnroll}
                            disabled={enrolled || loading || checkingStatus}
                            whileTap={!enrolled ? { scale: 0.97 } : undefined}
                            className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${
                                enrolled
                                    ? 'bg-green-500/15 border border-green-500/30 text-green-400 cursor-default'
                                    : 'bg-gradient-to-r from-brand-purple to-brand-cyan text-white shadow-[0_0_20px_rgba(168,85,247,0.35)] hover:shadow-[0_0_35px_rgba(168,85,247,0.5)] hover:-translate-y-0.5'
                            }`}
                        >
                            <AnimatePresence mode="wait">
                                {enrolled ? (
                                    <motion.span
                                        key="enrolled"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="flex items-center gap-2"
                                    >
                                        <Check className="w-4 h-4" />
                                        Enrolled
                                    </motion.span>
                                ) : (
                                    <motion.span
                                        key="enroll"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex items-center gap-2"
                                    >
                                        <Zap className="w-4 h-4" />
                                        {loading ? 'Enrolling...' : 'Enroll'}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </motion.button>

                        {/* Expand toggle */}
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className={`p-2.5 rounded-full border transition-all duration-300 ${
                                isExpanded
                                    ? 'bg-brand-purple/15 border-brand-purple/30 text-brand-purple'
                                    : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                            }`}
                        >
                            <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
                                <ChevronDown className="w-5 h-5" />
                            </motion.div>
                        </button>
                    </div>
                </div>

                {/* Expandable modules preview */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: 'easeInOut' }}
                            className="overflow-hidden"
                        >
                            <div className="mx-4 md:mx-8 mb-8 mt-2 p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                                <p className="text-xs uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-2">
                                    <Lock className="w-3 h-3" /> Module Preview — Content Under Construction
                                </p>
                                <div className="space-y-3">
                                    {comingSoonModules.map((mod, i) => (
                                        <div
                                            key={mod.title}
                                            className="flex items-start gap-4 p-4 rounded-xl bg-black/30 border border-white/5 opacity-60"
                                        >
                                            <div className="w-7 h-7 rounded-lg bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center shrink-0 mt-0.5">
                                                <BrainCircuit className="w-3.5 h-3.5 text-brand-purple/60" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-gray-300">{mod.title}</p>
                                                <p className="text-xs text-gray-500 mt-0.5">{mod.desc}</p>
                                            </div>
                                            <Lock className="w-4 h-4 text-gray-700 ml-auto mt-0.5 shrink-0" />
                                        </div>
                                    ))}
                                </div>

                                {enrolled ? (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-5 flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20"
                                    >
                                        <Sparkles className="w-5 h-5 text-green-400 shrink-0" />
                                        <p className="text-sm text-green-300 font-medium">
                                            You're on the list! We'll notify you when this course launches.
                                        </p>
                                    </motion.div>
                                ) : (
                                    <p className="mt-5 text-xs text-gray-500 text-center">
                                        Click <strong className="text-gray-400">Enroll</strong> above to be notified when this course launches.
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
