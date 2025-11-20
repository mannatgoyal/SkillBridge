'use client';

import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import { auth } from '@/lib/firebase';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-background text-text-main">
            {/* Top Navigation Bar */}
            <nav
                className={`fixed top-0 w-full z-50 transition-colors duration-300 px-4 md:px-12 py-4 flex items-center justify-between ${scrolled ? 'bg-background/95 backdrop-blur-sm shadow-lg' : 'bg-gradient-to-b from-black/80 to-transparent'
                    }`}
            >
                <div className="flex items-center gap-8">
                    <Link href="/dashboard" className="text-primary font-bold text-2xl tracking-tighter">
                        SKILLBRIDGE
                    </Link>

                    <div className="hidden md:flex gap-6 text-sm font-medium">
                        <Link
                            href="/dashboard"
                            className={`hover:text-text-main transition-colors ${pathname === '/dashboard' ? 'text-text-main' : 'text-text-muted'}`}
                        >
                            Home
                        </Link>
                        <Link
                            href="/dashboard/roadmap"
                            className={`hover:text-text-main transition-colors ${pathname === '/dashboard/roadmap' ? 'text-text-main' : 'text-text-muted'}`}
                        >
                            Roadmaps
                        </Link>
                        <Link
                            href="/dashboard/interview"
                            className={`hover:text-text-main transition-colors ${pathname === '/dashboard/interview' ? 'text-text-main' : 'text-text-muted'}`}
                        >
                            Interview Coach
                        </Link>
                        <Link
                            href="/dashboard/profile"
                            className={`hover:text-text-main transition-colors ${pathname === '/dashboard/profile' ? 'text-text-main' : 'text-text-muted'}`}
                        >
                            My List
                        </Link>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 cursor-pointer group relative">
                        <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white font-bold">
                            {user?.email?.[0].toUpperCase()}
                        </div>
                        <svg className="w-4 h-4 text-white transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>

                        {/* Dropdown Menu */}
                        <div className="absolute right-0 top-full mt-2 w-48 bg-surface border border-border rounded shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                            <div className="py-2">
                                <Link href="/dashboard/profile" className="block px-4 py-2 text-sm hover:underline">
                                    Account
                                </Link>
                                <button
                                    onClick={() => auth.signOut()}
                                    className="block w-full text-left px-4 py-2 text-sm hover:underline"
                                >
                                    Sign out of SkillBridge
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="pt-0 min-h-screen">
                {children}
            </main>
        </div>
    );
}
