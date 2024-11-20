import { useState, useEffect } from "react";
import { searchCardByName } from "../services/tarotService";

export const useCardDetails = (cardName) => {
  const [card, setCard] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCardDetails = async () => {
      if (!cardName) return;

      try {
        const cardData = await searchCardByName(cardName);
        setCard(cardData);
      } catch (err) {
        console.error("Failed to fetch card details:", err);
        setError("Failed to load card details.");
      }
    };

    fetchCardDetails();
  }, [cardName]);

  return { card, error };
};
