import React, { createContext, useContext, useState, useEffect } from "react";
import * as authService from "../services/authService";

// Create the context
const AuthContext = createContext();

// Custom hook for accessing AuthContext
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = () => {
      const accessToken = authService.getAccessToken();
      const refreshToken = authService.getRefreshToken();
      if (accessToken && refreshToken) {
        // Optionally decode or verify tokens
        setUser({ accessToken, refreshToken });
      } else {
        // Handle missing tokens (optional logout or token refresh)
        authService.clearAuthData(); // Clear any partial tokens
        setUser(null);
      }
      setIsLoading(false);
    };
    initializeAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const userData = await authService.login(credentials);
      console.log(userData);
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      throw new Error(error.message || "Login failed");
    }
  };

  const logout = async () => {
    try {
      const logoutData = await authService.logout();
      console.log(logoutData);
      setUser(null);
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
