'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wind, Sun, Box, RefreshCw, Zap } from 'lucide-react';

interface Collider {
    id: number;
    x: number;
    y: number;
    type: 'molecule' | 'photon';
}

export function DecoherenceGame() {
    const [coherence, setCoherence] = useState(100);
    const [colliders, setColliders] = useState<Collider[]>([]);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [particlePos, setParticlePos] = useState({ x: 50, y: 50 });

    const spawnCollider = useCallback((type: 'molecule' | 'photon') => {
        if (isCollapsed) return;
        
        const newCollider: Collider = {
            id: Date.now(),
            x: Math.random() * 100,
            y: -10,
            type
        };
        setColliders(prev => [...prev, newCollider]);
        
        // Decay coherence
        const decayAmount = type === 'molecule' ? 15 : 8;
        setCoherence(prev => {
            const next = Math.max(0, prev - decayAmount);
            if (next === 0 && !isCollapsed) {
                setIsCollapsed(true);
                setParticlePos({ x: 40 + Math.random() * 20, y: 45 + Math.random() * 10 });
            }
            return next;
        });
    }, [isCollapsed]);

    // Move colliders down and remove them
    useEffect(() => {
        if (colliders.length === 0) return;
        
        const timer = setInterval(() => {
            setColliders(prev => {
                const moved = prev.map(c => ({ ...c, y: c.y + 5 }));
                return moved.filter(c => c.y < 110);
            });
        }, 50);
        
        return () => clearInterval(timer);
    }, [colliders.length]);

    const reset = () => {
        setCoherence(100);
        setColliders([]);
        setIsCollapsed(false);
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 shadow-2xl relative">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
                <div className="space-y-1">
                    <h3 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
                        <Box className="w-5 h-5 text-brand-purple" />
                        Decoherence Lab
                    </h3>
                    <p className="text-gray-400 text-sm italic">The macroscopic world measures itself constantly.</p>
                </div>

                <div className="flex items-center gap-6 w-full md:w-auto">
                    <div className="flex-1 md:w-48 space-y-2">
                        <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest text-gray-500">
                            <span>Coherence Meter</span>
                            <span className={coherence > 50 ? "text-green-400" : "text-red-400"}>{coherence}%</span>
                        </div>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/10">
                            <motion.div 
                                className="h-full bg-gradient-to-r from-brand-purple to-brand-cyan"
                                initial={{ width: "100%" }}
                                animate={{ width: `${coherence}%` }}
                            />
                        </div>
                    </div>
                    <button 
                        onClick={reset}
                        className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
                    >
                        <RefreshCw className="w-4 h-4 text-gray-400" />
                    </button>
                </div>
            </div>

            <div className="relative aspect-video bg-black/40 rounded-2xl border border-white/5 overflow-hidden mb-8 shadow-inner">
                {/* Background Grid */}
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                    <div className="grid grid-cols-12 h-full w-full border-l border-white/20">
                        {Array.from({ length: 12 }).map((_, i) => <div key={i} className="border-r border-white/20" />)}
                    </div>
                </div>

                {/* Colliders */}
                <AnimatePresence>
                    {colliders.map(c => (
                        <motion.div
                            key={c.id}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.5 }}
                            className="absolute z-20"
                            style={{ left: `${c.x}%`, top: `${c.y}%` }}
                        >
                            {c.type === 'photon' ? (
                                <div className="w-3 h-3 bg-yellow-400 rounded-full blur-[2px] shadow-[0_0_10px_#eab308]" />
                            ) : (
                                <div className="w-4 h-4 bg-gray-400 rounded-lg border border-white/20" />
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Central System */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        {!isCollapsed ? (
                            <motion.div 
                                key="wave"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 0.6 }}
                                exit={{ opacity: 0, scale: 1.2, filter: 'blur(20px)' }}
                                className="relative"
                            >
                                <div className="w-32 h-32 bg-brand-purple/20 rounded-full animate-ping border border-brand-purple/40" />
                                <div className="absolute inset-0 w-32 h-32 bg-brand-cyan/20 rounded-full animate-pulse border border-brand-cyan/40 delay-75" />
                                <div className="absolute inset-0 flex items-center justify-center text-brand-cyan/40 font-black text-4xl animate-bounce">~</div>
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="particle"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="absolute"
                                style={{ left: `${particlePos.x}%`, top: `${particlePos.y}%` }}
                            >
                                <div className="w-5 h-5 bg-white rounded-full shadow-[0_0_20px_white] border-2 border-brand-purple z-30" />
                                <div className="absolute -inset-4 bg-brand-purple/20 rounded-full blur-xl animate-pulse" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {coherence === 0 && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute bottom-6 left-6 right-6 p-4 bg-red-500/10 border border-red-500/20 backdrop-blur-md rounded-xl text-center z-40"
                    >
                        <p className="text-red-400 text-xs font-bold uppercase tracking-widest">Decoherence Complete: System has collapsed into classical state</p>
                    </motion.div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div 
                    onClick={() => spawnCollider('photon')}
                    className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all cursor-pointer group flex items-start gap-4"
                >
                    <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl group-hover:scale-110 transition-transform">
                        <Sun className="w-6 h-6 text-yellow-500" />
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-1">Release Photons</h4>
                        <p className="text-xs text-gray-500 leading-relaxed">Simulate stray light hitting the system. Photons have low interaction strength but hit often.</p>
                    </div>
                </div>

                <div 
                    onClick={() => spawnCollider('molecule')}
                    className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all cursor-pointer group flex items-start gap-4"
                >
                    <div className="p-3 bg-brand-cyan/10 border border-brand-cyan/20 rounded-xl group-hover:scale-110 transition-transform">
                        <Wind className="w-6 h-6 text-brand-cyan" />
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-1">Stray Air Molecules</h4>
                        <p className="text-xs text-gray-500 leading-relaxed">Simulate a non-vacuum environment. Massive particles cause instant, massive "Information leakage".</p>
                    </div>
                </div>
            </div>
            
            <div className="mt-6 p-4 bg-brand-purple/5 border border-brand-purple/20 rounded-xl flex items-center gap-3">
                <Zap className="w-4 h-4 text-brand-purple" />
                <p className="text-[11px] text-gray-400">Interaction with the environment is the same as observation. Large objects (like cats) interact so much they never stay in superposition for more than a trillionth of a second.</p>
            </div>
        </div>
    );
}
