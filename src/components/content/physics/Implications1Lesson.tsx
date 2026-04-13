import React from 'react';

export default function Implications1Lesson() {
    return (
        <div className="space-y-8">
            <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-white">Implications of Quantum Mechanics I</h2>
                <p>Quantum mechanics has profound implications beyond physics. The no-cloning theorem, quantum tunneling, and Heisenberg&apos;s uncertainty principle reshape our understanding of information.</p>
            </div>
            <div className="bg-brand-cyan/5 border border-brand-cyan/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-brand-cyan mb-2">No-Cloning Theorem</h3>
                <p className="text-gray-300 text-sm">You cannot perfectly copy an unknown quantum state. This makes quantum information fundamentally different from classical information and enables quantum cryptography.</p>
            </div>
            <div className="bg-brand-purple/5 border-l-4 border-brand-purple pl-6 py-4">
                <h3 className="text-lg font-semibold text-brand-purple mb-2">Uncertainty Principle</h3>
                <p className="text-gray-300 text-sm">You cannot simultaneously know a particle&apos;s exact position and momentum. The more precisely you measure one, the less precisely you can know the other: Δx · Δp ≥ ℏ/2.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Quantum Tunneling</h3>
                <p className="text-gray-300 text-sm">Particles can pass through energy barriers they classically shouldn&apos;t be able to cross. This powers technologies like tunnel diodes and scanning tunneling microscopes.</p>
            </div>
        </div>
    );
}
