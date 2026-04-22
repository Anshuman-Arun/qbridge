"use client";

import { useState, useEffect } from "react";
import { Monitor, Calculator, Zap, X, Check } from "lucide-react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { createClient } from "@/lib/supabase/client";

interface BulletSection {
    intro: string;
    bullets: string[];
    outro: string;
}

interface Program {
    id: number;
    slug: string;
    title: string;
    icon: React.ElementType;
    shortDesc: string;
    fullDescIntro: string;
    bulletSection: BulletSection;
    fullDescOutro: string;
}

const programs: Program[] = [
    {
        id: 1,
        slug: "quantum-cryptography",
        title: "Quantum Cryptography",
        icon: Monitor,
        shortDesc:
            "A hands-on introduction to how quantum mechanics is reshaping the future of secure communication.",
        fullDescIntro:
            "This session explores the principles behind quantum cryptography and why it represents a fundamental shift in how we think about data security. We'll cover the key ideas driving this field forward, including:",
        bulletSection: {
            intro: "",
            bullets: [
                "Why classical encryption methods may eventually be vulnerable",
                "How quantum key distribution (QKD) works at a high level",
                "Real-world use cases where quantum cryptography is already being applied",
                "What the post-quantum security landscape might look like",
            ],
            outro: "",
        },
        fullDescOutro:
            "By the end, attendees will have a clearer picture of where quantum cryptography fits into the broader cybersecurity conversation.",
    },
    {
        id: 2,
        slug: "quantum-computing-biology",
        title: "Quantum Computing in Biology",
        icon: Calculator,
        shortDesc:
            "Discover how quantum computing is opening new doors in biological research that classical computers simply can't.",
        fullDescIntro:
            "This session looks at the intersection of quantum computing and the life sciences, exploring how quantum approaches are beginning to tackle some of biology's most complex challenges. Topics will touch on areas such as:",
        bulletSection: {
            intro: "",
            bullets: [
                "Protein folding and molecular simulation at unprecedented scale",
                "Drug discovery and how quantum modeling could accelerate it",
                "Genomic analysis and pattern recognition in large biological datasets",
                "The current state of quantum bio-research and where it's headed",
            ],
            outro: "",
        },
        fullDescOutro:
            "Attendees will leave with an appreciation for how quantum tools may transform biological research in the coming decade.",
    },
    {
        id: 3,
        slug: "quantum-computing-ai",
        title: "Quantum Computing in AI",
        icon: Zap,
        shortDesc:
            "Explore the potential for quantum computing to supercharge the next generation of artificial intelligence.",
        fullDescIntro:
            "This session examines the growing relationship between quantum computing and AI, focusing on where the two fields overlap and what that could mean for the future of machine learning and intelligent systems. Key areas of discussion will include:",
        bulletSection: {
            intro: "",
            bullets: [
                "The energy and computational costs of training modern AI models — and how quantum could help",
                "Quantum-enhanced optimization and its role in improving AI algorithms",
                "Potential speedups in areas like pattern recognition, reinforcement learning, and neural network training",
                "The timeline and realistic expectations for quantum-AI integration",
            ],
            outro: "",
        },
        fullDescOutro:
            "Attendees will come away with a grounded understanding of both the promise and the current limitations of quantum-accelerated AI.",
    },
];

