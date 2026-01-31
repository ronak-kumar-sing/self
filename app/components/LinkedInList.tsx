'use client';

import { formatDate } from '../lib/utils';
import type { LinkedInPost } from '../types';

interface LinkedInListProps {
  posts: LinkedInPost[];
  showActions?: boolean;
  onEdit?: (post: LinkedInPost) => void;
  onDelete?: (id: string) => void;
}

export default function LinkedInList({ posts, showActions, onEdit, onDelete }: LinkedInListProps) {
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  if (posts.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-300 p-8 text-center dark:border-zinc-700">
        <p className="text-zinc-500">No LinkedIn posts yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {sortedPosts.map((post) => (
        <div
          key={post.id}
          className="rounded-xl border border-zinc-200 bg-white p-4 transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  {post.topic}
                </span>
                <span className="text-sm text-zinc-500">{formatDate(post.date)}</span>
              </div>
              <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">{post.summary}</p>
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
              >
                View Post
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
            {showActions && (
              <div className="flex gap-2">
                {onEdit && (
                  <button
                    onClick={() => onEdit(post)}
                    className="rounded-lg px-3 py-1.5 text-sm text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-white"
                  >
                    Edit
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => onDelete(post.id)}
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
