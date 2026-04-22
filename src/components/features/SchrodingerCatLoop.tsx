'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Cat, FlaskConical, Hammer, Radar, Radio, RotateCcw } from 'lucide-react';

interface NodeDef {
    id: string;
    title: string;
    detail: string;
    angle: number;
    icon: React.ReactNode;
}

const nodes: NodeDef[] = [
    { id: 'atom', title: 'Atom', detail: '50/50 decay in one hour', angle: -90, icon: <Radio className="w-4 h-4" /> },
    { id: 'counter', title: 'Geiger Counter', detail: 'Reads radiation', angle: -18, icon: <Radar className="w-4 h-4" /> },
    { id: 'hammer', title: 'Hammer', detail: 'Drops on trigger', angle: 54, icon: <Hammer className="w-4 h-4" /> },
    { id: 'vial', title: 'Poison Vial', detail: 'Breaks if struck', angle: 126, icon: <FlaskConical className="w-4 h-4" /> },
    { id: 'cat', title: 'Cat', detail: 'Outcome state', angle: 198, icon: <Cat className="w-4 h-4" /> },
];

export function SchrodingerCatLoop() {
    const [isOpen, setIsOpen] = useState(false);
    const [decayed, setDecayed] = useState<boolean | null>(null);
    const [activeNode, setActiveNode] = useState<string>('atom');
    const timersRef = useRef<number[]>([]);

    const clearTimers = () => {
        timersRef.current.forEach((t) => window.clearTimeout(t));
        timersRef.current = [];
    };

    useEffect(() => {
        return () => clearTimers();
    }, []);

    const stateText = useMemo(() => {
        if (!isOpen) return 'Box closed: the whole loop stays in superposition.';
        if (decayed === null) return 'Measurement pending...';
        return decayed
            ? 'Measured branch: atom decayed -> vial broke -> cat is dead.'
            : 'Measured branch: no decay -> vial intact -> cat is alive.';
    }, [isOpen, decayed]);

    const runMeasurement = () => {
        clearTimers();
        const didDecay = Math.random() < 0.5;
        setIsOpen(true);
        setDecayed(didDecay);

        const sequence = ['atom', 'counter', 'hammer', 'vial', 'cat'];
        sequence.forEach((id, idx) => {
            const timer = window.setTimeout(() => setActiveNode(id), idx * 260);
            timersRef.current.push(timer);
        });
    };

    const reset = () => {
        clearTimers();
        setIsOpen(false);
        setDecayed(null);
        setActiveNode('atom');
    };

    return (
        <div className="w-full bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 shadow-2xl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
                <div>
                    <h3 className="text-2xl font-bold text-white">Schrodinger&apos;s Cat Loop</h3>
                    <p className="text-gray-400 text-sm mt-1">Each component is entangled with the previous one, forming one chained quantum event.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={runMeasurement}
                        className="px-4 py-2 rounded-xl border border-brand-cyan/30 bg-brand-cyan/15 text-brand-cyan text-sm font-semibold hover:bg-brand-cyan/25"
                    >
                        Open Box (Measure)
                    </button>
                    <button
                        onClick={reset}
                        className="px-4 py-2 rounded-xl border border-white/15 bg-white/5 text-gray-300 text-sm font-semibold hover:bg-white/10 inline-flex items-center gap-2"
                    >
                        <RotateCcw className="w-4 h-4" />
                        Reset
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-center">
                <div className="xl:col-span-8">
                    <div className="relative w-full max-w-[620px] mx-auto aspect-square rounded-2xl border border-white/10 bg-black/40 overflow-hidden">
                        <div className="absolute inset-0 pointer-events-none">
                            <svg width="100%" height="100%" viewBox="0 0 100 100" className="opacity-80">
                                <defs>
                                    <linearGradient id="loopStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.7" />
                                        <stop offset="100%" stopColor="#a855f7" stopOpacity="0.65" />
                                    </linearGradient>
                                    {/* Hide the loop line anywhere a node card sits so text remains clean */}
                                    <mask id="loopMask">
                                        <rect x="0" y="0" width="100" height="100" fill="white" />
                                        {nodes.map((node) => {
                                            const radians = (node.angle * Math.PI) / 180;
                                            const x = 50 + 34 * Math.cos(radians);
                                            const y = 50 + 34 * Math.sin(radians);
                                            return (
                                                <rect
                                                    key={`mask-${node.id}`}
                                                    x={x - 10}
                                                    y={y - 6}
                                                    width="20"
                                                    height="12"
                                                    rx="2.2"
                                                    fill="black"
                                                />
                                            );
                                        })}
                                    </mask>
                                </defs>
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="34"
                                    fill="none"
                                    stroke="url(#loopStroke)"
                                    strokeWidth="0.7"
                                    strokeDasharray="2 1.5"
                                    mask="url(#loopMask)"
                                />
                            </svg>
                        </div>

                        {nodes.map((node) => {
                            const radians = (node.angle * Math.PI) / 180;
                            const x = 50 + 34 * Math.cos(radians);
                            const y = 50 + 34 * Math.sin(radians);
                            const highlighted = activeNode === node.id;
                            return (
                                <div
                                    key={node.id}
                                    className={`absolute w-[120px] sm:w-[140px] -translate-x-1/2 -translate-y-1/2 rounded-xl p-3 border transition-all ${
                                        highlighted ? 'border-brand-cyan/60 bg-brand-cyan/10 shadow-[0_0_24px_rgba(6,182,212,0.25)]' : 'border-white/10 bg-white/5'
                                    }`}
                                    style={{ left: `${x}%`, top: `${y}%` }}
                                >
                                    <div className="flex items-center gap-2 text-white text-xs sm:text-sm font-semibold mb-1">
                                        <span className={highlighted ? 'text-brand-cyan' : 'text-brand-purple'}>{node.icon}</span>
                                        <span>{node.title}</span>
                                    </div>
                                    <p className="text-[10px] sm:text-[11px] leading-relaxed text-gray-400">{node.detail}</p>
                                </div>
                            );
                        })}

                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
                            <div className={`p-4 rounded-full border ${isOpen ? 'border-brand-cyan/40 bg-brand-cyan/10' : 'border-brand-purple/40 bg-brand-purple/10'} transition-all`}>
                                <span
                                    className={`block text-4xl leading-none transition-all ${
                                        isOpen && decayed ? 'grayscale opacity-80' : 'grayscale-0 opacity-100'
                                    }`}
                                >
                                    🐈
                                </span>
                            </div>
                            <div className="text-xs uppercase tracking-wider text-gray-400">Sealed Box Center</div>
                            <div
                                className={`text-xs px-3 py-1 rounded-full border ${
                                    !isOpen
                                        ? 'text-brand-purple border-brand-purple/30 bg-brand-purple/10'
                                        : decayed
                                          ? 'text-red-300 border-red-500/30 bg-red-500/10'
                                          : 'text-green-300 border-green-500/30 bg-green-500/10'
                                }`}
                            >
                                {!isOpen ? 'Both Alive + Dead (Superposed)' : decayed ? 'Measured: Dead' : 'Measured: Alive'}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="xl:col-span-4 space-y-4">
                    <div className="bg-black/40 border border-white/10 rounded-xl p-4">
                        <h4 className="text-white font-semibold mb-2">Current State</h4>
                        <p className="text-sm text-gray-300 leading-relaxed">{stateText}</p>
                    </div>
                    <div className="bg-black/40 border border-brand-purple/20 rounded-xl p-4">
                        <h4 className="text-white font-semibold mb-2">No Cheating Rule</h4>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            If any information leaks out of the box, the superposition is effectively measured and the loop collapses to one branch.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
