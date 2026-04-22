'use client';

import React from 'react';
import { InteractiveVideo, VideoCheckpoint } from '@/components/features/InteractiveVideo';
import { ConceptNugget } from '@/components/features/ConceptNugget';
import { MathText } from '@/components/features/MathText';
import { LatexBlock } from '@/components/features/LatexBlock';
import { PhotoelectricLabSim } from '@/components/features/PhotoelectricLabSim';
import { WaveInterferencePond } from '@/components/features/WaveInterferencePond';
import { CylinderShadowVisual } from '@/components/features/CylinderShadowVisual';

const checkpoints: VideoCheckpoint[] = [
    {
        id: 'wpd_cp1',
        timeSeconds: 65,
        questionText: 'Classical physics divided the universe into two strict boxes. What were they?',
        options: ['Space and Time', 'Energy and Gravity', 'Matter and Energy', 'Waves and Fields'],
        correctAnswer: 'Matter and Energy',
    },
    {
        id: 'wpd_cp2',
        timeSeconds: 150,
        questionText: "Thomas Young's experiment proved Newton wrong. What did he observe when shining light through two slits?",
        options: [
            'Two straight bands of light hitting the wall',
            'The light disappeared entirely',
            'An overlapping interference pattern — like ripples in a pond',
            'A single dot in the center',
        ],
        correctAnswer: 'An overlapping interference pattern — like ripples in a pond',
    },
];

