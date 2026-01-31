'use client';

import { useStore } from '../../store/useStore';
import { formatDate } from '../../lib/utils';

export default function LinkedInJourneyPage() {
  const { linkedInPosts } = useStore();

  const sortedPosts = [...linkedInPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const topicCounts = linkedInPosts.reduce((acc, post) => {
    acc[post.topic] = (acc[post.topic] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Header */}
        <section className="mb-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn Journey
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight">Building in Public</h1>
          <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
            Sharing my learning journey and insights on LinkedIn
          </p>
        </section>

        {/* Stats */}
        <section className="mb-12 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-sm font-medium text-zinc-500">Total Posts</p>
            <p className="mt-2 text-4xl font-bold">{linkedInPosts.length}</p>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-sm font-medium text-zinc-500">Topics Covered</p>
            <p className="mt-2 text-4xl font-bold">{Object.keys(topicCounts).length}</p>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-sm font-medium text-zinc-500">Latest Post</p>
            <p className="mt-2 text-xl font-semibold">
              {sortedPosts[0] ? formatDate(sortedPosts[0].date) : 'None yet'}
            </p>
          </div>
        </section>

        {/* Topics */}
        {Object.keys(topicCounts).length > 0 && (
          <section className="mb-12">
            <h2 className="mb-4 text-xl font-semibold">Topics</h2>
            <div className="flex flex-wrap gap-2">
              {Object.entries(topicCounts).map(([topic, count]) => (
                <span
                  key={topic}
                  className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                >
                  {topic}
                  <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs dark:bg-blue-800">
                    {count}
                  </span>
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Timeline */}
        <section>
          <h2 className="mb-6 text-xl font-semibold">Post Timeline</h2>
          {sortedPosts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-zinc-300 p-12 text-center dark:border-zinc-700">
              <p className="text-zinc-500">No LinkedIn posts yet. Check back soon!</p>
            </div>
          ) : (
            <div className="relative space-y-6 pl-8 before:absolute before:left-3 before:top-2 before:h-[calc(100%-16px)] before:w-0.5 before:bg-zinc-200 dark:before:bg-zinc-800">
              {sortedPosts.map((post) => (
                <div key={post.id} className="relative">
                  <div className="absolute -left-8 top-2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-blue-500 bg-white dark:bg-zinc-950">
                    <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                  </div>
                  <div className="rounded-2xl border border-zinc-200 bg-white p-5 transition-all hover:border-zinc-300 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                            {post.topic}
                          </span>
                          <span className="text-sm text-zinc-500">{formatDate(post.date)}</span>
                        </div>
                        <p className="mt-3 text-zinc-700 dark:text-zinc-300">{post.summary}</p>
                        {post.engagement && (
                          <p className="mt-2 text-sm text-zinc-500">{post.engagement}</p>
                        )}
                      </div>
                      <a
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30"
                      >
                        View
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
