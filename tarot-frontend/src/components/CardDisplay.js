import React, { useState } from 'react';
import * as Typewriter from 'react-effect-typewriter';
import { useCardExplanations } from '../hooks/useCardExplanations';
import { useCardImages } from '../hooks/useCardImages';
import CelticCrossLayout from './spreadLayouts/CelticCrossLayout';
import RowLayout from './spreadLayouts/RowLayout';
import './CardDisplay.css';

const CardDisplay = ({ cards, selectedSpread, artStyle }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(1);

  const { explanationTexts } = useCardExplanations(cards, currentCardIndex);
  const { imageRequests } = useCardImages(cards, artStyle);

  const handleTypewriterEnd = () => {
    if (currentCardIndex < cards.length) {
      setCurrentCardIndex(currentCardIndex + 1);
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  };

  return (
    <div>
      {selectedSpread === 'Celtic Cross' ? (
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
          selectedSpread={selectedSpread}
        />
      )}
      {explanationTexts.map((text, index) => (
        <div className="explanation-text" key={index}>
          {index === explanationTexts.length - 1 ? (
            <Typewriter.Paragraph
              className="typewriter-effects"
              typingSpeed={20}
              startAnimation={index === explanationTexts.length - 1}
              onEnd={handleTypewriterEnd}
            >
              {text}
            </Typewriter.Paragraph>
          ) : (
            <p className="typewriter-effects">{text}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default CardDisplay;