'use client';

import React from 'react';
import { InteractiveVideo, VideoCheckpoint } from '@/components/features/InteractiveVideo';
import { ConceptNugget } from '@/components/features/ConceptNugget';
import { MathText } from '@/components/features/MathText';
import { LatexBlock } from '@/components/features/LatexBlock';
import { ComplexPlaneWorkbench } from '@/components/features/ComplexPlaneWorkbench';
import { ComplexFoilLab } from '@/components/features/ComplexFoilLab';

const checkpoints: VideoCheckpoint[] = [
    {
        id: 'cn_cp1',
        timeSeconds: 65,
        questionText: String.raw`By definition, what is $i^2$?`,
        options: [String.raw`$1$`, String.raw`$0$`, String.raw`$-1$`, String.raw`$\frac{1}{i}$`],
        correctAnswer: String.raw`$-1$`,
    },
    {
        id: 'cn_cp2',
        timeSeconds: 150,
        questionText: String.raw`What is $(5+2i) + (3+i)$?`,
        options: [String.raw`$8+3i$`, String.raw`$8+i$`, String.raw`$2+3i$`, String.raw`$15+2i$`],
        correctAnswer: String.raw`$8+3i$`,
    },
    {
        id: 'cn_cp3',
        timeSeconds: 220,
        questionText: String.raw`In $(2+3i)(1+4i)$, what replaces $i^2$ during simplification?`,
        options: [String.raw`$i$`, String.raw`$-1$`, String.raw`$1$`, String.raw`$0$`],
        correctAnswer: String.raw`$-1$`,
    },
];

