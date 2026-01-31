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

export default function InstagramPage() {
  const { instagramPosts, fetchData, isLoading } = useStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const postDates = instagramPosts.map((p) => p.date);
  const streak = getStreakCount(postDates);
  const yearlyStats = getYearlyStats(postDates);

  const sortedPosts = [...instagramPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const reelCount = instagramPosts.filter(p => p.type === 'Reel').length;
  const postCount = instagramPosts.filter(p => p.type === 'Post').length;
  const storyCount = instagramPosts.filter(p => p.type === 'Story').length;
  const carouselCount = instagramPosts.filter(p => p.type === 'Carousel').length;

  const topicCounts = instagramPosts.reduce((acc, post) => {
    acc[post.topic] = (acc[post.topic] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalViews = instagramPosts.reduce((sum, p) => sum + (p.views || 0), 0);
  const totalLikes = instagramPosts.reduce((sum, p) => sum + (p.likes || 0), 0);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-300 border-t-pink-600 dark:border-zinc-700 dark:border-t-pink-400"></div>
          <p className="text-sm text-zinc-500">Loading Instagram data...</p>
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
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-100 to-purple-100 px-3 py-1 text-sm font-medium text-pink-800 dark:from-pink-900/30 dark:to-purple-900/30 dark:text-pink-400"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            🔥 {streak} Day Streak • {yearlyStats.count} in {yearlyStats.currentYear}
          </motion.span>
          <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-pink-600 via-purple-600 to-orange-500 bg-clip-text text-transparent">
            Instagram Content
          </h1>
          <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
            Reels, posts, and stories sharing my journey
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
            <p className="text-sm font-medium text-zinc-500">Total Content</p>
            <motion.p 
              className="mt-2 text-4xl font-bold"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
            >
              {instagramPosts.length}
            </motion.p>
            <p className="mt-2 text-xs text-pink-600 dark:text-pink-400">
              📅 {yearlyStats.count} in {yearlyStats.currentYear}
            </p>
          </motion.div>
          <motion.div 
            className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
            variants={fadeInUp}
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <p className="text-sm font-medium text-pink-500">Reels</p>
            <motion.p 
              className="mt-2 text-4xl font-bold text-pink-500"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.3 }}
            >
              {reelCount}
            </motion.p>
          </motion.div>
          <motion.div 
            className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
            variants={fadeInUp}
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <p className="text-sm font-medium text-purple-500">Posts</p>
            <motion.p 
              className="mt-2 text-4xl font-bold text-purple-500"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.4 }}
            >
              {postCount}
            </motion.p>
          </motion.div>
          <motion.div 
            className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
            variants={fadeInUp}
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <p className="text-sm font-medium text-orange-500">Carousels</p>
            <motion.p 
              className="mt-2 text-4xl font-bold text-orange-500"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.5 }}
            >
              {carouselCount}
            </motion.p>
          </motion.div>
        </motion.section>

        {/* Engagement Stats */}
        {(totalViews > 0 || totalLikes > 0) && (
          <motion.section 
            className="mb-12 grid gap-4 sm:grid-cols-2"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="rounded-2xl border border-zinc-200 bg-gradient-to-br from-pink-50 to-purple-50 p-6 dark:border-zinc-800 dark:from-pink-900/10 dark:to-purple-900/10"
              variants={fadeInUp}
            >
              <p className="text-sm font-medium text-zinc-500">Total Views</p>
              <p className="mt-2 text-3xl font-bold text-pink-600">{totalViews.toLocaleString()}</p>
            </motion.div>
            <motion.div 
              className="rounded-2xl border border-zinc-200 bg-gradient-to-br from-purple-50 to-orange-50 p-6 dark:border-zinc-800 dark:from-purple-900/10 dark:to-orange-900/10"
              variants={fadeInUp}
            >
              <p className="text-sm font-medium text-zinc-500">Total Likes</p>
              <p className="mt-2 text-3xl font-bold text-purple-600">{totalLikes.toLocaleString()}</p>
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
                <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-sm bg-gradient-to-r from-pink-500 to-purple-500"></span>
                Posted
              </span>
            </div>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6 dark:border-zinc-800 dark:bg-zinc-900 overflow-x-auto">
            <div className="grid grid-cols-6 sm:grid-cols-12 gap-3 sm:gap-2 min-w-0">
              {Array.from({ length: 12 }, (_, monthIndex) => {
                const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                const daysInMonth = new Date(yearlyStats.currentYear, monthIndex + 1, 0).getDate();
                const monthDates = postDates.filter(d => {
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
                        const hasActivity = postDates.some(d => {
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
                                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 shadow-sm shadow-pink-500/50' 
                                  : 'bg-zinc-200 dark:bg-zinc-700'
                            } ${isToday ? 'ring-1 ring-violet-500' : ''}`}
                            whileHover={{ scale: 1.5 }}
                            title={`${monthNames[monthIndex]} ${dayIndex + 1}`}
                          />
                        );
                      })}
                    </div>
                    <p className="text-xs font-bold mt-2 text-pink-500">{activeDays}</p>
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
                <p className="text-xl sm:text-2xl font-bold text-pink-500">{yearlyStats.count}</p>
                <p className="text-[10px] sm:text-xs text-zinc-500">Posts in {yearlyStats.currentYear}</p>
              </div>
              <div className="hidden sm:block h-8 w-px bg-zinc-200 dark:bg-zinc-700"></div>
              <div className="text-center">
                <p className="text-xl sm:text-2xl font-bold text-orange-500">{streak}</p>
                <p className="text-[10px] sm:text-xs text-zinc-500">Day Streak</p>
              </div>
              <div className="hidden sm:block h-8 w-px bg-zinc-200 dark:bg-zinc-700"></div>
              <div className="text-center">
                <p className="text-xl sm:text-2xl font-bold text-purple-500">{postDates.length}</p>
                <p className="text-[10px] sm:text-xs text-zinc-500">Active Days</p>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Topics */}
        {Object.keys(topicCounts).length > 0 && (
          <motion.section 
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="mb-4 text-xl font-semibold">Content Topics</h2>
            <div className="flex flex-wrap gap-2">
              {Object.entries(topicCounts).map(([topic, count], index) => (
                <motion.span
                  key={topic}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-50 to-purple-50 px-4 py-2 text-sm font-medium text-pink-700 dark:from-pink-900/20 dark:to-purple-900/20 dark:text-pink-400"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {topic}
                  <span className="rounded-full bg-pink-100 px-2 py-0.5 text-xs dark:bg-pink-800">
                    {count}
                  </span>
                </motion.span>
              ))}
            </div>
          </motion.section>
        )}

        {/* Content Gallery */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="mb-6 text-xl font-semibold">All Content</h2>
          {sortedPosts.length === 0 ? (
            <motion.div 
              className="rounded-2xl border border-dashed border-zinc-300 p-12 text-center dark:border-zinc-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-zinc-500">No content yet. Check back soon!</p>
            </motion.div>
          ) : (
            <motion.div 
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {sortedPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
                  variants={fadeInUp}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="aspect-square bg-gradient-to-br from-pink-100 via-purple-100 to-orange-100 dark:from-pink-900/20 dark:via-purple-900/20 dark:to-orange-900/20 flex items-center justify-center">
                    <span className="text-6xl">
                      {post.type === 'Reel' ? '🎬' : post.type === 'Story' ? '📖' : post.type === 'Carousel' ? '🎠' : '📸'}
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        post.type === 'Reel' 
                          ? 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400'
                          : post.type === 'Story'
                          ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                          : post.type === 'Carousel'
                          ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                          : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                      }`}>
                        {post.type}
                      </span>
                      <span className="text-xs text-zinc-500">{formatDate(post.date)}</span>
                    </div>
                    <p className="text-sm text-zinc-700 dark:text-zinc-300 line-clamp-2">{post.caption}</p>
                    <div className="mt-3 flex items-center gap-4 text-xs text-zinc-500">
                      {post.views && <span>👁 {post.views.toLocaleString()}</span>}
                      {post.likes && <span>❤️ {post.likes.toLocaleString()}</span>}
                    </div>
                    {post.link && (
                      <a
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-pink-600 hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-300"
                      >
                        View on Instagram
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
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
