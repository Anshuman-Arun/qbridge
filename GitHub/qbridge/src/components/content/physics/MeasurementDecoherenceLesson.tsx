'use client';

import React from 'react';
import { InteractiveVideo, VideoCheckpoint } from '@/components/features/InteractiveVideo';
import { ConceptNugget } from '@/components/features/ConceptNugget';
import { MathText } from '@/components/features/MathText';
import { BornRuleSandbox } from '@/components/features/BornRuleSandbox';
import { SchrodingerCatLoop } from '@/components/features/SchrodingerCatLoop';
import { DecoherenceInteractionLab } from '@/components/features/DecoherenceInteractionLab';
import { Activity, CircleDot, Dice6, Eye, Waves } from 'lucide-react';

const checkpoints: VideoCheckpoint[] = [
    {
        id: 'md_cp1',
        timeSeconds: 85,
        questionText: "What does the Born Rule tell us about the 'collapse' of a quantum wave?",
        options: [
            'Collapse is purely random and cannot be predicted',
            'Collapse is directly tied to the physical shape of the wave function',
            'Collapse only happens when a human looks at the particle',
            'Waves never actually collapse; they just slow down',
        ],
        correctAnswer: 'Collapse is directly tied to the physical shape of the wave function',
    },
    {
        id: 'md_cp2',
        timeSeconds: 190,
        questionText: "In Schrodinger&apos;s Cat, why does the cat enter a superposition of dead and alive states?",
        options: [
            'Because the box is soundproof',
            'Because we have not fed it yet',
            'Because its fate is entangled with a quantum object (a radioactive atom)',
            'Because cats have naturally quantum biology',
        ],
        correctAnswer: 'Because its fate is entangled with a quantum object (a radioactive atom)',
    },
];

