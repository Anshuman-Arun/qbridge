'use client';

import { Mafs, Coordinates, Point, Plot, Theme, useMovablePoint, Line, Vector as MafsVector, Text } from "mafs";
import "mafs/core.css";
import "mafs/font.css";
import { useState, useEffect, useCallback } from "react";
import { LatexBlock } from "@/components/features/LatexBlock";

export type GraphMode = 'point' | 'vector' | 'line' | 'function';

interface InteractiveGraphProps {
    mode?: GraphMode;
    title?: string;
    description?: string;
    snap?: number | boolean;
    functions?: string[];
    xLabel?: string;
    yLabel?: string;
    viewBox?: { xMin: number; xMax: number; yMin: number; yMax: number };
    zoom?: boolean;
    pan?: boolean;
    targetPoint?: [number, number];
    tolerance?: number;
    xStep?: number;
    yStep?: number;
    onValidation?: (isCorrect: boolean, point: { x: number; y: number }) => void;
    onPointChange?: (point: { x: number; y: number }) => void;
    showCheckButton?: boolean;
    locked?: boolean;
}

export function InteractiveGraph({
    mode = 'point',
    title,
    description,
    snap = false,
    functions = [],
    xLabel,
    yLabel,
    viewBox,
    zoom = true,
    pan = true,
    targetPoint,
    tolerance = 0.5,
    onValidation,
    onPointChange,
    showCheckButton = false,
    xStep,
    yStep,
    locked = false,
}: InteractiveGraphProps) {
    const [validationResult, setValidationResult] = useState<'correct' | 'incorrect' | null>(null);

    const snapToGrid = (value: number, snapVal: number) => {
        const rounded = Math.round(value / snapVal) * snapVal;
        return Math.abs(value - rounded) < 0.2 ? rounded : value;
    };

    const constrainFn = useCallback((p: [number, number]): [number, number] => {
        if (!snap) return p;
        const snapSize = typeof snap === 'number' ? snap : 1;
        return [snapToGrid(p[0], snapSize), snapToGrid(p[1], snapSize)];
    }, [snap]);

    // Primary draggable point
    const point = useMovablePoint([1, 1], {
        color: mode === 'vector' ? "rgba(0,0,0,0)" : "#06b6d4",
        constrain: constrainFn,
    });

    // Second point for line mode
    const point2 = useMovablePoint([3, 2], {
        color: "#a855f7",
        constrain: constrainFn,
    });

    useEffect(() => {
        if (onPointChange) {
            onPointChange({ x: point.x, y: point.y });
        }
    }, [point.x, point.y, onPointChange]);

    const handleCheck = () => {
        if (!targetPoint) return;
        const dx = point.x - targetPoint[0];
        const dy = point.y - targetPoint[1];
        const distance = Math.sqrt(dx * dx + dy * dy);
        const isCorrect = distance <= tolerance;
        setValidationResult(isCorrect ? 'correct' : 'incorrect');
        if (onValidation) {
            onValidation(isCorrect, { x: point.x, y: point.y });
        }
    };

    // Compute derived values per mode
    const magnitude = Math.sqrt(point.x ** 2 + point.y ** 2);
    const angle = Math.atan2(point.y, point.x) * (180 / Math.PI);
    const slope = mode === 'line'
        ? (point2.x !== point.x ? (point2.y - point.y) / (point2.x - point.x) : Infinity)
        : (point.x !== 0 ? point.y / point.x : 0);
    const yIntercept = mode === 'line' ? point.y - slope * point.x : 0;

    // Default titles per mode
    const defaultTitles: Record<GraphMode, string> = {
        point: 'Interactive Point Explorer',
        vector: 'Vector Visualizer',
        line: 'Line Explorer',
        function: 'Function Plotter',
    };

    const defaultDescriptions: Record<GraphMode, string> = {
        point: 'Drag the point to explore coordinates.',
        vector: 'Drag the point to change the vector from the origin.',
        line: 'Drag both points to explore the line equation.',
        function: 'Explore the plotted function(s).',
    };

    // Safe evaluation of function strings
    const evalFunction = (expr: string) => {
        try {
            return new Function('x', `return ${expr}`) as (x: number) => number;
        } catch {
            return () => 0;
        }
    };

    const vb = viewBox || { xMin: -5, xMax: 5, yMin: -5, yMax: 5 };

    return (
        <div className="w-full max-w-2xl mx-auto rounded-xl overflow-hidden border border-white/10 bg-black/50 shadow-2xl p-4">
            <div className="mb-4 flex flex-col gap-2">
                <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-cyan to-brand-purple">
                    {title || defaultTitles[mode]}
                </h3>
                <p className="text-sm text-gray-400">
                    {description || defaultDescriptions[mode]}
                    {snap && <span className="text-brand-cyan text-xs ml-2">(Snapping Active)</span>}
                </p>

                {/* Info display per mode */}
                <div className="flex gap-4 font-mono text-sm flex-wrap">
                    {mode === 'point' && (
                        <>
                            <div className="text-brand-cyan">x: {point.x.toFixed(2)}</div>
                            <div className="text-brand-purple">y: {point.y.toFixed(2)}</div>
                        </>
                    )}
                    {mode === 'vector' && (
                        <>
                            <div className="text-brand-cyan"><LatexBlock expression={`v_x = ${point.x.toFixed(2)}`} /></div>
                            <div className="text-brand-purple"><LatexBlock expression={`v_y = ${point.y.toFixed(2)}`} /></div>
                            <div className="text-white"><LatexBlock expression={`|\\vec{v}| = ${magnitude.toFixed(2)}`} /></div>
                        </>
                    )}
                    {mode === 'line' && (
                        <>
                            <div className="text-brand-cyan">P₁: ({point.x.toFixed(1)}, {point.y.toFixed(1)})</div>
                            <div className="text-brand-purple">P₂: ({point2.x.toFixed(1)}, {point2.y.toFixed(1)})</div>
                            <div className="text-white">
                                {slope === Infinity ? 'x = ' + point.x.toFixed(1) : `y = ${slope.toFixed(2)}x + ${yIntercept.toFixed(2)}`}
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className="h-[400px] w-full border border-white/5 rounded-lg overflow-hidden bg-[#0a0a0a]">
                <Mafs
                    zoom={locked ? false : zoom}
                    pan={locked ? false : pan}
                    viewBox={{ x: [vb.xMin, vb.xMax], y: [vb.yMin, vb.yMax] }}
                >
                    <Coordinates.Cartesian 
                        xAxis={xStep ? { lines: xStep } : undefined}
                        yAxis={yStep ? { lines: yStep } : undefined}
                    />

                    {/* Point mode */}
                    {mode === 'point' && (
                        <>
                            <Point x={point.x} y={point.y} color="#06b6d4" />
                            {point.element}
                        </>
                    )}

                    {/* Vector mode — arrow from origin to point */}
                    {mode === 'vector' && (
                        <>
                            <MafsVector tail={[0, 0]} tip={[point.x, point.y]} color="#ff00ff" />
                            {point.element}
                        </>
                    )}

                    {/* Line mode — line through two draggable points */}
                    {mode === 'line' && (
                        <>
                            {slope !== Infinity && (
                                <Plot.OfX
                                    y={(x) => slope * x + yIntercept}
                                    color="#ff00ff"
                                />
                            )}
                            <Point x={point.x} y={point.y} color="#06b6d4" />
                            <Point x={point2.x} y={point2.y} color="#a855f7" />
                            {point.element}
                            {point2.element}
                        </>
                    )}

                    {/* Function mode — plot functions, no dragging */}
                    {mode === 'function' && functions.map((fn, i) => {
                        const colors = ['#06b6d4', '#a855f7', '#ff00ff', '#22c55e', '#f59e0b', '#ef4444'];
                        return (
                            <Plot.OfX
                                key={i}
                                y={evalFunction(fn)}
                                color={colors[i % colors.length]}
                            />
                        );
                    })}

                    {/* Target point indicator (for quiz validation) */}
                    {targetPoint && validationResult === 'correct' && (
                        <Point x={targetPoint[0]} y={targetPoint[1]} color="#22c55e" />
                    )}
                </Mafs>
            </div>

            {/* Check button for quiz mode */}
            {(showCheckButton || targetPoint) && (
                <div className="mt-4 flex items-center gap-3">
                    <button
                        onClick={handleCheck}
                        className="px-4 py-2 bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/50 rounded-lg hover:bg-brand-cyan/30 transition-colors text-sm font-medium"
                    >
                        Check Answer
                    </button>
                    {validationResult === 'correct' && (
                        <span className="text-green-400 text-sm font-medium flex items-center gap-1">
                            ✓ Correct!
                        </span>
                    )}
                    {validationResult === 'incorrect' && (
                        <span className="text-red-400 text-sm font-medium flex items-center gap-1">
                            ✗ Try again
                        </span>
                    )}
                </div>
            )}

            {/* Axis labels */}
            {(xLabel || yLabel) && (
                <div className="mt-2 flex justify-between text-xs text-gray-500 px-2">
                    {xLabel && <span>x-axis: {xLabel}</span>}
                    {yLabel && <span>y-axis: {yLabel}</span>}
                </div>
            )}
        </div>
    );
}
