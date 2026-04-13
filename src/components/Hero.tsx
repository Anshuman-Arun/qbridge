import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { HeroAnimation } from "./HeroAnimation";

export function Hero() {
    return (
        <section className="relative w-full min-h-[90vh] flex items-center">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-brand-purple/20 blur-[120px] rounded-full mix-blend-screen" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-brand-cyan/20 blur-[120px] rounded-full mix-blend-screen" />
                <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] bg-blue-600/10 blur-[100px] rounded-full mix-blend-screen" />
            </div>

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 w-full">
                {/* Text Content */}
                <div className="space-y-8">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]">
                        Build the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-white to-brand-purple animate-gradient-x">
                            Future
                        </span>
                        <br />
                        One Qubit at a Time.
                    </h1>

                    <p className="text-lg md:text-xl text-gray-400 max-w-lg leading-relaxed">
                        Interactive quantum computing education for everyone. visuals, run real circuits in your browser, and bridge the gap to the quantum future.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                            href="/learn"
                            className="px-8 py-4 rounded-xl bg-brand-purple text-white font-semibold hover:bg-brand-purple/90 transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] flex items-center justify-center gap-2 group"
                        >
                            Start Learning
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <Link
                            href="/programs"
                            className="px-8 py-4 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/5 transition-all flex items-center justify-center gap-2 group"
                        >
                            <BookOpen className="w-5 h-5 fill-white" />
                            Our Programs
                        </Link>
                    </div>
                </div>

                {/* Visual Element Placeholder */}
                {/* Visual Element */}
                <HeroAnimation />
            </div>
        </section>
    );
}
