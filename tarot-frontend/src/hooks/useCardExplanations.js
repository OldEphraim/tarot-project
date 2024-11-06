import { useEffect, useState, useRef } from 'react';
import { getCardAtPositionExplanation } from '../services/openaiService';
import celticCrossPositionMeanings from '../constants/CelticCrossPositionMeanings';

export const useCardExplanations = (cards, currentCardIndex) => {
  const [explanationTexts, setExplanationTexts] = useState([]);
  const explanationsFetched = useRef(new Set());

  useEffect(() => {
    const fetchExplanations = async () => {
      const newExplanations = [];

      for (let i = 0; i < currentCardIndex; i++) {
        const card = cards[i];
        const meaning = celticCrossPositionMeanings[i + 1]; // Assuming position is 1-based
        const explanationKey = `${card.name}-${meaning}`;

        if (!explanationsFetched.current.has(explanationKey)) {
          explanationsFetched.current.add(explanationKey);
          const explanation = await getCardAtPositionExplanation(card.name, meaning);
          newExplanations.push(`${meaning}: ${explanation}`);
        }
      }

      if (newExplanations.length > 0) {
        setExplanationTexts((prevTexts) => [...prevTexts, ...newExplanations]);
      }
    };

    fetchExplanations();
  }, [cards, currentCardIndex]);

  return { explanationTexts };
};