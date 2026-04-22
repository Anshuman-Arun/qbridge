'use client';

import React from 'react';
import { InteractiveVideo, VideoCheckpoint } from '@/components/features/InteractiveVideo';
import { MatrixArithmeticSynthesizer } from '@/components/features/MatrixArithmeticSynthesizer';
import { VectorMatrixMultiplier } from '@/components/features/VectorMatrixMultiplier';
import { ConceptNugget } from '@/components/features/ConceptNugget';
import { LatexBlock } from '@/components/features/LatexBlock';
import { MathText } from '@/components/features/MathText';

const checkpoints: VideoCheckpoint[] = [
    {
        id: 'mat_1',
        timeSeconds: 45,
        questionText: 'In order to add or subtract two matrices together, what must be absolutely true about them?',
        options: [
            'They must contain only positive numbers',
            'They must be multiplied by a scalar first',
            'They must have the exact same dimensions',
            'They must have a zero in the top left'
        ],
        correctAnswer: 'They must have the exact same dimensions'
    },
    {
        id: 'mat_2',
        timeSeconds: 130,
        questionText: String.raw`Which method is used to multiply a $2 \times 2$ matrix by a $2$-dimensional vector?`,
        options: [
            'Component-by-component multiplication',
            'Diagonal sum calculation',
            'The "row-by-column" method',
            'Absolute value derivation'
        ],
        correctAnswer: 'The "row-by-column" method'
    },
    {
        id: 'mat_3',
        timeSeconds: 210,
        questionText: String.raw`What is the sum of $\begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix} + \begin{bmatrix} 2 & 2 \\ 2 & 2 \end{bmatrix}$?`,
        options: [
            String.raw`$\begin{bmatrix} 3 & 2 \\ 2 & 3 \end{bmatrix}$`,
            String.raw`$\begin{bmatrix} 1 & 2 \\ 2 & 1 \end{bmatrix}$`,
            String.raw`$\begin{bmatrix} 3 & 3 \\ 3 & 3 \end{bmatrix}$`,
            String.raw`$\begin{bmatrix} 0 & 0 \\ 0 & 0 \end{bmatrix}$`
        ],
        correctAnswer: String.raw`$\begin{bmatrix} 3 & 2 \\ 2 & 3 \end{bmatrix}$`
    }
];

