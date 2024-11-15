import { useState, useEffect } from "react";
import { getEsmeraldaResponse } from "../services/openaiService";

const useConversation = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [pendingEntry, setPendingEntry] = useState(null);
  const [startTyping, setStartTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showTextarea, setShowTextarea] = useState(true);
  const [cards, setCards] = useState([]);
  const [imageRequests, setImageRequests] = useState({});

  useEffect(() => {
    if (cards.length > 0) {
      const updatedImageRequests = {};
      cards.forEach((card) => {
        updatedImageRequests[card.name] = {
          url: `/tarot-images/card_${card.number}.jpg`,
        };
      });
      setImageRequests(updatedImageRequests);
    }
  }, [cards]);

  const handleSubmit = async () => {
    if (!message.trim()) return;
    setLoading(true);
    setShowTextarea(false);
    setConversation((prevConversation) => [
      ...prevConversation,
      { text: message, sender: "user" },
    ]);

    const aiResponse = await getEsmeraldaResponse(message);
    setMessage("");
    setLoading(false);

    const newCards = aiResponse.cards || [];
    setCards(newCards);

    setPendingEntry({
      text: aiResponse.response,
      sender: "esmeralda",
      cards: newCards,
      celticCross: aiResponse.celticCross,
    });

    setStartTyping(true);
    setIsTyping(true);
  };

  useEffect(() => {
    if (
      pendingEntry &&
      pendingEntry.cards.every((card) => imageRequests[card.name]) &&
      conversation.length > 0 &&
      conversation[conversation.length - 1].sender === "user"
    ) {
      setConversation((prev) => [
        ...prev,
        { ...pendingEntry, images: { ...imageRequests } },
      ]);
    }
  }, [conversation, pendingEntry, imageRequests]);

  useEffect(() => {
    if (
      pendingEntry &&
      conversation.length &&
      areEntriesEqual(conversation[conversation.length - 1], pendingEntry)
    ) {
      setPendingEntry(null);
    }
  }, [conversation, pendingEntry]);

  const areEntriesEqual = (entry1, entry2) => {
    if (!entry1 || !entry2) return false;

    const keys1 = Object.keys(entry1).filter((key) => key !== "images");
    const keys2 = Object.keys(entry2).filter((key) => key !== "images");

    if (keys1.length !== keys2.length) return false;

    return keys1.every((key) => entry1[key] === entry2[key]);
  };

  const handleTypewriterEnd = () => {
    setStartTyping(false);
    setShowTextarea(true);
    setIsTyping(false);
  };

  return {
    conversation,
    handleSubmit,
    handleTypewriterEnd,
    isTyping,
    startTyping,
    showTextarea,
    setShowTextarea,
    message,
    setMessage,
    loading,
  };
};

export default useConversation;
