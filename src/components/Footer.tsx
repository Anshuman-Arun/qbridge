import { Instagram, Facebook, Youtube } from "lucide-react";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t border-white/5 bg-black/40 backdrop-blur-sm mt-auto">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="font-mono font-bold text-lg text-gray-100">qBridge</span>
                        </div>
                        <p className="text-gray-500 text-sm">
                            Democratizing quantum education for the next generation of pioneers.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-100 mb-4 text-sm">Platform</h3>
                        <FooterLink href="/learn">Interactive Courses</FooterLink>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-100 mb-4 text-sm">Connect</h3>
                        <div className="flex gap-4">
                            <SocialIcon icon={<Instagram className="w-5 h-5" />} href="#" />
                            <SocialIcon icon={<Facebook className="w-5 h-5" />} href="#" />
                            <SocialIcon icon={<Youtube className="w-5 h-5" />} href="#" />
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-600 text-sm">
                        © {new Date().getFullYear()} qBridge. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="text-gray-600 hover:text-gray-400 text-sm">Privacy Policy</Link>
                        <Link href="/terms" className="text-gray-600 hover:text-gray-400 text-sm">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link href={href} className="block text-gray-500 hover:text-brand-purple transition-colors text-sm mb-2">
            {children}
        </Link>
    );
}

function SocialIcon({ icon, href }: { icon: React.ReactNode; href: string }) {
    return (
        <a
            href={href}
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-brand-cyan transition-all"
        >
            {icon}
        </a>
    );
}
