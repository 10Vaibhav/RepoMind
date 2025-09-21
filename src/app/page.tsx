"use client";

import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  GitBranch,
  Rocket,
  Cpu,
} from 'lucide-react';

function GlassCard({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        'relative rounded-3xl border border-white/40 dark:border-white/10',
        'bg-white/60 dark:bg-white/5 backdrop-blur-xl',
        'shadow-[0_1px_0_0_rgba(255,255,255,0.6)_inset,0_20px_60px_-20px_rgba(0,0,0,0.25)]',
        'transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_1px_0_0_rgba(255,255,255,0.6)_inset,0_35px_80px_-20px_rgba(0,0,0,0.35)]',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  );
}

function Step({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="text-center group">
      <div className="relative mb-4 sm:mb-6">
        <div className="absolute inset-0 bg-gray-400/10 rounded-2xl sm:rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
        <div className="relative bg-gray-800 dark:bg-gray-700 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
          {icon}
        </div>
      </div>
      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 px-2">
        {title}
      </h3>
      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed px-2">{desc}</p>
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 selection:bg-blue-200 dark:selection:bg-blue-900">
      {/* Navigation */}
      <header className="sticky top-0 z-50">
        <nav aria-label="Primary" className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="mt-2 sm:mt-3" />
          <GlassCard className="px-3 sm:px-6 py-2 sm:py-3">
            <div className="flex h-12 sm:h-14 items-center justify-between">
              <a href="#" className="flex items-center" aria-label="RepoMind Home">
                <span className="relative">
                  <div className="bg-gradient-to-br from-purple-500 to-blue-600 p-1.5 sm:p-2 rounded-lg sm:rounded-xl shadow-lg overflow-hidden">
                    <img 
                      src="/cosmic-logo.jpg" 
                      alt="RepoMind Logo" 
                      className="h-4 w-4 sm:h-6 sm:w-6 object-cover rounded"
                    />
                    <Sparkles className="h-4 w-4 sm:h-6 sm:w-6 text-white hidden" />
                  </div>
                </span>
                <span className="ml-2 sm:ml-3 text-lg sm:text-2xl font-bold tracking-wide text-gray-900 dark:text-white font-mono">
                  RepoMind
                </span>
              </a>
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-8">
                <a
                  href="#how-it-works"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
                >
                  How it Works
                </a>
                <Link href="/dashboard">
                  <button className="bg-[#BC5148] hover:bg-opacity-90 text-white font-semibold py-2 px-5 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105">
                    Dashboard
                  </button>
                </Link>
              </div>

              {/* Mobile Navigation */}
              <div className="flex md:hidden items-center gap-3">
                <Link href="/dashboard">
                  <button className="bg-[#BC5148] hover:bg-opacity-90 text-white font-medium py-1.5 px-3 text-sm rounded-lg transition-all duration-300">
                    Dashboard
                  </button>
                </Link>
              </div>
            </div>
          </GlassCard>
          <div className="mb-2 sm:mb-3" />
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute -top-32 -left-24 h-[28rem] w-[28rem] rounded-full bg-blue-300/30 blur-3xl" />
          <div className="absolute -bottom-40 -right-24 h-[32rem] w-[32rem] rounded-full bg-purple-300/30 blur-3xl" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24">
            <div className="text-center">
              <div className="flex justify-center mb-4 sm:mb-6">
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-gray-900 dark:text-white leading-[1.05] mb-4 sm:mb-6 px-4 font-sans">
                Transform your GitHub
                <br />
                <span className="text-gray-700 dark:text-gray-300 font-light italic">
                  workflow with AI
                </span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed px-4 font-serif">
                RepoMind uses RAG to understand codebases, summarize meetings, track commits, and align teams in one place.
              </p>
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section id="how-it-works" className="py-12 sm:py-14 bg-white dark:bg-gray-950">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-14">
              <div className="flex justify-center mb-3 sm:mb-4">
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 px-4 font-sans tracking-wide">
                How RepoMind works
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4 font-serif">
                Three steps to modern, AI-accelerated development.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 px-4">
              <Step
                icon={<GitBranch className="h-8 w-8 sm:h-10 sm:w-10 text-white" />}
                title="1. Connect your repo"
                desc="Provide the URL and optional token for private repos—structure is analyzed automatically."
              />
              <Step
                icon={<Cpu className="h-8 w-8 sm:h-10 sm:w-10 text-white" />}
                title="2. AI analysis"
                desc="The RAG engine processes code, docs, and history to build project understanding."
              />
              <Step
                icon={<Rocket className="h-8 w-8 sm:h-10 sm:w-10 text-white" />}
                title="3. Start collaborating"
                desc="Ask questions, upload meetings, invite team members, and leverage insights."
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 sm:py-16 lg:py-17">
        <div className="border-t border-white/10 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center text-gray-500 px-4">
          <p className="text-sm sm:text-base">&copy; 2025 RepoMind. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;