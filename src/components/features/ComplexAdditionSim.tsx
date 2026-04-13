'use client';

import React from 'react';
import { Mafs, Coordinates, useMovablePoint, Vector as MafsVector, Polygon, Theme } from 'mafs';
import "mafs/core.css";
import "mafs/font.css";
import { PlusSquare } from 'lucide-react';

export function ComplexAdditionSim() {
    const point1 = useMovablePoint([3, 2], { constrain: ([x, y]) => [Math.round(x), Math.round(y)] });
    const point2 = useMovablePoint([1, -4], { constrain: ([x, y]) => [Math.round(x), Math.round(y)] });

    const rX = point1.x + point2.x;
    const rY = point1.y + point2.y;

    const formatComplex = (x: number, y: number) => {
        if (y < 0) return `${x} - ${Math.abs(y)}i`;
        return `${x} + ${y}i`;
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 shadow-2xl mt-12">
            <div className="flex items-center gap-3 mb-6">
                <PlusSquare className="text-brand-purple w-6 h-6" />
                <h3 className="text-xl font-bold text-white uppercase tracking-wider">Complex Addition (Parallelogram)</h3>
            </div>
            
            <div className="bg-black/50 p-4 rounded-xl border border-white/5 mb-6 text-sm text-gray-300">
                <p className="mb-4">Adding complex numbers is exactly like adding vectors. Drag the points $z_1$ and $z_2$ to see the sum geometrically.</p>
                
                <div className="flex flex-wrap gap-6 justify-center items-center font-mono">
                    <div className="px-4 py-2 bg-[#06b6d4]/10 border border-[#06b6d4]/30 rounded-lg text-[#06b6d4]">
                        z₁ = {formatComplex(point1.x, point1.y)}
                    </div>
                    <span className="text-xl text-gray-500">+</span>
                    <div className="px-4 py-2 bg-[#a855f7]/10 border border-[#a855f7]/30 rounded-lg text-[#a855f7]">
                        z₂ = {formatComplex(point2.x, point2.y)}
                    </div>
                    <span className="text-xl text-gray-500">=</span>
                    <div className="px-4 py-2 bg-[#22c55e]/10 border border-[#22c55e]/30 rounded-lg text-[#22c55e] font-bold">
                        {formatComplex(rX, rY)}
                    </div>
                </div>
            </div>

            <div className="h-[500px] w-full border border-white/10 rounded-xl overflow-hidden shadow-inner bg-[#0a0a0a]">
                <Mafs viewBox={{ x: [-8, 8], y: [-8, 8] }} zoom={true} pan={true}>
                    <Coordinates.Cartesian xAxis={{ labels: (x) => `${x}` }} yAxis={{ labels: (y) => `${y}i` }} />
                    
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

                    <MafsVector tail={[0, 0]} tip={[point1.x, point1.y]} color="#06b6d4" weight={3} />
                    {point1.element}

                    <MafsVector tail={[0, 0]} tip={[point2.x, point2.y]} color="#a855f7" weight={3} />
                    {point2.element}

                    <MafsVector tail={[0, 0]} tip={[rX, rY]} color="#22c55e" weight={4} />
                    
                    {/* Ghost projections */}
                    <MafsVector tail={[point1.x, point1.y]} tip={[rX, rY]} color="#a855f7" weight={2} style="dashed" />
                    <MafsVector tail={[point2.x, point2.y]} tip={[rX, rY]} color="#06b6d4" weight={2} style="dashed" />
                </Mafs>
            </div>
        </div>
    );
}
