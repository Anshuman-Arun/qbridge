const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const PACKAGES_DIR = path.join(__dirname, '../src/components/content');

const questions = [
    { key: 'mode', question: 'Select mode:\n1. Create New Lesson\n2. Add Quiz Question to Existing Lesson\n3. Create Module Final Test\n> ', default: '1' },
];

function ask(question) {
    return new Promise((resolve) => rl.question(question, resolve));
}

function toPascalCase(str) {
    return str.replace(/(^\w|-\w)/g, (match) => match.replace('-', '').toUpperCase());
}

async function main() {
    console.log("🚀 QBridge Lesson Builder CLI");
    const mode = await ask(questions[0].question) || '1';

    if (mode === '1') {
        await createNewLesson();
    } else if (mode === '2') {
        await addQuizQuestion();
    } else if (mode === '3') {
        await createFinalTest();
    } else {
        console.log("Invalid mode.");
    }
    rl.close();
}

async function createNewLesson() {
    // 1. Get Course Directory
    const courseDirs = fs.readdirSync(PACKAGES_DIR).filter(f => fs.statSync(path.join(PACKAGES_DIR, f)).isDirectory());
    console.log("\nSelect Course:");
    courseDirs.forEach((dir, i) => console.log(`${i + 1}. ${dir}`));
    const courseIdx = await ask("> ");
    const course = courseDirs[parseInt(courseIdx) - 1];

    if (!course) {
        console.error("Invalid course selected.");
        return;
    }

    // 2. Lesson Details
    const title = await ask("Lesson Title: ");
    const slug = await ask(`Lesson Slug (default: ${title.toLowerCase().replace(/\s+/g, '-')}): `) || title.toLowerCase().replace(/\s+/g, '-');
    const desc = await ask("Description: ");
    const orderIndex = await ask("Order Index (default: 1): ") || "1";

    // 3. Generate Basic Component
    const className = toPascalCase(slug) + 'Lesson';
    const filePath = path.join(PACKAGES_DIR, course, `${className}.tsx`);

    const fileContent = `import React from 'react';
import { LatexBlock } from '@/components/features/LatexBlock';
import { InteractiveGraph } from '@/components/features/InteractiveGraph';
import { PythonPlayground } from '@/components/features/PythonPlayground';

export default function ${className}() {
    return (
        <div className="space-y-8">
            <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-white">${title}</h2>
                <p>${desc}</p>
            </div>

            {/* Content placeholders - Customize using the Builder UI */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center text-gray-500 italic">
                Use the visual builder to add rich content here.
            </div>
        </div>
    );
}
`;

    fs.writeFileSync(filePath, fileContent);
    console.log(`\n✅ Created component: ${filePath}`);

    // 4. Update Registry
    updateRegistry(slug, className, course);

    // 5. Generate SQL
    const moduleId = crypto.randomUUID();
    const sql = `
-- Insert Module for ${title}
INSERT INTO public.modules (id, course_id, title, slug, description, order_index, module_type)
VALUES (
    '${moduleId}',
    (SELECT id FROM public.courses WHERE slug = '${course.toLowerCase()}' LIMIT 1),
    '${title}',
    '${slug}',
    '${desc}',
    ${orderIndex},
    'lesson'
);
`;
    console.log("\n📋 Run this SQL in Supabase to register the module:");
    console.log(sql);
}

async function addQuizQuestion() {
    const moduleId = await ask("Module ID (UUID): ");
    if (!moduleId) return;

    console.log("\nSelect Question Type:");
    console.log("1. Multiple Choice");
    console.log("2. Short Answer");
    console.log("3. Python Output");
    console.log("4. Graph Vector");
    const typeIdx = await ask("> ");
    const types = ['multiple_choice', 'short_answer', 'python_output', 'graph_vector'];
    const type = types[parseInt(typeIdx) - 1] || 'multiple_choice';

    const text = await ask("Question Text: ");
    const correctAnswer = await ask("Correct Answer: ");

    let options = 'null';
    if (type === 'multiple_choice') {
        const opts = await ask("Options (comma separated, e.g. A,B,C,D): ");
        options = `'${JSON.stringify(opts.split(',').map(s => s.trim()))}'`;
    }

    const tags = await ask("Tags (comma separated): ");
    const tagArray = `{${tags.split(',').map(t => `"${t.trim()}"`).join(',')}}`;

    const sql = `
INSERT INTO public.quiz_questions (module_id, question_type, question_text, correct_answer, options, tags)
VALUES ('${moduleId}', '${type}', '${text.replace(/'/g, "''")}', '${correctAnswer.replace(/'/g, "''")}', ${options}, '${tagArray}');
`;
    console.log("\n📋 Run this SQL to add the question:");
    console.log(sql);
}

async function createFinalTest() {
    const courseSlug = await ask("Course Slug (e.g. mathematics): ");
    if (!courseSlug) return;

    console.log("Generating final test setup SQL...");
    // Final tests are just questions with is_final_test = true
    // We typically attach them to the *last* module of the course, or any module really,
    // but semantically they belong to the course.
    // For simplicity, we'll ask for a module ID to query by.
    const moduleId = await ask("Module ID to attach questions to (usually the last module): ");

    const sql = `
-- Example Final Test Question
INSERT INTO public.quiz_questions (module_id, question_type, question_text, correct_answer, options, tags, is_final_test, points)
VALUES
('${moduleId}', 'multiple_choice', 'Final Test Question 1', 'A', '["A", "B", "C", "D"]', '{"final"}', true, 5),
('${moduleId}', 'short_answer', 'Final Test Question 2', '42', null, '{"final"}', true, 5);
`;

    console.log("\n📋 SQL Template for Final Test Questions:");
    console.log(sql);
}

function updateRegistry(slug, className, courseDir) {
    const registryPath = path.join(__dirname, '../src/components/content/registry.ts');
    let content = fs.readFileSync(registryPath, 'utf8');

    // Add import if missing
    const importStmt = `import ${className} from './${courseDir}/${className}';`;
    if (!content.includes(importStmt)) {
        // Find last import
        const lastImportIdx = content.lastIndexOf('import ');
        const endOfImports = content.indexOf(';', lastImportIdx) + 1;
        content = content.slice(0, endOfImports) + '\n' + importStmt + content.slice(endOfImports);
    }

    // Add dictionary entry
    const entry = `'${slug}': ${className},`;
    if (!content.includes(entry)) {
        const insertIdx = content.lastIndexOf('};');
        content = content.slice(0, insertIdx) + `    ${entry}\n` + content.slice(insertIdx);
    }

    fs.writeFileSync(registryPath, content);
    console.log("✅ Registry updated.");
}

main();
