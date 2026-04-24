export type status = "processing" | "ready" | "failed";

export interface ApiSuccess<T> {
  success: boolean;
  data: T;
  message?: string;
  count?: number;
}

export interface Document {
  _id: string;
  userId: string;
  title: string;
  fileName: string;
  filePath: string;
  cloudinaryUrl?: string | null;
  fileSize: number;
  status: status;
  uploadDate?: string;
  lastAccessed?: string;
  flashcardCount?: number;
  quizCount?: number;
}

export interface DocumentWithMeta extends Document {
  flashcardCount: number;
  quizCount: number;
}

export type GetDocumentsResponse = ApiSuccess<DocumentWithMeta[]> & {
  count: number;
};

export type GetDocumentByIdResponse = ApiSuccess<DocumentWithMeta>;

export type UploadDocumentResponse = ApiSuccess<Document> & {
  message: string;
};

export type DeleteDocumentResponse = {
  success: true;
  message: string;
};
