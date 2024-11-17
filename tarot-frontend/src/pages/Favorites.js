import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getSavedImage } from "../services/profileService";
import "./Favorites.css";

const Favorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data = await getSavedImage(user); // Call preexisting function with user
        setFavorites(data);
      } catch (error) {
        console.error("Failed to fetch favorites:", error);
      }
    };

    if (user) {
      fetchFavorites();
    }
  }, [user]); // Only run effect when user changes

  return (
    <div className="favorites-container">
      <h1>Your Favorites</h1>
      <div className="favorites-grid">
        {favorites.map((favorite, index) => (
          <div key={index} className="favorite-item">
            <img src={favorite.image_url} alt={favorite.card_name} />
            <p>{favorite.card_name}</p>
            <p>{favorite.art_style}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
