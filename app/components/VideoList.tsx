'use client';

import { formatDate } from '../lib/utils';
import type { VideoEntry } from '../types';

interface VideoListProps {
  videos: VideoEntry[];
  showActions?: boolean;
  onEdit?: (video: VideoEntry) => void;
  onDelete?: (id: string) => void;
}

export default function VideoList({ videos, showActions, onEdit, onDelete }: VideoListProps) {
  const sortedVideos = [...videos].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'YouTube':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'Instagram':
        return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200';
      case 'LinkedIn':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default:
        return 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200';
    }
  };

  if (videos.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-300 p-8 text-center dark:border-zinc-700">
        <p className="text-zinc-500">No videos yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {sortedVideos.map((video) => (
        <div
          key={video.id}
          className="rounded-xl border border-zinc-200 bg-white p-4 transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="font-medium">{video.title}</h4>
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getPlatformColor(video.platform)}`}>
                  {video.platform}
                </span>
              </div>
              <p className="mt-1 text-sm text-zinc-500">{formatDate(video.date)}</p>
              {video.description && (
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{video.description}</p>
              )}
              {video.link && (
                <a
                  href={video.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
                >
                  Watch
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
            {showActions && (
              <div className="flex gap-2">
                {onEdit && (
                  <button
                    onClick={() => onEdit(video)}
                    className="rounded-lg px-3 py-1.5 text-sm text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-white"
                  >
                    Edit
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => onDelete(video.id)}
                    className="rounded-lg px-3 py-1.5 text-sm text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-950"
                  >
                    Delete
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
