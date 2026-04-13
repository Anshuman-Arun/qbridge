"use client";

import { useState } from "react";
import { Monitor, Calculator, Zap, X, Calendar, Clock } from "lucide-react";
import { AnimatePresence, motion, Variants } from "framer-motion";

interface Program {
    id: number;
    title: string;
    date: string;
    icon: any;
    shortDesc: string;
    fullDesc: string;
    tags: string[];
}

const programs: Program[] = [
    {
        id: 1,
        title: "Quantum Cryptography",
        date: "Jan 1, 2026",
        icon: Monitor,
        shortDesc: "This is a short session on quantum cryptography.",
        fullDesc: "This is a short session on quantum cryptography.",
        tags: []
    },
    {
        id: 2,
        title: "Quantum computing in biology",
        date: "Jan 1, 2026",
        icon: Calculator,
        shortDesc: "Quantum computing can model proteins faster and analyze other parts of biology we can't currently simulate.",
        fullDesc: "Quantum computing can model proteins faster and analyze other parts of biology we can't currently simulate.",
        tags: []
    },
    {
        id: 3,
        title: "Quantum computing in AI",
        date: "Jan 1, 2026",
        icon: Zap,
        shortDesc: "Learn about AI power consumption and quantum speedups in Artificial Intelligence training, especially in reinforcement learning tasks.",
        fullDesc: "Learn about AI power consumption and quantum speedups in Artificial Intelligence training, especially in reinforcement learning tasks.",
        tags: []
    },
];

export default function ProgramsPage() {
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const selectedProgram = programs.find((p) => p.id === selectedId);

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
    };

    return (
        <div className="relative min-h-screen bg-black text-gray-100 overflow-hidden py-24 px-6">
            {/* Dynamic Mesh Gradients */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], x: [0, 60, 0], y: [0, -40, 0] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-brand-cyan/20 blur-[120px] mix-blend-screen"
                />
                <motion.div
                    animate={{ scale: [1, 1.3, 1], x: [0, -50, 0], y: [0, 50, 0] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-brand-purple/20 blur-[120px] mix-blend-screen"
                />
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="relative z-10 max-w-7xl mx-auto"
            >
                <motion.div variants={itemVariants} className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 mb-4 tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                        Live Programs
                    </h1>
                    <p className="text-gray-400 font-medium">Join our exclusive live sessions to accelerate your quantum journey.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {programs.map((program) => (
                        <motion.div
                            variants={itemVariants}
                            layoutId={`card-${program.id}`}
                            key={program.id}
                            onClick={() => setSelectedId(program.id)}
                            className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl cursor-pointer transition-all duration-300 hover:bg-white/10 hover:border-brand-cyan/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] group hover:-translate-y-1 relative overflow-hidden"
                        >
                            {/* Inner Ambient Glow */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/5 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-cyan/20 transition-colors duration-500" />

                            <div className="relative z-10">
                                <div className="w-14 h-14 rounded-2xl bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center mb-6 text-brand-purple group-hover:scale-110 group-hover:bg-brand-purple/20 transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                                    <program.icon className="w-7 h-7" />
                                </div>
                                <p className="text-brand-cyan text-xs font-bold font-mono mb-3 tracking-widest uppercase">{program.date}</p>
                                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-brand-cyan transition-all duration-300">{program.title}</h3>
                                <p className="text-gray-400 text-sm line-clamp-2 font-medium leading-relaxed">{program.shortDesc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <AnimatePresence>
                    {selectedId && selectedProgram && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl">
                            <motion.div
                                layoutId={`card-${selectedId}`}
                                className="w-full max-w-2xl bg-black border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] relative"
                            >
                                {/* Modal Top Ambient Glow */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-32 bg-brand-cyan/10 blur-[80px]" />

                                <button
                                    onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                                    className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full text-gray-400 hover:text-white transition-all z-20"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                <div className="p-8 md:p-12 relative z-10">
                                    <div className="flex items-center gap-5 mb-8">
                                        <div className="w-16 h-16 rounded-2xl bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center text-brand-purple shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                                            <selectedProgram.icon className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <h2 className="text-3xl font-black text-white tracking-tight">{selectedProgram.title}</h2>
                                            <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-400 font-medium">
                                                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-brand-cyan" /> {selectedProgram.date}</span>
                                                <span className="bg-brand-purple/10 text-brand-purple px-2 py-0.5 rounded-md text-xs font-bold uppercase tracking-widest border border-brand-purple/20">Live Session</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 mb-8">
                                        <p className="text-gray-300 leading-relaxed text-base font-medium">
                                            {selectedProgram.fullDesc}
                                        </p>
                                    </div>

                                    {selectedProgram.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-8">
                                            {selectedProgram.tags.map(tag => (
                                                <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs font-bold uppercase tracking-widest hover:border-brand-cyan/30 transition-colors cursor-default">
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-brand-purple to-brand-cyan text-white font-black uppercase tracking-widest shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] active:scale-[0.98] transition-all">
                                        Register Now
                                    </button>
                                </div>
                            </motion.div>
                            {/* Backdrop click handler */}
                            <div className="absolute inset-0 z-[-1]" onClick={() => setSelectedId(null)} />
                        </div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
