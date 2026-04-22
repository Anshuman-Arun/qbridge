'use client';

import { useState, useEffect, useRef } from 'react';

interface UseMinTimeResult {
    ready: boolean;
    elapsed: number;
    remaining: number;
    minutesRequired: number;
}

/**
 * Tracks time spent on a page in seconds.
 * @param requiredSeconds - how many seconds must pass before `ready` is true
 * @param bypass - if true, immediately returns ready=true (DEV_UNLOCK_ALL mode)
 */
export function useMinTime(requiredSeconds: number, bypass: boolean): UseMinTimeResult {
    const [elapsed, setElapsed] = useState(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        if (bypass) return;
        intervalRef.current = setInterval(() => {
            setElapsed(prev => prev + 1);
        }, 1000);
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [bypass]);

    const ready = bypass || elapsed >= requiredSeconds;
    const remaining = Math.max(0, requiredSeconds - elapsed);
    const minutesRequired = Math.ceil(requiredSeconds / 60);

    return { ready, elapsed, remaining, minutesRequired };
}
