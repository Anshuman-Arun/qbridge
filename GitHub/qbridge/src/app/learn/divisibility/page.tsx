"use client";

import { useState } from "react";
import { ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function DivisibilityPage() {
    const [testNumber, setTestNumber] = useState("");
    const [divisor, setDivisor] = useState("3");
    const [result, setResult] = useState<string | null>(null);

    const checkDivisibility = () => {
        const num = parseInt(testNumber);
        const div = parseInt(divisor);

        if (isNaN(num)) {
            setResult("Please enter a valid number");
            return;
        }

        if (num % div === 0) {
            setResult(`${num} is divisible by ${div}!`);
        } else {
            setResult(`${num} is NOT divisible by ${div}. Remainder: ${num % div}`);
        }
    };

    return (
        <div className="min-h-screen py-24 px-6">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                    <Link href="/learn" className="inline-flex items-center text-gray-400 hover:text-brand-cyan transition-colors mb-4">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Learning Path
                    </Link>
                    <h1 className="text-4xl font-bold text-white mb-4">Divisibility</h1>
                    <div className="flex items-center gap-2 text-brand-purple bg-brand-purple/10 w-fit px-3 py-1 rounded-full text-sm border border-brand-purple/20">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Math Foundation Module 1</span>
                    </div>
                </div>

                <div className="space-y-12">
                    {/* Concept Section */}
                    <section className="glass-card p-8 rounded-2xl border border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-4">The Core Concept</h2>
                        <p className="text-gray-300 leading-relaxed mb-6">
                            In quantum computing algorithms like Shor's Algorithm, understanding the properties of numbers is crucial.
                            **Divisibility** implies that when an integer $a$ is divided by an integer $b$, the result is a whole number with no remainder.
                        </p>
                        <div className="bg-black/40 p-6 rounded-xl border border-white/5 font-mono text-gray-300">
                            a % b == 0
                        </div>
                    </section>

                    {/* Interactive Section */}
                    <section className="glass-card p-8 rounded-2xl border border-white/10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-brand-cyan/20 flex items-center justify-center text-brand-cyan">
                                <AlertCircle className="w-5 h-5" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">Interactive Check</h2>
                        </div>

                        <div className="flex flex-col md:flex-row gap-6 items-end">
                            <div className="w-full">
                                <label className="block text-gray-400 text-sm mb-2">Test Number</label>
                                <input
                                    type="number"
                                    value={testNumber}
                                    onChange={(e) => setTestNumber(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-brand-cyan focus:outline-none transition-colors"
                                    placeholder="e.g 12345"
                                />
                            </div>

                            <div className="w-full md:w-48">
                                <label className="block text-gray-400 text-sm mb-2">Divisor</label>
                                <select
                                    value={divisor}
                                    onChange={(e) => setDivisor(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-brand-cyan focus:outline-none transition-colors"
                                >
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="5">5</option>
                                    <option value="9">9</option>
                                </select>
                            </div>

                            <button
                                onClick={checkDivisibility}
                                className="w-full md:w-auto px-6 py-3 bg-brand-cyan text-black font-bold rounded-lg hover:bg-cyan-400 transition-colors"
                            >
                                Check
                            </button>
                        </div>

                        {result && (
                            <div className={`mt-6 p-4 rounded-lg border ${result.includes('NOT') ? 'bg-red-500/10 border-red-500/20 text-red-200' : 'bg-green-500/10 border-green-500/20 text-green-200'}`}>
                                {result}
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
}
