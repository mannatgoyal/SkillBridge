'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { auth } from '@/lib/firebase';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function Sidebar() {
    const pathname = usePathname();
    const { user } = useAuth();
    const [level, setLevel] = useState(1);
    const [xp, setXp] = useState(0);
    const [nextLevelXp, setNextLevelXp] = useState(100);

    const isActive = (path: string) => pathname === path;

    // Calculate Level based on skills
    useEffect(() => {
        const fetchStats = async () => {
            if (!user) return;
            const docRef = doc(db, 'users', user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const skills = docSnap.data().skills || [];
                // Simple XP formula: sum of proficiency * 100
                const totalXp = skills.reduce((acc: number, skill: any) => acc + (skill.proficiency * 100), 0);
                const currentLevel = Math.floor(totalXp / 500) + 1;
                const xpForNext = currentLevel * 500;

                setXp(totalXp);
                setLevel(currentLevel);
                setNextLevelXp(xpForNext);
            }
        };
        fetchStats();
    }, [user]);

    const navItems = [
        {
            name: 'Dashboard', path: '/dashboard', icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
            )
        },
        {
            name: 'Profile', path: '/dashboard/profile', icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            )
        },
        {
            name: 'Roadmap', path: '/dashboard/roadmap', icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0121 18.382V7.618a1 1 0 01-1.447-.894L15 7m0 13V7" /></svg>
            )
        },
        {
            name: 'Interview Coach', path: '/dashboard/interview', icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
            )
        },
    ];

    const xpPercentage = Math.min(100, (xp % 500) / 500 * 100);

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-surface border-r border-border flex flex-col z-50 shadow-2xl">
            {/* Logo */}
            <div className="h-20 flex items-center px-6 border-b border-border bg-gradient-to-r from-surface to-surface-hover">
                <div className="w-9 h-9 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mr-3 shadow-lg shadow-primary/20 animate-pulse-glow">
                    <span className="text-white font-bold text-xl">S</span>
                </div>
                <span className="text-xl font-bold text-white tracking-tight">SkillBridge</span>
            </div>

            {/* User Stats (Gamification) */}
            <div className="p-6 bg-surface-hover/30 border-b border-border">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Level {level}</span>
                    <span className="text-xs font-bold text-primary">{xp} XP</span>
                </div>
                <div className="h-2 w-full bg-background rounded-full overflow-hidden border border-white/5">
                    <div
                        className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000"
                        style={{ width: `${xpPercentage}%` }}
                    ></div>
                </div>
                <p className="text-[10px] text-text-muted mt-1 text-right">Next Level: {nextLevelXp} XP</p>

                {/* Daily Streak */}
                <div className="mt-4 flex items-center gap-2 bg-background/50 p-2 rounded-lg border border-white/5">
                    <span className="text-lg">🔥</span>
                    <div>
                        <p className="text-xs font-bold text-white">3 Day Streak</p>
                        <p className="text-[10px] text-text-muted">Keep it up!</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6 px-3 space-y-2">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        href={item.path}
                        className={`
              flex items-center px-4 py-3.5 rounded-xl transition-all duration-300 group relative overflow-hidden
              ${isActive(item.path)
                                ? 'bg-gradient-to-r from-primary/20 to-transparent text-white font-semibold shadow-lg shadow-primary/5 border-l-4 border-primary'
                                : 'text-text-muted hover:bg-surface-hover hover:text-white hover:pl-5'
                            }
            `}
                    >
                        <span className={`mr-3 transition-colors ${isActive(item.path) ? 'text-primary' : 'text-text-muted group-hover:text-white'}`}>
                            {item.icon}
                        </span>
                        {item.name}

                        {isActive(item.path) && (
                            <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-primary/10 to-transparent"></div>
                        )}
                    </Link>
                ))}
            </nav>

            {/* User Profile / Logout */}
            <div className="p-4 border-t border-border bg-surface-hover/20">
                <div className="flex items-center mb-4 px-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-white font-bold text-sm shadow-md border-2 border-surface">
                        {user?.email?.[0].toUpperCase() || 'U'}
                    </div>
                    <div className="ml-3 overflow-hidden">
                        <p className="text-sm font-medium text-white truncate">{user?.email}</p>
                        <p className="text-xs text-success">Online</p>
                    </div>
                </div>
                <button
                    onClick={() => auth.signOut()}
                    className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-text-muted hover:text-error hover:bg-error/10 rounded-lg transition-colors border border-transparent hover:border-error/20"
                >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                    Sign Out
                </button>
            </div>
        </aside>
    );
}
