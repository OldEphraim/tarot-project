import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

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

export const drawMultipleCards = async (numCards) => {
  const response = await api.get(`/draw?count=${numCards}`);
  return response.data;
};

export const readTarotDeck = async () => {
  const response = await api.get(`/tarot-deck`);
  return response.data;
};

export const searchCardByName = async (cardName) => {
  const response = await api.get(`/search?cardName=${cardName}`);
  return response.data;
};