export default function MeasurementDecoherenceLesson() {
    return (
        <div className="space-y-20 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            <div>
                <MathText
                    className="text-gray-300 text-lg leading-relaxed block"
                    text={String.raw`In the double-slit experiment, we saw electrons behave like spreading waves. This lesson answers the question: <strong class="text-brand-cyan">how does one concrete result appear when we measure?</strong> We will use the Born Rule, Schrodinger&apos;s cat, and decoherence to connect microscopic quantum behavior to the everyday classical world.`}
                />
            </div>

            <div>
                <InteractiveVideo url="https://youtu.be/DLPaMtNXm6Y" checkpoints={checkpoints} />
            </div>

            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/5 via-transparent to-brand-purple/5 opacity-50 blur-3xl pointer-events-none" />
                <div className="relative z-10 bg-black/60 border border-white/10 rounded-3xl p-10 shadow-2xl">
                    <h3 className="text-3xl font-bold text-white mb-8">Two Core Ideas</h3>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm shadow-xl flex flex-col group hover:border-brand-cyan/30 transition-colors">
                            <h4 className="text-xl font-bold text-brand-cyan mb-4 flex items-center gap-2">
                                <Dice6 className="w-5 h-5" />
                                Born Rule = Loaded Dice
                            </h4>
                            <MathText
                                className="text-gray-400 text-[15px] leading-relaxed block mb-6"
                                text={String.raw`General idea (without diving into the exact formula): collapse is <strong>not</strong> uniform randomness. The shape of the wave loads the odds. Tall regions are more likely outcomes, shallow regions are less likely, and zero regions are impossible outcomes.`}
                            />
                            <div className="bg-black/50 p-5 rounded-xl border border-white/5 mt-auto space-y-2">
                                <div className="text-sm text-gray-300 flex items-center gap-2"><Waves className="w-4 h-4 text-brand-purple" /> Wave shape sets weights</div>
                                <div className="text-sm text-gray-300 flex items-center gap-2"><CircleDot className="w-4 h-4 text-brand-cyan" /> Measurement picks one weighted location</div>
                            </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm shadow-xl flex flex-col group hover:border-brand-purple/30 transition-colors">
                            <h4 className="text-xl font-bold text-brand-purple mb-4 flex items-center gap-2">
                                <Activity className="w-5 h-5" />
                                Decoherence = Interaction
                            </h4>
                            <MathText
                                className="text-gray-400 text-[15px] leading-relaxed block mb-6"
                                text={String.raw`Observation means physical interaction, not a conscious mind. Air molecules, thermal photons, and leaked sound can all carry information away and destroy interference.`}
                            />
                            <div className="bg-black/50 p-5 rounded-xl border border-white/5 mt-auto space-y-2">
                                <div className="text-sm text-gray-300 flex items-center gap-2"><Eye className="w-4 h-4 text-brand-cyan" /> Observation = information transfer</div>
                                <p className="text-xs text-gray-500 italic">Macroscopic objects decohere rapidly because they are constantly interacting with their environment.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ConceptNugget text="The Born Rule gives weighted randomness, not pure randomness. Decoherence explains why those quantum possibilities usually collapse into one stable classical-looking reality." />

            <div className="space-y-10">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-4">Born Rule Sandbox</h2>
                    <MathText
                        className="text-gray-400 text-lg leading-relaxed block"
                        text={String.raw`Use rapid auto-plot measurements to see the weighted randomness idea emerge: hit clouds build up where the wave has stronger weight.`}
                    />
                </div>
                <BornRuleSandbox />
            </div>

            <div className="space-y-10 border-t border-white/10 pt-16">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-4">Schrodinger&apos;s Cat Causal Loop</h2>
                    <MathText
                        className="text-gray-400 text-lg leading-relaxed block"
                        text={String.raw`Consider the chain: atom -> Geiger counter -> hammer -> vial -> cat. The circular loop below visualizes this chain as one entangled system, placing the cat at the center of the sealed box.`}
                    />
                </div>
                <SchrodingerCatLoop />
            </div>

            <div className="space-y-10 border-t border-white/10 pt-16">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-4">Decoherence Interaction Lab</h2>
                    <MathText
                        className="text-gray-400 text-lg leading-relaxed block"
                        text={String.raw`Simulate reality-altering interactions: trigger air hits, thermal photons, sound leakage, or opening the box, and watch coherence drain into a single classical outcome.`}
                    />
                </div>
                <DecoherenceInteractionLab />
            </div>

            <ConceptNugget text="There is no way to 'cheat' measurement. If information escapes the system by any channel, the superposition is effectively broken." />

            <div className="bg-gradient-to-br from-brand-purple/15 via-transparent to-brand-cyan/10 border border-white/10 rounded-3xl p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10 space-y-6">
                    <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs text-gray-400 uppercase tracking-wider">
                        Going Further
                    </div>
                    <h2 className="text-3xl font-bold text-white">Pointer States: Why Some Outcomes Survive</h2>

                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
                        <div className="space-y-4 xl:col-span-5">
                            <MathText
                                className="text-gray-300 text-[15px] leading-relaxed block"
                                text={String.raw`It turns out that not all quantum states are equally fragile. Under strong environment coupling, some states become <strong class="text-brand-cyan">pointer states</strong> that stay stable while superpositions between them rapidly wash out.`}
                            />
                            <MathText
                                className="text-gray-300 text-[15px] leading-relaxed block"
                                text={String.raw`While macroscopic objects contain enough particles to where this doesn't matter regardless, scientists continuously look for kinds of particles which are more resistant to decoherence, which is a large part of modern quantum computing.`}
                            />
                        </div>

                        <div className="space-y-4 xl:col-span-7">
                            <div className="bg-black/40 border border-brand-cyan/20 rounded-xl p-6 text-sm text-gray-300 shadow-inner">
                                <strong className="text-white block mb-4 text-base border-b border-brand-cyan/20 pb-3">Visual Intuition: Isolation vs Exposure</strong>

                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                                            <span>Trapped Ion (high isolation)</span>
                                            <span>Long coherence</span>
                                        </div>
                                        <div className="h-2 rounded-full bg-white/10 overflow-hidden"><div className="h-full w-[85%] bg-gradient-to-r from-brand-cyan to-brand-purple" /></div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                                            <span>Superconducting Qubit (engineered isolation)</span>
                                            <span>Medium coherence</span>
                                        </div>
                                        <div className="h-2 rounded-full bg-white/10 overflow-hidden"><div className="h-full w-[58%] bg-gradient-to-r from-brand-cyan to-brand-purple" /></div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                                            <span>Warm Macroscopic Object (cat-scale)</span>
                                            <span>Ultra-fast decoherence</span>
                                        </div>
                                        <div className="h-2 rounded-full bg-white/10 overflow-hidden"><div className="h-full w-[8%] bg-gradient-to-r from-brand-cyan to-brand-purple" /></div>
                                    </div>
                                </div>

                                <p className="mt-5 text-gray-400 leading-relaxed">
                                    Quantum hardware engineering is mostly a battle against decoherence: shield interactions enough to preserve useful superpositions before measurement is intentionally applied.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
