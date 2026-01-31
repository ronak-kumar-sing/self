'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import type { AppState, DSAEntry, Task, VideoEntry, LinkedInPost, LearningNote } from '../types';

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      dsaEntries: [],
      tasks: [],
      videos: [],
      linkedInPosts: [],
      learningNotes: [],

      addDSAEntry: (entry: Omit<DSAEntry, 'id'>) =>
        set((state) => ({
          dsaEntries: [...state.dsaEntries, { ...entry, id: uuidv4() }],
        })),
      updateDSAEntry: (id: string, entry: Partial<DSAEntry>) =>
        set((state) => ({
          dsaEntries: state.dsaEntries.map((e) =>
            e.id === id ? { ...e, ...entry } : e
          ),
        })),
      deleteDSAEntry: (id: string) =>
        set((state) => ({
          dsaEntries: state.dsaEntries.filter((e) => e.id !== id),
        })),

      addTask: (task: Omit<Task, 'id'>) =>
        set((state) => ({
          tasks: [...state.tasks, { ...task, id: uuidv4() }],
        })),
      updateTask: (id: string, task: Partial<Task>) =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...task } : t)),
        })),
      deleteTask: (id: string) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        })),

      addVideo: (video: Omit<VideoEntry, 'id'>) =>
        set((state) => ({
          videos: [...state.videos, { ...video, id: uuidv4() }],
        })),
      updateVideo: (id: string, video: Partial<VideoEntry>) =>
        set((state) => ({
          videos: state.videos.map((v) =>
            v.id === id ? { ...v, ...video } : v
          ),
        })),
      deleteVideo: (id: string) =>
        set((state) => ({
          videos: state.videos.filter((v) => v.id !== id),
        })),

      addLinkedInPost: (post: Omit<LinkedInPost, 'id'>) =>
        set((state) => ({
          linkedInPosts: [...state.linkedInPosts, { ...post, id: uuidv4() }],
        })),
      updateLinkedInPost: (id: string, post: Partial<LinkedInPost>) =>
        set((state) => ({
          linkedInPosts: state.linkedInPosts.map((p) =>
            p.id === id ? { ...p, ...post } : p
          ),
        })),
      deleteLinkedInPost: (id: string) =>
        set((state) => ({
          linkedInPosts: state.linkedInPosts.filter((p) => p.id !== id),
        })),

      addLearningNote: (note: Omit<LearningNote, 'id'>) =>
        set((state) => ({
          learningNotes: [...state.learningNotes, { ...note, id: uuidv4() }],
        })),
      updateLearningNote: (id: string, note: Partial<LearningNote>) =>
        set((state) => ({
          learningNotes: state.learningNotes.map((n) =>
            n.id === id ? { ...n, ...note } : n
          ),
        })),
      deleteLearningNote: (id: string) =>
        set((state) => ({
          learningNotes: state.learningNotes.filter((n) => n.id !== id),
        })),
    }),
    {
      name: 'self-storage',
    }
  )
);
