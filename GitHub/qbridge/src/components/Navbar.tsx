import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { UserDropdown } from "@/components/auth/UserDropdown";

export async function Navbar() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Fetch profile if user exists
    let profile = null;
    if (user) {
        const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        profile = data;
    }

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative flex items-center justify-center w-8 h-8">
                        <Image
                            src="/icon.png"
                            alt="qBridge Logo"
                            width={32}
                            height={32}
                            className="w-full h-full object-contain group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.5)] transition-all duration-300"
                        />
                    </div>
                    <span className="font-mono font-bold text-xl tracking-tighter text-gray-100">
                        qBridge
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    <NavLink href="/">Home</NavLink>
                    <NavLink href="/learn">Learn</NavLink>
                    <NavLink href="/programs">Programs</NavLink>
                </div>

                {/* CTA */}
                <div className="flex items-center gap-4">
                    {user ? (
                        <UserDropdown user={user} profile={profile} />
                    ) : (
                        <Link
                            href="/login"
                            className="px-5 py-2 rounded-full bg-brand-purple/10 border border-brand-purple/50 text-brand-purple hover:bg-brand-purple hover:text-white transition-all duration-300 text-sm font-medium shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)]"
                        >
                            Sign In
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="text-sm font-medium text-gray-400 hover:text-brand-cyan transition-colors duration-200"
        >
            {children}
        </Link>
    );
}
