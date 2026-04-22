'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Send, Terminal, Loader2, Sparkles, AlertCircle } from 'lucide-react';

type MessageState = 'idle' | 'transmitting' | 'failed' | 'success';

export function FTLCommunicationSandbox() {
    const [mounted, setMounted] = useState(false);
    const [targetBit, setTargetBit] = useState(1);
    const [status, setStatus] = useState<MessageState>('idle');
    const [logs, setLogs] = useState<{ msg: string; time: string }[]>([]);
    const [attempts, setAttempts] = useState(0);

    useEffect(() => {
        setMounted(true);
        setLogs([
            { msg: "SYSTEM READY", time: new Date().toLocaleTimeString() },
            { msg: "ENTANGLEMENT ESTABLISHED...", time: new Date().toLocaleTimeString() }
        ]);
    }, []);

    const addLog = (msg: string) => {
        setLogs(prev => [{ msg, time: new Date().toLocaleTimeString() }, ...prev].slice(0, 5));
    };

    const handleAttempt = (bit: number) => {
        setTargetBit(bit);
        setStatus('transmitting');
        addLog(`ATTEMPTING TO FORCE SPIN ${bit === 1 ? 'UP' : 'DOWN'}...`);
        setAttempts(prev => prev + 1);

        // Simulation of the attempt
        setTimeout(() => {
            // THE BORN RULE REIGN: We cannot control the outcome.
            // It's always 50/50.
            const result = Math.random() > 0.5 ? 1 : 0;
            
            if (result === bit) {
                // Occasional coincidence, but followed by explanation
                setStatus('success');
                addLog(`COINCIDENCE: PARTICLE COLLAPSED TO ${bit === 1 ? 'UP' : 'DOWN'}.`);
                addLog("BUT WAIT... CAN YOU DO IT AGAIN?");
            } else {
                setStatus('failed');
                addLog(`FAILURE: PARTICLE COLLAPSED TO ${result === 1 ? 'UP' : 'DOWN'} INSTEAD.`);
                addLog("PROBABILITY DEFIED CONTROL.");
            }
        }, 1500);
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-[#050505] border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            {/* Scanned Line Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20" />
            
            <div className="flex items-start justify-between mb-10 relative z-10">
                <div className="space-y-1">
                    <h3 className="text-xl font-bold text-white uppercase tracking-widest flex items-center gap-2">
                        <Terminal className="w-5 h-5 text-red-500" />
                        FTL COMMS BREAKER
                    </h3>
                    <p className="text-gray-500 font-mono text-[10px] uppercase tracking-tighter">Protocol: Violation of Relativity Search</p>
                </div>
                <div className="text-right font-mono">
                    <div className="text-[10px] text-gray-500 uppercase">Attempts</div>
                    <div className="text-xl font-bold text-white">{attempts}</div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8 relative z-10">
                {/* Control Panel */}
                <div className="md:col-span-3 space-y-6">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6 shadow-inner">
                        <div className="flex flex-col gap-2">
                            <span className="text-[10px] uppercase font-bold text-gray-400">Target Encoded Message</span>
                            <div className="flex gap-4">
                                <button 
                                    onClick={() => handleAttempt(1)}
                                    disabled={status === 'transmitting'}
                                    className={`flex-1 py-4 rounded-xl border-2 font-black transition-all ${
                                        targetBit === 1 
                                        ? 'border-brand-purple bg-brand-purple/20 text-white shadow-[0_0_15px_#a855f7]' 
                                        : 'border-white/5 bg-black/40 text-gray-500 hover:border-white/20'
                                    }`}
                                >
                                    SEND "1" (UP)
                                </button>
                                <button 
                                    onClick={() => handleAttempt(0)}
                                    disabled={status === 'transmitting'}
                                    className={`flex-1 py-4 rounded-xl border-2 font-black transition-all ${
                                        targetBit === 0 
                                        ? 'border-brand-cyan bg-brand-cyan/20 text-white shadow-[0_0_15px_#06b6d4]' 
                                        : 'border-white/5 bg-black/40 text-gray-500 hover:border-white/20'
                                    }`}
                                >
                                    SEND "0" (DOWN)
                                </button>
                            </div>
                        </div>

                        <div className="relative h-40 bg-black/80 rounded-xl border border-white/5 p-4 overflow-hidden font-mono text-[11px]">
                            <div className="flex flex-col gap-1">
                                {mounted && logs.map((log, i) => (
                                    <div key={i} className={`flex gap-3 ${i === 0 ? 'text-white' : 'text-gray-600'}`}>
                                        <span className="opacity-30">[{log.time}]</span>
                                        <span className={log.msg.includes("FAILURE") ? "text-red-400" : log.msg.includes("COINCIDENCE") ? "text-green-400" : ""}>{log.msg}</span>
                                    </div>
                                ))}
                            </div>
                            {status === 'transmitting' && (
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                                    <Loader2 className="w-6 h-6 text-brand-purple animate-spin" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Explanation Card */}
                <div className="md:col-span-2 space-y-4">
                    <AnimatePresence mode="wait">
                        {status === 'idle' || status === 'transmitting' ? (
                            <motion.div 
                                key="instructions"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="h-full bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-center text-center space-y-4"
                            >
                                <Sparkles className="w-8 h-8 text-brand-purple mx-auto opacity-50" />
                                <h4 className="text-white font-bold text-sm">The Mission</h4>
                                <p className="text-xs text-gray-400 leading-relaxed">
                                    Try to send a specific bit to the receiver by "forcing" the collapse. Einstein feared this would break the speed of light.
                                </p>
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="result"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className={`h-full border-2 rounded-2xl p-6 flex flex-col justify-center space-y-4 shadow-xl ${
                                    status === 'success' ? 'border-green-500/30 bg-green-500/5' : 'border-red-500/30 bg-red-500/5'
                                }`}
                            >
                                <div className={`mx-auto p-3 rounded-full ${status === 'success' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                                    {status === 'success' ? <span className="text-2xl">🎲</span> : <ShieldAlert className="w-6 h-6 text-red-500" />}
                                </div>
                                <h4 className="text-white font-bold text-sm uppercase tracking-widest">
                                    {status === 'success' ? 'Synchronized Chance' : 'Probabilistic Barrier'}
                                </h4>
                                <p className="text-xs text-gray-300 leading-relaxed">
                                    {status === 'success' 
                                        ? "Even though it matched, YOU didn't control it. The universe rolled the dice and happened to give you what you wanted. You cannot guarantee the next one."
                                        : "You can trigger the measurement, but the Born Rule decides the result. Since choice is impossible, no information is actually sent."
                                    }
                                </p>
                                <button 
                                    onClick={() => setStatus('idle')}
                                    className="text-[10px] uppercase font-bold text-gray-500 hover:text-white pt-2 underline underline-offset-4"
                                >
                                    Dismiss Alert
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-4 z-10 relative">
                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                <p className="text-[11px] text-gray-300 leading-relaxed">
                    <strong className="text-red-400">The "No-Communication" Theorem:</strong> Quantum entanglement is perfectly correlated randomness. Because neither side can choose their own outcome, the information shared is useless for messaging. Einstein's speed limit (Relativity) remains unbroken.
                </p>
            </div>
        </div>
    );
}
