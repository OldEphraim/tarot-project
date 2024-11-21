import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useModal } from "../context/ModalContext";
import { useFavorites } from "../hooks/useFavorites";
import { useTarotDeck } from "../hooks/useTarotDeck";
import { setAsProfilePicture } from "../utils/updateProfilePicture";
import Modal from "../components/Modal";
import "./Favorites.css";

const Favorites = () => {
  const { user, setUser } = useAuth();
  const { deck, error: deckError } = useTarotDeck();
  const {
    favorites,
    error: favoritesError,
    deleteFavorite,
  } = useFavorites(user);

  const { isModalOpen, openModal } = useModal();

  const combinedError = deckError || favoritesError;

  if (combinedError) {
    return <h2>{combinedError}</h2>;
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
                      onClick={() => deleteFavorite(favorite.ID)}
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
      {isModalOpen && <Modal />}
    </>
  );
};

export default Favorites;
