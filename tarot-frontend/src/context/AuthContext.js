import React, { createContext, useContext, useState, useEffect } from "react";
import {
  login as loginService,
  logout as logoutService,
  getUser as getUserService,
  clearAuthData,
} from "../services/authService";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUserService()); // Initialize user from localStorage

  // Login function
  const login = async ({ username, password, expiresInSeconds = 3600 }) => {
    try {
      const response = await loginService({
        username,
        password,
        expiresInSeconds,
      });
      setUser(response); // Set user in context
    } catch (error) {
      throw error; // Handle errors outside of AuthContext
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await logoutService();
      setUser(null); // Clear user in context
      clearAuthData(); // Clear localStorage
    } catch (error) {
      throw error; // Handle errors outside of AuthContext
    }
  };

  // useEffect to initialize user from localStorage on first load
  useEffect(() => {
    const storedUser = getUserService();
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user?.token, // Boolean indicating if the user is logged in
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
