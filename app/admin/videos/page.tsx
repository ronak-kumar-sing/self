'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useStore } from '../../store/useStore';
import VideoList from '../../components/VideoList';
import type { VideoEntry } from '../../types';

export default function VideosPage() {
  const { videos, addVideo, updateVideo, deleteVideo } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [editingVideo, setEditingVideo] = useState<VideoEntry | null>(null);

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    title: '',
    platform: 'YouTube' as 'YouTube' | 'Instagram' | 'LinkedIn' | 'Other',
    description: '',
    link: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingVideo) {
      updateVideo(editingVideo.id, formData);
      setEditingVideo(null);
    } else {
      addVideo(formData);
    }
    setFormData({
      date: new Date().toISOString().split('T')[0],
      title: '',
      platform: 'YouTube',
      description: '',
      link: '',
    });
    setShowForm(false);
  };

  const handleEdit = (video: VideoEntry) => {
    setEditingVideo(video);
    setFormData({
      date: video.date,
      title: video.title,
      platform: video.platform,
      description: video.description,
      link: video.link || '',
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this video?')) {
      deleteVideo(id);
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
            <h1 className="mt-2 text-2xl font-bold">Video Content</h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              Total: <span className="font-semibold">{videos.length} videos</span>
            </p>
          </div>
          <button
            onClick={() => {
              setEditingVideo(null);
              setFormData({
                date: new Date().toISOString().split('T')[0],
                title: '',
                platform: 'YouTube',
                description: '',
                link: '',
              });
              setShowForm(!showForm);
            }}
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
          >
            {showForm ? 'Cancel' : '+ Add Video'}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="mb-8 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="mb-4 text-lg font-semibold">
              {editingVideo ? 'Edit Video' : 'Add New Video'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-800"
                    placeholder="Day 30 of 100 Days of DSA"
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
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Platform
                  </label>
                  <select
                    value={formData.platform}
                    onChange={(e) => setFormData({ ...formData, platform: e.target.value as 'YouTube' | 'Instagram' | 'LinkedIn' | 'Other' })}
                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-800"
                  >
                    <option>YouTube</option>
                    <option>Instagram</option>
                    <option>LinkedIn</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Video Link
                  </label>
                  <input
                    type="url"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-800"
                    placeholder="https://youtube.com/..."
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-800"
                  placeholder="Brief description of the video content..."
                />
              </div>
              <button
                type="submit"
                className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
              >
                {editingVideo ? 'Update Video' : 'Add Video'}
              </button>
            </form>
          </div>
        )}

        {/* List */}
        <VideoList
          videos={videos}
          showActions
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
