export type isAuthenticatedtype = boolean;
export type isloadingtype = boolean;

export interface LoginType {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  accessToken: string;
  refreshToken: string;
  user?: {
    id: string;
    username: string;
    email: string;
    name: string;
    profilePicture?: string;
  };
  statusCode: number;
}

export interface RegisterationType {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  statusCode: number;
}

export interface GetProfile {
  username: string;
  name: string;
  email: string;
  profilePicture?: string;
}

export interface ChangePassword {
  currentPassword: string;
  newPassword: string;
}

export type ApiError = {
  message?: string;
  [key: string]: any;
};

export type SuccessResonse = {
  success: boolean;
  message: string;
  statusCode: number;
};

export type ChildrenProps = {
  children: React.ReactNode;
};
