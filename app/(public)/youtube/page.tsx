'use client';

import { useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { formatDate, getStreakCount, getYearlyStats } from '../../lib/utils';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function YouTubePage() {
  const { videos, fetchData, isLoading } = useStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const videoDates = videos.map((v) => v.date);
  const streak = getStreakCount(videoDates);
  const yearlyStats = getYearlyStats(videoDates);

  const sortedVideos = [...videos].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const youtubeCount = videos.filter(v => v.platform === 'YouTube').length;
  const instagramCount = videos.filter(v => v.platform === 'Instagram').length;
  const linkedInCount = videos.filter(v => v.platform === 'LinkedIn').length;
  const otherCount = videos.filter(v => v.platform === 'Other').length;

  const totalViews = videos.reduce((sum, v) => sum + (v.views || 0), 0);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-300 border-t-red-600 dark:border-zinc-700 dark:border-t-red-400"></div>
          <p className="text-sm text-zinc-500">Loading video data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        {/* Header */}
        <motion.section 
          className="mb-12"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.5 }}
        >
          <motion.span 
            className="inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800 dark:bg-red-900/30 dark:text-red-400"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            🔥 {streak} Day Streak • {yearlyStats.count} in {yearlyStats.currentYear}
          </motion.span>
          <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight">Video Content</h1>
          <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
            YouTube videos and video content across platforms
          </p>
        </motion.section>

        {/* Stats */}
        <motion.section 
          className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
            variants={fadeInUp}
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <p className="text-sm font-medium text-zinc-500">Total Videos</p>
            <motion.p 
              className="mt-2 text-4xl font-bold"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
            >
              {videos.length}
            </motion.p>
            <p className="mt-2 text-xs text-red-600 dark:text-red-400">
              📅 {yearlyStats.count} in {yearlyStats.currentYear}
            </p>
          </motion.div>
          <motion.div 
            className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
            variants={fadeInUp}
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <p className="text-sm font-medium text-red-500">YouTube</p>
            <motion.p 
              className="mt-2 text-4xl font-bold text-red-500"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.3 }}
            >
              {youtubeCount}
            </motion.p>
          </motion.div>
          <motion.div 
            className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
            variants={fadeInUp}
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <p className="text-sm font-medium text-pink-500">Instagram</p>
            <motion.p 
              className="mt-2 text-4xl font-bold text-pink-500"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.4 }}
            >
              {instagramCount}
            </motion.p>
          </motion.div>
          <motion.div 
            className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
            variants={fadeInUp}
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <p className="text-sm font-medium text-blue-500">LinkedIn</p>
            <motion.p 
              className="mt-2 text-4xl font-bold text-blue-500"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.5 }}
            >
              {linkedInCount}
            </motion.p>
          </motion.div>
        </motion.section>

        {/* Total Views */}
        {totalViews > 0 && (
          <motion.section 
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <motion.div 
              className="rounded-2xl border border-zinc-200 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 p-8 dark:border-zinc-800 dark:from-red-900/10 dark:via-orange-900/10 dark:to-yellow-900/10"
              whileHover={{ scale: 1.01 }}
            >
              <p className="text-sm font-medium text-zinc-500">Total Views Across All Platforms</p>
              <p className="mt-2 text-5xl font-bold bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
                {totalViews.toLocaleString()}
              </p>
            </motion.div>
          </motion.section>
        )}

        {/* Yearly Streak Calendar */}
        <motion.section 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
            <h2 className="text-lg sm:text-xl font-semibold">🔥 {yearlyStats.currentYear} Streak Calendar</h2>
            <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-zinc-500">
              <span className="flex items-center gap-1">
                <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-sm bg-zinc-200 dark:bg-zinc-700"></span>
                No activity
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-sm bg-red-500"></span>
                Published
              </span>
            </div>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6 dark:border-zinc-800 dark:bg-zinc-900 overflow-x-auto">
            <div className="grid grid-cols-6 sm:grid-cols-12 gap-3 sm:gap-2 min-w-0">
              {Array.from({ length: 12 }, (_, monthIndex) => {
                const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                const daysInMonth = new Date(yearlyStats.currentYear, monthIndex + 1, 0).getDate();
                const monthDates = videoDates.filter(d => {
                  const date = new Date(d);
                  return date.getMonth() === monthIndex && date.getFullYear() === yearlyStats.currentYear;
                });
                const activeDays = monthDates.length;
                
                return (
                  <motion.div 
                    key={monthIndex}
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + monthIndex * 0.05 }}
                  >
                    <p className="text-xs font-medium text-zinc-500 mb-2">{monthNames[monthIndex]}</p>
                    <div className="grid grid-cols-7 gap-0.5">
                      {Array.from({ length: Math.min(daysInMonth, 28) }, (_, dayIndex) => {
                        const dayDate = new Date(yearlyStats.currentYear, monthIndex, dayIndex + 1);
                        const hasActivity = videoDates.some(d => {
                          const entryDate = new Date(d);
                          return entryDate.toDateString() === dayDate.toDateString();
                        });
                        const isToday = dayDate.toDateString() === new Date().toDateString();
                        const isFuture = dayDate > new Date();
                        
                        return (
                          <motion.div
                            key={dayIndex}
                            className={`h-2 w-2 rounded-sm transition-colors ${
                              isFuture 
                                ? 'bg-zinc-100 dark:bg-zinc-800' 
                                : hasActivity 
                                  ? 'bg-red-500 shadow-sm shadow-red-500/50' 
                                  : 'bg-zinc-200 dark:bg-zinc-700'
                            } ${isToday ? 'ring-1 ring-violet-500' : ''}`}
                            whileHover={{ scale: 1.5 }}
                            title={`${monthNames[monthIndex]} ${dayIndex + 1}`}
                          />
                        );
                      })}
                    </div>
                    <p className="text-xs font-bold mt-2 text-red-500">{activeDays}</p>
                  </motion.div>
                );
              })}
            </div>
            
            {/* Yearly Summary Stats */}
            <motion.div 
              className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-zinc-200 dark:border-zinc-700 grid grid-cols-3 gap-4 sm:flex sm:items-center sm:justify-center sm:gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="text-center">
                <p className="text-xl sm:text-2xl font-bold text-red-500">{yearlyStats.count}</p>
                <p className="text-[10px] sm:text-xs text-zinc-500">Videos in {yearlyStats.currentYear}</p>
              </div>
              <div className="hidden sm:block h-8 w-px bg-zinc-200 dark:bg-zinc-700"></div>
              <div className="text-center">
                <p className="text-xl sm:text-2xl font-bold text-orange-500">{streak}</p>
                <p className="text-[10px] sm:text-xs text-zinc-500">Day Streak</p>
              </div>
              <div className="hidden sm:block h-8 w-px bg-zinc-200 dark:bg-zinc-700"></div>
              <div className="text-center">
                <p className="text-xl sm:text-2xl font-bold text-yellow-500">{videoDates.length}</p>
                <p className="text-[10px] sm:text-xs text-zinc-500">Publishing Days</p>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Video Gallery */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="mb-6 text-xl font-semibold">All Videos</h2>
          {sortedVideos.length === 0 ? (
            <motion.div 
              className="rounded-2xl border border-dashed border-zinc-300 p-12 text-center dark:border-zinc-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-zinc-500">No videos yet. Check back soon!</p>
            </motion.div>
          ) : (
            <motion.div 
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {sortedVideos.map((video, index) => (
                <motion.div
                  key={video.id}
                  className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
                  variants={fadeInUp}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="relative aspect-video bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
                    <motion.div 
                      className={`flex h-16 w-16 items-center justify-center rounded-full ${
                        video.platform === 'YouTube' 
                          ? 'bg-red-600' 
                          : video.platform === 'Instagram'
                          ? 'bg-gradient-to-br from-pink-500 to-purple-600'
                          : video.platform === 'LinkedIn'
                          ? 'bg-blue-600'
                          : 'bg-zinc-600'
                      }`}
                      whileHover={{ scale: 1.1 }}
                    >
                      <svg className="h-6 w-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </motion.div>
                    <span className={`absolute top-3 right-3 rounded-full px-2 py-0.5 text-xs font-medium ${
                      video.platform === 'YouTube' 
                        ? 'bg-red-600 text-white'
                        : video.platform === 'Instagram'
                        ? 'bg-pink-600 text-white'
                        : video.platform === 'LinkedIn'
                        ? 'bg-blue-600 text-white'
                        : 'bg-zinc-600 text-white'
                    }`}>
                      {video.platform}
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-zinc-500 mb-2">{formatDate(video.date)}</p>
                    <h3 className="font-semibold text-zinc-900 dark:text-white line-clamp-2">{video.title}</h3>
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">{video.description}</p>
                    <div className="mt-3 flex items-center justify-between">
                      {video.views && (
                        <span className="text-xs text-zinc-500">👁 {video.views.toLocaleString()} views</span>
                      )}
                      {video.link && (
                        <a
                          href={video.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                        >
                          Watch
                          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.section>
      </div>
    </div>
  );
}
