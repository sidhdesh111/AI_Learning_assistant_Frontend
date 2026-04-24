/**
 * Token Manager Utility
 * Handles token storage, retrieval, and validation
 */

const TOKEN_KEYS = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
  TOKEN_EXPIRY: "tokenExpiry",
};

/**
 * Decode JWT token without verification (frontend only)
 * This is safe because we validate tokens on the backend
 */
export const decodeToken = (token: string): any => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

/**
 * Get token expiration time in milliseconds
 */
export const getTokenExpiration = (token: string): number | null => {
  const decoded = decodeToken(token);
  if (decoded && decoded.exp) {
    return decoded.exp * 1000; // Convert to milliseconds
  }
  return null;
};

/**
 * Check if token is expired
 */
export const isTokenExpired = (token: string): boolean => {
  const expiration = getTokenExpiration(token);
  if (!expiration) return true;
  return Date.now() >= expiration;
};

/**
 * Check if token is expiring soon (within 5 minutes)
 */
export const isTokenExpiringSoon = (token: string): boolean => {
  const expiration = getTokenExpiration(token);
  if (!expiration) return true;
  const fiveMinutesInMs = 5 * 60 * 1000;
  return Date.now() >= expiration - fiveMinutesInMs;
};

/**
 * Store tokens in localStorage
 */
export const setTokens = (accessToken: string, refreshToken: string): void => {
  localStorage.setItem(TOKEN_KEYS.ACCESS_TOKEN, accessToken);
  localStorage.setItem(TOKEN_KEYS.REFRESH_TOKEN, refreshToken);
  
  const expiration = getTokenExpiration(accessToken);
  if (expiration) {
    localStorage.setItem(TOKEN_KEYS.TOKEN_EXPIRY, expiration.toString());
  }
};

/**
 * Get access token from storage
 */
export const getAccessToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN);
};

/**
 * Get refresh token from storage
 */
export const getRefreshToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEYS.REFRESH_TOKEN);
};

/**
 * Clear all tokens from storage
 */
export const clearTokens = (): void => {
  localStorage.removeItem(TOKEN_KEYS.ACCESS_TOKEN);
  localStorage.removeItem(TOKEN_KEYS.REFRESH_TOKEN);
  localStorage.removeItem(TOKEN_KEYS.TOKEN_EXPIRY);
};

/**
 * Check if user has valid tokens
 */
export const hasValidTokens = (): boolean => {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();
  
  if (!accessToken || !refreshToken) {
    return false;
  }
  
  return !isTokenExpired(accessToken);
};

/**
 * Get token info for debugging
 */
export const getTokenInfo = () => {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();
  
  return {
    hasAccessToken: !!accessToken,
    hasRefreshToken: !!refreshToken,
    accessTokenExpired: accessToken ? isTokenExpired(accessToken) : null,
    accessTokenExpiringSoon: accessToken ? isTokenExpiringSoon(accessToken) : null,
    refreshTokenExpired: refreshToken ? isTokenExpired(refreshToken) : null,
  };
};
