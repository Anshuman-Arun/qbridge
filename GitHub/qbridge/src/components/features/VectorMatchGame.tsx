'use client';

import React, { useState, useEffect } from 'react';
import { Mafs, Coordinates, Vector as MafsVector } from 'mafs';
import "mafs/core.css";
import "mafs/font.css";
import { LatexBlock } from '@/components/features/LatexBlock';
import { CheckCircle2 } from 'lucide-react';

const CHALLENGES = [
    { id: 'g1', type: 'graph', v: { x: 2, y: 3 }, match: 'c1' },
    { id: 'g2', type: 'graph', v: { x: -3, y: 1 }, match: 'c2' },
    { id: 'g3', type: 'graph', v: { x: 4, y: -2 }, match: 'c3' }
];

const COORDINATES = [
    { id: 'c2', type: 'coord', x: -3, y: 1 },
    { id: 'c3', type: 'coord', x: 4, y: -2 },
    { id: 'c1', type: 'coord', x: 2, y: 3 }
];

export function VectorMatchGame() {
    const [selectedGraph, setSelectedGraph] = useState<string | null>(null);
    const [selectedCoord, setSelectedCoord] = useState<string | null>(null);
    const [matches, setMatches] = useState<Record<string, string>>({}); // graphId -> coordId
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Handle Selection logic
    const handleGraphClick = (id: string) => {
        if (matches[id]) return; // already matched
        setSelectedGraph(selectedGraph === id ? null : id);
    };

    const handleCoordClick = (id: string) => {
        if (Object.values(matches).includes(id)) return; // already matched
        setSelectedCoord(selectedCoord === id ? null : id);
    };

    // Check for match
    useEffect(() => {
        if (selectedGraph && selectedCoord) {
            const graphDef = CHALLENGES.find(g => g.id === selectedGraph);
            if (graphDef && graphDef.match === selectedCoord) {
                // Correct
                setMatches(prev => ({ ...prev, [selectedGraph]: selectedCoord }));
                setSelectedGraph(null);
                setSelectedCoord(null);
            } else {
                // Incorrect
                const timer = setTimeout(() => {
                    setSelectedGraph(null);
                    setSelectedCoord(null);
                }, 500);
                return () => clearTimeout(timer);
            }
        }
    }, [selectedGraph, selectedCoord]);

    if (!isClient) return null; // Hydration fix

    const allMatched = Object.keys(matches).length === CHALLENGES.length;

    return (
        <div className="w-full max-w-5xl mx-auto bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-cyan/5 via-transparent to-brand-purple/5 opacity-50 pointer-events-none" />
            
            <div className="relative z-10 space-y-8">
                <div className="flex justify-between items-end">
                    <div>
                        <h3 className="text-2xl font-bold text-white tracking-tight mb-2">Vector Match</h3>
                        <p className="text-sm text-gray-400">Pair each graphical vector with its corresponding coordinate representation.</p>
                    </div>
                    {allMatched && (
                        <div className="flex items-center gap-2 text-green-400 font-bold bg-green-500/10 px-4 py-2 rounded-xl border border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                            <CheckCircle2 className="w-5 h-5" /> MATCHED
                        </div>
                    )}
                </div>

                <div className="space-y-6">
                    {/* Top Row: Graphs */}
                    <div className="bg-black/40 p-6 rounded-2xl border border-white/5 shadow-inner">
                        <h4 className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-4">Visual State</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {CHALLENGES.map((item) => {
                                const isMatched = !!matches[item.id];
                                const isSelected = selectedGraph === item.id;
                                
                                return (
                                <div 
                                        key={item.id}
                                        onClick={() => handleGraphClick(item.id)}
                                        className={`w-[200px] h-[200px] flex-shrink-0 mx-auto rounded-2xl border-2 overflow-hidden transition-all cursor-pointer relative bg-black
                                            ${isMatched ? 'border-green-500/50 opacity-50 shadow-[0_0_15px_rgba(34,197,94,0.2)]' : isSelected ? 'border-brand-cyan shadow-[0_0_20px_rgba(6,182,212,0.5)] transform scale-105' : 'border-white/10 hover:border-white/30 hover:scale-105'}`}
                                    >
                                        <Mafs viewBox={{ x: [-5, 5], y: [-5, 5] }} zoom={false} pan={false} height={200}>
                                            <Coordinates.Cartesian subdivisions={1} />
                                            <MafsVector tail={[0, 0]} tip={[item.v.x, item.v.y]} color={isMatched ? "#22c55e" : "#06b6d4"} weight={2} />
                                        </Mafs>
                                        {/* Blocking overlay */}
                                        <div className="absolute inset-0 z-20" />
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Bottom Row: Coordinates */}
                    <div className="bg-black/40 p-6 rounded-2xl border border-white/5 shadow-inner">
                        <h4 className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-4">Coordinates</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {COORDINATES.map((coord) => {
                                const isMatched = Object.values(matches).includes(coord.id);
                                const isSelected = selectedCoord === coord.id;
                                
                                return (
                                    <button
                                        key={coord.id}
                                        onClick={() => handleCoordClick(coord.id)}
                                        disabled={isMatched}
                                        className={`h-24 w-full max-w-[200px] mx-auto rounded-2xl border-2 transition-all flex justify-center items-center cursor-pointer shadow-lg
                                            ${isMatched ? 'bg-green-500/10 border-green-500/50 text-green-400 opacity-50 shadow-[0_0_15px_rgba(34,197,94,0.2)]' : 
                                              isSelected ? 'bg-brand-purple/20 border-brand-purple shadow-[0_0_20px_rgba(168,85,247,0.5)] transform scale-105 text-white' : 
                                              'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/30 text-white hover:scale-105'}`}
                                    >
                                        <LatexBlock displayMode={false} expression={`\\begin{bmatrix} ${coord.x} \\\\ ${coord.y} \\end{bmatrix}`} />
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
