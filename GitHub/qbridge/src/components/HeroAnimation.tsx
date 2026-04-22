"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function HeroAnimation() {
    const [particles, setParticles] = useState<any[]>([]);

    useEffect(() => {
        // Generate particles only on the client side to avoid hydration mismatch
        const newParticles = [...Array(6)].map(() => ({
            initial: {
                x: Math.random() * 200 - 100,
                y: Math.random() * 200 - 100,
                z: Math.random() * 200 - 100
            },
            animate: {
                x: [
                    Math.random() * 300 - 150,
                    Math.random() * 300 - 150,
                    Math.random() * 300 - 150
                ],
                y: [
                    Math.random() * 300 - 150,
                    Math.random() * 300 - 150,
                    Math.random() * 300 - 150
                ],
                opacity: [0.2, 0.8, 0.2]
            },
            transition: {
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div className="relative w-full h-[400px] md:h-[600px] flex items-center justify-center">

            {/* --- Ambient Glow --- */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-purple/20 blur-[120px] rounded-full mix-blend-screen animate-pulse-slow" />

            {/* --- Main Container with Perspective --- */}
            <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] flex items-center justify-center [perspective:1000px] [transform-style:preserve-3d]">

                {/* --- Central Qubit Core --- */}
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.8, 1, 0.8],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="relative z-20 w-24 h-24 md:w-32 md:h-32 bg-white rounded-full shadow-[0_0_80px_rgba(139,92,246,0.6)] blur-[1px]"
                >
                    {/* Inner Core Details */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-brand-cyan via-white to-brand-purple rounded-full opacity-90" />
                    <div className="absolute inset-[-4px] bg-white/40 rounded-full blur-md" />
                </motion.div>


                {/* --- Orbital Ring 1: Cyan (Horizontal-ish) --- */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute z-10 w-[280px] h-[280px] md:w-[450px] md:h-[450px] rounded-full border border-brand-cyan/30"
                    style={{ rotateX: 75, rotateY: -10 }}
                >
                    <motion.div
                        className="absolute top-0 left-1/2 w-4 h-4 bg-brand-cyan rounded-full shadow-[0_0_20px_#06B6D4]"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    {/* Trail/Arc */}
                    <div className="absolute inset-0 rounded-full border-t-2 border-brand-cyan/60 blur-[1px]" />
                </motion.div>


                {/* --- Orbital Ring 2: Purple (Vertical-ish) --- */}
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute z-10 w-[260px] h-[260px] md:w-[400px] md:h-[400px] rounded-full border border-brand-purple/30"
                    style={{ rotateX: 45, rotateY: 60 }}
                >
                    <div className="absolute bottom-0 left-1/2 w-3 h-3 bg-brand-purple rounded-full shadow-[0_0_20px_#8B5CF6]" />
                    {/* Trail/Arc */}
                    <div className="absolute inset-0 rounded-full border-b-2 border-brand-purple/60 blur-[1px]" />
                </motion.div>


                {/* --- Orbital Ring 3: Pink (Diagonal) --- */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute z-10 w-[320px] h-[320px] md:w-[550px] md:h-[550px] rounded-full border border-brand-pink/20"
                    style={{ rotateX: -30, rotateY: 20 }}
                >
                    <div className="absolute top-1/4 right-0 w-2 h-2 bg-brand-pink rounded-full shadow-[0_0_15px_#EC4899]" />
                </motion.div>


                {/* --- Floating Particles (Superposition Cloud) --- */}
                {particles.map((p, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1.5 h-1.5 bg-white rounded-full opacity-60"
                        initial={p.initial}
                        animate={p.animate}
                        transition={p.transition}
                    />
                ))}

            </div>
        </div>
    );
}
