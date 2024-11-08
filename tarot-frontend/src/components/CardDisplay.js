import React, { useState } from 'react';
import { useCardExplanations } from '../hooks/useCardExplanations';
import { useCardImages } from '../hooks/useCardImages';
import { useInactivityHandler } from '../hooks/useInactivityHandler';
import CelticCrossLayout from './spreadLayouts/CelticCrossLayout';
import RowLayout from './spreadLayouts/RowLayout';
import Typewriter from './Typewriter';
import './CardDisplay.css';

const CardDisplay = ({ cards, selectedSpread, artStyle, openModal }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(1);
  const [skipAnimation, setSkipAnimation] = useState(false);

  useInactivityHandler(cards.length, setSkipAnimation, setCurrentCardIndex);

  const { explanationTexts } = useCardExplanations(cards, skipAnimation ? cards.length : currentCardIndex, skipAnimation);
  const { imageRequests } = useCardImages(cards, artStyle);

  const handleTypewriterEnd = () => {
    if (!skipAnimation && currentCardIndex < cards.length) {
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
          openModal={openModal}
        />
      ) : (
        <RowLayout
          cards={cards}
          imageRequests={imageRequests}
          currentCardIndex={currentCardIndex} 
          selectedSpread={selectedSpread}
          openModal={openModal}
        />
      )}
      {explanationTexts.map((text, index) => (
        <div className="explanation-text" key={index} id={`explanation-text-${index}`}>
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
    </div>
  );
};

export default CardDisplay;