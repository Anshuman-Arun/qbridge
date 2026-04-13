'use client';

import React, { useState } from 'react';
import { Network } from 'lucide-react';
import { LatexBlock } from '@/components/features/LatexBlock';

export function MatrixCalculator() {
    const [scalar, setScalar] = useState<number>(2);
    // Matrix state
    const [m11, setM11] = useState(1);
    const [m12, setM12] = useState(2);
    const [m21, setM21] = useState(0);
    const [m22, setM22] = useState(4);

    return (
        <div className="w-full max-w-4xl mx-auto bg-black/80 border border-white/10 rounded-2xl p-8 shadow-2xl font-mono">
            <div className="flex items-center gap-3 mb-8">
                <Network className="text-brand-purple w-6 h-6" />
                <h3 className="text-xl font-bold text-white uppercase tracking-wider">Matrix Scalar Visualizer</h3>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-12 mb-8">
                {/* Scalar Input */}
                <div className="flex flex-col items-center">
                    <span className="text-gray-500 text-xs uppercase tracking-widest mb-4">Scalar</span>
                    <input 
                        type="range" 
                        min="-5" 
                        max="5" 
                        value={scalar}
                        onChange={(e) => setScalar(parseInt(e.target.value))}
                        className="w-32 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-brand-cyan mb-4"
                    />
                    <div className="text-5xl font-black text-brand-cyan">{scalar}</div>
                </div>

                <div className="text-4xl text-gray-600 font-black">×</div>

                {/* Input Matrix */}
                <div className="flex flex-col items-center">
                    <span className="text-gray-500 text-xs uppercase tracking-widest mb-4">Input Matrix</span>
                    <div className="relative border-l-4 border-r-4 border-gray-500 p-4 rounded-xl flex flex-col gap-4">
                        <div className="flex gap-4">
                            <input type="number" value={m11} onChange={e => setM11(parseInt(e.target.value) || 0)} autoComplete="off" className="w-16 h-16 bg-white/5 border border-white/20 rounded-lg text-center text-xl font-bold text-white outline-none focus:border-brand-purple transition-all" />
                            <input type="number" value={m12} onChange={e => setM12(parseInt(e.target.value) || 0)} autoComplete="off" className="w-16 h-16 bg-white/5 border border-white/20 rounded-lg text-center text-xl font-bold text-white outline-none focus:border-brand-purple transition-all" />
                        </div>
                        <div className="flex gap-4">
                            <input type="number" value={m21} onChange={e => setM21(parseInt(e.target.value) || 0)} autoComplete="off" className="w-16 h-16 bg-white/5 border border-white/20 rounded-lg text-center text-xl font-bold text-white outline-none focus:border-brand-purple transition-all" />
                            <input type="number" value={m22} onChange={e => setM22(parseInt(e.target.value) || 0)} autoComplete="off" className="w-16 h-16 bg-white/5 border border-white/20 rounded-lg text-center text-xl font-bold text-white outline-none focus:border-brand-purple transition-all" />
                        </div>
                    </div>
                </div>

                <div className="text-4xl text-gray-600 font-black">=</div>

                {/* Output Matrix */}
                <div className="flex flex-col items-center">
                    <span className="text-gray-500 text-xs uppercase tracking-widest mb-4">Output Matrix</span>
                    <div className="relative border-l-4 border-r-4 border-brand-purple/50 p-4 rounded-xl flex flex-col gap-4 bg-brand-purple/5 shadow-[0_0_30px_rgba(168,85,247,0.15)]">
                        <div className="flex gap-4">
                            <div className="w-16 h-16 bg-brand-cyan/20 border border-brand-cyan rounded-lg text-center text-xl font-bold text-white flex items-center justify-center transition-all duration-300">
                                {scalar * m11}
                            </div>
                            <div className="w-16 h-16 bg-brand-cyan/20 border border-brand-cyan rounded-lg text-center text-xl font-bold text-white flex items-center justify-center transition-all duration-300">
                                {scalar * m12}
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-16 h-16 bg-brand-cyan/20 border border-brand-cyan rounded-lg text-center text-xl font-bold text-white flex items-center justify-center transition-all duration-300">
                                {scalar * m21}
                            </div>
                            <div className="w-16 h-16 bg-brand-cyan/20 border border-brand-cyan rounded-lg text-center text-xl font-bold text-white flex items-center justify-center transition-all duration-300">
                                {scalar * m22}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 text-center bg-white/5 p-4 rounded-xl border border-white/10 flex flex-col items-center">
                <span className="text-xs text-gray-500 uppercase tracking-widest mb-3">Mathematical Equivalent</span>
                <LatexBlock expression={`\\begin{bmatrix} ${scalar} \\cdot ${m11} & ${scalar} \\cdot ${m12} \\\\ ${scalar} \\cdot ${m21} & ${scalar} \\cdot ${m22} \\end{bmatrix} = \\begin{bmatrix} ${scalar * m11} & ${scalar * m12} \\\\ ${scalar * m21} & ${scalar * m22} \\end{bmatrix}`} />
            </div>
        </div>
    );
}
