'use client';

import React from 'react';
import { InteractiveVideo, VideoCheckpoint } from '@/components/features/InteractiveVideo';
import { TransformationVisualizer } from '@/components/features/TransformationVisualizer';
import { LatexBlock } from '@/components/features/LatexBlock';
import { InteractiveGraph } from '@/components/features/InteractiveGraph';
import { ConceptNugget } from '@/components/features/ConceptNugget';

export default function PlanarRelationshipsLesson() {
    const checkpoints: VideoCheckpoint[] = [
        {
            id: 'pr_1',
            timeSeconds: 52,
            questionText: 'How should you think about a matrix when it is applied to a vector?',
            options: [
                'As a passive grid of numbers',
                'As a new coordinate plane',
                'As an action or machine that moves the vector',
                'As a scalar multiplier'
            ],
            correctAnswer: 'As an action or machine that moves the vector'
        },
        {
            id: 'pr_2',
            timeSeconds: 140,
            questionText: 'What is the specific matrix used for a $90^{\\circ}$ rotation to the left?',
            options: [
                '$\\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix}$',
                '$\\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix}$',
                '$\\begin{bmatrix} 0 & 1 \\\\ 1 & 0 \\end{bmatrix}$',
                '$\\begin{bmatrix} -1 & 0 \\\\ 0 & -1 \\end{bmatrix}$'
            ],
            correctAnswer: '$\\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix}$'
        }
    ];

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 text-lg leading-relaxed">
                    This lesson connects vectors, matrices, and complex coordinates. The goal is to see every matrix multiplication as a concrete geometric transformation.
                </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Connection summary</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-300">
                    <li>A complex number <code>a + bi</code> maps to the point <code>(a, b)</code>.</li>
                    <li>That point can be interpreted as a vector from the origin.</li>
                    <li>A matrix acts on that vector to stretch, reflect, rotate, or combine these effects.</li>
                </ul>
            </div>

            <InteractiveVideo
                url="https://www.youtube.com/watch?v=kYB8IZa5AuE"
                checkpoints={checkpoints}
            />

            <div className="prose prose-invert max-w-none">
                <h3 className="text-2xl font-bold text-white mt-12 mb-6">Transformation machine</h3>
                <p className="text-gray-400 mb-8">
                    Explore matrix presets and observe how one input vector maps to a new output vector. Pay attention to patterns: stretches preserve direction, reflections flip orientation, and rotations preserve magnitude.
                </p>
            </div>

            <TransformationVisualizer />

            <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-8 mt-12">
                <h3 className="text-xl font-bold text-white mb-4">Rotation matrix reference</h3>
                <LatexBlock displayMode expression="R(\theta) = \begin{bmatrix} \cos(\theta) & -\sin(\theta) \\ \sin(\theta) & \cos(\theta) \end{bmatrix}" />
                <p className="text-gray-400 mt-4 mb-6 text-sm">
                    Drag the vector and compare the observed movement to the formula above.
                </p>

                <InteractiveGraph
                    mode="vector"
                    title="Interactive Vector Rotation"
                    description="Drag the vector tip to spin it around the origin."
                    snap={0.5}
                    viewBox={{ xMin: -5, xMax: 5, yMin: -5, yMax: 5 }}
                />
            </div>

            <ConceptNugget text="Linear transformations are the geometric language behind both classical graphics operations and quantum state evolution." />
        </div>
    );
}
