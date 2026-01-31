import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function getStreakCount(dates: string[]): number {
  if (dates.length === 0) return 0;

  const sortedDates = [...new Set(dates)].sort((a, b) =>
    new Date(b).getTime() - new Date(a).getTime()
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let streak = 0;
  let currentDate = today;

  for (const dateStr of sortedDates) {
    const date = new Date(dateStr);
    date.setHours(0, 0, 0, 0);

    const diffDays = Math.floor((currentDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0 || diffDays === 1) {
      streak++;
      currentDate = date;
    } else {
      break;
    }
  }

  return streak;
}

export function getYearlyStats(dates: string[]): { currentYear: number; count: number; streak: number } {
  const currentYear = new Date().getFullYear();
  const yearDates = dates.filter(dateStr => {
    const date = new Date(dateStr);
    return date.getFullYear() === currentYear;
  });

  return {
    currentYear,
    count: yearDates.length,
    streak: getStreakCount(yearDates),
  };
}

export function getYearlyComparison(dates: string[]): { year: number; count: number }[] {
  const yearCounts: Record<number, number> = {};

  dates.forEach((dateStr) => {
    const year = new Date(dateStr).getFullYear();
    yearCounts[year] = (yearCounts[year] || 0) + 1;
  });

  return Object.entries(yearCounts)
    .sort((a, b) => parseInt(b[0]) - parseInt(a[0]))
    .map(([year, count]) => ({
      year: parseInt(year),
      count,
    }));
}

export function getLast7Days(): string[] {
  const days: string[] = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    days.push(date.toISOString().split('T')[0]);
  }
  return days;
}

export function getLast30Days(): string[] {
  const days: string[] = [];
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    days.push(date.toISOString().split('T')[0]);
  }
  return days;
}

export function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case 'Easy':
      return 'text-emerald-500';
    case 'Medium':
      return 'text-amber-500';
    case 'Hard':
      return 'text-red-500';
    default:
      return 'text-zinc-500';
  }
}

export function getWeekNumber(date: Date): number {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

export function getMonthlyData(dates: string[]): { month: string; count: number }[] {
  const monthCounts: Record<string, number> = {};

  dates.forEach((dateStr) => {
    const date = new Date(dateStr);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    monthCounts[monthKey] = (monthCounts[monthKey] || 0) + 1;
  });

  return Object.entries(monthCounts)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .slice(-6)
    .map(([key, count]) => {
      const [year, month] = key.split('-');
      const date = new Date(parseInt(year), parseInt(month) - 1);
      return {
        month: date.toLocaleDateString('en-US', { month: 'short' }),
        count,
      };
    });
}
