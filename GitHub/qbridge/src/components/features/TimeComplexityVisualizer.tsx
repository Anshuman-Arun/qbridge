'use client';

import React, { useState } from 'react';
import { Timer } from 'lucide-react';

export function TimeComplexityVisualizer() {
    const [nValue, setNValue] = useState<number>(10);

    // Calculate maximum theoretical operations for our scale so we can render bars cleanly
    const maxN = 100;
    const maxQuad = maxN * maxN;
    
    // Scale widths logarithmically for visual sanity, otherwise quadratic wipes off the screen
    const getWidthPercentage = (ops: number, maxOps: number) => {
        if (ops <= 1) return 2; // O(1) minimum visible width
        const ratio = Math.log(ops) / Math.log(maxQuad); // Logarithmic curve relative to max quadratic
        return Math.min(100, Math.max(2, ratio * 100));
    };

    const factorial = (n: number): number => {
        if (n <= 1) return 1;
        let result = 1;
        for (let i = 2; i <= Math.min(n, 170); i++) {
            result *= i;
        }
        return result;
    };

    const logOps = Math.max(1, Math.round(Math.log2(nValue)));
    const linearOps = nValue;
    const nLogOps = Math.max(1, Math.round(nValue * Math.log2(nValue)));
    const quadOps = nValue * nValue;
    const expOps = Math.pow(2, nValue);
    const factOps = factorial(nValue);

    const formatNumber = (num: number) => {
        if (num >= 1000000) return num.toExponential(2);
        return num.toLocaleString();
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-black/80 border border-white/10 rounded-2xl p-8 shadow-xl font-mono mt-12">
            <div className="flex items-center gap-3 mb-8">
                <Timer className="text-brand-cyan w-6 h-6" />
                <h3 className="text-xl font-bold text-white uppercase tracking-wider">Time Complexity Race</h3>
            </div>

            <div className="mb-12">
                <h4 className="text-gray-400 mb-4 text-sm tracking-widest uppercase">Select Input Data Size (N)</h4>
                <div className="flex items-center gap-6">
                    <input 
                        type="range" 
                        min="1" 
                        max="100" 
                        value={nValue}
                        onChange={(e) => setNValue(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-brand-purple"
                    />
                    <div className="bg-brand-purple px-4 py-2 rounded-xl text-white font-bold text-xl min-w-[80px] text-center">
                        {nValue}
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                {/* O(1) */}
                <div>
                    <div className="flex justify-between text-xs text-gray-400 mb-2 uppercase tracking-widest">
                        <span>O(1) - Constant Time</span>
                        <span className="text-white">1 step</span>
                    </div>
                    <div className="w-full bg-gray-900 rounded-full h-4 overflow-hidden border border-gray-700">
                        <div 
                            className="bg-blue-300 h-full transition-all duration-300"
                            style={{ width: `${getWidthPercentage(1, maxQuad)}%` }}
                        />
                    </div>
                </div>

                {/* O(log N) */}
                <div>
                    <div className="flex justify-between text-xs text-gray-400 mb-2 uppercase tracking-widest">
                        <span>O(log N) - Logarithmic Time</span>
                        <span className="text-white">{logOps} steps</span>
                    </div>
                    <div className="w-full bg-gray-900 rounded-full h-4 overflow-hidden border border-gray-700">
                        <div 
                            className="bg-blue-500 h-full transition-all duration-300"
                            style={{ width: `${getWidthPercentage(logOps, maxQuad)}%` }}
                        />
                    </div>
                </div>

                {/* O(N) */}
                <div>
                    <div className="flex justify-between text-xs text-gray-400 mb-2 uppercase tracking-widest">
                        <span>O(N) - Linear Time</span>
                        <span className="text-white">{linearOps} steps</span>
                    </div>
                    <div className="w-full bg-gray-900 rounded-full h-4 overflow-hidden border border-gray-700">
                        <div 
                            className="bg-brand-cyan h-full transition-all duration-300"
                            style={{ width: `${getWidthPercentage(linearOps, maxQuad)}%` }}
                        />
                    </div>
                </div>

                {/* O(N log N) */}
                <div>
                    <div className="flex justify-between text-xs text-gray-400 mb-2 uppercase tracking-widest">
                        <span>O(N log N) - Log-Linear Time</span>
                        <span className="text-white">{nLogOps} steps</span>
                    </div>
                    <div className="w-full bg-gray-900 rounded-full h-4 overflow-hidden border border-gray-700">
                        <div 
                            className="bg-purple-400 h-full transition-all duration-300"
                            style={{ width: `${getWidthPercentage(nLogOps, maxQuad)}%` }}
                        />
                    </div>
                </div>

                {/* O(N^2) */}
                <div>
                    <div className="flex justify-between text-xs text-gray-400 mb-2 uppercase tracking-widest">
                        <span>O(N²) - Quadratic Time</span>
                        <span className="text-white">{quadOps} steps</span>
                    </div>
                    <div className="w-full bg-gray-900 rounded-full h-4 overflow-hidden border border-gray-700">
                        <div 
                            className="bg-brand-purple h-full transition-all duration-300"
                            style={{ width: `${getWidthPercentage(quadOps, maxQuad)}%` }}
                        />
                    </div>
                </div>

                {/* O(2^N) */}
                <div>
                    <div className="flex justify-between text-xs text-gray-400 mb-2 uppercase tracking-widest">
                        <span>O(2ᴺ) - Exponential Time</span>
                        <span className="text-orange-400">{formatNumber(expOps)} steps</span>
                    </div>
                    <div className="w-full bg-gray-900 rounded-full h-4 overflow-hidden border border-gray-700 relative">
                        <div 
                            className="bg-orange-500 h-full transition-all duration-300"
                            style={{ width: `${getWidthPercentage(Math.min(expOps, maxQuad * 10), maxQuad)}%` }}
                        />
                        {expOps > maxQuad * 10 && (
                            <div className="absolute inset-0 flex items-center justify-end pr-4 text-[10px] font-bold text-white tracking-widest">
                                BUFFER OVERFLOW WARNING
                            </div>
                        )}
                    </div>
                </div>

                {/* O(N!) */}
                <div>
                    <div className="flex justify-between text-xs text-gray-400 mb-2 uppercase tracking-widest">
                        <span>O(N!) - Factorial Time</span>
                        <span className="text-red-400">{formatNumber(factOps)} steps</span>
                    </div>
                    <div className="w-full bg-gray-900 rounded-full h-4 overflow-hidden border border-gray-700 relative">
                        <div 
                            className="bg-red-500 h-full transition-all duration-300"
                            style={{ width: `${getWidthPercentage(Math.min(factOps, maxQuad * 10), maxQuad)}%` }}
                        />
                        {factOps > maxQuad * 10 && (
                            <div className="absolute inset-0 flex items-center justify-end pr-4 text-[10px] font-bold text-white tracking-widest">
                                EXPLOSION WARNING
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            <div className="mt-8 text-xs text-gray-500 text-center uppercase tracking-widest">
                * Bar widths are scaled logarithmically so massive exponential numbers don't instantly break the UI.
            </div>
        </div>
    );
}
