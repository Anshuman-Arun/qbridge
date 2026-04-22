import React from 'react';
import { LatexBlock } from '@/components/features/LatexBlock';

export default function QuantumGatesLesson() {
    return (
        <div className="space-y-8">
            <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-white">Quantum Gates</h2>
                <p>Quantum gates manipulate qubits, just as classical logic gates manipulate bits. The key difference: quantum gates are always represented by unitary matrices and are reversible.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                    <h4 className="text-brand-cyan font-bold mb-2">Pauli-X (NOT)</h4>
                    <LatexBlock displayMode expression="X = \\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}" />
                    <p className="text-gray-400 text-xs mt-2">Flips |0⟩ ↔ |1⟩</p>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                    <h4 className="text-brand-purple font-bold mb-2">Hadamard</h4>
                    <LatexBlock displayMode expression="H = \\frac{1}{\\sqrt{2}}\\begin{pmatrix} 1 & 1 \\\\ 1 & -1 \\end{pmatrix}" />
                    <p className="text-gray-400 text-xs mt-2">Creates superposition</p>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                    <h4 className="text-green-400 font-bold mb-2">CNOT</h4>
                    <LatexBlock displayMode expression="\\text{CNOT} = \\begin{pmatrix} 1&0&0&0 \\\\ 0&1&0&0 \\\\ 0&0&0&1 \\\\ 0&0&1&0 \\end{pmatrix}" />
                    <p className="text-gray-400 text-xs mt-2">Entangles two qubits</p>
                </div>
            </div>
        </div>
    );
}
