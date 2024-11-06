import { useEffect, useState, useRef } from 'react';
import { getRandomTheme } from '../constants/TarotThemes';
import { generateCardImage, retrieveCardImage } from '../services/openaiService';

export const useCardImages = (cards, artStyle) => {
  const [imageRequests, setImageRequests] = useState({});
  const hasFetchedImages = useRef(false);

  useEffect(() => {
    if (!hasFetchedImages.current) {
      const fetchImages = async () => {
        const newImageRequests = {};

        for (const card of cards) {
          if (artStyle === 'Rider-Waite') {
            newImageRequests[card.name] = { status: 'ready', url: `/tarot-images/card_${card.number}.jpg` };
          } else if (artStyle === 'Random') {
            const theme = getRandomTheme();
            const requestId = await generateCardImage(theme, card.name);
            newImageRequests[card.name] = { requestId, status: 'pending' };
          }
        }

        setImageRequests(newImageRequests);
      };

      fetchImages();
      hasFetchedImages.current = true;
    }
  }, [artStyle, cards]);

  useEffect(() => {
    const pollForImages = async () => {
      const newImageRequests = { ...imageRequests };

      for (const [cardName, request] of Object.entries(imageRequests)) {
        if (request.status === 'pending') {
          const result = await retrieveCardImage(request.requestId);
          if (result.status === 'ready') {
            newImageRequests[cardName] = { status: 'ready', url: result.url };
          }
        }
      }

      setImageRequests(newImageRequests);
    };

    if (artStyle === 'Random' && Object.values(imageRequests).some(req => req.status === 'pending')) {
      const interval = setInterval(pollForImages, 3000);
      return () => clearInterval(interval);
    }
  }, [imageRequests, artStyle]);

  return { imageRequests };
};
