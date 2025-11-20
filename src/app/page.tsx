import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-surface border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-xl font-bold text-text-main">SkillBridge</span>
          </div>
          <nav className="flex gap-4">
            <Link href="/login" className="text-text-muted hover:text-text-main font-medium transition-colors">
              Log In
            </Link>
            <Link href="/register" className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 text-center bg-gradient-to-b from-surface to-background">
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-text-main tracking-tight">
              Bridge the Gap to Your <span className="text-primary">Dream Career</span>
            </h1>
            <p className="text-xl text-text-muted max-w-2xl mx-auto">
              Analyze your skills, generate personalized learning roadmaps, and practice with our AI Interview Coach.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Link href="/register" className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors shadow-lg shadow-primary/25">
                Start Your Journey
              </Link>
              <Link href="/login" className="bg-surface hover:bg-surface-hover text-text-main border border-border px-8 py-4 rounded-xl font-bold text-lg transition-colors">
                Continue Learning
              </Link>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 px-4 bg-surface/50">
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="bg-surface p-8 rounded-2xl border border-border hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-text-main mb-3">Skill Analysis</h3>
              <p className="text-text-muted">
                Connect GitHub to automatically analyze your code or manually assess your proficiency levels.
              </p>
            </div>

            <div className="bg-surface p-8 rounded-2xl border border-border hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0121 18.382V7.618a1 1 0 01-1.447-.894L15 7m0 13V7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-text-main mb-3">Smart Roadmaps</h3>
              <p className="text-text-muted">
                Get personalized learning paths to bridge the gap between your current skills and target roles.
              </p>
            </div>

            <div className="bg-surface p-8 rounded-2xl border border-border hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-text-main mb-3">AI Interview Coach</h3>
              <p className="text-text-muted">
                Practice technical interviews with our Gemini-powered AI assistant and get instant feedback.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-surface border-t border-border py-8 text-center text-text-muted">
        <p>© 2024 SkillBridge. All rights reserved.</p>
      </footer>
    </div>
  );
}
