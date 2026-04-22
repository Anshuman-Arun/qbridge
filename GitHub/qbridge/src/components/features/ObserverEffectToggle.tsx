'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Eye, EyeOff } from 'lucide-react';

/**
 * ObserverEffectToggle — Complete redesign.
 *
 * Shows a side-view (not top-down) of the experiment with clear animated waves/particles.
 *
 * WAVE MODE (observer OFF):
 *   - Gun fires a "wave packet" that spreads as it approaches the barrier
 *   - Fan of arcs emerges from both slits and travels all the way to the screen
 *   - Screen accumulates an interference histogram
 *
 * PARTICLE MODE (observer ON):
 *   - Gun fires a straight bullet-dot
 *   - A red scan beam lights up whichever slit the particle passes through
 *   - Dot continues in a straight line and hits screen in one of two clump zones
 *   - Screen shows two classical bands
 */

interface AnimDot {
    x: number;
    y: number;
    targetY: number;
    speed: number;
    phase: number; // -1 top slit, 1 bot slit
    state: 'pre' | 'post'; // before or after barrier
}

export function ObserverEffectToggle() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [observed, setObserved] = useState(false);
    const observedRef = useRef(false);
    const transRef = useRef(0); // 0=wave, 1=particle

    const handleToggle = () => {
        const next = !observed;
        setObserved(next);
        observedRef.current = next;
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const W = canvas.width;
        const H = canvas.height;

        const GUN_X = 55;
        const GUN_Y = H / 2;
        const BARRIER_X = Math.round(W * 0.40);
        const BW = 14;
        const SCREEN_X = Math.round(W * 0.76);
        const SLIT_SEP = 72;
        const SLIT_H = 14;
        const TOP_Y = GUN_Y - SLIT_SEP / 2;
        const BOT_Y = GUN_Y + SLIT_SEP / 2;
        const SCREEN_DIST = SCREEN_X - BARRIER_X;

        // Pre-compute histograms
        const waveHist = new Float32Array(H);
        const partHist = new Float32Array(H);
        for (let y = 0; y < H; y++) {
            const dy = y - GUN_Y;
            const sinT = dy / Math.sqrt(dy * dy + SCREEN_DIST * SCREEN_DIST);
            const ph = Math.PI * SLIT_SEP * sinT / 32;
            waveHist[y] = Math.cos(ph) ** 2 * Math.exp(-(dy * dy) / (2 * (H * 0.32) ** 2));
        }
        const SPREAD = 4;
        for (let y = 0; y < H; y++) {
            const d1 = y - TOP_Y, d2 = y - BOT_Y;
            partHist[y] = 0.5 * Math.exp(-(d1 * d1) / (2 * SPREAD ** 2))
                        + 0.5 * Math.exp(-(d2 * d2) / (2 * SPREAD ** 2));
        }

        // Wave arcs state — animated fan arcs from slits to screen
        // We store a time offset that drives the arc animation
        let time = 0;
        let frame = 0;
        let animId: number;

        // Particle dots (particle mode)
        const dots: AnimDot[] = [];

        const spawnDot = () => {
            // Pick slit randomly
            const ph = Math.random() < 0.5 ? -1 : 1;
            const slitY = ph < 0 ? TOP_Y : BOT_Y;
            // Target Y in particle mode: Gaussian clump around slit
            const targetY = slitY + (Math.random() + Math.random() - 1) * SPREAD;
            dots.push({ x: GUN_X + 26, y: GUN_Y, targetY, speed: 4.5, phase: ph, state: 'pre' });
        };

        const render = () => {
            animId = requestAnimationFrame(render);
            frame++;
            time += 0.025;

            const obs = observedRef.current;
            const target = obs ? 1 : 0;
            transRef.current += (target - transRef.current) * 0.04;
            const t = transRef.current;
            const wa = 1 - t; // wave alpha
            const pa = t;     // particle alpha

            ctx.clearRect(0, 0, W, H);
            ctx.fillStyle = '#040812';
            ctx.fillRect(0, 0, W, H);

            // ── Grid ──────────────────────────────────────────────────────────
            ctx.strokeStyle = 'rgba(255,255,255,0.02)';
            ctx.lineWidth = 1;
            for (let gx = 0; gx < W; gx += 50) { ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H); ctx.stroke(); }
            for (let gy = 0; gy < H; gy += 50) { ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke(); }

            // ── Gun ──────────────────────────────────────────────────────────
            const gunCol = obs ? '#ef4444' : '#a855f7';
            ctx.fillStyle = '#374151';
            ctx.fillRect(GUN_X - 28, GUN_Y - 18, 28, 36);
            ctx.fillStyle = '#1f2937';
            ctx.fillRect(GUN_X - 28, GUN_Y - 18, 7, 36);
            const gg = ctx.createRadialGradient(GUN_X, GUN_Y, 1, GUN_X, GUN_Y, 20);
            gg.addColorStop(0, gunCol + 'dd');
            gg.addColorStop(1, 'transparent');
            ctx.fillStyle = gg;
            ctx.beginPath(); ctx.arc(GUN_X, GUN_Y, 20, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#9ca3af';
            ctx.font = 'bold 9px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('e⁻ GUN', GUN_X - 14, GUN_Y + 32);
            ctx.textAlign = 'left';

            // ── WAVE MODE visuals ─────────────────────────────────────────────
            if (wa > 0.02) {

                // Incoming spread (wave expanding toward barrier)
                for (let ring = 0; ring < 5; ring++) {
                    const ph = ((time * 0.7 + ring * 0.2) % 1);
                    const r = ph * (BARRIER_X - GUN_X);
                    const maxAng = Math.atan2(H * 0.45, r + 1);
                    const alpha = wa * (1 - ph) * 0.5;
                    ctx.beginPath();
                    ctx.arc(GUN_X, GUN_Y, r, -maxAng, maxAng);
                    ctx.strokeStyle = `rgba(168,85,247,${alpha})`;
                    ctx.lineWidth = 2;
                    ctx.stroke();
                }

                // Outgoing fans from BOTH slits — go all the way to the screen
                for (const slitY of [TOP_Y, BOT_Y]) {
                    for (let ring = 0; ring < 8; ring++) {
                        const ph = ((time * 0.95 + ring * 0.125) % 1); // slightly boosted inner mult to keep fans moving OK despite global time reduction
                        const r = ph * (SCREEN_X - BARRIER_X - BW);
                        const maxAng = Math.min(Math.PI * 0.65, Math.atan2(H * 0.5, r + 1));
                        const alpha = wa * (1 - ph) * 0.55;
                        ctx.beginPath();
                        ctx.arc(BARRIER_X + BW, slitY, r, -maxAng, maxAng);
                        ctx.strokeStyle = `rgba(168,85,247,${alpha})`;
                        ctx.lineWidth = 1.8;
                        ctx.stroke();
                    }
                }
            }

            // ── PARTICLE MODE visuals ─────────────────────────────────────────
            if (pa > 0.02) {
                // Spawn dots at rate based on transition
                if (frame % 35 === 0) spawnDot();

                for (let i = dots.length - 1; i >= 0; i--) {
                    const d = dots[i];
                    const slitY = d.phase < 0 ? TOP_Y : BOT_Y;

                    if (d.state === 'pre') {
                        // Move toward slit
                        const tx = BARRIER_X - 2;
                        const dy = slitY - d.y;
                        const dx = tx - d.x;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        if (dist < d.speed) {
                            d.x = tx; d.y = slitY; d.state = 'post';
                        } else {
                            d.x += (dx / dist) * d.speed;
                            d.y += (dy / dist) * d.speed;
                        }

                        // Draw as straight bullet pre-barrier
                        ctx.beginPath(); ctx.arc(d.x, d.y, 4, 0, Math.PI * 2);
                        ctx.fillStyle = `rgba(239,68,68,${pa * 0.9})`;
                        ctx.shadowColor = '#ef4444'; ctx.shadowBlur = 14;
                        ctx.fill(); ctx.shadowBlur = 0;

                    } else {
                        // Move toward screen target
                        const dx = SCREEN_X - d.x;
                        const dy = d.targetY - d.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        if (dist < d.speed) {
                            dots.splice(i, 1); continue;
                        }
                        d.x += (dx / dist) * d.speed;
                        d.y += (dy / dist) * d.speed;

                        // Draw
                        ctx.beginPath(); ctx.arc(d.x, d.y, 4, 0, Math.PI * 2);
                        ctx.fillStyle = `rgba(239,68,68,${pa * 0.9})`;
                        ctx.shadowColor = '#ef4444'; ctx.shadowBlur = 14;
                        ctx.fill(); ctx.shadowBlur = 0;
                    }
                }

                // Detector flare at slits
                for (const sy of [TOP_Y, BOT_Y]) {
                    const flare = ctx.createRadialGradient(BARRIER_X + BW + 4, sy, 0, BARRIER_X + BW + 4, sy, 28);
                    flare.addColorStop(0, `rgba(239,68,68,${pa * 0.5})`);
                    flare.addColorStop(1, 'transparent');
                    ctx.fillStyle = flare;
                    ctx.fillRect(BARRIER_X + BW, sy - 28, 56, 56);

                    // Eye icon
                    ctx.fillStyle = `rgba(239,68,68,${pa})`;
                    ctx.font = `bold ${Math.round(pa * 14)}px Inter, sans-serif`;
                    ctx.textAlign = 'center';
                    ctx.fillText('👁', BARRIER_X + BW + 16, sy + 5);
                    ctx.textAlign = 'left';
                }
            }

            // ── Barrier ───────────────────────────────────────────────────────
            ctx.fillStyle = '#6b7280';
            const segs = [[0, TOP_Y - SLIT_H / 2], [TOP_Y + SLIT_H / 2, BOT_Y - SLIT_H / 2], [BOT_Y + SLIT_H / 2, H]];
            for (const [s, e] of segs) { if (e > s) ctx.fillRect(BARRIER_X, s, BW, e - s); }

            // Slit labels
            ctx.fillStyle = '#4b5563';
            ctx.font = '9px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('Slit A', BARRIER_X + BW / 2, TOP_Y + 4);
            ctx.fillText('Slit B', BARRIER_X + BW / 2, BOT_Y + 4);
            ctx.fillText('BARRIER', BARRIER_X + BW / 2, H - 10);
            ctx.textAlign = 'left';

            // ── Screen ────────────────────────────────────────────────────────
            ctx.fillStyle = 'rgba(255,255,255,0.06)';
            ctx.fillRect(SCREEN_X, 20, 10, H - 40);
            ctx.fillStyle = '#4b5563';
            ctx.font = '9px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('SCREEN', SCREEN_X + 5, H - 10);
            ctx.textAlign = 'left';

            // ── Pattern on screen ─────────────────────────────────────────────
            const maxW = Math.max(1, ...waveHist);
            const maxP = Math.max(1, ...partHist);
            const HIST_W = W - (SCREEN_X + 14);
            for (let y = 0; y < H; y++) {
                const wI = (waveHist[y] / maxW) * wa;
                const pI = (partHist[y] / maxP) * pa;
                const total = wI + pI;
                if (total < 0.015) continue;
                const bW = total * Math.min(HIST_W, 200);
                const rr = Math.round(140 * wI + 220 * pI);
                const gg2 = Math.round(60 * wI + 60 * pI);
                const bb = Math.round(230 * wI + 80 * pI);
                ctx.fillStyle = `rgba(${rr},${gg2},${bb},${0.45 + total * 0.55})`;
                ctx.fillRect(SCREEN_X + 12, y, bW, 2);
            }

            // ── Mode badge ────────────────────────────────────────────────────
            const mode = t < 0.5 ? 'WAVE MODE — Superposition intact' : 'PARTICLE MODE — Wavefunction collapsed';
            const mColor = t < 0.5 ? '#a855f7' : '#ef4444';
            const bgAlpha = Math.abs(t - 0.5) * 1.6 + 0.3;
            ctx.fillStyle = `rgba(0,0,0,${bgAlpha})`;
            ctx.fillRect(14, H - 44, mode.length * 8 + 12, 32);
            ctx.fillStyle = mColor;
            ctx.font = 'bold 12px Inter, sans-serif';
            ctx.fillText(mode, 20, H - 22);
        };

        render();
        return () => cancelAnimationFrame(animId);
    }, []);

    return (
        <div className="w-full bg-[#040812] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        {observed ? <Eye className="w-5 h-5 text-red-400" /> : <EyeOff className="w-5 h-5 text-purple-400" />}
                        Observer Effect
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">
                        {observed
                            ? 'Detectors are ON at the slits. The electron must pick one path — interference disappears.'
                            : 'No detectors. The electron spreads through both slits — interference pattern builds.'}
                    </p>
                </div>
                <button
                    onClick={handleToggle}
                    className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold text-sm border transition-all ${observed
                        ? 'bg-red-500/15 border-red-500/50 text-red-300 hover:bg-red-500/25'
                        : 'bg-purple-500/15 border-purple-500/50 text-purple-300 hover:bg-purple-500/25'}`}
                >
                    {observed ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    {observed ? 'Observer: ON — Remove' : 'Observer: OFF — Add'}
                </button>
            </div>

            {/* Canvas */}
            <canvas ref={canvasRef} width={900} height={380} className="w-full block" />

            {/* Legend */}
            <div className="p-4 bg-black/30 border-t border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-gray-400">
                <div className="flex items-start gap-2">
                    <span className="w-3 h-3 rounded-full bg-purple-500 mt-0.5 shrink-0" />
                    <span><strong className="text-purple-400">Observer OFF:</strong> Electron spreads through both slits simultaneously → interference fringes on screen</span>
                </div>
                <div className="flex items-start gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500 mt-0.5 shrink-0" />
                    <span><strong className="text-red-400">Observer ON:</strong> Detector sees which slit → wavefunction collapses → two classical bands</span>
                </div>
                <div className="flex items-start gap-2 text-gray-600 italic">
                    <span>The act of measuring which path destroys the interference. Not philosophy — physics.</span>
                </div>
            </div>
        </div>
    );
}
