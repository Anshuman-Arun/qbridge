'use client';

import { useState } from 'react';
import { History, X, CheckCircle2, XCircle, ChevronDown } from 'lucide-react';

interface AttemptRecord {
    id?: string;
    module_id: string;
    module_title?: string;
    is_final_test: boolean;
    score: number;
    max_score: number;
    completed_at: string;
}

interface QuizHistoryPanelProps {
    allAttempts: AttemptRecord[];
}

export function QuizHistoryPanel({ allAttempts }: QuizHistoryPanelProps) {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Toggle button */}
            <button
                onClick={() => setOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20 transition-all text-sm font-medium"
            >
                <History className="w-4 h-4" />
                Full History
                <ChevronDown className="w-3 h-3 opacity-60" />
            </button>

            {/* Modal overlay */}
            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
                    <div className="w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl flex flex-col max-h-[80vh]">
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/10 shrink-0">
                            <div className="flex items-center gap-3">
                                <History className="w-5 h-5 text-brand-purple" />
                                <h3 className="text-lg font-bold text-white">Quiz History</h3>
                                <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-gray-400 border border-white/10">
                                    {allAttempts.length} attempts
                                </span>
                            </div>
                            <button
                                onClick={() => setOpen(false)}
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Scrollable list */}
                        <div className="overflow-y-auto flex-1 p-4 space-y-2">
                            {allAttempts.length === 0 ? (
                                <p className="text-center text-gray-500 py-8">No quiz attempts yet.</p>
                            ) : (
                                allAttempts.map((attempt, i) => {
                                    const pct = Math.round((attempt.score / attempt.max_score) * 100);
                                    const threshold = attempt.is_final_test ? 80 : 70;
                                    const passed = pct >= threshold;
                                    return (
                                        <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                                            <div className="flex items-center gap-3">
                                                {passed
                                                    ? <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                                                    : <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                                                }
                                                <div>
                                                    <p className="text-sm font-medium text-white">
                                                        {attempt.module_title
                                                            ? attempt.module_title
                                                            : attempt.module_id.slice(0, 8)}
                                                        {attempt.is_final_test && (
                                                            <span className="ml-2 text-xs text-brand-purple font-mono">Final Test</span>
                                                        )}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {new Date(attempt.completed_at).toLocaleDateString('en-US', {
                                                            month: 'short', day: 'numeric', year: 'numeric',
                                                            hour: '2-digit', minute: '2-digit',
                                                        })}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className={`text-sm font-bold font-mono ${pct >= 80 ? 'text-green-400' : pct >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                                                    {pct}%
                                                </span>
                                                <p className="text-xs text-gray-600">{attempt.score}/{attempt.max_score} pts</p>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
