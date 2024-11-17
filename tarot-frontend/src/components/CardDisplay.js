import React, { useState } from "react";
import { useTarot } from "../context/TarotContext";
import { useCardExplanations } from "../hooks/useCardExplanations";
import { useCardImages } from "../hooks/useCardImages";
import { useInactivityHandler } from "../hooks/useInactivityHandler";
import CelticCrossLayout from "./spreadLayouts/CelticCrossLayout";
import RowLayout from "./spreadLayouts/RowLayout";
import Closing from "./Closing";
import Typewriter from "./Typewriter";
import "./CardDisplay.css";

const CardDisplay = ({ cards, artStyle }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(1);
  const [skipAnimation, setSkipAnimation] = useState(false);

  const { selectedSpread } = useTarot();

  useInactivityHandler(cards.length, setSkipAnimation, setCurrentCardIndex);

  const { explanationTexts } = useCardExplanations(
    cards,
    skipAnimation ? cards.length : currentCardIndex,
    skipAnimation
  );
  const { imageRequests } = useCardImages(cards, artStyle, false);

  const handleTypewriterEnd = () => {
    if (!skipAnimation) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  return (
    <div className="card-display-wrapper">
      {selectedSpread === "Celtic Cross" ? (
        <CelticCrossLayout
          cards={cards}
          imageRequests={imageRequests}
          currentCardIndex={currentCardIndex}
        />
      ) : (
        <RowLayout
          cards={cards}
          imageRequests={imageRequests}
          currentCardIndex={currentCardIndex}
        />
      )}
      {explanationTexts.map((text, index) => (
        <div
          className="explanation-text"
          key={index}
          id={`explanation-text-${index}`}
        >
          {skipAnimation || index < currentCardIndex - 1 ? (
            <p className="typewriter-effects">{text}</p>
          ) : index === currentCardIndex - 1 ? (
            <Typewriter
              text={text}
              typingSpeed={20}
              startAnimation={!skipAnimation}
              onEnd={handleTypewriterEnd}
            />
          ) : null}
        </div>
      ))}
      {(currentCardIndex > cards.length || skipAnimation) && (
        <Closing artStyle={artStyle} />
      )}
    </div>
  );
};

export default CardDisplay;
