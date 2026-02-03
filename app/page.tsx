'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useStore } from './store/useStore';
import { getStreakCount, formatDate, getDifficultyColor, getLast7Days, getYearlyStats } from './lib/utils';
import { socialLinks } from './config/social';
import Antigravity from '../components/bits/Antigravity';
import ClickSpark from '../components/bits/ClickSpark';
import FuzzyText from '../components/bits/FuzzyText';
import { ExternalLink, Github, Folder, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 }
};

export default function Home() {
  const { dsaEntries, instagramPosts, videos, linkedInPosts, projects, fetchData, isLoading } = useStore();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const dsaDates = dsaEntries.map((e) => e.date);
  const dsaStreak = getStreakCount(dsaDates);
  const dsaYearlyStats = getYearlyStats(dsaDates);

  const instagramDates = instagramPosts.map((p) => p.date);
  const instagramYearlyStats = getYearlyStats(instagramDates);

  const totalProblems = dsaEntries.length;
  const totalViews = instagramPosts.reduce((acc, p) => acc + (p.views || 0), 0);
  const totalLikes = instagramPosts.reduce((acc, p) => acc + (p.likes || 0), 0);

  const recentDSA = [...dsaEntries]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const recentInstagram = [...instagramPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const featuredProjects = projects.filter(p => p.featured).slice(0, 3);
  const displayProjects = featuredProjects.length > 0 ? featuredProjects : projects.slice(0, 3);

  const last7Days = getLast7Days();
  const dsaDateSet = new Set(dsaDates);

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 via-white to-zinc-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[500px] sm:min-h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <ClickSpark sparkColor="#8b5cf6" sparkCount={12} sparkRadius={20} duration={600} />
        </div>
        <Antigravity count={150} magnetRadius={15} ringRadius={15} color="#8b5cf6" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute left-1/2 top-0 -z-10 h-[400px] w-[400px] sm:h-[600px] sm:w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-br from-violet-500/20 via-transparent to-transparent blur-3xl" />

        <motion.div
          className="mx-auto max-w-6xl px-4 sm:px-6 pb-16 sm:pb-20 pt-12 sm:pt-16 relative z-10"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div className="flex flex-col items-center text-center" variants={fadeInUp}>
            {/* Status Badge */}
            <motion.div
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 dark:border-emerald-800 dark:bg-emerald-950/50"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                Building in Public
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className="max-w-4xl text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl md:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Hi, I&apos;m{' '}
              <div className="inline-block text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                <div
                  className="cursor-pointer"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <FuzzyText
                    fontSize="clamp(2rem, 5vw, 4.5rem)"
                    fontWeight={900}
                    color="#7c3aed"
                    enableHover={true}
                    baseIntensity={0.02}
                    hoverIntensity={0.2}
                  >
                    {isHovered ? "KUMAR" : "RONAK"}
                  </FuzzyText>
                </div>
              </div>
            </motion.h1>

            <motion.p
              className="mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg text-zinc-600 dark:text-zinc-400 md:text-xl px-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Software Engineer passionate about Data Structures, Algorithms, and building impactful products.
              Documenting my journey through consistent practice and content creation.
            </motion.p>

            <motion.div
              className="mt-4 flex items-center gap-2 text-sm text-zinc-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Lovely Professional University, Punjab
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="mt-10 flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/dsa"
                  className="group inline-flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-zinc-900/25 transition-all hover:bg-zinc-800 hover:shadow-xl dark:bg-white dark:text-zinc-900 dark:shadow-white/25 dark:hover:bg-zinc-100"
                >
                  View DSA Journey
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-900 transition-all hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:hover:border-zinc-600"
                >
                  About Me
                </Link>
              </motion.div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="mt-8 flex items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {[
                { href: socialLinks.linkedin.url, icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
                { href: socialLinks.instagram.url, icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
                { href: socialLinks.github.url, icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" },
                { href: socialLinks.youtube.url, icon: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-zinc-100 p-2.5 text-zinc-600 transition-colors hover:bg-zinc-200 hover:text-zinc-900 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Projects Section */}
      {displayProjects.length > 0 && (
        <motion.section
          className="border-y border-zinc-200 bg-gradient-to-b from-zinc-50 to-white py-12 sm:py-20 dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-950"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <motion.div
              className="mb-8 sm:mb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative z-10 flex flex-col items-center justify-center px-4">
                <div className="relative mb-4 sm:mb-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 blur-[80px] sm:blur-[100px] opacity-20 dark:opacity-40" />
                  <div className="relative px-4 py-1 sm:px-6 sm:py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md dark:bg-black/10">
                    <span className="text-xs sm:text-sm font-medium text-zinc-800 dark:text-zinc-200">
                      ✨ Engineering Digital Experiences
                    </span>
                  </div>
                </div>

                <div className="mb-4 sm:mb-8 scale-75 sm:scale-100 transform-gpu">
                  <FuzzyText
                    fontSize={120} // Scaled down via CSS transform on mobile
                  >
                    RONAK
                  </FuzzyText>
                </div>

                <h2 className="max-w-2xl text-center text-lg sm:text-2xl font-light text-zinc-600 dark:text-zinc-400 px-4">
                  Building scalable applications with <span className="font-semibold text-zinc-900 dark:text-white">Modern Tech</span> and <span className="font-semibold text-zinc-900 dark:text-white">Clean Design</span>
                </h2>
              </div>
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-5 py-2.5 text-sm font-medium text-zinc-700 transition-all hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-600 self-start sm:self-auto"
              >
                View All
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

            <motion.div
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {displayProjects.map((project) => (
                <div
                  key={project.id}
                  className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-all duration-300 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
                >
                  {/* Project Image/Placeholder */}
                  {project.imageUrl ? (
                    <div className="relative h-44 w-full overflow-hidden bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="relative h-44 w-full overflow-hidden bg-gradient-to-br from-violet-500/10 via-purple-500/10 to-pink-500/10 dark:from-violet-500/20 dark:via-purple-500/20 dark:to-pink-500/20">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/80 text-2xl font-bold text-violet-600 shadow-lg backdrop-blur-sm dark:bg-zinc-800/80 dark:text-violet-400">
                          {project.title.charAt(0).toUpperCase()}
                        </div>
                      </div>
                      <div className="absolute -left-4 -top-4 h-20 w-20 rounded-full bg-violet-400/20 blur-2xl" />
                      <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-purple-400/20 blur-2xl" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-5">
                    {/* Category Badge */}
                    <div className="mb-3 flex items-center gap-2">
                      <span className="rounded-full bg-violet-100 px-2.5 py-1 text-xs font-medium text-violet-700 dark:bg-violet-900/30 dark:text-violet-400">
                        {project.category}
                      </span>
                      {project.featured && (
                        <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                          ⭐ Featured
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="mb-2 text-lg font-bold text-zinc-900 dark:text-white">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="mb-4 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="mb-4 flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 4).map((tech, index) => (
                        <span
                          key={index}
                          className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="text-xs text-zinc-500">+{project.technologies.length - 4}</span>
                      )}
                    </div>

                    {/* Links */}
                    <div className="flex gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-700 transition-all hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                        >
                          <Github className="h-3.5 w-3.5" />
                          Code
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-medium text-white transition-all hover:bg-violet-700"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Mobile View All Button */}
            <motion.div
              className="mt-8 flex justify-center sm:hidden"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
              >
                View All Projects
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* Stats Section */}
      <motion.section
        className="border-y border-zinc-200 bg-white py-10 sm:py-16 dark:border-zinc-800 dark:bg-zinc-900/50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-5">
            <div className="text-center">
              <div className="inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/25">
                <Folder className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <p className="mt-3 sm:mt-4 text-2xl sm:text-4xl font-bold text-zinc-900 dark:text-white">{projects.length}</p>
              <p className="mt-1 text-xs sm:text-sm text-zinc-500">Projects Built</p>
            </div>
            <div className="text-center">
              <div className="inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25">
                <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <p className="mt-3 sm:mt-4 text-2xl sm:text-4xl font-bold text-zinc-900 dark:text-white">{totalProblems}</p>
              <p className="mt-1 text-xs sm:text-sm text-zinc-500">Problems Solved</p>
              <p className="mt-2 text-[10px] sm:text-xs font-medium text-emerald-600 dark:text-emerald-400">
                {dsaYearlyStats.count} in {dsaYearlyStats.currentYear}
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/25">
                <span className="text-lg sm:text-xl">🔥</span>
              </div>
              <p className="mt-3 sm:mt-4 text-2xl sm:text-4xl font-bold text-zinc-900 dark:text-white">{dsaStreak}</p>
              <p className="mt-1 text-xs sm:text-sm text-zinc-500">Day Streak</p>
              <p className="mt-2 text-[10px] sm:text-xs font-medium text-orange-600 dark:text-orange-400">
                Current streak active
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-lg shadow-pink-500/25">
                <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
              <p className="mt-3 sm:mt-4 text-2xl sm:text-4xl font-bold text-zinc-900 dark:text-white">{(totalViews / 1000).toFixed(1)}K</p>
              <p className="mt-1 text-xs sm:text-sm text-zinc-500">Instagram Views</p>
              <p className="mt-2 text-[10px] sm:text-xs font-medium text-pink-600 dark:text-pink-400">
                {instagramYearlyStats.count} posts in {instagramYearlyStats.currentYear}
              </p>
            </div>
            <div className="text-center col-span-2 sm:col-span-1">
              <div className="inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 text-white shadow-lg shadow-blue-500/25">
                <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
              <p className="mt-3 sm:mt-4 text-2xl sm:text-4xl font-bold text-zinc-900 dark:text-white">{linkedInPosts.length}</p>
              <p className="mt-1 text-xs sm:text-sm text-zinc-500">LinkedIn Posts</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Activity Tracker */}
      <motion.section
        className="py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div
            className="mb-8 sm:mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-4xl">
              Consistency is Key
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-zinc-600 dark:text-zinc-400">
              Tracking my daily progress and building habits
            </p>
          </motion.div>

          <motion.div
            className="rounded-2xl sm:rounded-3xl border border-zinc-200 bg-white p-4 sm:p-8 shadow-xl shadow-zinc-900/5 dark:border-zinc-800 dark:bg-zinc-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="font-semibold text-sm sm:text-base text-zinc-900 dark:text-white">Last 7 Days DSA Activity</h3>
              <motion.span
                className="rounded-full bg-emerald-100 px-3 py-1 text-xs sm:text-sm font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 self-start sm:self-auto"
                whileHover={{ scale: 1.05 }}
              >
                🔥 {dsaStreak} day streak
              </motion.span>
            </div>
            <div className="flex justify-between gap-1 sm:gap-2">
              {last7Days.map((day) => {
                const hasEntry = dsaDateSet.has(day);
                const dayLabel = new Date(day).toLocaleDateString('en-US', { weekday: 'short' });
                const dateLabel = new Date(day).getDate();
                return (
                  <div key={day} className="flex flex-1 flex-col items-center gap-1 sm:gap-2">
                    <div
                      className={`flex h-10 sm:h-14 w-full max-w-[40px] sm:max-w-[60px] items-center justify-center rounded-lg sm:rounded-xl text-sm sm:text-lg font-bold transition-all ${hasEntry
                        ? 'bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-lg shadow-emerald-500/25'
                        : 'bg-zinc-100 text-zinc-400 dark:bg-zinc-800'
                        }`}
                    >
                      {hasEntry ? '✓' : dateLabel}
                    </div>
                    <span className="text-[10px] sm:text-xs font-medium text-zinc-500">{dayLabel}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Recent Activity Grid */}
      <motion.section
        className="pb-12 sm:pb-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div
            className="grid gap-6 sm:gap-8 lg:grid-cols-2"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Recent DSA Problems */}
            <motion.div
              className="rounded-2xl sm:rounded-3xl border border-zinc-200 bg-white p-4 sm:p-8 shadow-xl shadow-zinc-900/5 dark:border-zinc-800 dark:bg-zinc-900"
              variants={fadeInUp}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="mb-4 sm:mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400">
                    <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-white">Recent Problems</h3>
                </div>
                <Link href="/dsa" className="text-xs sm:text-sm font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400">
                  View all →
                </Link>
              </div>

              {recentDSA.length === 0 ? (
                <p className="text-center text-sm text-zinc-500">No problems solved yet</p>
              ) : (
                <div className="space-y-2 sm:space-y-3">
                  {recentDSA.map((entry) => (
                    <motion.div
                      key={entry.id}
                      className="flex items-center justify-between rounded-lg sm:rounded-xl bg-zinc-50 p-3 sm:p-4 dark:bg-zinc-800/50"
                      whileHover={{ x: 4 }}
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm sm:text-base font-medium text-zinc-900 dark:text-white">{entry.problemName}</p>
                        <p className="mt-0.5 text-xs sm:text-sm text-zinc-500">{entry.platform} • {entry.topic}</p>
                      </div>
                      <span className={`ml-2 sm:ml-4 shrink-0 rounded-full px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs font-semibold ${entry.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                        entry.difficulty === 'Medium' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                          'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        }`}>
                        {entry.difficulty}
                      </span>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Recent Instagram */}
            <motion.div
              className="rounded-2xl sm:rounded-3xl border border-zinc-200 bg-white p-4 sm:p-8 shadow-xl shadow-zinc-900/5 dark:border-zinc-800 dark:bg-zinc-900"
              variants={fadeInUp}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="mb-4 sm:mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 text-white">
                    <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-white">Instagram Posts</h3>
                </div>
                <a href={socialLinks.instagram.url} target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm font-medium text-pink-600 hover:text-pink-700 dark:text-pink-400">
                  Follow →
                </a>
              </div>

              {recentInstagram.length === 0 ? (
                <p className="text-center text-sm text-zinc-500">No posts yet</p>
              ) : (
                <div className="space-y-2 sm:space-y-3">
                  {recentInstagram.map((post) => (
                    <motion.a
                      key={post.id}
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-lg sm:rounded-xl bg-zinc-50 p-3 sm:p-4 transition-colors hover:bg-zinc-100 dark:bg-zinc-800/50 dark:hover:bg-zinc-800"
                      whileHover={{ x: 4 }}
                    >
                      <div className="flex items-start justify-between gap-2 sm:gap-4">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="rounded-full bg-gradient-to-r from-pink-500 to-rose-500 px-2 py-0.5 text-[10px] sm:text-xs font-medium text-white">
                              {post.type}
                            </span>
                            <span className="text-[10px] sm:text-xs text-zinc-500">{formatDate(post.date)}</span>
                          </div>
                          <p className="mt-1.5 sm:mt-2 line-clamp-2 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">{post.caption}</p>
                        </div>
                        <div className="text-right text-[10px] sm:text-xs text-zinc-500">
                          {post.views && <p>{(post.views / 1000).toFixed(1)}K views</p>}
                          {post.likes && <p>{post.likes.toLocaleString()} likes</p>}
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        className="border-t border-zinc-200 bg-white py-8 sm:py-12 dark:border-zinc-800 dark:bg-zinc-900/50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:gap-6 text-center sm:text-left sm:flex-row">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-700 dark:from-white dark:to-zinc-200">
                <span className="text-base sm:text-lg font-bold text-white dark:text-zinc-900">S</span>
              </div>
              <div>
                <p className="font-semibold text-zinc-900 dark:text-white">SELF</p>
                <p className="text-[10px] sm:text-xs text-zinc-500">Growth Dashboard</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-zinc-500 order-last sm:order-none">
              Built with consistency and discipline • © {new Date().getFullYear()}
            </p>
            <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
              <Link href="/projects" className="text-xs sm:text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white">Projects</Link>
              <Link href="/about" className="text-xs sm:text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white">About</Link>
              <Link href="/dsa" className="text-xs sm:text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white">DSA</Link>
              <Link href="/linkedin" className="text-xs sm:text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white">LinkedIn</Link>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
