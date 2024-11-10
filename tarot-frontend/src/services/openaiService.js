import axios from "axios";

export const getEsmeraldaResponse = async (userMessage) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/esmeralda/chat",
      {
        message: userMessage,
      },
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    return "Error communicating with Esmeralda.";
  }
};

export const getCardAtPositionExplanation = async (card, position) => {
  try {
    const response = await axios.post("http://localhost:8080/api/chat", {
      message: `Provide a brief, general explanation for what it might mean for the tarot card ${card} to occupy the position ${position} in a tarot reading. You can discuss the type of influence or theme it might represent on a person's career goals or love life, but try not to use more than 2-3 sentences.`,
    });
    return response.data.response;
  } catch (error) {
    console.error("Error:", error);
    return "Error generating explanation.";
  }
};

export const generateCardImage = async (theme, card) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/generate-image",
      {
        theme,
        card,
      },
    );
    return response.data.requestID;
  } catch (error) {
    console.error("Error generating image:", error);
    return "Error generating image.";
  }
};

export const retrieveCardImage = async (requestId) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/get-image-result?requestID=${requestId}`,
    );
    if (response.status === 200 && response.data.imageUrl) {
      return { status: "ready", url: response.data.imageUrl };
    }
    return { status: "pending" };
  } catch (error) {
    console.error(`Error fetching image result:`, error);
    return { status: "error" };
  }
};
