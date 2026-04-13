"use server";

import { createClient } from '@/lib/supabase/server';

interface SubmitQuizInput {
    moduleId: string;
    isFinalTest: boolean;
    answers: Record<string, string>;
    score: number;
    maxScore: number;
}

export async function submitQuiz(input: SubmitQuizInput) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { success: false, error: 'Not authenticated' };
    }

    try {
        // 1. Fetch questions for tag/answer grading
        const { data: questions } = await supabase
            .from('quiz_questions')
            .select('id, tags, correct_answer, points')
            .eq('module_id', input.moduleId)
            .eq('is_final_test', input.isFinalTest);

        // 2. Compute per-tag scores for THIS attempt
        const newTagScores: Record<string, { correct: number; attempted: number }> = {};

        if (questions) {
            for (const question of questions) {
                const userAnswer = input.answers[question.id];
                const isCorrect =
                    userAnswer?.toLowerCase().trim() === question.correct_answer.toLowerCase().trim() ||
                    userAnswer === 'correct';

                for (const tag of (question.tags || [])) {
                    if (!newTagScores[tag]) newTagScores[tag] = { correct: 0, attempted: 0 };
                    newTagScores[tag].attempted += (question.points || 1);
                    if (isCorrect) newTagScores[tag].correct += (question.points || 1);
                }
            }
        }

        // 3. Fetch the PREVIOUS attempt for this module (to subtract its contribution)
        const { data: previousAttempt } = await supabase
            .from('quiz_attempts')
            .select('answers, score, max_score')
            .eq('user_id', user.id)
            .eq('module_id', input.moduleId)
            .eq('is_final_test', input.isFinalTest)
            .order('completed_at', { ascending: false })
            .limit(1)
            .single();

        // 4. Compute per-tag scores for the PREVIOUS attempt (so we can subtract)
        const oldTagScores: Record<string, { correct: number; attempted: number }> = {};

        if (previousAttempt && questions) {
            const prevAnswers = previousAttempt.answers as Record<string, string>;
            for (const question of questions) {
                const prevAnswer = prevAnswers[question.id];
                const wasCorrect =
                    prevAnswer?.toLowerCase().trim() === question.correct_answer.toLowerCase().trim() ||
                    prevAnswer === 'correct';

                for (const tag of (question.tags || [])) {
                    if (!oldTagScores[tag]) oldTagScores[tag] = { correct: 0, attempted: 0 };
                    oldTagScores[tag].attempted += (question.points || 1);
                    if (wasCorrect) oldTagScores[tag].correct += (question.points || 1);
                }
            }
        }

        // 5. Insert new quiz attempt
        const { error: attemptError } = await supabase
            .from('quiz_attempts')
            .insert({
                user_id: user.id,
                module_id: input.moduleId,
                is_final_test: input.isFinalTest,
                score: input.score,
                max_score: input.maxScore,
                answers: input.answers,
            });

        if (attemptError) {
            console.error('Error inserting quiz attempt:', attemptError);
            return { success: false, error: attemptError.message };
        }

        // 6. Update quiz_scores: subtract old, add new (net delta = new - old)
        const allTags = new Set([...Object.keys(newTagScores), ...Object.keys(oldTagScores)]);

        for (const tag of allTags) {
            const newS = newTagScores[tag] ?? { correct: 0, attempted: 0 };
            const oldS = oldTagScores[tag] ?? { correct: 0, attempted: 0 };

            const { data: existing } = await supabase
                .from('quiz_scores')
                .select('id, total_correct, total_attempted')
                .eq('user_id', user.id)
                .eq('tag', tag)
                .single();

            if (existing) {
                const updatedCorrect = Math.max(0, existing.total_correct - oldS.correct + newS.correct);
                const updatedAttempted = Math.max(0, existing.total_attempted - oldS.attempted + newS.attempted);
                await supabase
                    .from('quiz_scores')
                    .update({
                        total_correct: updatedCorrect,
                        total_attempted: updatedAttempted,
                        updated_at: new Date().toISOString(),
                    })
                    .eq('id', existing.id);
            } else {
                await supabase
                    .from('quiz_scores')
                    .insert({
                        user_id: user.id,
                        tag,
                        total_correct: newS.correct,
                        total_attempted: newS.attempted,
                    });
            }
        }

        return {
            success: true,
            score: input.score,
            maxScore: input.maxScore,
            passed: input.isFinalTest
                ? (input.score / input.maxScore) >= 0.8
                : (input.score / input.maxScore) >= 0.7,
        };
    } catch (error) {
        console.error('Unexpected error submitting quiz:', error);
        return { success: false, error: 'Unexpected error' };
    }
}
