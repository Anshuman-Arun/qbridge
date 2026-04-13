'use client';

import React, { useState } from 'react';
import { Play, RotateCcw, Search, CheckCircle2 } from 'lucide-react';

export function LinearSearchSim() {
    const memoryBlocks = [14, 23, 7, 45, 91, 3, 56, 12, 88];
    const target = 91;

    const [currentIndex, setCurrentIndex] = useState(-1);
    const [found, setFound] = useState(false);

    const handleStep = () => {
        if (found || currentIndex >= memoryBlocks.length - 1) return;
        const nextIdx = currentIndex + 1;
        setCurrentIndex(nextIdx);
        if (memoryBlocks[nextIdx] === target) {
            setFound(true);
        }
    };

    const handleReset = () => {
        setCurrentIndex(-1);
        setFound(false);
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-black/50 border border-white/10 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <Search className="w-5 h-5 text-brand-purple" />
                    <h3 className="text-xl font-bold text-white">Linear Search Visualizer</h3>
                </div>
                <div className="bg-white/10 px-4 py-2 rounded-lg text-sm font-mono text-gray-300">
                    Target: <span className="text-brand-cyan font-bold text-lg ml-2">{target}</span>
                </div>
            </div>

            {/* Memory Array */}
            <div className="flex flex-wrap gap-3 justify-center mb-8">
                {memoryBlocks.map((val, idx) => {
                    const isCurrent = idx === currentIndex;
                    const isPast = idx < currentIndex;
                    const isTarget = val === target && found && isCurrent;

                    let blockStyle = "bg-gray-900 border-gray-700 text-gray-500";
                    if (isCurrent) blockStyle = "bg-brand-purple/20 border-brand-purple text-white scale-110 shadow-[0_0_20px_rgba(168,85,247,0.4)] z-10";
                    else if (isPast) blockStyle = "bg-gray-800 border-gray-600 text-gray-400 opacity-50";
                    if (isTarget) blockStyle = "bg-green-500/20 border-green-500 text-white scale-110 shadow-[0_0_20px_rgba(34,197,94,0.4)] z-10";

                    return (
                        <div key={idx} className={`w-16 h-16 sm:w-20 sm:h-20 flex flex-col items-center justify-center rounded-xl border-2 transition-all duration-300 ${blockStyle}`}>
                            <span className="text-xs opacity-50 font-mono mb-1">[{idx}]</span>
                            <span className="text-xl font-bold">{val}</span>
                        </div>
                    );
                })}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
                <button
                    onClick={handleStep}
                    disabled={found || currentIndex >= memoryBlocks.length - 1}
                    className="flex items-center gap-2 px-6 py-3 bg-brand-cyan text-black font-bold rounded-xl hover:bg-brand-cyan/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Play className="w-5 h-5" />
                    {found ? "Target Found" : "Step Forward"}
                </button>
                <button
                    onClick={handleReset}
                    className="flex items-center gap-2 px-6 py-3 bg-white/5 text-gray-300 font-bold rounded-xl hover:bg-white/10 transition-colors border border-white/10"
                >
                    <RotateCcw className="w-5 h-5" />
                    Reset
                </button>
            </div>

            {found && (
                <div className="mt-8 flex items-center justify-center gap-2 text-green-400 font-bold animate-in fade-in zoom-in duration-300">
                    <CheckCircle2 className="w-6 h-6" />
                    Algorithm Terminated: Match exactly at index {currentIndex}! (Complexity: O(N))
                </div>
            )}
        </div>
    );
}
