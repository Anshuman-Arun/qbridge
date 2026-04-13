import React from 'react';
import { LatexBlock } from '@/components/features/LatexBlock';
import { InteractiveGraph } from '@/components/features/InteractiveGraph';
import { PythonPlayground } from '@/components/features/PythonPlayground';
import { QuizBlock } from '@/components/features/QuizBlock';

export default function ReferenceLesson() {
    return (
        <div className="space-y-12">
            <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-white">Reference Lesson: Feature Showcase</h2>
                <p>This lesson demonstrates the new interactive capabilities of the platform.</p>
            </div>

            {/* 1. LaTeX */}
            <section className="space-y-4">
                <h3 className="text-xl font-semibold text-brand-cyan">1. Mathematical Typesetting</h3>
                <LatexBlock displayMode expression="i\\hbar\\frac{\\partial}{\\partial t}|\\psi\\rangle = \\hat{H}|\\psi\\rangle" />
            </section>

            {/* 2. Interactive Graphs */}
            <section className="space-y-6">
                <h3 className="text-xl font-semibold text-brand-cyan">2. Interactive Graphs</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InteractiveGraph
                        mode="vector"
                        title="Vector Mode"
                        description="Drag the point to see vector components."
                        snap={1}
                    />
                    <InteractiveGraph
                        mode="function"
                        title="Function Mode"
                        description="Visualizing sin(x) and cos(x)."
                        functions={["Math.sin(x)", "Math.cos(x)"]}
                    />
                </div>
            </section>

            {/* 3. Python Playground */}
            <section className="space-y-4">
                <h3 className="text-xl font-semibold text-brand-cyan">3. Python Execution</h3>
                <PythonPlayground
                    title="Quantum Circuit Simulation"
                    instructions="Run the code to simulate a Bell state creation."
                    starterCode={`# Simulating a Bell State
# |00> -> H -> CNOT -> |Φ+>

def create_bell_state():
    # Initial state |00>
    psi = [1, 0, 0, 0]

    # Apply Hadamard to qubit 0
    # H = [[1, 1], [1, -1]] / sqrt(2)
    # Result: (|00> + |10>) / sqrt(2)
    psi = [0.707, 0, 0.707, 0]

    # Apply CNOT (control 0, target 1)
    # Flips target if control is 1
    # Result: (|00> + |11>) / sqrt(2)
    psi = [0.707, 0, 0, 0.707]

    return psi

print("Final State Vector:", create_bell_state())`}
                />
            </section>

            {/* 4. Quiz Block */}
            <section className="space-y-4">
                <h3 className="text-xl font-semibold text-brand-cyan">4. Embedded Quiz</h3>
                <QuizBlock
                    moduleId="demo-module"
                    questions={[
                        {
                            id: 'q1',
                            type: 'multiple_choice',
                            questionText: 'What is the result of applying a Hadamard gate to |0⟩?',
                            options: ['|1⟩', '|+⟩', '|-⟩', '|0⟩'],
                            correctAnswer: '|+⟩',
                            points: 10,
                            tags: ['quantum-gates']
                        },
                        {
                            id: 'q2',
                            type: 'short_answer',
                            questionText: 'Which gate is its own inverse?',
                            correctAnswer: 'Hadamard', // Simple match for demo
                            points: 10,
                            tags: ['quantum-gates']
                        }
                    ]}
                />
            </section>
        </div>
    );
}
