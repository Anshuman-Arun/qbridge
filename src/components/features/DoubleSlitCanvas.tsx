'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { RotateCcw, Zap } from 'lucide-react';

interface TravelingDot {
    x: number;        // current x
    y: number;        // current y from gun
    targetY: number;  // target position on screen
    speed: number;
    phase: number;    // which slit it "passed through" (for drawing path)
    active: boolean;
}

// Sample a y-position on the screen according to double-slit probability
// P(y) ∝ cos²(π·d·sin(θ)/λ) × Gaussian envelope
function sampleScreenY(
    screenH: number,
    slitSep: number,   // pixels
    wavelength: number, // relative
    screenDist: number
): number {
    const maxTries = 500;
    for (let i = 0; i < maxTries; i++) {
        const y = (Math.random() - 0.5) * screenH * 0.95;
        const sinTheta = y / Math.sqrt(y * y + screenDist * screenDist);
        const phase = Math.PI * slitSep * sinTheta / wavelength;
        const interference = Math.cos(phase) ** 2;
        // Gaussian envelope keeps most hits near center
        const envelope = Math.exp(-(y * y) / (2 * (screenH * 0.28) ** 2));
        if (Math.random() < interference * envelope) return y;
    }
    return 0;
}

export function DoubleSlitCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [slitSep, setSlitSep] = useState(60);
    const [wavelength, setWavelength] = useState(40);
    const [oneAtATime, setOneAtATime] = useState(false);
    const [totalShots, setTotalShots] = useState(0);

    const slitSepRef = useRef(60);
    const wavelengthRef = useRef(40);
    const oneAtATimeRef = useRef(false);
    const resetRef = useRef(false);

    useEffect(() => { slitSepRef.current = slitSep; }, [slitSep]);
    useEffect(() => { wavelengthRef.current = wavelength; }, [wavelength]);
    useEffect(() => { oneAtATimeRef.current = oneAtATime; }, [oneAtATime]);

    const handleReset = useCallback(() => { resetRef.current = true; }, []);

    const handleSliderChange = useCallback(() => { resetRef.current = true; }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const W = canvas.width;
        const H = canvas.height;

        // Layout constants
        const GUN_X = 50;
        const GUN_Y = H / 2;
        const BARRIER_X = Math.round(W * 0.42);
        const BARRIER_W = 12;
        const SCREEN_X = Math.round(W * 0.75);
        const SCREEN_W = 8;
        const SLIT_HALF_H = 8; // half height of each slit gap

        // Hit histogram: screen height buckets
        let hitMap: Float32Array = new Float32Array(H);
        let shotCount = 0;
        const dots: TravelingDot[] = [];
        let frame = 0;
        let animId: number;
        let liveShotCount = 0;

        const SCREEN_DIST = SCREEN_X - BARRIER_X;

        const spawnDot = () => {
            const sep = slitSepRef.current;
            const wl = wavelengthRef.current;
            const targetY = GUN_Y + sampleScreenY(H * 0.92, sep, wl, SCREEN_DIST);
            // choose upper or lower slit for trajectory
            const slit = targetY > GUN_Y ? 1 : -1;
            dots.push({
                x: GUN_X + 24,
                y: GUN_Y,
                targetY,
                speed: 5.5 + Math.random() * 1.5,
                phase: slit,
                active: true,
            });
            shotCount++;
            liveShotCount++;
        };

        const render = () => {
            animId = requestAnimationFrame(render);
            frame++;

            if (resetRef.current) {
                hitMap = new Float32Array(H);
                dots.length = 0;
                shotCount = 0;
                liveShotCount = 0;
                resetRef.current = false;
            }

            const sep = slitSepRef.current;
            const oneAt = oneAtATimeRef.current;

            // ── Background ───────────────────────────────────────────────────
            ctx.fillStyle = '#050510';
            ctx.fillRect(0, 0, W, H);

            // Subtle grid
            ctx.strokeStyle = 'rgba(255,255,255,0.025)';
            ctx.lineWidth = 1;
            for (let gx = 0; gx < W; gx += 50) { ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H); ctx.stroke(); }
            for (let gy = 0; gy < H; gy += 50) { ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke(); }

            // ── Electron gun ─────────────────────────────────────────────────
            ctx.fillStyle = '#374151';
            ctx.fillRect(GUN_X - 24, GUN_Y - 18, 26, 36);
            ctx.fillStyle = '#1f2937';
            ctx.fillRect(GUN_X - 24, GUN_Y - 18, 6, 36);
            // Nozzle glow
            const gunGlow = ctx.createRadialGradient(GUN_X, GUN_Y, 2, GUN_X, GUN_Y, 18);
            gunGlow.addColorStop(0, 'rgba(168, 85, 247, 0.7)');
            gunGlow.addColorStop(1, 'transparent');
            ctx.fillStyle = gunGlow;
            ctx.beginPath();
            ctx.arc(GUN_X, GUN_Y, 18, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#9333ea';
            ctx.font = 'bold 9px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('e⁻', GUN_X - 10, GUN_Y - 22);
            ctx.fillText('GUN', GUN_X - 10, GUN_Y + 32);
            ctx.textAlign = 'left';

            // ── Barrier ───────────────────────────────────────────────────────
            const topSlitCenter = GUN_Y - sep / 2;
            const botSlitCenter = GUN_Y + sep / 2;

            // Draw barrier as 3 segments (top, mid, bot), leaving slit gaps
            ctx.fillStyle = '#6b7280';
            const barrierSegments = [
                [0, topSlitCenter - SLIT_HALF_H],
                [topSlitCenter + SLIT_HALF_H, botSlitCenter - SLIT_HALF_H],
                [botSlitCenter + SLIT_HALF_H, H],
            ];
            for (const [t, b] of barrierSegments) {
                if (b > t) {
                    ctx.fillRect(BARRIER_X, t, BARRIER_W, b - t);
                }
            }

            // Slit glow
            const slitGlow = ctx.createLinearGradient(BARRIER_X, 0, BARRIER_X + 30, 0);
            slitGlow.addColorStop(0, 'rgba(168,85,247,0.4)');
            slitGlow.addColorStop(1, 'transparent');
            ctx.fillStyle = slitGlow;
            ctx.fillRect(BARRIER_X, topSlitCenter - SLIT_HALF_H, 30, SLIT_HALF_H * 2);
            ctx.fillRect(BARRIER_X, botSlitCenter - SLIT_HALF_H, 30, SLIT_HALF_H * 2);

            // Barrier labels
            ctx.fillStyle = '#9ca3af';
            ctx.font = '10px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('BARRIER', BARRIER_X + BARRIER_W / 2, H - 10);
            ctx.textAlign = 'left';

            // ── Detector screen ───────────────────────────────────────────────
            ctx.fillStyle = 'rgba(255,255,255,0.06)';
            ctx.fillRect(SCREEN_X, 20, SCREEN_W, H - 40);
            ctx.fillStyle = '#6b7280';
            ctx.font = '10px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('SCREEN', SCREEN_X + SCREEN_W / 2, H - 10);
            ctx.textAlign = 'left';

            // ── Draw hit histogram (interference pattern built up) ────────────
            const maxHit = Math.max(1, ...hitMap);
            const HIST_W = W - (SCREEN_X + SCREEN_W + 10);
            for (let y = 0; y < H; y++) {
                if (hitMap[y] > 0) {
                    const intensity = hitMap[y] / maxHit;
                    const barW = intensity * Math.min(HIST_W, 200);
                    // Color: purple → white gradient based on intensity
                    const r = Math.round(100 + intensity * 155);
                    const g = Math.round(50 + intensity * 150);
                    const b = Math.round(255);
                    ctx.fillStyle = `rgba(${r},${g},${b},${0.5 + intensity * 0.5})`;
                    ctx.fillRect(SCREEN_X + SCREEN_W + 2, y, barW, 1.5);
                }
            }

            // ── Theoretical probability curve overlay ──────────────────────────
            // Shows the envelope the dots should be following.
            // Drawn as a faint glowing curve to the RIGHT of the histogram area.
            const curveX = SCREEN_X + SCREEN_W + 5;
            const curveTotalWidth = Math.min(HIST_W, 200);
            const hasSomeData = maxHit > 5;
            if (hasSomeData) {
                ctx.beginPath();
                let first = true;
                for (let y = 20; y < H - 20; y++) {
                    const dy = y - GUN_Y;
                    const sinT = dy / Math.sqrt(dy * dy + SCREEN_DIST * SCREEN_DIST);
                    const ph = Math.PI * slitSepRef.current * sinT / wavelengthRef.current;
                    const probY = Math.cos(ph) ** 2 * Math.exp(-(dy * dy) / (2 * (H * 0.29) ** 2));
                    const px2 = curveX + probY * curveTotalWidth;
                    if (first) { ctx.moveTo(px2, y); first = false; }
                    else ctx.lineTo(px2, y);
                }
                ctx.strokeStyle = 'rgba(250,204,21,0.5)';
                ctx.lineWidth = 1.5;
                ctx.setLineDash([4, 4]);
                ctx.stroke();
                ctx.setLineDash([]);

                // Label
                ctx.fillStyle = 'rgba(250,204,21,0.6)';
                ctx.font = '9px Inter, sans-serif';
                ctx.fillText('P(y) curve', curveX + 2, 18);
            }

            // ── Spawn new dots ────────────────────────────────────────────────
            if (oneAt) {
                // One at a time: only fire when no active dot
                if (dots.length === 0 && frame % 30 === 0) spawnDot();
            } else {
                const spawnEvery = 2;
                if (frame % spawnEvery === 0) spawnDot();
            }

            // ── Update + draw traveling dots ──────────────────────────────────
            for (let i = dots.length - 1; i >= 0; i--) {
                const d = dots[i];
                if (!d.active) { dots.splice(i, 1); continue; }

                // Move toward barrier, then toward target
                const progToBarrier = Math.max(0, Math.min(1, (d.x - (GUN_X + 24)) / (BARRIER_X - GUN_X - 24)));
                const slitY = d.phase > 0 ? botSlitCenter : topSlitCenter;
                const targetYPre = slitY;

                if (d.x < BARRIER_X) {
                    // Moving toward barrier, aim at slit
                    const dx = BARRIER_X - d.x;
                    const dy = targetYPre - d.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    d.x += (dx / dist) * d.speed;
                    d.y += (dy / dist) * d.speed;
                } else {
                    // Past barrier, moving toward screen target
                    const dx = SCREEN_X - d.x;
                    const dy = d.targetY - d.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    d.x += (dx / dist) * d.speed;
                    d.y += (dy / dist) * d.speed;
                }

                // Draw dot — fade out as it approaches screen
                const distToScreen = SCREEN_X - d.x;
                const fadeAlpha = d.x < BARRIER_X ? 0.9 : Math.min(1, distToScreen / 40);
                ctx.beginPath();
                ctx.arc(d.x, d.y, 3.5, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(192,132,252,${fadeAlpha})`;
                ctx.shadowColor = '#a855f7';
                ctx.shadowBlur = fadeAlpha > 0.5 ? 12 : 4;
                ctx.fill();
                ctx.shadowBlur = 0;

                // Hit screen — register hit and quietly remove
                if (d.x >= SCREEN_X - 4) {
                    const hitY = Math.round(d.y);
                    if (hitY >= 0 && hitY < H) {
                        hitMap[hitY] = Math.min(hitMap[hitY] + 1, 200);
                        // Also smear to neighbors (line thickness)
                        for (let dy2 = -1; dy2 <= 1; dy2++) {
                            const ny = hitY + dy2;
                            if (ny >= 0 && ny < H) hitMap[ny] = Math.min(hitMap[ny] + 0.4, 200);
                        }
                    }
                    dots.splice(i, 1);
                }
            }

            // ── Stats overlay ─────────────────────────────────────────────────
            ctx.fillStyle = 'rgba(0,0,0,0.5)';
            ctx.fillRect(GUN_X + 10, H - 38, 145, 28);
            ctx.fillStyle = '#9ca3af';
            ctx.font = '11px "SF Mono", monospace';
            ctx.fillText(`Electrons fired: ${shotCount.toLocaleString()}`, GUN_X + 16, H - 19);

            // Update React state every 20 frames
            if (frame % 20 === 0) setTotalShots(shotCount);
        };

        render();
        return () => cancelAnimationFrame(animId);
    }, []);

    return (
        <div className="w-full bg-[#050510] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Zap className="w-5 h-5 text-purple-400" />
                        Double Slit Simulator
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">
                        Watch the interference pattern build dot-by-dot. Adjust slit spacing and wavelength to see the fringes shift live.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => { setOneAtATime(v => !v); }}
                        className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${oneAtATime
                            ? 'bg-purple-500/20 border-purple-500/50 text-purple-300'
                            : 'bg-white/5 border-white/20 text-gray-300 hover:bg-white/10'}`}
                    >
                        {oneAtATime ? '⚡ One at a time' : '⚡ Continuous fire'}
                    </button>
                    <button
                        onClick={handleReset}
                        className="px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 bg-white/5 border border-white/20 text-gray-300 hover:bg-white/10 transition-all"
                    >
                        <RotateCcw className="w-4 h-4" />
                        Reset
                    </button>
                </div>
            </div>

            {/* Canvas */}
            <canvas ref={canvasRef} width={900} height={380} className="w-full block" />

            {/* Controls */}
            <div className="p-6 bg-black/40 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                        <span className="text-purple-400 font-semibold uppercase tracking-wider">Slit Separation (d)</span>
                        <span className="text-gray-400 font-mono">{slitSep} units</span>
                    </div>
                    <input
                        type="range" min="25" max="120" value={slitSep}
                        onChange={e => { setSlitSep(Number(e.target.value)); handleSliderChange(); }}
                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-400"
                    />
                    <p className="text-xs text-gray-500">Greater separation → tighter, more closely spaced fringes</p>
                </div>
                <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                        <span className="text-brand-cyan font-semibold uppercase tracking-wider">de Broglie Wavelength (λ)</span>
                        <span className="text-gray-400 font-mono">{wavelength} units</span>
                    </div>
                    <input
                        type="range" min="15" max="80" value={wavelength}
                        onChange={e => { setWavelength(Number(e.target.value)); handleSliderChange(); }}
                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-cyan"
                    />
                    <p className="text-xs text-gray-500">Longer wavelength → wider fringes spread further apart</p>
                </div>
            </div>
            <div className="px-6 pb-4 bg-black/40">
                <p className="text-xs text-gray-600 italic">
                    The pattern is real — each dot lands randomly, but governed by the wave probability P(y) ∝ cos²(πd·sinθ/λ). Given enough electrons, the interference structure inevitably emerges.
                </p>
            </div>
        </div>
    );
}
