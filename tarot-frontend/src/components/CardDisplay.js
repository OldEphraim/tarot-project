import React, { useEffect, useState } from 'react';
import * as Typewriter from 'react-effect-typewriter';
import './CardDisplay.css';

const celticCrossPositionMeanings = {
  1: "Present situation",
  2: "Challenges",
  3: "Past influences",
  4: "Future influences",
  5: "Conscious influences",
  6: "Subconscious influences",
  7: "Advice",
  8: "External influences",
  9: "Hopes and fears",
  10: "Outcome"
}

const CardDisplay = ({ cards, selectedSpread }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(1);
  const [explanationTexts, setExplanationTexts] = useState([]);

  // Reveal each card one at a time, only when the explanation for the previous card finishes
  const handleTypewriterEnd = () => {
    if (currentCardIndex < cards.length) {
      setCurrentCardIndex(currentCardIndex + 1); // Move to the next card
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  };

  // Fetch explanation text for each card when it appears
  useEffect(() => {
    if (currentCardIndex > 0) {
      const card = cards[currentCardIndex - 1];
      const meaning = celticCrossPositionMeanings[currentCardIndex];
      const explanation = `${meaning}: ${card.name}`;

    // Only add the explanation if it is not already present in the array
    setExplanationTexts((prevTexts) => {
      if (!prevTexts.includes(explanation)) {
        return [...prevTexts, explanation];
      }
      return prevTexts; // Avoid duplicates
    });
  }
  }, [currentCardIndex, cards]);

  const getImagePath = (number) => {
    const imageFileName = `/tarot-images/card_${number}.jpg`;
    return imageFileName; 
  };

  const renderCardLayout = () => {
    const applyAbsolutePosition = currentCardIndex >= 3 ? 'position-absolute' : '';

    if (selectedSpread === "Celtic Cross") {
      return (
        <div className="card-display">
          {/* Cross Wrapper */}
          <div className="cross-wrapper">
            {/* Overlapping cards wrapper */}
            <div className="overlapping-cards">
              {currentCardIndex > 0 && <div className={`card position-1 ${applyAbsolutePosition}`}>
                <img src={getImagePath(cards[0].number)} alt={cards[0].name} />
                <span className="tooltip">{`${celticCrossPositionMeanings[1]}: ${cards[0].name}`}</span>
              </div>}
              {currentCardIndex > 1 && <div className={`card position-2 ${applyAbsolutePosition}`}>
                <img src={getImagePath(cards[1].number)} alt={cards[1].name} />
                <span className="tooltip">{`${celticCrossPositionMeanings[2]}: ${cards[1].name}`}</span>
              </div>}
            </div>
            {/* Other four cards forming the cross */}
            {cards.slice(2, Math.min(currentCardIndex, 6)).map((card, index) => (
              <div className={`card position-${index + 3}`} key={index}>
                <img src={getImagePath(card.number)} alt={card.name} />
                <span className="tooltip">{`${celticCrossPositionMeanings[index + 3]}: ${card.name}`}</span>
              </div>
            ))}
          </div>

          {/* Right Column Wrapper */}
          <div className="right-column">
            {cards.slice(6, Math.min(currentCardIndex, 10)).map((card, index) => (
              <div className={`card position-${index + 7}`} key={index}>
                <img src={getImagePath(card.number)} alt={card.name} />
                <span className="tooltip">{`${celticCrossPositionMeanings[index + 7]}: ${card.name}`}</span>
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      // Default layout for other spreads (e.g., Three-Card Spread)
      return (
        <div className="card-display">
          {cards.slice(0, currentCardIndex).map((card, index) => (
            <div key={index} className="card">
              <img src={getImagePath(card.number)} alt={card.name} />
              <span className="tooltip">{card.name}</span>
            </div>
          ))}
        </div>
      );
    }
};

return (
  <div>
    {renderCardLayout()}

    {/* Explanation Text */}
    {explanationTexts.map((text, index) => (
      <div className="explanation-text" key={index}>
        {/* Typewriter effect only for the latest explanation */}
        {index === explanationTexts.length - 1 ? (
          <Typewriter.Paragraph
            className="typewriter-effects"
            typingSpeed={20}
            startAnimation={index === explanationTexts.length - 1}
            onEnd={() => handleTypewriterEnd()} // Trigger next card reveal
          >
            {text}
          </Typewriter.Paragraph>
        ) : (
          <p className="typewriter-effects">{text}</p> // Static text for previous explanations
        )}
      </div>
    ))}
  </div>
);
};

export default CardDisplay;
