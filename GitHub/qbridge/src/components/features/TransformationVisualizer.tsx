'use client';

import React, { useState } from 'react';
import { InteractiveGraph } from '@/components/features/InteractiveGraph';
import { RefreshCcw } from 'lucide-react';
import { LatexBlock } from '@/components/features/LatexBlock';

type TransformType = 'ORIGINAL' | 'ROTATE_90' | 'REFLECT_Y' | 'SCALE_2';

export function TransformationVisualizer() {
    const [transform, setTransform] = useState<TransformType>('ORIGINAL');

    const vectorBefore = [2, 1];
    let vectorAfter = [...vectorBefore];
    let matrixTex = '\\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix}';
    let description = 'Identity matrix. No change to the vector.';

    if (transform === 'ROTATE_90') {
        vectorAfter = [-1 * vectorBefore[1], vectorBefore[0]];
        matrixTex = '\\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix}';
        description = '90-degree counter-clockwise rotation.';
    } else if (transform === 'REFLECT_Y') {
        vectorAfter = [-1 * vectorBefore[0], vectorBefore[1]];
        matrixTex = '\\begin{bmatrix} -1 & 0 \\\\ 0 & 1 \\end{bmatrix}';
        description = 'Reflection across the Y (Imaginary) axis.';
    } else if (transform === 'SCALE_2') {
        vectorAfter = [2 * vectorBefore[0], 2 * vectorBefore[1]];
        matrixTex = '\\begin{bmatrix} 2 & 0 \\\\ 0 & 2 \\end{bmatrix}';
        description = 'Uniform scaling by a factor of 2.';
    }

    // InteractiveGraph handles one point target in vector mode. We'll use the 'targetPoint' feature 
    // to render the POST-transformed vector in green, while the main draggable point stays where it is.
    // Actually, InteractiveGraph mode="vector" draws a pink line to point.x, point.y. 
    // We can't easily draw two vectors in InteractiveGraph out of the box dynamically without modifying it, 
    // but the targetPoint feature draws a green dot! If we really want two vectors, we'd need to fork it. 
    // Wait, let's keep it simple. The user just views the transformation. We update the InteractiveGraph's initial state?
    // No, InteractiveGraph uses useMovablePoint which maintains internal state. Since we can't control it from outside 
    // easily without keying it, we'll just overlay latex and show the numerical output since InteractiveGraph is mostly for dragging.
    // Instead of forcing InteractiveGraph here, let's build a quick custom SVG or just use the latex math block since we already have it!

    return (
        <div className="w-full max-w-4xl mx-auto bg-black/60 border border-white/10 rounded-2xl p-8 shadow-xl font-mono">
            <div className="flex items-center gap-3 mb-8">
                <RefreshCcw className="text-brand-purple w-6 h-6" />
                <h3 className="text-xl font-bold text-white uppercase tracking-wider">Matrix Transformation Machine</h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <button onClick={() => setTransform('ORIGINAL')} className={`py-3 px-4 rounded-xl border transition-all ${transform === 'ORIGINAL' ? 'bg-white text-black border-white' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}>Identity</button>
                <button onClick={() => setTransform('ROTATE_90')} className={`py-3 px-4 rounded-xl border transition-all ${transform === 'ROTATE_90' ? 'bg-brand-cyan text-black border-brand-cyan' : 'bg-brand-cyan/5 border-brand-cyan/20 text-brand-cyan hover:bg-brand-cyan/20'}`}>Rotate 90°</button>
                <button onClick={() => setTransform('REFLECT_Y')} className={`py-3 px-4 rounded-xl border transition-all ${transform === 'REFLECT_Y' ? 'bg-[#ff00ff] text-white border-[#ff00ff]' : 'bg-[#ff00ff]/5 border-[#ff00ff]/20 text-[#ff00ff] hover:bg-[#ff00ff]/20'}`}>Reflect Y</button>
                <button onClick={() => setTransform('SCALE_2')} className={`py-3 px-4 rounded-xl border transition-all ${transform === 'SCALE_2' ? 'bg-brand-purple text-white border-brand-purple' : 'bg-brand-purple/5 border-brand-purple/20 text-brand-purple hover:bg-brand-purple/20'}`}>Scale × 2</button>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 bg-[#0a0a0a] border border-white/5 rounded-xl p-8">
                
                {/* Action Latex */}
                <div className="flex items-center gap-4 text-white text-lg">
                    <div className="flex flex-col items-center">
                        <span className="text-xs text-gray-500 uppercase tracking-widest mb-4">Matrix</span>
                        <LatexBlock expression={matrixTex} />
                    </div>
                    <span>×</span>
                    <div className="flex flex-col items-center">
                        <span className="text-xs text-gray-500 uppercase tracking-widest mb-4">Initial Vector</span>
                        <LatexBlock expression={`\\begin{bmatrix} ${vectorBefore[0]} \\\\ ${vectorBefore[1]} \\end{bmatrix}`} />
                    </div>
                    <span>=</span>
                    <div className="flex flex-col items-center">
                        <span className="text-xs text-brand-cyan uppercase tracking-widest mb-4">Result Vector</span>
                        <LatexBlock expression={`\\begin{bmatrix} ${vectorAfter[0]} \\\\ ${vectorAfter[1]} \\end{bmatrix}`} />
                    </div>
                </div>

            </div>
            
            <div className="mt-6 text-center text-gray-400 bg-white/5 py-3 px-4 rounded-lg border border-white/5">
                <span className="font-bold text-white mr-2">Action:</span> {description}
            </div>
        </div>
    );
}
