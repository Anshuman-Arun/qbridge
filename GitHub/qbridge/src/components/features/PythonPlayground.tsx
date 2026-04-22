'use client';

import { useState } from 'react';
import { usePyodide } from '@/hooks/usePyodide';
import { Play, RotateCcw, Terminal, CheckCircle2, XCircle } from 'lucide-react';

const DEFAULT_CODE = `# Write your Python code here
name = "Quantum Explorer"
print(f"Hello, {name}!")

def factorial(n):
    return 1 if n <= 1 else n * factorial(n-1)

print(f"Factorial of 5 is: {factorial(5)}")
`;

interface PythonPlaygroundProps {
    title?: string;
    instructions?: string;
    starterCode?: string;
    expectedOutput?: string;
    onOutput?: (output: string[]) => void;
    onValidation?: (isCorrect: boolean, output: string[]) => void;
}

export function PythonPlayground({
    title,
    instructions,
    starterCode,
    expectedOutput,
    onOutput,
    onValidation,
}: PythonPlaygroundProps) {
    const { isLoading, runPython, output, setOutput } = usePyodide();
    const [code, setCode] = useState(starterCode || DEFAULT_CODE);
    const [validationResult, setValidationResult] = useState<'correct' | 'incorrect' | null>(null);

    const handleRun = async () => {
        setValidationResult(null);
        const result = await runPython(code);
        if (onOutput) {
            onOutput(result);
        }

        // Auto-check if expectedOutput is set
        if (expectedOutput) {
            const actualOutput = result.join('\n').trim();
            const expected = expectedOutput.trim();
            const isCorrect = actualOutput === expected;
            setValidationResult(isCorrect ? 'correct' : 'incorrect');
            if (onValidation) {
                onValidation(isCorrect, result);
            }
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden border border-white/10 bg-[#0F1117] shadow-2xl">
            {/* Header / Toolbar */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#1A1D24] border-b border-white/5">
                <div className="flex items-center gap-2 text-gray-400">
                    <Terminal className="w-4 h-4 text-brand-cyan" />
                    <span className="text-sm font-mono font-medium">{title || 'Python Runtime'}</span>
                    {isLoading ? (
                        <span className="text-xs px-2 py-0.5 rounded bg-yellow-500/10 text-yellow-500">Initializing...</span>
                    ) : (
                        <span className="text-xs px-2 py-0.5 rounded bg-green-500/10 text-green-500">Ready</span>
                    )}

                    {/* Validation badge */}
                    {validationResult === 'correct' && (
                        <span className="text-xs px-2 py-0.5 rounded bg-green-500/10 text-green-400 flex items-center gap-1 ml-2">
                            <CheckCircle2 className="w-3 h-3" /> Output Correct
                        </span>
                    )}
                    {validationResult === 'incorrect' && (
                        <span className="text-xs px-2 py-0.5 rounded bg-red-500/10 text-red-400 flex items-center gap-1 ml-2">
                            <XCircle className="w-3 h-3" /> Output Incorrect
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => { setOutput([]); setValidationResult(null); }}
                        className="p-1.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                        title="Clear Output"
                    >
                        <RotateCcw className="w-4 h-4" />
                    </button>
                    <button
                        onClick={handleRun}
                        disabled={isLoading}
                        className="flex items-center gap-2 px-3 py-1.5 bg-brand-cyan/10 hover:bg-brand-cyan/20 text-brand-cyan rounded-lg border border-brand-cyan/50 transition-all font-medium text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Play className="w-3 h-3 fill-current" />
                        Run Code
                    </button>
                </div>
            </div>

            {/* Instructions panel */}
            {instructions && (
                <div className="px-4 py-3 bg-brand-purple/5 border-b border-white/5">
                    <p className="text-sm text-gray-300">{instructions}</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 h-[400px]">
                {/* Editor Area */}
                <div className="relative border-r border-white/5 bg-[#0d0d0d]">
                    <textarea
                        value={code}
                        onChange={(e) => { setCode(e.target.value); setValidationResult(null); }}
                        className="w-full h-full p-4 bg-transparent text-gray-300 font-mono text-sm resize-none focus:outline-none leading-relaxed custom-scrollbar"
                        spellCheck={false}
                    />
                </div>

                {/* Console Output Area */}
                <div className="flex flex-col bg-[#0F1117]">
                    <div className="p-2 border-b border-white/5 bg-[#1A1D24]/50 flex items-center justify-between">
                        <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">Console Output</span>
                        {expectedOutput && (
                            <span className="text-xs font-mono text-gray-600">Expected: {expectedOutput.length > 40 ? expectedOutput.slice(0, 40) + '…' : expectedOutput}</span>
                        )}
                    </div>
                    <div className="flex-1 p-4 overflow-y-auto font-mono text-sm custom-scrollbar">
                        {output.length === 0 ? (
                            <span className="text-gray-600 italic select-none">Output will appear here...</span>
                        ) : (
                            output.map((line, i) => (
                                <div key={i} className="text-gray-300 border-b border-transparent hover:bg-white/5 animate-in fade-in slide-in-from-left-1 duration-200">
                                    <span className="text-green-500/50 mr-2">$</span>
                                    {line}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
