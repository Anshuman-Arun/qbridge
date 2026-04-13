'use client';

import React from 'react';
import { Mafs, Coordinates, useMovablePoint, Vector as MafsVector, Polygon, Theme } from 'mafs';
import "mafs/core.css";
import "mafs/font.css";
import { Plus } from 'lucide-react';
import { LatexBlock } from '@/components/features/LatexBlock';

export function VectorAdditionVisualizer({ locked = false }: { locked?: boolean }) {
    const point1 = useMovablePoint([2, 1], { constrain: ([x, y]) => [Math.round(x), Math.round(y)] });
    const point2 = useMovablePoint([1, 3], { constrain: ([x, y]) => [Math.round(x), Math.round(y)] });

    // Resultant vector point
    const rX = point1.x + point2.x;
    const rY = point1.y + point2.y;

    return (
        <div className="w-full max-w-4xl mx-auto bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
                <Plus className="text-brand-cyan w-6 h-6" />
                <h3 className="text-xl font-bold text-white uppercase tracking-wider">Head-to-Tail Vector Addition</h3>
            </div>
            
            <div className="bg-black/50 p-4 rounded-xl border border-white/5 mb-6">
                <p className="text-sm text-gray-300 mb-4">Drag the tips of Vector A and Vector B. Notice how adding them geometrically forms a parallelogram!</p>
                <div className="flex flex-wrap gap-8 justify-center items-center">
                    <div className="flex flex-col items-center">
                        <span className="text-xs text-brand-cyan uppercase tracking-widest mb-2 font-bold">Vector A</span>
                        <LatexBlock expression={`\\begin{bmatrix} ${point1.x} \\\\ ${point1.y} \\end{bmatrix}`} />
                    </div>
                    <span className="text-2xl text-gray-500 font-black">+</span>
                    <div className="flex flex-col items-center">
                        <span className="text-xs text-brand-purple uppercase tracking-widest mb-2 font-bold">Vector B</span>
                        <LatexBlock expression={`\\begin{bmatrix} ${point2.x} \\\\ ${point2.y} \\end{bmatrix}`} />
                    </div>
                    <span className="text-2xl text-gray-500 font-black">=</span>
                    <div className="flex flex-col items-center">
                        <span className="text-xs text-green-500 uppercase tracking-widest mb-2 font-bold">Resultant C</span>
                        <LatexBlock expression={`\\begin{bmatrix} ${rX} \\\\ ${rY} \\end{bmatrix}`} />
                    </div>
                </div>
            </div>

            <div className="h-[500px] w-full border border-white/10 rounded-xl overflow-hidden shadow-inner">
                <Mafs 
                    viewBox={{ x: [-8, 8], y: [-8, 8] }} 
                    zoom={locked ? false : true} 
                    pan={locked ? false : true}
                >
                    <Coordinates.Cartesian />
                    
                    {/* Parallelogram Ghost Lines */}
                    <Polygon 
                        points={[
                            [0, 0],
                            [point1.x, point1.y],
                            [rX, rY],
                            [point2.x, point2.y]
                        ]}
                        color={Theme.foreground}
                        weight={1}
                        strokeStyle="dashed"
                        fillOpacity={0.05}
                    />

                    {/* Vector A */}
                    <MafsVector tail={[0, 0]} tip={[point1.x, point1.y]} color="#06b6d4" weight={3} />
                    {point1.element}

                    {/* Vector B */}
                    <MafsVector tail={[0, 0]} tip={[point2.x, point2.y]} color="#a855f7" weight={3} />
                    {point2.element}

                    {/* Ghost Vector B attached to Vector A's tip (Head to Tail) */}
                    <MafsVector tail={[point1.x, point1.y]} tip={[rX, rY]} color="#a855f7" weight={2} style="dashed" />
                    
                    {/* Ghost Vector A attached to Vector B's tip (Head to Tail) */}
                    <MafsVector tail={[point2.x, point2.y]} tip={[rX, rY]} color="#06b6d4" weight={2} style="dashed" />

                    {/* Resultant Vector C */}
                    <MafsVector tail={[0, 0]} tip={[rX, rY]} color="#22c55e" weight={4} />
                </Mafs>
            </div>
        </div>
    );
}
