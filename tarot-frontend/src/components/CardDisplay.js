import React, { useEffect, useState } from 'react';
import { useCardExplanations } from '../hooks/useCardExplanations';
import { useCardImages } from '../hooks/useCardImages';
import CelticCrossLayout from './spreadLayouts/CelticCrossLayout';
import RowLayout from './spreadLayouts/RowLayout';
import Typewriter from './Typewriter';
import './CardDisplay.css';

const CardDisplay = ({ cards, selectedSpread, artStyle }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(1);
  const [skipAnimation, setSkipAnimation] = useState(false);

  useEffect(() => {
    let inactivityTimeout;
    const handleVisibilityChange = () => {
      if (document.hidden) {
        inactivityTimeout = setTimeout(() => {
          setSkipAnimation(true); 
          setCurrentCardIndex(cards.length); 
        }, 60000); // 60 seconds
      } else {
        clearTimeout(inactivityTimeout);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearTimeout(inactivityTimeout); // Cleanup on unmount
    };
  }, [cards.length]);

  const { explanationTexts } = useCardExplanations(cards, skipAnimation ? cards.length : currentCardIndex, skipAnimation);
  const { imageRequests } = useCardImages(cards, artStyle);

  const handleTypewriterEnd = () => {
    if (!skipAnimation && currentCardIndex < cards.length) {
      console.log("currentCardIndex is", currentCardIndex)
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