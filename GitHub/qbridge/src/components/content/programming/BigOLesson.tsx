'use client';

import React from 'react';
import { InteractiveVideo, VideoCheckpoint } from '@/components/features/InteractiveVideo';
import { HardwareFallacySandbox } from '@/components/features/HardwareFallacySandbox';
import { TimeComplexityVisualizer } from '@/components/features/TimeComplexityVisualizer';
import { ConceptNugget } from '@/components/features/ConceptNugget';
import { MathText } from '@/components/features/MathText';

function AccordionCard({ icon, title, body }: { icon: string; title: string; body: React.ReactNode }) {
    const [open, setOpen] = React.useState(false);
    return (
        <button
            onClick={() => setOpen(o => !o)}
            className="w-full text-left bg-black/40 border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all group"
        >
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <span className="text-2xl group-hover:scale-110 transition-transform">{icon}</span>
                    <span className="text-white font-semibold text-sm">{title}</span>
                </div>
                <span className="text-gray-500 text-lg">{open ? '−' : '+'}</span>
            </div>
            {open && (
                <div className="mt-3 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-3 animate-in fade-in slide-in-from-top-2 duration-300">
                    {body}
                </div>
            )}
        </button>
    );
}

export default function BigOLesson() {
    const checkpoints: VideoCheckpoint[] = [
        {
            id: 'bo_1',
            timeSeconds: 70,
            questionText: 'What exactly does Big-O notation measure?',
            options: [
                'Memory size in gigabytes',
                'Processing speed in exact seconds',
                'The worst-case number of steps an algorithm takes as problem size grows',
                'The visual size of output text'
            ],
            correctAnswer: 'The worst-case number of steps an algorithm takes as problem size grows'
        },
        {
            id: 'bo_2',
            timeSeconds: 155,
            questionText: 'Which complexity class is considered the classical wall for many hard problems?',
            options: ['O(1)', 'O(N)', 'O(N log N)', 'O(2^N)'],
            correctAnswer: 'O(2^N)'
        }
    ];

    return (
        <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            {/* Header / Section A */}
            <div className="space-y-8">
                <h1 className="text-4xl font-bold text-white mb-2 leading-tight">
                    Big-O & Efficiency: Measuring "Fast"
                </h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 z-10 relative">
                    <AccordionCard
                        icon="💻"
                        title="The Hardware Fallacy"
                        body={
                            <p>If we simply measure how many seconds a program takes, a terrible algorithm running on a multi-million-dollar supercomputer might beat a flawless algorithm on an old laptop. That doesn't mean the algorithm is better—it just means the hardware is faster.</p>
                        }
                    />
                    <AccordionCard
                        icon="🎲"
                        title="The Luck Factor"
                        body={
                            <p>Running a search algorithm is partly based on luck. Looking for a name might take 1 millisecond if it's on page 1, or 5 years if it's on the last page. To understand efficiency, we must ignore luck and hardware, and focus purely on the <strong>worst-case number of steps</strong>.</p>
                        }
                    />
                </div>
                <MathText
                    className="text-gray-300 text-lg leading-relaxed block mb-6"
                    text={String.raw`Welcome to <strong>Big-O Notation</strong>. Big-O abstractly describes how an algorithm's resource requirements grow as the input data size $N$ increases. It is the language of scaling.`}
                />
            </div>

            {/* Video */}
            <div className="space-y-6">
                <InteractiveVideo url="https://www.youtube.com/watch?v=DfD5UtjitaA" checkpoints={checkpoints} />
            </div>

            {/* Complexity classes card */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-purple/5 rounded-full blur-3xl -mr-32 -mt-32" />
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-6">Complexity Classes at a Glance</h3>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {[
                            { label: 'O(1)', name: 'Constant', color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/30' },
                            { label: 'O(log N)', name: 'Logarithmic', color: 'text-brand-cyan', bg: 'bg-brand-cyan/10 border-brand-cyan/30' },
                            { label: 'O(N)', name: 'Linear', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/30' },
                            { label: 'O(N²)', name: 'Quadratic', color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/30' },
                            { label: 'O(2ᴺ)', name: 'Exponential', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/30' },
                        ].map(({ label, name, color, bg }) => (
                            <div key={label} className={`${bg} border rounded-2xl p-4 text-center`}>
                                <p className={`${color} font-mono font-bold text-sm`}>{label}</p>
                                <p className="text-gray-500 text-xs mt-1">{name}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 space-y-3">
                        <MathText className="text-gray-400 text-sm" text="Big-O compares algorithms by growth in operation count as input size N increases — not by exact runtime on any specific machine." />
                        <MathText className="text-gray-400 text-sm" text="Worst-case behavior is the safety baseline for system design — you need to know the ceiling, not just the average." />
                    </div>
                </div>
            </div>

            <ConceptNugget text="Big-O is not about exact seconds today — it is about whether an approach remains feasible as the problem size grows by orders of magnitude." />

            {/* Hardware Fallacy Sandbox */}
            <div className="space-y-6">
                <HardwareFallacySandbox />
            </div>

            {/* Classical wall section */}
            <div className="bg-gradient-to-br from-red-900/20 via-red-900/5 to-transparent border border-white/10 rounded-3xl p-12 shadow-2xl">
                <h2 className="text-3xl font-bold text-white mb-10 text-center tracking-tight">The Classical Wall</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="space-y-8">
                        <div className="relative">
                            <div className="absolute -left-6 top-0 bottom-0 w-1 bg-red-500 rounded-full" />
                            <MathText
                                className="text-gray-300 text-lg block"
                                text={String.raw`Problems in chemistry, optimization, and breaking encryption often map to exponential-time. Even doubling hardware speed only adds one more step to the solvable problem size for $O(2^N)$ algorithms.`}
                            />
                        </div>
                        <div className="bg-black/40 p-8 rounded-3xl border border-red-500/30 shadow-inner relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-2 h-full bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)]" />
                            <h5 className="text-white font-bold text-lg mb-4">The Quantum Threat</h5>
                            <div className="space-y-2 text-sm text-gray-400">
                                <p>• <strong className="text-red-300">Factoring integers:</strong> O(2^N/3) classical → O(N³) with Shor's</p>
                                <p>• <strong className="text-red-300">Unstructured search:</strong> O(N) classical → O(√N) with Grover's</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 h-full flex flex-col justify-center gap-6 text-center">
                            <h3 className="text-xl font-bold text-white">P vs NP & The Cut-through</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                Verifying the answer to a Sudoku puzzle is fast O(N), but solving it from scratch is agonizingly slow $O(2^N)$. Quantum computers specialize in short-circuiting these brute force problems.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Time Complexity Race (Full Width) */}
            <div className="w-full">
                <TimeComplexityVisualizer />
            </div>

            <ConceptNugget text="Quantum advantage is not about speed on easy problems — it is about escaping the exponential wall on problems that classically cannot be scaled." />
        </div>
    );
}
