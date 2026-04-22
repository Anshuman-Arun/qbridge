import React from 'react';
import { LatexBlock } from '@/components/features/LatexBlock';

export default function ReversibilityLesson() {
    return (
        <div className="space-y-8">
            <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-white">Reversibility in Quantum Computing</h2>
                <p>Every quantum gate must be reversible — you can always undo a computation. This is because quantum gates are unitary matrices: U†U = I.</p>
            </div>
            <LatexBlock displayMode expression="U^\\dagger U = U U^\\dagger = I, \\quad (U^\\dagger)_{ij} = \\overline{U_{ji}}" />
            <div className="bg-brand-cyan/5 border border-brand-cyan/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-brand-cyan mb-2">Why Reversibility?</h3>
                <p className="text-gray-300 text-sm">Quantum mechanics is fundamentally reversible (time-symmetric). Classical gates like AND are irreversible — you lose information. Quantum computing must preserve information, which constrains circuit design but enables new algorithms.</p>
            </div>
            <div className="bg-brand-purple/5 border-l-4 border-brand-purple pl-6 py-4">
                <h3 className="text-lg font-semibold text-brand-purple mb-2">Toffoli Gate</h3>
                <p className="text-gray-300 text-sm">The Toffoli gate is a reversible 3-qubit gate that can simulate any classical logic gate. It&apos;s universal for classical reversible computing.</p>
            </div>
        </div>
    );
}
