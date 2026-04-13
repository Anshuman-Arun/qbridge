import React from 'react';
import { PythonPlayground } from '@/components/features/PythonPlayground';

export default function PythonModulesLesson() {
    return (
        <div className="space-y-8">
            <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-white">Python & Modules</h2>
                <p>Python is the primary language for quantum computing frameworks like Qiskit, Cirq, and PennyLane. This lesson covers the Python fundamentals you need.</p>
            </div>

            <div className="bg-brand-cyan/5 border border-brand-cyan/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-brand-cyan mb-2">What You&apos;ll Learn</h3>
                <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
                    <li>Variables, data types, and basic operations</li>
                    <li>Functions and returning values</li>
                    <li>Importing and using modules (numpy, math)</li>
                    <li>List comprehensions and lambda functions</li>
                </ul>
            </div>

            <PythonPlayground
                title="Python Basics Playground"
                instructions="Try defining a function that takes a number and returns its square. Then print the result for input 7."
                starterCode={`# Define a function to square a number\ndef square(n):\n    return n ** 2\n\n# Test it\nresult = square(7)\nprint(f"The square of 7 is: {result}")`}
            />
        </div>
    );
}
