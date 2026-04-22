'use client';

import React, { useState } from 'react';
import { Layers } from 'lucide-react';
import { LatexBlock } from '@/components/features/LatexBlock';
import { MathText } from '@/components/features/MathText';

type Matrix2x2 = [[number, number], [number, number]];

interface Level {
    id: number;
    m1: Matrix2x2;
    m2: Matrix2x2;
    target: Matrix2x2;
    hint: string;
}

const LEVELS: Level[] = [
    {
        id: 1,
        m1: [[1, 0], [0, 1]],
        m2: [[1, 1], [0, 0]],
        target: [[5, 2], [0, 3]],
        hint: "Your goal is to scale the Cyan ($c_1$) and Purple ($c_2$) matrices so they add up to the Target. Try scaling $c_1$ to 3 to hit the bottom-right corner, and then see what $c_2$ should be!"
    },
    {
        id: 2,
        m1: [[2, 1], [-1, 0]],
        m2: [[0, -1], [1, 2]],
        target: [[4, 4], [-4, -4]],
        hint: "Don't forget that scalars can be negative! A negative scalar will flip the signs of every component inside the matrix. Notice the negative values in the target."
    },
    {
        id: 3,
        m1: [[1, 0], [0, 0]],
        m2: [[0, 1], [1, 1]],
        target: [[-1, 2], [2, 2]],
        hint: "Here is your final challenge. First look at the top-left corner, it relies purely on the first matrix. Then solve for the rest!"
    }
];

function matrixToString(m: Matrix2x2): string {
    return `\\begin{bmatrix} ${m[0][0]} & ${m[0][1]} \\\\ ${m[1][0]} & ${m[1][1]} \\end{bmatrix}`;
}

