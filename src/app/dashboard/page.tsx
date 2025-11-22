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
        <div className="space-y-12">
            {/* Hero Section */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary to-accent p-12 shadow-2xl shadow-primary/20">
                {/* Abstract Pattern */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-[100px] mix-blend-overlay"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary rounded-full blur-[80px] mix-blend-overlay"></div>
                </div>

                <div className="relative z-10 max-w-2xl">
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
                        Welcome Back!
                    </h1>
                    <p className="text-xl text-white/90 mb-8 font-medium">
                        Ready to take the next step in your career journey?
                    </p>
                    <Link href="/dashboard/interview">
                        <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-xl border-0">
                            Start Interview Practice
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Your Current Skills Section */}
            <section>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white">Your Skills</h2>
                    <Link href="/dashboard/profile">
                        <Button variant="ghost" size="sm">Manage Skills</Button>
                    </Link>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-12 bg-surface rounded-2xl border border-border border-dashed">
                        <div className="animate-pulse text-text-muted">Loading skills...</div>
                    </div>
                ) : skills.length === 0 ? (
                    <div className="bg-surface/50 border border-border border-dashed rounded-2xl p-12 text-center">
                        <p className="text-text-muted text-lg mb-6">No skills added yet. Start building your profile!</p>
                        <Link href="/dashboard/profile">
                            <Button>Add Your First Skill</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="flex gap-6 overflow-x-auto pb-6 no-scrollbar">
                        {skills.map((skill, idx) => (
                            <SkillCard
                                key={idx}
                                name={skill.name}
                                category={categorizeSkill(skill.name)}
                                level={skill.proficiency}
                            />
                        ))}
                    </div>
                )}
            </section>

            {/* Recommended Internships Section */}
            <section>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white">Recommended Opportunities</h2>
                    <Link href="/dashboard/roadmap">
                        <Button variant="ghost" size="sm">View All</Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {JOB_ROLES.slice(0, 6).map((role) => (
                        <RoleCard
                            key={role.id}
                            role={role}
                            matchScore={Math.floor(Math.random() * 40) + 60}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}
