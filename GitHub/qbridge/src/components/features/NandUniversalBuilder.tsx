'use client';

import React, { useState } from 'react';
import { Cpu, CheckCircle2, Lock, ArrowRight, Activity } from 'lucide-react';

type SignalSource = 'A' | 'B' | '0' | '1' | 'G1' | 'G2' | 'G3';

interface GateConfig {
    id: string;
    in1: SignalSource;
    in2: SignalSource;
}

export function NandUniversalBuilder() {
    const [level, setLevel] = useState<1 | 2 | 3>(1);
    const [maxLevelUnlocked, setMaxLevelUnlocked] = useState<1 | 2 | 3>(1);
    
    // G1 is always available. G2 is in level 2+. G3 is in level 3.
    const [gates, setGates] = useState<GateConfig[]>([
        { id: 'G1', in1: 'A', in2: '0' },
        { id: 'G2', in1: 'A', in2: 'B' },
        { id: 'G3', in1: 'G1', in2: 'G2' }
    ]);

    const [testResults, setTestResults] = useState<{A: number, B: number, Expected: number, Actual: number | null, pass: boolean}[] | null>(null);

    const updateGate = (id: string, port: 'in1' | 'in2', val: SignalSource) => {
        setGates(gates.map(g => g.id === id ? { ...g, [port]: val } : g));
        setTestResults(null);
    };

    const NAND = (a: number, b: number) => (!(a && b) ? 1 : 0);

    const evaluateCircuit = (A: number, B: number): number | null => {
        try {
            const getVal = (src: SignalSource, g1Out: number | null, g2Out: number | null): number => {
                if (src === 'A') return A;
                if (src === 'B') return B;
                if (src === '0') return 0;
                if (src === '1') return 1;
                if (src === 'G1') {
                    if (g1Out === null) throw new Error("Circular/Unresolved");
                    return g1Out;
                }
                if (src === 'G2') {
                    if (g2Out === null) throw new Error("Circular/Unresolved");
                    return g2Out;
                }
                return 0;
            };

            const g1 = gates.find(g => g.id === 'G1')!;
            const g1_out = NAND(getVal(g1.in1, null, null), getVal(g1.in2, null, null));

            if (level === 1) return g1_out;

            const g2 = gates.find(g => g.id === 'G2')!;
            const g2_out = NAND(getVal(g2.in1, g1_out, null), getVal(g2.in2, g1_out, null));

            if (level === 2) return g2_out;

            const g3 = gates.find(g => g.id === 'G3')!;
            const g3_out = NAND(getVal(g3.in1, g1_out, g2_out), getVal(g3.in2, g1_out, g2_out));

            return g3_out;
        } catch (e) {
            return null; // Invalid wiring
        }
    };

    const runTests = () => {
        let cases: {A: number, B: number, Expected: number}[] = [];
        if (level === 1) { // Goal: NOT A
            cases = [{A: 0, B: 0, Expected: 1}, {A: 1, B: 0, Expected: 0}];
        } else if (level === 2) { // Goal: A AND B
            cases = [
                {A: 0, B: 0, Expected: 0},
                {A: 0, B: 1, Expected: 0},
                {A: 1, B: 0, Expected: 0},
                {A: 1, B: 1, Expected: 1}
            ];
        } else if (level === 3) { // Goal: A OR B
            cases = [
                {A: 0, B: 0, Expected: 0},
                {A: 0, B: 1, Expected: 1},
                {A: 1, B: 0, Expected: 1},
                {A: 1, B: 1, Expected: 1}
            ];
        }

        const results = cases.map(c => {
            const actual = evaluateCircuit(c.A, c.B);
            return { ...c, Actual: actual, pass: actual === c.Expected };
        });

        setTestResults(results);

        if (results.every(r => r.pass)) {
            if (level < 3 && maxLevelUnlocked === level) {
                setMaxLevelUnlocked((level + 1) as any);
            }
        }
    };

    const getOptionsForGate = (gateId: string) => {
        const base = ['A', 'B', '0', '1'];
        if (gateId === 'G1') return base;
        if (gateId === 'G2') return [...base, 'G1'];
        if (gateId === 'G3') return [...base, 'G1', 'G2'];
        return base;
    };

    const isPassed = testResults?.every(r => r.pass);

    const levels = [
        { id: 1, title: 'Level 1: NOT Gate', desc: 'Wire a single NAND gate to act as a NOT gate for Input A. (Ignore B).' },
        { id: 2, title: 'Level 2: AND Gate', desc: 'Wire two NAND gates sequentially so the final output evaluates to A AND B.' },
        { id: 3, title: 'Level 3: OR Gate', desc: 'Wire three NAND gates to construct an OR gate logic system!' }
    ];

    const currentLevelInfo = levels[level - 1];

    return (
        <div className="w-full max-w-5xl mx-auto bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="bg-white/5 border-b border-white/10 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <Cpu className="text-[#06b6d4] w-7 h-7" />
                    <h3 className="text-xl font-bold text-white uppercase tracking-wider">Universal NAND Builder</h3>
                </div>
                <div className="flex items-center bg-black/40 p-1.5 rounded-lg border border-white/5">
                    {[1, 2, 3].map((lvl) => (
                        <button
                            key={lvl}
                            disabled={maxLevelUnlocked < lvl}
                            onClick={() => { setLevel(lvl as any); setTestResults(null); }}
                            className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all flex items-center gap-2
                                ${level === lvl ? 'bg-[#06b6d4] text-black shadow-[0_0_10px_#06b6d4]' : 
                                maxLevelUnlocked >= lvl ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-700 opacity-50 cursor-not-allowed'}`}
                        >
                            {maxLevelUnlocked < lvl && <Lock className="w-3 h-3" />}
                            Lvl {lvl}
                        </button>
                    ))}
                </div>
            </div>

            <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Circuit Workspace */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-black/40 border border-white/5 p-4 rounded-xl">
                        <p className="text-brand-cyan font-bold mb-1">{currentLevelInfo.title}</p>
                        <p className="text-gray-400 text-sm">{currentLevelInfo.desc}</p>
                    </div>

                    <div className="relative p-6 bg-[#111] border border-white/10 rounded-2xl min-h-[300px] flex flex-col gap-6 justify-center shadow-inner pt-12">
                        {/* Output Label at the top */}
                        <div className="absolute top-4 right-8 px-4 py-1 bg-green-500/10 text-green-400 text-xs font-bold font-mono border border-green-500/30 rounded">
                            FINAL OUT: G{level}
                        </div>

                        {[1, 2, 3].slice(0, level).map((idx) => {
                            const g = gates.find(gate => gate.id === `G${idx}`)!;
                            const opts = getOptionsForGate(`G${idx}`);
                            return (
                                <div key={idx} className="flex items-center gap-4 bg-black/50 p-4 rounded-xl border border-white/5 relative z-10 transition-all hover:border-brand-purple/30">
                                    <div className="flex flex-col gap-3">
                                        <select 
                                            value={g.in1} 
                                            onChange={(e) => updateGate(g.id, 'in1', e.target.value as SignalSource)}
                                            className="bg-[#1a1a1a] border border-white/10 text-white text-xs font-mono font-bold p-2 outline-none rounded focus:border-brand-cyan"
                                        >
                                            {opts.map(o => <option key={o} value={o}>Source: {o}</option>)}
                                        </select>
                                        <select 
                                            value={g.in2} 
                                            onChange={(e) => updateGate(g.id, 'in2', e.target.value as SignalSource)}
                                            className="bg-[#1a1a1a] border border-white/10 text-white text-xs font-mono font-bold p-2 outline-none rounded focus:border-brand-cyan"
                                        >
                                            {opts.map(o => <option key={o} value={o}>Source: {o}</option>)}
                                        </select>
                                    </div>

                                    <div className="flex-1 flex items-center justify-center relative px-2">
                                        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-700 -translate-y-1/2 z-0" />
                                        <div className="relative z-10 bg-[#222] border-[3px] border-gray-600 px-6 py-4 rounded-full flex flex-col items-center justify-center min-w-[100px] text-gray-300 font-bold tracking-widest shadow-xl">
                                            NAND
                                            <span className="text-[10px] absolute -top-3 bg-[#0a0a0a] px-2 text-brand-purple">Gate {idx}</span>
                                        </div>
                                    </div>

                                    <div className="bg-[#1a1a1a] border items-center justify-center flex border-white/10 w-12 h-12 rounded-lg text-white font-mono font-bold text-lg shadow-inner">
                                        G{idx}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Validation Panel */}
                <div className="bg-black/20 border border-white/5 rounded-2xl p-6 flex flex-col">
                    <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-brand-purple" />
                        Truth Table Test
                    </h4>

                    {testResults ? (
                        <div className="space-y-3 mb-6 flex-1">
                            {testResults.map((tr, i) => (
                                <div key={i} className={`flex items-center justify-between p-3 border rounded-lg font-mono text-sm ${tr.pass ? 'border-green-500/30 bg-green-500/5 text-green-300' : 'border-red-500/30 bg-red-500/5 text-red-300'}`}>
                                    <div className="flex gap-3">
                                        {level > 1 ? <span>A:{tr.A} B:{tr.B}</span> : <span>A:{tr.A}</span>}
                                    </div>
                                    <div className="flex gap-3 items-center">
                                        <span>Target:{tr.Expected}</span>
                                        <ArrowRight className="w-3 h-3 opacity-50" />
                                        <span className="font-bold">Out:{tr.Actual === null ? 'ERR' : tr.Actual}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-center p-6 text-gray-500 text-sm border border-dashed border-gray-700 rounded-xl mb-6">
                            Wire your NAND gates and click Test Circuit to verify your logic!
                        </div>
                    )}

                    <div className="space-y-4 shrink-0">
                        <button 
                            onClick={runTests}
                            className="w-full bg-brand-purple text-white font-bold py-3 rounded-xl hover:bg-brand-purple/80 transition-colors shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                        >
                            Test Circuit
                        </button>
                        
                        {isPassed && level < 3 && (
                            <button 
                                onClick={() => { setLevel((level + 1) as any); setTestResults(null); }}
                                className="w-full bg-green-500/20 border border-green-500 text-green-400 font-bold py-3 rounded-xl hover:bg-green-500/30 transition-colors flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(34,197,94,0.3)] animate-pulse"
                            >
                                <CheckCircle2 className="w-5 h-5" /> Next Level
                            </button>
                        )}
                        {isPassed && level === 3 && (
                            <div className="w-full bg-yellow-500/20 border border-yellow-500 text-yellow-400 font-bold py-3 rounded-xl text-center shadow-[0_0_15px_rgba(234,179,8,0.3)]">
                                Universal Mastery Unlocked!
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
