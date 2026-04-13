'use client';

import 'katex/dist/katex.min.css';
import katex from 'katex';
import { useEffect, useRef } from 'react';

interface LatexBlockProps {
    expression: string;
    displayMode?: boolean; // true for block math, false for inline
    className?: string;
}

export function LatexBlock({ expression, displayMode = false, className = '' }: LatexBlockProps) {
    const containerRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            try {
                katex.render(expression, containerRef.current, {
                    displayMode,
                    throwOnError: false, // Render the raw string if parsing fails
                    errorColor: '#ef4444',
                });
            } catch (error) {
                console.error('KaTeX rendering error:', error);
                containerRef.current.innerText = expression;
            }
        }
    }, [expression, displayMode]);

    return (
        <span
            ref={containerRef}
            className={`latex-container ${className} ${displayMode ? 'block my-4 text-center' : 'inline-block'}`}
            aria-label={expression}
        />
    );
}
