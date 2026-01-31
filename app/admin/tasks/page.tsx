'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useStore } from '../../store/useStore';
import TaskList from '../../components/TaskList';

export default function TasksPage() {
  const { tasks, addTask, updateTask, deleteTask } = useStore();
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    title: '',
    category: 'Learning',
    completed: false,
  });

  const todayStr = new Date().toISOString().split('T')[0];
  const todayTasks = tasks.filter((t) => t.date === todayStr);
  const completedToday = todayTasks.filter((t) => t.completed).length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTask(formData);
    setFormData({
      date: new Date().toISOString().split('T')[0],
      title: '',
      category: 'Learning',
      completed: false,
    });
    setShowForm(false);
  };

  const handleToggle = (id: string, completed: boolean) => {
    updateTask(id, { completed });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      deleteTask(id);
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
            <h1 className="mt-2 text-2xl font-bold">Daily Tasks</h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              Today: <span className="font-semibold text-emerald-500">{completedToday}/{todayTasks.length} completed</span>
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
          >
            {showForm ? 'Cancel' : '+ Add Task'}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="mb-8 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="mb-4 text-lg font-semibold">Add New Task</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Task *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-800"
                  placeholder="Complete two LeetCode problems"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-800"
                  >
                    <option>Learning</option>
                    <option>DSA</option>
                    <option>Project</option>
                    <option>Content</option>
                    <option>Reading</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-800"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
              >
                Add Task
              </button>
            </form>
          </div>
        )}

        {/* Today's Tasks */}
        {todayTasks.length > 0 && (
          <div className="mb-8">
            <h2 className="mb-4 text-lg font-semibold">Today&apos;s Tasks</h2>
            <TaskList
              tasks={todayTasks}
              showActions
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          </div>
        )}

        {/* All Tasks */}
        <div>
          <h2 className="mb-4 text-lg font-semibold">All Tasks</h2>
          <TaskList
            tasks={tasks}
            showActions
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}
