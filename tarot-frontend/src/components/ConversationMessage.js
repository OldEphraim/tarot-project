import React from "react";
import CelticCrossLayout from "./spreadLayouts/CelticCrossLayout";
import RowLayout from "./spreadLayouts/RowLayout";
import Typewriter from "./Typewriter";

const ConversationMessage = ({ msg, shouldType, handleTypewriterEnd }) => {
  return (
    <div
      className={msg.sender === "user" ? "user-message" : "esmeralda-message"}
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
};

export default ConversationMessage;
