'use client';

import React, { useState } from 'react';
import { Columns } from 'lucide-react';
import { LatexBlock } from '@/components/features/LatexBlock';
import { MathText } from '@/components/features/MathText';

type Vector2 = [number, number];
type Matrix2x2 = [[number, number], [number, number]];

interface Level {
    id: number;
    matrix: Matrix2x2;
    vector: Vector2;
    hint: string;
}

const LEVELS: Level[] = [
    {
        id: 1,
        matrix: [[2, 1], [0, 3]],
        vector: [4, 2],
        hint: "Fill in the exact numbers to trace the dot product. Take the top row of the matrix and match it with the column of the vector!"
    },
    {
        id: 2,
        matrix: [[-1, 4], [2, -2]],
        vector: [3, 1],
        hint: "Negative numbers are included here. Notice how the top and bottom of the vector apply down the columns sequentially."
    },
    {
        id: 3,
        matrix: [[0, 1], [1, 0]],
        vector: [5, 9],
        hint: "This is a swap gate (or Pauli-X gate in quantum mechanics). See how evaluating the row-by-column multiplication physically flips the vector components."
    }
];

export function VectorMatrixMultiplier() {
    const [levelIdx, setLevelIdx] = useState(0);
    const level = LEVELS[levelIdx];
    
    // Matrix and Vector
    const [[m00, m01], [m10, m11]] = level.matrix;
    const [vx, vy] = level.vector;

    // Correct results
    const r0 = m00 * vx + m01 * vy;
    const r1 = m10 * vx + m11 * vy;

    // User inputs for Row 1: (a * b) + (c * d)
    const [r1a, setR1a] = useState<string>("");
    const [r1b, setR1b] = useState<string>("");
    const [r1c, setR1c] = useState<string>("");
    const [r1d, setR1d] = useState<string>("");

    // User inputs for Row 2: (a * b) + (c * d)
    const [r2a, setR2a] = useState<string>("");
    const [r2b, setR2b] = useState<string>("");
    const [r2c, setR2c] = useState<string>("");
    const [r2d, setR2d] = useState<string>("");

    // Validation (allow a*b or b*a)
    const checkRow = (a: string, b: string, c: string, d: string, trueA: number, trueB: number, trueC: number, trueD: number) => {
        const valA = parseInt(a);
        const valB = parseInt(b);
        const valC = parseInt(c);
        const valD = parseInt(d);

        const firstPairValid = (valA === trueA && valB === trueB) || (valA === trueB && valB === trueA);
        const secondPairValid = (valC === trueC && valD === trueD) || (valC === trueD && valD === trueC);

        return firstPairValid && secondPairValid;
    };

    const isRow1Match = checkRow(r1a, r1b, r1c, r1d, m00, vx, m01, vy);
    const isRow2Match = checkRow(r2a, r2b, r2c, r2d, m10, vx, m11, vy);

    const isMatch = isRow1Match && isRow2Match;

    const nextLevel = () => {
        if (levelIdx < LEVELS.length - 1) {
            setLevelIdx(levelIdx + 1);
            setR1a(""); setR1b(""); setR1c(""); setR1d("");
            setR2a(""); setR2b(""); setR2c(""); setR2d("");
        }
    };

    const BlankInput = ({ value, setter, colorClass, valid }: { value: string, setter: (val: string) => void, colorClass: string, valid: boolean }) => (
        <input 
            type="number" 
            value={value}
            onChange={(e) => setter(e.target.value)}
            disabled={valid}
            className={`w-12 h-12 md:w-14 md:h-14 bg-black/60 border-2 rounded-lg outline-none text-center text-lg md:text-xl font-bold font-mono transition-all
                ${valid ? 'border-green-500/50 text-green-400 bg-green-500/10' : `border-white/20 focus:border-white/60 ${colorClass}`}`}
        />
    );

    return (
        <div className="w-full max-w-5xl mx-auto bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden group">
            <div className="absolute -inset-20 bg-gradient-to-tr from-brand-purple/5 via-transparent to-brand-cyan/5 opacity-50 blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col gap-10">
                
                {/* Header & Instructions */}
                <div className="bg-black/60 p-8 rounded-2xl border border-white/5 backdrop-blur-sm grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-2">
                            <Columns className="text-white w-6 h-6" />
                            <h3 className="text-lg font-bold text-white uppercase tracking-widest">
                                The Dot Product Engine
                            </h3>
                        </div>

                        <MathText 
                            className="text-gray-300 text-sm leading-relaxed block"
                            text={String.raw`Let's physically trace the arithmetic. To calculate the new top component, take the <strong>Top Row</strong> of the matrix and pair it against the Vector's column. Multiply the first terms, multiply the second terms, and add them together!`}
                        />

                        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                            <MathText className="text-xs text-brand-purple italic block mb-1 font-bold" text="Mission:" />
                            <MathText className="text-sm font-medium text-white block" text={level.hint} />
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-6 p-6">
                        {/* Display The Matrix x Vector */}
                        <div className="flex items-center gap-4 text-2xl md:text-3xl font-mono text-white tracking-widest bg-black/40 px-8 py-6 rounded-2xl border border-white/10">
                            <LatexBlock displayMode={false} expression={`\\begin{bmatrix} ${m00} & ${m01} \\\\ ${m10} & ${m11} \\end{bmatrix} \\begin{bmatrix} ${vx} \\\\ ${vy} \\end{bmatrix}`} />
                        </div>
                        
                        {isMatch && levelIdx < LEVELS.length - 1 && (
                            <button 
                                onClick={nextLevel}
                                className="w-full flex items-center justify-center gap-2 text-sm font-bold text-black bg-brand-cyan px-4 py-3 rounded-xl hover:bg-cyan-300 transition-colors shadow-[0_0_20px_rgba(6,182,212,0.3)] animate-pulse"
                            >
                                MISSION CLEARED! LOAD NEXT →
                            </button>
                        )}
                        {isMatch && levelIdx === LEVELS.length - 1 && (
                            <div className="w-full text-center text-sm font-bold text-green-400 bg-green-500/10 py-3 rounded-xl border border-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.2)]">
                                MODULE COMPLETE
                            </div>
                        )}
                    </div>
                </div>

                {/* Mathematical Engine View */}
                <div className="w-full border border-white/10 rounded-2xl shadow-inner bg-black/40 overflow-hidden">
                    <div className="flex flex-col divide-y divide-white/10">
                        
                        {/* Row 1 Evaluator */}
                        <div className={`p-6 md:p-10 flex-1 flex flex-col items-center gap-8 transition-colors ${isRow1Match ? 'bg-green-500/5' : ''}`}>
                            <div className="w-full flex justify-between items-center text-xs font-bold uppercase tracking-widest text-gray-500 border-b border-white/10 pb-4">
                                <span>Top Result Component</span>
                                {isRow1Match && <span className="text-green-400">VERIFIED</span>}
                            </div>
                            
                            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 text-xl md:text-2xl text-gray-400 font-mono">
                                <span>(</span>
                                <BlankInput value={r1a} setter={setR1a} colorClass="text-brand-cyan" valid={isRow1Match} />
                                <span>×</span>
                                <BlankInput value={r1b} setter={setR1b} colorClass="text-white" valid={isRow1Match} />
                                <span>)</span>
                                
                                <span className="font-bold text-brand-purple">+</span>
                                
                                <span>(</span>
                                <BlankInput value={r1c} setter={setR1c} colorClass="text-brand-cyan" valid={isRow1Match} />
                                <span>×</span>
                                <BlankInput value={r1d} setter={setR1d} colorClass="text-white" valid={isRow1Match} />
                                <span>)</span>

                                <span>=</span>
                                
                                <div className={`w-16 h-16 flex items-center justify-center font-bold rounded-xl border-2 transition-all ${isRow1Match ? 'border-green-500 bg-green-500/20 text-white shadow-[0_0_15px_rgba(34,197,94,0.4)]' : 'border-white/10 bg-black text-gray-700'}`}>
                                    {isRow1Match ? r0 : '?'}
                                </div>
                            </div>
                        </div>

                        {/* Row 2 Evaluator */}
                        <div className={`p-6 md:p-10 flex-1 flex flex-col items-center gap-8 transition-colors ${isRow2Match ? 'bg-green-500/5' : ''}`}>
                            <div className="w-full flex justify-between items-center text-xs font-bold uppercase tracking-widest text-gray-500 border-b border-white/10 pb-4">
                                <span>Bottom Result Component</span>
                                {isRow2Match && <span className="text-green-400">VERIFIED</span>}
                            </div>
                            
                            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 text-xl md:text-2xl text-gray-400 font-mono">
                                <span>(</span>
                                <BlankInput value={r2a} setter={setR2a} colorClass="text-brand-purple" valid={isRow2Match} />
                                <span>×</span>
                                <BlankInput value={r2b} setter={setR2b} colorClass="text-white" valid={isRow2Match} />
                                <span>)</span>
                                
                                <span className="font-bold text-brand-cyan">+</span>
                                
                                <span>(</span>
                                <BlankInput value={r2c} setter={setR2c} colorClass="text-brand-purple" valid={isRow2Match} />
                                <span>×</span>
                                <BlankInput value={r2d} setter={setR2d} colorClass="text-white" valid={isRow2Match} />
                                <span>)</span>

                                <span>=</span>
                                
                                <div className={`w-16 h-16 flex items-center justify-center font-bold rounded-xl border-2 transition-all ${isRow2Match ? 'border-green-500 bg-green-500/20 text-white shadow-[0_0_15px_rgba(34,197,94,0.4)]' : 'border-white/10 bg-black text-gray-700'}`}>
                                    {isRow2Match ? r1 : '?'}
                                </div>
                            </div>
                        </div>

                    </div>

                    {isMatch && (
                        <div className="w-full bg-black/60 border-t border-white/10 p-6 flex flex-col items-center animate-in fade-in zoom-in duration-500">
                            <span className="text-xs font-bold uppercase tracking-widest text-green-400 mb-4 block">Final Synthesized Vector</span>
                            <div className="text-3xl font-mono text-white bg-green-500/10 px-8 py-4 rounded-2xl border border-green-500/20 shadow-[0_0_30px_rgba(34,197,94,0.15)] flex items-center gap-6">
                                <LatexBlock displayMode={false} expression={`\\begin{bmatrix} ${r0} \\\\ ${r1} \\end{bmatrix}`} />
                            </div>
                        </div>
                    )}
                </div>

                {/* Level Indicators */}
                <div className="flex justify-center gap-3 mt-4">
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
