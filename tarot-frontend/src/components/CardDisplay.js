import React, { useEffect, useState } from 'react';
import { getCardAtPositionExplanation } from '../services/openaiService';
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
};

const CardDisplay = ({ cards, selectedSpread }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(1);
  const [explanationTexts, setExplanationTexts] = useState([]);

  const handleTypewriterEnd = () => {
    if (currentCardIndex < cards.length) {
      setCurrentCardIndex(currentCardIndex + 1);
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (currentCardIndex > 0) {
      const card = cards[currentCardIndex - 1];
      const meaning = celticCrossPositionMeanings[currentCardIndex];

      const fetchExplanation = async () => {
        const explanation = await getCardAtPositionExplanation(card.name, meaning);
        setExplanationTexts((prevTexts) => {
          if (!prevTexts.includes(explanation)) {
            return [...prevTexts, `${meaning}: ${explanation}`];
          }
          return prevTexts;
        });
      };
  
      fetchExplanation();
    }
  }, [currentCardIndex, cards]);

  const getImagePath = (number) => {
    const imageFileName = `/tarot-images/card_${number}.jpg`;
    return imageFileName;
  };

  const renderCardLayout = () => {
    const isVisible = (index) => index < currentCardIndex;

    if (selectedSpread === "Celtic Cross") {
      return (
        <div className="card-display">
          <div className="cross-wrapper">
            {cards.slice(0, 6).map((card, index) => (
              <div key={index} className={`card position-${index + 1} ${isVisible(index) ? "visible" : ""}`}>
                <img src={getImagePath(card.number)} alt={card.name} />
                <span className="tooltip">{`${celticCrossPositionMeanings[index + 1]}: ${card.name}`}</span>
              </div>
            ))}
          </div>
          <div className="right-column">
            {cards.slice(6, 10).map((card, index) => (
              <div key={index} className={`card position-${index + 7} ${isVisible(index + 6) ? "visible" : ""}`}>
                <img src={getImagePath(card.number)} alt={card.name} />
                <span className="tooltip">{`${celticCrossPositionMeanings[index + 7]}: ${card.name}`}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    // Alternative layout if not Celtic Cross
    return (
      <div className={`card-display row-layout ${selectedSpread}`}>
        {cards.map((card, index) => (
          <div key={index} className={`card ${isVisible(index) ? "visible" : ""}`}>
            <img src={getImagePath(card.number)} alt={card.name} />
            <span className="tooltip">{card.name}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      {renderCardLayout()}
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