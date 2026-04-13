import React from 'react';
import { LatexBlock } from '@/components/features/LatexBlock';

export default function MultiQubit1Lesson() {
    return (
        <div className="space-y-8">
            <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-white">Multi-Qubit Systems I</h2>
                <p>As we add more qubits, the state space grows exponentially. A system of n qubits is described by a vector of size 2^n.</p>
            </div>
            <LatexBlock displayMode expression="|\\psi\\rangle = \\alpha_{00}|00\\rangle + \\alpha_{01}|01\\rangle + \\alpha_{10}|10\\rangle + \\alpha_{11}|11\\rangle" />
            <div className="bg-brand-purple/5 border-l-4 border-brand-purple pl-6 py-4">
                <h3 className="text-lg font-semibold text-brand-purple mb-2">Tensor Products</h3>
                <p className="text-gray-300 text-sm">We combine individual qubit states using the tensor product (⊗). |0⟩ ⊗ |1⟩ = |01⟩. This mathematical structure underpins the exponential scaling of quantum states.</p>
            </div>
        </div>
    );
}
