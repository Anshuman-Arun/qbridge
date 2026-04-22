'use client';

import { MathText } from '@/components/features/MathText';

interface ConceptNuggetProps {
    text: string;
    className?: string;
}

export function ConceptNugget({ text, className = "" }: ConceptNuggetProps) {
    return (
        <div className={`relative overflow-hidden group p-6 rounded-2xl bg-gradient-to-br from-white/[0.08] to-transparent border border-white/10 shadow-xl transition-all hover:scale-[1.02] hover:bg-white/[0.1] ${className}`}>
            {/* Subtle accent line */}
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-brand-cyan to-brand-purple opacity-50 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative z-10">
                <MathText 
                    className="text-gray-200 font-medium leading-relaxed tracking-wide block"
                    text={text}
                />
                <div className="mt-3 flex items-center gap-2">
                    <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold italic">Key Takeaway</span>
                </div>
            </div>
            
            {/* Background glow effect */}
            <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-brand-cyan/10 rounded-full blur-3xl group-hover:bg-brand-purple/20 transition-colors duration-700" />
        </div>
    );
}
