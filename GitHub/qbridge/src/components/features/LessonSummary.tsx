'use client';

import React from 'react';
import { BookOpen, CheckCircle } from 'lucide-react';

interface LessonSummaryProps {
    title?: string;
    takeaways: string[];
}

export function LessonSummary({ title = "Key Takeaways", takeaways }: LessonSummaryProps) {
    return (
        <div className="w-full max-w-4xl mx-auto mt-16 mb-8 bg-black/40 border border-white/10 rounded-2xl p-8 backdrop-blur-sm shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            
            <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="p-3 bg-green-500/20 rounded-xl border border-green-500/30">
                    <BookOpen className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-2xl font-black text-white tracking-tight">{title}</h3>
            </div>

            <ul className="space-y-4 relative z-10">
                {takeaways.map((point, index) => (
                    <li key={index} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 transition-colors hover:bg-white/10">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                        <span className="text-gray-300 font-medium leading-relaxed">{point}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
