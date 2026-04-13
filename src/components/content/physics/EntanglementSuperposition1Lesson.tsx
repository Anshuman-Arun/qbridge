import React from 'react';
import { LatexBlock } from '@/components/features/LatexBlock';

export default function EntanglementSuperposition1Lesson() {
    return (
        <div className="space-y-8">
            <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-white">Entanglement & Superposition I</h2>
                <p>Superposition means a quantum system can exist in multiple states simultaneously. A qubit can be in state |0⟩, |1⟩, or any combination until measured.</p>
            </div>
            <LatexBlock displayMode expression="|\\psi\\rangle = \\alpha|0\\rangle + \\beta|1\\rangle, \\quad |\\alpha|^2 + |\\beta|^2 = 1" />
            <div className="bg-brand-cyan/5 border border-brand-cyan/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-brand-cyan mb-2">Superposition in Detail</h3>
                <p className="text-gray-300 text-sm">α and β are complex probability amplitudes. The probability of measuring |0⟩ is |α|² and |1⟩ is |β|². After measurement, the superposition collapses.</p>
            </div>
            <div className="bg-brand-purple/5 border-l-4 border-brand-purple pl-6 py-4">
                <h3 className="text-lg font-semibold text-brand-purple mb-2">Entanglement Preview</h3>
                <p className="text-gray-300 text-sm">When two qubits are entangled, measuring one instantly determines the state of the other, regardless of distance. Einstein called this &quot;spooky action at a distance.&quot;</p>
            </div>
        </div>
    );
}
