import React from 'react';

export default function Implications2Lesson() {
    return (
        <div className="space-y-8">
            <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-white">Implications of Quantum Mechanics II</h2>
                <p>In this lesson we explore how quantum mechanics enables real-world technologies: quantum cryptography, quantum sensing, and the quest for quantum advantage.</p>
            </div>
            <div className="bg-brand-cyan/5 border border-brand-cyan/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-brand-cyan mb-2">Quantum Key Distribution (QKD)</h3>
                <p className="text-gray-300 text-sm">BB84 protocol uses quantum states to distribute encryption keys. Any eavesdropper disturbs the quantum states, alerting the communicating parties. Provably secure communication.</p>
            </div>
            <div className="bg-brand-purple/5 border-l-4 border-brand-purple pl-6 py-4">
                <h3 className="text-lg font-semibold text-brand-purple mb-2">Quantum Advantage</h3>
                <p className="text-gray-300 text-sm">Quantum advantage is when a quantum computer solves a problem faster than any classical computer. Google&apos;s Sycamore demonstrated quantum supremacy in 2019 on a specific sampling task.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Real-World Applications</h3>
                <ul className="text-gray-300 text-sm space-y-2 list-disc list-inside">
                    <li>Drug discovery: simulating molecular interactions</li>
                    <li>Optimization: logistics, finance, scheduling</li>
                    <li>Machine learning: quantum kernel methods</li>
                    <li>Cryptography: both breaking and building secure systems</li>
                </ul>
            </div>
        </div>
    );
}
