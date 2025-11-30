import { NextRequest, NextResponse } from 'next/server';
import { Octokit } from 'octokit';
import { db } from '@/lib/firebase';
import { doc, updateDoc, arrayUnion, getDoc, setDoc } from 'firebase/firestore';

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || 'Iv23liAUFenohUp4ZH7N';
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || '3fc2b2f93fb075a97d6f92625f4ff9ad6f97d98e';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const state = searchParams.get('state'); // We'll use state to pass user ID for now, or use session cookie

    if (!code || !state) {
        return NextResponse.json({ error: 'Missing code or state' }, { status: 400 });
    }

    // In a real app, validate state to prevent CSRF. Here state is the userId.
    const userId = state;

    try {
        // Exchange code for token
        const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                client_id: GITHUB_CLIENT_ID,
                client_secret: GITHUB_CLIENT_SECRET,
                code,
            }),
        });

        const tokenData = await tokenResponse.json();

        if (tokenData.error) {
            throw new Error(tokenData.error_description);
        }

        const accessToken = tokenData.access_token;

        // Initialize Octokit
        const octokit = new Octokit({ auth: accessToken });

        // Fetch user repos
        const { data: repos } = await octokit.rest.repos.listForAuthenticatedUser({
            sort: 'updated',
            per_page: 10, // Limit to top 10 recent repos for performance
        });

        // Extract languages (skills)
        const skillMap = new Map<string, number>();

        for (const repo of repos) {
            const { data: languages } = await octokit.rest.repos.listLanguages({
                owner: repo.owner.login,
                repo: repo.name,
            });

            // Simple logic: If language exists, it's a skill. 
            // We could use byte count to estimate proficiency, but for now let's just add them.
            // We'll default proficiency to 3 (Intermediate) if found.
            Object.keys(languages).forEach((lang) => {
                if (!skillMap.has(lang)) {
                    skillMap.set(lang, 3);
                }
            });
        }

        // Update Firestore
        const userRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userRef);

        const existingSkills = userDoc.exists() ? userDoc.data().skills || [] : [];
        const existingSkillNames = new Set(existingSkills.map((s: any) => s.name.toLowerCase()));

        const newSkills = [];
        for (const [name, proficiency] of skillMap.entries()) {
            if (!existingSkillNames.has(name.toLowerCase())) {
                newSkills.push({ name, proficiency });
            }
        }

        if (newSkills.length > 0) {
            await setDoc(userRef, {
                skills: arrayUnion(...newSkills),
                githubConnected: true
            }, { merge: true });
        } else {
            await setDoc(userRef, {
                githubConnected: true
            }, { merge: true });
        }

        // Redirect back to profile
        return NextResponse.redirect(new URL('/dashboard/profile', request.url));

    } catch (error: any) {
        console.error('GitHub Auth Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
