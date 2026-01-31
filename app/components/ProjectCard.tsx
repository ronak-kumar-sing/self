'use client';

import { Project } from '../types';
import { ExternalLink, Github, Calendar, Sparkles } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

const categoryColors: Record<string, string> = {
  'Web App': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  'Mobile App': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  'API': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  'CLI Tool': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  'Library': 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
  'AI/ML': 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
  'DevOps': 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400',
  'Other': 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400',
};

const statusColors: Record<string, string> = {
  'In Progress': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  'Completed': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  'Maintained': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  'Archived': 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-500',
};

export default function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className={`group relative overflow-hidden rounded-2xl border bg-white transition-all duration-300 hover:shadow-xl dark:bg-zinc-900 ${
      featured 
        ? 'border-violet-200 dark:border-violet-800 shadow-lg shadow-violet-500/10' 
        : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
    }`}>
      {/* Featured Badge */}
      {project.featured && (
        <div className="absolute top-4 right-4 z-10 flex items-center gap-1 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 px-3 py-1 text-xs font-medium text-white shadow-lg">
          <Sparkles className="h-3 w-3" />
          Featured
        </div>
      )}

      {/* Project Image */}
      {project.imageUrl ? (
        <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
      ) : (
        <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-violet-500/10 via-purple-500/10 to-pink-500/10 dark:from-violet-500/20 dark:via-purple-500/20 dark:to-pink-500/20">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/80 text-3xl font-bold text-violet-600 shadow-lg backdrop-blur-sm dark:bg-zinc-800/80 dark:text-violet-400">
              {project.title.charAt(0).toUpperCase()}
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute -left-4 -top-4 h-24 w-24 rounded-full bg-violet-400/20 blur-2xl" />
          <div className="absolute -bottom-4 -right-4 h-32 w-32 rounded-full bg-purple-400/20 blur-2xl" />
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Category & Status */}
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${categoryColors[project.category] || categoryColors['Other']}`}>
            {project.category}
          </span>
          <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusColors[project.status]}`}>
            {project.status}
          </span>
        </div>

        {/* Title */}
        <h3 className="mb-2 text-xl font-bold text-zinc-900 dark:text-white">
          {project.title}
        </h3>

        {/* Description */}
        <p className="mb-4 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="mb-4 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 5).map((tech, index) => (
            <span
              key={index}
              className="rounded-md bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 5 && (
            <span className="rounded-md bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
              +{project.technologies.length - 5} more
            </span>
          )}
        </div>

        {/* Date */}
        <div className="mb-4 flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-500">
          <Calendar className="h-3.5 w-3.5" />
          <span>
            {formatDate(project.startDate)}
            {project.endDate ? ` - ${formatDate(project.endDate)}` : ' - Present'}
          </span>
        </div>

        {/* Links */}
        <div className="flex gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm font-medium text-zinc-700 transition-all hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            >
              <Github className="h-4 w-4" />
              Code
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-violet-700"
            >
              <ExternalLink className="h-4 w-4" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