export default function MatricesLesson() {
    return (
        <div className="space-y-20 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-bold text-white mb-5 leading-tight">Matrices: The Operators</h1>
                <MathText
                    className="text-gray-300 text-lg leading-relaxed block"
                    text={String.raw`A <strong class="text-brand-purple">matrix</strong> is a rectangular grid of numbers. In quantum computing, if vectors represent the state of a system, matrices act as the fundamental operators—the exact mathematical tools we use to alter, evolve, and compute across those states.`}
                />
            </div>

            {/* Video */}
            <div>
                <InteractiveVideo url="https://www.youtube.com/watch?v=2BMk0pnGgII" checkpoints={checkpoints} />
            </div>

            {/* Structure & Arithmetic */}
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/5 via-transparent to-brand-purple/5 opacity-50 blur-3xl pointer-events-none" />
                <div className="relative z-10 bg-black/60 border border-white/10 rounded-3xl p-10 shadow-2xl">
                    <h3 className="text-3xl font-bold text-white mb-8">Notation & Algebra</h3>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Notation Card */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm shadow-xl flex flex-col group hover:border-brand-purple/30 transition-colors">
                            <h4 className="text-xl font-bold text-brand-purple mb-4">Indexing & Dimensions</h4>
                            <MathText
                                className="text-gray-400 text-[15px] leading-relaxed block mb-4"
                                text={String.raw`We strictly define a matrix by its rows and columns. An $m \times n$ matrix has $m$ rows and $n$ columns. We access individual entries using the $A_{i,j}$ notation, where $i$ is the row and $j$ is the column.`}
                            />
                            <MathText
                                className="text-gray-500 text-xs italic block mb-6"
                                text={String.raw`Important: You can only add or subtract matrices together if their overall dimensions $(m \times n)$ match exactly.`}
                            />
                            <div className="bg-black/50 p-6 pt-8 rounded-xl border border-white/5 flex justify-center shadow-inner mt-auto">
                                <LatexBlock displayMode expression={`A = \\begin{bmatrix} a_{1,1} & a_{1,2} \\\\ a_{2,1} & a_{2,2} \\end{bmatrix}`} />
                            </div>
                        </div>

                        {/* Operations Card */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm shadow-xl flex flex-col group hover:border-brand-cyan/30 transition-colors">
                            <h4 className="text-xl font-bold text-brand-cyan mb-4">Scalar Mathematics</h4>
                            <MathText
                                className="text-gray-400 text-[15px] leading-relaxed block mb-6"
                                text={String.raw`Just like working with vectors, you can scale an entire matrix up or down by multiplying it by a normal number (a scalar). The multiplier simply distributes itself individually across every single component inside the matrix.`}
                            />
                            <div className="bg-black/50 p-6 pt-8 rounded-xl border border-white/5 flex flex-col gap-6 items-center shadow-inner mt-auto">
                                <LatexBlock displayMode={false} expression={`3 \\times \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix} = \\begin{bmatrix} 3 & 6 \\\\ 9 & 12 \\end{bmatrix}`} />
                                <div className="h-px w-full max-w-[200px] bg-white/10" />
                                <LatexBlock displayMode={false} expression={`\\begin{bmatrix} 1 & 1 \\\\ 1 & 1 \\end{bmatrix} + \\begin{bmatrix} 2 & 2 \\\\ 2 & 2 \\end{bmatrix} = \\begin{bmatrix} 3 & 3 \\\\ 3 & 3 \\end{bmatrix}`} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ConceptNugget text="Scalars stretch or shrink the magnitudes within a matrix uniformly, maintaining the exact same proportionality across all grid elements." />

            {/* First Interactive: Matrix Synthesizer */}
            <div className="space-y-10">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-4">Matrix Arithmetic Synthesis</h2>
                    <MathText
                        className="text-gray-400 text-lg leading-relaxed block"
                        text={String.raw`To truly master matrix manipulation, you must become familiar with scaling and combining multiple matrices at once. Use the synthesizer below to manipulate the scalars $c_1$ and $c_2$ to successfully synthesize the target matrix output.`}
                    />
                </div>
                <MatrixArithmeticSynthesizer />
            </div>

            {/* Second Interactive: Vector-Matrix Multiplier */}
            <div className="space-y-10 border-t border-white/10 pt-16">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-4">Matrix-Vector Operations</h2>
                    <MathText
                        className="text-gray-400 text-lg leading-relaxed block"
                        text={String.raw`The single most important computational act in quantum mechanics is multiplying a state vector by an operator matrix. We use the <strong class="text-brand-purple">Row-by-Column</strong> operation (the dot product) to calculate how a matrix modifies a vector to yield an entirely new outcome vector.`}
                    />
                </div>
                <VectorMatrixMultiplier />
            </div>

            <ConceptNugget text="Every time a quantum bit passes through a logic gate, a Matrix-Vector multiplication is happening mathematically behind the scenes." />

            {/* Going Further Section */}
            <div className="bg-gradient-to-br from-brand-purple/15 via-transparent to-brand-cyan/10 border border-white/10 rounded-3xl p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10 space-y-6">
                    <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs text-gray-400 uppercase tracking-wider">
                        Going Further
                    </div>
                    <h2 className="text-3xl font-bold text-white">Multiplying Matrices & Commutativity</h2>

                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
                        <div className="space-y-4 xl:col-span-5">
                            <MathText
                                className="text-gray-300 text-[15px] leading-relaxed block"
                                text={String.raw`To multiply two $2 \times 2$ matrices, you apply the exact same dot-product rule as you do with vectors! You take the rows of the first matrix, and dot-product them against the columns of the second matrix.`}
                            />

                            <div className="bg-black/30 p-6 rounded-2xl border border-white/5 flex flex-col gap-4 shadow-inner">
                                <MathText className="text-brand-cyan font-bold text-sm tracking-wider uppercase mb-2 block text-center" text="Matrix x Matrix" />
                                <div className="flex flex-col items-center gap-2">
                                    <LatexBlock displayMode={false} expression={`\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix} \\begin{bmatrix} e & f \\\\ g & h \\end{bmatrix}`} />
                                    <span className="text-gray-400 font-bold">=</span>
                                    <LatexBlock displayMode={false} expression={`\\begin{bmatrix} ae+bg & af+bh \\\\ ce+dg & cf+dh \\end{bmatrix}`} />
                                </div>
                            </div>

                            <MathText
                                className="text-gray-300 text-[15px] leading-relaxed block"
                                text={String.raw`In standard arithmetic, multiplication is commutative, meaning $3 \times 4 = 12$ and $4 \times 3 = 12$. However, because of the row-by-column cross-mapping seen above, <strong class="text-brand-purple">matrix multiplication is NOT commutative.</strong>`}
                            />
                        </div>

                        <div className="space-y-4 xl:col-span-7">
                            <div className="bg-black/40 border border-brand-cyan/20 rounded-xl p-6 text-sm text-gray-300 shadow-inner">
                                <strong className="text-white block mb-4 text-base flex items-center gap-2 border-b border-brand-cyan/20 pb-3">
                                    <span className="text-brand-cyan">✦</span>
                                    A Concrete Example
                                </strong>
                                <MathText
                                    className="mb-4 text-gray-400 block leading-relaxed"
                                    text={String.raw`Let's take two very simple matrices, $A$ and $B$:`}
                                />
                                <div className="bg-black/50 p-4 rounded-xl border border-white/5 mb-4 text-center">
                                    <LatexBlock displayMode={false} expression={`A = \\begin{bmatrix} 1 & 1 \\\\ 0 & 0 \\end{bmatrix}, \\quad B = \\begin{bmatrix} 1 & 0 \\\\ 1 & 0 \\end{bmatrix}`} />
                                </div>
                                <MathText
                                    className="mb-4 text-gray-400 block leading-relaxed"
                                    text={String.raw`If we calculate $A \times B$ using the row-by-column method:`}
                                />
                                <div className="bg-black/50 p-4 rounded-xl border border-white/5 mb-4 text-center">
                                    <LatexBlock displayMode={false} expression={`\\begin{bmatrix} (1)(1)+(1)(1) & (1)(0)+(1)(0) \\\\ (0)(1)+(0)(1) & (0)(0)+(0)(0) \\end{bmatrix} = \\begin{bmatrix} 2 & 0 \\\\ 0 & 0 \\end{bmatrix}`} />
                                </div>
                                <MathText
                                    className="mb-4 text-gray-400 block leading-relaxed"
                                    text={String.raw`Now, let's reverse the order and calculate $B \times A$:`}
                                />
                                <div className="bg-black/50 p-4 rounded-xl border border-white/5 text-center">
                                    <LatexBlock displayMode={false} expression={`\\begin{bmatrix} (1)(1)+(0)(0) & (1)(1)+(0)(0) \\\\ (1)(1)+(0)(0) & (1)(1)+(0)(0) \\end{bmatrix} = \\begin{bmatrix} 1 & 1 \\\\ 1 & 1 \\end{bmatrix}`} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
