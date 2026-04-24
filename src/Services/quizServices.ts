import type { AxiosError } from "axios";
import type { ApiError } from "../types/CommonTypes";
import axios from "axios";
import { API_PATHS } from "../Utils/ApiPaths";
import type {
  DeleteQuizResponse,
  GetQuizByIdResponse,
  GetQuizResultsResponse,
  GetQuizzesResponse,
  SubmitQuizResponse,
} from "../types/QuizTypes";
import axiosInstance from "../Utils/axiosInstance";

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

export const getQuizzesByDocId = async (documentId: string): Promise<GetQuizzesResponse> => {
  return handleRequest(
    axiosInstance.get<GetQuizzesResponse>(
      API_PATHS.QUIZZES.GET_QUIZZES_FOR_DOC(documentId),
    ),
  );
};

export const getQuizById = async (quizId: string): Promise<GetQuizByIdResponse> => {
  return handleRequest(
    axiosInstance.get<GetQuizByIdResponse>(
      API_PATHS.QUIZZES.GET_QUIZZES_BY_ID(quizId),
    ),
  );
};

export const submitQuiz = async (
  quizId: string,
  answers: any[],
): Promise<SubmitQuizResponse> => {
  return handleRequest(
    axiosInstance.post<SubmitQuizResponse>(
      API_PATHS.QUIZZES.SUBMIT_QUIZ(quizId),
      { answers },
    ),
  );
};

export const getQuizResults = async (
  quizId: string,
): Promise<GetQuizResultsResponse> => {
  return handleRequest(
    axiosInstance.get<GetQuizResultsResponse>(
      API_PATHS.QUIZZES.GET_QUIZ_RESULTS(quizId),
    ),
  );
};

export const deleteQuiz = async (quizId: string): Promise<DeleteQuizResponse> => {
  return handleRequest(
    axiosInstance.delete<DeleteQuizResponse>(
      API_PATHS.QUIZZES.DELETE_QUIZ(quizId),
    ),
  );
};
