export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/auth/register",
    LOGIN: "/api/auth/login",
    GET_PROFILE: "/api/auth/profile",
    UPDATE_PROFILE: "/api/auth/profile",
    CHANGE_PASSWORD: "/api/auth/change-password",
    REFRESH_TOKEN: "/api/auth/refresh-token",
    LOGOUT: "/api/auth/logout",
  },

  DOCUMENTS: {
    UPLOAD: "/api/documents/upload",
    GET_DOCUMENTS: "/api/documents",
    GET_DOCUMENT_BY_ID: (id: string) => `/api/documents/${id}`,
    UPDATE_DOCUMENT: (id: string) => `/api/documents/${id}`,
    DELETE_DOCUMENT: (id: string) => `/api/documents/${id}`,
  },

  AI: {
    GENERATE_FLASHCARDS: "/api/ai/generate-flashcards",
    GENERATE_QUIZ: "/api/ai/generate-quiz",
    GENERATE_SUMMARY: "/api/ai/generate-summary",
    CHAT: "/api/ai/chat",
    EXPLAIN_CONCEPT: "/api/ai/explain-concept",
    GET_CHAT_HISTORY: (documentID: string) =>
      `/api/ai/chat-history/${documentID}`,
  },

  FLASHCARDS: {
    GET_ALL_FLASHCARD_SETS: "/api/flashcards",
    GET_FLASHCARDS_FOR_DOC: (documentID: string) =>
      `/api/flashcards/${documentID}`,
    GET_FLASHCARD_SET: (setId: string) => `/api/flashcards/set/${setId}`,
    REVIEW_FLASHCARD: (cardId: string) => `/api/flashcards/${cardId}/review`,
    TOGGLE_FLASHCARD: (cardId: string) => `/api/flashcards/${cardId}/star`,
    DELETE_FLASHCARD_SET: (id: string) => `/api/flashcards/${id}`,
  },

  QUIZZES: {
    GET_QUIZZES_FOR_DOC: (documentID: string) => `/api/quizzes/${documentID}`,
    GET_QUIZZES_BY_ID: (id: string) => `/api/quizzes/quiz/${id}`,
    SUBMIT_QUIZ: (id: string) => `/api/quizzes/${id}/submit`,
    GET_QUIZ_RESULTS: (id: string) => `/api/quizzes/${id}/results`,
    DELETE_QUIZ: (id: string) => `/api/quizzes/${id}`,
  },
  PROGRESS: {
    GET_DASHBOARD: "/api/progress/dashboard",
  },
};
