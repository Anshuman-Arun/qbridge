'use client';

import React from 'react';
import { InteractiveVideo, VideoCheckpoint } from '@/components/features/InteractiveVideo';
import { LinearSearchSim } from '@/components/features/LinearSearchSim';
import { XorStringMatcher } from '@/components/features/XorStringMatcher';
import { ConceptNugget } from '@/components/features/ConceptNugget';

export default function AlgorithmsLesson() {
    const checkpoints: VideoCheckpoint[] = [
        {
            id: 'alg_1',
            timeSeconds: 52,
            questionText: 'What is the "Search Problem" in computer science?',
            options: [
                'Looking for a virus',
                'Finding a specific element in a list',
                'Surfing the web',
                'Discovering new hardware'
            ],
            correctAnswer: 'Finding a specific element in a list'
        },
        {
            id: 'alg_2',
            timeSeconds: 165,
            questionText: 'When a computer compares two words under the hood, what logical operation does it primarily run the bits through?',
            options: [
                'AND gates',
                'OR gates',
                'NOT gates',
                'XOR gates'
            ],
            correctAnswer: 'XOR gates'
        }
    ];

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 text-lg leading-relaxed">
                    This page supports the video with hands-on practice. Focus on the definition of an algorithm, the search problem, and how comparisons are implemented at the bit level.
                </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Core ideas</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-300">
                    <li><strong>Algorithm:</strong> a finite, ordered set of instructions that maps input to output.</li>
                    <li><strong>Search problem:</strong> find a target item in a collection.</li>
                    <li><strong>Linear search:</strong> the baseline method for unsorted data.</li>
                </ul>
            </div>

            <InteractiveVideo
                url="https://www.youtube.com/watch?v=cvhNg1E8sA8"
                checkpoints={checkpoints}
            />

            <div className="prose prose-invert max-w-none">
                <h3 className="text-2xl font-bold text-white mt-12 mb-6">Linear search walkthrough</h3>
                <p className="text-gray-400 mb-8">
                    For unsorted data, a classical machine must inspect entries one by one. In the worst case, it checks every item before it can conclude whether the target exists.
                </p>
            </div>

            <LinearSearchSim />

            <div className="prose prose-invert max-w-none">
                <h3 className="text-2xl font-bold text-white mt-16 mb-6">Hardware-level comparison</h3>
                <p className="text-gray-400 mb-8">
                    A string equality check is implemented with bit operations. XOR is central: matching bits output <code>0</code>, and mismatched bits output <code>1</code>. If all outputs are <code>0</code>, the values match.
                </p>
            </div>

            <XorStringMatcher />

            <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-gray-300 mt-12 mb-8">
                <h3 className="text-xl font-bold text-white mb-4">Why this matters</h3>
                <p className="text-sm leading-relaxed">
                    Algorithm choice sets the performance ceiling long before hardware tuning. This lesson sets up the next step: analyzing growth with Big-O and understanding where classical search becomes impractical.
                </p>
            </div>

            <ConceptNugget text="Algorithms are not abstract recipes only; they are physical instruction patterns executed by hardware gates at scale." />
        </div>
    );
}
