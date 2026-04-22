'use client';

import React, { useEffect, useRef } from 'react';
import 'katex/dist/katex.min.css';
import katex from 'katex';

interface MathTextProps {
    text: string;
    className?: string;
}

export function MathText({ text, className = '' }: MathTextProps) {
    // Fix over-escaped LaTeX strings caused by Postgres string literal differences 
    // between Text and JSONB columns (e.g. \\\\begin vs \begin).
    let cleanText = text;
    // 1. Normalize linebreaks: 8 backslashes -> 2 backslashes
    cleanText = cleanText.split('\\\\\\\\\\\\\\\\').join('\\\\');
    // 2. Normalize linebreaks: 4 backslashes -> 2 backslashes
    cleanText = cleanText.split('\\\\\\\\').join('\\\\');
    // 3. Unescape overly escaped commands: 2 backslashes + Letter -> 1 backslash + Letter
    cleanText = cleanText.replace(/\\\\([a-zA-Z])/g, '\\$1');

    // Split on $$...$$, $...$, or naked \begin{...}...\end{...} blocks
    const parts = cleanText.split(/(\$\$.*?\$\$|\$.*?\$|\\begin\{[a-zA-Z*]+\}.*?\\end\{[a-zA-Z*]+\})/gs);
    
    return (
        <span className={className}>
            {parts.map((part, i) => {
                if (!part) return null;
                
                if (part.startsWith('$$') && part.endsWith('$$') && part.length > 4) {
                    const expr = part.slice(2, -2);
                    return <KatexSpan key={i} expr={expr} displayMode={true} />;
                }
                if (part.startsWith('$') && part.endsWith('$') && part.length > 2) {
                    const expr = part.slice(1, -1);
                    return <KatexSpan key={i} expr={expr} displayMode={false} />;
                }
                if (part.startsWith('\\begin') && part.includes('\\end')) {
                    // Catch naked matrix/equation environments missing dollar signs
                    return <KatexSpan key={i} expr={part} displayMode={false} />;
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
            className={`${displayMode ? 'block my-2 text-center' : 'inline mx-0.5'}`} 
            aria-label={expr} 
        />
    );
}
