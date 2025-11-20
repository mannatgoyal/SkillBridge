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
            setMessage('Account created! Please check your email to verify your account before logging in.');
            // Optional: Sign out immediately so they have to log in after verifying
            // await auth.signOut();
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-surface p-8 rounded-2xl shadow-xl border border-border">
                <h1 className="text-3xl font-bold text-center mb-2 text-primary">Create Account</h1>
                <p className="text-center text-text-muted mb-8">Start your career readiness journey</p>

                {error && <div className="bg-error/10 text-error p-3 rounded-lg mb-4 text-sm">{error}</div>}
                {message && <div className="bg-success/10 text-success p-3 rounded-lg mb-4 text-sm">{message}</div>}

                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-text-muted">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none transition-colors"
                            placeholder="you@example.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-text-muted">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none transition-colors"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-text-muted">Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none transition-colors"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3 rounded-lg transition-colors mt-6"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="text-center mt-6 text-sm text-text-muted">
                    Already have an account?{' '}
                    <Link href="/login" className="text-primary hover:underline">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
}
