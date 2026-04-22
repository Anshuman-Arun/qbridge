'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Ear, Sun, Wind, Box, Unlock, RefreshCw } from 'lucide-react';

type SystemScale = 'electron' | 'cat';

type EventType = 'photon' | 'air' | 'sound' | 'open';

export function DecoherenceInteractionLab() {
    const [coherence, setCoherence] = useState(100);
    const [collapsedBy, setCollapsedBy] = useState<EventType | null>(null);
    const [soundproof, setSoundproof] = useState(true);
    const [scale, setScale] = useState<SystemScale>('electron');
    const [events, setEvents] = useState<string[]>([]);

    const isCollapsed = collapsedBy !== null;

    useEffect(() => {
        if (isCollapsed) return;
        if (scale !== 'cat') return;

        const timer = setInterval(() => {
            setCoherence(prev => {
                const next = Math.max(0, prev - 3);
                if (next <= 0) {
                    setCollapsedBy('air');
                    setEvents(e => [`${new Date().toLocaleTimeString()}: Cat self-interaction decohered the state.`, ...e].slice(0, 8));
                }
                return next;
            });
        }, 380);

        return () => clearInterval(timer);
    }, [scale, isCollapsed]);

    const trigger = (type: EventType) => {
        if (isCollapsed) return;

        if (type === 'open') {
            setCollapsedBy('open');
            setCoherence(0);
            setEvents(e => [`${new Date().toLocaleTimeString()}: Box opened -> direct measurement.`, ...e].slice(0, 8));
            return;
        }

        if (type === 'sound' && soundproof) {
            setEvents(e => [`${new Date().toLocaleTimeString()}: Sound leak blocked (box is soundproof).`, ...e].slice(0, 8));
            return;
        }

        const drop = type === 'air' ? 24 : type === 'photon' ? 14 : 30;

        setCoherence(prev => {
            const next = Math.max(0, prev - drop);
            if (next <= 0) {
                setCollapsedBy(type);
            }
            return next;
        });

        const label =
            type === 'air'
                ? 'Air molecule bumped the system.'
                : type === 'photon'
                    ? 'Thermal photon interacted with the system.'
                    : 'Sound leaked information outside the box.';

        setEvents(e => [`${new Date().toLocaleTimeString()}: ${label}`, ...e].slice(0, 8));
    };

    const reset = () => {
        setCoherence(100);
        setCollapsedBy(null);
        setEvents([]);
    };

    const collapseMessage = useMemo(() => {
        if (!collapsedBy) return 'Superposition intact: no irreversible record has escaped yet.';
        if (collapsedBy === 'open') return 'Collapsed by opening the box (direct measurement).';
        if (collapsedBy === 'sound') return 'Collapsed by leaked sound information (no-cheating rule).';
        if (collapsedBy === 'photon') return 'Collapsed by photon interaction (observation = interaction).';
        return 'Collapsed by environmental interaction (decoherence).';
    }, [collapsedBy]);

    return (
        <div className="w-full bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 shadow-2xl">
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-8">
                <div>
                    <h3 className="text-2xl font-bold text-white">Decoherence Interaction Lab</h3>
                    <p className="text-gray-400 text-sm mt-1">Script-aligned rule: measurement means interaction, not human consciousness.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={() => setSoundproof(v => !v)}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold border ${soundproof
                                ? 'bg-green-500/10 text-green-300 border-green-500/30'
                                : 'bg-red-500/10 text-red-300 border-red-500/30'
                            }`}
                    >
                        {soundproof ? 'Soundproof ON' : 'Soundproof OFF'}
                    </button>
                    <button
                        onClick={() => setScale(prev => (prev === 'electron' ? 'cat' : 'electron'))}
                        className="px-4 py-2 rounded-xl text-sm font-semibold border bg-white/5 border-white/15 text-gray-300 hover:bg-white/10"
                    >
                        System: {scale === 'electron' ? 'Microscopic Electron' : 'Macroscopic Cat'}
                    </button>
                    <button
                        onClick={reset}
                        className="px-4 py-2 rounded-xl text-sm font-semibold border bg-white/5 border-white/15 text-gray-300 hover:bg-white/10 inline-flex items-center gap-2"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Reset
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                <div className="xl:col-span-8 space-y-4">
                    <div className="bg-black/40 border border-white/10 rounded-2xl p-6">
                        <div className="flex items-center justify-between text-xs uppercase tracking-wider mb-3 text-gray-500">
                            <span>Coherence Meter</span>
                            <span className={coherence > 40 ? 'text-brand-cyan' : 'text-red-300'}>{coherence}%</span>
                        </div>
                        <div className="h-3 rounded-full bg-white/5 border border-white/10 overflow-hidden mb-4">
                            <div
                                className="h-full bg-gradient-to-r from-brand-purple to-brand-cyan transition-all duration-300"
                                style={{ width: `${coherence}%` }}
                            />
                        </div>

                        <div className="rounded-xl border border-white/10 bg-[#05070f] min-h-[170px] p-5 flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 opacity-10 pointer-events-none grid grid-cols-8 grid-rows-4">
                                {Array.from({ length: 32 }).map((_, i) => (
                                    <div key={i} className="border border-white/20" />
                                ))}
                            </div>

                            {!isCollapsed ? (
                                <div className="relative z-10 flex flex-col items-center gap-4">
                                    <div className="w-24 h-24 rounded-full border border-brand-purple/40 bg-brand-purple/10 animate-pulse" />
                                    <p className="text-sm text-gray-300">
                                        {scale === 'electron'
                                            ? 'Fragile wave packet: needs isolation to stay coherent.'
                                            : 'Macroscopic object: many internal interactions rapidly destroy coherence.'}
                                    </p>
                                </div>
                            ) : (
                                <div className="relative z-10 flex flex-col items-center gap-4">
                                    <div className="w-6 h-6 rounded-full bg-brand-cyan shadow-[0_0_18px_#06b6d4]" />
                                    <p className="text-sm text-gray-300">Classical outcome locked in.</p>
                                </div>
                            )}
                        </div>
                        <p className="text-xs text-gray-500 mt-3 italic">{collapseMessage}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button onClick={() => trigger('photon')} className="text-left p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                            <div className="flex items-center gap-2 text-white font-semibold mb-1"><Sun className="w-4 h-4 text-yellow-400" /> Thermal Photon</div>
                            <p className="text-xs text-gray-400">A small interaction, but repeated hits still collapse coherence.</p>
                        </button>
                        <button onClick={() => trigger('air')} className="text-left p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                            <div className="flex items-center gap-2 text-white font-semibold mb-1"><Wind className="w-4 h-4 text-brand-cyan" /> Air Molecule</div>
                            <p className="text-xs text-gray-400">Single molecular bumps can irreversibly leak path information.</p>
                        </button>
                        <button onClick={() => trigger('sound')} className="text-left p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                            <div className="flex items-center gap-2 text-white font-semibold mb-1"><Ear className="w-4 h-4 text-brand-purple" /> Sound Leak</div>
                            <p className="text-xs text-gray-400">If sound escapes, outside world gets information and collapse follows.</p>
                        </button>
                        <button onClick={() => trigger('open')} className="text-left p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                            <div className="flex items-center gap-2 text-white font-semibold mb-1"><Unlock className="w-4 h-4 text-red-300" /> Open Box</div>
                            <p className="text-xs text-gray-400">Direct measurement instantly selects a single branch.</p>
                        </button>
                    </div>
                </div>

                <div className="xl:col-span-4 space-y-4">
                    <div className="bg-black/40 border border-white/10 rounded-xl p-4">
                        <h4 className="text-white font-semibold mb-2 flex items-center gap-2"><Box className="w-4 h-4 text-brand-cyan" /> Event Log</h4>
                        <div className="space-y-2 max-h-[240px] overflow-y-auto pr-1">
                            {events.length === 0 ? (
                                <p className="text-xs text-gray-600 italic">No interactions recorded.</p>
                            ) : (
                                events.map((entry, i) => (
                                    <p key={i} className="text-xs text-gray-400 border-b border-white/5 pb-2">{entry}</p>
                                ))
                            )}
                        </div>
                    </div>
                    <div className="bg-black/40 border border-brand-cyan/20 rounded-xl p-4 text-sm text-gray-300">
                        <h4 className="text-white font-semibold mb-2">Types of Interference</h4>
                        <p className="text-gray-400 leading-relaxed">
                            While a superposition requires no outside observation, not all interactions are equally destructive. The type of interaction determines how quickly a superposition collapses.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
