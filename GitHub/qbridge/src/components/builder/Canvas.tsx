"use client";

import React from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { useBuilder } from './BuilderContext';
import { SortableBlock } from './SortableBlock';
import { LessonBlock } from './types';

export function Canvas() {
    const { blocks, reorderBlocks } = useBuilder();

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = blocks.findIndex((b) => b.id === active.id);
            const newIndex = blocks.findIndex((b) => b.id === over.id);
            reorderBlocks(arrayMove(blocks, oldIndex, newIndex));
        }
    }

    return (
        <div className="flex-1 overflow-y-auto p-12 bg-black/90">
            <div className="max-w-4xl mx-auto space-y-4">
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={blocks.map(b => b.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        {blocks.map((block) => (
                            <SortableBlock key={block.id} block={block} />
                        ))}
                    </SortableContext>
                </DndContext>

                {blocks.length === 0 && (
                    <div className="text-center py-20 border-2 border-dashed border-gray-800 rounded-xl">
                        <p className="text-gray-500">Drag items from the sidebar or click to add them here.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
