'use client';

import React from 'react';
import { InteractiveVideo, VideoCheckpoint } from '@/components/features/InteractiveVideo';
import { BigOGrapher } from '@/components/features/BigOGrapher';
import { TimeComplexityVisualizer } from '@/components/features/TimeComplexityVisualizer';
import { ConceptNugget } from '@/components/features/ConceptNugget';

export default function BigOLesson() {
    const checkpoints: VideoCheckpoint[] = [
        {
            id: 'bo_1',
            timeSeconds: 70,
            questionText: 'What exactly does Big-O notation measure?',
            options: [
                'Memory size in gigabytes',
                'Processing speed in exact seconds',
                'The worst-case number of steps an algorithm takes as problem size grows',
                'The visual size of output text'
            ],
            correctAnswer: 'The worst-case number of steps an algorithm takes as problem size grows'
        },
        {
            id: 'bo_2',
            timeSeconds: 155,
            questionText: 'Which complexity class is considered the classical wall for many hard problems?',
            options: ['O(1)', 'O(N)', 'O(N log N)', 'O(2^N)'],
            correctAnswer: 'O(2^N)'
        }
    ];

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 text-lg leading-relaxed">
                    This lesson page is a study companion. The video explains the story; this page helps you compare growth rates and build intuition for why runtime classes matter.
                </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Big-O in one view</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-300">
                    <li>Big-O compares algorithms by growth in operation count as input size <code>N</code> increases.</li>
                    <li>It avoids machine-dependent timing and random lucky cases.</li>
                    <li>Worst-case behavior is the safety baseline for system design.</li>
                </ul>
            </div>

            <InteractiveVideo
                url="https://www.youtube.com/watch?v=52GjbpJCSow"
                checkpoints={checkpoints}
            />

            <div className="prose prose-invert max-w-none">
                <h3 className="text-2xl font-bold text-white mt-12 mb-6">Growth curves</h3>
                <p className="text-gray-400 mb-8">
                    Compare common classes side by side: O(1), O(log N), O(N), O(N^2), and O(2^N). The key question is not who wins at tiny inputs, but who remains viable as N scales.
                </p>
            </div>

            <BigOGrapher />

            <div className="prose prose-invert max-w-none">
                <h3 className="text-2xl font-bold text-white mt-16 mb-6">Step-count intuition</h3>
                <p className="text-gray-400 mb-8">
                    Use the simulator to see how quickly work explodes across complexity classes. This directly explains why exponential and factorial algorithms hit hard limits on classical machines.
                </p>
            </div>

            <TimeComplexityVisualizer />

            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-gray-300 mt-12">
                <h3 className="text-xl font-bold text-red-300 mb-4">Classical wall</h3>
                <p className="text-sm leading-relaxed">
                    Problems in chemistry, optimization, and cryptanalysis often map to exponential-time classical methods. Even huge hardware improvements cannot fully offset this growth pattern.
                </p>
            </div>

            <ConceptNugget text="Big-O is not about exact seconds today; it is about whether an approach remains feasible as the problem size grows." />
        </div>
    );
}
