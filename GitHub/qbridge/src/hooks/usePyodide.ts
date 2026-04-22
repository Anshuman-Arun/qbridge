'use client';

import { useState, useEffect, useRef } from 'react';

declare global {
    interface Window {
        loadPyodide: any;
    }
}

export function usePyodide() {
    const [pyodide, setPyodide] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [output, setOutput] = useState<string[]>([]);
    const outputRef = useRef<string[]>([]); // Keep track of output synchronously
    const isRunning = useRef(false);

    // Update state and ref
    const appendOutput = (msg: string) => {
        setOutput((prev) => [...prev, msg]);
        outputRef.current.push(msg);
    };

    useEffect(() => {
        const loadScript = async () => {
            if (window.loadPyodide && !pyodide) {
                try {
                    const py = await window.loadPyodide({
                        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/"
                    });
                    // Redirect stdout
                    py.setStdout({ batched: (msg: string) => appendOutput(msg) });
                    setPyodide(py);
                    setIsLoading(false);
                } catch (e) {
                    console.error("Failed to re-initialize pyodide", e);
                }
                return;
            }

            if (pyodide) return;

            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js';
            script.async = true;
            script.onload = async () => {
                try {
                    const py = await window.loadPyodide({
                        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/"
                    });
                    // Redirect stdout
                    py.setStdout({ batched: (msg: string) => appendOutput(msg) });
                    setPyodide(py);
                } catch (e) {
                    console.error(e);
                } finally {
                    setIsLoading(false);
                }
            };
            document.body.appendChild(script);
        };

        loadScript();
    }, []); // Singleton effect essentially

    const runPython = async (code: string) => {
        if (!pyodide || isRunning.current) return [];

        isRunning.current = true;
        setOutput([]); // Clear previous output
        outputRef.current = []; // Clear ref

        try {
            // We can also capture the return value
            const result = await pyodide.runPythonAsync(code);
            if (result !== undefined) {
                appendOutput(String(result));
            }
        } catch (error: any) {
            appendOutput(`Error: ${error.message}`);
        } finally {
            isRunning.current = false;
        }

        return outputRef.current;
    };

    return { isLoading, runPython, output, setOutput };
}
