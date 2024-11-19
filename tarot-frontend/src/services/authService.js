import axios from "axios";

// Create an axios instance with a base URL
const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

// Store tokens and user info in localStorage
export const setAuthData = (user) => {
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
    const { refresh_token, username } = getUser();
    await api.post("/logout", { username: username, token: refresh_token });
    clearAuthData();
    return { success: true };
  } catch (error) {
    clearAuthData();
    if (error.response) {
      clearAuthData();
      throw new Error(error.response.data.error || "Failed to log out");
    }
    throw new Error("Network error");
  }
};

export const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await api.post(
      "/refresh",
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to refresh access token:", error);
    throw error; // Re-throw the error to handle it where this function is called
  }
};

// Helper to retrieve the entire user object
export const getUser = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user || {};
};
