import React from 'react';
import { LatexBlock } from '@/components/features/LatexBlock';
import { InteractiveGraph } from '@/components/features/InteractiveGraph';

export default function BlochSphereLesson() {
    return (
        <div className="space-y-8">
            <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-white">The Bloch Sphere</h2>
                <p>The Bloch sphere is a geometric representation of a single qubit state. Any pure qubit state maps to a point on the surface of this unit sphere.</p>
            </div>
            <LatexBlock displayMode expression="|\\psi\\rangle = \\cos\\frac{\\theta}{2}|0\\rangle + e^{i\\phi}\\sin\\frac{\\theta}{2}|1\\rangle" />
            <div className="bg-brand-purple/5 border-l-4 border-brand-purple pl-6 py-4">
                <h3 className="text-lg font-semibold text-brand-purple mb-2">Poles and Equator</h3>
                <p className="text-gray-300 text-sm">North pole = |0⟩, South pole = |1⟩. Points on the equator are equal superpositions with different phases. Quantum gates rotate the state on the Bloch sphere.</p>
            </div>
            <InteractiveGraph mode="point" title="Bloch Sphere Projection" description="This 2D projection shows θ and φ. Drag the point to explore different qubit states." snap={false} xLabel="φ (phase)" yLabel="θ (mixing)" viewBox={{ xMin: -4, xMax: 4, yMin: -4, yMax: 4 }} />
        </div>
    );
}
