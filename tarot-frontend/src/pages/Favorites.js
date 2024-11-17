import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getSavedImage } from "../services/profileService";
import { readTarotDeck } from "../services/tarotService";
import "./Favorites.css";

const Favorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [deck, setDeck] = useState(null);
  const [error, setError] = useState(null);

  const hasFetchedFavorites = useRef(false);
  const hasFetchedDeck = useRef(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoriteData = await getSavedImage(user); // Fetch user's favorites
        setFavorites(favoriteData);
        console.log(favorites);
      } catch (error) {
        console.error("Failed to fetch favorites:", error);
        setError("Failed to fetch favorites.");
      }
    };

    if (user && !hasFetchedFavorites.current) {
      hasFetchedFavorites.current = true;
      fetchFavorites();
    }
  });

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const deckData = await readTarotDeck(); // Fetch deck details
        setDeck(deckData);
        console.log(deck);
      } catch (err) {
        console.error("Failed to fetch tarot deck:", err);
        setError("Failed to load tarot deck.");
      }
    };

    if (!hasFetchedDeck.current) {
      hasFetchedDeck.current = true;
      fetchDeck();
    }
  });

  if (error) {
    return <h2>{error}</h2>;
  }

  if (!deck || !favorites.length) {
    return <h2>Loading...</h2>;
  }

  const getCardDetails = (cardName) => {
    const card = deck.find((card) => card.details.name === cardName);
    return card ? card : null;
  };

  return (
    <div className="favorites-container">
      <h1>Your Favorites</h1>
      {favorites.length > 0 ? (
        <div className="favorites-grid">
          {favorites.map((favorite, index) => {
            const cardDetails = getCardDetails(favorite.CardName);
            console.log(cardDetails);
            return (
              <div key={index} className="favorite-item">
                <img src={favorite.ImageUrl} alt={favorite.CardName} />
                <p className="favorite-label">{cardDetails?.name} </p>
                <p className="emoji-label">
                  {<span>{cardDetails?.details.emoji}</span>}
                </p>
                <p className="favorite-art-style">{favorite.ArtStyle}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <p>No favorites saved yet.</p>
      )}
    </div>
  );
};

export default Favorites;
