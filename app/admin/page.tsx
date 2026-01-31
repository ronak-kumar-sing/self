'use client';

import Link from 'next/link';
import { useStore } from '../store/useStore';
import { getStreakCount } from '../lib/utils';
import StatCard from '../components/StatCard';

export default function AdminPage() {
  const { dsaEntries, tasks, videos, linkedInPosts } = useStore();

  const dsaStreak = getStreakCount(dsaEntries.map((e) => e.date));
  const completedTasks = tasks.filter((t) => t.completed).length;
  const todayStr = new Date().toISOString().split('T')[0];
  const todayTasks = tasks.filter((t) => t.date === todayStr);

  const sections = [
    {
      title: 'DSA Tracker',
      description: 'Track your daily DSA problems and maintain your streak',
      href: '/admin/dsa',
      count: dsaEntries.length,
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
    {
      title: 'Daily Tasks',
      description: 'Manage your to-do list and track completion',
      href: '/admin/tasks',
      count: `${completedTasks}/${tasks.length}`,
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
    },
    {
      title: 'Video Content',
      description: 'Record videos and reels uploaded each day',
      href: '/admin/videos',
      count: videos.length,
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: 'LinkedIn Posts',
      description: 'Manage your LinkedIn content journey',
      href: '/admin/linkedin',
      count: linkedInPosts.length,
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            Private Admin Area
          </div>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="mt-1 text-zinc-600 dark:text-zinc-400">
            Manage your growth journey
          </p>
        </div>

        {/* Quick Stats */}
        <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Current Streak"
            value={`${dsaStreak} days`}
            subtitle="Keep it going!"
          />
          <StatCard
            title="Today's Tasks"
            value={`${todayTasks.filter(t => t.completed).length}/${todayTasks.length}`}
            subtitle="Tasks completed today"
          />
          <StatCard
            title="Total Problems"
            value={dsaEntries.length}
            subtitle="DSA problems solved"
          />
          <StatCard
            title="Content Created"
            value={videos.length + linkedInPosts.length}
            subtitle="Videos + Posts"
          />
        </div>

        {/* Section Cards */}
        <div className="grid gap-4 sm:grid-cols-2">
          {sections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="group rounded-xl border border-zinc-200 bg-white p-6 transition-all hover:border-zinc-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
            >
              <div className="flex items-start justify-between">
                <div className="rounded-lg bg-zinc-100 p-3 text-zinc-600 transition-colors group-hover:bg-zinc-900 group-hover:text-white dark:bg-zinc-800 dark:text-zinc-400 dark:group-hover:bg-white dark:group-hover:text-zinc-900">
                  {section.icon}
                </div>
                <span className="text-2xl font-semibold text-zinc-300 dark:text-zinc-700">
                  {section.count}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-semibold">{section.title}</h3>
              <p className="mt-1 text-sm text-zinc-500">{section.description}</p>
              <div className="mt-4 flex items-center gap-1 text-sm font-medium text-zinc-600 group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-white">
                Manage
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
