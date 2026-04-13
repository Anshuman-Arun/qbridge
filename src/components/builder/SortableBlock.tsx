"use client";

import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useBuilder } from './BuilderContext';
import { LessonBlock, GraphBlockConfig, PythonBlockConfig, LatexBlockConfig, TextBlockConfig, QuizBlockConfig } from './types';
import { GripVertical, X, ChevronDown, ChevronUp } from 'lucide-react';

// Import the existing content components
import { LatexBlock } from '@/components/features/LatexBlock';
import { InteractiveGraph } from '@/components/features/InteractiveGraph';
import { PythonPlayground } from '@/components/features/PythonPlayground';

export function SortableBlock({ block }: { block: LessonBlock }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: block.id });

    const { removeBlock, selectedBlockId, selectBlock, updateBlock, updateBlockConfig } = useBuilder();
    const [showConfig, setShowConfig] = useState(false);

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : 'auto',
        position: 'relative' as const,
    };

    const isSelected = selectedBlockId === block.id;

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`
        group relative rounded-xl border border-transparent transition-all
        ${isSelected ? 'ring-2 ring-brand-purple bg-white/5' : 'hover:bg-white/5 hover:border-white/10'}
        ${isDragging ? 'opacity-50 ring-2 ring-brand-cyan' : ''}
      `}
            onClick={(e) => {
                e.stopPropagation();
                selectBlock(block.id);
            }}
        >
            {/* Handle & Actions */}
            <div className={`
        absolute -left-12 top-0 bottom-0 flex flex-col items-center justify-center gap-2
        opacity-0 group-hover:opacity-100 transition-opacity
        ${isSelected ? 'opacity-100' : ''}
      `}>
                <button
                    className="p-2 text-gray-500 hover:text-white cursor-grab active:cursor-grabbing"
                    {...attributes}
                    {...listeners}
                >
                    <GripVertical size={20} />
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        removeBlock(block.id);
                    }}
                    className="p-2 text-gray-500 hover:text-red-400"
                >
                    <X size={20} />
                </button>
            </div>

            {/* Content */}
            <div className="p-6">
                {block.type === 'text' && (
                    <textarea
                        className="w-full bg-transparent text-gray-200 resize-none border-none focus:ring-0"
                        rows={3}
                        value={block.content}
                        onChange={(e) => updateBlock(block.id, e.target.value)}
                        placeholder="Type your text content here..."
                    />
                )}

                {block.type === 'latex' && (
                    <div>
                        <div className="mb-2">
                            <input
                                type="text"
                                className="w-full bg-black/30 border border-white/10 rounded px-3 py-2 text-sm text-gray-300 font-mono mb-4"
                                placeholder="\LaTeX formula..."
                                value={block.content || '\\int x dx'}
                                onChange={(e) => updateBlock(block.id, e.target.value)}
                                onClick={(e) => e.stopPropagation()}
                            />
                        </div>
                        <div className="pointer-events-none">
                            <LatexBlock displayMode expression={block.content || '\\int x dx'} />
                        </div>
                    </div>
                )}

                {block.type === 'graph' && (
                    <div className="pointer-events-none grayscale opacity-80">
                        <div className="text-center mb-2 text-xs text-brand-purple uppercase tracking-wider font-bold">
                            Interactive Graph Preview — Mode: {(block.config as GraphBlockConfig)?.mode || 'point'}
                        </div>
                        <InteractiveGraph mode={(block.config as GraphBlockConfig)?.mode || 'point'} />
                    </div>
                )}

                {block.type === 'python' && (
                    <div className="pointer-events-none grayscale opacity-80">
                        <div className="text-center mb-2 text-xs text-green-500 uppercase tracking-wider font-bold">Python Playground Preview</div>
                        <PythonPlayground
                            starterCode={(block.config as PythonBlockConfig)?.starterCode}
                            instructions={(block.config as PythonBlockConfig)?.instructions}
                        />
                    </div>
                )}

                {block.type === 'quiz' && (
                    <div className="p-4 bg-brand-purple/5 border border-brand-purple/20 rounded-lg">
                        <div className="text-brand-purple font-bold text-sm uppercase tracking-wider mb-2">
                            Quiz Block — {(block.config as QuizBlockConfig)?.questions?.length || 0} question(s)
                        </div>
                        <p className="text-gray-400 text-sm">Configure questions in the settings panel below.</p>
                    </div>
                )}
            </div>

            {/* Config Toggle */}
            {isSelected && (
                <button
                    onClick={(e) => { e.stopPropagation(); setShowConfig(!showConfig); }}
                    className="w-full flex items-center justify-center gap-2 py-2 text-xs text-gray-400 hover:text-white border-t border-white/5 transition-colors"
                >
                    {showConfig ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    {showConfig ? 'Hide Settings' : 'Show Settings'}
                </button>
            )}

            {/* Config Panel */}
            {isSelected && showConfig && (
                <div className="p-4 border-t border-white/10 bg-black/30 space-y-3" onClick={(e) => e.stopPropagation()}>
                    {block.type === 'text' && (
                        <TextConfigPanel block={block} onChange={(c) => updateBlockConfig(block.id, c)} />
                    )}
                    {block.type === 'latex' && (
                        <LatexConfigPanel block={block} onChange={(c) => updateBlockConfig(block.id, c)} />
                    )}
                    {block.type === 'graph' && (
                        <GraphConfigPanel block={block} onChange={(c) => updateBlockConfig(block.id, c)} />
                    )}
                    {block.type === 'python' && (
                        <PythonConfigPanel block={block} onChange={(c) => updateBlockConfig(block.id, c)} />
                    )}
                    {block.type === 'quiz' && (
                        <QuizConfigPanel block={block} onChange={(c) => updateBlockConfig(block.id, c)} />
                    )}
                </div>
            )}
        </div>
    );
}

