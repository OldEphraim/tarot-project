import axios from "axios";

export const getChatResponse = async (userMessage) => {
  try {
    const response = await axios.post("http://localhost:8080/api/chat", {
      content: userMessage,
    });
    return response.data.response;
  } catch (error) {
    console.error("Error:", error);
    return "Error processing your request.";
  }
};