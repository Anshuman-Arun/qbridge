'use client';

import React from 'react';
import { InteractiveVideo, VideoCheckpoint } from '@/components/features/InteractiveVideo';
import { LogicCircuit } from '@/components/features/LogicCircuit';
import { NandUniversalBuilder } from '@/components/features/NandUniversalBuilder';
import { ConceptNugget } from '@/components/features/ConceptNugget';
import { LatexBlock } from '@/components/features/LatexBlock';

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
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 text-lg leading-relaxed">
                    This page is a companion to the lesson video. Use it to lock in the core ideas: what a bit is, how gates transform bits, and why NAND matters before we move into quantum gates.
                </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Key definitions</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-300">
                    <li><strong>Bit:</strong> the smallest classical unit of information, with state <code>0</code> or <code>1</code>.</li>
                    <li><strong>State vector form:</strong> <code>0</code> maps to <code>[1, 0]^T</code>, and <code>1</code> maps to <code>[0, 1]^T</code>.</li>
                    <li><strong>Logic gate:</strong> a rule that maps one or more input bits to an output bit.</li>
                </ul>
            </div>

            <ConceptNugget text="Classical computers are physical switch networks: transistors implement binary states, and gate wiring implements logic." />

            <InteractiveVideo 
                url="https://www.youtube.com/watch?v=gI-qXk7XojA"
                checkpoints={checkpoints}
            />

            <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Single-bit gate reminder</h3>
                <p className="text-sm text-gray-300 mb-4">
                    The NOT gate flips a bit. In matrix form, the NOT operation is:
                </p>
                <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                    <LatexBlock displayMode expression="\begin{bmatrix}0 & 1 \\ 1 & 0\end{bmatrix}" />
                </div>
                <p className="text-xs text-gray-400 mt-4">
                    This keeps the math consistent with later quantum lessons where gates are also matrix operations.
                </p>
            </div>

            <div className="prose prose-invert max-w-none">
                <h3 className="text-2xl font-bold text-white">Logic gate sandbox</h3>
                <p className="text-gray-400">
                    Use the simulator to test truth-table behavior for two-input gates. Try all four input combinations to confirm how AND, OR, and XOR differ.
                </p>
            </div>

            <LogicCircuit />

            <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-8">
                <h3 className="text-xl font-bold text-white mb-4">Universal logic with NAND</h3>
                <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                    NAND is called a universal gate because any classical circuit can be built from NAND alone. Build target gates below to see this in action.
                </p>
                <NandUniversalBuilder />
            </div>

            <ConceptNugget text="Reversibility matters: most classical gates lose information, while quantum gate design requires reversible transformations." />
        </div>
    );
}
