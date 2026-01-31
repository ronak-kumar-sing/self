'use client';

import { InstagramPost } from '../types';

interface InstagramListProps {
  posts: InstagramPost[];
  maxItems?: number;
}

export default function InstagramList({ posts, maxItems }: InstagramListProps) {
  const sortedPosts = [...posts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, maxItems || posts.length);

  if (sortedPosts.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-8 text-center dark:border-zinc-700 dark:bg-zinc-900">
        <p className="text-zinc-500">No Instagram posts yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {sortedPosts.map((post) => (
        <div
          key={post.id}
          className="group rounded-xl border border-zinc-200 bg-white p-4 transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  post.type === 'Reel' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' :
                  post.type === 'Post' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                  post.type === 'Story' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                  'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                }`}>
                  {post.type}
                </span>
                <span className="text-xs text-zinc-500">{post.topic}</span>
              </div>
              <p className="mt-2 text-sm text-zinc-700 line-clamp-2 dark:text-zinc-300">{post.caption}</p>
              <div className="mt-2 flex items-center gap-4 text-xs text-zinc-500">
                <span>👁️ {(post.views || 0).toLocaleString()}</span>
                <span>❤️ {(post.likes || 0).toLocaleString()}</span>
                <span>{post.date}</span>
              </div>
            </div>
            {post.link && (
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 p-2 text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
