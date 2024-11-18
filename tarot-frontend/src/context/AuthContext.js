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
  const [user, setUser] = useState(getUserService()); // Load from localStorage
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Refresh token logic
  useEffect(() => {
    if (!user?.token || !user?.expiration) return;

    const expirationTime = new Date(user.expiration).getTime();
    const currentTime = Date.now();
    const timeUntilRefresh = expirationTime - currentTime - 60000; // Refresh 1 min before expiry
    console.log(timeUntilRefresh);

    if (timeUntilRefresh > 0) {
      const refreshTimeout = setTimeout(async () => {
        try {
          console.log("old user:", user);
          setIsRefreshing(true);
          const newTokenData = await refreshAccessToken(user.refresh_token);
          console.log(newTokenData); // Call backend

          const updatedUser = {
            ...user,
            token: newTokenData.token,
            expiration: newTokenData.expiration, // Update expiration
          };

          console.log("new user:", updatedUser);

          setUser(updatedUser);
          setAuthData(updatedUser);
        } catch (error) {
          console.error("Token refresh failed. Logging out...");
          logout(); // Handle failure
        } finally {
          setIsRefreshing(false);
        }
      }, timeUntilRefresh);

      return () => clearTimeout(refreshTimeout); // Cleanup
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
      setUser(response); // Set user in state
      setAuthData(response); // Persist to localStorage
    } catch (error) {
      throw error; // Handle login error
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await logoutService();
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setUser(null); // Clear state
      clearAuthData(); // Clear localStorage
    }
  };

  const value = {
    user,
    setUser,
    login,
    logout,
    isAuthenticated: !!user?.token,
    isRefreshing, // Optional: Track refresh state
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
