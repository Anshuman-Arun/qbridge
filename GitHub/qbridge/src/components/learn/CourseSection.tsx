'use client';

import React, { useState } from 'react';
import { CheckCircle2, Lock, ArrowRight, Trophy, ChevronDown, ChevronUp } from "lucide-react";
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface Module {
    id: string;
    title: string;
    slug?: string;
    description: string;
}

interface QuizAttemptData {
    module_id: string;
    is_final_test: boolean;
    score: number;
    max_score: number;
}

interface CourseSectionProps {
    courseId: string;
    courseSlug: string;
    title: string;
    color: 'brand-cyan' | 'brand-purple';
    modules: Module[];
    quizAttempts: QuizAttemptData[];
    locked?: boolean;
    lockMessage?: string;
    defaultExpanded?: boolean;
}

export function CourseSection({ courseId, courseSlug, title, color, modules, quizAttempts, locked = false, lockMessage, defaultExpanded = false }: CourseSectionProps) {
    const DEV_UNLOCK_ALL = false; // DEV TOGGLE: Set to false before pushing to production
    if (DEV_UNLOCK_ALL) locked = false;

    const [isExpanded, setIsExpanded] = useState(defaultExpanded);
    // Derive completion from quiz attempts: lesson quiz >= 70% = lesson complete
    const getModuleBestScore = (moduleId: string, isFinalTest: boolean): { score: number; max_score: number } | null => {
        const attempts = quizAttempts.filter(a => a.module_id === moduleId && a.is_final_test === isFinalTest);
        if (attempts.length === 0) return null;
        // Get best attempt
        return attempts.reduce((best, a) => {
            const pct = a.score / a.max_score;
            const bestPct = best.score / best.max_score;
            return pct > bestPct ? a : best;
        });
    };

    const isModulePassed = (moduleId: string): boolean => {
        const best = getModuleBestScore(moduleId, false);
        return best !== null && (best.score / best.max_score) >= 0.7;
    };

    const getModuleScorePercent = (moduleId: string): number | null => {
        const best = getModuleBestScore(moduleId, false);
        if (!best) return null;
        return Math.round((best.score / best.max_score) * 100);
    };

    // Check if module final test is passed (>= 80%)
    const isFinalTestPassed = (): boolean => {
        // Check all modules have a passing final test
        return modules.every(m => {
            const best = getModuleBestScore(m.id, true);
            return best !== null && (best.score / best.max_score) >= 0.8;
        });
    };

    const totalModules = modules.length;
    const completedModules = modules.filter(m => isModulePassed(m.id)).length;
    const progressPercent = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;

    const isFinalReady = DEV_UNLOCK_ALL || completedModules === totalModules;

    const colorOutput = color === 'brand-cyan' ? 'text-brand-cyan' : 'text-brand-purple';
    const bgOutput = color === 'brand-cyan' ? 'bg-brand-cyan' : 'bg-brand-purple';
    const borderOutput = color === 'brand-cyan' ? 'border-brand-cyan' : 'border-brand-purple';

    const chevronExpandedClass = color === 'brand-cyan' ? 'bg-brand-cyan/10 border-brand-cyan/20 text-brand-cyan' : 'bg-brand-purple/10 border-brand-purple/20 text-brand-purple';
    const chevronCollapsedClass = 'bg-white/5 border-white/10 text-gray-400 group-hover:bg-white/10 group-hover:text-white group-hover:border-white/20';

    return (
        <div className="relative mb-6">
            {/* Section Header Card */}
            <div
                className={`group relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between p-6 md:p-8 rounded-3xl transition-all duration-500 z-10
                  ${locked ? 'bg-white/[0.02] border border-white/5' : 'bg-white/5 border border-white/10 backdrop-blur-xl cursor-pointer hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:-translate-y-1'}`}
                onClick={() => !locked && setIsExpanded(!isExpanded)}
            >
                {/* Ambient Internal Glow */}
                {!locked && (
                    <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 opacity-20 pointer-events-none transition-opacity duration-500 group-hover:opacity-40 ${bgOutput}`} />
                )}

                <div className="relative z-10 flex-1">
                    <div className="flex items-center gap-4 mb-4 md:mb-0">
                        {locked && <Lock className="w-7 h-7 text-gray-600 drop-shadow-md" />}
                        <div>
                            <h2 className={`text-2xl md:text-3xl font-black tracking-tight ${locked ? 'text-gray-500' : 'text-white'}`}>
                                {title}
                            </h2>
                            {!locked && (
                                <Link
                                    href={`/learn/${courseSlug}`}
                                    onClick={e => e.stopPropagation()}
                                    className={`inline-flex items-center gap-1 text-xs font-semibold mt-1 ${colorOutput} hover:underline opacity-60 hover:opacity-100 transition-opacity`}
                                >
                                    View course details <ArrowRight className="w-3 h-3" />
                                </Link>
                            )}
                        </div>
                    </div>
                </div>

                <div className="relative z-10 flex items-center md:gap-6 mt-2 md:mt-0 w-full md:w-auto justify-between md:justify-end">
                    {locked ? (
                        <div className="text-sm font-medium text-gray-400 bg-black/40 px-5 py-3 rounded-2xl border border-white/5 backdrop-blur-md shadow-inner">
                            {lockMessage || 'Complete prerequisite courses to unlock.'}
                        </div>
                    ) : (
                        <>
                            <div className="flex items-center gap-4 flex-1 md:flex-initial">
                                <span className={`text-sm font-bold tracking-widest uppercase ${colorOutput}`}>{progressPercent}%</span>
                                <div className="w-24 md:w-32 h-2.5 bg-black/50 rounded-full overflow-hidden border border-white/10 shadow-inner">
                                    <div className={`h-full ${bgOutput} transition-all duration-1000 relative`} style={{ width: `${progressPercent}%` }}>
                                        <div className="absolute inset-0 bg-white/20 w-full" style={{ clipPath: 'polygon(0 0, 100% 0, 80% 100%, -20% 100%)' }}></div>
                                    </div>
                                </div>
                            </div>
                            <div className={`p-2.5 rounded-full border transition-all duration-300 ${isExpanded ? chevronExpandedClass : chevronCollapsedClass}`}>
                                {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Accordion Content Tray */}
            <AnimatePresence>
                {isExpanded && !locked && (
                    <motion.div
                        initial={{ height: 0, opacity: 0, y: -20 }}
                        animate={{ height: "auto", opacity: 1, y: 0 }}
                        exit={{ height: 0, opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden relative z-0"
                    >
                        <div className="mx-2 md:mx-6 mt-[-20px] pt-[40px] p-6 md:p-8 rounded-b-[2rem] bg-white/[0.02] border border-white/5 shadow-inner backdrop-blur-sm relative">
                            {/* Vertical Timeline Track */}
                            <div className="absolute left-[39px] md:left-[47px] top-[40px] bottom-[40px] w-px bg-gradient-to-b from-white/10 via-white/5 to-transparent" />

                            <div className="space-y-6 relative">
                                {modules.map((item, index) => {
                                    const passed = isModulePassed(item.id);
                                    const scorePercent = getModuleScorePercent(item.id);

                                    let status: 'locked' | 'current' | 'completed' = 'locked';
                                    if (passed) {
                                        status = 'completed';
                                    } else if (index === 0) {
                                        status = 'current';
                                    } else {
                                        const prevPassed = isModulePassed(modules[index - 1].id);
                                        if (prevPassed) status = 'current';
                                    }

                                    if (DEV_UNLOCK_ALL && status === 'locked') {
                                        status = 'current';
                                    }

                                    const href = `/learn/${courseSlug}/${item.slug || item.id}`;
                                    const CardWrapper = status !== 'locked'
                                        ? ({ children }: { children: React.ReactNode }) => (
                                            <Link href={href} className="block group/card">{children}</Link>
                                          )
                                        : ({ children }: { children: React.ReactNode }) => <div>{children}</div>;

                                    return (
                                        <div key={item.id} className="relative pl-14 md:pl-18">
                                            {/* Dot on Timeline — centered on track */}
                                            <div
                                                className={`absolute left-[33px] md:left-[41px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-[3px] transition-all duration-500 z-10
                                                ${status === 'completed' ? `${bgOutput} ${borderOutput} shadow-[0_0_15px_currentColor]` : status === 'current' ? `bg-black ${borderOutput} animate-pulse scale-125` : 'border-white/10 bg-[#0A0A0A]'}`}
                                                style={{ color: status === 'completed' || status === 'current' ? (color === 'brand-cyan' ? '#06b6d4' : '#a855f7') : 'transparent' }}
                                            />

                                            {/* Full-card clickable wrapper */}
                                            <CardWrapper>
                                                <div
                                                    className={`
                                                        p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden flex flex-col items-start
                                                        ${status === 'locked' ? 'bg-black/20 border-white/5 opacity-50' : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10 hover:shadow-xl hover:-translate-y-1 cursor-pointer'}
                                                    `}
                                                >
                                                    <div className="flex items-start justify-between w-full mb-3">
                                                        <h3 className={`font-bold text-lg md:text-xl tracking-tight transition-colors ${status === 'completed' ? 'text-white' : status === 'current' ? colorOutput : 'text-gray-500'}`}>
                                                            {item.title}
                                                        </h3>
                                                        <div className="flex items-center gap-3 shrink-0 ml-4">
                                                            {status === 'completed' && scorePercent !== null && (
                                                                <span className="text-xs px-2.5 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 font-mono font-bold">
                                                                    {scorePercent}%
                                                                </span>
                                                            )}
                                                            {status === 'completed' && <CheckCircle2 className={`w-6 h-6 ${colorOutput} drop-shadow-md`} />}
                                                            {status === 'current' && <ArrowRight className={`w-6 h-6 ${colorOutput} group-hover/card:translate-x-1 transition-transform`} />}
                                                            {status === 'locked' && <Lock className="w-5 h-5 text-gray-700" />}
                                                        </div>
                                                    </div>
                                                    <p className="text-gray-400 text-sm leading-relaxed font-medium">{item.description}</p>
                                                </div>
                                            </CardWrapper>
                                        </div>
                                    );
                                })}

                                {/* Module Final Test */}
                                <div className="relative pl-14 md:pl-18 mt-8">
                                    <div className={`absolute left-[33px] md:left-[41px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-[3px] transition-all duration-500 z-10 
                                      ${isFinalTestPassed() ? `${bgOutput} ${borderOutput} shadow-[0_0_15px_currentColor]` : isFinalReady ? `bg-black ${borderOutput} animate-pulse scale-125` : 'border-white/10 bg-[#0A0A0A]'}`}
                                        style={{ color: isFinalTestPassed() || isFinalReady ? (color === 'brand-cyan' ? '#06b6d4' : '#a855f7') : 'transparent' }}
                                    />
                                    <div className={`p-6 rounded-2xl border transition-all duration-300 ${isFinalReady ? 'bg-gradient-to-r from-white/5 to-white/[0.02] border-white/20 hover:border-white/30 hover:shadow-2xl hover:-translate-y-1' : 'bg-black/20 border-white/5 opacity-50'} relative overflow-hidden`}>
                                        {/* Trophy Background Watermark */}
                                        <Trophy className="absolute -right-6 -bottom-6 w-32 h-32 text-white/[0.02] pointer-events-none rotate-12" />


                                        <div className="flex items-center justify-between w-full relative z-10">
                                            <div className="flex items-center gap-4">
                                                <div className={`p-3 rounded-xl ${isFinalReady ? `bg-${colorOutput}/10` : 'bg-white/5'}`}>
                                                    <Trophy className={`w-6 h-6 ${isFinalReady ? colorOutput : 'text-gray-600'}`} />
                                                </div>
                                                <div>
                                                    <h3 className={`font-black tracking-tight text-lg md:text-xl ${isFinalReady ? colorOutput : 'text-gray-500'}`}>
                                                        {isFinalReady ? (
                                                            <Link href={`/learn/${courseSlug}/final-test`} className="hover:underline">
                                                                Course Final Test
                                                            </Link>
                                                        ) : (
                                                            'Course Final Test'
                                                        )}
                                                    </h3>
                                                    <p className="text-gray-500 text-sm mt-1 font-medium">
                                                        {isFinalReady
                                                            ? 'Ready! Score 80% to pass the course.'
                                                            : `Complete ${totalModules} lessons first.`
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 shrink-0 ml-4">
                                                {isFinalTestPassed() && <CheckCircle2 className="w-6 h-6 text-green-400 drop-shadow-md" />}
                                                {!isFinalReady && <Lock className="w-5 h-5 text-gray-700" />}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
