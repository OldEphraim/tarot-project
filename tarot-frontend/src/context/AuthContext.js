import React, { createContext, useContext, useState, useEffect } from "react";
import { login as loginService } from "../services/apiService"; // Import loginService from your service

// Create the context
const AuthContext = createContext();

// Custom hook for accessing AuthContext
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check local storage for user info on initial load
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  // Login function using loginService
  const login = async ({ email, password }) => {
    try {
      // Call loginService to authenticate
      const userData = await loginService({ email, password });
      console.log(userData);

      // Save user data and tokens in state and localStorage
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("accessToken", userData.token);
      localStorage.setItem("refreshToken", userData.refresh_token);
    } catch (error) {
      throw new Error(error.message || "Login failed");
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
