'use client';

import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import { CheckCircle2, XCircle, Play } from 'lucide-react';
import { MathText } from './MathText';
import 'katex/dist/katex.min.css';


export interface VideoCheckpoint {
    id: string;
    timeSeconds: number;
    questionText: string;
    options: string[];
    correctAnswer: string;
}

interface InteractiveVideoProps {
    url: string;
    checkpoints: VideoCheckpoint[];
}

export function InteractiveVideo({ url, checkpoints }: InteractiveVideoProps) {
    const [playing, setPlaying] = useState(false);
    const [completedCheckpoints, setCompletedCheckpoints] = useState<Set<string>>(new Set());
    const [currentCheckpoint, setCurrentCheckpoint] = useState<VideoCheckpoint | null>(null);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const playerRef = useRef<any>(null);

    const handleProgress = (state: { playedSeconds: number }) => {
        if (!playing || currentCheckpoint) return;

        const currentSeconds = state.playedSeconds;

        // Find the first checkpoint that is due to be shown but hasn't been completed.
        // We check if currentSeconds is greater than or equal to the checkpoint time.
        // This ensures that even if users fast forward past the checkpoint, it still triggers.
        const nextCheckpoint = checkpoints.find(
            (cp) =>
                !completedCheckpoints.has(cp.id) &&
                currentSeconds >= cp.timeSeconds
        );

        if (nextCheckpoint) {
            // If they skipped past the checkpoint by more than 1 second, snap back to the checkpoint time
            if (currentSeconds > nextCheckpoint.timeSeconds + 1.0 && playerRef.current) {
                playerRef.current.currentTime = nextCheckpoint.timeSeconds;
            }

            // Exit fullscreen so they can see the overlay (if the iframe went fullscreen, it hides our overlay)
            if (typeof document !== 'undefined' && document.fullscreenElement) {
                document.exitFullscreen().catch(() => {});
            }

            setPlaying(false);
            setCurrentCheckpoint(nextCheckpoint);
            setSelectedAnswer(null);
            setIsCorrect(null);
        }
    };

    const handleAnswerSelect = (optionValue: string) => {
        if (!currentCheckpoint || isCorrect) return;

        setSelectedAnswer(optionValue);
        
        // Simple string equivalence or finding letter A,B,C,D
        // The optionValue here is the text itself.
        if (optionValue === currentCheckpoint.correctAnswer) {
            setIsCorrect(true);
            setTimeout(() => {
                // Let user see they are right for a moment, then resume
                setCompletedCheckpoints((prev) => new Set(prev).add(currentCheckpoint.id));
                setCurrentCheckpoint(null);
                setPlaying(true);
            }, 1500);
        } else {
            setIsCorrect(false);
        }
    };

    return (
        <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-lg border border-white/10">
            {React.createElement(ReactPlayer as any, {
                ref: playerRef,
                url: url,
                width: "100%",
                height: "100%",
                playing: playing,
                controls: !currentCheckpoint,
                onProgress: handleProgress as any,
                onPlay: () => setPlaying(true),
                onPause: () => setPlaying(false),
            })}

            {/* Overlay for Checkpoint */}
            {currentCheckpoint && (
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-10 flex items-center justify-center p-6">
                    <div className="bg-white/10 border border-white/20 p-8 rounded-2xl w-full max-w-2xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-10 h-10 rounded-full bg-brand-purple/20 flex items-center justify-center shrink-0">
                                <span className="text-brand-purple font-bold">?</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">Knowledge Check</h3>
                                <MathText text={currentCheckpoint.questionText} className="text-gray-200 text-lg" />
                            </div>
                        </div>

                        <div className="space-y-3 pl-14">
                            {currentCheckpoint.options.map((option, idx) => {
                                const letter = String.fromCharCode(65 + idx);
                                const isSelected = selectedAnswer === option;
                                
                                let borderClass = 'border-white/10 bg-white/5 hover:bg-white/10';
                                
                                if (isSelected) {
                                    if (isCorrect === true) {
                                        borderClass = 'border-green-500/50 bg-green-500/10 text-green-400';
                                    } else if (isCorrect === false) {
                                        borderClass = 'border-red-500/50 bg-red-500/10 text-red-400';
                                    } else {
                                        borderClass = 'border-brand-purple/50 bg-brand-purple/10 text-brand-purple';
                                    }
                                }

                                return (
                                    <button
                                        key={idx}
                                        onClick={() => handleAnswerSelect(option)}
                                        disabled={isCorrect === true}
                                        className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-4 ${borderClass}`}
                                    >
                                        <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold ${isSelected ? 'border-current' : 'border-gray-500 text-gray-500'}`}>
                                            {letter}
                                        </span>
                                        <MathText text={option} className={isSelected ? '' : 'text-gray-300'} />
                                    </button>
                                );
                            })}
                        </div>
                        
                        {isCorrect === false && (
                            <div className="pl-14 mt-4 flex items-center gap-2 text-red-400 text-sm">
                                <XCircle className="w-4 h-4" />
                                Incorrect. Try another option!
                            </div>
                        )}
                        {isCorrect === true && (
                            <div className="pl-14 mt-4 flex items-center gap-2 text-green-400 text-sm font-semibold">
                                <CheckCircle2 className="w-4 h-4" />
                                Correct! Resuming video...
                            </div>
                        )}
                    </div>
                </div>
            )}
            
            {/* Start Overlay if paused at very beginning without playing yet */}
            {!playing && !currentCheckpoint && playerRef.current?.currentTime === 0 && (
                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-brand-purple/80 p-4 rounded-full text-white backdrop-blur-md shadow-2xl">
                        <Play className="w-10 h-10 ml-1" />
                    </div>
                </div>
            )}
        </div>
    );
}
