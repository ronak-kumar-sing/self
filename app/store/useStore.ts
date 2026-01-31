import { create } from 'zustand';
import { DSAEntry, InstagramPost, VideoEntry, LinkedInPost, Project } from '../types';

interface StoreState {
  dsaEntries: DSAEntry[];
  instagramPosts: InstagramPost[];
  videos: VideoEntry[];
  linkedInPosts: LinkedInPost[];
  projects: Project[];
  isLoading: boolean;
  error: string | null;

  fetchData: () => Promise<void>;

  addDSAEntry: (entry: Omit<DSAEntry, 'id'>) => Promise<void>;
  updateDSAEntry: (id: string, entry: Omit<DSAEntry, 'id'>) => Promise<void>;
  deleteDSAEntry: (id: string) => Promise<void>;

  addInstagramPost: (post: Omit<InstagramPost, 'id'>) => Promise<void>;
  updateInstagramPost: (id: string, post: Omit<InstagramPost, 'id'>) => Promise<void>;
  deleteInstagramPost: (id: string) => Promise<void>;

  addVideo: (video: Omit<VideoEntry, 'id'>) => Promise<void>;
  updateVideo: (id: string, video: Omit<VideoEntry, 'id'>) => Promise<void>;
  deleteVideo: (id: string) => Promise<void>;

  addLinkedInPost: (post: Omit<LinkedInPost, 'id'>) => Promise<void>;
  updateLinkedInPost: (id: string, post: Omit<LinkedInPost, 'id'>) => Promise<void>;
  deleteLinkedInPost: (id: string) => Promise<void>;

  addProject: (project: Omit<Project, 'id'>) => Promise<void>;
  updateProject: (id: string, project: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;

  resetToMockData: () => void; // Deprecated but kept for compatibility
  clearAllData: () => void;
}

export const useStore = create<StoreState>((set, get) => ({
  dsaEntries: [],
  instagramPosts: [],
  videos: [],
  linkedInPosts: [],
  projects: [],
  isLoading: false,
  error: null,

  fetchData: async () => {
    set({ isLoading: true, error: null });
    try {
      const [dsaRes, instagramRes, videosRes, linkedinRes, projectsRes] = await Promise.all([
        fetch('/api/dsa'),
        fetch('/api/instagram'),
        fetch('/api/videos'),
        fetch('/api/linkedin'),
        fetch('/api/projects'),
      ]);

      const [dsaEntries, instagramPosts, videos, linkedInPosts, projects] = await Promise.all([
        dsaRes.json(),
        instagramRes.json(),
        videosRes.json(),
        linkedinRes.json(),
        projectsRes.json(),
      ]);

      // Map _id to id for frontend compatibility
      const mapId = (items: any[]) => items.map(item => ({ ...item, id: item._id }));

      set({
        dsaEntries: mapId(dsaEntries),
        instagramPosts: mapId(instagramPosts),
        videos: mapId(videos),
        linkedInPosts: mapId(linkedInPosts),
        projects: mapId(projects),
        isLoading: false
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      set({ error: 'Failed to fetch data', isLoading: false });
    }
  },

  addDSAEntry: async (entry) => {
    try {
      const res = await fetch('/api/dsa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry),
      });
      const data = await res.json();
      set((state) => ({ dsaEntries: [{ ...data, id: data._id }, ...state.dsaEntries] }));
    } catch (error) {
      console.error('Error adding DSA entry:', error);
    }
  },

  updateDSAEntry: async (id, entry) => {
    try {
      const res = await fetch('/api/dsa', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...entry }),
      });
      const data = await res.json();
      set((state) => ({
        dsaEntries: state.dsaEntries.map((e) => (e.id === id ? { ...data, id: data._id } : e)),
      }));
    } catch (error) {
      console.error('Error updating DSA entry:', error);
    }
  },

  deleteDSAEntry: async (id) => {
    try {
      await fetch(`/api/dsa?id=${id}`, { method: 'DELETE' });
      set((state) => ({
        dsaEntries: state.dsaEntries.filter((e) => e.id !== id),
      }));
    } catch (error) {
      console.error('Error deleting DSA entry:', error);
    }
  },

  addInstagramPost: async (post) => {
    try {
      const res = await fetch('/api/instagram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
      });
      const data = await res.json();
      set((state) => ({ instagramPosts: [{ ...data, id: data._id }, ...state.instagramPosts] }));
    } catch (error) {
      console.error('Error adding Instagram post:', error);
    }
  },