// --- Config Panels ---

const inputClass = "w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-brand-purple/50";
const labelClass = "text-xs text-gray-500 uppercase tracking-wider font-medium mb-1 block";

function TextConfigPanel({ block, onChange }: { block: LessonBlock; onChange: (c: TextBlockConfig) => void }) {
    const config = (block.config || {}) as TextBlockConfig;
    return (
        <>
            <div>
                <label className={labelClass}>Heading</label>
                <input className={inputClass} value={config.heading || ''} onChange={(e) => onChange({ ...config, heading: e.target.value })} placeholder="Section heading..." />
            </div>
            <div>
                <label className={labelClass}>Style</label>
                <select className={inputClass} value={config.style || 'prose'} onChange={(e) => onChange({ ...config, style: e.target.value as any })}>
                    <option value="prose">Prose</option>
                    <option value="callout">Callout</option>
                    <option value="definition">Definition</option>
                </select>
            </div>
        </>
    );
}

function LatexConfigPanel({ block, onChange }: { block: LessonBlock; onChange: (c: LatexBlockConfig) => void }) {
    const config = (block.config || {}) as LatexBlockConfig;
    return (
        <>
            <div>
                <label className={labelClass}>Title</label>
                <input className={inputClass} value={config.title || ''} onChange={(e) => onChange({ ...config, title: e.target.value })} placeholder="Formula label..." />
            </div>
            <div>
                <label className={labelClass}>Description</label>
                <input className={inputClass} value={config.description || ''} onChange={(e) => onChange({ ...config, description: e.target.value })} placeholder="Explanation text..." />
            </div>
            <div className="flex items-center gap-2">
                <input type="checkbox" checked={config.displayMode !== false} onChange={(e) => onChange({ ...config, displayMode: e.target.checked })} className="rounded border-gray-600" />
                <label className="text-sm text-gray-400">Display Mode (block math)</label>
            </div>
        </>
    );
}

function GraphConfigPanel({ block, onChange }: { block: LessonBlock; onChange: (c: GraphBlockConfig) => void }) {
    const config = (block.config || {}) as GraphBlockConfig;
    return (
        <>
            <div>
                <label className={labelClass}>Mode</label>
                <select className={inputClass} value={config.mode || 'point'} onChange={(e) => onChange({ ...config, mode: e.target.value as any })}>
                    <option value="point">Point</option>
                    <option value="vector">Vector (from origin)</option>
                    <option value="line">Line (two points)</option>
                    <option value="function">Function Plot</option>
                </select>
            </div>
            <div>
                <label className={labelClass}>Title</label>
                <input className={inputClass} value={config.title || ''} onChange={(e) => onChange({ ...config, title: e.target.value })} placeholder="Graph title..." />
            </div>
            <div>
                <label className={labelClass}>Description</label>
                <input className={inputClass} value={config.description || ''} onChange={(e) => onChange({ ...config, description: e.target.value })} placeholder="Description..." />
            </div>
            <div className="grid grid-cols-2 gap-2">
                <div>
                    <label className={labelClass}>X-Axis Label</label>
                    <input className={inputClass} value={config.xLabel || ''} onChange={(e) => onChange({ ...config, xLabel: e.target.value })} />
                </div>
                <div>
                    <label className={labelClass}>Y-Axis Label</label>
                    <input className={inputClass} value={config.yLabel || ''} onChange={(e) => onChange({ ...config, yLabel: e.target.value })} />
                </div>
            </div>
            <div className="flex items-center gap-2">
                <input type="checkbox" checked={!!config.snap} onChange={(e) => onChange({ ...config, snap: e.target.checked ? 1 : false })} className="rounded border-gray-600" />
                <label className="text-sm text-gray-400">Enable Grid Snapping</label>
            </div>
            {config.mode === 'function' && (
                <div>
                    <label className={labelClass}>Functions (one per line, e.g. Math.sin(x))</label>
                    <textarea className={inputClass} rows={3} value={(config.functions || []).join('\n')} onChange={(e) => onChange({ ...config, functions: e.target.value.split('\n').filter(Boolean) })} placeholder="Math.sin(x)&#10;x**2" />
                </div>
            )}
            <div>
                <label className={labelClass}>Target Point (for quiz, x,y)</label>
                <input className={inputClass} value={config.targetPoint ? config.targetPoint.join(',') : ''} onChange={(e) => {
                    const parts = e.target.value.split(',').map(Number);
                    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
                        onChange({ ...config, targetPoint: [parts[0], parts[1]] });
                    } else if (e.target.value === '') {
                        onChange({ ...config, targetPoint: undefined });
                    }
                }} placeholder="e.g. 3,4" />
            </div>
        </>
    );
}

