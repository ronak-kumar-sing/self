'use client';

import { getLast7Days } from '../lib/utils';

interface StreakGridProps {
  dates: string[];
  title: string;
}

export default function StreakGrid({ dates, title }: StreakGridProps) {
  const last7Days = getLast7Days();
  const dateSet = new Set(dates);

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <h3 className="mb-4 text-sm font-medium text-zinc-500">{title}</h3>
      <div className="flex gap-2">
        {last7Days.map((day) => {
          const hasEntry = dateSet.has(day);
          const dayLabel = new Date(day).toLocaleDateString('en-US', { weekday: 'short' });
          return (
            <div key={day} className="flex flex-col items-center gap-1">
              <div
                className={`h-8 w-8 rounded-md ${
                  hasEntry
                    ? 'bg-emerald-500'
                    : 'bg-zinc-100 dark:bg-zinc-800'
                }`}
              />
              <span className="text-xs text-zinc-500">{dayLabel}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
