'use client';

import React, { useState, useEffect } from 'react';
import { Server, Laptop } from 'lucide-react';

export function HardwareFallacySandbox() {
    const [nValue, setNValue] = useState<number>(100);

    const superClock = 1000000; // operations per second
    const laptopClock = 100;    // operations per second

    const superOps = Math.pow(nValue, 2);
    const laptopOps = nValue;

    const superTimeSeconds = superOps / superClock;
    const laptopTimeSeconds = laptopOps / laptopClock;

    const formatTime = (secs: number) => {
        if (secs < 0.001) return '< 1 ms';
        if (secs < 1) return `${(secs * 1000).toFixed(1)} ms`;
        if (secs < 60) return `${secs.toFixed(2)} seconds`;
        if (secs < 3600) return `${(secs / 60).toFixed(1)} minutes`;
        if (secs < 86400) return `${(secs / 3600).toFixed(1)} hours`;
        if (secs < 31536000) return `${(secs / 86400).toFixed(1)} days`;
        return `${(secs / 31536000).toFixed(1)} years`;
    };

    const isCrashing = superTimeSeconds > 10;

    return (
        <div className="w-full bg-black/80 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="p-6 border-b border-white/10">
                <h3 className="text-xl font-bold text-white mb-2">The Hardware Fallacy Sandbox</h3>
                <p className="text-sm text-gray-400">
                    A supercomputer takes <strong>O(N²)</strong> steps. A slow laptop takes <strong>O(N)</strong> steps. 
                    Adjust N (Number of items) to see why scaling matters more than clock speed.
                </p>
                <div className="mt-6 flex flex-col items-center max-w-lg mx-auto">
                    <label className="text-xs text-brand-cyan uppercase tracking-wider font-bold mb-2">Number of Items (N): {nValue.toLocaleString()}</label>
                    <input 
                        type="range" 
                        min="10" 
                        max="100000" 
                        step="10"
                        value={nValue}
                        onChange={(e) => setNValue(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-brand-cyan"
                    />
                </div>
            </div>

            {/* Split Screen Computers */}
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
                
                {/* Supercomputer (O(N^2)) */}
                <div className="p-8 relative overflow-hidden group">
                    <div className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${isCrashing ? 'bg-red-500/10 opacity-100' : 'opacity-0'}`} />
                    <div className="flex items-center gap-4 mb-4">
                        <div className={`p-3 rounded-xl ${isCrashing ? 'bg-red-500/20 text-red-500' : 'bg-brand-purple/20 text-brand-purple'}`}>
                            <Server className={`w-8 h-8 ${isCrashing ? 'animate-pulse' : ''}`} />
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-white">Supercomputer</h4>
                            <p className="text-xs text-gray-400 font-mono">1,000,000 ops / sec</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-black/50 border border-white/5 p-4 rounded-xl">
                            <span className="text-xs text-gray-500 uppercase tracking-widest block mb-1">Algorithm</span>
                            <span className="text-brand-purple font-mono font-bold text-lg">O(N²) Quadratic</span>
                        </div>
                        <div className="bg-black/50 border border-white/5 p-4 rounded-xl">
                            <span className="text-xs text-gray-500 uppercase tracking-widest block mb-1">Time to Finish</span>
                            <span className={`font-mono font-bold text-2xl ${isCrashing ? 'text-red-500' : 'text-white'}`}>
                                {formatTime(superTimeSeconds)}
                            </span>
                            {isCrashing && (
                                <span className="block text-xs text-red-400 mt-2 italic animate-pulse">🔥 System overloaded with steps</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Old Laptop (O(N)) */}
                <div className="p-8 group relative z-10">
                    <div className={`absolute inset-0 bg-brand-cyan/5 transition-opacity duration-500 opacity-0 group-hover:opacity-100 pointer-events-none`} />
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-xl bg-blue-500/20 text-blue-400">
                            <Laptop className="w-8 h-8" />
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-white">90s Laptop</h4>
                            <p className="text-xs text-gray-400 font-mono">100 ops / sec</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-black/50 border border-white/5 p-4 rounded-xl">
                            <span className="text-xs text-gray-500 uppercase tracking-widest block mb-1">Algorithm</span>
                            <span className="text-blue-400 font-mono font-bold text-lg">O(N) Linear</span>
                        </div>
                        <div className="bg-black/50 border border-white/5 p-4 rounded-xl">
                            <span className="text-xs text-gray-500 uppercase tracking-widest block mb-1">Time to Finish</span>
                            <span className="font-mono font-bold text-2xl text-white">
                                {formatTime(laptopTimeSeconds)}
                            </span>
                        </div>
                    </div>
                </div>

            </div>
            
            <div className="px-6 py-4 bg-black/50 text-xs text-gray-400 border-t border-white/10 flex justify-between">
                <span>Supercomputer takes N² = {superOps.toLocaleString()} steps</span>
                <span>Laptop takes N = {laptopOps.toLocaleString()} steps</span>
            </div>
        </div>
    );
}
