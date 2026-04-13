'use client';

import React, { useState } from 'react';
import { ArrowRight, Cpu } from 'lucide-react';

type LogicGate = 'AND' | 'OR' | 'XOR' | 'NAND' | 'NOT';

export function LogicCircuit() {
    const [inputA, setInputA] = useState<0 | 1>(0);
    const [inputB, setInputB] = useState<0 | 1>(0);
    const [gate, setGate] = useState<LogicGate>('AND');

    const computeOutput = (): 0 | 1 => {
        if (gate === 'AND') return (inputA === 1 && inputB === 1) ? 1 : 0;
        if (gate === 'OR') return (inputA === 1 || inputB === 1) ? 1 : 0;
        if (gate === 'XOR') return (inputA !== inputB) ? 1 : 0;
        if (gate === 'NAND') return !(inputA === 1 && inputB === 1) ? 1 : 0;
        if (gate === 'NOT') return inputA === 1 ? 0 : 1; // NOT only uses A
        return 0;
    };

    const output = computeOutput();

    return (
        <div className="w-full max-w-3xl mx-auto bg-black/60 border border-white/10 rounded-2xl p-8 backdrop-blur-sm shadow-xl font-mono">
            <div className="flex items-center gap-3 mb-8">
                <Cpu className="text-brand-cyan w-6 h-6" />
                <h3 className="text-xl font-bold text-white uppercase tracking-wider">Logic Circuit Simulator</h3>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-12">
                {/* Inputs */}
                <div className="flex flex-col gap-6">
                    <button 
                        onClick={() => setInputA(inputA === 0 ? 1 : 0)}
                        className={`w-20 h-20 rounded-xl flex items-center justify-center text-3xl font-bold border-2 transition-all ${inputA === 1 ? 'border-brand-cyan bg-brand-cyan/20 text-brand-cyan shadow-[0_0_15px_rgba(6,182,212,0.5)]' : 'border-gray-700 bg-gray-900 text-gray-500'}`}
                    >
                        {inputA}
                    </button>
                    {gate !== 'NOT' && (
                        <button 
                            onClick={() => setInputB(inputB === 0 ? 1 : 0)}
                            className={`w-20 h-20 rounded-xl flex items-center justify-center text-3xl font-bold border-2 transition-all ${inputB === 1 ? 'border-brand-purple bg-brand-purple/20 text-brand-purple shadow-[0_0_15px_rgba(168,85,247,0.5)]' : 'border-gray-700 bg-gray-900 text-gray-500'}`}
                        >
                            {inputB}
                        </button>
                    )}
                </div>

                <ArrowRight className="w-8 h-8 text-gray-600 hidden md:block animate-pulse" />

                {/* Gate Selector */}
                <div className="flex flex-col bg-gray-900 border border-gray-700 rounded-xl overflow-hidden p-2">
                    <div className="text-xs text-gray-500 text-center mb-2 uppercase tracking-widest">Select Logic Gate</div>
                    <div className="grid grid-cols-2 gap-2">
                        {(['AND', 'OR', 'XOR', 'NAND', 'NOT'] as LogicGate[]).map(g => (
                            <button
                                key={g}
                                onClick={() => setGate(g)}
                                className={`px-4 py-3 rounded-lg text-sm font-bold transition-colors ${gate === g ? 'bg-white text-black' : 'bg-black/50 text-gray-400 hover:bg-white/10'}`}
                            >
                                {g}
                            </button>
                        ))}
                    </div>
                </div>

                <ArrowRight className="w-8 h-8 text-gray-600 hidden md:block animate-pulse" />

                {/* Output LED */}
                <div className="flex flex-col items-center gap-4">
                    <div className="text-xs text-gray-500 uppercase tracking-widest">Logic Output</div>
                    <div className={`w-32 h-32 rounded-full flex items-center justify-center text-5xl font-black transition-all duration-300 ${output === 1 ? 'bg-green-500 shadow-[0_0_40px_rgba(34,197,94,0.6)] text-white' : 'bg-gray-900 border-4 border-gray-800 text-gray-700'}`}>
                        {output}
                    </div>
                </div>
            </div>
            
            <div className="mt-12 text-center text-sm text-gray-400 bg-white/5 py-3 rounded-lg border border-white/5">
                Current Equation: <span className="font-bold text-white ml-2">{gate === 'NOT' ? `NOT(${inputA})` : `${inputA} ${gate} ${inputB}`} = {output}</span>
            </div>
        </div>
    );
}
