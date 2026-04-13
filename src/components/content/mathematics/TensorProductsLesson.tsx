'use client';

import React from 'react';
import { InteractiveVideo, VideoCheckpoint } from '@/components/features/InteractiveVideo';
import { TensorExpansionCalculator } from '@/components/features/TensorExpansionCalculator';
import { KroneckerBlockVisualizer } from '@/components/features/KroneckerBlockVisualizer';
import { ConceptNugget } from '@/components/features/ConceptNugget';

export default function TensorProductsLesson() {
    const checkpoints: VideoCheckpoint[] = [
        {
            id: 'tp_1',
            timeSeconds: 61,
            questionText: 'Which mathematical symbol is most commonly used to represent a tensor product?',
            options: [
                'A dot ($\\cdot$)',
                'A cross ($\\times$)',
                'A circle with an X inside ($\\otimes$)',
                'An asterisk ($\\ast$)'
            ],
            correctAnswer: 'A circle with an X inside ($\\otimes$)'
        },
        {
            id: 'tp_2',
            timeSeconds: 158,
            questionText: 'If Vector $A$ is $M$-dimensional and Vector $B$ is $N$-dimensional, what is the dimension of $A \\otimes B$?',
            options: ['$M+N$', '$M^{N}$', '$M \\times N$', '$2^{M \times N}$'],
            correctAnswer: '$M \\times N$'
        }
    ];

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 text-lg leading-relaxed">
                    This page focuses on tensor products as a way to combine independent systems into one mathematical object. Use the tools below to verify the pattern mechanically.
                </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <h3 className="text-lg font-semibold text-white mb-3">What tensor products do</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-300">
                    <li>If system A has dimension <code>M</code> and system B has dimension <code>N</code>, then <code>A tensor B</code> has dimension <code>M x N</code>.</li>
                    <li>Order matters in general: <code>A tensor B</code> and <code>B tensor A</code> are not the same arrangement.</li>
                    <li>The same construction applies to matrices (Kronecker product).</li>
                </ul>
            </div>

            <InteractiveVideo
                url="https://www.youtube.com/watch?v=Fj2M0y4Oebs"
                checkpoints={checkpoints}
            />

            <div className="prose prose-invert max-w-none">
                <h3 className="text-2xl font-bold text-white mt-12 mb-6">Vector tensor expansion</h3>
                <p className="text-gray-400 mb-8">
                    Multiply each entry of the first vector by the full second vector, then stack the resulting blocks. Try several examples to confirm the output size and order.
                </p>
            </div>

            <TensorExpansionCalculator />

            <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-8 mt-12">
                <h3 className="text-xl font-bold text-white mb-4">Matrix Kronecker product</h3>
                <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                    For matrices, each entry of matrix A scales an entire copy of matrix B. The result is a larger block matrix that preserves this repeated structure.
                </p>
                <KroneckerBlockVisualizer />
            </div>

            <ConceptNugget text="Tensor products are the bookkeeping tool that makes multi-qubit state spaces possible." />
        </div>
    );
}
