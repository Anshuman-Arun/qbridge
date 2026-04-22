'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Waves, Pause, Play, Trash2 } from 'lucide-react';

interface WaveSource {
    x: number;
    y: number;
    id: number;
}

let _nextId = 0;

export function WaveInterferencePond() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const sourcesRef = useRef<WaveSource[]>([]);
    const frozenRef = useRef(false);
    const wavelengthRef = useRef(45);
    const speedRef = useRef(1.2);

    const [sources, setSources] = useState<WaveSource[]>([]);
    const [frozen, setFrozen] = useState(false);
    const [wavelength, setWavelength] = useState(45);

    useEffect(() => { wavelengthRef.current = wavelength; }, [wavelength]);

    const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;

        setSources(prev => {
            const newSrc: WaveSource = { x, y, id: _nextId++ };
            const next = prev.length >= 2 ? [prev[1], newSrc] : [...prev, newSrc];
            sourcesRef.current = next;
            return next;
        });
    }, []);

    const handleClear = useCallback(() => {
        setSources([]);
        sourcesRef.current = [];
    }, []);

    const handleFreeze = useCallback(() => {
        setFrozen(f => {
            frozenRef.current = !f;
            return !f;
        });
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const W = canvas.width;
        const H = canvas.height;

        // Offscreen canvas at reduced resolution for performance
        const SCALE = 3;
        const oW = Math.ceil(W / SCALE);
        const oH = Math.ceil(H / SCALE);
        const offCanvas = document.createElement('canvas');
        offCanvas.width = oW;
        offCanvas.height = oH;
        const offCtx = offCanvas.getContext('2d')!;

        let time = 0;
        let animId: number;

        const render = () => {
            animId = requestAnimationFrame(render);
            if (!frozenRef.current) time += 0.13;

            const srcs = sourcesRef.current;
            const wl = wavelengthRef.current;

            // Background
            ctx.fillStyle = '#030810';
            ctx.fillRect(0, 0, W, H);

            if (srcs.length === 0) {
                ctx.fillStyle = 'rgba(255,255,255,0.18)';
                ctx.font = '600 16px Inter, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('Click anywhere to drop a wave source', W / 2, H / 2 - 10);
                ctx.fillStyle = 'rgba(255,255,255,0.08)';
                ctx.font = '13px Inter, sans-serif';
                ctx.fillText('Add a second source to create an interference pattern', W / 2, H / 2 + 14);
                ctx.textAlign = 'left';
                return;
            }

            // Compute wave amplitude per pixel (at reduced resolution)
            const imageData = offCtx.createImageData(oW, oH);
            const data = imageData.data;

            for (let py = 0; py < oH; py++) {
                for (let px = 0; px < oW; px++) {
                    const wx = px * SCALE;
                    const wy = py * SCALE;
                    let amplitude = 0;
                    for (const src of srcs) {
                        const dx = wx - src.x;
                        const dy = wy - src.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        // Amplitude falls off with distance (1/sqrt(r) for 2D), with min falloff
                        const falloff = Math.min(1, 60 / (dist + 25));
                        amplitude += falloff * Math.sin((dist / wl) * Math.PI * 2 - time * speedRef.current);
                    }
                    amplitude /= srcs.length;
                    // Clamp
                    amplitude = Math.max(-1, Math.min(1, amplitude));

                    const idx = (py * oW + px) * 4;
                    if (amplitude > 0) {
                        // Constructive: cyan glow
                        data[idx]     = Math.round(amplitude * 40);
                        data[idx + 1] = Math.round(amplitude * 210);
                        data[idx + 2] = Math.round(amplitude * 220);
                        data[idx + 3] = Math.round(amplitude * 255 + 15);
                    } else {
                        // Destructive: deep purple
                        const a = -amplitude;
                        data[idx]     = Math.round(a * 120);
                        data[idx + 1] = Math.round(a * 20);
                        data[idx + 2] = Math.round(a * 190);
                        data[idx + 3] = Math.round(a * 230 + 15);
                    }
                }
            }

            offCtx.putImageData(imageData, 0, 0);
            ctx.drawImage(offCanvas, 0, 0, W, H);

            // Draw wave sources with animated expanding rings
            for (const src of srcs) {
                // Outward rings — more rings, thicker, brighter
                for (let ring = 0; ring < 7; ring++) {
                    const phase = ((time * 0.55 + ring * 0.143) % 1);
                    const ringR = phase * wl * 2.2;
                    const alpha = (1 - phase) * 0.8;
                    ctx.beginPath();
                    ctx.arc(src.x, src.y, ringR, 0, Math.PI * 2);
                    ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
                    ctx.lineWidth = 2.5;
                    ctx.stroke();
                }
                // Core dot
                ctx.beginPath();
                ctx.arc(src.x, src.y, 9, 0, Math.PI * 2);
                ctx.fillStyle = '#06b6d4';
                ctx.shadowColor = '#06b6d4';
                ctx.shadowBlur = 24;
                ctx.fill();
                ctx.shadowBlur = 0;
                ctx.beginPath();
                ctx.arc(src.x, src.y, 5, 0, Math.PI * 2);
                ctx.fillStyle = 'white';
                ctx.fill();
            }
        };

        render();
        return () => cancelAnimationFrame(animId);
    }, []);

    return (
        <div className="w-full bg-[#030810] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="p-5 border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Waves className="w-5 h-5 text-brand-cyan" />
                        Wave Interference Pond
                    </h3>
                    <p className="text-sm text-gray-400 mt-0.5">Click to place wave sources (max 2). Watch interference form in real time.</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={handleFreeze}
                        className={`px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 border transition-all ${frozen
                            ? 'bg-brand-cyan/20 border-brand-cyan/50 text-brand-cyan'
                            : 'bg-white/5 border-white/20 text-gray-300 hover:bg-white/10'}`}
                    >
                        {frozen ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                        {frozen ? 'Resume' : 'Freeze'}
                    </button>
                    <button
                        onClick={handleClear}
                        className="px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 bg-white/5 border border-white/20 text-gray-300 hover:bg-white/10 transition-all"
                    >
                        <Trash2 className="w-4 h-4" />
                        Clear
                    </button>
                </div>
            </div>

            {/* Canvas */}
            <canvas
                ref={canvasRef}
                width={900}
                height={400}
                className="w-full block cursor-crosshair"
                onClick={handleCanvasClick}
            />

            {/* Bottom bar */}
            <div className="p-5 bg-black/30 border-t border-white/5 flex flex-wrap items-center gap-8">
                <div className="flex-1 min-w-48 space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-brand-cyan font-semibold">Wavelength</span>
                        <span className="text-gray-400 font-mono">{wavelength} units</span>
                    </div>
                    <input
                        type="range" min="18" max="85" value={wavelength}
                        onChange={e => setWavelength(Number(e.target.value))}
                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-cyan"
                    />
                    <p className="text-xs text-gray-500">Shorter wavelength = tighter interference fringes</p>
                </div>
                <div className="flex gap-5 text-xs text-gray-400">
                    <span className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-sm bg-cyan-400 inline-block shadow-[0_0_6px_#22d3ee]" />
                        Constructive (crests meet)
                    </span>
                    <span className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-sm bg-purple-600 inline-block" />
                        Destructive (crest + trough)
                    </span>
                    <span className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-white inline-block" />
                        Wave source
                    </span>
                </div>
            </div>
        </div>
    );
}
