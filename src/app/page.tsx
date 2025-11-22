'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg shadow-primary/25">
              <span className="text-white font-bold text-2xl">S</span>
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">SkillBridge</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Log In</Button>
            </Link>
            <Link href="/register">
              <Button>Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="relative py-32 px-4 overflow-hidden">
          {/* Background Effects */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-10 opacity-50"></div>
          <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-secondary/10 rounded-full blur-[100px] -z-10 opacity-30"></div>

          <div className="max-w-5xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-surface border border-border mb-4 animate-fade-in-up">
              <span className="w-2 h-2 rounded-full bg-success mr-2"></span>
              <span className="text-sm font-medium text-text-muted">New: AI Interview Coach Available</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tight leading-tight">
              Master Your <br />
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">Dream Career</span>
            </h1>

            <p className="text-xl md:text-2xl text-text-muted max-w-3xl mx-auto leading-relaxed">
              The all-in-one platform to analyze your skills, build personalized roadmaps, and practice interviews with AI.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto text-lg px-10 py-6 shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:scale-105 transition-all">
                  Start Your Journey
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-10 py-6 hover:bg-surface-hover">
                  Continue Learning
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-32 px-4 bg-surface/30 border-t border-border/50 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Everything you need to succeed</h2>
              <p className="text-xl text-text-muted">Powerful tools designed to accelerate your career growth.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card hoverEffect className="bg-surface/50 backdrop-blur-sm">
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-primary/20">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Skill Analysis</h3>
                <p className="text-text-muted leading-relaxed">
                  Connect GitHub to automatically analyze your code or manually assess your proficiency levels with detailed metrics.
                </p>
              </Card>

              <Card hoverEffect className="bg-surface/50 backdrop-blur-sm">
                <div className="w-14 h-14 bg-gradient-to-br from-accent to-secondary rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-accent/20">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 01-1.447-.894L15 7m0 13V7" /></svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Smart Roadmaps</h3>
                <p className="text-text-muted leading-relaxed">
                  Get personalized, step-by-step learning paths to bridge the gap between your current skills and your dream role.
                </p>
              </Card>

              <Card hoverEffect className="bg-surface/50 backdrop-blur-sm">
                <div className="w-14 h-14 bg-gradient-to-br from-secondary to-primary rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-secondary/20">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">AI Interview Coach</h3>
                <p className="text-text-muted leading-relaxed">
                  Practice technical interviews with our advanced Gemini-powered AI assistant and get instant, constructive feedback.
                </p>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-surface border-t border-border py-12 text-center">
        <div className="flex items-center justify-center gap-2 mb-4 opacity-50">
          <div className="w-6 h-6 bg-white/10 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">S</span>
          </div>
          <span className="font-bold text-white">SkillBridge</span>
        </div>
        <p className="text-text-muted">© 2024 SkillBridge. All rights reserved.</p>
      </footer>
    </div>
  );
}
