'use client';

import React, { useState } from 'react';
import { Mafs, Coordinates, Vector as MafsVector, Theme } from 'mafs';
import "mafs/core.css";
import "mafs/font.css";
import { MoveDiagonal } from 'lucide-react';
import { LatexBlock } from '@/components/features/LatexBlock';

export function VectorScalingVisualizer({ locked = false }: { locked?: boolean }) {
    const [scalar, setScalar] = useState<number>(1.5);
    const baseVector = { x: 2, y: 1.5 };

    const scaledVector = {
        x: baseVector.x * scalar,
        y: baseVector.y * scalar
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
                <MoveDiagonal className="text-brand-purple w-6 h-6" />
                <h3 className="text-xl font-bold text-white uppercase tracking-wider">Vector Scaling Visualizer</h3>
            </div>
            
            <div className="bg-black/50 p-6 rounded-xl border border-white/5 mb-6">
                <div className="flex flex-col md:flex-row items-center gap-8 justify-between">
                    <div className="flex-1 w-full bg-black/40 p-4 border border-white/10 rounded-xl">
                        <span className="text-xs text-gray-500 uppercase tracking-widest mb-4 block">Scalar Value: {scalar.toFixed(1)}</span>
                        <input 
                            type="range" 
                            min="-3" 
                            max="3" 
                            step="0.1"
                            value={scalar}
                            onChange={(e) => setScalar(parseFloat(e.target.value))}
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-brand-purple"
                        />
                        <div className="flex justify-between text-xs text-gray-600 mt-2 font-mono">
                            <span>-3x</span>
                            <span>0</span>
                            <span>3x</span>
                        </div>
                    </div>

                    <div className="flex gap-4 items-center">
                        <div className="flex flex-col items-center">
                            <span className="text-xs text-gray-500 uppercase tracking-widest mb-2 font-bold">Scalar</span>
                            <div className="text-2xl font-black text-brand-purple h-[40px] flex items-center">{scalar.toFixed(1)}</div>
                        </div>
                        <span className="text-2xl text-gray-500 font-black">×</span>
                        <div className="flex flex-col items-center">
                            <span className="text-xs text-brand-cyan uppercase tracking-widest mb-2 font-bold">Base</span>
                            <LatexBlock expression={`\\begin{bmatrix} ${baseVector.x} \\\\ ${baseVector.y} \\end{bmatrix}`} />
                        </div>
                        <span className="text-2xl text-gray-500 font-black">=</span>
                        <div className="flex flex-col items-center">
                            <span className="text-xs text-green-500 uppercase tracking-widest mb-2 font-bold">Scaled</span>
                            <LatexBlock expression={`\\begin{bmatrix} ${scaledVector.x.toFixed(1)} \\\\ ${scaledVector.y.toFixed(1)} \\end{bmatrix}`} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-[400px] w-full border border-white/10 rounded-xl overflow-hidden shadow-inner">
                <Mafs 
                    viewBox={{ x: [-8, 8], y: [-8, 8] }} 
                    zoom={locked ? false : true} 
                    pan={locked ? false : true}
                >
                    <Coordinates.Cartesian />
                    
                    {/* Base Vector (Ghosted if scalar overlaps, else cyan) */}
                    <MafsVector 
                        tail={[0, 0]} 
                        tip={[baseVector.x, baseVector.y]} 
                        color="#06b6d4" 
                        weight={scalar > 1 ? 4 : 2} 
                        style={scalar > 1 ? "dashed" : "solid"}
                    />

                    {/* Scaled Vector */}
                    <MafsVector 
                        tail={[0, 0]} 
                        tip={[scaledVector.x, scaledVector.y]} 
                        color="#a855f7" 
                        weight={3} 
                    />
                </Mafs>
            </div>
        </div>
    );
}
