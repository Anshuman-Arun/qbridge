'use client';

import React, { useState } from 'react';
import { Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function KroneckerBlockVisualizer() {
    const [isExpanded, setIsExpanded] = useState(false);
    
    const [a00, setA00] = useState(1);
    const [a01, setA01] = useState(2);
    const [a10, setA10] = useState(3);
    const [a11, setA11] = useState(4);

    const [b00, setB00] = useState(0);
    const [b01, setB01] = useState(1);
    const [b10, setB10] = useState(1);
    const [b11, setB11] = useState(0);

    const InputCell = ({ value, setter, colorClass, disabled }: { value: number, setter: (val: number) => void, colorClass: string, disabled: boolean }) => (
        <input 
            type="number" 
            value={value}
            onChange={(e) => setter(Number(e.target.value) || 0)}
            disabled={disabled}
            autoComplete="off"
            className={`w-12 h-12 md:w-16 md:h-16 bg-black/40 border-2 rounded-md outline-none text-center text-lg md:text-xl font-bold font-mono transition-colors focus:bg-white/10 ${colorClass}`}
        />
    );

    const RenderSubMatrix = ({ scalarA, colorClass }: { scalarA: number, colorClass: string }) => (
        <div className="grid grid-cols-2 gap-1 p-2 bg-black/20 border border-white/10 rounded overflow-hidden">
            <div className={`flex flex-col items-center justify-center p-2 rounded bg-black/40 text-xs md:text-sm font-bold font-mono ${colorClass}`}>
                <span className="opacity-50 text-[10px] uppercase mb-1">{scalarA} × {b00}</span>
                {scalarA * b00}
            </div>
            <div className={`flex flex-col items-center justify-center p-2 rounded bg-black/40 text-xs md:text-sm font-bold font-mono ${colorClass}`}>
                <span className="opacity-50 text-[10px] uppercase mb-1">{scalarA} × {b01}</span>
                {scalarA * b01}
            </div>
            <div className={`flex flex-col items-center justify-center p-2 rounded bg-black/40 text-xs md:text-sm font-bold font-mono ${colorClass}`}>
                <span className="opacity-50 text-[10px] uppercase mb-1">{scalarA} × {b10}</span>
                {scalarA * b10}
            </div>
            <div className={`flex flex-col items-center justify-center p-2 rounded bg-black/40 text-xs md:text-sm font-bold font-mono ${colorClass}`}>
                <span className="opacity-50 text-[10px] uppercase mb-1">{scalarA} × {b11}</span>
                {scalarA * b11}
            </div>
        </div>
    );

    return (
        <div className="w-full max-w-5xl mx-auto bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <Maximize2 className="text-brand-cyan w-6 h-6" />
                    <h3 className="text-xl font-bold text-white uppercase tracking-wider">Kronecker Block Expander</h3>
                </div>
                <button 
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={`px-6 py-2 rounded-full font-bold uppercase tracking-widest text-sm transition-all duration-300 ${isExpanded ? 'bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500/30' : 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/50 hover:bg-brand-cyan/30 shadow-[0_0_15px_rgba(6,182,212,0.5)]'}`}
                >
                    {isExpanded ? 'Reset' : 'Expand Matrices!'}
                </button>
            </div>
            
            <div className="bg-black/50 p-4 shrink-0 rounded-xl border border-white/5 mb-8 text-sm text-gray-300">
                <p>Modify the values of Matrix A and Matrix B. When you click Expand, Matrix B is physically cloned into every single cell of Matrix A, multiplying its values by the target cell!</p>
            </div>

            <div className="relative min-h-[400px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                    {!isExpanded ? (
                        <motion.div 
                            key="collapsed"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
                        >
                            <div className="flex flex-col items-center">
                                <span className="text-sm text-brand-cyan font-bold uppercase tracking-widest mb-4">Matrix A</span>
                                <div className="p-4 bg-brand-cyan/5 border border-brand-cyan/20 rounded-xl grid grid-cols-2 gap-2">
                                    <InputCell value={a00} setter={setA00} disabled={false} colorClass="text-brand-cyan border-brand-cyan/30 focus:border-brand-cyan" />
                                    <InputCell value={a01} setter={setA01} disabled={false} colorClass="text-brand-cyan border-brand-cyan/30 focus:border-brand-cyan" />
                                    <InputCell value={a10} setter={setA10} disabled={false} colorClass="text-brand-cyan border-brand-cyan/30 focus:border-brand-cyan" />
                                    <InputCell value={a11} setter={setA11} disabled={false} colorClass="text-brand-cyan border-brand-cyan/30 focus:border-brand-cyan" />
                                </div>
                            </div>
                            
                            <div className="text-4xl text-gray-600 font-bold">⊗</div>

                            <div className="flex flex-col items-center">
                                <span className="text-sm text-brand-purple font-bold uppercase tracking-widest mb-4">Matrix B</span>
                                <div className="p-4 bg-brand-purple/5 border border-brand-purple/20 rounded-xl grid grid-cols-2 gap-2">
                                    <InputCell value={b00} setter={setB00} disabled={false} colorClass="text-brand-purple border-brand-purple/30 focus:border-brand-purple" />
                                    <InputCell value={b01} setter={setB01} disabled={false} colorClass="text-brand-purple border-brand-purple/30 focus:border-brand-purple" />
                                    <InputCell value={b10} setter={setB10} disabled={false} colorClass="text-brand-purple border-brand-purple/30 focus:border-brand-purple" />
                                    <InputCell value={b11} setter={setB11} disabled={false} colorClass="text-brand-purple border-brand-purple/30 focus:border-brand-purple" />
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="expanded"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                            transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                            className="w-full flex justify-center"
                        >
                            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl grid grid-cols-2 gap-4">
                                <div className="relative">
                                    <div className="absolute -top-3 left-2 bg-[#0a0a0a] px-2 text-xs font-bold text-brand-cyan z-10">A₁₁ = {a00}</div>
                                    <RenderSubMatrix scalarA={a00} colorClass="text-brand-purple" />
                                </div>
                                <div className="relative">
                                    <div className="absolute -top-3 left-2 bg-[#0a0a0a] px-2 text-xs font-bold text-brand-cyan z-10">A₁₂ = {a01}</div>
                                    <RenderSubMatrix scalarA={a01} colorClass="text-brand-purple" />
                                </div>
                                <div className="relative">
                                    <div className="absolute -top-3 left-2 bg-[#0a0a0a] px-2 text-xs font-bold text-brand-cyan z-10">A₂₁ = {a10}</div>
                                    <RenderSubMatrix scalarA={a10} colorClass="text-brand-purple" />
                                </div>
                                <div className="relative">
                                    <div className="absolute -top-3 left-2 bg-[#0a0a0a] px-2 text-xs font-bold text-brand-cyan z-10">A₂₂ = {a11}</div>
                                    <RenderSubMatrix scalarA={a11} colorClass="text-brand-purple" />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
