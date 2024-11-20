import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useModal } from "../context/ModalContext";
import { getSavedImage, deleteFavoriteById } from "../services/profileService";
import { readTarotDeck } from "../services/tarotService";
import { setAsProfilePicture } from "../utils/updateProfilePicture";
import Modal from "../components/Modal";
import "./Favorites.css";

const Favorites = () => {
  const { user, setUser } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [deck, setDeck] = useState(null);
  const [error, setError] = useState(null);

  const { isModalOpen, setIsModalOpen, openModal } = useModal();

  const hasFetchedFavorites = useRef(false);
  const hasFetchedDeck = useRef(false);

  const handleDeleteFavorite = async (id) => {
    try {
      await deleteFavoriteById(user, id);
      const updatedFavorites = await getSavedImage(user);
      setFavorites(updatedFavorites);
    } catch (error) {
      console.error("Failed to delete favorite:", error);
      alert("Failed to delete favorite. Please try again.");
    }
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoriteData = await getSavedImage(user);
        console.log(favoriteData);
        setFavorites(favoriteData);
      } catch (error) {
        console.error("Failed to fetch favorites:", error);
        setError("Failed to fetch favorites.");
      }
    };

    if (user && !hasFetchedFavorites.current) {
      hasFetchedFavorites.current = true;
      fetchFavorites();
    }
  }, [hasFetchedFavorites, favorites, user]);

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const deckData = await readTarotDeck(); // Fetch deck details
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
  }, [hasFetchedDeck, deck]);

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

  const handleCardDetailsClick = (
    card,
    imageUrl,
    position,
    positionMeaning,
    theme
  ) => {
    openModal("cardDetail", {
      card,
      imageUrl,
      position,
      positionMeaning,
      theme,
    });
  };

  return (
    <>
      <div className="favorites-container">
        <h1 className="favorites-header">Your Favorites</h1>
        {favorites.length > 0 ? (
          <div className="favorites-grid">
            {favorites.map((favorite, index) => {
              const cardDetails = getCardDetails(favorite.CardName);
              return (
                <div key={index} className="favorite-item">
                  <img src={favorite.ImageUrl} alt={favorite.CardName} />
                  <p className="favorite-label">{cardDetails?.name} </p>
                  <p className="emoji-label">
                    {<span>{cardDetails?.details.emoji}</span>}
                  </p>
                  <p className="favorite-art-style">{favorite.ArtStyle}</p>
                  <div className="button-container">
                    <button className="spooky-button">
                      <Link
                        to={`/${user.username}/favorites/${favorite.ID}`}
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          display: "block",
                        }}
                      >
                        Journal Entry
                      </Link>
                    </button>
                    {cardDetails && (
                      <button
                        className="spooky-button"
                        onClick={() =>
                          handleCardDetailsClick(
                            cardDetails,
                            favorite.ImageUrl,
                            "",
                            "",
                            favorite.ArtStyle
                          )
                        }
                      >
                        Card Details
                      </button>
                    )}
                    <button
                      className="spooky-button"
                      onClick={() =>
                        setAsProfilePicture(user, setUser, favorite.ImageUrl)
                      }
                    >
                      Set As Profile Picture
                    </button>
                    <button
                      className="spooky-button"
                      onClick={() => handleDeleteFavorite(favorite.ID)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p>No favorites saved yet.</p>
        )}
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default Favorites;
