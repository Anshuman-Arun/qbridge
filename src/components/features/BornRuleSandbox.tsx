'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Target } from 'lucide-react';

interface SamplePoint {
    id: number;
    value: number;
    yOffset: number;
}

export function BornRuleSandbox() {
    const [amplitude, setAmplitude] = useState(0.8);
    const [samples, setSamples] = useState<SamplePoint[]>([]);
    const [autoPlotting, setAutoPlotting] = useState(false);
    const [waveHidden, setWaveHidden] = useState(false);
    const [lastSample, setLastSample] = useState<number | null>(null);
    const nextIdRef = useRef(0);

    const maxSamples = 280;

    const measureOnce = useCallback(() => {
        const variance = (1.1 - amplitude) * 0.38;
        const sample =
            ((Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random()) - 3) /
            3 *
            variance;

        setLastSample(sample);
        setSamples(prev => {
            const next = [...prev, { id: nextIdRef.current++, value: sample, yOffset: 55 + Math.random() * 38 }].slice(-maxSamples);
            if (next.length >= 40) setWaveHidden(true);
            return next;
        });
    }, [amplitude]);

    useEffect(() => {
        if (!autoPlotting) return;
        const timer = setInterval(() => {
            measureOnce();
        }, 90);
        return () => clearInterval(timer);
    }, [autoPlotting, measureOnce]);

    const resetAll = () => {
        setAutoPlotting(false);
        setSamples([]);
        setLastSample(null);
        setWaveHidden(false);
    };

    const bins = useMemo(() => {
        const count = 32;
        const arr = new Array(count).fill(0);
        for (const s of samples) {
            const normalized = Math.max(-1, Math.min(1, s.value));
            const idx = Math.max(0, Math.min(count - 1, Math.floor(((normalized + 1) / 2) * count)));
            arr[idx] += 1;
        }
        return arr;
    }, [samples]);

    const maxBin = Math.max(1, ...bins);

    const generatePath = () => {
        const points = [];
        const width = 520;
        const height = 220;
        const centerX = width / 2;
        const centerY = height / 2;

        for (let x = 0; x <= width; x += 3) {
            const relX = (x - centerX) / 120;
            const y = Math.exp(-(relX * relX) / ((1.1 - amplitude) * 2.1)) * amplitude * 95;
            points.push(`${x},${centerY - y}`);
        }

        return `M ${points.join(' L ')}`;
    };

    return (
        <div className="w-full max-w-5xl mx-auto bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-cyan to-transparent opacity-30" />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
                <div>
                    <h3 className="text-xl font-bold text-white uppercase tracking-wider">Born Rule Sandbox</h3>
                    <p className="text-gray-400 text-sm mt-1">
                        Think of the wave as loaded dice: taller regions get hit more often over many measurements.
                    </p>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                    <button
                        onClick={() => setAutoPlotting(v => !v)}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-colors ${
                            autoPlotting
                                ? 'bg-brand-cyan/20 border-brand-cyan/40 text-brand-cyan'
                                : 'bg-white/5 border-white/15 text-gray-300 hover:bg-white/10'
                        }`}
                    >
                        <span className="inline-flex items-center gap-2">
                            {autoPlotting ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                            Auto Plot {autoPlotting ? 'ON' : 'OFF'}
                        </span>
                    </button>

                    <button
                        onClick={measureOnce}
                        className="px-4 py-2 rounded-xl text-sm font-semibold border bg-white/5 border-white/15 text-gray-300 hover:bg-white/10"
                    >
                        Plot One
                    </button>

                    <button
                        onClick={resetAll}
                        className="px-4 py-2 rounded-xl text-sm font-semibold border bg-white/5 border-white/15 text-gray-300 hover:bg-white/10 inline-flex items-center gap-2"
                    >
                        <RotateCcw className="w-4 h-4" />
                        Reset
                    </button>
                </div>
            </div>

            <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-3 rounded-2xl mb-8">
                <span className="text-[10px] uppercase font-bold text-gray-500 ml-2">Wave Peak</span>
                <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.05"
                    value={amplitude}
                    onChange={(e) => {
                        setAmplitude(parseFloat(e.target.value));
                        setSamples([]);
                        setLastSample(null);
                        setWaveHidden(false);
                    }}
                    className="flex-1 accent-brand-cyan h-1.5 bg-white/10 rounded-lg cursor-pointer"
                />
                <span className="text-sm font-mono text-brand-cyan font-bold w-12 text-center">{(amplitude * 100).toFixed(0)}%</span>
            </div>

            <div className="relative h-[300px] bg-black/40 rounded-2xl border border-white/5 shadow-inner mb-8 overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none grid grid-cols-12 grid-rows-6">
                    {Array.from({ length: 72 }).map((_, i) => (
                        <div key={i} className="border-[0.5px] border-white/20" />
                    ))}
                </div>

                {!waveHidden && (
                    <motion.svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 520 220"
                        className="absolute inset-0 w-full h-full"
                        initial={{ opacity: 0.9 }}
                        animate={{ opacity: 0.9 }}
                    >
                        <defs>
                            <linearGradient id="bornWaveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.65" />
                                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        <path d={generatePath()} fill="url(#bornWaveGradient)" stroke="#06b6d4" strokeWidth="3" strokeLinecap="round" />
                    </motion.svg>
                )}

                <div className="absolute inset-0">
                    {samples.map((s) => {
                        const xPct = ((Math.max(-1, Math.min(1, s.value)) + 1) / 2) * 100;
                        return (
                            <motion.div
                                key={s.id}
                                initial={{ opacity: 0, scale: 0.6, y: -20 }}
                                animate={{ opacity: 0.9, scale: 1, y: 0 }}
                                className="absolute"
                                style={{ left: `calc(${xPct}% - 5px)`, bottom: `${s.yOffset}px` }}
                            >
                                <div className="w-2.5 h-2.5 rounded-full bg-brand-cyan shadow-[0_0_14px_#06b6d4]" />
                            </motion.div>
                        );
                    })}
                </div>

                <div className="absolute bottom-3 left-0 w-full flex justify-center text-[10px] text-gray-500 font-mono gap-10">
                    <span>-1.0</span>
                    <span>-0.5</span>
                    <span className="text-gray-300">0.0</span>
                    <span>+0.5</span>
                    <span>+1.0</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-black/40 border border-white/5 rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-3 text-xs uppercase tracking-wider text-gray-500 font-bold">
                        <Target className="w-4 h-4 text-brand-cyan" />
                        Hit Distribution
                    </div>
                    <div className="h-28 flex items-end gap-1">
                        {bins.map((count, i) => (
                            <div
                                key={i}
                                className="flex-1 rounded-t bg-gradient-to-t from-brand-cyan/15 to-brand-cyan/75"
                                style={{ height: `${(count / maxBin) * 100}%` }}
                            />
                        ))}
                    </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">
                    <div className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Readout</div>
                    <p className="text-sm text-gray-300">Samples: <span className="text-brand-cyan font-mono">{samples.length}</span></p>
                    <p className="text-sm text-gray-300">
                        Last hit:{' '}
                        <span className="text-brand-cyan font-mono">{lastSample === null ? '---' : `${lastSample > 0 ? '+' : ''}${lastSample.toFixed(4)}`}</span>
                    </p>
                    <p className="text-xs text-gray-500 leading-relaxed italic">
                        After enough hits, the wave fades out and only outcomes remain, matching the script idea of collapse records.
                    </p>
                </div>
            </div>
        </div>
    );
}
