"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { LessonBlock, BlockConfig } from './types';
import { v4 as uuidv4 } from 'uuid';

interface BuilderContextType {
    blocks: LessonBlock[];
    addBlock: (type: LessonBlock['type']) => void;
    updateBlock: (id: string, content: string) => void;
    updateBlockConfig: (id: string, config: BlockConfig) => void;
    removeBlock: (id: string) => void;
    reorderBlocks: (newBlocks: LessonBlock[]) => void;
    loadBlocks: (blocks: LessonBlock[]) => void;
    selectedBlockId: string | null;
    selectBlock: (id: string | null) => void;
}

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

const defaultConfigs: Partial<Record<LessonBlock['type'], BlockConfig>> = {
    graph: { mode: 'point', title: '', description: '', snap: false },
    python: { title: '', instructions: '', starterCode: '', expectedOutput: '' },
    latex: { title: '', description: '', displayMode: true },
    text: { heading: '', style: 'prose' as const },
    quiz: { questions: [], isFinalTest: false },
};

export function BuilderProvider({ children }: { children: ReactNode }) {
    const [blocks, setBlocks] = useState<LessonBlock[]>([]);
    const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);

    const addBlock = (type: LessonBlock['type']) => {
        const newBlock: LessonBlock = {
            id: uuidv4(),
            type,
            content: type === 'text' ? 'New text block...' : '',
            config: defaultConfigs[type],
        };
        setBlocks((prev) => [...prev, newBlock]);
    };

    const updateBlock = (id: string, content: string) => {
        setBlocks((prev) =>
            prev.map((b) => (b.id === id ? { ...b, content } : b))
        );
    };

    const updateBlockConfig = (id: string, config: BlockConfig) => {
        setBlocks((prev) =>
            prev.map((b) => (b.id === id ? { ...b, config } : b))
        );
    };

    const removeBlock = (id: string) => {
        setBlocks((prev) => prev.filter((b) => b.id !== id));
        if (selectedBlockId === id) setSelectedBlockId(null);
    };

    const reorderBlocks = (newBlocks: LessonBlock[]) => {
        setBlocks(newBlocks);
    };

    const loadBlocks = (newBlocks: LessonBlock[]) => {
        setBlocks(newBlocks);
        setSelectedBlockId(null);
    };

    const selectBlock = (id: string | null) => {
        setSelectedBlockId(id);
    };

    return (
        <BuilderContext.Provider
            value={{
                blocks,
                addBlock,
                updateBlock,
                updateBlockConfig,
                removeBlock,
                reorderBlocks,
                loadBlocks,
                selectedBlockId,
                selectBlock,
            }}
        >
            {children}
        </BuilderContext.Provider>
    );
}

export function useBuilder() {
    const context = useContext(BuilderContext);
    if (context === undefined) {
        throw new Error('useBuilder must be used within a BuilderProvider');
    }
    return context;
}
