'use client';

import { useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await sendEmailVerification(userCredential.user);
            // Redirect to onboarding immediately
            router.push('/onboarding');
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-surface to-background relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>

            <div className="w-full max-w-md bg-surface/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-border relative z-10">
                <div className="text-center mb-8">
                    <div className="inline-block w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-accent/50">
                        <span className="text-white font-bold text-3xl">S</span>
                    </div>
                    <h1 className="text-4xl font-black text-text-main mb-2">Create Account</h1>
                    <p className="text-text-muted">Start your career readiness journey</p>
                </div>

                {error && <div className="bg-error/10 border border-error/30 text-error p-4 rounded-xl mb-6 text-sm">{error}</div>}
                {message && <div className="bg-success/10 border border-success/30 text-success p-4 rounded-xl mb-6 text-sm">{message}</div>}

                <form onSubmit={handleRegister} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-text-main">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-4 rounded-xl bg-background/50 border-2 border-border focus:border-accent focus:outline-none transition-all text-text-main placeholder-text-muted"
                            placeholder="you@example.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-text-main">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-4 rounded-xl bg-background/50 border-2 border-border focus:border-accent focus:outline-none transition-all text-text-main placeholder-text-muted"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-text-main">Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-4 rounded-xl bg-background/50 border-2 border-border focus:border-accent focus:outline-none transition-all text-text-main placeholder-text-muted"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-accent to-primary hover:shadow-2xl hover:shadow-accent/50 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] mt-6"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="text-center mt-8 text-sm text-text-muted">
                    Already have an account?{' '}
                    <Link href="/login" className="text-accent hover:text-primary font-semibold transition-colors">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
}
