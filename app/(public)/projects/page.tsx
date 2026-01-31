'use client';

import ProjectList from '../../components/ProjectList';
import { Sparkles } from 'lucide-react';

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 via-white to-zinc-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute left-1/2 top-0 -z-10 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-br from-violet-500/20 via-purple-500/10 to-transparent blur-3xl" />
        
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex flex-col items-center text-center">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 dark:border-violet-800 dark:bg-violet-950/50">
              <Sparkles className="h-4 w-4 text-violet-600 dark:text-violet-400" />
              <span className="text-sm font-medium text-violet-700 dark:text-violet-300">
                Portfolio Showcase
              </span>
            </div>

            <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl lg:text-6xl">
              Projects I&apos;ve{' '}
              <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                Built
              </span>
            </h1>
            
            <p className="mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
              A curated collection of projects showcasing my skills in web development, 
              system design, and problem-solving. Each project represents a unique challenge 
              and learning experience.
            </p>

            {/* Quick Stats */}
            <div className="mt-10 flex flex-wrap justify-center gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-zinc-900 dark:text-white">Full Stack</div>
                <div className="text-sm text-zinc-500 dark:text-zinc-400">Development</div>
              </div>
              <div className="h-12 w-px bg-zinc-200 dark:bg-zinc-700" />
              <div className="text-center">
                <div className="text-3xl font-bold text-zinc-900 dark:text-white">Modern</div>
                <div className="text-sm text-zinc-500 dark:text-zinc-400">Tech Stack</div>
              </div>
              <div className="h-12 w-px bg-zinc-200 dark:bg-zinc-700" />
              <div className="text-center">
                <div className="text-3xl font-bold text-zinc-900 dark:text-white">Open Source</div>
                <div className="text-sm text-zinc-500 dark:text-zinc-400">Contributions</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects List */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <ProjectList />
      </section>

      {/* CTA Section */}
      <section className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white sm:text-3xl">
              Interested in Collaborating?
            </h2>
            <p className="mt-3 max-w-xl text-zinc-600 dark:text-zinc-400">
              I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
            </p>
            <div className="mt-8 flex gap-4">
              <a
                href="https://github.com/ronakkumar"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                View GitHub
              </a>
              <a
                href="/linkedin"
                className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-900 transition-all hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:hover:border-zinc-600"
              >
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
