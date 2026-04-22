'use client';

import React from 'react';
import { LatexBlock } from '@/components/features/LatexBlock';
import { InteractiveVideo, VideoCheckpoint } from '@/components/features/InteractiveVideo';
import { ConceptNugget } from '@/components/features/ConceptNugget';
import { MathText } from '@/components/features/MathText';
import { VectorMatchGame } from '@/components/features/VectorMatchGame';
import { StateVectorSynthesizer } from '@/components/features/StateVectorSynthesizer';

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

export default function VectorsLesson() {

    return (
        <div className="space-y-20 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            {/* Header Section */}
            <div>
                <h1 className="text-4xl font-bold text-white mb-5 leading-tight">Vectors: The Foundation</h1>
                <MathText
                    className="text-gray-300 text-lg leading-relaxed block"
                    text={String.raw`To understand quantum computing, we must first understand the <strong class="text-brand-cyan">vector</strong>. It is the core mathematical object that allows us to map states, apply operations, and predict probabilities.`}
                />
            </div>

            {/* Interactive Video Section */}
            <div>
                <InteractiveVideo
                    url="https://www.youtube.com/watch?v=Mn5yKDyspug"
                    checkpoints={videoCheckpoints}
                />
            </div>

            {/* Mathematical Notation & Magnitude */}
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/5 via-transparent to-brand-purple/5 opacity-50 blur-3xl pointer-events-none" />
                <div className="relative z-10 bg-black/60 border border-white/10 rounded-3xl p-10 shadow-2xl">
                    <h3 className="text-3xl font-bold text-white mb-8">Notation & Magnitude</h3>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Notation Card */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm shadow-xl flex flex-col group hover:border-brand-cyan/30 transition-colors">
                            <h4 className="text-xl font-bold text-brand-cyan mb-4">Column Notation</h4>
                            <MathText
                                className="text-gray-400 text-[15px] leading-relaxed block mb-6"
                                text={String.raw`We usually write vectors vertically with square brackets. Each number inside is called a <strong>component</strong>. The number of components dictates the vector's <em>dimension</em>.`}
                            />
                            <div className="bg-black/50 p-6 pt-8 rounded-xl border border-white/5 flex justify-center shadow-inner mt-auto">
                                <LatexBlock displayMode expression={`\\vec{v} = \\begin{bmatrix} v_1 \\\\ v_2 \\\\ v_3 \\end{bmatrix}`} />
                            </div>
                        </div>

                        {/* Magnitude Card */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm shadow-xl flex flex-col group hover:border-brand-purple/30 transition-colors">
                            <h4 className="text-xl font-bold text-brand-purple mb-4">Magnitude (Length)</h4>
                            <MathText
                                className="text-gray-400 text-[15px] leading-relaxed block mb-4"
                                text={String.raw`The total length of the arrow is called its <strong>magnitude</strong>. We denote this with bars, like $|\vec{v}|$. To calculate it, we use the Pythagorean Theorem:`}
                            />
                            <MathText
                                className="text-gray-500 text-xs leading-relaxed block mb-6 italic"
                                text={String.raw`If there are more than two dimensions, squaring each component, adding those squares, and then taking the square root measures the distance from the origin.`}
                            />
                            <div className="bg-black/50 p-6 pt-8 rounded-xl border border-white/5 flex justify-center shadow-inner mt-auto">
                                <LatexBlock displayMode expression={`|\\vec{v}| = \\sqrt{x^2 + y^2}`} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Graphical Match Game */}
            <div className="space-y-8">
                <div>
                    <h3 className="text-3xl font-bold text-white mb-4">Connecting Coordinates to Space</h3>
                    <MathText
                        className="text-gray-400 text-lg leading-relaxed block"
                        text={String.raw`As covered in the video, every vector can be drawn as an arrow on a graph. In the case of 2D vectors, the top number represents the $x$-coordinate, and the bottom number represents the $y$-coordinate.`}
                    />
                </div>
                <VectorMatchGame />
            </div>

            {/* Arithmetic & State Synthesizer */}
            <div className="space-y-10 border-t border-white/10 pt-16">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-4">Vector Arithmetic</h2>
                    <p className="text-gray-400 text-lg leading-relaxed">
                        Vector arithmetic allows us to transition from base coordinates into completely new directions. The core operations are <strong className="text-brand-cyan">Addition</strong> (stacking head-to-tail) and <strong className="text-brand-purple">Scalar Multiplication</strong> (stretching or shrinking). Let's see if you can use addition and multiplication on different vectors to hit target points on the plane.
                    </p>
                </div>

                <StateVectorSynthesizer />
            </div>
            {/* Going Further Section */}
            <div className="bg-gradient-to-br from-brand-purple/15 via-transparent to-brand-cyan/10 border border-white/10 rounded-3xl p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10 space-y-6">
                    <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs text-gray-400 uppercase tracking-wider">
                        Going Further
                    </div>
                    <h2 className="text-3xl font-bold text-white">The Standard Basis</h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                        <div className="space-y-4">
                            <p className="text-gray-300 text-sm leading-relaxed">
                                Geometry in 2D happens on a grid. Every single point in space is actually a combination of two vital vectors: <strong className="text-brand-cyan"><MathText text={String.raw`$\hat{i}$`} /></strong> (pointing exactly 1 unit right) and <strong className="text-brand-purple"><MathText text={String.raw`$\hat{j}$`} /></strong> (pointing exactly 1 unit up).
                            </p>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                Because these two unit vectors point along perpendicular axes, scaling and adding them allows you to cleanly construct and address the entire universe of the coordinate plane.
                            </p>
                            <div className="bg-black/30 p-6 rounded-2xl border border-white/5 flex flex-col gap-4">
                                <MathText
                                    className="text-gray-400 text-xs italic block text-center uppercase tracking-wider"
                                    text="The Foundation"
                                />
                                <div className="flex justify-center gap-12">
                                    <LatexBlock displayMode={false} expression={`\\hat{i} = \\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix}`} />
                                    <LatexBlock displayMode={false} expression={`\\hat{j} = \\begin{bmatrix} 0 \\\\ 1 \\end{bmatrix}`} />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-black/40 border border-brand-cyan/20 rounded-xl p-6 text-sm text-gray-300 shadow-inner">
                                <strong className="text-white block mb-3 text-base flex items-center gap-2">
                                    <span className="text-brand-cyan">✦</span>
                                    The Core Principle
                                </strong>
                                <p className="mb-4 text-gray-400">
                                    When we write a normal column vector, we are implicitly giving instructions on how to scale these exact basis vectors:
                                </p>
                                <div className="bg-black/60 p-4 border border-white/5 rounded-lg flex justify-center mb-4">
                                    <LatexBlock displayMode={false} expression={`\\begin{bmatrix} 4 \\\\ 7 \\end{bmatrix} = 4\\hat{i} + 7\\hat{j}`} />
                                </div>
                                <p className="text-gray-400">
                                    These specific vectors form a "Basis" because they span the entire space. You can't trap them on a single 1D line.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
