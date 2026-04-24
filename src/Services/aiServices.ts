import axios, { AxiosError } from "axios";
import axiosInstance from "../Utils/axiosInstance";
import { API_PATHS } from "../Utils/ApiPaths";

import type { ApiError } from "../types/CommonTypes";

import type {
  GenerateFlashcardsType,
  GenerateQuizType,
  GenerateSummaryType,
  ChatType,
  ExplainConceptType,
  GetChatHistoryType,
  GenerateFlashcardsResponse,
  GenerateQuizResponse,
  GenerateSummaryResponse,
  ChatResponse,
  ExplainConceptResponse,
  GetChatHistoryResponse,
} from "../types/AIServiesTypes";

// -------------------- Generic Handler --------------------

const handleRequest = async <T>(request: Promise<{ data: T }>): Promise<T> => {
  try {
    const response = await request;
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError<ApiError>;
      throw err.response?.data || { message: "Request failed" };
    }
    throw { message: "An unknown error occurred." };
  }
};

// -------------------- AI Services --------------------

export const generateFlashcards = async (
  documentId: GenerateFlashcardsType["documentId"],
  count: GenerateFlashcardsType["count"],
): Promise<GenerateFlashcardsResponse> => {
  return handleRequest(
    axiosInstance.post(API_PATHS.AI.GENERATE_FLASHCARDS, {
      documentId,
      count,
    }),
  );
};

export const generateQuiz = async (
  documentId: GenerateQuizType["documentId"],
  option: GenerateQuizType["numQuestions"],
): Promise<GenerateQuizResponse> => {
  return handleRequest(
    axiosInstance.post(API_PATHS.AI.GENERATE_QUIZ, {
      documentId,
      numQuestions: option,
    }),
  );
};

export const generateSummary = async (
  documentId: GenerateSummaryType["documentId"],
): Promise<GenerateSummaryResponse> => {
  return handleRequest(
    axiosInstance.post(API_PATHS.AI.GENERATE_SUMMARY, {
      documentId,
    }),
  );
};

export const chat = async (
  documentId: ChatType["documentId"],
  question: ChatType["message"],
): Promise<ChatResponse> => {
  return handleRequest(
    axiosInstance.post(API_PATHS.AI.CHAT, {
      documentId,
      question,
    }),
  );
};

export const explainConcept = async (
  documentId: ExplainConceptType["documentId"],
  concept: ExplainConceptType["concept"],
): Promise<ExplainConceptResponse> => {
  return handleRequest(
    axiosInstance.post(API_PATHS.AI.EXPLAIN_CONCEPT, {
      documentId,
      concept,
    }),
  );
};

export const getChatHistory = async (
  documentId: GetChatHistoryType["documentId"],
): Promise<GetChatHistoryResponse> => {
  return handleRequest(
    axiosInstance.get(API_PATHS.AI.GET_CHAT_HISTORY(documentId)),
  );
};
