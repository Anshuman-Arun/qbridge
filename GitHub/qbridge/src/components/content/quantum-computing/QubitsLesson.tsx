import React from 'react';
import { LatexBlock } from '@/components/features/LatexBlock';
import { InteractiveGraph } from '@/components/features/InteractiveGraph';

export default function QubitsLesson() {
    return (
        <div className="space-y-8">
            <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-white">Qubits: The Quantum Bit</h2>
                <p>A qubit is the fundamental unit of quantum information. Unlike classical bits (0 or 1), a qubit can exist in a superposition of both states simultaneously.</p>
            </div>
            <LatexBlock displayMode expression="|\\psi\\rangle = \\alpha|0\\rangle + \\beta|1\\rangle = \\begin{pmatrix} \\alpha \\\\ \\beta \\end{pmatrix}" />
            <div className="bg-brand-cyan/5 border border-brand-cyan/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-brand-cyan mb-2">Understanding the Math</h3>
                <p className="text-gray-300 text-sm">|0⟩ = (1, 0)ᵀ and |1⟩ = (0, 1)ᵀ are the basis vectors. α and β are complex amplitudes satisfying |α|² + |β|² = 1. This is just a unit vector in 2D complex space!</p>
            </div>
            <InteractiveGraph mode="vector" title="Qubit State Vector" description="The qubit state is a 2D vector. Drag to explore different states." snap={1} />
        </div>
    );
}
