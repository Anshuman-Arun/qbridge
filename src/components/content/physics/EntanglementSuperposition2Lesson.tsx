import React from 'react';
import { LatexBlock } from '@/components/features/LatexBlock';

export default function EntanglementSuperposition2Lesson() {
    return (
        <div className="space-y-8">
            <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-white">Entanglement & Superposition II</h2>
                <p>Building on Part I, we now explore multi-qubit entanglement using Bell states — the simplest entangled states that form the basis of quantum teleportation and superdense coding.</p>
            </div>
            <LatexBlock displayMode expression="|\\Phi^+\\rangle = \\frac{1}{\\sqrt{2}}(|00\\rangle + |11\\rangle)" />
            <LatexBlock displayMode expression="|\\Phi^-\\rangle = \\frac{1}{\\sqrt{2}}(|00\\rangle - |11\\rangle)" />
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Bell States</h3>
                <p className="text-gray-300 text-sm mb-3">The four Bell states are maximally entangled two-qubit states. If you measure one qubit, you instantly know the other.</p>
                <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
                    <li>|Φ⁺⟩: Both qubits always agree (00 or 11)</li>
                    <li>|Φ⁻⟩: Both qubits agree but with a phase difference</li>
                    <li>|Ψ⁺⟩: Qubits always disagree (01 or 10)</li>
                    <li>|Ψ⁻⟩: Qubits disagree with a phase difference</li>
                </ul>
            </div>
        </div>
    );
}
