
export interface User {
  id: string;
  email: string;
  name: string;
  username: string;
  avatarUrl?: string;
  createdAt: Date;
  progress: UserProgress;
}

export interface UserProgress {
  completedCourses: string[];
  completedQuizzes: string[];
  loginStreak: number;
  lastLogin: Date;
  points: number;
  level: number;
  title: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  topics: CourseTopic[];
  category: string;
  estimatedTime: string;
}

export interface CourseTopic {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  resources?: Resource[];
  importantNotes?: Note[];
  studyMaterials?: string;
  practiceQuestions?: PracticeQuestion[];
}

export interface Note {
  title: string;
  content: string;
  type: 'info' | 'warning';
}

export interface PracticeQuestion {
  question: string;
  answer: string;
}

export interface Resource {
  title: string;
  url: string;
  type: 'article' | 'video' | 'tool';
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  courses: string[];
  quizzes: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
}

export interface Tool {
  id: string;
  title: string;
  description: string;
  type: 'password' | 'phishing' | 'encryption';
  component: string;
}
