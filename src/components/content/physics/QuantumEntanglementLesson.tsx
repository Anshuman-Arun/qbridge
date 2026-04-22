'use client';

import React from 'react';
import { InteractiveVideo, VideoCheckpoint } from '@/components/features/InteractiveVideo';
import { ConceptNugget } from '@/components/features/ConceptNugget';
import { MathText } from '@/components/features/MathText';
import { LatexBlock } from '@/components/features/LatexBlock';
import { CorrelationStation } from '@/components/features/CorrelationStation';
import { FTLCommunicationSandbox } from '@/components/features/FTLCommunicationSandbox';
import { Zap, Link, Rocket, Radio, AlertTriangle } from 'lucide-react';

const checkpoints: VideoCheckpoint[] = [
    {
        id: 'ent_cp1',
        timeSeconds: 110,
        questionText: "According to the Pauli Exclusion Principle, if two entangled electrons occupy the same space and one has an 'up' spin, what must the other have?",
        options: [
            "Also an 'up' spin",
            "A 'down' spin",
            "A superposition of both spins",
            "No spin at all"
        ],
        correctAnswer: "A 'down' spin",
    },
    {
        id: 'ent_cp2',
        timeSeconds: 240,
        questionText: "Why can't we use entanglement to send messages faster than the speed of light?",
        options: [
            "Because the signal takes time to travel through space",
            "Because the particles decohere too quickly",
            "Because we cannot control which state (up/down) a particle collapses into",
            "Because Einstein's theory of relativity blocks the connection"
        ],
        correctAnswer: "Because we cannot control which state (up/down) a particle collapses into",
    },
];

