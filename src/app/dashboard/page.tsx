'use client';

import { JOB_ROLES } from '@/lib/data/roles';
import RoleCard from '@/components/RoleCard';
import ContentRow from '@/components/ContentRow';
import Link from 'next/link';

export default function DashboardPage() {
    // Mock logic for "Top Match" - in real app, this comes from Gap Analysis
    const topMatch = JOB_ROLES[0];

    return (
        <div className="pb-20">
            {/* Hero Section */}
            <div className="relative h-[85vh] w-full">
                {/* Background Image (Placeholder) */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center">
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                </div>

                {/* Hero Content */}
                <div className="absolute inset-0 flex items-center px-4 md:px-12">
                    <div className="max-w-2xl space-y-6 pt-20">
                        <div className="flex items-center gap-2 text-primary font-bold tracking-widest uppercase text-sm">
                            <span className="w-1 h-4 bg-primary" />
                            Top Career Match
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
                            {topMatch.title}
                        </h1>
                        <p className="text-lg text-gray-200 line-clamp-3 max-w-xl">
                            Master the art of frontend development. Build responsive, dynamic web applications using React, TypeScript, and modern CSS. Your journey to becoming a Senior Developer starts here.
                        </p>

                        <div className="flex items-center gap-4 pt-4">
                            <Link
                                href={`/dashboard/roadmap?role=${topMatch.id}`}
                                className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded font-bold hover:bg-gray-200 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                                Start Path
                            </Link>
                            <button className="flex items-center gap-2 bg-gray-500/30 text-white px-8 py-3 rounded font-bold hover:bg-gray-500/40 transition-colors backdrop-blur-sm">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                More Info
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Rows */}
            <div className="-mt-32 relative z-10 space-y-8">
                <ContentRow title="Trending Now">
                    {JOB_ROLES.map((role) => (
                        <RoleCard key={role.id} role={role} matchScore={Math.floor(Math.random() * 40) + 60} />
                    ))}
                    {JOB_ROLES.map((role) => (
                        <RoleCard key={`${role.id}-dup`} role={role} matchScore={Math.floor(Math.random() * 40) + 60} />
                    ))}
                </ContentRow>

                <ContentRow title="Recommended for You">
                    {JOB_ROLES.slice().reverse().map((role) => (
                        <RoleCard key={role.id} role={role} matchScore={Math.floor(Math.random() * 40) + 60} />
                    ))}
                </ContentRow>

                <ContentRow title="New on SkillBridge">
                    {JOB_ROLES.map((role) => (
                        <RoleCard key={role.id} role={role} matchScore={Math.floor(Math.random() * 40) + 60} />
                    ))}
                </ContentRow>
            </div>
        </div>
    );
}
