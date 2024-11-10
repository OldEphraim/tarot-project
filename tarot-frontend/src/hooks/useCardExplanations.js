import { useEffect, useState, useRef } from "react";
import { getCardAtPositionExplanation } from "../services/openaiService";
import celticCrossPositionMeanings from "../constants/CelticCrossPositionMeanings";

export const useCardExplanations = (cards, currentCardIndex, skipAnimation) => {
  const [explanationTexts, setExplanationTexts] = useState([]);
  const explanationsFetched = useRef(new Set());

  useEffect(() => {
    const fetchExplanations = async () => {
      const newExplanations = [];

      const endIndex = skipAnimation ? cards.length : currentCardIndex;

      for (let i = 0; i < endIndex; i++) {
        const card = cards[i];
        const meaning = celticCrossPositionMeanings[i + 1];
        const explanationKey = `${card.name}-${meaning}`;

        if (!explanationsFetched.current.has(explanationKey)) {
          explanationsFetched.current.add(explanationKey);
          const explanation = await getCardAtPositionExplanation(
            card.name,
            meaning,
          );
          newExplanations.push(`${meaning}: ${explanation}`);
        }
      }

      if (newExplanations.length > 0) {
        setExplanationTexts((prevTexts) => [...prevTexts, ...newExplanations]);
      }
    };

    fetchExplanations();
  }, [cards, currentCardIndex, skipAnimation]);

  return { explanationTexts };
};
