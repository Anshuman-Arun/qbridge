import React from 'react';
import { BuilderProvider } from '@/components/builder/BuilderContext';
import { Sidebar } from '@/components/builder/Sidebar';
import { Canvas } from '@/components/builder/Canvas';
import { SaveButton } from '@/components/builder/SaveButton';

export default function BuilderPage() {
    return (
        <BuilderProvider>
            <div className="flex h-screen w-full bg-black text-white overflow-hidden">
                {/* Header / Top Bar */}
                <div className="fixed top-0 left-0 right-0 h-14 bg-black/50 backdrop-blur border-b border-white/10 flex items-center justify-between px-6 z-50">
                    <div className="flex items-center gap-2">
                        <h1 className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-brand-cyan to-brand-purple">
                            Lesson Builder
                        </h1>
                        <span className="text-xs text-gray-500 px-2 py-0.5 border border-white/10 rounded-full">BETA</span>
                    </div>
                    <SaveButton />
                </div>

                <div className="flex w-full pt-14 h-full">
                    <Sidebar />
                    <Canvas />
                </div>
            </div>
        </BuilderProvider>
    );
}
