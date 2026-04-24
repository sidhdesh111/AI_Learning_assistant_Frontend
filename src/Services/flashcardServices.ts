import axios, { AxiosError } from "axios";
import type { ApiError } from "../types/CommonTypes";
import axiosInstance from "../Utils/axiosInstance";
import { API_PATHS } from "../Utils/ApiPaths";
import type {
  GetAllFlashcardSetsResponse,
  GetFlashcardsResponse,
  ReviewFlashcardResponse,
  DeleteFlashcardSetResponse,
  ToggleFlashcardStarResponse,
} from "../types/FlashcardType";

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

export const getALLFlashcards =
  async (): Promise<GetAllFlashcardSetsResponse> => {
    return handleRequest(
      axiosInstance.get<GetAllFlashcardSetsResponse>(
        API_PATHS.FLASHCARDS.GET_ALL_FLASHCARD_SETS,
      ),
    );
  };

export const getFlashcardsForDocument = async (
  documentId: string,
): Promise<GetFlashcardsResponse> => {
  return handleRequest(
    axiosInstance.get<GetFlashcardsResponse>(
      API_PATHS.FLASHCARDS.GET_FLASHCARDS_FOR_DOC(documentId),
    ),
  );
};

export const reviewFlashcard = async (
  cardId: string,
  isCorrect: boolean,
): Promise<ReviewFlashcardResponse> => {
  return handleRequest(
    axiosInstance.post<ReviewFlashcardResponse>(
      API_PATHS.FLASHCARDS.REVIEW_FLASHCARD(cardId),
      {
        isCorrect,
      },
    ),
  );
};

export const toggleFlashcardStar = async (
  cardId: string,
): Promise<ToggleFlashcardStarResponse> => {
  return handleRequest(
    axiosInstance.post<ToggleFlashcardStarResponse>(
      API_PATHS.FLASHCARDS.TOGGLE_FLASHCARD(cardId),
    ),
  );
};

export const getFlashcardSetById = async (
  setId: string,
): Promise<GetFlashcardsResponse> => {
  return handleRequest(
    axiosInstance.get<GetFlashcardsResponse>(
      API_PATHS.FLASHCARDS.GET_FLASHCARD_SET(setId),
    ),
  );
};

export const deleteFlashcardSet = async (
  id: string,
): Promise<DeleteFlashcardSetResponse> => {
  return handleRequest(
    axiosInstance.delete<DeleteFlashcardSetResponse>(
      API_PATHS.FLASHCARDS.DELETE_FLASHCARD_SET(id),
    ),
  );
};