  updateInstagramPost: async (id, post) => {
    try {
      const res = await fetch('/api/instagram', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...post }),
      });
      const data = await res.json();
      set((state) => ({
        instagramPosts: state.instagramPosts.map((p) => (p.id === id ? { ...data, id: data._id } : p)),
      }));
    } catch (error) {
      console.error('Error updating Instagram post:', error);
    }
  },

  deleteInstagramPost: async (id) => {
    try {
      await fetch(`/api/instagram?id=${id}`, { method: 'DELETE' });
      set((state) => ({
        instagramPosts: state.instagramPosts.filter((p) => p.id !== id),
      }));
    } catch (error) {
      console.error('Error deleting Instagram post:', error);
    }
  },

  addVideo: async (video) => {
    try {
      const res = await fetch('/api/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(video),
      });
      const data = await res.json();
      set((state) => ({ videos: [{ ...data, id: data._id }, ...state.videos] }));
    } catch (error) {
      console.error('Error adding video:', error);
    }
  },

  updateVideo: async (id, video) => {
    try {
      const res = await fetch('/api/videos', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...video }),
      });
      const data = await res.json();
      set((state) => ({
        videos: state.videos.map((v) => (v.id === id ? { ...data, id: data._id } : v)),
      }));
    } catch (error) {
      console.error('Error updating video:', error);
    }
  },

  deleteVideo: async (id) => {
    try {
      await fetch(`/api/videos?id=${id}`, { method: 'DELETE' });
      set((state) => ({
        videos: state.videos.filter((v) => v.id !== id),
      }));
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  },

  addLinkedInPost: async (post) => {
    try {
      const res = await fetch('/api/linkedin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
      });
      const data = await res.json();
      set((state) => ({ linkedInPosts: [{ ...data, id: data._id }, ...state.linkedInPosts] }));
    } catch (error) {
      console.error('Error adding LinkedIn post:', error);
    }
  },

  updateLinkedInPost: async (id, post) => {
    try {
      const res = await fetch('/api/linkedin', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...post }),
      });
      const data = await res.json();
      set((state) => ({
        linkedInPosts: state.linkedInPosts.map((p) => (p.id === id ? { ...data, id: data._id } : p)),
      }));
    } catch (error) {
      console.error('Error updating LinkedIn post:', error);
    }
  },

  deleteLinkedInPost: async (id) => {
    try {
      await fetch(`/api/linkedin?id=${id}`, { method: 'DELETE' });
      set((state) => ({
        linkedInPosts: state.linkedInPosts.filter((p) => p.id !== id),
      }));
    } catch (error) {
      console.error('Error deleting LinkedIn post:', error);
    }
  },

  addProject: async (project) => {
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project),
      });
      const data = await res.json();
      set((state) => ({ projects: [{ ...data, id: data._id }, ...state.projects] }));
    } catch (error) {
      console.error('Error adding project:', error);
    }
  },

  updateProject: async (id, project) => {
    try {
      const res = await fetch('/api/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...project }),
      });
      const data = await res.json();
      set((state) => ({
        projects: state.projects.map((p) => (p.id === id ? { ...data, id: data._id } : p)),
      }));
    } catch (error) {
      console.error('Error updating project:', error);
    }
  },

  deleteProject: async (id) => {
    try {
      await fetch(`/api/projects?id=${id}`, { method: 'DELETE' });
      set((state) => ({
        projects: state.projects.filter((p) => p.id !== id),
      }));
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  },

  resetToMockData: () => { }, // No-op for now
  clearAllData: () => set({ dsaEntries: [], instagramPosts: [], videos: [], linkedInPosts: [], projects: [] }),
}));
