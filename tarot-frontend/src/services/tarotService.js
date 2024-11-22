import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_TAROT_API}/api`,
});

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

export const getLastImages = async (numCards) => {
  const response = await api.get(`/get-last-images?limit=${numCards}`);
  return response.data;
};
