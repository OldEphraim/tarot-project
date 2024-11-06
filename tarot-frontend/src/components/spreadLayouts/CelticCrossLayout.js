import React from 'react';
import TarotCardImage from '../TarotCardImage';
import celticCrossPositionMeanings from '../../constants/CelticCrossPositionMeanings';

const CelticCrossLayout = ({ cards, imageRequests, currentCardIndex }) => {
  const isVisible = (index) => index < currentCardIndex;

  return (
    <div className="card-display">
      <div className="cross-wrapper">
        {cards.slice(0, 6).map((card, index) => (
          <div
            key={index}
            className={`card position-${index + 1} ${isVisible(index) ? 'visible' : ''}`}
          >
            <TarotCardImage card={card} imageUrl={imageRequests[card.name]?.url} />
            <span className="tooltip">{`${celticCrossPositionMeanings[index + 1]}: ${card.name}`}</span>
          </div>
        ))}
      </div>
      <div className="right-column">
        {cards.slice(6, 10).map((card, index) => (
          <div
            key={index}
            className={`card position-${index + 7} ${isVisible(index + 6) ? 'visible' : ''}`}
          >
            <TarotCardImage card={card} imageUrl={imageRequests[card.name]?.url} />
            <span className="tooltip">{`${celticCrossPositionMeanings[index + 7]}: ${card.name}`}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CelticCrossLayout;