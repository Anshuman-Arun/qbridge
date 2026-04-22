"use client";

import React, { useState } from 'react';
import { useBuilder } from './BuilderContext';
import { saveLesson } from '@/actions/saveLesson';
import { Save, Loader2, Check, AlertCircle, RefreshCw } from 'lucide-react';

type SaveMode = 'create' | 'update';

export function SaveButton() {
    const { blocks } = useBuilder();
    const [isSaving, setIsSaving] = useState(false);
    const [filename, setFilename] = useState('');
    const [showInput, setShowInput] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [mode, setMode] = useState<SaveMode>('create');

    const handleSave = async () => {
        if (!filename) return;

        setIsSaving(true);
        setStatus('idle');

        try {
            const result = await saveLesson(filename, blocks, mode === 'update' ? filename : undefined);
            if (result.success) {
                setStatus('success');
                setTimeout(() => {
                    setStatus('idle');
                    setShowInput(false);
                }, 2000);
            } else {
                setStatus('error');
                console.error(result.error);
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
        } finally {
            setIsSaving(false);
        }
    };

    if (showInput) {
        return (
            <div className="flex flex-col gap-2">
                {/* Mode Toggle */}
                <div className="flex items-center gap-1 bg-gray-800 rounded-lg p-0.5">
                    <button
                        onClick={() => setMode('create')}
                        className={`px-3 py-1 text-xs rounded-md transition-colors ${mode === 'create' ? 'bg-brand-cyan text-black font-bold' : 'text-gray-400 hover:text-white'}`}
                    >
                        Create New
                    </button>
                    <button
                        onClick={() => setMode('update')}
                        className={`px-3 py-1 text-xs rounded-md transition-colors ${mode === 'update' ? 'bg-brand-purple text-white font-bold' : 'text-gray-400 hover:text-white'}`}
                    >
                        Update Existing
                    </button>
                </div>

                <div className="flex items-center gap-2 bg-gray-900 border border-white/10 rounded-lg p-1 pr-2">
                    <input
                        type="text"
                        value={filename}
                        onChange={(e) => setFilename(e.target.value)}
                        placeholder={mode === 'update' ? 'Existing Lesson Slug...' : 'Enter Lesson Name...'}
                        className="bg-transparent border-none text-sm text-white focus:ring-0 w-40 px-2"
                        autoFocus
                    />
                    <button
                        onClick={handleSave}
                        disabled={isSaving || !filename}
                        className="p-1.5 bg-brand-cyan/20 text-brand-cyan rounded-md hover:bg-brand-cyan/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {isSaving ? <Loader2 size={16} className="animate-spin" /> : mode === 'update' ? <RefreshCw size={16} /> : <Save size={16} />}
                    </button>
                    <button
                        onClick={() => setShowInput(false)}
                        className="p-1.5 text-gray-500 hover:text-white transition-colors"
                    >
                        <XIcon />
                    </button>

                    {status === 'success' && <Check size={16} className="text-green-500 ml-1" />}
                    {status === 'error' && <AlertCircle size={16} className="text-red-500 ml-1" />}
                </div>
            </div>
        );
    }

    return (
        <button
            onClick={() => setShowInput(true)}
            className="flex items-center gap-2 px-4 py-2 bg-brand-cyan text-black font-semibold rounded-lg hover:bg-brand-cyan/90 transition-all text-sm"
        >
            <Save size={16} />
            <span>Save Lesson</span>
        </button>
    );
}

function XIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
    )
}
