import axiosInstance from "../Utils/axiosInstance";
import { API_PATHS } from "../Utils/ApiPaths";
import type {
  ApiError,
  ChangePassword,
  GetProfile,
  LoginResponse,
  LoginType,
  RegisterationType,
  RegisterResponse,
  SuccessResonse,
} from "../types/CommonTypes";
import axios, { AxiosError } from "axios";

type ProfileType = {
  success: boolean;
  user: GetProfile;
  statusCode: number;
};

export const loginAPI = async (
  email: LoginType["email"],
  password: LoginType["password"],
): Promise<LoginResponse> => {
  console.log(import.meta.env.VITE_BASE_URL);

  try {
    const response = await axiosInstance.post<LoginResponse>(
      API_PATHS.AUTH.LOGIN,
      {
        email,
        password,
      },
    );

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError<ApiError>;
      throw err.response?.data || { message: "Request failed" };
    }
    throw { message: "An unknown error occurred." };
  }
};

export const register = async (
  name: RegisterationType["name"],
  username: RegisterationType["username"],
  email: RegisterationType["email"],
  password: RegisterationType["password"],
): Promise<RegisterResponse> => {
  try {
    const response = await axiosInstance.post<RegisterResponse>(
      API_PATHS.AUTH.REGISTER,
      {
        name,
        username,
        email,
        password,
      },
    );

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError<ApiError>;
      throw err.response?.data || { message: "Request failed" };
    }
    throw { message: "An unknown error occurred." };
  }
};

export const getProfile = async (): Promise<ProfileType> => {
  try {
    const response = await axiosInstance.get<ProfileType>(
      API_PATHS.AUTH.GET_PROFILE,
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError<ApiError>;
      throw err.response?.data || { message: "Request failed" };
    }
    throw { message: "An unknown error occurred." };
  }
};

export const updatedProfile = async (
  userData: GetProfile,
): Promise<ProfileType> => {
  try {
    const response = await axiosInstance.put<ProfileType>(
      API_PATHS.AUTH.UPDATE_PROFILE,
      userData,
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError<ApiError>;
      throw err.response?.data || { message: "Request failed" };
    }
    throw { message: "An unknown error occurred." };
  }
};

export const changePassword = async (
  passwords: ChangePassword,
): Promise<SuccessResonse> => {
  try {
    const response = await axiosInstance.post<SuccessResonse>(
      API_PATHS.AUTH.CHANGE_PASSWORD,
      passwords,
    );

    return response?.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError<ApiError>;

      throw err.response?.data || { message: "Request Failed" };
    }

    throw { message: "An unknown error occurred." };
  }
};
