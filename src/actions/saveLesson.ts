"use server";

import fs from 'fs/promises';
import path from 'path';
import { createClient } from '@/lib/supabase/server';
import { LessonBlock, GraphBlockConfig, PythonBlockConfig, LatexBlockConfig, TextBlockConfig, QuizBlockConfig } from '@/components/builder/types';

export async function saveLesson(filename: string, blocks: LessonBlock[], existingSlug?: string) {
    // Auth guard — server actions can be called directly via POST, so we must check here
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { success: false, error: 'Unauthorized' };
    }

    if (!filename || !/^[a-zA-Z0-9_-]+$/.test(filename)) {
        return { success: false, error: "Invalid filename. Use alphanumeric characters, underscores, or hyphens." };
    }

    // If updating, find the existing file
    const contentDir = path.join(process.cwd(), 'src', 'components', 'content');
    let filePath: string;

    if (existingSlug) {
        // Search for existing file across all course folders
        const dirs = await fs.readdir(contentDir).catch(() => []);
        let found = false;
        filePath = '';

        for (const dir of dirs) {
            const dirPath = path.join(contentDir, dir);
            const stat = await fs.stat(dirPath).catch(() => null);
            if (stat?.isDirectory()) {
                const files = await fs.readdir(dirPath).catch(() => []);
                for (const file of files) {
                    if (file.toLowerCase().includes(existingSlug.toLowerCase().replace(/-/g, ''))) {
                        filePath = path.join(dirPath, file);
                        found = true;
                        break;
                    }
                }
                if (found) break;
            }
        }

        if (!found) {
            filePath = path.join(contentDir, 'lessons', `${filename}.tsx`);
        }
    } else {
        filePath = path.join(contentDir, 'lessons', `${filename}.tsx`);
    }

    // Ensure directory exists
    try {
        await fs.mkdir(path.dirname(filePath), { recursive: true });
    } catch (err) {
        console.error("Error creating directory:", err);
        return { success: false, error: "Failed to create directory." };
    }

    // Generate Imports
    const imports = [
        `import React from 'react';`,
    ];

    const usedTypes = new Set(blocks.map(b => b.type));
    if (usedTypes.has('latex')) imports.push(`import { LatexBlock } from '@/components/features/LatexBlock';`);
    if (usedTypes.has('graph')) imports.push(`import { InteractiveGraph } from '@/components/features/InteractiveGraph';`);
    if (usedTypes.has('python')) imports.push(`import { PythonPlayground } from '@/components/features/PythonPlayground';`);
    if (usedTypes.has('quiz')) imports.push(`import { QuizBlock } from '@/components/features/QuizBlock';`);

    // Generate JSX Content
    const jsxContent = blocks.map((block) => {
        switch (block.type) {
            case 'text': {
                const config = (block.config || {}) as TextBlockConfig;
                const heading = config.heading ? `\n                <h3 className="text-2xl font-bold text-white mb-4">${config.heading}</h3>` : '';
                const styleClass = config.style === 'callout'
                    ? 'bg-brand-cyan/5 border border-brand-cyan/20 rounded-xl p-6'
                    : config.style === 'definition'
                        ? 'bg-brand-purple/5 border-l-4 border-brand-purple pl-6 py-4'
                        : 'prose prose-invert max-w-none';
                return `
            <div className="${styleClass} my-6">${heading}
                <p>${block.content.replace(/"/g, '&quot;')}</p>
            </div>`;
            }
            case 'latex': {
                const config = (block.config || {}) as LatexBlockConfig;
                const title = config.title ? `\n                <h4 className="text-lg font-semibold text-white mb-2">${config.title}</h4>` : '';
                const desc = config.description ? `\n                <p className="text-sm text-gray-400 mt-2">${config.description}</p>` : '';
                return `
            <div className="my-6">${title}
                <LatexBlock displayMode={${config.displayMode !== false}} expression={${JSON.stringify(block.content || '')}} />${desc}
            </div>`;
            }
            case 'graph': {
                const config = (block.config || {}) as GraphBlockConfig;
                const props: string[] = [];
                if (config.mode) props.push(`mode="${config.mode}"`);
                if (config.title) props.push(`title="${config.title}"`);
                if (config.description) props.push(`description="${config.description}"`);
                if (config.snap) props.push(`snap={${typeof config.snap === 'number' ? config.snap : 'true'}}`);
                if (config.xLabel) props.push(`xLabel="${config.xLabel}"`);
                if (config.yLabel) props.push(`yLabel="${config.yLabel}"`);
                if (config.functions?.length) props.push(`functions={${JSON.stringify(config.functions)}}`);
                if (config.targetPoint) props.push(`targetPoint={[${config.targetPoint.join(',')}]}`);
                if (config.tolerance) props.push(`tolerance={${config.tolerance}}`);
                return `
            <div className="my-8">
                <InteractiveGraph ${props.join(' ')} />
            </div>`;
            }
            case 'python': {
                const config = (block.config || {}) as PythonBlockConfig;
                const props: string[] = [];
                if (config.title) props.push(`title="${config.title}"`);
                if (config.instructions) props.push(`instructions="${config.instructions}"`);
                if (config.starterCode) props.push(`starterCode={${JSON.stringify(config.starterCode)}}`);
                if (config.expectedOutput) props.push(`expectedOutput="${config.expectedOutput}"`);
                return `
            <div className="my-8">
                <PythonPlayground ${props.join(' ')} />
            </div>`;
            }
            case 'quiz': {
                const config = (block.config || { questions: [] }) as QuizBlockConfig;
                return `
            <div className="my-8">
                <QuizBlock
                    moduleId="" {/* Set this to the module's UUID */}
                    isFinalTest={${config.isFinalTest || false}}
                    questions={${JSON.stringify(config.questions, null, 8)}}
                />
            </div>`;
            }
            default:
                return '';
        }
    }).join('\n');

    const fileContent = `
${imports.join('\n')}

export function ${filename.replace(/-/g, '_')}() {
    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold text-white mb-8 border-b border-white/10 pb-4">${filename}</h1>
            
            <div className="space-y-4">
                ${jsxContent}
            </div>
        </div>
    );
}
`;

    try {
        await fs.writeFile(filePath, fileContent.trim());
        return { success: true, path: filePath };
    } catch (error) {
        console.error("Error writing file:", error);
        return { success: false, error: "Failed to write file." };
    }
}
