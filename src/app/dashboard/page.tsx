'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { JOB_ROLES } from '@/lib/data/roles';
import RoleCard from '@/components/RoleCard';
import SkillCard from '@/components/SkillCard';
import Link from 'next/link';

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
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
                {/* Background Image */}
                <img
                    src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3"
                    alt="Hero Background"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-background" />

                {/* Hero Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 drop-shadow-2xl">
                        Welcome Back!
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow-lg font-light">
                        Tracking your dream internship.
                    </p>
                    <Link
                        href="/dashboard/interview"
                        className="bg-primary hover:bg-primary-hover text-white font-bold px-10 py-4 rounded-md transition-all shadow-xl hover:shadow-2xl hover:scale-105 text-lg"
                    >
                        Start Practicing
                    </Link>
                </div>
            </div>

            {/* Your Current Skills Section */}
            <div className="py-16 px-4 md:px-12 bg-background">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Your Current Skills</h2>

                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="animate-pulse text-text-muted">Loading skills...</div>
                    </div>
                ) : skills.length === 0 ? (
                    <div className="bg-surface border border-border rounded-xl p-12 text-center">
                        <p className="text-text-muted text-lg mb-6">No skills added yet. Start building your profile!</p>
                        <Link
                            href="/dashboard/profile"
                            className="inline-block bg-primary hover:bg-primary-hover text-white font-semibold px-8 py-3 rounded-md transition-colors shadow-lg"
                        >
                            Add Skills
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
            </div>

            {/* Recommended Internships Section */}
            <div className="py-16 px-4 md:px-12 bg-background border-t border-border/30">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Recommended Internships</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {JOB_ROLES.slice(0, 6).map((role) => (
                        <RoleCard
                            key={role.id}
                            role={role}
                            matchScore={Math.floor(Math.random() * 40) + 60}
                        />
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link
                        href="/dashboard/roadmap"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary-hover font-semibold text-lg transition-colors group"
                    >
                        View All Opportunities
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
}
