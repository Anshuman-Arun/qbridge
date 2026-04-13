'use client';

import React from 'react';
import { InteractiveVideo, VideoCheckpoint } from '@/components/features/InteractiveVideo';
import { InteractiveGraph } from '@/components/features/InteractiveGraph';
import { ComplexAdditionSim } from '@/components/features/ComplexAdditionSim';
import { ConceptNugget } from '@/components/features/ConceptNugget';
import { LatexBlock } from '@/components/features/LatexBlock';

export default function ComplexNumbersLesson() {
    const checkpoints: VideoCheckpoint[] = [
        {
            id: 'cp_1',
            timeSeconds: 65,
            questionText: 'By mathematical definition, what is the value of $i^2$?',
            options: ['$1$', '$0$', '$-1$', '$\\sqrt{-1}$'],
            correctAnswer: '$-1$'
        },
        {
            id: 'cp_2',
            timeSeconds: 155,
            questionText: 'Which quantum effect fundamentally relies on phase relationships represented with complex numbers?',
            options: ['Gravity', 'Interference', 'Friction', 'Magnetism'],
            correctAnswer: 'Interference'
        },
        {
            id: 'cp_3',
            timeSeconds: 200,
            questionText: 'What is the real part ($a$) of the complex number $3 - 4i$?',
            options: ['$3$', '$-4$', '$i$', '$7$'],
            correctAnswer: '$3$'
        }
    ];

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 text-lg leading-relaxed">
                    Use this page to reinforce the video with quick references and visual practice. The key goal is understanding complex numbers as two-part objects that can be graphed and computed consistently.
                </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Core definitions</h3>
                <div className="space-y-3 text-sm text-gray-300">
                    <p>The imaginary unit is defined by:</p>
                    <LatexBlock expression="i^2 = -1" displayMode />
                    <p>Standard complex form:</p>
                    <LatexBlock expression="z = a + bi" displayMode />
                </div>
            </div>

            <InteractiveVideo
                url="https://www.youtube.com/watch?v=SP-YJe7Vldo"
                checkpoints={checkpoints}
            />

            <div className="prose prose-invert max-w-none">
                <h3 className="text-2xl font-bold text-white mt-12 mb-6">Complex plane</h3>
                <p className="text-gray-400 mb-8">
                    Plot complex values as coordinates: real part on the x-axis and imaginary part on the y-axis. This gives a direct geometric view of each number.
                </p>
            </div>

            <InteractiveGraph
                mode="point"
                title="Complex Coordinate Visualizer"
                description="Drag the point to change real and imaginary parts."
                xLabel="Real axis"
                yLabel="Imaginary axis"
                snap={1}
            />

            <div className="prose prose-invert max-w-none">
                <h3 className="text-2xl font-bold text-white mt-12 mb-6">Addition and subtraction</h3>
                <p className="text-gray-400 mb-8">
                    Add and subtract component-wise: real with real, imaginary with imaginary. Use the simulation to build confidence before moving to multiplication.
                </p>
            </div>

            <ComplexAdditionSim />

            <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-8 mt-12">
                <h3 className="text-xl font-bold text-white mb-4">Multiplication reminder (FOIL)</h3>
                <div className="space-y-3 text-sm text-gray-300">
                    <LatexBlock expression="(2 + 3i)(1 + 4i) = 2 + 8i + 3i + 12i^2" displayMode />
                    <LatexBlock expression="= 2 + 11i - 12 = -10 + 11i" displayMode />
                    <p>Always reduce <code>i^2</code> to <code>-1</code> during simplification.</p>
                </div>
            </div>

            <ConceptNugget text="Complex numbers make phase and interference mathematically tractable, which is why they appear throughout quantum mechanics." />
        </div>
    );
}
