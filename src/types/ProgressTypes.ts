import type { DocumentWithMeta } from "./DocumentType";
import type { Quiz } from "./QuizTypes";

type overviewData = {
  totalDocuments: number;
  totalFlashcardSets: number;
  totalFlashcards: number;
  TotalQuizzes: number;
  reviewedFlashcards: number;
  starredFlashcards: number;
  completedQuizzes: number;
  averageScore: number;
  studyStreak: number;
};

type recentActivityData = {
  documents: DocumentWithMeta[];
  quizzes: Quiz[];
};

export interface ProgressResponse {
  success: boolean;
  data: {
    overview: overviewData;
    recentActivity: recentActivityData;
  };
  message?: string;
}
