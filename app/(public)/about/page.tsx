import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-4xl px-6 py-12">
        {/* Profile Section */}
        <section className="mb-16">
          <div className="rounded-3xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900 md:p-12">
            <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-start md:text-left">
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-zinc-900 to-zinc-700 text-5xl font-bold text-white shadow-xl dark:from-white dark:to-zinc-200 dark:text-zinc-900">
                RK
              </div>
              <div className="flex-1">
                <h1 className="text-4xl font-bold tracking-tight">Ronak Kumar</h1>
                <p className="mt-2 text-xl text-zinc-600 dark:text-zinc-400">Software Engineer</p>
                <p className="mt-1 text-zinc-500">Lovely Professional University</p>
                <p className="mt-4 max-w-2xl text-zinc-600 dark:text-zinc-400">
                  Passionate about building software and growing every day. I believe in 
                  learning in public, consistency over intensity, and the compound effect 
                  of daily progress.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
                  <span className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-4 py-2 text-sm font-medium dark:bg-zinc-800">
                    <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                    Open to opportunities
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What I Do */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">What I&apos;m Focused On</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Daily DSA Practice</h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Solving algorithmic problems daily to strengthen problem-solving skills 
                and prepare for technical interviews.
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Continuous Learning</h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Constantly exploring new technologies, frameworks, and best practices 
                in software development.
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Content Creation</h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Creating educational content about my journey, sharing learnings, 
                and documenting my growth.
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Building in Public</h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Sharing my professional journey on LinkedIn, connecting with 
                like-minded professionals, and building my network.
              </p>
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">My Philosophy</h2>
          <div className="rounded-2xl border border-zinc-200 bg-gradient-to-br from-zinc-50 to-white p-8 dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-900/50">
            <blockquote className="text-xl font-medium italic text-zinc-700 dark:text-zinc-300">
              &ldquo;Small daily improvements over time lead to stunning results.&rdquo;
            </blockquote>
            <p className="mt-4 text-zinc-500">— Robin Sharma</p>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-500">Consistency</div>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Showing up every day, no matter how small the progress
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-500">Discipline</div>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Following through on commitments to myself
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-500">Growth</div>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Embracing challenges as opportunities to learn
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="rounded-2xl bg-gradient-to-r from-zinc-900 to-zinc-800 p-8 text-white dark:from-zinc-800 dark:to-zinc-700">
            <h2 className="text-2xl font-bold">Let&apos;s Connect</h2>
            <p className="mt-2 text-zinc-300">
              I&apos;m always open to discussing opportunities, collaborations, or just 
              having a conversation about tech and career growth.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/dsa"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100"
              >
                View My DSA Journey
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/linkedin"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-white/10"
              >
                LinkedIn Posts
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
