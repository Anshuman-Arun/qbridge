import { LatexBlock } from '@/components/features/LatexBlock';
import { PythonPlayground } from '@/components/features/PythonPlayground';
import { InteractiveGraph } from '@/components/features/InteractiveGraph';

export function Testlesson1urlLesson() {
    return (
        <div className="space-y-12">
            <div className="prose prose-invert max-w-none">
                <h2 className="text-3xl font-bold text-white mb-6">testlesson1</h2>
                <p className="text-xl text-gray-300 mb-8">
                    testlesson1description
                </p>
                
                <hr className="border-white/10 my-8" />

                <h3>Introduction</h3>
                <p>
                    Start writing your lesson content here. 
                    You can use <LatexBlock expression="E = mc^2" /> for math.
                </p>
            </div>

            {/* Example Interactive Section */}
            {/* 
            <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white">Interactive Demo</h3>
                <InteractiveGraph />
            </div> 
            */}
        </div>
    );
}