export default function QuantumEntanglementLesson() {
    return (
        <div className="space-y-20 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            {/* ── Intro ─────────────────────────────────────────────────────── */}
            <div className="space-y-8">
                <h1 className="text-4xl font-bold text-white mb-2 leading-tight">
                    Quantum Entanglement: The Spooky Connection
                </h1>
                <MathText
                    className="text-gray-300 text-lg leading-relaxed block"
                    text={String.raw`Albert Einstein famously refused to believe it was real, calling it <strong class="text-brand-purple">"Spooky Action at a Distance."</strong> Today, we know that two particles can become so deeply linked that they share a single existence across the entire universe, defying classical logic.`}
                />
            </div>

            {/* ── Video ─────────────────────────────────────────────────────── */}
            <div>
                <InteractiveVideo url="https://youtu.be/NwOtlMhaoYw" checkpoints={checkpoints} />
            </div>

            {/* ── Core Ideas ────────────────────────────────────────────────── */}
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/5 via-transparent to-brand-cyan/5 opacity-50 blur-3xl pointer-events-none" />
                <div className="relative z-10 bg-black/60 border border-white/10 rounded-3xl p-10 shadow-2xl">
                    <h3 className="text-3xl font-bold text-white mb-8">Two Core Ideas</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-brand-purple/30 transition-colors group">
                            <h4 className="text-xl font-bold text-brand-purple mb-4 flex items-center gap-2">
                                <span className="text-brand-purple">01</span> Shared Wave Function
                            </h4>
                            <MathText
                                className="text-gray-400 text-sm leading-relaxed block"
                                text={String.raw`Entangled particles are not two separate things signaling each other. They merge into a <strong>single physical system</strong> described by one shared wave function. To measure one is to instantly determine the state of the other.`}
                            />
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-brand-cyan/30 transition-colors group">
                            <h4 className="text-xl font-bold text-brand-cyan mb-4 flex items-center gap-2">
                                <span className="text-brand-cyan">02</span> The Pauli Rule
                            </h4>
                            <MathText
                                className="text-gray-400 text-sm leading-relaxed block"
                                text={String.raw`Conservation laws force correlations. If two entangled electrons occupy the same state, and one is found to be spin <span class="text-green-500 font-bold">UP</span>, the other MUST be spin <span class="text-red-500 font-bold">DOWN</span> to balance the system.`}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <ConceptNugget text="Entanglement is the proof that even when things seem galaxies apart, they are still one. The universe is not a collection of separate parts, but a single interconnected wave function." />

            {/* ── Section 1: Interaction ───────────────────────────────────── */}
            <div className="space-y-10">
                <div className="max-w-3xl">
                    <h2 className="text-3xl font-bold text-white mb-4 italic">CORRELATION STATION</h2>
                    <p className="text-gray-400 text-lg leading-relaxed">
                        Experiment with the simulation below. Notice that before measurement, both particles are in a gray blur of superposition. The moment you "freeze" one, the other settles into the perfect mathematical opposite.
                    </p>
                </div>
                
                <CorrelationStation />
            </div>

            {/* ── Section 2: The Universal Speed Limit ──────────────────────── */}
            <div className="space-y-10">
                <div className="max-w-3xl">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-red-500/20 border border-red-500/40">
                            <Rocket className="w-5 h-5 text-red-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-white uppercase tracking-wider text-red-400">Einstein's Speed Limit</h2>
                    </div>
                    <p className="text-gray-300 text-lg leading-relaxed">
                        If Particle B on a rocket ship reacts <strong className="text-white">instantly</strong> to a measurement on Earth, is information traveling faster than light?
                    </p>
                </div>
                
                <FTLCommunicationSandbox />
            </div>

            {/* ── Going Further: Bell's Theorem ────────────────────────────── */}
            <div className="bg-gradient-to-br from-brand-purple/15 via-transparent to-brand-cyan/10 border border-white/10 rounded-3xl p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-brand-purple/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10 space-y-6">
                    <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs text-gray-400 uppercase tracking-wider">
                        Going Further
                    </div>
                    <h2 className="text-3xl font-bold text-white uppercase tracking-tight">EPR & Bell's Theorem: Is the Universe Real?</h2>
                    
                    <MathText
                        className="text-gray-300 text-base leading-relaxed block"
                        text={String.raw`In 1935, Einstein and colleagues (EPR) argued that entanglement was incomplete. They proposed <strong>"Hidden Variables"</strong>: information the particles carried with them from the start, like two gloves in separate boxes. If you find a left glove, the other is "instantly" right, but no signal traveled.`}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                        <div className="bg-black/40 border border-brand-purple/20 rounded-2xl p-6 space-y-4">
                            <h4 className="text-brand-purple font-bold uppercase tracking-widest text-xs">Bell's Inequality</h4>
                            <MathText
                                className="text-gray-400 text-sm leading-relaxed block"
                                text={String.raw`In 1964, John Bell proved that if hidden variables existed (Local Realism), there is a mathematical limit to how correlated two particles can be. This limit is known as <strong>Bell's Inequality</strong>.`}
                            />
                            <div className="bg-black/60 p-4 rounded-xl border border-white/5 text-center">
                                <LatexBlock expression="S \leq 2" />
                                <p className="text-[10px] text-gray-500 mt-2">The classical limit for correlation strength</p>
                            </div>
                        </div>
                        <div className="bg-black/40 border border-brand-cyan/20 rounded-2xl p-6 space-y-4">
                            <h4 className="text-brand-cyan font-bold uppercase tracking-widest text-xs">The Reality Check</h4>
                            <MathText
                                className="text-gray-400 text-sm leading-relaxed block"
                                text={String.raw`When we actually run the experiment, we find that quantum particles reach a correlation of $2\sqrt{2} \approx 2.82$. They <strong>violate</strong> the limit. This proves that the "glove" model is wrong: the states genuine do not exist until measured.`}
                            />
                        </div>
                    </div>

                    <p className="text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-6 italic">
                        "The universe is not only stranger than we imagine, it is stranger than we can imagine." — Sir Arthur Eddington
                    </p>
                </div>
            </div>

        </div>
    );
}