export default function WaveParticleDualityLesson() {
    return (
        <div className="space-y-20 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">

            {/* ── Intro ─────────────────────────────────────────────────────── */}
            <div>
                <h1 className="text-4xl font-bold text-white mb-5 leading-tight">
                    Wave-Particle Duality: The First Crack in Classical Physics
                </h1>
                <p className="text-gray-300 text-lg leading-relaxed">
                    For centuries, physicists believed the universe was built on a clean division: <strong className="text-white">matter</strong> on one side, <strong className="text-white">energy</strong> on the other. In the early 1900s, that picture broke. What followed reshaped all of science — and gave us quantum computing.
                </p>
            </div>

            {/* ── Video ─────────────────────────────────────────────────────── */}
            <div>
                <InteractiveVideo url="https://youtu.be/AUIzjt3RR7Q" checkpoints={checkpoints} />
            </div>

            {/* ── Section 1: Two Perfect Boxes ──────────────────────────────── */}
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/5 via-transparent to-brand-purple/5 rounded-3xl pointer-events-none" />
                <div className="relative p-10 border border-white/10 rounded-3xl shadow-2xl">
                    <h2 className="text-3xl font-bold text-white mb-2">The Classical World</h2>
                    <p className="text-gray-400 text-sm mb-8">Newton's physics had two separate, never-overlapping boxes.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Matter box */}
                        <div className="bg-black/60 rounded-2xl border border-brand-cyan/30 overflow-hidden">
                            <div className="bg-brand-cyan/10 px-6 py-4 flex items-center gap-3 border-b border-brand-cyan/20">
                                <div className="w-8 h-8 rounded-full bg-brand-cyan/20 flex items-center justify-center text-brand-cyan text-lg">●</div>
                                <div>
                                    <div className="text-brand-cyan font-bold text-sm uppercase tracking-wider">Matter</div>
                                    <div className="text-gray-400 text-xs">Discrete particles</div>
                                </div>
                            </div>
                            <div className="px-6 py-5 space-y-3">
                                {[
                                    'Countable — 1, 2, or 10 particles, never "1.5"',
                                    'Localized — one exact point in space at all times',
                                    'Travels in a straight, predictable line',
                                    'Hits a wall at one exact spot',
                                ].map(t => (
                                    <div key={t} className="flex items-start gap-3 text-sm text-gray-300">
                                        <span className="text-brand-cyan shrink-0 mt-0.5">→</span>{t}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Energy box */}
                        <div className="bg-black/60 rounded-2xl border border-brand-purple/30 overflow-hidden">
                            <div className="bg-brand-purple/10 px-6 py-4 flex items-center gap-3 border-b border-brand-purple/20">
                                <div className="w-8 h-8 rounded-full bg-brand-purple/20 flex items-center justify-center text-brand-purple text-lg">〜</div>
                                <div>
                                    <div className="text-brand-purple font-bold text-sm uppercase tracking-wider">Energy</div>
                                    <div className="text-gray-400 text-xs">Continuous waves</div>
                                </div>
                            </div>
                            <div className="px-6 py-5 space-y-3">
                                {[
                                    'Continuous — spreads out through space like pond ripples',
                                    'Interferes — two crests add, a crest + trough cancels',
                                    'Diffracts — bends around obstacles and gaps',
                                    'By 1801, Young proved light is a wave via two slits',
                                ].map(t => (
                                    <div key={t} className="flex items-start gap-3 text-sm text-gray-300">
                                        <span className="text-brand-purple shrink-0 mt-0.5">→</span>{t}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bottom summary pill */}
                    <div className="mt-6 flex justify-center">
                        <div className="bg-white/5 border border-white/10 rounded-full px-6 py-3 text-sm text-gray-400 text-center">
                            By 1900, physicists were confident this division was permanent.
                            <span className="text-white font-medium ml-1">Then came the photoelectric effect.</span>
                        </div>
                    </div>
                </div>
            </div>

            <ConceptNugget text="Interference is the key property that distinguishes waves from particles. Two balls thrown together simply collide. Two waves overlapping add and cancel — creating bright and dark bands that no particle model can produce." />

            {/* ── Section 2: Photoelectric Effect ──────────────────────────── */}
            <div className="space-y-8">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-4">The Photoelectric Effect: Energy Becomes Chunky</h2>

                    {/* Expected vs Actual — compact cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-red-950/30 border border-red-500/25 rounded-2xl p-5">
                            <div className="text-red-400 font-bold text-xs uppercase tracking-wider mb-2">❌ Classical Prediction</div>
                            <p className="text-gray-300 text-sm leading-relaxed">Brighter light → bigger energy wave → more electrons knocked loose. Any color, any brightness — just be bright enough.</p>
                        </div>
                        <div className="bg-green-950/30 border border-green-500/25 rounded-2xl p-5">
                            <div className="text-green-400 font-bold text-xs uppercase tracking-wider mb-2">✓ What Actually Happened</div>
                            <p className="text-gray-300 text-sm leading-relaxed">Blazing red light: zero electrons. Dim blue light: electrons fly off instantly. Intensity is irrelevant. <strong className="text-white">Only frequency matters.</strong></p>
                        </div>
                    </div>

                    <MathText
                        className="text-gray-300 text-base leading-relaxed block mb-5"
                        text={`Einstein's conclusion: light travels as discrete packets of energy called <strong>photons</strong>. Each photon's energy is $E = hf$ — proportional to frequency, not brightness. A red photon is too weak regardless of how many you fire. One blue photon has enough energy on its own.`}
                    />

                    {/* Equation centered */}
                    <div className="flex justify-center mb-2">
                        <div className="bg-white/5 border border-white/10 rounded-2xl px-10 py-6 text-center">
                            <LatexBlock displayMode expression="E = hf \qquad (h = 6.626 \times 10^{-34}\,\text{J·s})" />
                            <p className="text-xs text-gray-500 mt-2">Photon energy = Planck's constant × light frequency</p>
                        </div>
                    </div>
                </div>

                <PhotoelectricLabSim />
            </div>

            <ConceptNugget text="Einstein won the Nobel Prize for this — not relativity. Quantized photons were quantum physics's founding act: energy is not continuous but comes in discrete, indivisible packets." />

            {/* ── Section 3: De Broglie ─────────────────────────────────────── */}
            <div className="space-y-8">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-6">de Broglie's Flip: Matter as Waves</h2>

                    {/* Step layout */}
                    <div className="space-y-4 mb-6">
                        <div className="flex gap-4 items-start">
                            <div className="shrink-0 w-8 h-8 rounded-full bg-brand-purple/20 border border-brand-purple/40 flex items-center justify-center text-brand-purple font-bold text-sm">1</div>
                            <p className="text-gray-300 text-sm leading-relaxed pt-1">
                                Einstein showed light — thought to be a wave — can behave like a particle (photon).
                            </p>
                        </div>
                        <div className="flex gap-4 items-start">
                            <div className="shrink-0 w-8 h-8 rounded-full bg-brand-cyan/20 border border-brand-cyan/40 flex items-center justify-center text-brand-cyan font-bold text-sm">2</div>
                            <p className="text-gray-300 text-sm leading-relaxed pt-1">
                                de Broglie asked in 1924: if waves can be particles, <em>can particles be waves?</em> He proposed every particle has an associated wavelength.
                            </p>
                        </div>
                        <div className="flex gap-4 items-start">
                            <div className="shrink-0 w-8 h-8 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center text-green-400 font-bold text-sm">3</div>
                            <p className="text-gray-300 text-sm leading-relaxed pt-1">
                                Confirmed experimentally: electrons fired through a double slit created the same interference pattern as light — not two bands, but many alternating stripes. <strong className="text-white">Solid matter was acting like a wave.</strong>
                            </p>
                        </div>
                    </div>

                    {/* Equation centered */}
                    <div className="flex justify-center mb-6">
                        <div className="bg-white/5 border border-white/10 rounded-2xl px-10 py-6 text-center">
                            <LatexBlock displayMode expression="\lambda = \frac{h}{p} = \frac{h}{mv}" />
                            <p className="text-xs text-gray-500 mt-2">Wavelength λ is inversely proportional to momentum p = mv. Heavier or faster = tinier wavelength.</p>
                        </div>
                    </div>

                    {/* Scale comparison */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="bg-black/40 border border-white/5 rounded-2xl p-5 flex items-start gap-4">
                            <div className="text-2xl">⚾</div>
                            <div>
                                <div className="text-white font-semibold text-sm mb-1">Baseball at 30 m/s</div>
                                <div className="text-gray-400 text-xs">λ ≈ 10⁻³⁴ m — a trillion trillion times smaller than an atom. Completely undetectable.</div>
                            </div>
                        </div>
                        <div className="bg-black/40 border border-brand-cyan/15 rounded-2xl p-5 flex items-start gap-4">
                            <div className="text-2xl">⚡</div>
                            <div>
                                <div className="text-white font-semibold text-sm mb-1">Electron at 1 eV</div>
                                <div className="text-gray-400 text-xs">λ ≈ 1.2 nm — nanometer scale, right where quantum effects become visible and measurable.</div>
                            </div>
                        </div>
                    </div>

                    <p className="text-gray-400 text-sm leading-relaxed">
                        Below is live wave interference — the phenomenon de Broglie said electrons exhibit. Click to place two sources. <em>This is what each electron does as it travels through the double slit.</em>
                    </p>
                </div>

                <WaveInterferencePond />
            </div>

            {/* ── Going Further: Complementarity ────────────────────────────── */}
            <div className="bg-gradient-to-br from-brand-purple/15 via-transparent to-brand-cyan/10 border border-white/10 rounded-3xl p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-brand-purple/5 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10 space-y-6">
                    <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs text-gray-400 uppercase tracking-wider">
                        Going Further
                    </div>
                    <h2 className="text-3xl font-bold text-white">Niels Bohr: You Can't Have Both at Once</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                        <div className="space-y-4">
                            <p className="text-gray-300 text-sm leading-relaxed">
                                Bohr's <strong className="text-white">Complementarity principle</strong> was the Copenhagen Interpretation's answer. His claim was deliberately unsatisfying:
                            </p>
                            <blockquote className="border-l-4 border-brand-purple pl-4 text-gray-200 italic text-base">
                                "An electron is both a wave and a particle — but nature reveals only one face at a time, depending on the experiment you design."
                            </blockquote>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                The analogy below shows why this is not a contradiction — it is a limitation of 3D language to describe a higher-dimensional reality.
                            </p>
                        </div>
                        <div className="space-y-3">
                            <div className="bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-gray-300">
                                <strong className="text-white block mb-2">What complementarity means:</strong>
                                <ul className="space-y-2">
                                    <li className="flex items-start gap-2"><span className="text-brand-purple">→</span> Design a particle experiment, and the electron behaves as a particle</li>
                                    <li className="flex items-start gap-2"><span className="text-brand-cyan">→</span> Design a wave experiment, and the electron behaves as a wave</li>
                                    <li className="flex items-start gap-2"><span className="text-yellow-400">→</span> You <em>cannot</em> design one experiment to see both simultaneously</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Cylinder visual — interactive SVG */}
                    <CylinderShadowVisual />

                    <p className="text-gray-400 text-sm leading-relaxed">
                        Electrons are "quantum objects" — a category that doesn't fit classical vocabulary. This is not a measurement failure. It is a fundamental feature of reality, and it is the reason quantum computers can exploit both wave and particle behaviors simultaneously.
                    </p>
                </div>
            </div>

            <ConceptNugget text="Wave-particle duality isn't a paradox — it is a limitation of classical language when applied to quantum reality. The question 'is an electron really a wave or a particle?' is a category error. It is a quantum object, and classical language simply doesn't have the right words." />

        </div>
    );
}