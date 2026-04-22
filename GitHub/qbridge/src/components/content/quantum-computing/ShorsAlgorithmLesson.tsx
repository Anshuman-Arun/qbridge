import React from 'react';
import { PythonPlayground } from '@/components/features/PythonPlayground';
import { LatexBlock } from '@/components/features/LatexBlock';

export default function ShorsAlgorithmLesson() {
    return (
        <div className="space-y-8">
            <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-white">Shor&apos;s Algorithm</h2>
                <p>Shor&apos;s algorithm is famous for being able to factor large integers exponentially faster than the best known classical algorithms. This poses a threat to RSA encryption.</p>
            </div>

            <div className="bg-brand-purple/5 border-l-4 border-brand-purple pl-6 py-4">
                <h3 className="text-lg font-semibold text-brand-purple mb-2">Period Finding</h3>
                <p className="text-gray-300 text-sm">The core of Shor&apos;s algorithm is finding the period of a function f(x) = a^x mod N. Quantum computers can do this efficiently using the Quantum Fourier Transform (QFT).</p>
            </div>

            <PythonPlayground
                title="Classical Period Finding"
                instructions="Run the code to find the period of f(x) = 7^x mod 15. Notice the repeating pattern."
                starterCode={`# f(x) = a^x mod N
a = 7
N = 15

print(f"Powers of {a} mod {N}:")
for x in range(10):
    val = (a ** x) % N
    print(f"7^{x} mod 15 = {val}")

# Look at the output: 1, 7, 4, 13, 1, ...
# The period r is 4 because 7^4 = 1 mod 15.`}
            />

            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">RSA Encryption</h3>
                <p className="text-gray-300 text-sm">RSA relies on the fact that multiplying two primes is easy, but factoring the product is hard. Shor&apos;s algorithm breaks this asymmetry.</p>
            </div>
        </div>
    );
}
