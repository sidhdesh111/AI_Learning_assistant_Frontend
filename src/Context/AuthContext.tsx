import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import toast from "react-hot-toast";
import axiosInstance from "../Utils/axiosInstance";
import { API_PATHS } from "../Utils/ApiPaths";

type User =
  | {
    id: string;
    name: string;
    email: string;
    username: string;
    profilePicture?: string | undefined;
  }
  | undefined;

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (userData: User, accessToken?: string, refreshToken?: string) => void;
  logout: () => Promise<void>;
  updateUser: (data: Partial<User>) => void;
  checkAuthStatus: () => Promise<void>;
  refreshTokenManually: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  /**
   * Check if user is still authenticated by validating tokens
   */
  const checkAuthStatus = async () => {
    try {
      const userStr = localStorage.getItem("user");

      if (userStr) {
        // Validate active session from backend (cookie or bearer token).
        await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
        const userData: User = JSON.parse(userStr);
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Auth check failed", error);
      await logout();
    } finally {
      setLoading(false);
    }
  };

  /**
   * Login with tokens
   * Stores both access and refresh tokens using token manager
   */
  const login = (userData: User, accessToken?: string, refreshToken?: string) => {
    try {
      // If backend returns bearer tokens, store them for fallback auth mode.
      if (accessToken && refreshToken) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
      }

      // Store user data
      localStorage.setItem("user", JSON.stringify(userData));

      setUser(userData);
      setIsAuthenticated(true);

      console.log("[Auth] User logged in successfully");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed");
    }
  };

  /**
   * Logout user and clear all tokens
   * Notifies backend to invalidate tokens
   */
  const logout = async () => {
    try {
      // Attempt to notify backend
      try {
        await axiosInstance.post(API_PATHS.AUTH.LOGOUT);
      } catch (error) {
        console.warn("Backend logout notification failed (non-critical):", error);
      }

      // Clear local tokens and user data
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("tokenExpiry");
      localStorage.removeItem("user");

      toast.success("Logged out successfully");
      setUser(null);
      setIsAuthenticated(false);

      console.log("[Auth] User logged out");
    } catch (error) {
      console.error("Logout error:", error);
      // Force clear even if backend call fails
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("tokenExpiry");
      localStorage.removeItem("user");
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  /**
   * Update user information
   */
  const updateUser = (data: Partial<User>) => {
    if (!user) return;

    const newUser = { ...user, ...data };
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
  };

  /**
   * Manually trigger token refresh
   * Useful for testing or when you need to ensure fresh tokens
   */
  const refreshTokenManually = async () => {
    try {
      // The axios interceptor will handle the refresh automatically
      // This is a manual trigger that validates token status
      const response = await axiosInstance.post(API_PATHS.AUTH.REFRESH_TOKEN);
      if (response?.data?.success) {
        toast.success("Tokens are valid");
      } else {
        toast.error("Please login again");
        await logout();
      }
    } catch (error) {
      console.error("Manual token refresh failed:", error);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    updateUser,
    checkAuthStatus,
    refreshTokenManually,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
