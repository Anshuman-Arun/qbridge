'use client';

import React from 'react';
import { LatexBlock } from '@/components/features/LatexBlock';
import { InteractiveGraph } from '@/components/features/InteractiveGraph';
import { InteractiveVideo, VideoCheckpoint } from '@/components/features/InteractiveVideo';
import { VectorAdditionVisualizer } from '@/components/features/VectorAdditionVisualizer';
import { VectorScalingVisualizer } from '@/components/features/VectorScalingVisualizer';
import { ConceptNugget } from '@/components/features/ConceptNugget';
import { MathText } from '@/components/features/MathText';

export default function VectorsLesson() {
    const videoCheckpoints: VideoCheckpoint[] = [
        {
            id: 'cp-vector-intro',
            timeSeconds: 61,
            questionText: 'Based on the introduction, what two properties define a vector?',
            options: [
                'Only a magnitude',
                'Only a direction',
                'Both a magnitude and a direction',
                'A specific origin point'
            ],
            correctAnswer: 'Both a magnitude and a direction'
        },
        {
            id: 'cp-vector-dim',
            timeSeconds: 120,
            questionText: String.raw`What is the dimension of the vector $\begin{bmatrix} 5 \\ 3 \\ 2 \end{bmatrix}$?`,
            options: ['1', '2', '3', '6'],
            correctAnswer: '3'
        },
        {
            id: 'cp-vector-scaling',
            timeSeconds: 180,
            questionText: String.raw`What is the result of $2 \times \begin{bmatrix} 3 \\ 4 \end{bmatrix}$?`,
            options: [
                String.raw`$\begin{bmatrix} 5 \\ 6 \end{bmatrix}$`,
                String.raw`$\begin{bmatrix} 6 \\ 8 \end{bmatrix}$`,
                String.raw`$\begin{bmatrix} 3 \\ 4 \end{bmatrix}$`,
                String.raw`$\begin{bmatrix} 9 \\ 16 \end{bmatrix}$`
            ],
            correctAnswer: String.raw`$\begin{bmatrix} 6 \\ 8 \end{bmatrix}$`
        }
    ];

    return (
        <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            {/* Header Section */}
            <div className="prose prose-invert max-w-none">
                <h1 className="text-4xl font-bold text-white mb-4">Vectors: The Foundation</h1>
                <MathText 
                    className="text-gray-300 text-lg leading-relaxed block mb-6"
                    text={String.raw`To understand quantum computing, we must first understand the <strong>vector</strong>. In its simplest form, a vector is an ordered list of numbers, but as we will see, it is also a powerful geometric tool.`}
                />
            </div>

            {/* Interactive Video Section */}
            <div className="space-y-6">
                <InteractiveVideo 
                    url="https://www.youtube.com/watch?v=fNk_zzaMoSs" 
                    checkpoints={videoCheckpoints} 
                />
            </div>

            {/* Mathematical Notation */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-10 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan/5 rounded-full blur-3xl -mr-32 -mt-32" />
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-6">Mathematical Notation</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <MathText 
                                className="text-gray-400 text-lg"
                                text={String.raw`We usually write vectors <strong>vertically</strong> with square brackets. Each number inside is called a <strong>component</strong>.`}
                            />
                            <div className="flex items-center gap-3">
                                <div className="h-1 w-1 rounded-full bg-brand-purple shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
                                <MathText 
                                    className="text-gray-500 italic text-sm"
                                    text={String.raw`The number of components determines the <strong>dimension</strong> of the vector.`}
                                />
                            </div>
                        </div>
                        <div className="bg-black/30 p-8 rounded-2xl border border-white/5 backdrop-blur-sm">
                            <LatexBlock 
                                displayMode 
                                expression="v = \begin{bmatrix} v_1 \\ v_2 \\ v_3 \end{bmatrix}" 
                            />
                        </div>
                    </div>
                </div>
            </div>

            <ConceptNugget text="Vectors in quantum computing represent qubit states, where each component encodes a specific probability amplitude." />

            {/* Graphical Representation */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-10 shadow-2xl">
                <div className="space-y-8">
                    <div className="max-w-3xl">
                        <h3 className="text-2xl font-bold text-white mb-4">The Geometry of Vectors</h3>
                        <MathText 
                            className="text-gray-400 text-lg leading-relaxed"
                            text={String.raw`Graphing a vector is simple: we start an arrow at the origin $(0,0)$, called the <strong>tail</strong>, and draw until we reach the coordinates described by the components, called the <strong>tip</strong>.`}
                        />
                        <div className="mt-4 p-4 bg-brand-cyan/10 border-l-2 border-brand-cyan rounded-r-lg">
                            <MathText 
                                className="text-sm text-brand-cyan font-medium" 
                                text={String.raw`Example: Graphing the vector $\begin{bmatrix} 2 \\ 1 \end{bmatrix}$ involves moving 2 units right and 1 unit up.`}
                            />
                        </div>
                    </div>
                    
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-brand-cyan to-brand-purple rounded-2xl blur-sm opacity-5 group-hover:opacity-10 transition duration-1000"></div>
                        <div className="relative">
                            <InteractiveGraph
                                mode="vector"
                                title="Vector Space Explorer"
                                description="Explore how coordinate pairs define vectors relative to the origin."
                                snap={1}
                                viewBox={{ xMin: -6, xMax: 6, yMin: -6, yMax: 6 }}
                                locked={true}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Addition & Subtraction */}
            <div className="space-y-10">
                <div className="prose prose-invert max-w-none text-center">
                    <h2 className="text-3xl font-bold text-white">Vector Arithmetic</h2>
                    <p className="text-gray-400 text-lg">
                        Adding vectors is as simple as adding their corresponding components.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/[0.08] transition-colors">
                        <h4 className="text-brand-purple font-bold mb-6 uppercase tracking-[0.2em] text-center text-sm">Algebraic View</h4>
                        <LatexBlock 
                            displayMode 
                            expression="\begin{bmatrix} 2 \\ 1 \end{bmatrix} + \begin{bmatrix} 1 \\ 1 \end{bmatrix} = \begin{bmatrix} 2+1 \\ 1+1 \end{bmatrix} = \begin{bmatrix} 3 \\ 2 \end{bmatrix}" 
                        />
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/[0.08] transition-colors">
                        <h4 className="text-brand-cyan font-bold mb-6 uppercase tracking-[0.2em] text-center text-sm">Geometric View (Tip-to-Tail)</h4>
                        <MathText 
                            className="text-gray-400 text-center block leading-relaxed"
                            text={String.raw`Place the tail of the second vector at the tip of the first. The sum is the vector from the original origin to the final tip.`}
                        />
                    </div>
                </div>

                <div className="relative group p-1 bg-gradient-to-br from-white/10 to-transparent rounded-3xl">
                    <VectorAdditionVisualizer locked={true} />
                </div>
            </div>

            {/* Scalars Section */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-10 shadow-2xl">
                <div className="space-y-10">
                    <div className="max-w-3xl">
                        <h2 className="text-2xl font-bold text-white mb-4">Scalars: Scaling Vectors</h2>
                        <MathText 
                            className="text-gray-400 text-lg leading-relaxed" 
                            text={String.raw`A <strong>scalar</strong> is just a regular number (like 1, 5, or $\pi$). When we multiply a vector by a scalar, we multiply <strong>every component</strong> by that number.`}
                        />
                        <div className="mt-6 opacity-80">
                            <LatexBlock 
                                displayMode 
                                expression="2 \times \begin{bmatrix} 2 \\ 1 \end{bmatrix} = \begin{bmatrix} 2 \times 2 \\ 2 \times 1 \end{bmatrix} = \begin{bmatrix} 4 \\ 2 \end{bmatrix}" 
                            />
                        </div>
                    </div>
                    
                    <ConceptNugget 
                        text="Multiplying by a negative scalar flips the direction of the vector entirely." 
                        className="max-w-2xl"
                    />

                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-brand-purple to-brand-cyan rounded-2xl blur-sm opacity-5 group-hover:opacity-10 transition duration-1000"></div>
                        <div className="relative bg-black/50 rounded-2xl border border-white/5">
                            <VectorScalingVisualizer locked={true} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Magnitude Section */}
            <div className="bg-gradient-to-br from-brand-purple/20 via-brand-purple/5 to-transparent border border-white/10 rounded-3xl p-12 shadow-2xl">
                <h2 className="text-3xl font-bold text-white mb-10 text-center tracking-tight">Magnitude: The Length of a Vector</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div className="space-y-8">
                        <div className="relative">
                            <div className="absolute -left-6 top-0 bottom-0 w-1 bg-brand-purple rounded-full" />
                            <MathText 
                                className="text-gray-300 text-lg block"
                                text={String.raw`The magnitude is the total length of the arrow, often called the <strong>Euclidean Norm</strong>. In 2D, we calculate this using the <strong>Pythagorean Theorem</strong>:`}
                            />
                        </div>
                        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                            <LatexBlock 
                                displayMode 
                                expression="|v| = \sqrt{x^2 + y^2}" 
                            />
                        </div>
                        <div className="space-y-4">
                            <MathText 
                                className="text-sm text-gray-500 font-medium block"
                                text={String.raw`Notation: We use bars like $|v|$ or $||v||$ to denote magnitude.`}
                            />
                            <ConceptNugget 
                                text={String.raw`In quantum states, we often focus on <strong>Unit Vectors</strong>: vectors with a magnitude of exactly 1 ($|v| = 1$).`} 
                            />
                        </div>
                    </div>
                    <div className="space-y-8">
                        <MathText 
                            className="text-gray-300 text-lg block leading-relaxed"
                            text={String.raw`This logic generalizes to any dimension $n$. The magnitude is the square root of the sum of the squares of all components. This is why length is so critical: it represents the total probability amplitude in a system.`}
                        />
                        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                            <LatexBlock 
                                displayMode 
                                expression="|v| = \sqrt{a_1^2 + a_2^2 + \dots + a_n^2}" 
                            />
                        </div>
                        <div className="bg-black/40 p-8 rounded-3xl border border-brand-purple/30 shadow-inner relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-2 h-full bg-brand-purple shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
                            <h5 className="text-white font-bold text-lg mb-4 flex items-center gap-3">
                                Challenge Problem
                            </h5>
                            <MathText 
                                className="text-gray-300 mb-6 block leading-relaxed" 
                                text={String.raw`Given $\vec{a} = \begin{bmatrix} 1 \\ 2 \\ 3 \\ 7 \end{bmatrix}$ and $\vec{b} = \begin{bmatrix} 7 \\ 1 \\ 1 \\ 7 \end{bmatrix}$, what is the magnitude of their sum $|\vec{a}+\vec{b}|$?`}
                            />
                            <div className="inline-flex flex-col">
                                <span className="text-[10px] uppercase tracking-widest text-white/40 mb-1 font-bold">Answer</span>
                                <span className="text-2xl font-bold text-brand-purple font-mono">15</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ConceptNugget text="Mastering these 2D concepts allows us to scale our intuition to the high-dimensional Hilbert spaces used in universal quantum computers." />
        </div>
    );
}
