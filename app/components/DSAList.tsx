'use client';

import { formatDate, getDifficultyColor } from '../lib/utils';
import type { DSAEntry } from '../types';

interface DSAListProps {
  entries: DSAEntry[];
  showActions?: boolean;
  onEdit?: (entry: DSAEntry) => void;
  onDelete?: (id: string) => void;
}

export default function DSAList({ entries, showActions, onEdit, onDelete }: DSAListProps) {
  const sortedEntries = [...entries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  if (entries.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-300 p-8 text-center dark:border-zinc-700">
        <p className="text-zinc-500">No DSA entries yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {sortedEntries.map((entry) => (
        <div
          key={entry.id}
          className="rounded-xl border border-zinc-200 bg-white p-4 transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h4 className="font-medium">{entry.problemName}</h4>
                <span className={`text-sm font-medium ${getDifficultyColor(entry.difficulty)}`}>
                  {entry.difficulty}
                </span>
              </div>
              <div className="mt-1 flex items-center gap-2 text-sm text-zinc-500">
                <span>{entry.platform}</span>
                <span>•</span>
                <span>{entry.topic}</span>
                <span>•</span>
                <span>{formatDate(entry.date)}</span>
              </div>
              {entry.notes && (
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{entry.notes}</p>
              )}
            </div>
            {showActions && (
              <div className="flex gap-2">
                {onEdit && (
                  <button
                    onClick={() => onEdit(entry)}
                    className="rounded-lg px-3 py-1.5 text-sm text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-white"
                  >
                    Edit
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => onDelete(entry.id)}
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
