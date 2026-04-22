import { Beaker, Eye, TrendingUp } from "lucide-react";

export function FeatureGrid() {
    const features = [
        {
            icon: <Beaker className="w-8 h-8 text-brand-purple" />,
            title: "Interactive Labs",
            description: "Don't just read about quantum mechanics. Experiment with real-time circuit simulations and visualize the results instantly.",
            gradient: "from-brand-purple/20 to-transparent"
        },
        {
            icon: <Eye className="w-8 h-8 text-brand-cyan" />,
            title: "Visual Theory",
            description: "Complex concepts broken down into intuitive 3D visualizations. Understand superposition and entanglement visually.",
            gradient: "from-brand-cyan/20 to-transparent"
        },
        {
            icon: <TrendingUp className="w-8 h-8 text-pink-500" />,
            title: "Progress Tracking",
            description: "Track your journey from quantum novice to expert. Earn badges and certificates as you master new concepts.",
            gradient: "from-pink-500/20 to-transparent"
        }
    ];

    return (
        <section className="py-24 relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Why qBridge?</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        We bridge the gap between abstract theory and practical application, making quantum computing accessible to everyone.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group relative p-8 rounded-2xl glass-card border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-2"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />

                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform duration-300">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                                </div>

                                <p className="text-gray-400 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
