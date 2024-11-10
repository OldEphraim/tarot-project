import { useState, useEffect } from "react";
import useProcessEsmeraldaResponse from "./useProcessEsmeraldaResponse";
import { getEsmeraldaResponse } from "../services/openaiService";

const useUpdateEsmeraldaConversation = () => {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showTextarea, setShowTextarea] = useState(true);
  const [cards, setCards] = useState([]);
  const [pendingEntry, setPendingEntry] = useState(null);
  const [startTyping, setStartTyping] = useState(false);

  // Process images based on the current cards
  const { imageRequests } = useProcessEsmeraldaResponse(cards);

  // Function to handle user input
  const handleUserInput = async (e) => {
    if (e.key === "Enter" && !e.shiftKey && message.trim()) {
      e.preventDefault();
      setLoading(true);
      setShowTextarea(false);

      // Add user's message to conversation
      setConversation((prevConversation) => [
        ...prevConversation,
        { text: message, sender: "user" },
      ]);

      // Get response from Esmeralda and process cards/images
      const aiResponse = await getEsmeraldaResponse(message);
      setMessage("");
      setLoading(false);

      const newCards = aiResponse.cards || [];
      setCards(newCards);

      // Store Esmeralda's response as a pending entry without images
      setPendingEntry({
        text: aiResponse.response,
        sender: "esmeralda",
        cards: newCards,
      });

      setStartTyping(true);
    }
  };

  // Effect to add pending entry to conversation when images are ready
  useEffect(() => {
    if (pendingEntry && imageRequests) {
      setConversation((prevConversation) => [
        ...prevConversation,
        { ...pendingEntry, images: { ...imageRequests } },
      ]);
      setPendingEntry(null); // Reset pending entry
    }
  }, [imageRequests, pendingEntry]);

  return {
    message,
    setMessage,
    conversation,
    loading,
    showTextarea,
    setShowTextarea,
    handleUserInput,
    startTyping,
    setStartTyping,
  };
};

export default useUpdateEsmeraldaConversation;
