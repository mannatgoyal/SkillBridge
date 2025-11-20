'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-surface p-8 rounded-2xl shadow-xl border border-border">
                <h1 className="text-3xl font-bold text-center mb-2 text-primary">Welcome Back</h1>
                <p className="text-center text-text-muted mb-8">Sign in to continue your journey</p>

                {error && <div className="bg-error/10 text-error p-3 rounded-lg mb-4 text-sm">{error}</div>}

                <form onSubmit={handleLogin} className="space-y-4">
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

                    <button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3 rounded-lg transition-colors mt-6"
                    >
                        Sign In
                    </button>
                </form>

                <p className="text-center mt-6 text-sm text-text-muted">
                    Don't have an account?{' '}
                    <Link href="/register" className="text-primary hover:underline">
                        Create one
                    </Link>
                </p>
            </div>
        </div>
    );
}
