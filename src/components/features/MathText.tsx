'use client';

import React, { useEffect, useRef } from 'react';
import 'katex/dist/katex.min.css';
import katex from 'katex';

interface MathTextProps {
    text: string;
    className?: string;
}

export function MathText({ text, className = '' }: MathTextProps) {
    // Split on $$...$$ or $...$ (non-greedy)
    const parts = text.split(/(\$\$.*?\$\$|\$.*?\$)/gs);
    
    return (
        <span className={className}>
            {parts.map((part, i) => {
                if (part.startsWith('$$') && part.endsWith('$$') && part.length > 4) {
                    const expr = part.slice(2, -2);
                    return <KatexSpan key={i} expr={expr} displayMode={true} />;
                }
                if (part.startsWith('$') && part.endsWith('$') && part.length > 2) {
                    const expr = part.slice(1, -1);
                    return <KatexSpan key={i} expr={expr} displayMode={false} />;
                }
                return <span key={i} dangerouslySetInnerHTML={{ __html: part }} />;
            })}
        </span>
    );
}

function KatexSpan({ expr, displayMode = false }: { expr: string; displayMode?: boolean }) {
    const ref = useRef<HTMLSpanElement>(null);
    useEffect(() => {
        if (ref.current) {
            try {
                katex.render(expr, ref.current, { 
                    throwOnError: false, 
                    displayMode: displayMode,
                    strict: false
                });
            } catch {
                if (ref.current) ref.current.innerText = expr;
            }
        }
    }, [expr, displayMode]);
    
    return (
        <span 
            ref={ref} 
            className={`${displayMode ? 'block my-2 text-center' : 'inline-block align-middle mx-1'}`} 
            aria-label={expr} 
        />
    );
}
