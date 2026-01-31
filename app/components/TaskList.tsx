'use client';

import { formatDate } from '../lib/utils';
import type { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  showActions?: boolean;
  onToggle?: (id: string, completed: boolean) => void;
  onDelete?: (id: string) => void;
}

export default function TaskList({ tasks, showActions, onToggle, onDelete }: TaskListProps) {
  const sortedTasks = [...tasks].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  if (tasks.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-300 p-8 text-center dark:border-zinc-700">
        <p className="text-zinc-500">No tasks yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {sortedTasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
        >
          {showActions && onToggle ? (
            <button
              onClick={() => onToggle(task.id, !task.completed)}
              className={`flex h-5 w-5 items-center justify-center rounded-md border-2 transition-colors ${
                task.completed
                  ? 'border-emerald-500 bg-emerald-500 text-white'
                  : 'border-zinc-300 dark:border-zinc-600'
              }`}
            >
              {task.completed && (
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ) : (
            <div
              className={`flex h-5 w-5 items-center justify-center rounded-md border-2 ${
                task.completed
                  ? 'border-emerald-500 bg-emerald-500 text-white'
                  : 'border-zinc-300 dark:border-zinc-600'
              }`}
            >
              {task.completed && (
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          )}
          <div className="flex-1">
            <p className={task.completed ? 'text-zinc-400 line-through' : ''}>{task.title}</p>
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <span>{task.category}</span>
              <span>•</span>
              <span>{formatDate(task.date)}</span>
            </div>
          </div>
          {showActions && onDelete && (
            <button
              onClick={() => onDelete(task.id)}
              className="rounded-lg px-3 py-1.5 text-sm text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-950"
            >
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
