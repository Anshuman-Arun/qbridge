'use client';

import React from 'react';
import { InteractiveVideo, VideoCheckpoint } from '@/components/features/InteractiveVideo';
import { LinearSearchSim } from '@/components/features/LinearSearchSim';
import { XorStringMatcher } from '@/components/features/XorStringMatcher';
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

export default function AlgorithmsLesson() {
    const checkpoints: VideoCheckpoint[] = [
        {
            id: 'alg_1',
            timeSeconds: 52,
            questionText: 'What is the "Search Problem" in computer science?',
            options: [
                'Looking for a virus',
                'Finding a specific element in a list',
                'Surfing the web',
                'Discovering new hardware'
            ],
            correctAnswer: 'Finding a specific element in a list'
        },
        {
            id: 'alg_2',
            timeSeconds: 165,
            questionText: 'When a computer compares two words under the hood, what logical operation does it primarily run the bits through?',
            options: ['AND gates', 'OR gates', 'NOT gates', 'XOR gates'],
            correctAnswer: 'XOR gates'
        }
    ];

    return (
        <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            {/* Header / Section A */}
            <div className="space-y-8">
                <h1 className="text-4xl font-bold text-white mb-2 leading-tight">
                    Algorithms: The Recipe of Computation
                </h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 z-10 relative">
                    <AccordionCard
                        icon="📜"
                        title="The Recipe Analogy"
                        body={
                            <p>An algorithm is a finite, ordered sequence of instructions that maps input to output. Like a kitchen recipe, if you follow the steps exactly, you get the same result every time.</p>
                        }
                    />
                    <AccordionCard
                        icon="🔍"
                        title="The Search Problem"
                        body={
                            <p>Finding a specific target in a collection of data is the most fundamental challenge in computer science. It is also the primary target for quantum speedups like <strong>Grover's Algorithm</strong>.</p>
                        }
                    />
                </div>
                <MathText
                    className="text-gray-300 text-lg leading-relaxed block mb-6"
                    text={String.raw`Algorithms aren't just abstract ideas—they are physical patterns of instruction executed by billions of transistors. Efficiency determines if a problem is solvable in seconds or millions of years.`}
                />
            </div>

            {/* Video */}
            <div className="space-y-6">
                <InteractiveVideo url="https://www.youtube.com/watch?v=1D8ud4vqjUs" checkpoints={checkpoints} />
            </div>

            {/* Core ideas card */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan/5 rounded-full blur-3xl -mr-32 -mt-32" />
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-6">Core Ideas</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { color: 'text-brand-cyan', label: 'Algorithm', body: 'A finite, ordered set of instructions that maps input to output.' },
                            { color: 'text-brand-purple', label: 'Search Problem', body: 'Find a specific target element in a collection of data.' },
                            { color: 'text-green-400', label: 'Linear Search', body: 'The baseline method for unsorted data — check each element one by one.' },
                        ].map(({ color, label, body }) => (
                            <div key={label} className="bg-black/30 rounded-2xl p-6 border border-white/5">
                                <h4 className={`${color} font-bold mb-2 text-sm uppercase tracking-wider`}>{label}</h4>
                                <p className="text-gray-400 text-sm">{body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <ConceptNugget text="Algorithms are not abstract recipes only — they are physical instruction patterns executed by hardware gates at scale." />

            {/* Linear search */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-10 shadow-2xl">
                <div className="space-y-8">
                    <div className="max-w-3xl">
                        <h3 className="text-2xl font-bold text-white mb-4">Linear Search Walkthrough</h3>
                        <MathText
                            className="text-gray-400 text-lg leading-relaxed"
                            text={String.raw`For unsorted data, a classical machine must inspect entries one by one. In the <strong>worst case</strong>, it checks every item before concluding whether the target exists. This is $O(N)$ — linear in the number of items.`}
                        />
                        <div className="mt-4 p-4 bg-brand-cyan/10 border-l-2 border-brand-cyan rounded-r-lg">
                            <MathText
                                className="text-sm text-brand-cyan font-medium"
                                text={String.raw`Grover's quantum algorithm can search the same database in $O(\sqrt{N})$ steps — a quadratic speedup.`}
                            />
                        </div>
                    </div>
                    <LinearSearchSim />
                </div>
            </div>

            {/* XOR comparison */}
            <div className="bg-gradient-to-br from-brand-purple/20 via-brand-purple/5 to-transparent border border-white/10 rounded-3xl p-12 shadow-2xl">
                <h2 className="text-3xl font-bold text-white mb-10 text-center tracking-tight">Hardware-Level String Comparison</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div className="space-y-8">
                        <div className="relative">
                            <div className="absolute -left-6 top-0 bottom-0 w-1 bg-brand-purple rounded-full" />
                            <MathText
                                className="text-gray-300 text-lg block"
                                text={String.raw`A string equality check is implemented with bit operations. <strong>XOR is central</strong>: matching bits output 0, mismatched bits output 1. If all outputs are 0, the strings match exactly.`}
                            />
                        </div>
                        <div className="bg-black/30 rounded-2xl border border-white/5 p-6 font-mono text-sm space-y-2">
                            <p className="text-gray-400">A = 01000001   <span className="text-gray-600 font-sans text-xs">(letter 'A')</span></p>
                            <p className="text-gray-400">A = 01000001   <span className="text-gray-600 font-sans text-xs">(letter 'A')</span></p>
                            <p className="text-white">XOR=00000000  <span className="text-green-400 font-sans text-xs">✓ Match!</span></p>
                        </div>
                        <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-5">
                            <h5 className="text-orange-300 font-bold text-sm mb-2">Why This Matters for Quantum</h5>
                            <p className="text-gray-400 text-sm">Grover's algorithm uses an "oracle" function — essentially a quantum XOR circuit — to mark the target item. Understanding classical comparison circuits builds intuition for how quantum oracles work.</p>
                        </div>
                    </div>
                    <XorStringMatcher />
                </div>
            </div>

            <ConceptNugget text="Algorithm choice sets the performance ceiling long before hardware tuning — this is why Grover's quadratic speedup is so significant even before a fault-tolerant quantum computer exists." />
        </div>
    );
}
