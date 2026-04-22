import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { LearnClient } from './LearnClient';

export default async function LearnPage() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect('/login?from=/learn');

    // Check if the user has already enrolled in the intro course
    const { data: enrollment } = await supabase
        .from('course_interest')
        .select('id')
        .eq('user_id', user.id)
        .eq('course_slug', 'intro-quantum-computing')
        .maybeSingle();

    // Fetch total lesson count for the card display
    const { count } = await supabase
        .from('modules')
        .select('id', { count: 'exact', head: true });

    return (
        <LearnClient
            isEnrolled={!!enrollment}
            totalLessons={count ?? 0}
        />
    );
}
