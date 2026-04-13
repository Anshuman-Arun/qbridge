import React from 'react';
import { PythonPlayground } from '@/components/features/PythonPlayground';

export default function GroversAlgorithmLesson() {
    return (
        <div className="space-y-8">
            <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-white">Grover&apos;s Algorithm</h2>
                <p>Grover&apos;s algorithm provides a quadratic speedup for searching unsorted databases. If you have N items, classical search takes O(N), but Grover&apos;s takes O(√N).</p>
            </div>

            <div className="bg-brand-cyan/5 border border-brand-cyan/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-brand-cyan mb-2">Amplitude Amplification</h3>
                <p className="text-gray-300 text-sm">Grover&apos;s algorithm works by increasing the probability amplitude of the correct answer (the target state) while decreasing others. It rotates the state vector towards the target.</p>
            </div>

            <PythonPlayground
                title="Search Complexity"
                instructions="Visualize the difference between N and √N steps."
                starterCode={`import math

print(f"{'N Items':>10} | {'Classical (N)':>15} | {'Quantum (√N)':>15}")
print("-" * 46)

for i in range(1, 7):
    N = 10 ** i
    sqrt_N = round(math.sqrt(N))
    print(f"{N:>10} | {N:>15} | {sqrt_N:>15}")

# Notice how for 1 million items, quantum search only takes 1000 steps!`}
            />
        </div>
    );
}
