import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
});

export const drawSingleCard = async () => {
    const response = await api.get(`/draw`);
    return response.data;
}

export const drawMultipleCards = async (numCards) => {
    const response = await api.get(`/draw-multiple?count=${numCards}`);
    return response.data;
};

export const readTarotDeck = async () => {
    const response = await api.get(`/tarot-deck`);
    return response.data;
}

export const searchCardByName = async (cardName) => {
    const response = await api.get(`/search?cardName=${cardName}`);
    return response.data;
};