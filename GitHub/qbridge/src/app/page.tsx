import { Hero } from "@/components/Hero";
import { FeatureGrid } from "@/components/FeatureGrid";

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      <Hero />
      <FeatureGrid />

      {/* Integrated About Section */}
      <section id="about" className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-12 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">About Us</h2>
            <div className="w-24 h-1 bg-brand-purple mx-auto rounded-full" />
          </div>

          <div className="glass-card p-8 md:p-12 rounded-2xl border border-white/10 space-y-6 backdrop-blur-xl">
            <p className="text-gray-300 leading-relaxed text-lg text-center">
              qBridge makes quantum computing accessible to late middle and early high school students through free, beginner-friendly camps. Only requiring an Algebra II background, our live virtual sessions teach the physics, mathematics, and coding at the heart of quantum computing.
            </p>
            <p className="text-gray-300 leading-relaxed text-lg text-center">
              From learning algorithms which can be used to break the most powerful of today's encryption codes to the physics behind Schrödinger's cat, students will gain a practical understanding of quantum computing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card p-8 rounded-2xl border border-white/10 hover:bg-white/5 transition-colors">
              <h3 className="text-xl font-bold text-brand-cyan mb-4">Who is this for?</h3>
              <p className="text-gray-400">
                Our courses are designed for students who have completed Algebra II. All other concepts, such as physics, coding, and linear algebra, will be taught as part of the course.
              </p>
            </div>
            <div className="glass-card p-8 rounded-2xl border border-white/10 hover:bg-white/5 transition-colors">
              <h3 className="text-xl font-bold text-brand-purple mb-4">Why is it free?</h3>
              <p className="text-gray-400">
                We believe education should be accessible to everyone. All our programs are completely free, and we offer a certificate of completion to all students who complete our programs!
              </p>
            </div>
          </div>
        </div>

        {/* Background Gradients */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-brand-purple/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-cyan/5 blur-[120px] rounded-full pointer-events-none" />
      </section>
    </div>
  );
}
