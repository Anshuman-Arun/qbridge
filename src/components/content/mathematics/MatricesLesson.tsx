'use client';

import React from 'react';
import { InteractiveVideo, VideoCheckpoint } from '@/components/features/InteractiveVideo';
import { MatrixCalculator } from '@/components/features/MatrixCalculator';
import { VectorMatrixMultiplier } from '@/components/features/VectorMatrixMultiplier';
import { ConceptNugget } from '@/components/features/ConceptNugget';

export default function MatricesLesson() {
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
            questionText: 'Which mathematical process is used to multiply a $2 \\times 2$ matrix by a $2$-dimensional vector?',
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
            questionText: 'What is the sum of $\\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix} + \\begin{bmatrix} 2 & 2 \\\\ 2 & 2 \\end{bmatrix}$?',
            options: [
                '$\\begin{bmatrix} 3 & 2 \\\\ 2 & 3 \\end{bmatrix}$',
                '$\\begin{bmatrix} 1 & 2 \\\\ 2 & 1 \\end{bmatrix}$',
                '$\\begin{bmatrix} 3 & 3 \\\\ 3 & 3 \\end{bmatrix}$',
                '$\\begin{bmatrix} 0 & 0 \\\\ 0 & 0 \\end{bmatrix}$'
            ],
            correctAnswer: '$\\begin{bmatrix} 3 & 2 \\\\ 2 & 3 \\end{bmatrix}$'
        }
    ];

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 text-lg leading-relaxed">
                    This page is a practical companion to the matrices lesson. Use it to review notation, run arithmetic checks, and see how matrix-vector multiplication creates new vectors.
                </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <h3 className="text-lg font-semibold text-white mb-3">What to remember</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-300">
                    <li>A matrix is a rectangular grid of numbers, identified by rows x columns.</li>
                    <li>Addition/subtraction require matching dimensions.</li>
                    <li>Scalar multiplication multiplies every entry.</li>
                    <li>Matrix-vector multiplication uses row-by-column dot products.</li>
                </ul>
            </div>

            <InteractiveVideo
                url="https://www.youtube.com/watch?v=F3_ludQhN0M"
                checkpoints={checkpoints}
            />

            <div className="prose prose-invert max-w-none">
                <h3 className="text-2xl font-bold text-white mt-12 mb-6">Arithmetic sandbox</h3>
                <p className="text-gray-400 mb-8">
                    Test addition, subtraction, and scalar multiplication. Use mismatched dimensions once to verify why matrix addition can fail.
                </p>
            </div>

            <MatrixCalculator />

            <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-8 mt-12">
                <h3 className="text-xl font-bold text-white mb-4">Matrix-vector multiplication</h3>
                <p className="text-gray-400 mb-6 text-sm">
                    Apply row-by-column multiplication and track how each output component is formed. This is the bridge to geometric transformations in the next lesson.
                </p>
                <VectorMatrixMultiplier />
            </div>

            <ConceptNugget text="In linear algebra, matrices are not just tables; they encode operations that transform vectors." />
        </div>
    );
}
