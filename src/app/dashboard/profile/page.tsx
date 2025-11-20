'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import SkillHeatmap from '@/components/SkillHeatmap';

interface Skill {
    name: string;
    proficiency: number; // 1-5
}

export default function ProfilePage() {
    const { user } = useAuth();
    const [skills, setSkills] = useState<Skill[]>([]);
    const [newSkillName, setNewSkillName] = useState('');
    const [newSkillLevel, setNewSkillLevel] = useState(1);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user) return;
            try {
                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setSkills(docSnap.data().skills || []);
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [user]);

    const handleAddSkill = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !newSkillName) return;

        const newSkill: Skill = { name: newSkillName, proficiency: Number(newSkillLevel) };

        try {
            const userRef = doc(db, 'users', user.uid);
            const docSnap = await getDoc(userRef);

            if (!docSnap.exists()) {
                await setDoc(userRef, {
                    email: user.email,
                    skills: [newSkill]
                });
            } else {
                await updateDoc(userRef, {
                    skills: arrayUnion(newSkill)
                });
            }

            setSkills([...skills, newSkill]);
            setNewSkillName('');
            setNewSkillLevel(1);
            setMessage('Skill added successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error("Error adding skill:", error);
            setMessage('Failed to add skill.');
        }
    };

    if (loading) return <div className="text-center p-8 pt-24">Loading profile...</div>;

    return (
        <div className="space-y-8 pt-24 px-4 md:px-12 pb-12">
            <div>
                <h1 className="text-3xl font-bold text-text-main mb-2">My Profile</h1>
                <p className="text-text-muted">Manage your skills and preferences</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column: Heatmap & Skill List */}
                <div className="space-y-6">
                    {/* Heatmap */}
                    <div className="bg-surface p-6 rounded-xl border border-border">
                        <h2 className="text-xl font-semibold mb-4 text-primary">Skill Heatmap</h2>
                        {skills.length > 2 ? (
                            <SkillHeatmap skills={skills} />
                        ) : (
                            <p className="text-text-muted text-center py-8">Add at least 3 skills to view the heatmap.</p>
                        )}
                    </div>

                    {/* Skill List */}
                    <div className="bg-surface p-6 rounded-xl border border-border">
                        <h2 className="text-xl font-semibold mb-4 text-primary">Your Skills</h2>
                        {skills.length === 0 ? (
                            <p className="text-text-muted italic">No skills added yet.</p>
                        ) : (
                            <div className="space-y-3">
                                {skills.map((skill, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                                        <span className="font-medium">{skill.name}</span>
                                        <div className="flex items-center gap-2">
                                            <div className="flex gap-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <div
                                                        key={star}
                                                        className={`w-2 h-2 rounded-full ${star <= skill.proficiency ? 'bg-primary' : 'bg-surface-hover'
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-sm text-text-muted">({skill.proficiency}/5)</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Badges Section (Gamification) */}
                    <div className="bg-surface p-6 rounded-xl border border-border">
                        <h2 className="text-xl font-semibold mb-4 text-primary">Achievements</h2>
                        <div className="grid grid-cols-3 gap-4">
                            {skills.length >= 3 && (
                                <div className="flex flex-col items-center text-center p-2 bg-background rounded-lg border border-border/50">
                                    <div className="text-2xl mb-1">🚀</div>
                                    <span className="text-xs font-bold text-text-main">Fast Starter</span>
                                </div>
                            )}
                            {skills.some(s => s.proficiency === 5) && (
                                <div className="flex flex-col items-center text-center p-2 bg-background rounded-lg border border-border/50">
                                    <div className="text-2xl mb-1">🏆</div>
                                    <span className="text-xs font-bold text-text-main">Expert</span>
                                </div>
                            )}
                            {skills.length >= 5 && (
                                <div className="flex flex-col items-center text-center p-2 bg-background rounded-lg border border-border/50">
                                    <div className="text-2xl mb-1">📚</div>
                                    <span className="text-xs font-bold text-text-main">Scholar</span>
                                </div>
                            )}
                            {/* Locked Badges Placeholders */}
                            {skills.length < 5 && (
                                <div className="flex flex-col items-center text-center p-2 bg-background/30 rounded-lg border border-border/30 opacity-50">
                                    <div className="text-2xl mb-1">🔒</div>
                                    <span className="text-xs font-bold text-text-muted">Locked</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column: GitHub & Add Skill */}
                <div className="space-y-6">
                    {/* GitHub Connect */}
                    <div className="bg-surface p-6 rounded-xl border border-border">
                        <h2 className="text-xl font-semibold mb-4 text-primary">Import from GitHub</h2>
                        <p className="text-sm text-text-muted mb-4">
                            Connect your GitHub account to automatically analyze your repositories and add skills.
                        </p>
                        <button
                            onClick={() => {
                                if (!user) return;
                                const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || 'dummy-github-id';
                                const redirectUri = `${window.location.origin}/api/auth/github/callback`;
                                const state = user.uid;
                                window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=repo`;
                            }}
                            className="w-full bg-[#24292e] hover:bg-[#2f363d] text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                            <svg height="20" viewBox="0 0 16 16" version="1.1" width="20" aria-hidden="true" fill="currentColor">
                                <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                            </svg>
                            Connect GitHub
                        </button>
                    </div>

                    {/* Add Skill Form */}
                    <div className="bg-surface p-6 rounded-xl border border-border">
                        <h2 className="text-xl font-semibold mb-4 text-primary">Add New Skill</h2>
                        {message && (
                            <div className={`p-3 rounded-lg mb-4 text-sm ${message.includes('Failed') ? 'bg-error/10 text-error' : 'bg-success/10 text-success'}`}>
                                {message}
                            </div>
                        )}
                        <form onSubmit={handleAddSkill} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1 text-text-muted">Skill Name</label>
                                <input
                                    type="text"
                                    value={newSkillName}
                                    onChange={(e) => setNewSkillName(e.target.value)}
                                    className="w-full p-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none transition-colors"
                                    placeholder="e.g. React, Python"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-text-muted">Proficiency (1-5)</label>
                                <select
                                    value={newSkillLevel}
                                    onChange={(e) => setNewSkillLevel(Number(e.target.value))}
                                    className="w-full p-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none transition-colors"
                                >
                                    {[1, 2, 3, 4, 5].map((num) => (
                                        <option key={num} value={num}>{num} - {
                                            num === 1 ? 'Beginner' :
                                                num === 2 ? 'Elementary' :
                                                    num === 3 ? 'Intermediate' :
                                                        num === 4 ? 'Advanced' : 'Expert'
                                        }</option>
                                    ))}
                                </select>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3 rounded-lg transition-colors"
                            >
                                Add Skill
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
