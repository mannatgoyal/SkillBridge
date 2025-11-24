'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { useRouter } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        const checkOnboarding = async () => {
            if (authLoading) return;
            if (!user) {
                setChecking(false);
                return;
            }

            try {
                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);

                // If user doc doesn't exist or onboarding not complete, redirect
                if (!docSnap.exists() || !docSnap.data().onboardingComplete) {
                    router.push('/onboarding');
                }
            } catch (error) {
                console.error("Error checking onboarding:", error);
            } finally {
                setChecking(false);
            }
        };

        checkOnboarding();
    }, [user, authLoading, router]);

    if (authLoading || checking) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Sidebar />
            <main className="pl-64 min-h-screen transition-all duration-300">
                <div className="max-w-7xl mx-auto p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
