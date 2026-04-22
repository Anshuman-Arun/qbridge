"use client";

import React from 'react';
import { useBuilder } from './BuilderContext';
import { Type, Sigma, Activity, Terminal, ClipboardCheck } from 'lucide-react';

export function Sidebar() {
    const { addBlock } = useBuilder();

    return (
        <aside className="w-64 bg-gray-900 border-r border-gray-800 p-4 flex flex-col gap-4 h-full">
            <h2 className="text-xl font-bold text-white mb-4">Toolbox</h2>

            <div className="space-y-2">
                <ToolButton
                    icon={<Type size={18} />}
                    label="Text Block"
                    onClick={() => addBlock('text')}
                />
                <ToolButton
                    icon={<Sigma size={18} />}
                    label="LaTeX Math"
                    onClick={() => addBlock('latex')}
                />
                <ToolButton
                    icon={<Activity size={18} />}
                    label="Interactive Graph"
                    onClick={() => addBlock('graph')}
                />
                <ToolButton
                    icon={<Terminal size={18} />}
                    label="Python Playground"
                    onClick={() => addBlock('python')}
                />
                <ToolButton
                    icon={<ClipboardCheck size={18} />}
                    label="Quiz Block"
                    onClick={() => addBlock('quiz')}
                />
            </div>
        </aside>
    );
}

function ToolButton({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="w-full flex items-center gap-3 p-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 transition-colors text-left"
        >
            {icon}
            <span className="font-medium">{label}</span>
        </button>
    );
}