function PythonConfigPanel({ block, onChange }: { block: LessonBlock; onChange: (c: PythonBlockConfig) => void }) {
    const config = (block.config || {}) as PythonBlockConfig;
    return (
        <>
            <div>
                <label className={labelClass}>Title</label>
                <input className={inputClass} value={config.title || ''} onChange={(e) => onChange({ ...config, title: e.target.value })} placeholder="Playground title..." />
            </div>
            <div>
                <label className={labelClass}>Instructions</label>
                <textarea className={inputClass} rows={2} value={config.instructions || ''} onChange={(e) => onChange({ ...config, instructions: e.target.value })} placeholder="Instructions for the student..." />
            </div>
            <div>
                <label className={labelClass}>Starter Code</label>
                <textarea className={`${inputClass} font-mono`} rows={5} value={config.starterCode || ''} onChange={(e) => onChange({ ...config, starterCode: e.target.value })} placeholder="# Python code..." />
            </div>
            <div>
                <label className={labelClass}>Expected Output (for auto-check)</label>
                <input className={inputClass} value={config.expectedOutput || ''} onChange={(e) => onChange({ ...config, expectedOutput: e.target.value })} placeholder="Expected console output..." />
            </div>
        </>
    );
}

function QuizConfigPanel({ block, onChange }: { block: LessonBlock; onChange: (c: QuizBlockConfig) => void }) {
    const config = (block.config || { questions: [] }) as QuizBlockConfig;

    const addQuestion = () => {
        const newQ = {
            id: Math.random().toString(36).slice(2, 10),
            type: 'multiple_choice' as const,
            questionText: '',
            options: ['', '', '', ''],
            correctAnswer: 'A',
            tags: [],
            points: 1,
        };
        onChange({ ...config, questions: [...config.questions, newQ] });
    };

    const updateQuestion = (index: number, updates: any) => {
        const newQuestions = [...config.questions];
        newQuestions[index] = { ...newQuestions[index], ...updates };
        onChange({ ...config, questions: newQuestions });
    };

    const removeQuestion = (index: number) => {
        onChange({ ...config, questions: config.questions.filter((_, i) => i !== index) });
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <input type="checkbox" checked={config.isFinalTest || false} onChange={(e) => onChange({ ...config, isFinalTest: e.target.checked })} className="rounded border-gray-600" />
                <label className="text-sm text-gray-400">Module Final Test (80% threshold)</label>
            </div>

            {config.questions.map((q, i) => (
                <div key={q.id} className="p-3 bg-white/5 rounded-lg border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 font-mono">Q{i + 1}</span>
                        <button onClick={() => removeQuestion(i)} className="text-red-400 text-xs hover:text-red-300">Remove</button>
                    </div>
                    <select className={inputClass} value={q.type} onChange={(e) => updateQuestion(i, { type: e.target.value })}>
                        <option value="multiple_choice">Multiple Choice</option>
                        <option value="short_answer">Short Answer</option>
                        <option value="true_false">True/False</option>
                        <option value="python_output">Python Output</option>
                        <option value="graph_vector">Graph/Vector</option>
                    </select>
                    <input className={inputClass} value={q.questionText} onChange={(e) => updateQuestion(i, { questionText: e.target.value })} placeholder="Question text..." />
                    {q.type === 'multiple_choice' && (
                        <div className="space-y-1">
                            {(q.options || ['', '', '', '']).map((opt, j) => (
                                <input key={j} className={inputClass} value={opt} onChange={(e) => {
                                    const newOpts = [...(q.options || [])];
                                    newOpts[j] = e.target.value;
                                    updateQuestion(i, { options: newOpts });
                                }} placeholder={`Option ${String.fromCharCode(65 + j)}`} />
                            ))}
                        </div>
                    )}
                    <input className={inputClass} value={q.correctAnswer} onChange={(e) => updateQuestion(i, { correctAnswer: e.target.value })} placeholder="Correct answer..." />
                    <input className={inputClass} value={(q.tags || []).join(', ')} onChange={(e) => updateQuestion(i, { tags: e.target.value.split(',').map((t: string) => t.trim()).filter(Boolean) })} placeholder="Tags (comma-separated)..." />
                </div>
            ))}

            <button onClick={addQuestion} className="w-full py-2 border border-dashed border-white/20 rounded-lg text-sm text-gray-400 hover:text-white hover:border-white/40 transition-colors">
                + Add Question
            </button>
        </div>
    );
}
