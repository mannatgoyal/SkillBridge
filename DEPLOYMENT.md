# Deployment Guide - SkillBridge Platform

This guide outlines the steps to deploy the SkillBridge Platform to **Vercel**, the recommended hosting provider for Next.js applications.

## Prerequisites

1.  **GitHub Account**: You need a GitHub repository to push your code to.
2.  **Vercel Account**: Sign up at [vercel.com](https://vercel.com).
3.  **Firebase Project**: Your existing Firebase project.

## Step 1: Push to GitHub

1.  Initialize a git repository if you haven't already:
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    ```
2.  Create a new repository on GitHub.
3.  Link your local repository to GitHub:
    ```bash
    git remote add origin <your-repo-url>
    git branch -M main
    git push -u origin main
    ```

## Step 2: Deploy to Vercel

1.  Go to your [Vercel Dashboard](https://vercel.com/dashboard).
2.  Click **"Add New..."** -> **"Project"**.
3.  Import your GitHub repository.
4.  **Configure Project**:
    *   **Framework Preset**: Next.js (should be auto-detected).
    *   **Root Directory**: `./` (default).
    *   **Build Command**: `npm run build` (default).
    *   **Output Directory**: `.next` (default).

## Step 3: Environment Variables (CRITICAL)

Expand the **"Environment Variables"** section in the Vercel deployment screen and add the following. **Copy the values from your local `.env.local` file.**

| Key | Description |
| :--- | :--- |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase API Key |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase Auth Domain |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase Project ID |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase Storage Bucket |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase Messaging Sender ID |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase App ID |
| `GEMINI_API_KEY` | Google Gemini API Key |
| `GITHUB_CLIENT_ID` | GitHub OAuth Client ID |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth Client Secret |

> **Note for GitHub OAuth**: When deploying to production, you must update your GitHub OAuth App settings.
> *   **Homepage URL**: `https://<your-vercel-project>.vercel.app`
> *   **Authorization callback URL**: `https://<your-vercel-project>.vercel.app/api/auth/github/callback`

## Step 4: Deploy

Click **"Deploy"**. Vercel will build your application and assign it a production URL.

## Troubleshooting

*   **Build Failed?** Check the build logs in Vercel. Common issues are missing environment variables or TypeScript errors (which we have already fixed).
*   **Auth Not Working?** Ensure you added the new Vercel domain (`https://<your-project>.vercel.app`) to your **Firebase Console -> Authentication -> Settings -> Authorized Domains**.
