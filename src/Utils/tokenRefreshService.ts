/**
 * Token Refresh Service
 * Handles automatic token refresh and rotation logic
 */

import axios from "axios";
import { API_PATHS } from "./ApiPaths";
import { getRefreshToken, setTokens, clearTokens } from "./tokenManager";

const API_URL = import.meta.env.VITE_BASE_URL;

// Flag to prevent multiple simultaneous refresh attempts
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

/**
 * Subscribe to token refresh completion
 * This prevents race conditions when multiple requests fail with 401
 */
const subscribeTokenRefresh = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

/**
 * Notify all subscribers that token has been refreshed
 */
const notifyTokenRefresh = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

/**
 * Refresh access token using refresh token
 * Implements token rotation with automatic retry logic
 */
export const refreshAccessToken = async (): Promise<{
  accessToken: string;
  refreshToken: string;
} | null> => {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    console.warn("No refresh token available");
    return null;
  }

  try {
    // Create a new axios instance to avoid interceptor loop
    const refreshAxios = axios.create({
      baseURL: API_URL,
      timeout: 8000,
    });

    const response = await refreshAxios.post(API_PATHS.AUTH.REFRESH_TOKEN, {
      refreshToken,
    });

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      response.data;

    if (newAccessToken && newRefreshToken) {
      // Store new tokens
      setTokens(newAccessToken, newRefreshToken);

      console.log("Token refreshed successfully");
      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    }

    return null;
  } catch (error: any) {
    console.error("Token refresh failed:", error.response?.data?.message || error.message);
    // Clear tokens on refresh failure
    clearTokens();
    return null;
  }
};

/**
 * Retry failed request with new token
 * Used after successful token refresh
 */
export const retryRequest = async (error: any, newAccessToken: string) => {
  const config = error.config;

  if (config) {
    config.headers.Authorization = `Bearer ${newAccessToken}`;
    return axios(config);
  }

  return Promise.reject(error);
};

/**
 * Handle 401 errors with automatic token refresh
 * Prevents multiple simultaneous refresh attempts
 */
export const handleTokenRefresh = (error: any): Promise<any> => {
  const { config } = error;

  if (!config) {
    return Promise.reject(error);
  }

  // Prevent infinite loops by checking if we already tried to refresh
  if (config._retry) {
    clearTokens();
    return Promise.reject(error);
  }

  // Already refreshing
  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      subscribeTokenRefresh((token: string) => {
        config.headers.Authorization = `Bearer ${token}`;
        resolve(axios(config));
      });
    }).catch(() => {
      clearTokens();
      return Promise.reject(error);
    });
  }

  // Start refresh
  config._retry = true;
  isRefreshing = true;

  return refreshAccessToken()
    .then((result) => {
      isRefreshing = false;

      if (result?.accessToken) {
        // Update failed request with new token
        config.headers.Authorization = `Bearer ${result.accessToken}`;

        // Notify other pending requests
        notifyTokenRefresh(result.accessToken);

        // Retry the original request
        return axios(config);
      } else {
        return Promise.reject(error);
      }
    })
    .catch((err) => {
      isRefreshing = false;
      clearTokens();
      return Promise.reject(err || error);
    });
};

export default {
  refreshAccessToken,
  retryRequest,
  handleTokenRefresh,
  subscribeTokenRefresh,
  notifyTokenRefresh,
};
