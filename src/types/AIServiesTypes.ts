// -------------------- Common --------------------

export type Difficulty = "easy" | "medium" | "hard";

export type ApiResponse<T> = {
  success: boolean;
  data: T;
  message: string;
};

// -------------------- Request Types --------------------

export interface GenerateFlashcardsType {
  documentId: string;
  count: number;
}

export interface GenerateQuizType {
  documentId: string | undefined;
  numQuestions: number;
}

export interface GenerateSummaryType {
  documentId: string;
}

export interface ChatType {
  documentId: string;
  message: string;
}

export interface ExplainConceptType {
  documentId: string;
  concept: string;
}

export interface GetChatHistoryType {
  documentId: string;
}

// -------------------- Flashcards --------------------

export type Card = {
  question: string;
  answer: string;
  difficulty: Difficulty;
  reviewCount: number;
  isStarted: boolean;
};

export type GenerateFlashcardsResponse = ApiResponse<{
  userId: string;
  documentId: string;
  card: Card[];
}>;

// -------------------- Quiz --------------------

export type Question = {
  question: string;
  difficulty: Difficulty;
  options: string[];
  correctAnswer: string;
  explanation?: string | null;
};

export type Quiz = {
  userId: string;
  documentId: string;
  title: string;
  questions: Question[];
  userAnswers: string[];
  score: number;
  totalQuestions: number;
};

export type GenerateQuizResponse = ApiResponse<Quiz>;

// -------------------- Summary --------------------

export type Summary = {
  documentId: string;
  title: string;
  summary: string;
};

export type GenerateSummaryResponse = ApiResponse<Summary>;

// -------------------- Chat --------------------

export type Chat = {
  question: string;
  answer: string;
  relevantChunks: string[];
  chatHistoryId: string;
};

export type ChatResponse = ApiResponse<Chat>;

// -------------------- Explain --------------------

export type Explain = {
  concept: string;
  explanation: string;
  relevantChunks: string[];
};

export type ExplainConceptResponse = ApiResponse<Explain>;

// -------------------- Chat History --------------------

export type ChatHistory = {
  content: string;
  role: "user" | "assistant";
  timestamp: string;
};

export type GetChatHistoryResponse = ApiResponse<{
  documentId: string;
  chatHistory: ChatHistory[];
}>;