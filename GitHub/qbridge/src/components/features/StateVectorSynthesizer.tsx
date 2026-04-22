'use client';

import React, { useState } from 'react';
import { Mafs, Coordinates, Vector as MafsVector, Circle, Point } from 'mafs';
import "mafs/core.css";
import "mafs/font.css";
import { Target, CheckCircle2, ChevronRight } from 'lucide-react';
import { LatexBlock } from '@/components/features/LatexBlock';
import { MathText } from '@/components/features/MathText';

const LEVELS = [
    {
        id: 1,
        v1: { x: 2, y: 1 },
        v2: { x: -1, y: 2 },
        target: { x: 3, y: 4 },
        bounds: { x: [-3, 5], y: [-2, 6] } as { x: [number, number], y: [number, number] },
        hint: "Your goal is to scale and combine the Cyan and Purple vectors to perfectly reach the target. You can think of c1 as 'how many steps of the Cyan vector should I take?'. Try setting c1 to 2 (taking two steps of Cyan), and c2 to 1 (taking one step of Purple) to see how they add up head-to-tail!"
    },
    {
        id: 2,
        v1: { x: 1, y: -1 },
        v2: { x: 1, y: 1 },
        target: { x: -2, y: 4 },
        bounds: { x: [-5, 4], y: [-3, 6] } as { x: [number, number], y: [number, number] },
        hint: "If you need to reach a target that is stretching in the completely opposite direction, remember that scalars can be negative! A negative scalar flips the vector 180 degrees backwards. Try experimenting with negative values for c1 to force it to point towards the left side of the graph."
    },
    {
        id: 3,
        v1: { x: 2, y: 0 },
        v2: { x: 0, y: -3 },
        target: { x: -4, y: -6 },
        bounds: { x: [-6, 4], y: [-8, 2] } as { x: [number, number], y: [number, number] },
        hint: "And here's one last challenge for you to try out!"
    }
];

