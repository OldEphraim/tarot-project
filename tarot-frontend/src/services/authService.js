import axios from "axios";

// Create an axios instance with a base URL
const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

// Store tokens and user info in localStorage
const setAuthData = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

// Clear tokens from localStorage
export const clearAuthData = () => {
  localStorage.removeItem("user");
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
    console.log(response.data);
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
    const { refreshToken, username } = getUser();
    await api.post("/logout", { username: username, token: refreshToken });
    clearAuthData();
    return { success: true };
  } catch (error) {
    if (error.response) {
      clearAuthData();
      throw new Error(error.response.data.error || "Failed to log out");
    }
    throw new Error("Network error");
  }
};

// Helper to retrieve the entire user object
export const getUser = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user || {};
};
