'use client';

import React, { useState } from 'react';

/**
 * CylinderShadowVisual
 * An SVG illustration showing a cylinder casting two different shadows
 * depending on the viewing angle — Bohr's analogy for wave-particle duality.
 */
export function CylinderShadowVisual() {
    const [angle, setAngle] = useState<'side' | 'top'>('side');

    return (
        <div className="w-full bg-black/40 border border-white/10 rounded-2xl overflow-hidden">
            {/* Toggle */}
            <div className="flex border-b border-white/10">
                <button
                    onClick={() => setAngle('side')}
                    className={`flex-1 py-3 text-sm font-semibold transition-all ${angle === 'side'
                        ? 'bg-brand-cyan/15 text-brand-cyan border-b-2 border-brand-cyan'
                        : 'text-gray-500 hover:text-gray-300'}`}
                >
                    🔦 Side View — Rectangle Shadow
                </button>
                <button
                    onClick={() => setAngle('top')}
                    className={`flex-1 py-3 text-sm font-semibold transition-all ${angle === 'top'
                        ? 'bg-brand-purple/15 text-brand-purple border-b-2 border-brand-purple'
                        : 'text-gray-500 hover:text-gray-300'}`}
                >
                    🔦 Top View — Circle Shadow
                </button>
            </div>

            <div className="p-6 flex flex-col md:flex-row gap-8 items-center">
                {/* SVG Diagram */}
                <div className="flex-shrink-0">
                    {angle === 'side' ? (
                        <svg width="300" height="240" viewBox="0 0 300 240" className="mx-auto">
                            {/* Background room */}
                            <rect x="0" y="0" width="300" height="240" fill="#0a0a14" rx="12" />

                            {/* Floor perspective lines */}
                            <line x1="0" y1="200" x2="300" y2="200" stroke="#1f2937" strokeWidth="1" />
                            {/* Wall */}
                            <rect x="230" y="30" width="6" height="180" fill="#1f2937" rx="2" />

                            {/* Light beam from left */}
                            <defs>
                                <linearGradient id="beamSide" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0%" stopColor="#facc15" stopOpacity="0.6" />
                                    <stop offset="100%" stopColor="#facc15" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            <polygon points="30,100 30,140 170,125 170,115" fill="url(#beamSide)" />
                            {/* Flashlight */}
                            <rect x="10" y="105" width="25" height="30" rx="4" fill="#374151" />
                            <circle cx="35" cy="120" r="8" fill="#facc15" opacity="0.9" />
                            <text x="18" y="150" fill="#9ca3af" fontSize="9" textAnchor="middle">Light</text>

                            {/* Cylinder — 3D representation from side */}
                            {/* Cylinder body */}
                            <rect x="140" y="100" width="50" height="50" fill="#4b5563" rx="2" />
                            {/* Top ellipse */}
                            <ellipse cx="165" cy="100" rx="25" ry="8" fill="#6b7280" />
                            {/* Bottom ellipse */}
                            <ellipse cx="165" cy="150" rx="25" ry="8" fill="#374151" />
                            <text x="165" y="168" fill="#9ca3af" fontSize="9" textAnchor="middle">Cylinder</text>

                            {/* Rectangle shadow on wall */}
                            <rect x="230" y="100" width="12" height="50" fill="#06b6d4" opacity="0.8" rx="2" />
                            <text x="256" y="132" fill="#06b6d4" fontSize="10" textAnchor="middle">Rectangle</text>
                            <text x="256" y="144" fill="#06b6d4" fontSize="10" textAnchor="middle">Shadow</text>
                            <text x="256" y="156" fill="#06b6d4" fontSize="9" textAnchor="middle">→</text>
                        </svg>
                    ) : (
                        <svg width="300" height="240" viewBox="0 0 300 240" className="mx-auto">
                            {/* Background room */}
                            <rect x="0" y="0" width="300" height="240" fill="#0a0a14" rx="12" />

                            {/* Floor */}
                            <rect x="30" y="190" width="240" height="6" fill="#1f2937" rx="2" />

                            {/* Light beam from above */}
                            <defs>
                                <linearGradient id="beamTop" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#facc15" stopOpacity="0.6" />
                                    <stop offset="100%" stopColor="#facc15" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            <polygon points="140,15 160,15 170,130 130,130" fill="url(#beamTop)" />
                            {/* Flashlight from top */}
                            <rect x="130" y="5" width="40" height="20" rx="4" fill="#374151" />
                            <ellipse cx="150" cy="25" rx="12" ry="5" fill="#facc15" opacity="0.9" />
                            <text x="150" y="12" fill="#9ca3af" fontSize="9" textAnchor="middle">Light</text>

                            {/* Cylinder — top-down view (shows as circle) */}
                            <ellipse cx="150" cy="115" rx="32" ry="32" fill="#4b5563" stroke="#6b7280" strokeWidth="2" />
                            <ellipse cx="150" cy="115" rx="32" ry="10" fill="#6b7280" />
                            <text x="150" y="155" fill="#9ca3af" fontSize="9" textAnchor="middle">Cylinder</text>

                            {/* Circle shadow on floor */}
                            <ellipse cx="150" cy="200" rx="28" ry="8" fill="#a855f7" opacity="0.85" />
                            <text x="150" y="218" fill="#a855f7" fontSize="10" textAnchor="middle">Circle Shadow ↓</text>
                        </svg>
                    )}
                </div>

                {/* Text explanation */}
                <div className="space-y-4 flex-1">
                    {angle === 'side' ? (
                        <>
                            <p className="text-brand-cyan font-bold text-sm uppercase tracking-wider">Experiment A: Side Flashlight</p>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                You shine light at the <strong>side</strong> of the cylinder. The shadow on the wall is a perfect rectangle. You conclude: "the object is a rectangle."
                            </p>
                            <div className="bg-brand-cyan/10 border border-brand-cyan/20 rounded-xl p-3 text-xs text-brand-cyan">
                                Analogous to a particle experiment → you see a particle
                            </div>
                        </>
                    ) : (
                        <>
                            <p className="text-brand-purple font-bold text-sm uppercase tracking-wider">Experiment B: Top Flashlight</p>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                You shine light from <strong>above</strong>. The shadow on the floor is a perfect circle. You conclude: "the object is a circle."
                            </p>
                            <div className="bg-brand-purple/10 border border-brand-purple/20 rounded-xl p-3 text-xs text-brand-purple">
                                Analogous to a wave experiment → you see a wave
                            </div>
                        </>
                    )}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-gray-200 leading-relaxed">
                        <strong>The truth:</strong> it was a cylinder all along — a single object that <em>looks different</em> depending on how you look at it. The electron is the same. It's not "really" a wave or "really" a particle — it is a <strong>quantum object</strong> that casts the shadow you set up your experiment to see.
                    </div>
                </div>
            </div>
        </div>
    );
}
