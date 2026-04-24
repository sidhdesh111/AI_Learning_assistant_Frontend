export interface Flashcard {
  _id: string;
  question: string;
  answer: string;
  difficulty?: "easy" | "medium" | "hard";
  lastReviewed?: Date;
  reviewCount: number;
  isStarred: boolean;
}

export interface DocumentRef {
  _id: string;
  title: string;
  fileName: string;
}

export interface FlashcardSet {
  _id: string;
  userId: string;
  documentId: string | DocumentRef;
  cards: Flashcard[];
  createdAt: string;
  updatedAt: string;
}

export type GetFlashcardsResponse = {
  success: true;
  data: FlashcardSet[];
};

export type GetAllFlashcardSetsResponse = {
  success: true;
  count: number;
  data: FlashcardSet[];
};

export type ReviewFlashcardResponse = {
  success: true;
  data: FlashcardSet;
  message: string;
};

export type ToggleFlashcardStarResponse = {
  success: true;
  data: FlashcardSet;
  message: string;
};

export type DeleteFlashcardSetResponse = {
  success: true;
  message: string;
};
