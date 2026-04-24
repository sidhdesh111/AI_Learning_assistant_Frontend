import type { AxiosError } from "axios";
import type { ApiError } from "../types/CommonTypes";
import axios from "axios";
import type {
  DeleteDocumentResponse,
  GetDocumentByIdResponse,
  GetDocumentsResponse,
  UploadDocumentResponse,
} from "../types/DocumentType";
import axiosInstance from "../Utils/axiosInstance";
import { API_PATHS } from "../Utils/ApiPaths";

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

export const getDocuments = async (): Promise<GetDocumentsResponse> => {
  return handleRequest(
    axiosInstance.get<GetDocumentsResponse>(API_PATHS.DOCUMENTS.GET_DOCUMENTS),
  );
};

export const getDocumentById = async (
  documentId: string,
): Promise<GetDocumentByIdResponse> => {
  return handleRequest(
    axiosInstance.get<GetDocumentByIdResponse>(
      API_PATHS.DOCUMENTS.GET_DOCUMENT_BY_ID(documentId),
    ),
  );
};

export const uploadDocument = async (
  formData: FormData,
): Promise<UploadDocumentResponse> => {
  return handleRequest(
    axiosInstance.post<UploadDocumentResponse>(
      API_PATHS.DOCUMENTS.UPLOAD,
      formData,
    ),
  );
};

export const deleteDocument = async (
  documentId: string,
): Promise<DeleteDocumentResponse> => {
  return handleRequest(
    axiosInstance.delete<DeleteDocumentResponse>(
      API_PATHS.DOCUMENTS.DELETE_DOCUMENT(documentId),
    ),
  );
};
