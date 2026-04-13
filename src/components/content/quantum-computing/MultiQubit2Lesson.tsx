import React from 'react';
import { LatexBlock } from '@/components/features/LatexBlock';

export default function MultiQubit2Lesson() {
    return (
        <div className="space-y-8">
            <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-white">Multi-Qubit Systems II</h2>
                <p>Advanced operations on multi-qubit systems involve controlled gates and entanglement swapping. This is where the true power of quantum circuits emerges.</p>
            </div>
            <div className="bg-brand-cyan/5 border border-brand-cyan/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-brand-cyan mb-2">Controlled-U Gates</h3>
                <p className="text-gray-300 text-sm">A controlled-U gate applies the operation U to the target qubit ONLY if the control qubit is |1⟩. CNOT is just a specific case where U = X.</p>
            </div>
            <LatexBlock displayMode expression="CU = |0\\rangle\\langle 0| \\otimes I + |1\\rangle\\langle 1| \\otimes U" />
        </div>
    );
}
