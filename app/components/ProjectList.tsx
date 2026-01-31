'use client';

import { useStore } from '../store/useStore';
import ProjectCard from './ProjectCard';
import { Folder, Code2, Rocket } from 'lucide-react';

export default function ProjectList() {
  const { projects, isLoading } = useStore();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-violet-600 border-t-transparent" />
          <span className="text-zinc-600 dark:text-zinc-400">Loading projects...</span>
        </div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-zinc-50/50 py-20 dark:border-zinc-700 dark:bg-zinc-900/50">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800">
          <Folder className="h-8 w-8 text-zinc-400" />
        </div>
        <h3 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-white">No projects yet</h3>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Projects will appear here once added.</p>
      </div>
    );
  }

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <div className="space-y-12">
      {/* Stats Summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-4 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 dark:bg-violet-900/30">
            <Folder className="h-6 w-6 text-violet-600 dark:text-violet-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-zinc-900 dark:text-white">{projects.length}</p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Total Projects</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-900/30">
            <Rocket className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-zinc-900 dark:text-white">
              {projects.filter(p => p.status === 'Completed' || p.status === 'Maintained').length}
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Shipped</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-900/30">
            <Code2 className="h-6 w-6 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-zinc-900 dark:text-white">
              {projects.filter(p => p.status === 'In Progress').length}
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">In Progress</p>
          </div>
        </div>
      </div>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section>
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-600">
              <Rocket className="h-4 w-4 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Featured Projects</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} featured />
            ))}
          </div>
        </section>
      )}

      {/* All Projects */}
      {otherProjects.length > 0 && (
        <section>
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-200 dark:bg-zinc-800">
              <Folder className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
            </div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">All Projects</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otherProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
