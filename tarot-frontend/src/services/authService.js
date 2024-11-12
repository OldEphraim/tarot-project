// authService.js
import axios from "axios";

// Create an axios instance with a base URL
const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

// Store tokens and user info in localStorage
const setAuthData = ({ token, refresh_token, username }) => {
  localStorage.setItem("accessToken", token);
  localStorage.setItem("refreshToken", refresh_token);
  localStorage.setItem("username", username);
};

// Clear tokens from localStorage
export const clearAuthData = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("username");
};

export const createAccount = async ({ username, email, password }) => {
  try {
    const response = await api.post("/users", {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error || "Failed to create account");
    }
    throw new Error("Network error");
  }
};

// Login function
export const login = async ({
  username,
  password,
  expiresInSeconds = 3600,
}) => {
  try {
    const response = await api.post("/login", {
      username,
      password,
      expires_in_seconds: expiresInSeconds,
    });
    setAuthData(response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error || "Failed to log in");
    }
    throw new Error("Network error");
  }
};

// Logout function
export const logout = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    const username = localStorage.getItem("username");
    await api.post("/logout", { username: username, token: refreshToken });
    clearAuthData();
    return { success: true };
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error || "Failed to log out");
    }
    throw new Error("Network error");
  }
};

// Helper to retrieve tokens
export const getAccessToken = () => localStorage.getItem("accessToken");
export const getRefreshToken = () => localStorage.getItem("refreshToken");
export const getUsername = () => localStorage.getItem("username");
