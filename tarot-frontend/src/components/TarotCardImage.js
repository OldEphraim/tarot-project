import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const TarotCardImage = ({ card, imageUrl, position, positionMeaning, theme, openModal }) => {
  const handleClick = () => {
    openModal({ card, imageUrl, position, positionMeaning, theme });
  };

  return (
    <div onClick={handleClick}>
      {imageUrl ? <img src={imageUrl} alt={card.name} /> : <Box sx={{display: 'flex'}}><CircularProgress color="inherit" /></Box>}
    </div>
  );
};

export default TarotCardImage;