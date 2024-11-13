import { useEffect, useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useTarot } from "../context/TarotContext";
import { getCardAtPositionExplanation } from "../services/openaiService";
import celticCrossPositionMeanings from "../constants/CelticCrossPositionMeanings";
import elementalSpreadPositionMeanings from "../constants/ElementalSpreadPositionMeanings";

export const useCardExplanations = (cards, currentCardIndex, skipAnimation) => {
  const [explanationTexts, setExplanationTexts] = useState([]);
  const explanationsFetched = useRef(new Set());

  const { username } = useAuth();
  const { selectedSpread, userReason } = useTarot();

  useEffect(() => {
    const fetchExplanations = async () => {
      const newExplanations = [];

      const endIndex = skipAnimation ? cards.length : currentCardIndex;

      for (let i = 0; i < endIndex; i++) {
        const card = cards[i];
        let esmeraldaFormattedMeaning;
        let meaning;
        if (selectedSpread === "Celtic Cross") {
          esmeraldaFormattedMeaning =
            " in the position " + celticCrossPositionMeanings[i + 1].text;
          meaning = celticCrossPositionMeanings[i + 1].text;
        } else if (selectedSpread === "Five") {
          esmeraldaFormattedMeaning =
            " in the " +
            elementalSpreadPositionMeanings[i + 1].text +
            " element";
          meaning = elementalSpreadPositionMeanings[i + 1].text;
        } else {
          esmeraldaFormattedMeaning = "";
          meaning = i;
        }
        const explanationKey = `${card.name}-${meaning}`;

        if (!explanationsFetched.current.has(explanationKey)) {
          explanationsFetched.current.add(explanationKey);
          const explanation = await getCardAtPositionExplanation(
            card.name,
            esmeraldaFormattedMeaning,
            username,
            userReason
          );
          newExplanations.push(`${meaning}: ${explanation}`);
        }
      }

      if (newExplanations.length > 0) {
        setExplanationTexts((prevTexts) => [...prevTexts, ...newExplanations]);
      }
    };

    fetchExplanations();
  }, [
    cards,
    currentCardIndex,
    skipAnimation,
    selectedSpread,
    userReason,
    username,
  ]);

  return { explanationTexts };
};
