'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
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

// Extracts the YouTube video ID from various URL formats
function getYouTubeId(url: string): string | null {
    const patterns = [
        /(?:v=|\/embed\/|\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
        /^([a-zA-Z0-9_-]{11})$/,
    ];
    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) return match[1];
    }
    return null;
}

declare global {
    interface Window {
        YT: any;
        onYouTubeIframeAPIReady: () => void;
    }
}

export function InteractiveVideo({ url, checkpoints }: InteractiveVideoProps) {
    const videoId = getYouTubeId(url);
    const playerRef = useRef<any>(null);
    const iframeContainerRef = useRef<HTMLDivElement>(null);
    const pollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const playerReadyRef = useRef(false);

    const [completedCheckpoints, setCompletedCheckpoints] = useState<Set<string>>(new Set());
    const [currentCheckpoint, setCurrentCheckpoint] = useState<VideoCheckpoint | null>(null);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [isPlayerReady, setIsPlayerReady] = useState(false);

    const completedCheckpointsRef = useRef<Set<string>>(new Set());
    const currentCheckpointRef = useRef<VideoCheckpoint | null>(null);

    // Keep refs in sync with state
    useEffect(() => {
        completedCheckpointsRef.current = completedCheckpoints;
    }, [completedCheckpoints]);

    useEffect(() => {
        currentCheckpointRef.current = currentCheckpoint;
    }, [currentCheckpoint]);

    const stopPolling = useCallback(() => {
        if (pollIntervalRef.current) {
            clearInterval(pollIntervalRef.current);
            pollIntervalRef.current = null;
        }
    }, []);

    const startPolling = useCallback(() => {
        stopPolling();
        pollIntervalRef.current = setInterval(() => {
            if (!playerRef.current || !playerReadyRef.current) return;
            if (currentCheckpointRef.current) return; // Already showing a checkpoint

            try {
                const state = playerRef.current.getPlayerState();
                // YT.PlayerState.PLAYING = 1
                if (state !== 1) return;

                const currentSeconds: number = playerRef.current.getCurrentTime();
                const nextCheckpoint = checkpoints.find(
                    (cp) =>
                        !completedCheckpointsRef.current.has(cp.id) &&
                        currentSeconds >= cp.timeSeconds
                );

                if (nextCheckpoint) {
                    playerRef.current.pauseVideo();

                    // Exit fullscreen if active
                    if (typeof document !== 'undefined' && document.fullscreenElement) {
                        document.exitFullscreen().catch(() => {});
                    }

                    setCurrentCheckpoint(nextCheckpoint);
                    setSelectedAnswer(null);
                    setIsCorrect(null);
                }
            } catch {
                // player not ready yet
            }
        }, 500);
    }, [checkpoints, stopPolling]);

    const initPlayer = useCallback(() => {
        if (!videoId || !iframeContainerRef.current) return;

        if (playerRef.current) {
            try { playerRef.current.destroy(); } catch { /* ignore */ }
            playerRef.current = null;
            playerReadyRef.current = false;
        }

        playerRef.current = new window.YT.Player(iframeContainerRef.current, {
            videoId,
            width: '100%',
            height: '100%',
            playerVars: {
                modestbranding: 1,
                rel: 0,
                origin: typeof window !== 'undefined' ? window.location.origin : '',
            },
            events: {
                onReady: () => {
                    playerReadyRef.current = true;
                    setIsPlayerReady(true);
                    startPolling();
                },
                onStateChange: (event: any) => {
                    // YT.PlayerState.PLAYING = 1
                    if (event.data === 1) {
                        startPolling();
                    }
                },
            },
        });
    }, [videoId, startPolling]);

    useEffect(() => {
        if (!videoId) return;

        const loadAPI = () => {
            if (window.YT && window.YT.Player) {
                initPlayer();
            } else {
                window.onYouTubeIframeAPIReady = initPlayer;
                if (!document.getElementById('yt-iframe-api')) {
                    const script = document.createElement('script');
                    script.id = 'yt-iframe-api';
                    script.src = 'https://www.youtube.com/iframe_api';
                    document.head.appendChild(script);
                }
            }
        };

        loadAPI();

        return () => {
            stopPolling();
            if (playerRef.current) {
                try { playerRef.current.destroy(); } catch { /* ignore */ }
                playerRef.current = null;
                playerReadyRef.current = false;
            }
        };
    }, [videoId, initPlayer, stopPolling]);

    const handleAnswerSelect = (optionValue: string) => {
        if (!currentCheckpoint || isCorrect) return;

        setSelectedAnswer(optionValue);

        if (optionValue === currentCheckpoint.correctAnswer) {
            setIsCorrect(true);
            setTimeout(() => {
                setCompletedCheckpoints((prev) => new Set(prev).add(currentCheckpoint.id));
                setCurrentCheckpoint(null);
                setSelectedAnswer(null);
                setIsCorrect(null);
                // Resume video
                try {
                    playerRef.current?.playVideo();
                } catch { /* ignore */ }
            }, 1500);
        } else {
            setIsCorrect(false);
        }
    };

    if (!videoId) {
        return (
            <div className="w-full aspect-video bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                <p className="text-gray-400">Invalid video URL</p>
            </div>
        );
    }

    return (
        <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-lg border border-white/10">
            {/* YouTube IFrame Player Target */}
            <div ref={iframeContainerRef} className="w-full h-full" />

            {/* Checkpoint Overlay */}
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
                                        <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold shrink-0 ${isSelected ? 'border-current' : 'border-gray-500 text-gray-500'}`}>
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
        </div>
    );
}
