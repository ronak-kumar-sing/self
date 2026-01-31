'use client';

import { useStore } from '../../store/useStore';
import { getStreakCount, formatDate, getDifficultyColor } from '../../lib/utils';
import StreakGrid from '../../components/StreakGrid';

export default function DSAJourneyPage() {
  const { dsaEntries } = useStore();

  const dsaDates = dsaEntries.map((e) => e.date);
  const streak = getStreakCount(dsaDates);
  const sortedEntries = [...dsaEntries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const easyCount = dsaEntries.filter((e) => e.difficulty === 'Easy').length;
  const mediumCount = dsaEntries.filter((e) => e.difficulty === 'Medium').length;
  const hardCount = dsaEntries.filter((e) => e.difficulty === 'Hard').length;

  const topicCounts = dsaEntries.reduce((acc, entry) => {
    if (entry.topic) {
      acc[entry.topic] = (acc[entry.topic] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const topTopics = Object.entries(topicCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Header */}
        <section className="mb-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
            {streak} Day Streak
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight">DSA Journey</h1>
          <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
            Tracking my daily Data Structures & Algorithms practice
          </p>
        </section>

        {/* Stats */}
        <section className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-sm font-medium text-zinc-500">Total Problems</p>
            <p className="mt-2 text-4xl font-bold">{dsaEntries.length}</p>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-sm font-medium text-emerald-500">Easy</p>
            <p className="mt-2 text-4xl font-bold text-emerald-500">{easyCount}</p>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-sm font-medium text-amber-500">Medium</p>
            <p className="mt-2 text-4xl font-bold text-amber-500">{mediumCount}</p>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-sm font-medium text-red-500">Hard</p>
            <p className="mt-2 text-4xl font-bold text-red-500">{hardCount}</p>
          </div>
        </section>

        {/* Streak Grid */}
        <section className="mb-12">
          <h2 className="mb-4 text-xl font-semibold">Weekly Activity</h2>
          <StreakGrid dates={dsaDates} title="Consistency Tracker" />
        </section>

        {/* Top Topics */}
        {topTopics.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-4 text-xl font-semibold">Top Topics</h2>
            <div className="flex flex-wrap gap-2">
              {topTopics.map(([topic, count]) => (
                <span
                  key={topic}
                  className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
                >
                  {topic}
                  <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium dark:bg-zinc-700">
                    {count}
                  </span>
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Problems List */}
        <section>
          <h2 className="mb-6 text-xl font-semibold">All Problems</h2>
          {sortedEntries.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-zinc-300 p-12 text-center dark:border-zinc-700">
              <p className="text-zinc-500">No problems solved yet. Check back soon!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {sortedEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="group rounded-2xl border border-zinc-200 bg-white p-5 transition-all hover:border-zinc-300 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold">{entry.problemName}</h3>
                        <span className={`text-sm font-medium ${getDifficultyColor(entry.difficulty)}`}>
                          {entry.difficulty}
                        </span>
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-zinc-500">
                        <span className="inline-flex items-center gap-1.5 rounded-md bg-zinc-100 px-2 py-1 dark:bg-zinc-800">
                          {entry.platform}
                        </span>
                        {entry.topic && (
                          <span className="inline-flex items-center gap-1.5 rounded-md bg-zinc-100 px-2 py-1 dark:bg-zinc-800">
                            {entry.topic}
                          </span>
                        )}
                        <span>{formatDate(entry.date)}</span>
                      </div>
                      {entry.notes && (
                        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">{entry.notes}</p>
                      )}
                    </div>
                    {entry.link && (
                      <a
                        href={entry.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800"
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
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
