'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useStore } from '../../store/useStore';
import { getStreakCount } from '../../lib/utils';
import DSAList from '../../components/DSAList';
import StreakGrid from '../../components/StreakGrid';
import type { DSAEntry } from '../../types';

export default function DSAPage() {
  const { dsaEntries, addDSAEntry, updateDSAEntry, deleteDSAEntry } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState<DSAEntry | null>(null);

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    problemName: '',
    platform: 'LeetCode',
    difficulty: 'Medium' as 'Easy' | 'Medium' | 'Hard',
    topic: '',
    notes: '',
    link: '',
  });

  const dsaDates = dsaEntries.map((e) => e.date);
  const streak = getStreakCount(dsaDates);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEntry) {
      updateDSAEntry(editingEntry.id, formData);
      setEditingEntry(null);
    } else {
      addDSAEntry(formData);
    }
    setFormData({
      date: new Date().toISOString().split('T')[0],
      problemName: '',
      platform: 'LeetCode',
      difficulty: 'Medium',
      topic: '',
      notes: '',
      link: '',
    });
    setShowForm(false);
  };

  const handleEdit = (entry: DSAEntry) => {
    setEditingEntry(entry);
    setFormData({
      date: entry.date,
      problemName: entry.problemName,
      platform: entry.platform,
      difficulty: entry.difficulty,
      topic: entry.topic,
      notes: entry.notes,
      link: entry.link || '',
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this entry?')) {
      deleteDSAEntry(id);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-4xl px-6 py-12">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link href="/admin" className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white">
              ← Back to Dashboard
            </Link>
            <h1 className="mt-2 text-2xl font-bold">DSA Tracker</h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              Current streak: <span className="font-semibold text-emerald-500">{streak} days</span>
            </p>
          </div>
          <button
            onClick={() => {
              setEditingEntry(null);
              setFormData({
                date: new Date().toISOString().split('T')[0],
                problemName: '',
                platform: 'LeetCode',
                difficulty: 'Medium',
                topic: '',
                notes: '',
                link: '',
              });
              setShowForm(!showForm);
            }}
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
          >
            {showForm ? 'Cancel' : '+ Add Problem'}
          </button>
        </div>

        {/* Streak Grid */}
        <div className="mb-8">
          <StreakGrid dates={dsaDates} title="Last 7 Days Activity" />
        </div>

        {/* Form */}
        {showForm && (
          <div className="mb-8 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="mb-4 text-lg font-semibold">
              {editingEntry ? 'Edit Problem' : 'Add New Problem'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Problem Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.problemName}
                    onChange={(e) => setFormData({ ...formData, problemName: e.target.value })}
                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-800"
                    placeholder="Two Sum"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-800"
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Platform
                  </label>
                  <select
                    value={formData.platform}
                    onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-800"
                  >
                    <option>LeetCode</option>
                    <option>CodeForces</option>
                    <option>HackerRank</option>
                    <option>GeeksforGeeks</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Difficulty
                  </label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as 'Easy' | 'Medium' | 'Hard' })}
                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-800"
                  >
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Topic
                  </label>
                  <input
                    type="text"
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-800"
                    placeholder="Arrays, DP, etc."
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                  className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-800"
                  placeholder="Key learnings, approach used, etc."
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Problem Link
                </label>
                <input
                  type="url"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-800"
                  placeholder="https://leetcode.com/problems/..."
                />
              </div>
              <button
                type="submit"
                className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
              >
                {editingEntry ? 'Update Problem' : 'Add Problem'}
              </button>
            </form>
          </div>
        )}

        {/* List */}
        <DSAList
          entries={dsaEntries}
          showActions
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
