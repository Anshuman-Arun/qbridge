export type BlockType = 'text' | 'latex' | 'graph' | 'python' | 'quiz';

export interface LessonBlock {
    id: string;
    type: BlockType;
    content: string;
    config?: BlockConfig;
}

// --- Per-block configuration ---

export interface TextBlockConfig {
    heading?: string;
    style?: 'prose' | 'callout' | 'definition';
}

export interface LatexBlockConfig {
    title?: string;
    description?: string;
    displayMode?: boolean;
}

export interface GraphBlockConfig {
    mode?: 'point' | 'vector' | 'line' | 'function';
    title?: string;
    description?: string;
    snap?: number | boolean;
    functions?: string[];
    xLabel?: string;
    yLabel?: string;
    viewBox?: { xMin: number; xMax: number; yMin: number; yMax: number };
    targetPoint?: [number, number];
    tolerance?: number;
}

export interface PythonBlockConfig {
    title?: string;
    instructions?: string;
    starterCode?: string;
    expectedOutput?: string;
}

export interface QuizBlockConfig {
    questions: QuizQuestion[];
    isFinalTest?: boolean;
}

export interface QuizQuestion {
    id: string;
    type: 'multiple_choice' | 'short_answer' | 'true_false' | 'python_output' | 'graph_vector';
    questionText: string;
    options?: string[];
    correctAnswer: string;
    tags: string[];
    points?: number;
}

export type BlockConfig =
    | TextBlockConfig
    | LatexBlockConfig
    | GraphBlockConfig
    | PythonBlockConfig
    | QuizBlockConfig;
