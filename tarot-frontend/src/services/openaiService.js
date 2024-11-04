import axios from "axios";

export const getChatResponse = async (userMessage) => {
  try {
    const response = await axios.post("http://localhost:8080/api/chat", {
      message: userMessage,
    });
    return response.data.response;
  } catch (error) {
    console.error("Error:", error);
    return "Error processing your request.";
  }
};

export const getCardAtPositionExplanation = async (card, position) => {
  try {
    const response = await axios.post("http://localhost:8080/api/chat", {
      message: `Provide a brief, general explanation for what it might mean for the tarot card ${card} to occupy the position ${position} in a tarot reading. Describe the type of influence or theme it might represent on a person's career goals or love life.`,
    });
    return response.data.response;
  } catch (error) {
    console.error("Error:", error);
    return "Error generating explanation.";
  }
};

export const generateCardImage = async (theme, card) => {
    try {
      const response = await axios.post("http://localhost:8080/api/generate-image", {
        theme,
        card
      });
      return response.data.imageUrl;
    } catch (error) {
      console.error("Error generating image:", error);
      return "Error generating image.";
    }
  };