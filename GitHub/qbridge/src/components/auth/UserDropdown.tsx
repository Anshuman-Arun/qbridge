'use client';

import { useState } from 'react';
import Link from 'next/link';
import { LogOut, User, Settings, ChevronDown } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface UserDropdownProps {
    user: any; // Type accurately if possible
    profile: any;
}

export function UserDropdown({ user, profile }: UserDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const supabase = createClient();
    const router = useRouter();

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.refresh(); // Refresh server components
    };

    const avatarUrl = profile?.avatar_url || user?.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/shapes/svg?seed=${user?.email}`;
    const displayName = profile?.full_name || user?.user_metadata?.full_name || user?.email?.split('@')[0];

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 pl-3 pr-2 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors group"
            >
                <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20 relative flex items-center justify-center bg-white/10">
                    <User className="w-5 h-5 text-gray-400" />
                </div>
                <span className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors max-w-[100px] truncate hidden sm:block">
                    {displayName}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-gray-300 transition-colors" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-56 rounded-xl bg-[#0a0a0a] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden z-50 p-1"
                    >
                        <div className="px-3 py-2 border-b border-white/5 mb-1">
                            <p className="text-xs text-gray-500">Signed in as</p>
                            <p className="text-sm font-medium text-white truncate">{user.email}</p>
                        </div>

                        <Link
                            href="/profile"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                        >
                            <User className="w-4 h-4" />
                            Profile
                        </Link>
                        <Link
                            href="/settings"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                        >
                            <Settings className="w-4 h-4" />
                            Settings
                        </Link>

                        <div className="h-px bg-white/5 my-1" />

                        <button
                            onClick={handleSignOut}
                            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