export default function ComplexNumbersLesson() {
    return (
        <div className="space-y-20 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            <div>
                <h1 className="text-4xl font-bold text-white mb-5 leading-tight">Complex Numbers: Expanding The Number Line</h1>
                <MathText
                    className="text-gray-300 text-lg leading-relaxed block"
                    text={String.raw`Vectors and matrices gave us structure, but quantum math needs a richer number system. Complex numbers extend algebra so equations like $x^2=-1$ become solvable, then turn into the language used for amplitudes, interference, and state evolution.`}
                />
            </div>

            <div>
                <InteractiveVideo url="https://www.youtube.com/watch?v=xnz9AJDW6Zs" checkpoints={checkpoints} />
            </div>

            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/5 via-transparent to-brand-purple/5 opacity-50 blur-3xl pointer-events-none" />
                <div className="relative z-10 bg-black/60 border border-white/10 rounded-3xl p-10 shadow-2xl">
                    <h3 className="text-3xl font-bold text-white mb-8">Core Structure</h3>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm shadow-xl flex flex-col group hover:border-brand-cyan/30 transition-colors">
                            <h4 className="text-xl font-bold text-brand-cyan mb-4">Imaginary Unit</h4>
                            <MathText
                                className="text-gray-400 text-[15px] leading-relaxed block mb-6"
                                text={String.raw`The entire system starts by defining one new unit: $i=\sqrt{-1}$. From that single definition, we get the crucial identity $i^2=-1$, which lets impossible-looking equations become valid.`}
                            />
                            <div className="bg-black/50 p-6 rounded-xl border border-white/5 flex justify-center shadow-inner mt-auto">
                                <LatexBlock displayMode expression={`i^2=-1`} />
                            </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm shadow-xl flex flex-col group hover:border-brand-purple/30 transition-colors">
                            <h4 className="text-xl font-bold text-brand-purple mb-4">Standard Form</h4>
                            <MathText
                                className="text-gray-400 text-[15px] leading-relaxed block mb-6"
                                text={String.raw`A complex number is written as $a+bi$. The real channel is $a$, and the imaginary channel is $bi$. In addition and subtraction, those channels stay separate and combine like terms only.`}
                            />
                            <div className="bg-black/50 p-6 rounded-xl border border-white/5 flex flex-col gap-4 items-center shadow-inner mt-auto">
                                <LatexBlock displayMode={false} expression={`z=a+bi`} />
                                <LatexBlock displayMode={false} expression={`(a+bi)+(c+di)=(a+c)+(b+d)i`} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ConceptNugget text="Complex numbers are one object with two channels: real and imaginary. You never merge those channels unless algebra explicitly forces it, like an $i^2$ substitution." />

            <div className="space-y-10">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-4">Complex Plane Workbench</h2>
                    <MathText
                        className="text-gray-400 text-lg leading-relaxed block"
                        text={String.raw`Manipulate $z_1=a+bi$ and $z_2=c+di$ directly, then watch $z_1\pm z_2$ update both algebraically and visually on the plane. This reinforces the core rule: real parts combine with real parts, and imaginary parts combine with imaginary parts.`}
                    />
                </div>
                <ComplexPlaneWorkbench />
            </div>

            <div className="space-y-10 border-t border-white/10 pt-16">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-4">Complex FOIL Lab</h2>
                    <MathText
                        className="text-gray-400 text-lg leading-relaxed block"
                        text={String.raw`Walk through multiplication step-by-step using FOIL. The critical twist appears at the end: replace every $i^2$ with $-1$, then combine real and imaginary terms to simplify.`}
                    />
                </div>
                <ComplexFoilLab />
            </div>

            <ConceptNugget text="In complex multiplication, $i^2$ is where imaginary structure feeds back into the real channel. That one substitution is the key algebraic pivot." />

            <div className="bg-gradient-to-br from-brand-purple/15 via-transparent to-brand-cyan/10 border border-white/10 rounded-3xl p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10 space-y-6">
                    <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs text-gray-400 uppercase tracking-wider">
                        Going Further
                    </div>
                    <h2 className="text-3xl font-bold text-white">Complex Conjugates And Stable Real Outputs</h2>

                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
                        <div className="space-y-4 xl:col-span-5">
                            <MathText
                                className="text-gray-300 text-[15px] leading-relaxed block"
                                text={String.raw`A closely related idea not covered directly in the video is the <strong class="text-brand-cyan">complex conjugate</strong>. If $z=a+bi$, then $\overline{z}=a-bi$. Same real part, opposite imaginary sign.`}
                            />
                            <MathText
                                className="text-gray-300 text-[15px] leading-relaxed block"
                                text={String.raw`Multiplying a number by its conjugate cancels the imaginary channel and leaves a nonnegative real value. This pattern appears constantly in quantum math when converting amplitudes into measurable values.`}
                            />

                            <div className="bg-black/30 p-6 rounded-2xl border border-white/5 flex flex-col gap-4 shadow-inner">
                                <MathText className="text-brand-cyan font-bold text-sm tracking-wider uppercase mb-2 block text-center" text="Conjugate Product" />
                                <div className="flex flex-col items-center gap-2">
                                    <LatexBlock displayMode={false} expression={String.raw`z=a+bi,\quad \overline{z}=a-bi`} />
                                    <MathText className="text-gray-400 font-bold" text={String.raw`$\Downarrow$`} />
                                    <LatexBlock displayMode={false} expression={String.raw`z\overline{z}=(a+bi)(a-bi)=a^2+b^2`} />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 xl:col-span-7">
                            <div className="bg-black/40 border border-brand-cyan/20 rounded-xl p-6 text-sm text-gray-300 shadow-inner">
                                <strong className="text-white block mb-4 text-base border-b border-brand-cyan/20 pb-3">Why This Matters Next</strong>
                                <MathText
                                    className="mb-4 text-gray-400 block leading-relaxed"
                                    text={String.raw`We will preview graphing and matrix interactions next. Conjugates are part of that bridge, because they help define lengths and stable real quantities on the complex plane.`}
                                />
                                <div className="bg-black/50 p-4 rounded-xl border border-white/5 mb-4 text-center">
                                    <LatexBlock displayMode={false} expression={String.raw`|z|=\sqrt{a^2+b^2},\quad |z|^2=z\overline{z}`} />
                                </div>
                                <MathText
                                    className="text-gray-400 block leading-relaxed"
                                    text={String.raw`Once complex numbers are placed on a plane, matrices can transform them just like vectors. That is the direct transition into the next lesson's planar and matrix viewpoint.`}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
