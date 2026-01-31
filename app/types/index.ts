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

export interface Task {
  id: string;
  date: string;
  title: string;
  completed: boolean;
  category: string;
}

export interface VideoEntry {
  id: string;
  date: string;
  title: string;
  platform: 'YouTube' | 'Instagram' | 'LinkedIn' | 'Other';
  link?: string;
  description: string;
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

export interface AppState {
  dsaEntries: DSAEntry[];
  tasks: Task[];
  videos: VideoEntry[];
  linkedInPosts: LinkedInPost[];
  learningNotes: LearningNote[];
  addDSAEntry: (entry: Omit<DSAEntry, 'id'>) => void;
  updateDSAEntry: (id: string, entry: Partial<DSAEntry>) => void;
  deleteDSAEntry: (id: string) => void;
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  addVideo: (video: Omit<VideoEntry, 'id'>) => void;
  updateVideo: (id: string, video: Partial<VideoEntry>) => void;
  deleteVideo: (id: string) => void;
  addLinkedInPost: (post: Omit<LinkedInPost, 'id'>) => void;
  updateLinkedInPost: (id: string, post: Partial<LinkedInPost>) => void;
  deleteLinkedInPost: (id: string) => void;
  addLearningNote: (note: Omit<LearningNote, 'id'>) => void;
  updateLearningNote: (id: string, note: Partial<LearningNote>) => void;
  deleteLearningNote: (id: string) => void;
}
