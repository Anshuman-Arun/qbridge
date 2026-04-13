"use client";

import { motion, Variants } from 'framer-motion';
import { CourseSection } from '@/components/learn/CourseSection';

interface LearnClientProps {
    sortedCourses: any[];
    quizAttempts: any[];
    isQCLocked: boolean;
}

export function LearnClient({ sortedCourses, quizAttempts, isQCLocked }: LearnClientProps) {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
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
                    animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, -30, 0] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-brand-cyan/20 blur-[120px] mix-blend-screen"
                />
                <motion.div
                    animate={{ scale: [1, 1.3, 1], x: [0, -40, 0], y: [0, 40, 0] }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-brand-purple/20 blur-[120px] mix-blend-screen"
                />
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="relative z-10 max-w-4xl mx-auto"
            >
                <motion.div variants={itemVariants} className="text-center mb-16 px-4">
                    <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 mb-6 tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] pb-2 leading-tight">
                        Learning Path
                    </h1>
                    <p className="text-gray-400 font-medium text-lg max-w-2xl mx-auto leading-relaxed">
                        Build your foundation in Quantum Computing step-by-step. Master the prerequisites to unlock advanced concepts.
                    </p>
                </motion.div>

                <div className="space-y-6">
                    {sortedCourses.length > 0 ? (
                        sortedCourses.map((course, index) => {
                            const isQC = course.slug === 'quantum-computing';
                            return (
                                <motion.div variants={itemVariants} key={course.id}>
                                    <CourseSection
                                        courseId={course.id}
                                        courseSlug={course.slug}
                                        title={course.title}
                                        color={index % 2 === 0 ? 'brand-cyan' : 'brand-purple'}
                                        modules={course.modules}
                                        quizAttempts={quizAttempts.filter(a =>
                                            course.modules.some((m: any) => m.id === a.module_id)
                                        )}
                                        locked={isQC ? isQCLocked : false}
                                        lockMessage={isQC ? 'Complete all lessons and final tests in Mathematics, Physics, and Programming to unlock Quantum Computing.' : undefined}
                                        defaultExpanded={index === 0} // Expand the first course by default
                                    />
                                </motion.div>
                            );
                        })
                    ) : (
                        <div className="text-center text-gray-500 p-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl">
                            <p className="font-medium text-lg">No courses found. Please run the seed script.</p>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