export function MatrixArithmeticSynthesizer() {
    const [levelIdx, setLevelIdx] = useState(0);
    const [c1, setC1] = useState(0);
    const [c2, setC2] = useState(0);
    
    const level = LEVELS[levelIdx];
    const { m1, m2, target } = level;

    // Calculate Result
    const res: Matrix2x2 = [
        [c1 * m1[0][0] + c2 * m2[0][0], c1 * m1[0][1] + c2 * m2[0][1]],
        [c1 * m1[1][0] + c2 * m2[1][0], c1 * m1[1][1] + c2 * m2[1][1]]
    ];

    const isMatch = 
        res[0][0] === target[0][0] && res[0][1] === target[0][1] &&
        res[1][0] === target[1][0] && res[1][1] === target[1][1];

    const nextLevel = () => {
        if (levelIdx < LEVELS.length - 1) {
            setLevelIdx(levelIdx + 1);
            setC1(0);
            setC2(0);
        }
    };

    return (
        <div className="w-full max-w-5xl mx-auto bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute -inset-20 bg-gradient-to-br from-brand-cyan/5 via-transparent to-brand-purple/5 opacity-50 blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col gap-8">
                
                {/* Horizontal Instructions & Controls View */}
                <div className="bg-black/60 p-8 rounded-2xl border border-white/5 backdrop-blur-sm grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-2">
                            <Layers className="text-white w-6 h-6" />
                            <h3 className="text-lg font-bold text-white uppercase tracking-widest">
                                Matrix Synthesizer
                            </h3>
                        </div>

                        <p className="text-gray-300 text-sm leading-relaxed">
                            Matrices scale exactly like vectors do—by multiplying each individual component by the regular scalar number.
                            Here, the slider <strong className="text-brand-cyan">c₁</strong> scales matrix <strong className="text-brand-cyan">A</strong>, and 
                            <strong className="text-brand-purple"> c₂</strong> scales <strong className="text-brand-purple">B</strong>.
                        </p>

                        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                            <MathText className="text-xs text-gray-400 italic block mb-1" text="Mission:" />
                            <MathText className="text-sm font-medium text-white block" text={level.hint} />
                        </div>
                    </div>

                    <div className="bg-black border border-white/10 rounded-2xl p-6 shadow-inner space-y-8">
                        {/* C1 Slider */}
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <MathText className="font-bold text-brand-cyan" text={`Scalar $c_1$`} />
                                <span className="font-mono text-white bg-white/10 px-3 py-1 rounded">{c1.toFixed(1)}</span>
                            </div>
                            <input 
                                type="range" 
                                min="-4" max="4" step="1" 
                                value={c1} 
                                onChange={(e) => setC1(parseFloat(e.target.value))}
                                className="w-full accent-brand-cyan"
                            />
                        </div>

                        {/* C2 Slider */}
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <MathText className="font-bold text-brand-purple" text={`Scalar $c_2$`} />
                                <span className="font-mono text-white bg-white/10 px-3 py-1 rounded">{c2.toFixed(1)}</span>
                            </div>
                            <input 
                                type="range" 
                                min="-4" max="4" step="1" 
                                value={c2} 
                                onChange={(e) => setC2(parseFloat(e.target.value))}
                                className="w-full accent-brand-purple"
                            />
                        </div>

                        <div className={`mt-4 p-4 rounded-xl flex items-center justify-between transition-colors ${isMatch ? 'bg-green-500/20 border border-green-500/30' : 'bg-white/5 border border-white/10'}`}>
                            <div className="flex items-center gap-3">
                                {isMatch ? (
                                    <>
                                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                        <span className="text-sm font-bold text-green-400 tracking-wider">MATCHED</span>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-2 h-2 rounded-full bg-red-400" />
                                        <span className="text-sm font-bold text-red-400 tracking-wider">UNMATCHED</span>
                                    </>
                                )}
                            </div>
                             {isMatch && levelIdx < LEVELS.length - 1 && (
                                <button 
                                    onClick={nextLevel}
                                    className="flex items-center gap-1 text-xs font-bold text-black bg-green-400 px-3 py-1.5 rounded-lg hover:bg-green-300 transition-colors"
                                >
                                    NEXT LEVEL →
                                </button>
                            )}
                            {isMatch && levelIdx === LEVELS.length - 1 && (
                                <span className="text-xs font-bold text-green-400">MODULE COMPLETE</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Arithmetic Visualizer View (Below) */}
                <div className="w-full border border-white/10 rounded-2xl overflow-hidden shadow-inner bg-black/40 p-8">
                    
                    <div className="flex flex-col items-center gap-6">
                        <div className="flex items-center justify-center gap-4 text-gray-400 w-full overflow-x-auto pb-4">
                            
                            {/* Synthesis Equation */}
                            <div className="flex items-center gap-4 text-xl shrink-0">
                                <span className="text-brand-cyan font-bold block">{c1}</span>
                                <LatexBlock displayMode={false} expression={matrixToString(m1)} />
                                
                                <span className="font-bold block mx-2">+</span>
                                
                                <span className="text-brand-purple font-bold block">{c2}</span>
                                <LatexBlock displayMode={false} expression={matrixToString(m2)} />
                                
                                <span className="font-bold block mx-2">=</span>
                                
                                <div className={`transition-all rounded-xl p-2 ${isMatch ? 'bg-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.3)]' : ''}`}>
                                    <LatexBlock displayMode={false} expression={matrixToString(res)} />
                                </div>
                            </div>
                        </div>

                        <div className="h-px w-full max-w-lg bg-white/10" />

                        <div className="flex flex-col items-center">
                            <MathText className="text-xs text-gray-500 uppercase tracking-widest block mb-4 font-bold" text="Target Matrix" />
                            <div className="bg-black px-6 py-4 rounded-xl border border-white/20">
                                <LatexBlock displayMode={false} expression={matrixToString(target)} />
                            </div>
                        </div>
                    </div>

                </div>

                {/* Level Indicators */}
                <div className="flex justify-center gap-3">
                    {LEVELS.map((_, idx) => (
                        <div 
                            key={idx} 
                            className={`w-12 h-1.5 rounded-full transition-all duration-300 ${
                                idx === levelIdx ? 'bg-brand-cyan shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 
                                idx < levelIdx ? 'bg-green-500/50' : 'bg-white/10'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