export function StateVectorSynthesizer() {
    const [levelIdx, setLevelIdx] = useState(0);
    const [c1, setC1] = useState(0);
    const [c2, setC2] = useState(0);

    const level = LEVELS[levelIdx];
    const { v1, v2, target, bounds } = level;

    const rX = c1 * v1.x + c2 * v2.x;
    const rY = c1 * v1.y + c2 * v2.y;

    const isMatch = Math.abs(rX - target.x) < 0.1 && Math.abs(rY - target.y) < 0.1;

    const nextLevel = () => {
        if (levelIdx < LEVELS.length - 1) {
            setLevelIdx(levelIdx + 1);
            setC1(0);
            setC2(0);
        }
    };

    return (
        <div className="w-full max-w-5xl mx-auto bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute -inset-20 bg-gradient-to-br from-brand-cyan/5 via-transparent to-brand-purple/5 opacity-50 blur-3xl pointer-events-none"></div>

            <div className="relative z-10 flex flex-col gap-8">

                {/* Horizontal Instructions & Controls View */}
                <div className="bg-black/60 p-8 rounded-2xl border border-white/5 backdrop-blur-sm grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-bold text-gray-300 tracking-widest uppercase">Level {level.id} of {LEVELS.length}</span>
                            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                                <Target className="text-brand-cyan" />
                                State Synthesizer
                            </h3>
                        </div>

                        <p className="text-gray-300 text-sm leading-relaxed">
                            Vectors scale by multiplying each of their components by a regular number (a scalar).
                            Here, the slider <strong className="text-brand-cyan">c₁</strong> multiplies the length of the vector <strong className="text-brand-cyan">v₁</strong>, and
                            <strong className="text-brand-purple"> c₂</strong> scales the vector <strong className="text-brand-purple">v₂</strong>.
                            By adding these two newly scaled vectors head-to-tail, you can reach different points on the grid.
                        </p>

                        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                            <MathText className="text-xs text-gray-400 italic block mb-1" text="Mission:" />
                            <MathText className="text-sm font-medium text-white block" text={level.hint} />
                        </div>
                    </div>

                    <div className="space-y-6 bg-[#111] p-6 rounded-2xl border border-white/5">
                        <div className="space-y-3">
                            <div className="flex justify-between items-center text-sm">
                                <MathText className="font-bold text-brand-cyan" text={String.raw`Scalar $c_1$ for $\vec{v}_1$`} />
                                <span className="font-mono text-white bg-white/10 px-3 py-1 rounded">{c1.toFixed(1)}</span>
                            </div>
                            <input
                                type="range"
                                min="-4" max="4" step="0.5"
                                value={c1}
                                onChange={(e) => setC1(parseFloat(e.target.value))}
                                className="w-full accent-brand-cyan"
                            />
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between items-center text-sm">
                                <MathText className="font-bold text-brand-purple" text={String.raw`Scalar $c_2$ for $\vec{v}_2$`} />
                                <span className="font-mono text-white bg-white/10 px-3 py-1 rounded">{c2.toFixed(1)}</span>
                            </div>
                            <input
                                type="range"
                                min="-4" max="4" step="0.5"
                                value={c2}
                                onChange={(e) => setC2(parseFloat(e.target.value))}
                                className="w-full accent-brand-purple"
                            />
                        </div>

                        <div className={`mt-4 p-4 rounded-xl flex items-center justify-between transition-colors ${isMatch ? 'bg-green-500/20 border border-green-500/30' : 'bg-white/5 border border-white/10'}`}>
                            <div className="flex items-center gap-3">
                                {isMatch ? (
                                    <>
                                        <CheckCircle2 className="text-green-400 w-5 h-5" />
                                        <span className="text-green-400 font-bold text-sm tracking-wide">SYNTHESIZED</span>
                                    </>
                                ) : (
                                    <span className="text-gray-500 font-bold text-sm tracking-wide uppercase">Match Target</span>
                                )}
                            </div>
                            {isMatch && levelIdx < LEVELS.length - 1 && (
                                <button
                                    onClick={nextLevel}
                                    className="flex items-center gap-1 text-xs font-bold text-black bg-green-400 px-3 py-1.5 rounded-lg hover:bg-green-300 transition-colors"
                                >
                                    Next Level <ChevronRight className="w-4 h-4" />
                                </button>
                            )}
                            {isMatch && levelIdx === LEVELS.length - 1 && (
                                <span className="text-xs font-bold text-green-400">Complete!</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Graph View (Below) */}
                <div className="h-[450px] w-full border border-white/10 rounded-2xl overflow-hidden shadow-inner bg-black relative">
                    {/* Floating equation overlay */}
                    <div className="absolute top-4 left-4 z-10 bg-black/80 backdrop-blur-md p-4 rounded-xl border border-white/10 pointer-events-none">
                        <LatexBlock
                            displayMode={false}
                            expression={`\\begin{bmatrix} ${rX.toFixed(1)} \\\\ ${rY.toFixed(1)} \\end{bmatrix} = ${c1}\\begin{bmatrix} ${v1.x} \\\\ ${v1.y} \\end{bmatrix} + ${c2}\\begin{bmatrix} ${v2.x} \\\\ ${v2.y} \\end{bmatrix}`}
                        />
                    </div>

                    <Mafs
                        viewBox={bounds}
                        zoom={false}
                        pan={false}
                        height={450}
                    >
                        <Coordinates.Cartesian subdivisions={1} />

                        {/* Target Point */}
                        <Circle center={[target.x, target.y]} radius={0.4} color="#22c55e" fillOpacity={0.2} weight={2} />
                        <Point x={target.x} y={target.y} color="#22c55e" />

                        {/* Dynamic Vector 1 */}
                        <MafsVector tail={[0, 0]} tip={[c1 * v1.x, c1 * v1.y]} color="#06b6d4" weight={3} />

                        {/* Dynamic Vector 2 stacked on Vector 1 (Head to Tail) */}
                        <MafsVector tail={[c1 * v1.x, c1 * v1.y]} tip={[rX, rY]} color="#a855f7" weight={3} />

                        {/* Resultant Vector */}
                        <MafsVector tail={[0, 0]} tip={[rX, rY]} color="#ffffff" weight={4} style="dashed" />

                        {/* Base Vectors Ghost */}
                        <MafsVector tail={[0, 0]} tip={[v1.x, v1.y]} color="rgba(6, 182, 212, 0.6)" weight={1} style="solid" />
                        <MafsVector tail={[0, 0]} tip={[v2.x, v2.y]} color="rgba(168, 85, 247, 0.6)" weight={1} style="solid" />
                    </Mafs>
                </div>
            </div>
        </div>
    );
}
