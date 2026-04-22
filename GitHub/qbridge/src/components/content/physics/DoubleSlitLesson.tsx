'use client';

import React, { useState } from 'react';
import { InteractiveVideo, VideoCheckpoint } from '@/components/features/InteractiveVideo';
import { ConceptNugget } from '@/components/features/ConceptNugget';
import { MathText } from '@/components/features/MathText';
import { LatexBlock } from '@/components/features/LatexBlock';
import { DoubleSlitCanvas } from '@/components/features/DoubleSlitCanvas';
import { ObserverEffectToggle } from '@/components/features/ObserverEffectToggle';

const checkpoints: VideoCheckpoint[] = [
    {
        id: 'ds_cp1',
        timeSeconds: 62,
        questionText: 'If electrons behaved purely as classical particles (billiard balls), firing them at a double-slit barrier should produce what result on the detector screen?',
        options: [
            'An interference pattern with many bright and dark bands',
            'A single bright dot in the center',
            'Two distinct vertical bands directly behind the slits',
            'A random splatter across the entire screen',
        ],
        correctAnswer: 'Two distinct vertical bands directly behind the slits',
    },
    {
        id: 'ds_cp2',
        timeSeconds: 165,
        questionText: 'Why did scientists fire electrons one at a time with long pauses in between?',
        options: [
            'To slow down the electrons so they could be photographed',
            'To rule out the idea that electrons were bumping into each other mid-air',
            'To ensure the metal barrier remained cool',
            'To reduce the cost of the experiment',
        ],
        correctAnswer: 'To rule out the idea that electrons were bumping into each other mid-air',
    },
];

