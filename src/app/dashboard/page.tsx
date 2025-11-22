'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { JOB_ROLES } from '@/lib/data/roles';
import RoleCard from '@/components/RoleCard';
import SkillCard from '@/components/SkillCard';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

interface Skill {
    name: string;
    proficiency: number;
}

export default function DashboardPage() {
    const { user } = useAuth();
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSkills = async () => {
            if (!user) return;
            try {
                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setSkills(docSnap.data().skills || []);
                }
            } catch (error) {
                console.error("Error fetching skills:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSkills();
    }, [user]);

    // Categorize skills (simple heuristic)
    const categorizeSkill = (skillName: string): string => {
        const name = skillName.toLowerCase();
        if (['react', 'vue', 'angular', 'javascript', 'typescript', 'python', 'java', 'c++', 'node.js', 'nodejs'].some(s => name.includes(s))) {
            return 'Programming';
        }
        if (['figma', 'photoshop', 'illustrator', 'sketch', 'ui', 'ux'].some(s => name.includes(s))) {
            return 'Design';
        }
        if (['mongodb', 'sql', 'postgresql', 'mysql', 'database'].some(s => name.includes(s))) {
            return 'Database';
        }
        if (['communication', 'leadership', 'teamwork'].some(s => name.includes(s))) {
            return 'Soft Skills';
        }
        return 'Technical';
    };

    return (
        <div className="space-y-12 animate-fade-in-up">
            {/* Hero Section */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary to-accent p-12 shadow-2xl shadow-primary/20 group">
                {/* Abstract Pattern */}
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-[100px] mix-blend-overlay animate-pulse-glow"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary rounded-full blur-[80px] mix-blend-overlay animate-float"></div>
                </div>

                <div className="relative z-10 max-w-2xl">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold mb-6">
                        <span className="mr-2">✨</span> New AI Coach Features
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight drop-shadow-lg">
                        Welcome Back!
                    </h1>
                    <p className="text-xl text-white/90 mb-8 font-medium max-w-lg">
                        Ready to level up? Your next career milestone is just a few skills away.
                    </p>
                    <div className="flex gap-4">
                        <Link href="/dashboard/interview">
                            <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-xl border-0 transform hover:scale-105 transition-all">
                                Start Interview Practice
                            </Button>
                        </Link>
                        <Link href="/dashboard/roadmap">
                            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                                View Roadmap
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Decorative 3D Element */}
                <div className="absolute right-10 top-1/2 -translate-y-1/2 w-64 h-64 hidden lg:block">
                    <div className="w-full h-full bg-gradient-to-br from-white/20 to-transparent rounded-2xl backdrop-blur-xl border border-white/10 transform rotate-12 group-hover:rotate-6 transition-all duration-700 shadow-2xl"></div>
                </div>
            </div>

            {/* Your Current Skills Section */}
            <section className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            Your Skills <span className="text-sm font-normal text-text-muted bg-surface px-2 py-1 rounded-md border border-border">{skills.length} Total</span>
                        </h2>
                        <p className="text-text-muted text-sm mt-1">Manage and upgrade your technical proficiency</p>
                    </div>
                    <Link href="/dashboard/profile">
                        <Button variant="ghost" size="sm" className="group">
                            Manage Skills
                            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </Button>
                    </Link>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-12 bg-surface rounded-2xl border border-border border-dashed">
                        <div className="animate-pulse text-text-muted">Loading skills...</div>
                    </div>
                ) : skills.length === 0 ? (
                    <div className="bg-surface/50 border border-border border-dashed rounded-2xl p-12 text-center hover:bg-surface/80 transition-colors">
                        <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">⚡</span>
                        </div>
                        <p className="text-text-muted text-lg mb-6">No skills added yet. Start building your profile!</p>
                        <Link href="/dashboard/profile">
                            <Button className="animate-pulse-glow">Add Your First Skill</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="flex gap-6 overflow-x-auto pb-8 pt-2 no-scrollbar px-1">
                        {skills.map((skill, idx) => (
                            <div key={idx} className="animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
                                <SkillCard
                                    name={skill.name}
                                    category={categorizeSkill(skill.name)}
                                    level={skill.proficiency}
                                />
                            </div>
                        ))}

                        {/* Add New Card */}
                        <Link href="/dashboard/profile" className="min-w-[200px] flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 transition-all cursor-pointer group">
                            <div className="w-12 h-12 rounded-full bg-surface flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg">
                                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                            </div>
                            <span className="font-semibold text-text-muted group-hover:text-primary">Add Skill</span>
                        </Link>
                    </div>
                )}
            </section>

            {/* Recommended Internships Section */}
            <section className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-white">Recommended Opportunities</h2>
                        <p className="text-text-muted text-sm mt-1">Jobs that match your current skill set</p>
                    </div>
                    <Link href="/dashboard/roadmap">
                        <Button variant="ghost" size="sm">View All</Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {JOB_ROLES.slice(0, 6).map((role, idx) => (
                        <div key={role.id} className="animate-fade-in-up" style={{ animationDelay: `${idx * 100 + 300}ms` }}>
                            <RoleCard
                                role={role}
                                matchScore={Math.floor(Math.random() * 40) + 60}
                            />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
