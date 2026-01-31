export interface DSAEntry {
  id: string;
  date: string;
  problemName: string;
  platform: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
  notes: string;
  link?: string;
}

export interface InstagramPost {
  id: string;
  date: string;
  caption: string;
  type: 'Reel' | 'Post' | 'Story' | 'Carousel';
  topic: string;
  link?: string;
  likes?: number;
  views?: number;
}

export interface VideoEntry {
  id: string;
  date: string;
  title: string;
  platform: 'YouTube' | 'Instagram' | 'LinkedIn' | 'Other';
  link?: string;
  description: string;
  views?: number;
}

export interface LinkedInPost {
  id: string;
  date: string;
  summary: string;
  link: string;
  topic: string;
  engagement?: string;
}

export interface LearningNote {
  id: string;
  date: string;
  title: string;
  content: string;
  tags: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  category: 'Web App' | 'Mobile App' | 'API' | 'CLI Tool' | 'Library' | 'AI/ML' | 'DevOps' | 'Other';
  status: 'In Progress' | 'Completed' | 'Maintained' | 'Archived';
  technologies: string[];
  features?: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  startDate: string;
  endDate?: string;
  featured?: boolean;
  order?: number;
}

export interface AppState {
  dsaEntries: DSAEntry[];
  instagramPosts: InstagramPost[];
  videos: VideoEntry[];
  linkedInPosts: LinkedInPost[];
  learningNotes: LearningNote[];
  projects: Project[];
  addDSAEntry: (entry: Omit<DSAEntry, 'id'>) => void;
  updateDSAEntry: (id: string, entry: Partial<DSAEntry>) => void;
  deleteDSAEntry: (id: string) => void;
  addInstagramPost: (post: Omit<InstagramPost, 'id'>) => void;
  updateInstagramPost: (id: string, post: Partial<InstagramPost>) => void;
  deleteInstagramPost: (id: string) => void;
  addVideo: (video: Omit<VideoEntry, 'id'>) => void;
  updateVideo: (id: string, video: Partial<VideoEntry>) => void;
  deleteVideo: (id: string) => void;
  addLinkedInPost: (post: Omit<LinkedInPost, 'id'>) => void;
  updateLinkedInPost: (id: string, post: Partial<LinkedInPost>) => void;
  deleteLinkedInPost: (id: string) => void;
  addLearningNote: (note: Omit<LearningNote, 'id'>) => void;
  updateLearningNote: (id: string, note: Partial<LearningNote>) => void;
  deleteLearningNote: (id: string) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  resetToMockData: () => void;
  clearAllData: () => void;
}
