'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { JOB_ROLES } from '@/lib/data/roles';
import { calculateGap, LearningRoadmap, Skill } from '@/lib/gapAnalysis';

export default function RoadmapPage() {
    const { user } = useAuth();
    const [userSkills, setUserSkills] = useState<Skill[]>([]);
    const [selectedRoleId, setSelectedRoleId] = useState(JOB_ROLES[0].id);
    const [roadmap, setRoadmap] = useState<LearningRoadmap | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSkills = async () => {
            if (!user) return;
            try {
                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUserSkills(docSnap.data().skills || []);
                }
            } catch (error) {
                console.error("Error fetching skills:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSkills();
    }, [user]);

    useEffect(() => {
        if (userSkills.length > 0) {
            const role = JOB_ROLES.find((r) => r.id === selectedRoleId);
            if (role) {
                const result = calculateGap(userSkills, role);
                setRoadmap(result);
            }
        }
    }, [userSkills, selectedRoleId]);

    if (loading) return <div className="text-center p-8 pt-24">Loading roadmap...</div>;

    return (
        <div className="space-y-8 pt-24 px-4 md:px-12 pb-12">
            <div>
                <h1 className="text-3xl font-bold text-text-main mb-2">Learning Roadmap</h1>
                <p className="text-text-muted">Select a target role to see your personalized learning path.</p>
            </div>

            {/* Role Selection */}
            <div className="bg-surface p-6 rounded-xl border border-border">
                <label className="block text-sm font-medium mb-2 text-text-muted">Target Role</label>
                <select
                    value={selectedRoleId}
                    onChange={(e) => setSelectedRoleId(e.target.value)}
                    className="w-full md:w-1/3 p-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none transition-colors"
                >
                    {JOB_ROLES.map((role) => (
                        <option key={role.id} value={role.id}>
                            {role.title}
                        </option>
                    ))}
                </select>
            </div>

            {/* Roadmap Display */}
            {roadmap && (
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-semibold text-primary">
                            Gap Analysis: {roadmap.roleTitle}
                        </h2>
                        <span className="bg-surface-hover px-4 py-2 rounded-full text-sm font-medium">
                            {roadmap.items.length} Skills to Improve
                        </span>
                    </div>

                    {roadmap.items.length === 0 ? (
                        <div className="p-8 bg-success/10 border border-success/20 rounded-xl text-center">
                            <h3 className="text-xl font-bold text-success mb-2">You're Ready!</h3>
                            <p className="text-text-muted">You meet all the requirements for this role. Great job!</p>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {roadmap.items.map((item, idx) => (
                                <div key={idx} className="bg-surface p-6 rounded-xl border border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-lg font-bold">{item.skillName}</h3>
                                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${item.priority === 'High' ? 'bg-error/20 text-error' : 'bg-warning/20 text-warning'
                                                }`}>
                                                {item.priority} Priority
                                            </span>
                                        </div>
                                        <p className="text-sm text-text-muted">
                                            Current: <span className="font-medium text-text-main">{item.currentProficiency}/5</span>
                                            {' '}→{' '}
                                            Target: <span className="font-medium text-text-main">{item.targetProficiency}/5</span>
                                        </p>
                                    </div>

                                    <div className="flex gap-2">
                                        <button className="px-4 py-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg text-sm font-medium transition-colors">
                                            Find Resources
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
