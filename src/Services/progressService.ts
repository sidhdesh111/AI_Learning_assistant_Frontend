import axios, { AxiosError } from "axios";
import type { ApiError } from "../types/CommonTypes";
import axiosInstance from "../Utils/axiosInstance";
import { API_PATHS } from "../Utils/ApiPaths";
import type { ProgressResponse } from "../types/ProgressTypes";

const handleRequest = async <T>(request: Promise<{ data: T }>): Promise<T> => {
  try {
    const response = await request;
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError<ApiError>;
      throw err.response?.data || { message: "Request Failed" };
    }
    throw { message: "An unknown error occurred." };
  }
};

export const getDashboardData = async (): Promise<ProgressResponse> => {
  return handleRequest(
    axiosInstance.get<ProgressResponse>(API_PATHS.PROGRESS.GET_DASHBOARD),
  );
};
