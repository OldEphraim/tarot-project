import React, { useState } from "react";
import useConversation from "../hooks/useConversation";
import ConversationMessage from "./ConversationMessage";
import Closing from "./Closing";
import TextArea from "./TextArea";
import "./TarotChat.css";

const TarotChat = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const {
    conversation,
    handleSubmit,
    isTyping,
    startTyping,
    showTextarea,
    setShowTextarea,
    message,
    setMessage,
    loading,
    handleTypewriterEnd,
  } = useConversation();

  const handleInputChange = (e) => {
    const text = e.target.value;
    setMessage(text);
  };

  const hasLayout = conversation.some(
    (msg) => msg.cards && msg.cards.length > 0
  );

  const esmeraldaMessageCount = conversation.filter(
    (msg) => msg.sender === "esmeralda"
  ).length;

  return (
    <div className="tarot-chat">
      <div className="conversation-history">
        {conversation.map((msg, index) => {
          return (
            <ConversationMessage
              key={index}
              msg={msg}
              shouldType={
                msg.sender === "esmeralda" &&
                index === conversation.length - 1 &&
                startTyping
              }
              handleTypewriterEnd={handleTypewriterEnd}
            />
          );
        })}
      </div>
      {showTextarea && (
        <div className="message-input-box">
          <TextArea
            value={message}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
            belowText="Type your message and press Enter to respond to Esmeralda."
            placeholder="Type your message..."
          />
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
          <Closing artStyle={"Rider-Waite"} />
        </div>
      )}
    </div>
  );
};

export default TarotChat;