export default function ProgramsPage() {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [enrolled, setEnrolled] = useState<Record<string, boolean>>({});
    const [enrolling, setEnrolling] = useState<string | null>(null);
    const supabase = createClient();

    const selectedProgram = programs.find((p) => p.id === selectedId);

    // Check enrollment status for all programs on mount
    useEffect(() => {
        const checkEnrollments = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;
            const { data } = await supabase
                .from("course_interest")
                .select("course_slug")
                .eq("user_id", user.id)
                .in("course_slug", programs.map((p) => p.slug));
            if (data) {
                const map: Record<string, boolean> = {};
                data.forEach((row) => { map[row.course_slug] = true; });
                setEnrolled(map);
            }
        };
        checkEnrollments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const toggleEnrollment = async (slug: string) => {
        if (enrolling === slug) return;
        setEnrolling(slug);
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
            if (enrolled[slug]) {
                // Unenroll
                const { error } = await supabase
                    .from("course_interest")
                    .delete()
                    .eq("user_id", user.id)
                    .eq("course_slug", slug);
                
                if (!error) {
                    setEnrolled((prev) => {
                        const next = { ...prev };
                        delete next[slug];
                        return next;
                    });
                }
            } else {
                // Enroll
                const { error } = await supabase.from("course_interest").upsert(
                    { user_id: user.id, course_slug: slug },
                    { onConflict: "user_id,course_slug" }
                );
                
                if (!error) {
                    setEnrolled((prev) => ({ ...prev, [slug]: true }));
                }
            }
        }
        setEnrolling(null);
    };

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.1 } },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
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
                    <p className="text-gray-400 font-medium">
                        Join our exclusive live sessions to accelerate your quantum journey.
                    </p>
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
                                <div className="flex items-start justify-between mb-6">
                                    <div className="w-14 h-14 rounded-2xl bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center text-brand-purple group-hover:scale-110 group-hover:bg-brand-purple/20 transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                                        <program.icon className="w-7 h-7" />
                                    </div>

                                    <motion.button
                                        onClick={(e) => { e.stopPropagation(); toggleEnrollment(program.slug); }}
                                        disabled={enrolling === program.slug}
                                        whileTap={{ scale: 0.95 }}
                                        className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all z-20 ${
                                            enrolled[program.slug]
                                                ? "bg-green-500/15 border border-green-500/30 text-green-400 hover:bg-green-500/20"
                                                : "bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white hover:border-brand-cyan/30"
                                        }`}
                                    >
                                        {enrolled[program.slug] ? (
                                            <span className="flex items-center gap-1.5"><Check className="w-3 h-3" /> Enrolled</span>
                                        ) : (
                                            enrolling === program.slug ? "..." : "Enroll"
                                        )}
                                    </motion.button>
                                </div>
                                {/* Date TBD badge */}
                                <span className="inline-flex items-center gap-1.5 text-xs font-bold font-mono mb-3 tracking-widest uppercase px-2.5 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan">
                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
                                    Date TBD · Coming Soon
                                </span>
                                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-brand-cyan transition-all duration-300">
                                    {program.title}
                                </h3>
                                <p className="text-gray-400 text-sm line-clamp-2 font-medium leading-relaxed">
                                    {program.shortDesc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <AnimatePresence>
                    {selectedId && selectedProgram && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl">
                            <motion.div
                                layoutId={`card-${selectedId}`}
                                className="w-full max-w-2xl bg-black border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] relative max-h-[90vh] overflow-y-auto"
                            >
                                {/* Modal Top Ambient Glow */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-32 bg-brand-cyan/10 blur-[80px] pointer-events-none" />

                                {/* Sticky close button */}
                                <button
                                    onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                                    className="sticky top-6 float-right mr-6 p-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full text-gray-400 hover:text-white transition-all z-20"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                <div className="p-8 md:p-12 relative z-10">
                                    <div className="flex items-center gap-5 mb-8">
                                        <div className="w-16 h-16 rounded-2xl bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center text-brand-purple shadow-[0_0_20px_rgba(168,85,247,0.2)] shrink-0">
                                            <selectedProgram.icon className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                                                {selectedProgram.title}
                                            </h2>
                                            <div className="flex flex-wrap items-center gap-3 mt-2">
                                                <span className="inline-flex items-center gap-1.5 text-xs font-bold font-mono tracking-widest uppercase px-2.5 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
                                                    Date TBD · Coming Soon
                                                </span>
                                                <span className="bg-brand-purple/10 text-brand-purple px-2 py-0.5 rounded-md text-xs font-bold uppercase tracking-widest border border-brand-purple/20">
                                                    Live Session
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Full description */}
                                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 mb-8 space-y-4">
                                        <p className="text-gray-300 leading-relaxed text-base font-medium">
                                            {selectedProgram.fullDescIntro}
                                        </p>
                                        <ul className="space-y-2">
                                            {selectedProgram.bulletSection.bullets.map((bullet) => (
                                                <li key={bullet} className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed">
                                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-cyan shrink-0" />
                                                    {bullet}
                                                </li>
                                            ))}
                                        </ul>
                                        <p className="text-gray-300 leading-relaxed text-base font-medium">
                                            {selectedProgram.fullDescOutro}
                                        </p>
                                    </div>

                                    {/* Enroll button */}
                                    <motion.button
                                        id={`enroll-${selectedProgram.slug}`}
                                        onClick={(e) => { e.stopPropagation(); toggleEnrollment(selectedProgram.slug); }}
                                        disabled={enrolling === selectedProgram.slug}
                                        whileTap={{ scale: 0.97 }}
                                        className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                                            enrolled[selectedProgram.slug]
                                                ? "bg-green-500/20 border border-green-500/40 text-green-400 hover:bg-green-500/25"
                                                : "bg-gradient-to-r from-brand-purple to-brand-cyan text-white shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]"
                                        }`}
                                    >
                                        <AnimatePresence mode="wait">
                                            {enrolled[selectedProgram.slug] ? (
                                                <motion.span
                                                    key="enrolled"
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    className="flex items-center gap-2"
                                                >
                                                    <Check className="w-5 h-5" />
                                                    {enrolling === selectedProgram.slug ? "Updating..." : "Enrolled (Click to Unenroll)"}
                                                </motion.span>
                                            ) : (
                                                <motion.span
                                                    key="enroll"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                >
                                                    {enrolling === selectedProgram.slug ? "Enrolling..." : "Enroll — Notify Me When Live"}
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    </motion.button>
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
