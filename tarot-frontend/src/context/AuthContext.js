import React, { createContext, useContext, useState, useEffect } from "react";
import {
  login as loginService,
  logout as logoutService,
  getUser as getUserService,
  clearAuthData,
  setAuthData,
  refreshAccessToken,
} from "../services/authService";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(getUserService());
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Wrapper around setUserState to update both state and local storage
  const setUser = (updatedUser) => {
    if (updatedUser) {
      setAuthData(updatedUser); // Save to local storage
      setUserState(updatedUser); // Update state
    } else {
      clearAuthData(); // Clear local storage if user is null
    }
  };

  // Refresh token logic
  useEffect(() => {
    if (!user?.token || !user?.expiration) return;

    const refreshToken = async () => {
      try {
        setIsRefreshing(true);
        const newTokenData = await refreshAccessToken(user.refresh_token);

        const updatedUser = {
          ...user,
          token: newTokenData.token,
          expiration: newTokenData.expiration,
        };

        setUser(updatedUser);
      } catch (error) {
        console.error("Token refresh failed. Logging out...");
        logout(); // Handle failure
      } finally {
        setIsRefreshing(false);
      }
    };

    const expirationTime = new Date(user.expiration).getTime();
    const currentTime = Date.now();
    const timeUntilRefresh = expirationTime - currentTime - 60000; // Refresh 1 min before expiry

    if (timeUntilRefresh > 0) {
      const timeoutId = setTimeout(() => {
        refreshToken();
      }, timeUntilRefresh);

      return () => clearTimeout(timeoutId); // Cleanup timeout
    } else {
      refreshToken();
    }
  }, [user]);

  // Login function
  const login = async ({ username, password, expiresInSeconds = 3600 }) => {
    try {
      const response = await loginService({
        username,
        password,
        expiresInSeconds,
      });
      setUser(response);
    } catch (error) {
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await logoutService();
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setUser(null);
      clearAuthData();
    }
  };

  const value = {
    user,
    setUser,
    login,
    logout,
    isAuthenticated: !!user?.token,
    isRefreshing,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
