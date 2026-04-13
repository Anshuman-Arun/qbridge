import { LatexBlock } from '@/components/features/LatexBlock';
import { PythonPlayground } from '@/components/features/PythonPlayground';
import { InteractiveGraph } from '@/components/features/InteractiveGraph';

export default function FeaturesDemoPage() {
    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-12 px-6 overflow-hidden relative">
            <div className="max-w-7xl mx-auto space-y-16 relative z-10">

                {/* Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-cyan via-white to-brand-purple">
                        New Feature Capabilities
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Demonstrating the new backend and interactive learning modules.
                    </p>
                </div>

                {/* Section 1: LaTeX */}
                <section className="space-y-6">
                    <div className="border-b border-white/10 pb-4">
                        <h2 className="text-2xl font-bold text-white">1. LaTeX Rendering</h2>
                        <p className="text-sm text-gray-500">Powered by KaTeX</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="p-6 rounded-xl border border-white/10 bg-white/5">
                            <h3 className="text-sm font-mono text-gray-400 mb-4">Inline Math</h3>
                            <p className="text-lg">
                                The Schrödinger equation <LatexBlock expression="i\hbar\frac{\partial}{\partial t}\Psi = \hat{H}\Psi" /> describes how the quantum state of a physical system changes over time.
                            </p>
                        </div>
                        <div className="p-6 rounded-xl border border-white/10 bg-white/5">
                            <h3 className="text-sm font-mono text-gray-400 mb-4">Block Math</h3>
                            <LatexBlock
                                displayMode
                                expression="\int_{-\infty}^{\infty} |\Psi(x,t)|^2 dx = 1"
                                className="text-2xl"
                            />
                        </div>
                    </div>
                </section>

                {/* Section 2: Interactive Graphs */}
                <section className="space-y-6">
                    <div className="border-b border-white/10 pb-4">
                        <h2 className="text-2xl font-bold text-white">2. Interactive Graphs</h2>
                        <p className="text-sm text-gray-500">Powered by Mafs</p>
                    </div>
                    <InteractiveGraph />
                </section>

                {/* Section 3: Python Execution */}
                <section className="space-y-6">
                    <div className="border-b border-white/10 pb-4">
                        <h2 className="text-2xl font-bold text-white">3. Python Browser Sandbox</h2>
                        <p className="text-sm text-gray-500">Powered by Pyodide (WASM)</p>
                    </div>
                    <PythonPlayground />
                </section>

            </div>

            {/* Background Gradients */}
            <div className="fixed top-20 right-0 w-[500px] h-[500px] bg-brand-purple/20 rounded-full blur-[128px] pointer-events-none" />
            <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-brand-cyan/10 rounded-full blur-[128px] pointer-events-none" />
        </div>
    );
}
