'use client';

import React from 'react';
import { InteractiveVideo, VideoCheckpoint } from '@/components/features/InteractiveVideo';
import { TransformationVisualizer } from '@/components/features/TransformationVisualizer';
import { LatexBlock } from '@/components/features/LatexBlock';
import { InteractiveGraph } from '@/components/features/InteractiveGraph';
import { ConceptNugget } from '@/components/features/ConceptNugget';
import { MathText } from '@/components/features/MathText';

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
            questionText: String.raw`What is the matrix used for a $90°$ rotation to the left?`,
            options: [
                String.raw`$\begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix}$`,
                String.raw`$\begin{bmatrix} 0 & -1 \\ 1 & 0 \end{bmatrix}$`,
                String.raw`$\begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}$`,
                String.raw`$\begin{bmatrix} -1 & 0 \\ 0 & -1 \end{bmatrix}$`
            ],
            correctAnswer: String.raw`$\begin{bmatrix} 0 & -1 \\ 1 & 0 \end{bmatrix}$`
        }
    ];

    return (
        <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            {/* Header */}
            <div className="prose prose-invert max-w-none">
                <h1 className="text-4xl font-bold text-white mb-4">Planar Relationships: Space as a Transformation</h1>
                <MathText
                    className="text-gray-300 text-lg leading-relaxed block mb-6"
                    text={String.raw`What does it mean to <em>multiply</em> a matrix by a vector? Not just arithmetic — it is a <strong>geometric action</strong>. Matrices rotate, stretch, reflect, and shear the entire coordinate plane. This geometric view is the bridge between linear algebra and quantum gate operations.`}
                />
            </div>

            {/* Video */}
            <div className="space-y-6">
                <InteractiveVideo url="https://www.youtube.com/watch?v=kYB8IZa5AuE" checkpoints={checkpoints} />
            </div>

            {/* Connection card */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-purple/5 rounded-full blur-3xl -mr-32 -mt-32" />
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-6">Connecting the Concepts</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { color: 'text-brand-cyan', label: 'Complex Number', body: 'a + bi maps to point (a, b) in the plane' },
                            { color: 'text-brand-purple', label: 'Vector', body: 'That point is an arrow from the origin with direction and length' },
                            { color: 'text-green-400', label: 'Matrix', body: 'Acts on the vector to stretch, rotate, or reflect it' },
                        ].map(({ color, label, body }) => (
                            <div key={label} className="bg-black/30 rounded-2xl p-6 border border-white/5">
                                <h4 className={`${color} font-bold mb-2 text-sm uppercase tracking-wider`}>{label}</h4>
                                <p className="text-gray-400 text-sm">{body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <ConceptNugget text="Linear transformations are the geometric language behind both classical graphics operations and quantum state evolution." />

            {/* Transformation Visualizer */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-10 shadow-2xl">
                <div className="space-y-8">
                    <div className="max-w-3xl">
                        <h3 className="text-2xl font-bold text-white mb-4">Transformation Machine</h3>
                        <MathText
                            className="text-gray-400 text-lg leading-relaxed"
                            text={String.raw`Explore matrix presets and observe how one input vector maps to a new output vector. Notice the patterns: <strong>stretches</strong> preserve direction, <strong>reflections</strong> flip orientation, and <strong>rotations</strong> preserve magnitude.`}
                        />
                        <div className="mt-4 p-4 bg-brand-purple/10 border-l-2 border-brand-purple rounded-r-lg">
                            <MathText
                                className="text-sm text-brand-purple font-medium"
                                text={String.raw`Try the rotation preset, then verify it against the formula below.`}
                            />
                        </div>
                    </div>
                    <TransformationVisualizer />
                </div>
            </div>

            {/* Rotation formula */}
            <div className="bg-gradient-to-br from-brand-purple/20 via-brand-purple/5 to-transparent border border-white/10 rounded-3xl p-12 shadow-2xl">
                <h2 className="text-3xl font-bold text-white mb-10 text-center tracking-tight">Rotation Matrix</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div className="space-y-8">
                        <MathText
                            className="text-gray-300 text-lg block"
                            text={String.raw`The general rotation matrix $R(\theta)$ rotates any vector by angle $\theta$ counterclockwise around the origin. It is <strong>unitary</strong>: rotating by $\theta$ and then by $-\theta$ gives back the original vector — just like quantum gates.`}
                        />
                        <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                            <LatexBlock
                                displayMode
                                expression="R(\theta) = \begin{bmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{bmatrix}"
                            />
                        </div>
                    </div>
                    <div className="space-y-6">
                        <MathText
                            className="text-gray-300 text-lg block leading-relaxed"
                            text={String.raw`Drag the vector tip on the interactive graph. Compare where it lands to the formula above for $\theta = 90°$. You should find the result is $\begin{bmatrix} -y \\ x \end{bmatrix}$.`}
                        />
                        <InteractiveGraph
                            mode="vector"
                            title="Interactive Vector Rotation"
                            description="Drag the vector tip to spin it around the origin."
                            snap={0.5}
                            viewBox={{ xMin: -5, xMax: 5, yMin: -5, yMax: 5 }}
                        />
                    </div>
                </div>
            </div>

            <ConceptNugget text="Quantum gates like the Hadamard and Phase gates are literally rotation matrices on the Bloch sphere — the same math you just explored." />
        </div>
    );
}
