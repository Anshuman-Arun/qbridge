'use client';

import React, { useState } from 'react';
import { Columns } from 'lucide-react';
import { LatexBlock } from '@/components/features/LatexBlock';

export function VectorMatrixMultiplier() {
    const [m00, setM00] = useState(2);
    const [m01, setM01] = useState(-1);
    const [m10, setM10] = useState(1);
    const [m11, setM11] = useState(3);
    
    const [vx, setVx] = useState(4);
    const [vy, setVy] = useState(2);

    const r0 = m00 * vx + m01 * vy;
    const r1 = m10 * vx + m11 * vy;

    const InputCell = ({ value, setter, colorClass }: { value: number, setter: (val: number) => void, colorClass: string }) => (
        <input 
            type="number" 
            value={value}
            onChange={(e) => setter(Number(e.target.value) || 0)}
            autoComplete="off"
            className={`w-14 h-14 bg-black/40 border-b-2 outline-none text-center text-xl font-bold font-mono transition-colors focus:bg-white/10 ${colorClass}`}
        />
    );

    return (
        <div className="w-full max-w-4xl mx-auto bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-8">
                <Columns className="text-brand-cyan w-6 h-6" />
                <h3 className="text-xl font-bold text-white uppercase tracking-wider">Vector-Matrix Multiplier</h3>
            </div>
            
            <div className="bg-black/50 p-6 rounded-xl border border-white/5 mb-8 text-sm text-gray-300">
                <p>Change the numbers in the matrix or the vector. Notice how the <span className="text-brand-cyan font-bold">top of the vector multiplies down the left column</span>, and the <span className="text-brand-purple font-bold">bottom of the vector multiplies down the right column</span>!</p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 overflow-x-auto py-8">
                {/* 2x2 Matrix */}
                <div className="relative">
                    <div className="absolute -left-4 top-0 bottom-0 w-3 border-l-4 border-t-4 border-b-4 border-gray-600 rounded-l-lg" />
                    <div className="absolute -right-4 top-0 bottom-0 w-3 border-r-4 border-t-4 border-b-4 border-gray-600 rounded-r-lg" />
                    <div className="grid grid-cols-2 gap-4">
                        <InputCell value={m00} setter={setM00} colorClass="text-brand-cyan border-brand-cyan/50 focus:border-brand-cyan" />
                        <InputCell value={m01} setter={setM01} colorClass="text-brand-purple border-brand-purple/50 focus:border-brand-purple" />
                        <InputCell value={m10} setter={setM10} colorClass="text-brand-cyan border-brand-cyan/50 focus:border-brand-cyan" />
                        <InputCell value={m11} setter={setM11} colorClass="text-brand-purple border-brand-purple/50 focus:border-brand-purple" />
                    </div>
                </div>

                <div className="text-3xl text-gray-600 font-bold">×</div>

                {/* 2x1 Vector */}
                <div className="relative">
                    <div className="absolute -left-4 top-0 bottom-0 w-3 border-l-4 border-t-4 border-b-4 border-gray-600 rounded-l-lg" />
                    <div className="absolute -right-4 top-0 bottom-0 w-3 border-r-4 border-t-4 border-b-4 border-gray-600 rounded-r-lg" />
                    <div className="grid grid-cols-1 gap-4">
                        <InputCell value={vx} setter={setVx} colorClass="text-brand-cyan border-brand-cyan/50 focus:border-brand-cyan bg-brand-cyan/5" />
                        <InputCell value={vy} setter={setVy} colorClass="text-brand-purple border-brand-purple/50 focus:border-brand-purple bg-brand-purple/5" />
                    </div>
                </div>

                <div className="text-3xl text-gray-600 font-bold">=</div>

                {/* Working out column */}
                <div className="flex flex-col gap-6 text-lg font-mono text-gray-400 border-l border-white/10 pl-8">
                    <div className="flex items-center gap-2">
                        (<span className="text-brand-cyan">{m00}</span> × <span className="text-brand-cyan">{vx}</span>) + (<span className="text-brand-purple">{m01}</span> × <span className="text-brand-purple">{vy}</span>)
                    </div>
                    <div className="flex items-center gap-2">
                        (<span className="text-brand-cyan">{m10}</span> × <span className="text-brand-cyan">{vx}</span>) + (<span className="text-brand-purple">{m11}</span> × <span className="text-brand-purple">{vy}</span>)
                    </div>
                </div>

                <div className="text-3xl text-gray-600 font-bold">=</div>

                {/* Result Block */}
                <div className="relative ml-4">
                    <div className="absolute -left-4 top-0 bottom-0 w-3 border-l-4 border-t-4 border-b-4 border-green-500 rounded-l-lg" />
                    <div className="absolute -right-4 top-0 bottom-0 w-3 border-r-4 border-t-4 border-b-4 border-green-500 rounded-r-lg" />
                    <div className="grid grid-cols-1 gap-4">
                        <div className="w-14 h-14 flex items-center justify-center text-2xl font-bold bg-green-500/10 text-green-400 rounded-lg">{r0}</div>
                        <div className="w-14 h-14 flex items-center justify-center text-2xl font-bold bg-green-500/10 text-green-400 rounded-lg">{r1}</div>
                    </div>
                </div>
            </div>
            
            <div className="w-full flex justify-center mt-6">
                <LatexBlock expression={`\\begin{bmatrix} ${m00} & ${m01} \\\\ ${m10} & ${m11} \\end{bmatrix} \\begin{bmatrix} ${vx} \\\\ ${vy} \\end{bmatrix} = \\begin{bmatrix} ${r0} \\\\ ${r1} \\end{bmatrix}`} displayMode />
            </div>
        </div>
    );
}
