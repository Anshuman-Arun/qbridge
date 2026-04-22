'use client';

import React, { useMemo, useState } from 'react';
import { Plus, Minus, Shuffle } from 'lucide-react';
import { LatexBlock } from '@/components/features/LatexBlock';
import { MathText } from '@/components/features/MathText';

function formatComplex(real: number, imag: number): string {
    const sign = imag >= 0 ? '+' : '-';
    const absImag = Math.abs(imag);
    return `${real} ${sign} ${absImag}i`;
}

function operationSymbol(mode: 'add' | 'subtract') {
    return mode === 'add' ? '+' : '-';
}

export function ComplexPlaneWorkbench() {
    const [a, setA] = useState(2);
    const [b, setB] = useState(1);
    const [c, setC] = useState(1);
    const [d, setD] = useState(3);
    const [mode, setMode] = useState<'add' | 'subtract'>('add');

    const result = useMemo(() => {
        const real = mode === 'add' ? a + c : a - c;
        const imag = mode === 'add' ? b + d : b - d;
        return { real, imag };
    }, [a, b, c, d, mode]);

    const randomize = () => {
        const rand = () => Math.floor(Math.random() * 9) - 4;
        setA(rand());
        setB(rand());
        setC(rand());
        setD(rand());
    };

    const toSvg = (x: number, y: number) => ({
        x: 160 + x * 26,
        y: 160 - y * 26,
    });

    const z1 = toSvg(a, b);
    const z2 = toSvg(c, d);
    const zr = toSvg(result.real, result.imag);

    return (
        <div className="w-full bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 shadow-2xl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
                <div>
                    <h3 className="text-2xl font-bold text-white">Complex Plane Workbench</h3>
                    <p className="text-sm text-gray-400 mt-1">Combine like terms: real with real, imaginary with imaginary.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setMode('add')}
                        className={`px-4 py-2 rounded-xl border text-sm font-semibold ${mode === 'add' ? 'bg-brand-cyan/15 border-brand-cyan/40 text-brand-cyan' : 'bg-white/5 border-white/15 text-gray-300 hover:bg-white/10'}`}
                    >
                        <span className="inline-flex items-center gap-2"><Plus className="w-4 h-4" /> Add</span>
                    </button>
                    <button
                        onClick={() => setMode('subtract')}
                        className={`px-4 py-2 rounded-xl border text-sm font-semibold ${mode === 'subtract' ? 'bg-brand-purple/15 border-brand-purple/40 text-brand-purple' : 'bg-white/5 border-white/15 text-gray-300 hover:bg-white/10'}`}
                    >
                        <span className="inline-flex items-center gap-2"><Minus className="w-4 h-4" /> Subtract</span>
                    </button>
                    <button
                        onClick={randomize}
                        className="px-4 py-2 rounded-xl border bg-white/5 border-white/15 text-gray-300 text-sm font-semibold hover:bg-white/10"
                    >
                        <span className="inline-flex items-center gap-2"><Shuffle className="w-4 h-4" /> Randomize</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
                <div className="xl:col-span-7">
                    <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                        <svg viewBox="0 0 320 320" className="w-full h-auto">
                            <defs>
                                <marker id="arrowCyan" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                                    <path d="M0,0 L6,3 L0,6 Z" fill="#06b6d4" />
                                </marker>
                                <marker id="arrowPurple" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                                    <path d="M0,0 L6,3 L0,6 Z" fill="#a855f7" />
                                </marker>
                                <marker id="arrowGreen" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                                    <path d="M0,0 L6,3 L0,6 Z" fill="#22c55e" />
                                </marker>
                            </defs>

                            {Array.from({ length: 13 }).map((_, i) => {
                                const p = i * 26;
                                return (
                                    <g key={i}>
                                        <line x1={p} y1={0} x2={p} y2={320} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                                        <line x1={0} y1={p} x2={320} y2={p} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                                    </g>
                                );
                            })}
                            <line x1={0} y1={160} x2={320} y2={160} stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" />
                            <line x1={160} y1={0} x2={160} y2={320} stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" />

                            <line x1={160} y1={160} x2={z1.x} y2={z1.y} stroke="#06b6d4" strokeWidth="3" markerEnd="url(#arrowCyan)" />
                            <line x1={160} y1={160} x2={z2.x} y2={z2.y} stroke="#a855f7" strokeWidth="3" markerEnd="url(#arrowPurple)" />
                            <line x1={160} y1={160} x2={zr.x} y2={zr.y} stroke="#22c55e" strokeWidth="3" markerEnd="url(#arrowGreen)" />

                            <circle cx={z1.x} cy={z1.y} r="4.5" fill="#06b6d4" />
                            <circle cx={z2.x} cy={z2.y} r="4.5" fill="#a855f7" />
                            <circle cx={zr.x} cy={zr.y} r="4.5" fill="#22c55e" />
                        </svg>
                    </div>
                </div>

                <div className="xl:col-span-5 space-y-4">
                    <div className="bg-black/40 border border-white/10 rounded-xl p-5 space-y-3">
                        <div className="text-xs uppercase tracking-wider text-gray-500">Current Numbers</div>
                        <LatexBlock displayMode={false} expression={`z_1 = ${a}${b >= 0 ? '+' : '-'}${Math.abs(b)}i`} />
                        <LatexBlock displayMode={false} expression={`z_2 = ${c}${d >= 0 ? '+' : '-'}${Math.abs(d)}i`} />
                        <LatexBlock displayMode={false} expression={`z_1 ${operationSymbol(mode)} z_2 = ${result.real}${result.imag >= 0 ? '+' : '-'}${Math.abs(result.imag)}i`} />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {[
                            { id: 'a', label: 'real of z_1', val: a, setter: setA },
                            { id: 'b', label: 'imag of z_1', val: b, setter: setB },
                            { id: 'c', label: 'real of z_2', val: c, setter: setC },
                            { id: 'd', label: 'imag of z_2', val: d, setter: setD }
                        ].map(({ id, label, val, setter }) => (
                            <div key={id} className="bg-white/5 border border-white/10 rounded-xl p-3">
                                <MathText className="text-[11px] text-gray-500 mb-2 font-mono uppercase tracking-tighter" text={String.raw`$${id}$ (${label})`} />
                                <input
                                    type="range"
                                    min={-5}
                                    max={5}
                                    step={1}
                                    value={val}
                                    onChange={(e) => setter(parseInt(e.target.value, 10))}
                                    className="w-full accent-brand-cyan"
                                />
                                <div className="text-sm text-white mt-1 font-mono">{val}</div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-black/40 border border-brand-cyan/20 rounded-xl p-4 text-sm text-gray-300">
                        Real and imaginary channels stay separate:
                        <MathText
                            className="mt-2 font-mono text-brand-cyan"
                            text={String.raw`$(${a} ${mode === 'add' ? '+' : '-'} ${c}) + (${b} ${mode === 'add' ? '+' : '-'} ${d})i = ${formatComplex(result.real, result.imag)}$`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
