import React from 'react';
import TarotCardImage from '../TarotCardImage';
import celticCrossPositionMeanings from '../../constants/CelticCrossPositionMeanings';

const RowLayout = ({ cards, imageRequests, currentCardIndex, selectedSpread }) => {
  const isVisible = (index) => index < currentCardIndex;

  return (
    <div className={`card-display row-layout ${selectedSpread}`}>
      {cards.map((card, index) => (
        <div key={index} className={`card ${isVisible(index) ? 'visible' : ''}`}>
          <TarotCardImage card={card} imageUrl={imageRequests[card.name]?.url} position={index} positionMeaning={celticCrossPositionMeanings[index + 1]} theme="Rider-Waite" />
        </div>
      ))}
    </div>
  );
};

export default RowLayout;