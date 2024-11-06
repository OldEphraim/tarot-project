import React from 'react';
import TarotCardImage from '../TarotCardImage';

const RowLayout = ({ cards, imageRequests, currentCardIndex, selectedSpread }) => {
  const isVisible = (index) => index < currentCardIndex;

  return (
    <div className={`card-display row-layout ${selectedSpread}`}>
      {cards.map((card, index) => (
        <div key={index} className={`card ${isVisible(index) ? 'visible' : ''}`}>
          <TarotCardImage card={card} imageUrl={imageRequests[card.name]?.url} />
          <span className="tooltip">{card.name}</span>
        </div>
      ))}
    </div>
  );
};

export default RowLayout;