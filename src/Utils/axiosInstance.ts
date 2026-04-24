import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";
import { getAccessToken, isTokenExpiringSoon } from "./tokenManager";
import { handleTokenRefresh } from "./tokenRefreshService";

const URL: string = import.meta.env.VITE_BASE_URL;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: URL,
  timeout: 30000,
});

/**
 * Request Interceptor
 * Adds access token to Authorization header
 * Checks if token is expiring soon and logs a warning
 */
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = getAccessToken();
    
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      console.log("[Axios] Token added to request:", {
        method: config.method,
        url: config.url,
        hasToken: !!accessToken,
        tokenLength: accessToken.length,
      });
      
      // Warn if token is expiring soon
      if (isTokenExpiringSoon(accessToken)) {
        console.warn("[Token Manager] Access token expiring soon, will refresh on next request");
      }
    } else {
      console.warn("[Axios] No access token found in storage", {
        method: config.method,
        url: config.url,
      });
    }

    // For FormData, don't set Content-Type header
    // Let the browser set it automatically with the correct boundary
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  },
);

/**
 * Response Interceptor
 * Handles 401 errors by attempting token refresh
 * Retries failed requests with new tokens
 */
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: any) => {
    if (error.response) {
      // Handle 401 Unauthorized - attempt token refresh
      if (error.response.status === 401 && error.config) {
        console.warn("[Token Manager] 401 Unauthorized - Attempting token refresh...");
        return handleTokenRefresh(error);
      }
      
      if (error.response.status === 500) {
        console.error(`Server error. Please try again later.`);
      } else if (error.code === "ECONNABORTED") {
        console.error("Request Timeout. Please try again.");
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;