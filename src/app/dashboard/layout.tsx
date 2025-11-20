'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const navItems = [
        { name: 'Profile', href: '/dashboard/profile' },
        { name: 'Roadmap', href: '/dashboard/roadmap' },
        { name: 'Interview Coach', href: '/dashboard/interview' },
    ];

    const handleSignOut = () => {
        signOut(auth);
    };

    return (
        <div className="min-h-screen bg-background flex">
            {/* Sidebar */}
            <aside className="w-64 bg-surface border-r border-border flex flex-col">
                <div className="p-6 border-b border-border">
                    <h1 className="text-2xl font-bold text-primary">SkillBridge</h1>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`block px-4 py-3 rounded-lg transition-colors ${isActive
                                        ? 'bg-primary/10 text-primary font-medium'
                                        : 'text-text-muted hover:bg-surface-hover hover:text-text-main'
                                    }`}
                            >
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-border">
                    <button
                        onClick={handleSignOut}
                        className="w-full px-4 py-3 text-left text-text-muted hover:text-error hover:bg-error/10 rounded-lg transition-colors flex items-center gap-2"
                    >
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <div className="p-8 max-w-5xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
