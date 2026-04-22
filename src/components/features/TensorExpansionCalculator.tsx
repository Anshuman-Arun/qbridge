'use client';

import React, { useState } from 'react';
import { Layers } from 'lucide-react';
import { LatexBlock } from '@/components/features/LatexBlock';

export function TensorExpansionCalculator() {
    const [v1, setV1] = useState<string>("2");
    const [v2, setV2] = useState<string>("3");
    const [w1, setW1] = useState<string>("1");
    const [w2, setW2] = useState<string>("4");

    const v1n = v1 === "-" || v1 === "" ? 0 : Number(v1);
    const v2n = v2 === "-" || v2 === "" ? 0 : Number(v2);
    const w1n = w1 === "-" || w1 === "" ? 0 : Number(w1);
    const w2n = w2 === "-" || w2 === "" ? 0 : Number(w2);

    const handleInput = (val: string, setter: (val: string) => void) => {
        if (/^-?\d*$/.test(val)) {
            setter(val);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-black/80 border border-white/10 rounded-2xl p-8 shadow-2xl font-mono">
            <div className="flex items-center gap-3 mb-8">
                <Layers className="text-brand-purple w-6 h-6" />
                <h3 className="text-xl font-bold text-white uppercase tracking-wider">Tensor Expansion Visualizer</h3>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-12 mb-8 mt-12">
                {/* Input Vector A */}
                <div className="flex flex-col items-center">
                    <span className="text-gray-500 text-xs uppercase tracking-widest mb-4">Vector A</span>
                    <div className="relative border-l-4 border-r-4 border-brand-cyan p-4 rounded-xl flex flex-col gap-4 bg-brand-cyan/5">
                        <input type="text" value={v1} onChange={e => handleInput(e.target.value, setV1)} autoComplete="off" className="w-16 h-16 bg-white/5 border border-white/20 rounded-lg text-center text-xl font-bold text-white outline-none focus:border-brand-cyan transition-all" />
                        <input type="text" value={v2} onChange={e => handleInput(e.target.value, setV2)} autoComplete="off" className="w-16 h-16 bg-white/5 border border-white/20 rounded-lg text-center text-xl font-bold text-white outline-none focus:border-brand-cyan transition-all" />
                    </div>
                </div>

                <div className="text-4xl text-gray-600 font-black">⊗</div>

                {/* Input Vector B */}
                <div className="flex flex-col items-center">
                    <span className="text-gray-500 text-xs uppercase tracking-widest mb-4">Vector B</span>
                    <div className="relative border-l-4 border-r-4 border-[#ff00ff] p-4 rounded-xl flex flex-col gap-4 bg-[#ff00ff]/5">
                        <input type="text" value={w1} onChange={e => handleInput(e.target.value, setW1)} autoComplete="off" className="w-16 h-16 bg-white/5 border border-white/20 rounded-lg text-center text-xl font-bold text-white outline-none focus:border-[#ff00ff] transition-all" />
                        <input type="text" value={w2} onChange={e => handleInput(e.target.value, setW2)} autoComplete="off" className="w-16 h-16 bg-white/5 border border-white/20 rounded-lg text-center text-xl font-bold text-white outline-none focus:border-[#ff00ff] transition-all" />
                    </div>
                </div>

                <div className="text-4xl text-gray-600 font-black">=</div>

                {/* Output Expansion */}
                <div className="flex flex-col items-center">
                    <span className="text-brand-purple text-xs uppercase tracking-widest mb-4 font-bold">Tensor Product</span>
                    <div className="relative border-l-4 border-r-4 border-brand-purple/50 p-4 rounded-xl flex flex-col gap-2 bg-brand-purple/5 shadow-[0_0_30px_rgba(168,85,247,0.15)] min-w-[200px]">
                        <div className="w-full h-12 bg-gray-900 border border-brand-cyan/50 rounded-lg flex items-center justify-between px-4 transition-all duration-300">
                            <span className="text-xs text-brand-cyan/70">{v1} × {w1}</span>
                            <span className="text-lg font-bold text-white">{v1n * w1n}</span>
                        </div>
                        <div className="w-full h-12 bg-gray-900 border border-brand-cyan/50 rounded-lg flex items-center justify-between px-4 transition-all duration-300">
                            <span className="text-xs text-brand-cyan/70">{v1} × {w2}</span>
                            <span className="text-lg font-bold text-white">{v1n * w2n}</span>
                        </div>
                        <div className="w-full h-12 bg-gray-900 border border-[#ff00ff]/50 rounded-lg flex items-center justify-between px-4 transition-all duration-300 mt-2">
                            <span className="text-xs text-[#ff00ff]/70">{v2} × {w1}</span>
                            <span className="text-lg font-bold text-white">{v2n * w1n}</span>
                        </div>
                        <div className="w-full h-12 bg-gray-900 border border-[#ff00ff]/50 rounded-lg flex items-center justify-between px-4 transition-all duration-300">
                            <span className="text-xs text-[#ff00ff]/70">{v2} × {w2}</span>
                            <span className="text-lg font-bold text-white">{v2n * w2n}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 text-center bg-white/5 p-4 rounded-xl border border-white/10 flex flex-col items-center">
                <span className="text-xs text-gray-500 uppercase tracking-widest mb-3">Mathematical Breakdown</span>
                <LatexBlock expression={`\\begin{bmatrix} ${v1} \\\\ ${v2} \\end{bmatrix} \\otimes \\begin{bmatrix} ${w1} \\\\ ${w2} \\end{bmatrix} = \\begin{bmatrix} ${v1} \\begin{bmatrix} ${w1} \\\\ ${w2} \\end{bmatrix} \\\\ \\\\ ${v2} \\begin{bmatrix} ${w1} \\\\ ${w2} \\end{bmatrix} \\end{bmatrix} = \\begin{bmatrix} ${v1n * w1n} \\\\ ${v1n * w2n} \\\\ ${v2n * w1n} \\\\ ${v2n * w2n} \\end{bmatrix}`} />
            </div>
        </div>
    );
}