export default function DoubleSlitLesson() {
    return (
        <div className="space-y-20 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            {/* ── Intro ─────────────────────────────────────────────────────── */}
            <div className="space-y-8">
                <h1 className="text-4xl font-bold text-white mb-2 leading-tight">
                    The Double Slit Experiment: The Ultimate Strangeness
                </h1>
                <MathText
                    className="text-gray-300 text-lg leading-relaxed block"
                    text={String.raw`To understand quantum computing, we must first look to the most fiercely debated experiment in history. The double-slit experiment is the exact moment classical physics falls apart, revealing that the universe is built on probability waves, not solid billiard balls.`}
                />
            </div>

            {/* ── Video ─────────────────────────────────────────────────────── */}
            <div>
                <InteractiveVideo url="https://youtu.be/kZD2M35yoEQ" checkpoints={checkpoints} />
            </div>

            {/* ── Core Ideas ────────────────────────────────────────────────── */}
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/5 via-transparent to-brand-purple/5 opacity-50 blur-3xl pointer-events-none" />
                <div className="relative z-10 bg-black/60 border border-white/10 rounded-3xl p-10 shadow-2xl">
                    <h3 className="text-3xl font-bold text-white mb-8">Two Core Ideas</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-brand-cyan/30 transition-colors group">
                            <h4 className="text-xl font-bold text-brand-cyan mb-4 flex items-center gap-2">
                                <span className="text-brand-cyan">01</span> The Mass Contradiction
                            </h4>
                            <MathText
                                className="text-gray-400 text-sm leading-relaxed block"
                                text={String.raw`If an electron is a solid piece of matter with measurable mass, acting like a smeared-out wave... where exactly is it? $E = mc^2$ implies solid mass, yet we found it behaves as a wave.`}
                            />
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-brand-purple/30 transition-colors group">
                            <h4 className="text-xl font-bold text-brand-purple mb-4 flex items-center gap-2">
                                <span className="text-brand-purple">02</span> The Location Paradox
                            </h4>
                            <MathText
                                className="text-gray-400 text-sm leading-relaxed block"
                                text={String.raw`How can a solid object not have a specific location in space? $\lambda = \frac{h}{p}$ tells us a particle has a wavelength, making its exact position uncertain.`}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Section 1: Setup ──────────────────────────────────────────── */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute -top-16 -right-16 w-64 h-64 bg-brand-purple/5 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10">
                    <h2 className="text-3xl font-bold text-white mb-2">The Setup</h2>
                    <p className="text-gray-400 text-sm mb-8">Three simple components. One impossible result.</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {[
                            { n: '01', col: 'text-brand-purple border-brand-purple/40', title: 'Electron Gun', body: 'Fires real, physical electrons with measurable mass toward a barrier on the right.' },
                            { n: '02', col: 'text-brand-cyan border-brand-cyan/40', title: 'Two-Slit Barrier', body: 'A solid wall with two tiny vertical gaps cut out. Both are left open.' },
                            { n: '03', col: 'text-green-400 border-green-500/40', title: 'Detector Screen', body: 'Records exactly where each electron lands, building up a pattern over time.' },
                        ].map(({ n, col, title, body }) => (
                            <div key={n} className={`bg-black/40 rounded-2xl p-6 border ${col.split(' ')[1]}`}>
                                <div className={`text-3xl font-black font-mono ${col.split(' ')[0]} mb-3`}>{n}</div>
                                <h4 className="text-white font-bold mb-2">{title}</h4>
                                <p className="text-gray-400 text-sm leading-relaxed">{body}</p>
                            </div>
                        ))}
                    </div>

                    {/* Classical vs Quantum prediction */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                        <div className="bg-red-950/25 border border-red-500/20 rounded-2xl p-5">
                            <div className="text-red-400 text-xs font-bold uppercase tracking-wider mb-2">❌ Classical Prediction</div>
                            <p className="text-gray-300 text-sm leading-relaxed">Electrons are bullets. They travel straight through the slits and form <strong>two bands</strong> on the back wall.</p>
                        </div>
                        <div className="bg-brand-purple/10 border border-brand-purple/25 rounded-2xl p-5">
                            <div className="text-brand-purple text-xs font-bold uppercase tracking-wider mb-2">✦ The Reality</div>
                            <p className="text-gray-300 text-sm leading-relaxed">The electrons create a full <strong>wave interference pattern</strong> — alternating bright and dark bands, exactly like overlapping water ripples.</p>
                        </div>
                    </div>
                </div>
            </div>

            <ConceptNugget text="The classical prediction is completely reasonable — and completely wrong. The actual result is one of the most shocking experimental findings in the history of science." />

            {/* ── Section 2: The Impossible Result ─────────────────────────── */}
            <div className="space-y-8">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-6">The Impossible Result</h2>

                    {/* Key events as a timeline */}
                    <div className="space-y-4 mb-6">
                        <div className="flex gap-4 items-start">
                            <div className="shrink-0 w-8 h-8 rounded-full bg-brand-purple/20 border border-brand-purple/40 flex items-center justify-center text-brand-purple font-bold text-xs">1</div>
                            <p className="text-gray-300 text-sm leading-relaxed pt-1">Electrons fired at both slits produced an interference pattern. Not two bands — many alternating stripes, like waves. That meant each electron was spreading out and going through <em>both slits simultaneously</em>.</p>
                        </div>
                        <div className="flex gap-4 items-start">
                            <div className="shrink-0 w-8 h-8 rounded-full bg-brand-cyan/20 border border-brand-cyan/40 flex items-center justify-center text-brand-cyan font-bold text-xs">2</div>
                            <p className="text-gray-300 text-sm leading-relaxed pt-1">Scientists suspected electrons were bumping into each other. They slowed the gun to fire <strong className="text-white">one single electron at a time</strong>, with a full minute's gap between each shot.</p>
                        </div>
                        <div className="flex gap-4 items-start">
                            <div className="shrink-0 w-8 h-8 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center text-green-400 font-bold text-xs">3</div>
                            <div className="pt-1">
                                <p className="text-gray-200 text-sm leading-relaxed font-medium mb-2">After thousands of isolated shots — <strong>the interference pattern appeared anyway.</strong></p>
                                <p className="text-gray-400 text-sm leading-relaxed">Each electron somehow traveled as a wave, passed through both slits, interfered with itself, and collapsed to a single dot on the screen. Its landing spot looked random. But the underlying wave probability was undeniable.</p>
                            </div>
                        </div>
                    </div>

                    {/* Centered equation */}
                    <div className="flex justify-center mb-2">
                        <div className="bg-white/5 border border-white/10 rounded-2xl px-10 py-6 text-center">
                            <LatexBlock displayMode expression="I(\theta) = I_0 \cos^2\!\left(\frac{\pi d \sin\theta}{\lambda}\right)" />
                            <p className="text-xs text-gray-500 mt-2">Probability of landing at angle θ: d = slit gap, λ = de Broglie wavelength</p>
                        </div>
                    </div>
                    <p className="text-gray-500 text-xs text-center italic">The yellow dotted line in the simulation below shows this exact curve — the theoretical probability that the dots are following.</p>
                </div>

                <DoubleSlitCanvas />

                <div className="bg-brand-purple/5 border border-brand-purple/20 rounded-2xl p-5 text-sm text-gray-300 leading-relaxed">
                    <strong className="text-white">Try "One at a time" mode.</strong> Watch each electron land as a single seemingly random dot. After ~300 shots the interference fringes emerge. The pattern is not coincidence — it is the cos² probability law playing out across many individual particles.
                </div>
            </div>

            <ConceptNugget text="The electron doesn't 'choose' a slit. Before hitting the screen it genuinely has no definite position — it exists in a superposition of all possible paths. This is not metaphor. It is the literal mathematical description of where the electron is." />

            {/* ── Section 3: Observer Effect ─────────────────────────────────── */}
            <div className="space-y-8">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-6">The Observer Effect</h2>

                    <div className="space-y-6 mb-6">
                        {/* Step 1 */}
                        <div className="bg-black/40 border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-center md:items-start">
                            <div className="shrink-0 w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 text-xl">
                                📸
                            </div>
                            <div>
                                <h4 className="text-white font-bold mb-2">The Setup</h4>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    Scientists couldn't accept that a physical object was going through two doors at once. So they placed a tiny sensor right at the slits to catch which one the electron actually used.
                                </p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="bg-black/40 border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-center md:items-start relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-2xl pointer-events-none" />
                            <div className="shrink-0 w-12 h-12 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 font-bold text-xl z-10">
                                !
                            </div>
                            <div className="z-10">
                                <h4 className="text-red-400 font-bold mb-2">The Result</h4>
                                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                                    The camera clicked. It saw the electron pass the left slit. Everything seemed perfectly normal — until they looked at the back screen.
                                </p>
                                <div className="bg-red-950/40 border border-red-500/30 rounded-xl px-5 py-4 text-sm font-semibold text-red-300">
                                    The interference pattern was completely gone. Two boring classical bands had replaced it.
                                </div>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="bg-brand-purple/5 border border-brand-purple/20 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-center md:items-start">
                            <div className="shrink-0 w-12 h-12 rounded-full bg-brand-purple/10 border border-brand-purple/30 flex items-center justify-center text-brand-purple font-bold text-xl">
                                👁
                            </div>
                            <div>
                                <h4 className="text-brand-purple font-bold mb-2">The Conclusion</h4>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    By <em>simply measuring</em> the electron, the scientists forced it to pick a definite location. The superposition collapsed. This is the <strong className="text-white">Observer Effect</strong>. It isn't about human consciousness. Any physical interaction that "carries information" about which path the electron took is enough to destroy the wave pattern entirely.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <ObserverEffectToggle />
            </div>

            {/* ── Going Further ────────────────────────────────────────────── */}
            <div className="bg-gradient-to-br from-brand-purple/15 via-transparent to-brand-cyan/10 border border-white/10 rounded-3xl p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10 space-y-6">
                    <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs text-gray-400 uppercase tracking-wider">
                        Going Further
                    </div>
                    <h2 className="text-3xl font-bold text-white uppercase tracking-tight">The Cold Hard Truth: Decoherence</h2>
                    
                    <MathText
                        className="text-gray-300 text-lg leading-relaxed block"
                        text={String.raw`The Observer Effect is not just a physics curiosity — it is the central engineering problem of quantum computing. A qubit maintains superposition exactly like an electron going through both slits. The instant it is accidentally "observed" by anything in its environment, the superposition collapses. This is <strong class="text-brand-purple">decoherence</strong>.`}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                        <div className="bg-black/40 border border-white/10 rounded-2xl p-6 space-y-4">
                            <h4 className="text-brand-cyan font-bold uppercase tracking-widest text-xs">The Engineering Battle</h4>
                            <MathText
                                className="text-gray-400 text-sm leading-relaxed block"
                                text={String.raw`To prevent decoherence, IBM and Google cool their processors to <strong>15 Millikelvin</strong> — colder than outer space. At this temperature, thermal energy is too weak to "bump" into a qubit and act as an accidental observer. Even a single stray photon can carry enough information to ruin a calculation.`}
                            />
                        </div>
                        <div className="bg-black/40 border border-white/10 rounded-2xl p-6 space-y-4">
                            <h4 className="text-brand-purple font-bold uppercase tracking-widest text-xs">Error Correction</h4>
                            <MathText
                                className="text-gray-400 text-sm leading-relaxed block"
                                text={String.raw`Because decoherence is inevitable, we use <strong>Quantum Error Correction</strong>. We use hundreds of physical qubits together to protect one "logical" qubit, using the interference patterns themselves to detect and fix accidental measurements before they destroy our data.`}
                            />
                        </div>
                    </div>

                    <p className="text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-6">
                        The entire field of quantum engineering is the art of maintaining superposition long enough to do useful work before the universe accidentally looks at your qubits.
                    </p>
                </div>
            </div>

            <ConceptNugget text="Superposition + interference are the source of quantum computing power. Decoherence + the observer effect are the source of quantum computing difficulty. The entire field of quantum engineering is the art of maintaining superposition long enough to do useful work before the universe accidentally looks at your qubits." />

        </div>
    );
}
