import React from 'react';
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
  const getImagePath = (number) => {
    const imageFileName = `/tarot-images/card_${number}.jpg`;
    return imageFileName; 
  };

  const renderCardLayout = () => {
    if (selectedSpread === "Celtic Cross") {
      return (
        <div className="card-display">
          {/* Cross Wrapper */}
          <div className="cross-wrapper">
            {/* Overlapping cards wrapper */}
            <div className="overlapping-cards">
              <div className="card position-1">
                <img src={getImagePath(cards[0].number)} alt={cards[0].name} />
                <span className="tooltip">{`${celticCrossPositionMeanings[1]}: ${cards[0].name}`}</span>
              </div>
              <div className="card position-2">
                <img src={getImagePath(cards[1].number)} alt={cards[1].name} />
                <span className="tooltip">{`${celticCrossPositionMeanings[2]}: ${cards[1].name}`}</span>
              </div>
            </div>
            {/* Other four cards forming the cross */}
            {cards.slice(2, 6).map((card, index) => (
              <div className={`card position-${index + 3}`} key={index}>
                <img src={getImagePath(card.number)} alt={card.name} />
                <span className="tooltip">{`${celticCrossPositionMeanings[index + 3]}: ${card.name}`}</span>
              </div>
            ))}
          </div>

          {/* Right Column Wrapper */}
          <div className="right-column">
            {cards.slice(6, 10).map((card, index) => (
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
          {cards.map((card, index) => (
            <div key={index} className="card">
              <img src={getImagePath(card.number)} alt={card.name} />
              <span className="tooltip">{card.name}</span>
            </div>
          ))}
        </div>
      );
    }
  };

  return renderCardLayout();
};

export default CardDisplay;
