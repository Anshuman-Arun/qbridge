'use client';

import React from 'react';
import { InteractiveVideo, VideoCheckpoint } from '@/components/features/InteractiveVideo';
import { TensorExpansionCalculator } from '@/components/features/TensorExpansionCalculator';
import { KroneckerBlockVisualizer } from '@/components/features/KroneckerBlockVisualizer';
import { ConceptNugget } from '@/components/features/ConceptNugget';
import { LatexBlock } from '@/components/features/LatexBlock';
import { MathText } from '@/components/features/MathText';

export default function TensorProductsLesson() {
    const checkpoints: VideoCheckpoint[] = [
        {
            id: 'tp_1',
            timeSeconds: 61,
            questionText: 'Which mathematical symbol is most commonly used to represent a tensor product?',
            options: [
                String.raw`A dot ($\cdot$)`,
                String.raw`A cross ($\times$)`,
                String.raw`A circle with an X inside ($\otimes$)`,
                String.raw`An asterisk ($\ast$)`
            ],
            correctAnswer: String.raw`A circle with an X inside ($\otimes$)`
        },
        {
            id: 'tp_2',
            timeSeconds: 158,
            questionText: String.raw`If Vector $A$ is $M$-dimensional and Vector $B$ is $N$-dimensional, what is the dimension of $A \otimes B$?`,
            options: [String.raw`$M+N$`, String.raw`$M^{N}$`, String.raw`$M \times N$`, String.raw`$2^{M \times N}$`],
            correctAnswer: String.raw`$M \times N$`
        }
    ];

    return (
        <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            {/* Header */}
            <div className="prose prose-invert max-w-none">
                <h1 className="text-4xl font-bold text-white mb-4">Tensor Products: Combining Systems</h1>
                <MathText
                    className="text-gray-300 text-lg leading-relaxed block mb-6"
                    text={String.raw`When two independent systems interact in quantum mechanics, their combined state space is not a simple sum — it is a <strong>tensor product</strong>, denoted $\otimes$. This operation is responsible for the exponential growth of quantum state spaces, making multi-qubit systems extraordinarily powerful.`}
                />
            </div>

            {/* Video */}
            <div className="space-y-6">
                <InteractiveVideo url="https://www.youtube.com/watch?v=UgAhUtHPa9c" checkpoints={checkpoints} />
            </div>

            {/* What it does card */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-purple/5 rounded-full blur-3xl -mr-32 -mt-32" />
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-6">What Tensor Products Do</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-5">
                            {[
                                { label: 'Dimension rule', text: String.raw`If system A is $M$-dimensional and B is $N$-dimensional, $A \otimes B$ is $M \times N$-dimensional.` },
                                { label: 'Order matters', text: String.raw`$A \otimes B \neq B \otimes A$ in general — the arrangement changes.` },
                                { label: 'Matrices too', text: 'The same rule applies to matrices: the Kronecker product.' },
                            ].map(({ label, text }) => (
                                <div key={label} className="flex items-start gap-4">
                                    <div className="h-2 w-2 rounded-full bg-brand-purple mt-2 shrink-0" />
                                    <MathText className="text-gray-400 text-sm" text={`<strong>${label}:</strong> ${text}`} />
                                </div>
                            ))}
                        </div>
                        <div className="bg-black/30 p-8 rounded-2xl border border-white/5 backdrop-blur-sm">
                            <LatexBlock
                                displayMode
                                expression="\begin{bmatrix} a \\ b \end{bmatrix} \otimes \begin{bmatrix} c \\ d \end{bmatrix} = \begin{bmatrix} ac \\ ad \\ bc \\ bd \end{bmatrix}"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <ConceptNugget text="Tensor products are the bookkeeping tool that makes multi-qubit state spaces possible — 10 qubits gives a 1024-dimensional state space via repeated tensor products." />

            {/* Expansion calculator */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-10 shadow-2xl">
                <div className="space-y-8">
                    <div className="max-w-3xl">
                        <h3 className="text-2xl font-bold text-white mb-4">Vector Tensor Expansion</h3>
                        <MathText
                            className="text-gray-400 text-lg leading-relaxed"
                            text={String.raw`Multiply each entry of the first vector by the full second vector, then stack the resulting blocks. Try several examples to confirm the output size and order.`}
                        />
                    </div>
                    <TensorExpansionCalculator />
                </div>
            </div>

            {/* Kronecker product */}
            <div className="bg-gradient-to-br from-brand-purple/20 via-brand-purple/5 to-transparent border border-white/10 rounded-3xl p-12 shadow-2xl">
                <h2 className="text-3xl font-bold text-white mb-10 text-center tracking-tight">Matrix Kronecker Product</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div className="space-y-8">
                        <div className="relative">
                            <div className="absolute -left-6 top-0 bottom-0 w-1 bg-brand-purple rounded-full" />
                            <MathText
                                className="text-gray-300 text-lg block"
                                text={String.raw`For matrices, each entry of matrix $A$ scales an entire copy of matrix $B$. The result is a larger <strong>block matrix</strong> that preserves this repeated structure — exactly how multi-qubit gates are constructed from single-qubit ones.`}
                            />
                        </div>
                        <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                            <LatexBlock
                                displayMode
                                expression="A \otimes B = \begin{bmatrix} a_{11}B & a_{12}B \\ a_{21}B & a_{22}B \end{bmatrix}"
                            />
                        </div>
                    </div>
                    <div>
                        <KroneckerBlockVisualizer />
                    </div>
                </div>
            </div>

            <ConceptNugget text="Every multi-qubit quantum circuit is built from tensor products of single-qubit gates — the same operation you just computed manually." />
        </div>
    );
}
