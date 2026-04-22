"use server";

import { createClient } from '@/lib/supabase/server';
import type { LessonBlock } from '@/components/builder/types';

// NOTE: Filesystem writes are not supported on Cloudflare Workers.
// The lesson builder is a local development tool only.
// To save a lesson, run `npm run dev` locally and use the builder there.
export async function saveLesson(filename: string, blocks: LessonBlock[], existingSlug?: string) {
    // Auth guard — server actions can be called directly via POST, so we must check here
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { success: false, error: 'Unauthorized' };
    }

    // Suppress unused-variable warnings for the params (kept for API compatibility)
    void filename; void blocks; void existingSlug;

    return {
        success: false,
        error: 'File saving is only supported in the local development environment (npm run dev). Cloudflare Workers does not support filesystem writes.',
    };
}
