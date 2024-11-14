import React, { useState, useRef, useEffect } from "react";
import CelticCrossLayout from "./spreadLayouts/CelticCrossLayout";
import RowLayout from "./spreadLayouts/RowLayout";
import Closing from "./Closing";
import Typewriter from "./Typewriter";
import { useCardImages } from "../hooks/useCardImages";
import { getEsmeraldaResponse } from "../services/openaiService";
import "./TarotChat.css";

const TarotChat = () => {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  const [showTextarea, setShowTextarea] = useState(true);
  const [loading, setLoading] = useState(false);
  const [startTyping, setStartTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [cards, setCards] = useState([]);
  const [pendingEntry, setPendingEntry] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const textareaRef = useRef(null);

  const { imageRequests } = useCardImages(cards, "Rider-Waite");

  const handleInputChange = (e) => {
    const text = e.target.value;
    setMessage(text);
    adjustTextareaHeight();
  };

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

  const handleKeyDown = async (e) => {
    if (e.key === "Enter" && !e.shiftKey && message.trim()) {
      e.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    if (
      pendingEntry &&
      pendingEntry.cards.every((card) => imageRequests[card.name])
    ) {
      setConversation((prev) => [
        ...prev,
        { ...pendingEntry, images: { ...imageRequests } },
      ]);
      setPendingEntry(null);
    }
  }, [pendingEntry, imageRequests]);

  const adjustTextareaHeight = (reset = false) => {
    if (textareaRef.current) {
      if (reset) {
        textareaRef.current.style.height = "auto";
      }
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [message]);

  const handleTypewriterEnd = () => {
    setStartTyping(false);
    setShowTextarea(true);
    setIsTyping(false);
  };

  const hasLayout = conversation.some(
    (msg) => msg.cards && msg.cards.length > 0
  );

  const esmeraldaMessageCount = conversation.filter(
    (msg) => msg.sender === "esmeralda"
  ).length;

  return (
    <div className="tarot-chat">
      {/* Render conversation history */}
      <div className="conversation-history">
        {conversation.map((msg, index) => {
          const isLastMessage = index === conversation.length - 1;
          const shouldType =
            msg.sender === "esmeralda" && isLastMessage && startTyping;

          return (
            <div
              key={index}
              className={
                msg.sender === "user" ? "user-message" : "esmeralda-message"
              }
            >
              {/* Render RowLayout if the message has associated cards */}
              {msg.cards &&
                msg.cards.length > 0 &&
                !(msg.celticCross && msg.cards.length === 10) && (
                  <RowLayout
                    cards={msg.cards}
                    imageRequests={msg.images}
                    currentCardIndex={msg.cards.length}
                  />
                )}
              {/* Render CelticCrossLayout if the message has associated cards */}
              {msg.cards && msg.cards.length === 10 && msg.celticCross && (
                <CelticCrossLayout
                  cards={msg.cards}
                  imageRequests={msg.images}
                  currentCardIndex={msg.cards.length}
                />
              )}
              {shouldType ? (
                <Typewriter
                  text={msg.text}
                  startAnimation
                  onEnd={handleTypewriterEnd}
                />
              ) : (
                msg.text
              )}
            </div>
          );
        })}
      </div>

      {/* Render textarea only when Esmeralda has finished typing */}
      {showTextarea && (
        <div className="message-input-box">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="message-input"
            style={{ resize: "none", overflow: "hidden" }}
          />
          <div className="below-text">
            Type your message and press Enter to respond to Esmeralda.
          </div>
          <div className="button-container">
            <button className="spooky-button" onClick={handleSubmit}>
              SUBMIT
            </button>
            {esmeraldaMessageCount >= 1 && (
              <button
                className="spooky-button"
                onClick={() => setShowTextarea(false)}
              >
                END CONVERSATION
              </button>
            )}
          </div>
        </div>
      )}

      {loading && <div className="loading-spinner">...</div>}
      {(hasLayout || esmeraldaMessageCount >= 6) && !loading && !isTyping && (
        <div style={{ border: "2px solid black", padding: "10px" }}>
          <img
            className={`esmeralda ${isImageLoaded ? "fade-in" : ""}`}
            src="/esmeralda-universe-images/nighttime-spooky-forest-with-mushrooms.webp"
            alt="spooky-mushroom-forest"
            onLoad={() => setIsImageLoaded(true)}
          />
          <Closing />
        </div>
      )}
    </div>
  );
};

export default TarotChat;
