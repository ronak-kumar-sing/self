'use client';

import Image from 'next/image';
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
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {sortedVideos.map((video: any) => {
        const videoId = video.link?.match(/v=([\w-]+)/)?.pop() || '';
        const mongoId = video._id || video.id;
        return (
          <div
            key={mongoId}
            className="group overflow-hidden rounded-xl border border-zinc-200 bg-white transition-all hover:border-zinc-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
          >
            {/* Thumbnail */}
            {video.thumbnail && (
              <div className="relative h-40 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/30">
                  {video.link && (
                    <svg className="h-12 w-12 text-white opacity-0 transition-opacity group-hover:opacity-100" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  )}
                </div>
              </div>
            )}

            {/* Content */}
            <div className="p-4">
              <div className="mb-2 flex items-start justify-between gap-2">
                <h4 className="line-clamp-2 font-semibold leading-tight">{video.title}</h4>
                <span className={`flex-shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${getPlatformColor(video.platform)}`}>
                  {video.platform}
                </span>
              </div>

              <p className="text-xs text-zinc-500">{formatDate(video.date)}</p>

              {video.description && (
                <p className="mt-2 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">{video.description}</p>
              )}

              <div className="mt-4 flex gap-2">
                {video.link && (
                  <a
                    href={video.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 rounded-lg bg-red-600 px-3 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-red-700"
                  >
                    Watch
                  </a>
                )}
                {showActions && (
                  <div className="flex gap-1">
                    {onEdit && (
                      <button
                        onClick={() => onEdit(video as VideoEntry)}
                        className="rounded-lg px-2 py-2 text-zinc-500 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        title="Edit"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(mongoId as string)}
                        className="rounded-lg px-2 py-2 text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-950"
                        title="Delete"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
