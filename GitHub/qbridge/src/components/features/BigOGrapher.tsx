'use client';

import React from 'react';
import { InteractiveGraph } from '@/components/features/InteractiveGraph';
import { TrendingUp } from 'lucide-react';

export function BigOGrapher() {
    return (
        <div className="w-full max-w-4xl mx-auto bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="text-brand-purple w-6 h-6" />
                <h3 className="text-xl font-bold text-white uppercase tracking-wider">Algorithmic Complexity Grapher</h3>
            </div>
            
            <div className="bg-black/50 p-4 rounded-xl border border-white/5 mb-6 text-sm text-gray-300">
                <p>This graph shows how the number of steps (y-axis) grows as the size of the data block N (x-axis) increases.</p>
                <ul className="mt-4 grid grid-cols-2 gap-4 font-mono">
                    <li className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#06b6d4]"></span> <strong>O(log N):</strong> Logarithmic (Fastest)</li>
                    <li className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#a855f7]"></span> <strong>O(N):</strong> Linear</li>
                    <li className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#ff00ff]"></span> <strong>O(N log N):</strong> Log-Linear</li>
                    <li className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#22c55e]"></span> <strong>O(N²):</strong> Quadratic</li>
                    <li className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#f59e0b]"></span> <strong>O(2ᴺ):</strong> Exponential</li>
                    <li className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500"></span> <strong>O(N!):</strong> Factorial (Slowest)</li>
                </ul>
            </div>

            <InteractiveGraph 
                mode="function"
                functions={[
                    'Math.log2(Math.max(1,x)) * 5', // O(log N) scaled slightly for visual clarity
                    'x * 5', // O(N) 
                    'x * Math.log2(Math.max(1,x)) * 2', // O(N log N)
                    'x**2', // O(N^2)
                    '2**x', // O(2^N)
                    '(function f(n){return n<2?1:n*f(n-1)})(Math.round(Math.max(1,x)))' // O(N!)
                ]}
                xLabel="Data Size (N)"
                yLabel="Operations / Time"
                viewBox={{ xMin: 0, xMax: 10, yMin: 0, yMax: 100 }}
                xStep={2}
                yStep={20}
                pan={true}
                zoom={true}
            />
        </div>
    );
}
