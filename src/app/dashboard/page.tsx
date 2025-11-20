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
            <div className="relative h-[50vh] w-full">
                {/* Background Image */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop')] bg-cover bg-center">
                    <div className="absolute inset-0 bg-black/40" />
                </div>

                {/* Hero Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                    <h1 className="text-5xl md:text-6xl font-black text-white mb-4 drop-shadow-lg">
                        Welcome Back!
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 mb-8 drop-shadow-md">
                        Tracking your dream internship.
                    </p>
                    <Link
                        href="/dashboard/interview"
                        className="bg-primary hover:bg-primary-hover text-white font-bold px-8 py-3 rounded transition-colors shadow-lg"
                    >
                        Start Practicing
                    </Link>
                </div>
            </div>

            {/* Your Current Skills Section */}
            <div className="py-12 px-4 md:px-12 bg-background">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Your Current Skills</h2>

                {loading ? (
                    <p className="text-text-muted">Loading skills...</p>
                ) : skills.length === 0 ? (
                    <div className="bg-surface border border-border rounded-lg p-8 text-center">
                        <p className="text-text-muted mb-4">No skills added yet. Start building your profile!</p>
                        <Link
                            href="/dashboard/profile"
                            className="inline-block bg-primary hover:bg-primary-hover text-white font-semibold px-6 py-2 rounded transition-colors"
                        >
                            Add Skills
                        </Link>
                    </div>
                ) : (
                    <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
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
            <div className="py-12 px-4 md:px-12 bg-background">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Recommended Internships</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {JOB_ROLES.slice(0, 6).map((role) => (
                        <RoleCard
                            key={role.id}
                            role={role}
                            matchScore={Math.floor(Math.random() * 40) + 60}
                        />
                    ))}
                </div>

                <div className="mt-8 text-center">
                    <Link
                        href="/dashboard/roadmap"
                        className="inline-block text-primary hover:text-primary-hover font-semibold transition-colors"
                    >
                        View All Opportunities →
                    </Link>
                </div>
            </div>
        </div>
    );
}
