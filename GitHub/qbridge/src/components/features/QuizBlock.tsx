'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { MathText } from './MathText';
import 'katex/dist/katex.min.css';
import { InteractiveGraph } from './InteractiveGraph';
import { PythonPlayground } from './PythonPlayground';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react';

export interface QuizQuestionData {
    id: string;
    type: 'multiple_choice' | 'short_answer' | 'true_false' | 'python_output' | 'graph_vector';
    questionText: string;
    options?: string[];
    correctAnswer: string;
    tags: string[];
    points?: number;
}

interface QuizBlockProps {
    questions: QuizQuestionData[];
    moduleId: string;
    isFinalTest?: boolean;
    onSubmit?: (result: { score: number; maxScore: number; passed: boolean; answers: Record<string, string> }) => void;
}


export function QuizBlock({ questions, moduleId, isFinalTest = false, onSubmit }: QuizBlockProps) {
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [submitted, setSubmitted] = useState(false);
    const [result, setResult] = useState<{ score: number; maxScore: number; passed: boolean; breakdown: Record<string, boolean> } | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const passThreshold = isFinalTest ? 0.8 : 0.7;

    const setAnswer = useCallback((questionId: string, value: string) => {
        setAnswers(prev => ({ ...prev, [questionId]: value }));
    }, []);

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            // Client-side grading for immediate feedback
            let score = 0;
            const maxScore = questions.reduce((sum, q) => sum + (q.points || 1), 0);
            const breakdown: Record<string, boolean> = {};

            for (const q of questions) {
                const userAnswer = (answers[q.id] || '').trim();
                const correct = q.correctAnswer.trim();
                let isCorrect = false;

                switch (q.type) {
                    case 'multiple_choice':
                    case 'true_false':
                        isCorrect = userAnswer.toLowerCase() === correct.toLowerCase();
                        break;
                    case 'short_answer':
                        isCorrect = userAnswer.toLowerCase() === correct.toLowerCase();
                        break;
                    case 'python_output':
                        isCorrect = userAnswer === 'correct';
                        break;
                    case 'graph_vector':
                        isCorrect = userAnswer === 'correct';
                        break;
                }

                if (isCorrect) score += (q.points || 1);
                breakdown[q.id] = isCorrect;
            }

            const passed = (score / maxScore) >= passThreshold;
            const resultData = { score, maxScore, passed, breakdown };
            setResult(resultData);
            setSubmitted(true);

            if (onSubmit) {
                onSubmit({ score, maxScore, passed, answers });
            }

            try {
                const { submitQuiz } = await import('@/actions/submitQuiz');
                await submitQuiz({ moduleId, isFinalTest, answers, score, maxScore });
            } catch (err) {
                console.error('Failed to save quiz results:', err);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleRetry = () => {
        setAnswers({});
        setSubmitted(false);
        setResult(null);
    };

    const answeredCount = Object.keys(answers).length;
    const totalQuestions = questions.length;

    return (
        <div className="w-full max-w-4xl mx-auto space-y-6">
            {/* Quiz Header */}
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                <div>
                    <h3 className="text-xl font-bold text-white">
                        {isFinalTest ? 'Module Final Test' : 'Lesson Quiz'}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">
                        {isFinalTest
                            ? `Score at least ${passThreshold * 100}% to complete this module.`
                            : `Score at least ${passThreshold * 100}% to unlock the next lesson.`
                        }
                    </p>
                </div>
                <div className="text-right">
                    <div className="text-sm text-gray-400">{answeredCount}/{totalQuestions} answered</div>
                    {result && (
                        <div className={`text-lg font-bold ${result.passed ? 'text-green-400' : 'text-red-400'}`}>
                            {Math.round((result.score / result.maxScore) * 100)}%
                        </div>
                    )}
                </div>
            </div>

            {/* Questions */}
            <div className="space-y-6">
                {questions.map((q, index) => (
                    <QuestionRenderer
                        key={q.id}
                        question={q}
                        index={index}
                        answer={answers[q.id] || ''}
                        setAnswer={(val) => setAnswer(q.id, val)}
                        submitted={submitted}
                        isCorrect={result?.breakdown[q.id]}
                    />
                ))}
            </div>

            {/* Submit / Result */}
            <div className="flex items-center gap-4">
                {!submitted ? (
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting || answeredCount < totalQuestions}
                        className="flex items-center gap-2 px-6 py-3 bg-brand-purple text-white font-semibold rounded-xl hover:bg-brand-purple/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        ) : (
                            <ArrowRight className="w-4 h-4" />
                        )}
                        Submit Quiz
                    </button>
                ) : (
                    <>
                        {result && !result.passed && (
                            <button
                                onClick={handleRetry}
                                className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors"
                            >
                                <RotateCcw className="w-4 h-4" />
                                Retry Quiz
                            </button>
                        )}
                        {result && (
                            <div className={`flex items-center gap-2 text-lg font-bold ${result.passed ? 'text-green-400' : 'text-red-400'}`}>
                                {result.passed ? (
                                    <><CheckCircle2 className="w-5 h-5" /> Passed!</>
                                ) : (
                                    <><XCircle className="w-5 h-5" /> Not Passed — Review the highlighted questions and try again</>
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

// --- Individual Question Renderers ---

function QuestionRenderer({
    question,
    index,
    answer,
    setAnswer,
    submitted,
    isCorrect,
}: {
    question: QuizQuestionData;
    index: number;
    answer: string;
    setAnswer: (val: string) => void;
    submitted: boolean;
    isCorrect?: boolean;
}) {
    return (
        <div className={`p-6 rounded-xl border transition-all ${submitted
            ? isCorrect
                ? 'border-green-500/30 bg-green-500/5'
                : 'border-red-500/30 bg-red-500/5'
            : 'border-white/10 bg-white/5'
            }`}>
            <div className="flex items-start gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-brand-purple/20 text-brand-purple flex items-center justify-center text-sm font-bold shrink-0">
                    {index + 1}
                </span>
                <div className="flex-1">
                    <MathText text={question.questionText} className="text-white font-medium" />
                </div>
                {submitted && (
                    <div className="shrink-0">
                        {isCorrect
                            ? <CheckCircle2 className="w-5 h-5 text-green-400" />
                            : <XCircle className="w-5 h-5 text-red-400" />
                        }
                    </div>
                )}
            </div>

            <div className="ml-11">
                {question.type === 'multiple_choice' && (
                    <MultipleChoiceInput
                        options={question.options || []}
                        selected={answer}
                        onSelect={setAnswer}
                        disabled={submitted}
                        // Never reveal the correct answer — only highlight user selection as right/wrong
                        userIsCorrect={submitted ? isCorrect : undefined}
                    />
                )}
                {question.type === 'true_false' && (
                    <TrueFalseInput
                        selected={answer}
                        onSelect={setAnswer}
                        disabled={submitted}
                    />
                )}
                {question.type === 'short_answer' && (
                    <ShortAnswerInput
                        value={answer}
                        onChange={setAnswer}
                        disabled={submitted}
                        isCorrect={submitted ? isCorrect : undefined}
                    />
                )}
                {question.type === 'python_output' && (
                    <PythonOutputQuestion
                        question={question}
                        onValidation={(isCorrect) => setAnswer(isCorrect ? 'correct' : 'incorrect')}
                        disabled={submitted}
                    />
                )}
                {question.type === 'graph_vector' && (
                    <GraphVectorQuestion
                        question={question}
                        onValidation={(isCorrect) => setAnswer(isCorrect ? 'correct' : 'incorrect')}
                        disabled={submitted}
                    />
                )}
            </div>
        </div>
    );
}

function MultipleChoiceInput({
    options,
    selected,
    onSelect,
    disabled,
    userIsCorrect,
}: {
    options: string[];
    selected: string;
    onSelect: (val: string) => void;
    disabled: boolean;
    userIsCorrect?: boolean; // undefined = not yet submitted
}) {
    return (
        <div className="space-y-2">
            {options.map((option, i) => {
                const letter = String.fromCharCode(65 + i); // A, B, C, D
                const isSelected = selected === letter;

                // After submit: color only the selected answer red/green; leave others neutral
                let borderClass = 'border-white/10 bg-white/5 hover:bg-white/10';
                if (isSelected) {
                    if (disabled) {
                        borderClass = userIsCorrect
                            ? 'border-green-500/50 bg-green-500/10'
                            : 'border-red-500/50 bg-red-500/10';
                    } else {
                        borderClass = 'border-brand-purple/50 bg-brand-purple/10';
                    }
                }

                return (
                    <button
                        key={i}
                        onClick={() => !disabled && onSelect(letter)}
                        disabled={disabled}
                        className={`w-full text-left p-3 rounded-lg border transition-all flex items-center gap-3 ${borderClass} ${disabled ? 'cursor-default' : 'cursor-pointer'}`}
                    >
                        <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold ${isSelected ? 'border-brand-purple bg-brand-purple text-white' : 'border-gray-600 text-gray-500'
                            }`}>
                            {letter}
                        </span>
                        <MathText text={option} className="text-gray-200 text-sm" />
                    </button>
                );
            })}
        </div>
    );
}

function TrueFalseInput({
    selected,
    onSelect,
    disabled,
}: {
    selected: string;
    onSelect: (val: string) => void;
    disabled: boolean;
}) {
    return (
        <div className="flex gap-3">
            {['true', 'false'].map((val) => (
                <button
                    key={val}
                    onClick={() => !disabled && onSelect(val)}
                    disabled={disabled}
                    className={`px-6 py-3 rounded-lg border font-medium transition-all ${selected === val
                        ? 'border-brand-purple/50 bg-brand-purple/10 text-brand-purple'
                        : 'border-white/10 bg-white/5 text-gray-400 hover:bg-white/10'
                        } ${disabled ? 'cursor-default' : 'cursor-pointer'}`}
                >
                    {val.charAt(0).toUpperCase() + val.slice(1)}
                </button>
            ))}
        </div>
    );
}

function ShortAnswerInput({
    value,
    onChange,
    disabled,
    isCorrect,
}: {
    value: string;
    onChange: (val: string) => void;
    disabled: boolean;
    isCorrect?: boolean;
}) {
    const borderColor = disabled
        ? isCorrect
            ? 'border-green-500/50 focus:border-green-500/50'
            : 'border-red-500/50 focus:border-red-500/50'
        : 'border-white/10 focus:border-brand-purple/50';

    return (
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            placeholder="Type your answer..."
            className={`w-full bg-black/30 border ${borderColor} rounded-lg px-4 py-3 text-gray-200 placeholder-gray-600 focus:outline-none disabled:opacity-60 transition-colors`}
        />
    );
}

function PythonOutputQuestion({
    question,
    onValidation,
    disabled,
}: {
    question: QuizQuestionData;
    onValidation: (isCorrect: boolean) => void;
    disabled: boolean;
}) {
    return (
        <div className={disabled ? 'pointer-events-none opacity-70' : ''}>
            <p className="text-sm text-gray-400 mb-3">Write code that produces the expected output:</p>
            <PythonPlayground
                instructions={question.questionText}
                expectedOutput={question.correctAnswer}
                onValidation={(isCorrect) => onValidation(isCorrect)}
            />
        </div>
    );
}

function GraphVectorQuestion({
    question,
    onValidation,
    disabled,
}: {
    question: QuizQuestionData;
    onValidation: (isCorrect: boolean) => void;
    disabled: boolean;
}) {
    const [targetX, targetY] = question.correctAnswer.split(',').map(Number);

    return (
        <div className={disabled ? 'pointer-events-none opacity-70' : ''}>
            <p className="text-sm text-gray-400 mb-3">Drag the point to the correct position:</p>
            <InteractiveGraph
                mode="vector"
                targetPoint={[targetX, targetY]}
                tolerance={0.5}
                showCheckButton={true}
                snap={1}
                onValidation={(isCorrect) => onValidation(isCorrect)}
            />
        </div>
    );
}
