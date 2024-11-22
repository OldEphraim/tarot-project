import axios from "axios";

export const getEsmeraldaResponse = async (userMessage) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_TAROT_API}/api/esmeralda/chat`,
      {
        message: userMessage,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    return "Error communicating with Esmeralda.";
  }
};

export const getCardAtPositionExplanation = async (
  card,
  position,
  username,
  userReason
) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_TAROT_API}/api/chat`,
      {
        message: `Provide a brief, general explanation for what it might mean for the tarot card ${card} to appear ${position} in a tarot reading. ${username ? `You are doing this on behalf of ${username}` : "You are doing this on behalf of a person visiting a tarot website"}${userReason ? `, and they have given you the following reason for consulting the cards: ${userReason}. Try to use 1-2 sentences more than the reason they give` : ". You can discuss the type of influence or theme it might represent on a person's career goals or love life, but try not to use more than 2-3 sentences."}`,
      }
    );
    return response.data.response;
  } catch (error) {
    console.error("Error:", error);
    return "Error generating explanation.";
  }
};

export const generateCardImage = async (user, theme, card) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_TAROT_API}/api/generate-image`,
      {
        theme,
        card,
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
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
      `${process.env.REACT_APP_TAROT_API}/api/get-image-result?requestID=${requestId}`
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
