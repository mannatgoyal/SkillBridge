'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import SkillHeatmap from '@/components/SkillHeatmap';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';

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

    if (loading) return <div className="text-center p-8 text-text-muted">Loading profile...</div>;

    return (
        <div className="space-y-8 animate-fade-in-up">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">My Profile</h1>
                    <p className="text-text-muted">Manage your skills and preferences</p>
                </div>
                <Button variant="outline" size="sm">Share Profile</Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column: Heatmap & Skill List */}
                <div className="space-y-6">
                    {/* Heatmap */}
                    <Card className="overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <svg className="w-32 h-32 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" /></svg>
                        </div>
                        <h2 className="text-xl font-bold text-white mb-6 relative z-10">Skill Heatmap</h2>
                        {skills.length > 2 ? (
                            <SkillHeatmap skills={skills} />
                        ) : (
                            <div className="text-center py-12 bg-background/50 rounded-xl border border-border border-dashed relative z-10">
                                <p className="text-text-muted">Add at least 3 skills to view the heatmap.</p>
                            </div>
                        )}
                    </Card>

                    {/* Skill List */}
                    <Card>
                        <h2 className="text-xl font-bold text-white mb-6">Your Skills</h2>
                        {skills.length === 0 ? (
                            <p className="text-text-muted italic">No skills added yet.</p>
                        ) : (
                            <div className="space-y-3">
                                {skills.map((skill, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-4 bg-background rounded-xl border border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5 group">
                                        <span className="font-semibold text-white group-hover:text-primary transition-colors">{skill.name}</span>
                                        <div className="flex items-center gap-3">
                                            <div className="flex gap-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <div
                                                        key={star}
                                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${star <= skill.proficiency
                                                                ? 'bg-gradient-to-r from-primary to-accent shadow-[0_0_8px_rgba(99,102,241,0.5)] scale-110'
                                                                : 'bg-surface-hover'
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-sm text-text-muted font-medium">({skill.proficiency}/5)</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </Card>

                    {/* Badges Section (Gamification) */}
                    <Card>
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            Achievements <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">Beta</span>
                        </h2>
                        <div className="grid grid-cols-3 gap-4">
                            {skills.length >= 3 && (
                                <div className="flex flex-col items-center text-center p-4 bg-gradient-to-br from-background to-surface rounded-xl border border-primary/30 shadow-lg shadow-primary/10 hover:scale-105 transition-transform cursor-help group relative">
                                    <div className="text-4xl mb-2 animate-bounce">🚀</div>
                                    <span className="text-xs font-bold text-white">Fast Starter</span>
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                        Added 3+ Skills
                                    </div>
                                </div>
                            )}
                            {skills.some(s => s.proficiency === 5) && (
                                <div className="flex flex-col items-center text-center p-4 bg-gradient-to-br from-background to-surface rounded-xl border border-accent/30 shadow-lg shadow-accent/10 hover:scale-105 transition-transform cursor-help group relative">
                                    <div className="text-4xl mb-2 animate-pulse">🏆</div>
                                    <span className="text-xs font-bold text-white">Expert</span>
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                        Mastered a Skill (Lvl 5)
                                    </div>
                                </div>
                            )}
                            {skills.length >= 5 && (
                                <div className="flex flex-col items-center text-center p-4 bg-gradient-to-br from-background to-surface rounded-xl border border-secondary/30 shadow-lg shadow-secondary/10 hover:scale-105 transition-transform cursor-help group relative">
                                    <div className="text-4xl mb-2">📚</div>
                                    <span className="text-xs font-bold text-white">Scholar</span>
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                        Added 5+ Skills
                                    </div>
                                </div>
                            )}
                            {/* Locked Badges Placeholders */}
                            {skills.length < 5 && (
                                <div className="flex flex-col items-center text-center p-4 bg-background/30 rounded-xl border border-border/30 opacity-50 grayscale hover:opacity-70 transition-opacity">
                                    <div className="text-3xl mb-2">🔒</div>
                                    <span className="text-xs font-bold text-text-muted">Locked</span>
                                </div>
                            )}
                        </div>
                    </Card>
                </div>

                {/* Right Column: GitHub & Add Skill */}
                <div className="space-y-6">
                    {/* GitHub Connect */}
                    <Card className="bg-gradient-to-br from-surface to-background border-primary/20 relative overflow-hidden group">
                        <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors"></div>

                        <h2 className="text-xl font-bold text-white mb-4 relative z-10">Import from GitHub</h2>
                        <p className="text-sm text-text-muted mb-6 leading-relaxed relative z-10">
                            Connect your GitHub account to automatically analyze your repositories and add skills based on your code.
                        </p>
                        <Button
                            onClick={() => {
                                if (!user) return;
                                const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || 'dummy-github-id';
                                const redirectUri = `${window.location.origin}/api/auth/github/callback`;
                                const state = user.uid;
                                window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=repo`;
                            }}
                            className="w-full bg-[#24292e] hover:bg-[#2f363d] border border-white/10 relative z-10"
                        >
                            <svg className="mr-2" height="20" viewBox="0 0 16 16" version="1.1" width="20" aria-hidden="true" fill="currentColor">
                                <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                            </svg>
                            Connect GitHub
                        </Button>
                    </Card>

                    {/* Add Skill Form */}
                    <Card>
                        <h2 className="text-xl font-bold text-white mb-6">Add New Skill</h2>
                        {message && (
                            <div className={`p-4 rounded-lg mb-6 text-sm font-medium flex items-center animate-fade-in-up ${message.includes('Failed') ? 'bg-error/10 text-error border border-error/20' : 'bg-success/10 text-success border border-success/20'}`}>
                                {message}
                            </div>
                        )}
                        <form onSubmit={handleAddSkill} className="space-y-5">
                            <Input
                                label="Skill Name"
                                type="text"
                                value={newSkillName}
                                onChange={(e) => setNewSkillName(e.target.value)}
                                placeholder="e.g. React, Python"
                                required
                            />

                            <div>
                                <label className="block text-sm font-medium text-text-muted mb-2">Proficiency Level</label>
                                <select
                                    value={newSkillLevel}
                                    onChange={(e) => setNewSkillLevel(Number(e.target.value))}
                                    className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-text-main transition-all"
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

                            <Button type="submit" className="w-full hover:scale-[1.02] transition-transform">
                                Add Skill
                            </Button>
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    );
}
