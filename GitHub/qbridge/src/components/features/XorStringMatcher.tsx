'use client';

import React, { useState } from 'react';
import { ArrowDown, Cpu } from 'lucide-react';

export function XorStringMatcher() {
    const [wordA, setWordA] = useState("APPLE");
    const [wordB, setWordB] = useState("APPLY");

    // Convert string to a simplified 5-bit array per letter for visual purposes (just taking char code modulo 2)
    // Actually, let's just make up a short bit sequence
    const getBits = (word: string) => {
        const charToBits = (c: string) => c.charCodeAt(0).toString(2).padStart(8, '0').slice(-5);
        const padded = word.padEnd(5, ' ').slice(0, 5).toUpperCase();
        return padded.split('').map(charToBits).join('');
    };

    const bitsA = getBits(wordA);
    const bitsB = getBits(wordB);
    
    // Calculate XOR
    let xorResult = '';
    let isMatch = true;
    for (let i = 0; i < bitsA.length; i++) {
        const bitA = bitsA[i];
        const bitB = bitsB[i];
        if (bitA === bitB) {
            xorResult += '0';
        } else {
            xorResult += '1';
            isMatch = false;
        }
    }

    return (
        <div className="w-full max-w-3xl mx-auto bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 shadow-2xl font-mono">
            <div className="flex items-center gap-3 mb-8">
                <Cpu className="text-brand-purple w-6 h-6" />
                <h3 className="text-xl font-bold text-white uppercase tracking-wider">Hardware XOR String Comparator</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                    <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">Memory Block A (5 chars max)</label>
                    <input 
                        type="text" 
                        maxLength={5}
                        value={wordA}
                        onChange={(e) => setWordA(e.target.value)}
                        className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-brand-cyan font-bold tracking-widest focus:outline-none focus:border-brand-cyan transition-colors"
                    />
                    <div className="mt-3 text-xs tracking-[0.2em] break-all text-brand-cyan/50">{bitsA}</div>
                </div>
                <div>
                    <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">Memory Block B (5 chars max)</label>
                    <input 
                        type="text" 
                        maxLength={5}
                        value={wordB}
                        onChange={(e) => setWordB(e.target.value)}
                        className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-brand-purple font-bold tracking-widest focus:outline-none focus:border-brand-purple transition-colors"
                    />
                    <div className="mt-3 text-xs tracking-[0.2em] break-all text-brand-purple/50">{bitsB}</div>
                </div>
            </div>

            <div className="flex justify-center mb-8">
                <div className="flex flex-col items-center">
                    <ArrowDown className="text-gray-600 mb-2" />
                    <div className="px-6 py-2 border border-gray-600 rounded-full text-xs font-bold text-gray-400 bg-gray-900 tracking-widest uppercase">
                        Bitwise XOR Array
                    </div>
                    <ArrowDown className="text-gray-600 mt-2" />
                </div>
            </div>

            <div className={`p-6 rounded-xl border-2 transition-all duration-500 text-center ${isMatch ? 'border-green-500 bg-green-500/10' : 'border-red-500/50 bg-red-500/5'}`}>
                <div className="text-xs text-gray-500 uppercase tracking-widest mb-3">XOR Result Output</div>
                <div className={`text-xl tracking-[0.3em] font-bold break-all ${isMatch ? 'text-green-400' : 'text-red-400'}`}>
                    {xorResult}
                </div>
                <div className="mt-4 font-sans font-bold text-lg text-white">
                    {isMatch ? '✅ Perfect Match (Sum = 0)' : '❌ Mismatch Detected (Sum > 0)'}
                </div>
            </div>
        </div>
    );
}
