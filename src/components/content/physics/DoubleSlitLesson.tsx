import React from 'react';
import { LatexBlock } from '@/components/features/LatexBlock';

export default function DoubleSlitLesson() {
    return (
        <div className="space-y-8">
            <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-white">The Double-Slit Experiment</h2>
                <p>The double-slit experiment is the most famous demonstration of quantum behavior. When particles pass through two slits, they create an interference pattern — as if each particle went through both slits simultaneously.</p>
            </div>
            <LatexBlock displayMode expression="I(\\theta) = I_0 \\cos^2\\left(\\frac{\\pi d \\sin\\theta}{\\lambda}\\right)" />
            <div className="bg-brand-purple/5 border-l-4 border-brand-purple pl-6 py-4">
                <h3 className="text-lg font-semibold text-brand-purple mb-2">The Observer Effect</h3>
                <p className="text-gray-300 text-sm">When you try to detect which slit the particle goes through, the interference pattern disappears. Measurement collapses the quantum state — this is the foundation of quantum measurement theory.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Key Takeaways</h3>
                <ul className="text-gray-300 text-sm space-y-2 list-disc list-inside">
                    <li>Particles exhibit wave-like interference when unobserved</li>
                    <li>Measurement forces a definite outcome</li>
                    <li>Superposition = being in multiple states at once</li>
                    <li>This behavior is harnessed by quantum computers</li>
                </ul>
            </div>
        </div>
    );
}
