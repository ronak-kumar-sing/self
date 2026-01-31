'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useStore } from '../../store/useStore';
import LinkedInList from '../../components/LinkedInList';
import type { LinkedInPost } from '../../types';

export default function LinkedInPage() {
  const { linkedInPosts, addLinkedInPost, updateLinkedInPost, deleteLinkedInPost } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<LinkedInPost | null>(null);

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    summary: '',
    link: '',
    topic: 'Learning',
    engagement: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPost) {
      updateLinkedInPost(editingPost.id, formData);
      setEditingPost(null);
    } else {
      addLinkedInPost(formData);
    }
    setFormData({
      date: new Date().toISOString().split('T')[0],
      summary: '',
      link: '',
      topic: 'Learning',
      engagement: '',
    });
    setShowForm(false);
  };

  const handleEdit = (post: LinkedInPost) => {
    setEditingPost(post);
    setFormData({
      date: post.date,
      summary: post.summary,
      link: post.link,
      topic: post.topic,
      engagement: post.engagement || '',
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      deleteLinkedInPost(id);
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
            <h1 className="mt-2 text-2xl font-bold">LinkedIn Posts</h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              Total: <span className="font-semibold">{linkedInPosts.length} posts</span>
            </p>
          </div>
          <button
            onClick={() => {
              setEditingPost(null);
              setFormData({
                date: new Date().toISOString().split('T')[0],
                summary: '',
                link: '',
                topic: 'Learning',
                engagement: '',
              });
              setShowForm(!showForm);
            }}
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
          >
            {showForm ? 'Cancel' : '+ Add Post'}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="mb-8 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="mb-4 text-lg font-semibold">
              {editingPost ? 'Edit Post' : 'Add New Post'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Topic
                  </label>
                  <select
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-800"
                  >
                    <option>Learning</option>
                    <option>DSA</option>
                    <option>Career</option>
                    <option>Project</option>
                    <option>Tech</option>
                    <option>Personal</option>
                  </select>
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
              <div>
                <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Summary *
                </label>
                <textarea
                  required
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  rows={3}
                  className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-800"
                  placeholder="Brief summary of the post..."
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Post Link *
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-800"
                    placeholder="https://linkedin.com/posts/..."
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Engagement
                  </label>
                  <input
                    type="text"
                    value={formData.engagement}
                    onChange={(e) => setFormData({ ...formData, engagement: e.target.value })}
                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-800"
                    placeholder="100 likes, 20 comments"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
              >
                {editingPost ? 'Update Post' : 'Add Post'}
              </button>
            </form>
          </div>
        )}

        {/* List */}
        <LinkedInList
          posts={linkedInPosts}
          showActions
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
