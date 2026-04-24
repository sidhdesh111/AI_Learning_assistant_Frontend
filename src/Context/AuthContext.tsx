import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import toast from "react-hot-toast";
import {
  setTokens,
  getAccessToken,
  clearTokens,
  hasValidTokens,
} from "../Utils/tokenManager";
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
  login: (userData: User, accessToken: string, refreshToken: string) => void;
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
      const hasTokens = hasValidTokens();

      if (userStr && hasTokens) {
        const userData: User = JSON.parse(userStr);
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        // Clear invalid tokens
        clearTokens();
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
  const login = (userData: User, accessToken: string, refreshToken: string) => {
    try {
      // Store tokens using token manager
      setTokens(accessToken, refreshToken);
      
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
      clearTokens();
      localStorage.removeItem("user");
      
      toast.success("Logged out successfully");
      setUser(null);
      setIsAuthenticated(false);
      
      console.log("[Auth] User logged out");
    } catch (error) {
      console.error("Logout error:", error);
      // Force clear even if backend call fails
      clearTokens();
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
      const hasTokens = hasValidTokens();
      
      if (!hasTokens) {
        toast.error("Please login again");
        await logout();
      } else {
        toast.success("Tokens are valid");
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
