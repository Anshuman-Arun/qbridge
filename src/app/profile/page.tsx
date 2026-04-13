import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { ProfileClient } from './ProfileClient';

export default async function ProfilePage() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    // Fetch profile details
    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    // Fetch all quiz attempts — join module title for display
    const { data: quizAttempts } = await supabase
        .from('quiz_attempts')
        .select('score, max_score, is_final_test, module_id, completed_at, modules(title)')
        .eq('user_id', user.id)
        .order('completed_at', { ascending: false });

    // Fetch per-tag scores
    const { data: tagScores } = await supabase
        .from('quiz_scores')
        .select('tag, total_correct, total_attempted')
        .eq('user_id', user.id);

    // Fetch courses with modules for course progress
    const { data: courses } = await supabase
        .from('courses')
        .select(`
            id, title, slug,
            modules (id, title, slug)
        `)
        .order('created_at', { ascending: true });

    const attempts = (quizAttempts || []) as unknown as Array<{
        score: number;
        max_score: number;
        is_final_test: boolean;
        module_id: string;
        completed_at: string;
        modules: { title: string } | null;
    }>;

    // -----------------------------------------------------------------------
    // Deduplicate: for grade/skill calcs, only use the LATEST attempt per
    // (module_id, is_final_test) pair — retakes should replace, not stack.
    // -----------------------------------------------------------------------
    const latestAttemptMap = new Map<string, typeof attempts[0]>();
    for (const a of attempts) {
        // attempts are ordered DESC by completed_at, so first seen = most recent
        const key = `${a.module_id}|${a.is_final_test}`;
        if (!latestAttemptMap.has(key)) {
            latestAttemptMap.set(key, a);
        }
    }
    const latestAttempts = Array.from(latestAttemptMap.values());

    // Overall grade — average of latest attempts only
    const overallGrade = latestAttempts.length > 0
        ? Math.round(latestAttempts.reduce((sum, a) => sum + (a.score / a.max_score) * 100, 0) / latestAttempts.length)
        : null;

    // Course progress — driven by latest attempts
    const courseProgress = (courses || []).map(course => {
        const moduleIds = (course.modules || []).map((m: any) => m.id);
        const totalLessons = moduleIds.length;
        const passedLessons = moduleIds.filter((mid: string) => {
            const best = latestAttempts.find(a => a.module_id === mid && !a.is_final_test);
            return best ? (best.score / best.max_score) >= 0.7 : false;
        }).length;
        const finalTestPassed = moduleIds.every((mid: string) => {
            const best = latestAttempts.find(a => a.module_id === mid && a.is_final_test);
            return best ? (best.score / best.max_score) >= 0.8 : false;
        });
        return { ...course, totalLessons, passedLessons, finalTestPassed };
    });

    // ---------------------------------------------------------------------------
    // Tag display mapping — groups and renames raw DB tags for students
    // ---------------------------------------------------------------------------
    const tagDisplayMap: Record<string, { label: string; subtitle: string }> = {
        // --- Vectors ---
        'vectors': { label: 'Vectors — Core Concepts', subtitle: 'Definitions & fundamentals' },
        'definition': { label: 'Vocabulary & Definitions', subtitle: 'Mathematical terminology' },
        'components': { label: 'Vector Components', subtitle: 'Entries of a vector (x, y, …)' },
        'dimension': { label: 'Vector Dimensions', subtitle: 'Size & dimensionality of vectors' },
        'higher-dimensions': { label: 'Vector Dimensions', subtitle: 'Size & dimensionality of vectors' },
        'geometry': { label: 'Geometric Representation', subtitle: 'Graphing & visualizing vectors' },
        'addition': { label: 'Vector Addition', subtitle: 'Adding vectors algebraically & graphically' },
        'scalar-multiplication': { label: 'Scalar Multiplication', subtitle: 'Scaling vectors by a number' },
        'magnitude': { label: 'Vector Magnitude', subtitle: 'Length / norm of a vector' },
        'notation': { label: 'Mathematical Notation', subtitle: 'Symbols and conventions' },
        // --- Matrices ---
        'matrices': { label: 'Matrices — Core Concepts', subtitle: 'Definitions & structure' },
        'matrix-multiplication': { label: 'Matrix Multiplication', subtitle: 'Multiplying matrices together' },
        'determinant': { label: 'Determinants', subtitle: 'Scalar value of a square matrix' },
        // --- Complex Numbers ---
        'complex-numbers': { label: 'Complex Numbers', subtitle: 'Numbers with real & imaginary parts' },
        'imaginary-unit': { label: 'Imaginary Unit (i)', subtitle: 'Definition and use of √−1' },
        'complex-plane': { label: 'Complex Plane', subtitle: 'Graphing complex numbers' },
        'modulus': { label: 'Complex Modulus', subtitle: 'Absolute value of a complex number' },
        // --- Programming ---
        'python': { label: 'Python Programming', subtitle: 'General Python concepts' },
        'python-modules': { label: 'Python Modules & Imports', subtitle: 'Using libraries in Python' },
        'bits-gates': { label: 'Bits & Logic Gates', subtitle: 'Binary and boolean logic' },
        'algorithms': { label: 'Algorithms', subtitle: 'Problem-solving strategies' },
        'big-o': { label: 'Big-O Complexity', subtitle: 'Measuring algorithm efficiency' },
        // --- Physics ---
        'wave-particle-duality': { label: 'Wave-Particle Duality', subtitle: 'Light and matter behave as both' },
        'double-slit': { label: 'Double-Slit Experiment', subtitle: 'Wave interference with particles' },
        'entanglement': { label: 'Quantum Entanglement', subtitle: 'Correlated quantum states' },
        'superposition': { label: 'Superposition', subtitle: 'Being in multiple states at once' },
        'implications': { label: 'Quantum Implications', subtitle: 'Broader consequences of QM' },
        // --- Quantum Computing ---
        'qubits': { label: 'Qubits', subtitle: 'The quantum bit' },
        'bloch-sphere': { label: 'Bloch Sphere', subtitle: 'Visualizing qubit states' },
        'quantum-gates': { label: 'Quantum Gates', subtitle: 'Operations on qubits' },
        'reversibility': { label: 'Reversibility', subtitle: 'Unitary, reversible operations' },
        'shors-algorithm': { label: "Shor's Algorithm", subtitle: 'Quantum factoring' },
        'grovers-algorithm': { label: "Grover's Algorithm", subtitle: 'Quantum search algorithm' },
        'multi-qubit': { label: 'Multi-Qubit Systems', subtitle: 'Entangled & composite qubit states' },
    };

    // Merge tags that share the same display label (keep best score)
    const mergedTagMap = new Map<string, { label: string; subtitle: string; percent: number; correct: number; attempted: number }>();
    for (const t of (tagScores || [])) {
        const display = tagDisplayMap[t.tag] ?? {
            label: t.tag.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase()),
            subtitle: '',
        };
        const percent = t.total_attempted > 0 ? Math.round((t.total_correct / t.total_attempted) * 100) : 0;
        const existing = mergedTagMap.get(display.label);
        if (!existing || percent > existing.percent) {
            mergedTagMap.set(display.label, {
                label: display.label,
                subtitle: display.subtitle,
                percent,
                correct: t.total_correct,
                attempted: t.total_attempted,
            });
        }
    }
    const tags = Array.from(mergedTagMap.values()).sort((a, b) => b.percent - a.percent);

    // All attempts formatted for the history panel
    const historyAttempts = attempts.map(a => ({
        module_id: a.module_id,
        module_title: a.modules?.title,
        is_final_test: a.is_final_test,
        score: a.score,
        max_score: a.max_score,
        completed_at: a.completed_at,
    }));

    // Recent activity — 5 most recent
    const recentAttempts = historyAttempts.slice(0, 5);

    const avatarUrl = profile?.avatar_url || user.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/shapes/svg?seed=${user.email}`;
    const fullName = profile?.full_name || user.user_metadata?.full_name || 'Quantum Explorer';

    return (
        <ProfileClient 
            userEmail={profile?.email || user.email || ''}
            fullName={fullName}
            avatarUrl={avatarUrl}
            overallGrade={overallGrade}
            latestAttemptsCount={latestAttempts.length}
            totalAttemptsCount={attempts.length}
            courseProgress={courseProgress}
            tags={tags}
            recentAttempts={recentAttempts}
            historyAttempts={historyAttempts}
        />
    );
}
