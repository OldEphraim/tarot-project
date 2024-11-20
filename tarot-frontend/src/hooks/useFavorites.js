import { useCallback, useEffect, useRef, useState } from "react";
import { getSavedImage, deleteFavoriteById } from "../services/profileService";

export const useFavorites = (user, cardName = null) => {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);
  const hasFetchedFavorites = useRef(false);

  const fetchFavorites = useCallback(async () => {
    try {
      const favoriteData = await getSavedImage(user);
      if (cardName) {
        setFavorites(favoriteData.filter((item) => item.CardName === cardName));
      } else {
        setFavorites(favoriteData);
      }
    } catch (error) {
      console.error("Failed to fetch favorites:", error);
      setError("Failed to fetch favorites.");
    }
  }, [user, cardName]);

  useEffect(() => {
    if (user && !hasFetchedFavorites.current) {
      hasFetchedFavorites.current = true;
      fetchFavorites();
    }
  }, [user, cardName, fetchFavorites]);

  const deleteFavorite = async (id) => {
    try {
      await deleteFavoriteById(user, id);
      fetchFavorites();
    } catch (error) {
      console.error("Failed to delete favorite:", error);
      setError("Failed to delete favorite.");
    }
  };

  return { favorites, error, fetchFavorites, deleteFavorite };
};
