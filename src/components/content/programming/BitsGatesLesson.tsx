'use client';

import React from 'react';
import { InteractiveVideo, VideoCheckpoint } from '@/components/features/InteractiveVideo';
import { LogicCircuit } from '@/components/features/LogicCircuit';
import { NandUniversalBuilder } from '@/components/features/NandUniversalBuilder';
import { ConceptNugget } from '@/components/features/ConceptNugget';
import { LatexBlock } from '@/components/features/LatexBlock';
import { MathText } from '@/components/features/MathText';
import { Cpu, Zap, Layers, RefreshCw } from 'lucide-react';

export default function BitsGatesLesson() {
    const checkpoints: VideoCheckpoint[] = [
        {
            id: 'bg-1',
            timeSeconds: 43,
            questionText: 'What is the absolute smallest unit of physical information in a classical computer?',
            options: ['A Byte', 'A Bit', 'An Atom', 'A Pixel'],
            correctAnswer: 'A Bit'
        },
        {
            id: 'bg-2',
            timeSeconds: 125,
            questionText: 'Which physical electrical component acts as a switch to dictate the flow of 1s and 0s?',
            options: ['Capacitor', 'Resistor', 'Transistor', 'Transformer'],
            correctAnswer: 'Transistor'
        }
    ];

    return (
        <div className="space-y-20 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            {/* ── Intro ─────────────────────────────────────────────────────── */}
            <div className="space-y-8">
                <h1 className="text-4xl font-bold text-white mb-2 leading-tight">
                    Bits & Gates: The Classical Foundation
                </h1>
                <MathText
                    className="text-gray-300 text-lg leading-relaxed block"
                    text={String.raw`To understand the quantum world, we must first master the classical one. A classical computer is essentially a massive web of switches (transistors) that manipulate bits. Every quantum algorithm has a classical predecessor; seeing how bits become vectors and gates become matrices is the first step toward quantum supremacy.`}
                />
            </div>

            {/* ── Video ─────────────────────────────────────────────────────── */}
            <div>
                <InteractiveVideo url="https://www.youtube.com/watch?v=8EgnXcM1Ud0" checkpoints={checkpoints} />
            </div>

            {/* ── Core Ideas ────────────────────────────────────────────────── */}
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/5 via-transparent to-brand-purple/5 opacity-50 blur-3xl pointer-events-none" />
                <div className="relative z-10 bg-black/60 border border-white/10 rounded-3xl p-10 shadow-2xl">
                    <h3 className="text-3xl font-bold text-white mb-8 italic tracking-tight">Two Core Ideas</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-brand-cyan/30 transition-colors group">
                            <h4 className="text-xl font-bold text-brand-cyan mb-4 flex items-center gap-2 uppercase tracking-widest text-sm">
                                <Cpu className="w-5 h-5" /> 01 Bits as Vectors
                            </h4>
                            <MathText
                                className="text-gray-400 text-sm leading-relaxed block"
                                text={String.raw`We can represent bit states as vectors. The state "0" is the vector $\begin{bmatrix}1\\0\end{bmatrix}$ and "1" is $\begin{bmatrix}0\\1\end{bmatrix}$. This "Basis State" notation is the exact same math we use to describe qubits later.`}
                            />
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-brand-purple/30 transition-colors group">
                            <h4 className="text-xl font-bold text-brand-purple mb-4 flex items-center gap-2 uppercase tracking-widest text-sm">
                                <Layers className="w-5 h-5" /> 02 Gates as Matrices
                            </h4>
                            <MathText
                                className="text-gray-400 text-sm leading-relaxed block shadow-sm"
                                text={String.raw`A logic gate is a rule that transforms bits. Mathematically, it is a matrix operation. A NOT gate is the matrix $\begin{bmatrix}0 & 1 \\ 1 & 0\end{bmatrix}$, which flips the input vector from 0 to 1.`}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <ConceptNugget text="Whether it's a physical transistor or a mathematical matrix, a logic gate is simply a rule for moving information from one state to another." />

            {/* ── Section 1: Logic Sandbox ──────────────────────────────────── */}
            <div className="space-y-10">
                <div className="max-w-3xl">
                    <h2 className="text-3xl font-bold text-white mb-4 italic tracking-tight uppercase">Logic Gate Sandbox</h2>
                    <MathText
                        className="text-gray-400 text-lg leading-relaxed block"
                        text={String.raw`Experiment with the primary building blocks of computer logic. Notice how XOR acts as a conditional flip — if the first bit is 1, the second bit flips its value. This is the classical version of the quantum CNOT gate.`}
                    />
                </div>
                <LogicCircuit />
            </div>

            {/* ── Section 2: Universal Building Blocks ──────────────────────── */}
            <div className="space-y-10 border-t border-white/10 pt-16">
                <div className="max-w-3xl">
                    <h2 className="text-3xl font-bold text-white mb-4 italic tracking-tight uppercase">The Universal Building Block</h2>
                    <MathText
                        className="text-gray-400 text-lg leading-relaxed block"
                        text={String.raw`In classical computing, the NAND gate is <strong>universal</strong>—you can build any other gate, and thus any computer, using only NAND gates. This proves that complex intelligence can emerge from a single, simple repetitive rule.`}
                    />
                </div>
                <NandUniversalBuilder />
            </div>

            {/* ── Going Further: Landauer's Principle ────────────────────────── */}
            <div className="bg-gradient-to-br from-brand-purple/15 via-transparent to-brand-cyan/10 border border-white/10 rounded-3xl p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-brand-purple/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10 space-y-6">
                    <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs text-gray-400 uppercase tracking-wider">
                        Going Further
                    </div>
                    <h2 className="text-3xl font-bold text-white uppercase tracking-tight">Landauer's Principle: The Cost of Erasing</h2>
                    
                    <MathText
                        className="text-gray-300 text-base leading-relaxed block"
                        text={String.raw`Classical gates like <strong>AND</strong> are irreversible: they take two inputs and produce one output. Information is lost. In 1961, Rolf Landauer proved that erasing 1 bit of information release a minimum amount of heat into the universe.`}
                    />

                    <div className="bg-black/40 border border-brand-purple/20 rounded-2xl p-6 space-y-4">
                        <h4 className="text-brand-purple font-bold uppercase tracking-widest text-xs">The Minimum Energy</h4>
                        <div className="bg-black/60 p-6 rounded-xl border border-white/5 text-center">
                            <LatexBlock expression="Q \geq k_B T \ln 2" />
                            <p className="text-[10px] text-gray-500 mt-2">Energy (Q) released by erasing one bit</p>
                        </div>
                        <MathText
                            className="text-gray-400 text-sm leading-relaxed block"
                            text={String.raw`Quantum computing avoids this heat-death problem. Because quantum gates are <strong>Unitary</strong> (fully reversible), they do not erase information. In theory, a perfect quantum computer could run without generating any Landauer heat.`}
                        />
                    </div>

                    <p className="text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-6 italic">
                        "Information is physical." — Rolf Landauer
                    </p>
                </div>
            </div>

            {/* ── Takeaway ──────────────────────────────────────────────────── */}
            <div className="bg-brand-cyan/10 border border-brand-cyan/20 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8">
                <div className="p-4 bg-brand-cyan/20 rounded-2xl">
                    <RefreshCw className="w-10 h-10 text-brand-cyan" />
                </div>
                <div>
                    <h5 className="text-xl font-bold text-white mb-2 uppercase tracking-widest italic tracking-tight">The Big Picture</h5>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        The classical bits you've learned here are the 1D foundations of a multi-dimensional quantum future. Every transistor in your phone is a reminder that computing is a physical process, governed by the laws of thermodynamics.
                    </p>
                </div>
            </div>
        </div>
    );
}
