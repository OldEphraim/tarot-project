import React from 'react';

const TarotCardImage = ({ card, imageUrl }) => {
  return (
    <div>
      {imageUrl ? <img src={imageUrl} alt={card.name} /> : <p>Loading image...</p>}
    </div>
  );
};

export default TarotCardImage;