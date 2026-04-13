import React from 'react';
import { QuizBlock } from '@/components/features/QuizBlock';

export default function WaveParticleDualityLesson() {
        return (
                <div className="max-w-4xl mx-auto py-8 px-4">
                        <h1 className="text-3xl font-bold text-white mb-8 border-b border-white/10 pb-4">wave-particle-duality</h1>

                        <div className="space-y-4">

                                <div className="my-8">
                                        <QuizBlock
                                                moduleId="" /* Set this to the module's UUID */
                                                isFinalTest={false}
                                                questions={[
                                                        {
                                                                "id": "cw99yesv",
                                                                "type": "multiple_choice",
                                                                "questionText": "What is correct answer",
                                                                "options": [
                                                                        "A correct",
                                                                        "B",
                                                                        "C",
                                                                        "D"
                                                                ],
                                                                "correctAnswer": "A",
                                                                "tags": [],
                                                                "points": 1
                                                        },
                                                        {
                                                                "id": "ndolnhw9",
                                                                "type": "python_output",
                                                                "questionText": "Write code to return \"gello world\"",
                                                                "options": [
                                                                        "",
                                                                        "",
                                                                        "",
                                                                        ""
                                                                ],
                                                                "correctAnswer": "gello world",
                                                                "tags": [],
                                                                "points": 1
                                                        },
                                                        {
                                                                "id": "xr4p1mam",
                                                                "type": "graph_vector",
                                                                "questionText": "abcd",
                                                                "options": [
                                                                        "",
                                                                        "",
                                                                        "",
                                                                        ""
                                                                ],
                                                                "correctAnswer": "a",
                                                                "tags": [],
                                                                "points": 1
                                                        }
                                                ]}
                                        />
                                </div>
                        </div>
                </div>
        );
}