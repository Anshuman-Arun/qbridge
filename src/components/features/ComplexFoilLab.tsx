'use client';

import React, { useMemo, useState } from 'react';
import { RefreshCw, StepForward } from 'lucide-react';
import { LatexBlock } from '@/components/features/LatexBlock';
import { MathText } from '@/components/features/MathText';

function randInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function ComplexFoilLab() {
    const [a, setA] = useState(2);
    const [b, setB] = useState(3);
    const [c, setC] = useState(1);
    const [d, setD] = useState(4);
    const [step, setStep] = useState(0);

    const calc = useMemo(() => {
        const first = a * c;
        const outer = a * d;
        const inner = b * c;
        const lastCoeff = b * d;
        const imag = outer + inner;
        const real = first - lastCoeff;
        return { first, outer, inner, lastCoeff, imag, real };
    }, [a, b, c, d]);

    const randomize = () => {
        setA(randInt(-4, 4));
        setB(randInt(-4, 4));
        setC(randInt(-4, 4));
        setD(randInt(-4, 4));
        setStep(0);
    };

    const steps = [
        `(${a}${b >= 0 ? '+' : ''}${b}i)(${c}${d >= 0 ? '+' : ''}${d}i)`,
        `${calc.first} + ${calc.outer}i + ${calc.inner}i + ${calc.lastCoeff}i^2`,
        `${calc.first} + ${calc.imag}i + ${calc.lastCoeff}i^2`,
        `${calc.first} + ${calc.imag}i + (${calc.lastCoeff})(-1)`,
        `${calc.real}${calc.imag >= 0 ? '+' : ''}${calc.imag}i`,
    ];

    const labels = ['Original Product', 'FOIL Expansion', 'Combine Like i Terms', 'Swap i^2 -> -1', 'Final Simplified Form'];

    return (
        <div className="w-full bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 shadow-2xl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
                <div>
                    <h3 className="text-2xl font-bold text-white">Complex FOIL Lab</h3>
                    <MathText
                        className="text-sm text-gray-400 mt-1"
                        text={String.raw`Walk through First, Outer, Inner, Last, then apply the key rule $i^2=-1$.`}
                    />
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => setStep((s) => Math.min(4, s + 1))}
                        className="px-4 py-2 rounded-xl border border-brand-purple/40 bg-brand-purple/15 text-brand-purple text-sm font-semibold hover:bg-brand-purple/25"
                    >
                        <span className="inline-flex items-center gap-2"><StepForward className="w-4 h-4" /> Next Step</span>
                    </button>
                    <button
                        onClick={randomize}
                        className="px-4 py-2 rounded-xl border border-white/15 bg-white/5 text-gray-300 text-sm font-semibold hover:bg-white/10"
                    >
                        <span className="inline-flex items-center gap-2"><RefreshCw className="w-4 h-4" /> New Problem</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
                <div className="xl:col-span-5 space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                        {[['a', a, setA], ['b', b, setB], ['c', c, setC], ['d', d, setD]].map(([label, val, setter]) => (
                            <div key={label as string} className="bg-white/5 border border-white/10 rounded-xl p-3">
                                <div className="text-[11px] text-gray-500 mb-2">{label as string}</div>
                                <input
                                    type="range"
                                    min={-5}
                                    max={5}
                                    step={1}
                                    value={val as number}
                                    onChange={(e) => {
                                        (setter as React.Dispatch<React.SetStateAction<number>>)(parseInt(e.target.value, 10));
                                        setStep(0);
                                    }}
                                    className="w-full accent-brand-purple"
                                />
                                <div className="text-sm text-white mt-1 font-mono">{val as number}</div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-black/40 border border-brand-cyan/20 rounded-xl p-4 text-sm text-gray-300 space-y-2">
                        <div className="text-xs uppercase tracking-wider text-gray-500">FOIL Terms</div>
                        <div className="flex items-center gap-2">
                            <span className="text-gray-500 min-w-[50px]">First:</span>
                            <span className="text-brand-cyan font-mono"><MathText text={String.raw`$${a} \times ${c} = ${calc.first}$`} /></span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-gray-500 min-w-[50px]">Outer:</span>
                            <span className="text-brand-cyan font-mono"><MathText text={String.raw`$${a} \times ${d}i = ${calc.outer}i$`} /></span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-gray-500 min-w-[50px]">Inner:</span>
                            <span className="text-brand-cyan font-mono"><MathText text={String.raw`$${b}i \times ${c} = ${calc.inner}i$`} /></span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-gray-500 min-w-[50px]">Last:</span>
                            <span className="text-brand-cyan font-mono"><MathText text={String.raw`$${b}i \times ${d}i = ${calc.lastCoeff}i^2$`} /></span>
                        </div>
                    </div>
                </div>

                <div className="xl:col-span-7 space-y-4">
                    <div className="bg-black/40 border border-white/10 rounded-2xl p-6">
                        <div className="text-xs uppercase tracking-wider text-gray-500 mb-3">Step {step + 1}/5: {labels[step]}</div>
                        <div className="bg-black/60 border border-white/5 rounded-xl p-6 flex justify-center">
                            <LatexBlock displayMode expression={steps[step]} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                        {labels.map((label, idx) => (
                            <button
                                key={label}
                                onClick={() => setStep(idx)}
                                className={`text-xs rounded-lg border px-2 py-2 transition-colors ${
                                    idx === step ? 'bg-brand-purple/20 border-brand-purple/40 text-brand-purple' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                                }`}
                            >
                                {idx + 1}
                            </button>
                        ))}
                    </div>

                    <div className="bg-black/40 border border-brand-purple/20 rounded-xl p-4 text-sm text-gray-300">
                        <MathText text={String.raw`The critical rule: whenever $i^2$ appears, replace it with $-1$. That converts part of the expression back into a real number.`} />
                    </div>
                </div>
            </div>
        </div>
    );
}
