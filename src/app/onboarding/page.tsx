'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { db } from '@/lib/firebase';
import { doc, setDoc, updateDoc, getDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';

const ROLES = [
    { id: 'student', label: 'Student', icon: '🎓', description: 'I am currently studying.' },
    { id: 'professional', label: 'Professional', icon: '💼', description: 'I am working in the industry.' },
    { id: 'job_seeker', label: 'Job Seeker', icon: '🔍', description: 'I am actively looking for opportunities.' },
    { id: 'explorer', label: 'Explorer', icon: '🚀', description: 'I am just exploring new skills.' },
];

const GOALS = [
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'DevOps Engineer',
    'Data Scientist',
    'Product Manager',
    'UI/UX Designer',
];

const POPULAR_SKILLS = [
    'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Python', 'Java', 'C++', 'HTML/CSS', 'SQL', 'Git', 'Docker', 'AWS', 'Firebase'
];

export default function OnboardingPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        currentRole: '',
        targetRole: '',
        skills: [] as string[],
    });

    useEffect(() => {
        if (!user) {
            // router.push('/login'); // Let AuthProvider handle this
        }
    }, [user, router]);

    const handleNext = () => {
        setStep((prev) => prev + 1);
    };

    const handleBack = () => {
        setStep((prev) => prev - 1);
    };

    const toggleSkill = (skill: string) => {
        setFormData((prev) => {
            const skills = prev.skills.includes(skill)
                ? prev.skills.filter((s) => s !== skill)
                : [...prev.skills, skill];
            return { ...prev, skills };
        });
    };

    const [error, setError] = useState('');

    const handleSubmit = async () => {
        if (!user) return;

        // 1. Check Network
        if (!navigator.onLine) {
            setError("You appear to be offline. Please check your internet connection.");
            return;
        }

        setLoading(true);
        setError('');

        try {
            // 2. Check Config (Client-side check)
            if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
                throw new Error("Firebase Configuration is missing. Please check your .env.local file.");
            }

            // 3. Test Connectivity (Read before Write)
            const userRef = doc(db, 'users', user.uid);
            try {
                await getDoc(userRef); // Just check if we can reach DB
            } catch (readError: any) {
                console.error("Connectivity Test Failed:", readError);
                throw new Error(`Database connection failed: ${readError.code || readError.message}`);
            }

            // 4. Force token refresh
            await user.getIdToken(true);

            // Format skills
            const formattedSkills = formData.skills.map(name => ({
                name,
                proficiency: 1
            }));

            // 5. Write with Timeout
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error("Write operation timed out. Firewall might be blocking Firestore.")), 15000)
            );

            await Promise.race([
                setDoc(userRef, {
                    currentRole: formData.currentRole,
                    targetRole: formData.targetRole,
                    skills: formattedSkills,
                    onboardingComplete: true,
                    level: 1,
                    xp: 0,
                    streak: 0,
                    updatedAt: new Date().toISOString(),
                }, { merge: true }),
                timeoutPromise
            ]);

            window.location.href = '/dashboard';
        } catch (error: any) {
            console.error('Error saving onboarding data:', error);
            setError(error.message || "Failed to save data.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="max-w-2xl w-full">
                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="h-2 bg-surface rounded-full overflow-hidden">
                        <div
                            className="h-full bg-primary transition-all duration-500 ease-out"
                            style={{ width: `${(step / 3) * 100}%` }}
                        />
                    </div>
                    <div className="flex justify-between text-sm text-text-muted mt-2">
                        <span className={step >= 1 ? 'text-primary' : ''}>Identity</span>
                        <span className={step >= 2 ? 'text-primary' : ''}>Goal</span>
                        <span className={step >= 3 ? 'text-primary' : ''}>Skills</span>
                    </div>
                </div>

                <Card className="p-8 animate-fade-in-up">
                    {step === 1 && (
                        <div className="space-y-6">
                            <div className="text-center">
                                <h1 className="text-3xl font-bold text-text-main mb-2">Welcome to SkillBridge! 👋</h1>
                                <p className="text-text-muted">Let's personalize your experience. Which describes you best?</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {ROLES.map((role) => (
                                    <button
                                        key={role.id}
                                        onClick={() => setFormData({ ...formData, currentRole: role.id })}
                                        className={`p-6 rounded-xl border-2 text-left transition-all duration-200 hover:scale-[1.02] ${formData.currentRole === role.id
                                            ? 'border-primary bg-primary/10'
                                            : 'border-border bg-surface hover:border-primary/50'
                                            }`}
                                    >
                                        <div className="text-3xl mb-2">{role.icon}</div>
                                        <div className="font-bold text-text-main">{role.label}</div>
                                        <div className="text-sm text-text-muted">{role.description}</div>
                                    </button>
                                ))}
                            </div>

                            <div className="flex justify-end pt-4">
                                <Button
                                    onClick={handleNext}
                                    disabled={!formData.currentRole}
                                    className="w-full md:w-auto"
                                >
                                    Next Step
                                </Button>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6 animate-fade-in-up">
                            <div className="text-center">
                                <h1 className="text-3xl font-bold text-text-main mb-2">What is your goal? 🎯</h1>
                                <p className="text-text-muted">Select the role you want to master.</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {GOALS.map((goal) => (
                                    <button
                                        key={goal}
                                        onClick={() => setFormData({ ...formData, targetRole: goal })}
                                        className={`p-4 rounded-xl border text-left transition-all ${formData.targetRole === goal
                                            ? 'border-primary bg-primary text-white shadow-lg shadow-primary/25'
                                            : 'border-border bg-surface text-text-main hover:border-primary/50'
                                            }`}
                                    >
                                        {goal}
                                    </button>
                                ))}
                            </div>

                            <div className="flex justify-between pt-6">
                                <Button variant="outline" onClick={handleBack}>Back</Button>
                                <Button
                                    onClick={handleNext}
                                    disabled={!formData.targetRole}
                                >
                                    Next Step
                                </Button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-6 animate-fade-in-up">
                            <div className="text-center">
                                <h1 className="text-3xl font-bold text-text-main mb-2">Your Starting Point 🚀</h1>
                                <p className="text-text-muted">Select skills you already know (even a little).</p>
                            </div>

                            <div className="flex flex-wrap gap-2 justify-center">
                                {POPULAR_SKILLS.map((skill) => (
                                    <button
                                        key={skill}
                                        onClick={() => toggleSkill(skill)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${formData.skills.includes(skill)
                                            ? 'bg-primary text-white shadow-lg shadow-primary/25 scale-105'
                                            : 'bg-surface border border-border text-text-muted hover:border-primary hover:text-text-main'
                                            }`}
                                    >
                                        {skill}
                                    </button>
                                ))}
                            </div>

                            <div className="text-center text-sm text-text-muted mt-4">
                                Selected: {formData.skills.length} skills
                            </div>

                            <div className="flex flex-col gap-4 pt-6">
                                {error && (
                                    <div className="p-3 bg-error/10 border border-error/20 rounded-lg text-error text-sm text-center">
                                        {error}
                                    </div>
                                )}
                                <div className="flex justify-between">
                                    <Button variant="outline" onClick={handleBack}>Back</Button>
                                    <Button
                                        onClick={handleSubmit}
                                        isLoading={loading}
                                        className="px-8"
                                    >
                                        Complete Setup
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
}
