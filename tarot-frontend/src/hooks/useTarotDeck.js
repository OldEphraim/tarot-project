import { useEffect, useState, useRef } from "react";
import { readTarotDeck } from "../services/tarotService";

export const useTarotDeck = () => {
  const [deck, setDeck] = useState(null);
  const [error, setError] = useState(null);
  const hasFetchedDeck = useRef(false);

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const deckData = await readTarotDeck();
        setDeck(deckData);
      } catch (err) {
        console.error("Failed to fetch tarot deck:", err);
        setError("Failed to load tarot deck.");
      }
    };

    if (!hasFetchedDeck.current) {
      hasFetchedDeck.current = true;
      fetchDeck();
    }
  }, []);

  return { deck, error };
};
