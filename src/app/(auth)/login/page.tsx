'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);

            // Check if onboarding is complete
            const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
            if (userDoc.exists() && userDoc.data().onboardingComplete) {
                router.push('/dashboard');
            } else {
                router.push('/onboarding');
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="w-full bg-surface/80 backdrop-blur-xl shadow-2xl border-border/50">
            <div className="text-center mb-8">
                <div className="inline-flex w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl items-center justify-center mb-6 shadow-lg shadow-primary/30">
                    <span className="text-white font-bold text-3xl">S</span>
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                <p className="text-text-muted">Sign in to continue your journey</p>
            </div>

            {error && (
                <div className="bg-error/10 border border-error/20 text-error p-4 rounded-lg mb-6 text-sm font-medium flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {error}
                </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
                <Input
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                />

                <div>
                    <Input
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                    />
                    <div className="flex justify-end mt-2">
                        <Link href="#" className="text-sm text-primary hover:text-primary-hover font-medium">
                            Forgot password?
                        </Link>
                    </div>
                </div>

                <Button type="submit" className="w-full py-4 text-lg" isLoading={loading}>
                    Sign In
                </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-border text-center">
                <p className="text-text-muted">
                    Don't have an account?{' '}
                    <Link href="/register" className="text-primary hover:text-primary-hover font-bold transition-colors">
                        Create one
                    </Link>
                </p>
            </div>
        </Card>
    );
}
