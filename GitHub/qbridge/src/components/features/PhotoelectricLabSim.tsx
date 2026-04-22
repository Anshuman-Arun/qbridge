'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Zap } from 'lucide-react';

interface Photon {
    x: number;
    y: number;
    vy: number;
    color: string;
    speed: number;
}

interface EjectedElectron {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
}

const THRESHOLD_FREQ = 52; // 0-100 scale

function freqToColor(f: number): string {
    if (f < 18) return '#f87171';
    if (f < 33) return '#fb923c';
    if (f < 48) return '#facc15';
    if (f < 60) return '#4ade80';
    if (f < 78) return '#60a5fa';
    return '#c084fc';
}

function freqToTHz(f: number): number {
    return Math.round(380 + (f / 100) * 390);
}

function photonEnergyEV(f: number): number {
    // Planck: E = hf. Map 0-100 to ~1.6-3.2 eV range (visible spectrum)
    return 1.6 + (f / 100) * 1.6;
}

export function PhotoelectricLabSim() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [frequency, setFrequency] = useState(28);
    const [intensity, setIntensity] = useState(60);
    const [current, setCurrent] = useState(0);

    const stateRef = useRef({ frequency: 28, intensity: 60 });

    useEffect(() => {
        stateRef.current = { frequency, intensity };
    }, [frequency, intensity]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const W = canvas.width;
        const H = canvas.height;

        const photons: Photon[] = [];
        const electrons: EjectedElectron[] = [];
        let frame = 0;
        let animId: number;
        let liveCurrentCount = 0;

        // Metal block geometry
        const METAL_X = Math.round(W * 0.63);
        const METAL_W = 22;
        const METAL_TOP = Math.round(H * 0.18);
        const METAL_BOT = Math.round(H * 0.82);
        const METAL_H = METAL_BOT - METAL_TOP;
        const SOURCE_X = 52;
        const SOURCE_Y = H / 2;

        const render = () => {
            animId = requestAnimationFrame(render);
            frame++;

            const freq = stateRef.current.frequency;
            const intens = stateRef.current.intensity;
            const above = freq > THRESHOLD_FREQ;
            const col = freqToColor(freq);

            ctx.clearRect(0, 0, W, H);

            // ── Background ──────────────────────────────────────────────────
            ctx.fillStyle = '#06060f';
            ctx.fillRect(0, 0, W, H);

            // grid lines (subtle)
            ctx.strokeStyle = 'rgba(255,255,255,0.03)';
            ctx.lineWidth = 1;
            for (let gx = 0; gx < W; gx += 60) { ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H); ctx.stroke(); }
            for (let gy = 0; gy < H; gy += 60) { ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke(); }

            // ── Light Source glow region ─────────────────────────────────────
            const glowGrad = ctx.createRadialGradient(SOURCE_X, SOURCE_Y, 5, SOURCE_X, SOURCE_Y, 90);
            glowGrad.addColorStop(0, col + 'aa');
            glowGrad.addColorStop(1, 'transparent');
            ctx.fillStyle = glowGrad;
            ctx.fillRect(0, 0, 200, H);

            // ── Source lamp ──────────────────────────────────────────────────
            ctx.beginPath();
            ctx.arc(SOURCE_X, SOURCE_Y, 22, 0, Math.PI * 2);
            ctx.fillStyle = col;
            ctx.shadowColor = col;
            ctx.shadowBlur = 40;
            ctx.fill();
            ctx.shadowBlur = 0;

            // Pulsing rings on source
            const intensScale = intens / 100;
            for (let r = 0; r < 4; r++) {
                const phase = ((frame * 0.04 + r * 0.25) % 1);
                const rad = 26 + phase * 50;
                const alpha = (1 - phase) * 0.4 * intensScale;
                ctx.beginPath();
                ctx.arc(SOURCE_X, SOURCE_Y, rad, 0, Math.PI * 2);
                ctx.strokeStyle = col + Math.round(alpha * 255).toString(16).padStart(2, '0');
                ctx.lineWidth = 2;
                ctx.stroke();
            }

            // ── Beam path (from source to metal) ────────────────────────────
            const beamGrad = ctx.createLinearGradient(SOURCE_X + 22, SOURCE_Y, METAL_X, SOURCE_Y);
            beamGrad.addColorStop(0, col + Math.round(0.35 * intensScale * 255).toString(16).padStart(2, '0'));
            beamGrad.addColorStop(1, 'transparent');
            ctx.fillStyle = beamGrad;
            const halfBeam = 4 + intensScale * 12;
            ctx.fillRect(SOURCE_X + 22, SOURCE_Y - halfBeam, METAL_X - SOURCE_X - 22, halfBeam * 2);

            // ── Metal block ──────────────────────────────────────────────────
            const mGrad = ctx.createLinearGradient(METAL_X, 0, METAL_X + METAL_W, 0);
            mGrad.addColorStop(0, '#5a5a7a');
            mGrad.addColorStop(0.5, '#3a3a5a');
            mGrad.addColorStop(1, '#2a2a3a');
            ctx.fillStyle = mGrad;
            ctx.shadowColor = 'transparent';
            ctx.fillRect(METAL_X, METAL_TOP, METAL_W, METAL_H);

            // Metal shine
            ctx.fillStyle = 'rgba(255,255,255,0.07)';
            ctx.fillRect(METAL_X + 2, METAL_TOP + 2, 4, METAL_H - 4);

            // Electrons inside metal (before ejection)
            const eDots = 16;
            for (let i = 0; i < eDots; i++) {
                const col2 = i % 4;
                const row2 = Math.floor(i / 4);
                const ex = METAL_X + 4 + col2 * 4;
                const ey = METAL_TOP + 20 + row2 * (METAL_H / 5.5);
                ctx.beginPath();
                ctx.arc(ex, ey, 2.5, 0, Math.PI * 2);
                ctx.fillStyle = above ? '#93c5fd' : '#4b5563';
                ctx.shadowColor = above ? '#60a5fa' : 'transparent';
                ctx.shadowBlur = above ? 8 : 0;
                ctx.fill();
                ctx.shadowBlur = 0;
            }

            // Metal label
            ctx.fillStyle = '#9ca3af';
            ctx.font = 'bold 11px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('METAL', METAL_X + METAL_W / 2, METAL_BOT + 18);
            ctx.textAlign = 'left';


            // ── Detector screen (right) ──────────────────────────────────────
            const SCREEN_X = W - 45;
            ctx.fillStyle = 'rgba(255,255,255,0.06)';
            ctx.fillRect(SCREEN_X, METAL_TOP, 8, METAL_H);
            ctx.fillStyle = '#6b7280';
            ctx.font = '10px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('DETECTOR', SCREEN_X + 4, METAL_BOT + 18);
            ctx.textAlign = 'left';

            // ── Spawn photons ────────────────────────────────────────────────
            const spawnEvery = Math.max(1, Math.round(9 - (intens / 100) * 7));
            if (frame % spawnEvery === 0) {
                const spread = (intens / 100) * 55;
                photons.push({
                    x: SOURCE_X + 24,
                    y: SOURCE_Y + (Math.random() - 0.5) * spread,
                    vy: (Math.random() - 0.5) * 0.4,
                    color: freqToColor(freq),
                    speed: 5 + Math.random() * 2,
                });
            }

            // ── Update + draw photons ────────────────────────────────────────
            liveCurrentCount = 0;
            for (let i = photons.length - 1; i >= 0; i--) {
                photons[i].x += photons[i].speed;
                photons[i].y += photons[i].vy;
                const p = photons[i];

                if (p.x >= METAL_X && p.x <= METAL_X + METAL_W && p.y >= METAL_TOP && p.y <= METAL_BOT) {
                    if (above && Math.random() < 0.75) {
                        // Eject electron!
                        const excess = ((freq - THRESHOLD_FREQ) / 48) * 4;
                        electrons.push({
                            x: METAL_X + METAL_W + 2,
                            y: p.y,
                            vx: 3 + excess + Math.random() * 2,
                            vy: (Math.random() - 0.5) * 3,
                            life: 100,
                        });
                    }
                    photons.splice(i, 1);
                    continue;
                }

                if (p.x > W || p.y < 0 || p.y > H) {
                    photons.splice(i, 1);
                    continue;
                }

                // Draw photon as glowing dot
                ctx.beginPath();
                ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.shadowColor = p.color;
                ctx.shadowBlur = 14;
                ctx.fill();
                ctx.shadowBlur = 0;
            }

            // ── Update + draw ejected electrons ──────────────────────────────
            for (let i = electrons.length - 1; i >= 0; i--) {
                const e = electrons[i];
                e.x += e.vx;
                e.y += e.vy;
                e.life--;
                const alpha = e.life / 100;
                ctx.beginPath();
                ctx.arc(e.x, e.y, 3, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(147, 197, 253, ${alpha})`;
                ctx.shadowColor = `rgba(96, 165, 250, ${alpha * 0.6})`;
                ctx.shadowBlur = 10;
                ctx.fill();
                ctx.shadowBlur = 0;

                if (e.life <= 0 || e.x > W) {
                    electrons.splice(i, 1);
                }
            }
            liveCurrentCount = electrons.length;

            // ── "No current" message ─────────────────────────────────────────
            if (!above && photons.length > 0) {
                ctx.fillStyle = 'rgba(248, 113, 113, 0.7)';
                ctx.font = 'bold 13px Inter, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('No electrons ejected', METAL_X + METAL_W + 80, H / 2);
                ctx.fillStyle = 'rgba(248, 113, 113, 0.4)';
                ctx.font = '11px Inter, sans-serif';
                ctx.fillText('(even at full intensity)', METAL_X + METAL_W + 80, H / 2 + 16);
                ctx.textAlign = 'left';
            }
        };

        render();
        const currentInterval = setInterval(() => {
            setCurrent(liveCurrentCount);
        }, 150);

        return () => {
            cancelAnimationFrame(animId);
            clearInterval(currentInterval);
        };
    }, []);

    const freq = frequency;
    const above = freq > THRESHOLD_FREQ;
    const col = freqToColor(freq);
    const E = photonEnergyEV(freq).toFixed(2);

    return (
        <div className="w-full bg-[#06060f] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Zap className="w-5 h-5 text-yellow-400" />
                        Photoelectric Effect Lab
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">Adjust frequency and intensity to see what Einstein discovered.</p>
                </div>
                <div className="flex gap-6">
                    <div className="text-right">
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Photon Energy (E = hf)</p>
                        <p className="text-2xl font-mono font-bold" style={{ color: col }}>{E} eV</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Electrons Ejected / sec</p>
                        <p className={`text-2xl font-mono font-bold ${above ? 'text-blue-400' : 'text-gray-600'}`}>
                            {above ? `~${Math.round(current * 3 * (intensity / 100))}` : '0'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Canvas */}
            <canvas ref={canvasRef} width={900} height={340} className="w-full block" />

            {/* Controls */}
            <div className="p-6 bg-black/40 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                        <span className="font-semibold uppercase tracking-wider" style={{ color: col }}>Light Frequency / Color</span>
                        <span className="text-gray-400 font-mono">{freqToTHz(freq)} THz</span>
                    </div>
                    <div className="relative h-3">
                        <div className="absolute inset-0 rounded-full" style={{
                            background: 'linear-gradient(to right, #f87171, #fb923c, #facc15, #4ade80, #60a5fa, #c084fc)'
                        }} />
                        <input
                            type="range" min="0" max="100" value={freq}
                            onChange={e => setFrequency(Number(e.target.value))}
                            className="absolute inset-0 w-full opacity-0 cursor-pointer"
                        />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                        <span>Infrared / Red (low energy)</span>
                        <span>Violet / UV (high energy)</span>
                    </div>
                    <div className={`text-xs px-3 py-2 rounded-lg border font-medium ${above
                        ? 'bg-green-500/10 border-green-500/30 text-green-400'
                        : 'bg-red-500/10 border-red-500/30 text-red-400'}`}>
                        {above
                            ? '✓ Above threshold — each photon has enough energy to knock an electron loose.'
                            : '✗ Below threshold — photon energy too low. Nothing happens even at max brightness.'}
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-200 font-semibold uppercase tracking-wider">Light Intensity (Brightness)</span>
                        <span className="text-gray-400 font-mono">{intensity}%</span>
                    </div>
                    <input
                        type="range" min="5" max="100" value={intensity}
                        onChange={e => setIntensity(Number(e.target.value))}
                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-yellow-400"
                    />
                    <p className="text-xs text-gray-500 italic leading-relaxed">
                        {above
                            ? 'More intensity = more photons per second = more electrons ejected. But their individual energy stays at E = hf.'
                            : 'Crank intensity all the way to 100% with red light. Zero electrons escape — numbers alone cannot overcome the energy threshold.'}
                    </p>
                </div>
            </div>
        </div>
    );
}
