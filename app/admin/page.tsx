'use client';

import { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';
import { getStreakCount, getLast7Days, getYearlyStats } from '../lib/utils';
import { Code2, Instagram, Youtube, Linkedin, Flame } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

export default function AdminPage() {
  const { dsaEntries, instagramPosts, videos, linkedInPosts, resetToMockData, clearAllData } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="space-y-4 animate-pulse">
      <div className="h-8 w-48 bg-zinc-200 rounded dark:bg-zinc-800"></div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 bg-zinc-200 rounded-lg dark:bg-zinc-800"></div>
        ))}
      </div>
    </div>;
  }

  // Stats
  const dsaStreak = getStreakCount(dsaEntries.map(e => e.date));
  const instagramStreak = getStreakCount(instagramPosts.map(p => p.date));
  const videoStreak = getStreakCount(videos.map(v => v.date));
  const linkedInStreak = getStreakCount(linkedInPosts.map(p => p.date));

  const dsaYearlyStats = getYearlyStats(dsaEntries.map(e => e.date));
  const instagramYearlyStats = getYearlyStats(instagramPosts.map(p => p.date));
  const videoYearlyStats = getYearlyStats(videos.map(v => v.date));
  const linkedInYearlyStats = getYearlyStats(linkedInPosts.map(p => p.date));

  const totalViews = instagramPosts.reduce((acc, p) => acc + (p.views || 0), 0);
  const totalLikes = instagramPosts.reduce((acc, p) => acc + (p.likes || 0), 0);
  const totalVideoViews = videos.reduce((acc, v) => acc + (v.views || 0), 0);

  const last7Days = getLast7Days();
  const dsaDateSet = new Set(dsaEntries.map(e => e.date));
  const instagramDateSet = new Set(instagramPosts.map(p => p.date));
  const videoDateSet = new Set(videos.map(v => v.date));
  const linkedInDateSet = new Set(linkedInPosts.map(p => p.date));

  const handleReset = () => {
    if (confirm("Reset all data?")) resetToMockData();
  }

  const handleClear = () => {
    if (confirm("Delete all data?")) clearAllData();
  }

  const stats = [
    {
      yearlyCount: dsaYearlyStats.count,
      currentYear: dsaYearlyStats.currentYear,
      color: "text-emerald-500",
    },
    {
      title: "Instagram Posts",
      value: instagramPosts.length,
      icon: Instagram,
      streak: instagramStreak,
      yearlyCount: instagramYearlyStats.count,
      currentYear: instagramYearlyStats.currentYear,
      color: "text-pink-500",
    },
    {
      title: "YouTube Videos",
      value: videos.length,
      icon: Youtube,
      streak: videoStreak,
      yearlyCount: videoYearlyStats.count,
      currentYear: videoYearlyStats.currentYear,
      color: "text-red-500",
    },
    {
      title: "LinkedIn Posts",
      value: linkedInPosts.length,
      icon: Linkedin,
      streak: linkedInStreak,
      yearlyCount: linkedInYearlyStats.count,
      currentYear: linkedInYearlyStats.currentYear,
      color: "text-blue-500",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Overview of your content creation journey.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleReset}>Reset Sample</Button>
          <Button variant="destructive" onClick={handleClear}>Clear All</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                {IconComponent && <IconComponent className={`h-4 w-4 text-muted-foreground ${stat.color}`} />}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <Flame className="h-3 w-3 text-orange-500" />
                  {stat.streak} day streak
                </p>
                <p className="text-xs font-medium mt-2" style={{ color: (stat.color || '').replace('text-', '') }}>
                  {stat.yearlyCount} in {stat.currentYear}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Weekly Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <Table className="min-w-[600px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Platform</TableHead>
                  {last7Days.map(day => (
                    <TableHead key={day} className="text-center">{new Date(day).toLocaleDateString('en-US', { weekday: 'short' })}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">DSA</TableCell>
                  {last7Days.map(day => (
                    <TableCell key={day} className="text-center">
                      {dsaDateSet.has(day) ? <div className="mx-auto h-2 w-2 rounded-full bg-emerald-500" /> : <span className="text-muted-foreground">-</span>}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Instagram</TableCell>
                  {last7Days.map(day => (
                    <TableCell key={day} className="text-center">
                      {instagramDateSet.has(day) ? <div className="mx-auto h-2 w-2 rounded-full bg-pink-500" /> : <span className="text-muted-foreground">-</span>}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">YouTube</TableCell>
                  {last7Days.map(day => (
                    <TableCell key={day} className="text-center">
                      {videoDateSet.has(day) ? <div className="mx-auto h-2 w-2 rounded-full bg-red-500" /> : <span className="text-muted-foreground">-</span>}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">LinkedIn</TableCell>
                  {last7Days.map(day => (
                    <TableCell key={day} className="text-center">
                      {linkedInDateSet.has(day) ? <div className="mx-auto h-2 w-2 rounded-full bg-blue-500" /> : <span className="text-muted-foreground">-</span>}
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Engagement Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Instagram Views</p>
                  <p className="text-sm text-muted-foreground">
                    Total views across all reels/posts
                  </p>
                </div>
                <div className="ml-auto font-bold">{totalViews.toLocaleString()}</div>
              </div>
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Instagram Likes</p>
                  <p className="text-sm text-muted-foreground">
                    Total likes
                  </p>
                </div>
                <div className="ml-auto font-bold">{totalLikes.toLocaleString()}</div>
              </div>
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">YouTube Views</p>
                  <p className="text-sm text-muted-foreground">
                    Total video views
                  </p>
                </div>
                <div className="ml-auto font-bold">{totalVideoViews.toLocaleString()}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
