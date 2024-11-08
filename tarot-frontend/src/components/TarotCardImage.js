import React from 'react';

const TarotCardImage = ({ card, imageUrl, position, positionMeaning, theme, openModal }) => {
  const handleClick = () => {
    openModal({ card, imageUrl, position, positionMeaning, theme });
  };

  return (
    <div onClick={handleClick}>
      {imageUrl ? <img src={imageUrl} alt={card.name} /> : <p>Loading image...</p>}
    </div>
  );
};

export default TarotCardImage;