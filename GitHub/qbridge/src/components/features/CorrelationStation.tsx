'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Earth, Rocket, Zap, Radio, AlertTriangle } from 'lucide-react';

type Spin = 'up' | 'down' | null;

export function CorrelationStation() {
    const [spinA, setSpinA] = useState<Spin>(null);
    const [spinB, setSpinB] = useState<Spin>(null);
    const [isMeasuring, setIsMeasuring] = useState(false);

    const handleMeasure = () => {
        if (isMeasuring || spinA !== null) return;
        
        setIsMeasuring(true);
        
        // Randomly determine spin A
        const resultA: Spin = Math.random() > 0.5 ? 'up' : 'down';
        // Entanglement ensures B is the opposite
        const resultB: Spin = resultA === 'up' ? 'down' : 'up';

        // Animate the "Observation"
        setTimeout(() => {
            setSpinA(resultA);
            setSpinB(resultB);
            setIsMeasuring(false);
        }, 800);
    };

    const reset = () => {
        setSpinA(null);
        setSpinB(null);
    };

    const SpinIcon = ({ spin, color }: { spin: Spin; color: string }) => (
        <AnimatePresence mode="wait">
            {!spin ? (
                <motion.div 
                    key="superposition"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.4, 0.8, 0.4] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-16 h-16 rounded-full border-2 border-dashed border-gray-500 flex items-center justify-center"
                >
                    <div className="w-8 h-8 rounded-full bg-gray-500/10 animate-ping" />
                    <span className="absolute text-[10px] uppercase font-bold text-gray-400">? / ?</span>
                </motion.div>
            ) : (
                <motion.div 
                    key="collapsed"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className={`w-16 h-16 rounded-full border-4 flex items-center justify-center overflow-hidden ${
                        spin === 'up' ? 'border-green-500/50 bg-green-500/10' : 'border-red-500/50 bg-red-500/10'
                    }`}
                >
                    <motion.div 
                        animate={{ y: spin === 'up' ? [5, -5, 5] : [-5, 5, -5] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className={`text-2xl font-black ${spin === 'up' ? 'text-green-500' : 'text-red-500'}`}
                    >
                        {spin === 'up' ? '↑' : '↓'}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    return (
        <div className="w-full max-w-5xl mx-auto bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 shadow-2xl relative">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
                <div className="space-y-1">
                    <h3 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
                        <Radio className="w-5 h-5 text-brand-purple animate-pulse" />
                        Synchronized Randomness
                    </h3>
                    <p className="text-gray-400 text-sm">Particle A and B share a single wave function across any distance.</p>
                </div>
                {spinA && (
                    <button 
                        onClick={reset}
                        className="text-[10px] uppercase font-bold text-brand-purple hover:text-white transition-colors"
                    >
                        Re-Entangle System
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative items-center">
                {/* Connecting Line */}
                <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[2px] z-0">
                    <div className="w-full h-full bg-gradient-to-r from-brand-purple/20 via-brand-cyan/40 to-brand-purple/20 relative">
                        {isMeasuring && (
                            <motion.div 
                                initial={{ left: "50%" }}
                                animate={{ left: ["0%", "100%"] }}
                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full blur-md"
                            />
                        )}
                    </div>
                </div>

                {/* Earth Lab */}
                <div className="relative group z-10">
                    <div className="bg-black/60 border border-white/10 rounded-2xl p-8 transition-all hover:bg-black/40 hover:border-brand-purple/30 text-center">
                        <div className="flex justify-center mb-6">
                            <div className="p-4 bg-brand-purple/10 border border-brand-purple/20 rounded-full">
                                <Earth className="w-8 h-8 text-brand-purple" />
                            </div>
                        </div>
                        <h4 className="text-white font-bold mb-1">Earth Base</h4>
                        <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-8">Particle A</p>
                        
                        <div className="flex justify-center mb-10">
                            <SpinIcon spin={spinA} color="brand-purple" />
                        </div>

                        {!spinA ? (
                            <button 
                                onClick={handleMeasure}
                                disabled={isMeasuring}
                                className="w-full py-3 bg-brand-purple text-white font-black uppercase text-xs tracking-widest rounded-xl hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] disabled:opacity-50"
                            >
                                {isMeasuring ? 'Measuring...' : 'Measure Spin'}
                            </button>
                        ) : (
                            <div className="py-3 border border-white/10 rounded-xl text-gray-400 font-mono text-xs">
                                STATE: <span className={spinA === 'up' ? "text-green-500" : "text-red-500"}>{spinA?.toUpperCase()}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Space Lab */}
                <div className="relative group z-10">
                    <div className="bg-black/60 border border-white/10 rounded-2xl p-8 transition-all hover:bg-black/40 hover:border-brand-cyan/30 text-center">
                        <div className="flex justify-center mb-6">
                            <div className="p-4 bg-brand-cyan/10 border border-brand-cyan/20 rounded-full">
                                <Rocket className="w-8 h-8 text-brand-cyan" />
                            </div>
                        </div>
                        <h4 className="text-white font-bold mb-1">Deep Space</h4>
                        <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-8">Particle B (1B Light Years Away)</p>
                        
                        <div className="flex justify-center mb-10">
                            <SpinIcon spin={spinB} color="brand-cyan" />
                        </div>

                        <div className="py-3 border border-white/10 rounded-xl text-gray-500 font-mono text-xs">
                            {spinB ? (
                                <>STATE: <span className={spinB === 'up' ? "text-green-500" : "text-red-500"}>{spinB?.toUpperCase()}</span></>
                            ) : (
                                "WAITING FOR CORRELATION..."
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {spinA && (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 p-6 bg-brand-purple/5 border border-brand-purple/20 rounded-2xl flex items-start gap-4"
                >
                    <div className="mt-1">
                        <Zap className="w-5 h-5 text-brand-purple" />
                    </div>
                    <div>
                        <h6 className="text-white font-bold text-sm mb-1 uppercase italic tracking-widest">Spooky Action Detected</h6>
                        <p className="text-xs text-gray-400 leading-relaxed">
                            Because these electrons share a single wave function, the instant Earth Base measured Spin {spinA?.toUpperCase()}, the deep-space particle was forced to instantly become Spin {spinB?.toUpperCase()}. No signal traveled through space—the system simply updated.
                        </p>
                    </div>
                </motion.div>
            )}

            {!spinA && !isMeasuring && (
                <div className="mt-8 p-4 border-2 border-dashed border-white/5 rounded-2xl text-center">
                    <p className="text-[10px] text-gray-600 uppercase font-black tracking-[0.2em]">Currently in Superposition: Probabilities Syncing...</p>
                </div>
            )}
        </div>
    );
}
