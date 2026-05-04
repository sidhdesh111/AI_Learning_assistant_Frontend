/**
 * Token Refresh Service
 * Handles automatic token refresh and rotation logic
 */

import axios from "axios";
import { API_PATHS } from "./ApiPaths";
import { clearTokens } from "./tokenManager";

const API_URL = import.meta.env.VITE_BASE_URL;

// Flag to prevent multiple simultaneous refresh attempts
let isRefreshing = false;
let refreshSubscribers: (() => void)[] = [];

/**
 * Subscribe to token refresh completion
 * This prevents race conditions when multiple requests fail with 401
 */
const subscribeTokenRefresh = (callback: () => void) => {
  refreshSubscribers.push(callback);
};

/**
 * Notify all subscribers that token has been refreshed
 */
const notifyTokenRefresh = () => {
  refreshSubscribers.forEach((callback) => callback());
  refreshSubscribers = [];
};

/**
 * Refresh access token using refresh token
 * Implements token rotation with automatic retry logic
 */
export const refreshAccessToken = async (): Promise<{
  success: boolean;
} | null> => {
  try {
    // Backend reads refresh token from httpOnly cookie.
    const refreshAxios = axios.create({
      baseURL: API_URL,
      timeout: 8000,
      withCredentials: true,
    });

    const response = await refreshAxios.post(API_PATHS.AUTH.REFRESH_TOKEN);
    if (response?.data?.success) {
      console.log("Token refreshed successfully");
      return { success: true };
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
    return new Promise((resolve, _reject) => {
      subscribeTokenRefresh(() => {
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

      if (result?.success) {
        // Notify other pending requests
        notifyTokenRefresh();

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
