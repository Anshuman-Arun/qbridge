'use client';

import React from 'react';
import { InteractiveVideo, VideoCheckpoint } from '@/components/features/InteractiveVideo';
import { PythonPlayground } from '@/components/features/PythonPlayground';
import { InteractiveGraph } from '@/components/features/InteractiveGraph';
import { ConceptNugget } from '@/components/features/ConceptNugget';
import { LatexBlock } from '@/components/features/LatexBlock';
import { MathText } from '@/components/features/MathText';

export default function PythonModulesLesson() {
    const checkpoints: VideoCheckpoint[] = [
        {
            id: 'py_1',
            timeSeconds: 52,
            questionText: 'What is the "Search Problem" in computer science?',
            options: [
                'Looking for a virus',
                'Finding a specific element in a list',
                'Surfing the web',
                'Discovering new hardware'
            ],
            correctAnswer: 'Finding a specific element in a list'
        },
        {
            id: 'py_2',
            timeSeconds: 165,
            questionText: 'When a computer compares two words under the hood, what logical operation does it primarily run the bits through?',
            options: ['AND gates', 'OR gates', 'NOT gates', 'XOR gates'],
            correctAnswer: 'XOR gates'
        }
    ];

    return (
        <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            {/* Header */}
            <div className="prose prose-invert max-w-none">
                <h1 className="text-4xl font-bold text-white mb-4">Python & Modules: Your Quantum Toolkit</h1>
                <MathText
                    className="text-gray-300 text-lg leading-relaxed block mb-6"
                    text={String.raw`Python is the primary language of quantum computing. Frameworks like <strong>Qiskit</strong>, <strong>Cirq</strong>, and <strong>PennyLane</strong> expose their APIs in Python, and numerical libraries like <strong>NumPy</strong> power the linear algebra underneath. This lesson builds the Python foundation you need.`}
                />
            </div>

            {/* Video — Algorithms video covers programming fundamentals */}
            <div className="space-y-6">
                <InteractiveVideo url="https://www.youtube.com/watch?v=1D8ud4vqjUs" checkpoints={checkpoints} />
            </div>

            {/* Core Language card */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan/5 rounded-full blur-3xl -mr-32 -mt-32" />
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-6">Core Language Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            { title: 'Variables & Types', body: 'Python is dynamically typed. int, float, complex, str, list, dict — all used in quantum programming.' },
                            { title: 'Functions', body: 'def keyword. Functions are first-class — you can pass them as arguments to quantum circuit builders.' },
                            { title: 'Modules', body: 'import numpy as np and import math give you vectorized operations and math constants like π.' },
                            { title: 'List Comprehensions', body: '[x**2 for x in range(10)] — concise loops that appear everywhere in Qiskit circuit definitions.' },
                        ].map(({ title, body }) => (
                            <div key={title} className="bg-black/30 rounded-2xl p-6 border border-white/5">
                                <h4 className="text-brand-cyan font-bold mb-2 text-sm uppercase tracking-wider">{title}</h4>
                                <p className="text-gray-400 text-sm">{body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <ConceptNugget text="Python's NumPy library represents quantum states as complex-valued arrays — the same vectors you learned about in the mathematics module." />

            {/* Playground 1 */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-10 shadow-2xl">
                <div className="space-y-6">
                    <div className="max-w-3xl">
                        <h3 className="text-2xl font-bold text-white mb-4">Python Basics Playground</h3>
                        <MathText
                            className="text-gray-400 text-lg leading-relaxed"
                            text={String.raw`Try defining functions, working with lists, and importing the math module. The starter code below sets up a function — modify it and run it to see the result.`}
                        />
                    </div>
                    <PythonPlayground
                        title="Functions & Modules"
                        instructions="Define a function that computes the magnitude of a 2D vector, then test it."
                        starterCode={`import math

# A vector as a list [x, y]
def magnitude(v):
    return math.sqrt(v[0]**2 + v[1]**2)

# Test it
v1 = [3, 4]
print(f"Vector: {v1}")
print(f"Magnitude: {magnitude(v1)}")

# Try list comprehension: square every component
squared = [x**2 for x in v1]
print(f"Squared components: {squared}")`}
                    />
                </div>
            </div>

            {/* NumPy section */}
            <div className="bg-gradient-to-br from-brand-cyan/20 via-brand-cyan/5 to-transparent border border-white/10 rounded-3xl p-12 shadow-2xl">
                <h2 className="text-3xl font-bold text-white mb-10 text-center tracking-tight">NumPy for Quantum Computing</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div className="space-y-8">
                        <div className="relative">
                            <div className="absolute -left-6 top-0 bottom-0 w-1 bg-brand-cyan rounded-full" />
                            <MathText
                                className="text-gray-300 text-lg block"
                                text={String.raw`NumPy provides arrays that support complex numbers, matrix multiplication, and linear algebra routines — all the operations needed to simulate quantum circuits classically.`}
                            />
                        </div>
                        <div className="bg-black/30 rounded-2xl p-6 border border-white/5 space-y-3 font-mono text-sm">
                            <p className="text-brand-cyan">import numpy as np</p>
                            <p className="text-gray-300">qubit_zero = np.array([1, 0])   <span className="text-gray-500"># |0⟩</span></p>
                            <p className="text-gray-300">qubit_one  = np.array([0, 1])   <span className="text-gray-500"># |1⟩</span></p>
                            <p className="text-brand-purple">H = np.array([[1,1],[1,-1]]) / np.sqrt(2)</p>
                            <p className="text-green-400">result = H @ qubit_zero         <span className="text-gray-500"># apply Hadamard</span></p>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <PythonPlayground
                            title="NumPy Quantum State Simulation"
                            instructions="Run the code to apply the Hadamard gate to |0⟩ and verify the result is a superposition."
                            starterCode={`import math

# Simulate without numpy using lists
def mat_vec(M, v):
    return [sum(M[i][j]*v[j] for j in range(len(v))) for i in range(len(M))]

# Hadamard gate
H = [[1/math.sqrt(2), 1/math.sqrt(2)],
     [1/math.sqrt(2), -1/math.sqrt(2)]]

qubit_zero = [1, 0]  # |0⟩
result = mat_vec(H, qubit_zero)
print(f"H|0⟩ = {[round(x, 4) for x in result]}")

# Both components are 1/√2 ≈ 0.7071 — equal superposition!
print(f"Prob |0⟩: {round(result[0]**2, 4)}")
print(f"Prob |1⟩: {round(result[1]**2, 4)}")`}
                        />
                    </div>
                </div>
            </div>

            <ConceptNugget text="Every Qiskit or Cirq program is just Python code — once you master functions, modules, and NumPy arrays, you have all the tools to write real quantum circuits." />
        </div>
    );
}
