// -----------------------------
// Base Question Type
// -----------------------------
export type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: string;
  difficulty: "easy" | "medium" | "hard";
  explanation?: string | null;
};

// -----------------------------
// User Answer Type (stored in DB)
// -----------------------------
export type UserAnswer = {
  questionIndex: number;
  selectedAnswer: string;
  isCorrect: boolean;
  answeredAt: string; // ISO date string
};

// -----------------------------
// Quiz Core Type (DB structure)
// -----------------------------
export interface Quiz {
  _id: string;
  userId: string;
  documentId: string;
  title: string;
  questions: QuizQuestion[];
  userAnswers: UserAnswer[];
  score: number;
  totalQuestions: number;
  completedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

// -----------------------------
// Get All Quizzes Response
// -----------------------------
export interface GetQuizzesResponse {
  success: boolean;
  data: Quiz[];
  count: number;
}

// -----------------------------
// Get Quiz By ID Response
// -----------------------------
export interface GetQuizByIdResponse {
  success: boolean;
  data: Quiz;
  message?: string;
  count?: number;
}

// -----------------------------
// Submit Quiz Payload
// -----------------------------
export type SubmitQuizPayload = {
  answers: {
    questionIndex: number;
    selectedAnswer: string;
  }[];
};

// -----------------------------
// Submit Quiz Response
// -----------------------------
export interface SubmitQuizResponse {
  success: boolean;
  data: {
    score: number;
    correctCount: number;
    totalQuestions: number;
    quizId: string;
    percentage: number;
    userAnswers: UserAnswer[];
  };
  message: string;
}

// -----------------------------
// Quiz Results (Detailed)
// -----------------------------
export type DetailedResult = {
  questionIndex: number;
  question: string;
  options: string[];
  correctAnswer: string;
  selectedAnswer: string | null;
  isCorrect: boolean;
  explanation?: string | null;
};

export interface GetQuizResultsResponse {
  success: boolean;
  data: {
    quiz: {
      _id: string;
      title: string;
      documentId: string;
      score: number;
      totalQuestions: number;
      completedAt: string;
    };
    detailedResults: DetailedResult[];
  };
}

// -----------------------------
// Delete Quiz Response
// -----------------------------
export interface DeleteQuizResponse {
  success: boolean;
  message: string;
}

