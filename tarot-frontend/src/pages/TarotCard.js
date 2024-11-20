import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useModal } from "../context/ModalContext";
import { getSavedImage } from "../services/profileService";
import { searchCardByName } from "../services/tarotService";
import { setAsProfilePicture } from "../utils/updateProfilePicture";
import Modal from "../components/Modal";
import "./TarotCard.css";

const TarotCard = () => {
  const [card, setCard] = useState(null);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const { user, setUser } = useAuth();
  const { cardName } = useParams();
  const { isModalOpen, setIsModalOpen, openModal } = useModal();

  const hasFetchedFavorites = useRef(false);

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

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const cardData = await searchCardByName(cardName);
        setCard(cardData);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCard();
  }, [cardName]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoriteData = await getSavedImage(user);
        console.log("Raw favorite data:", favoriteData);

        // Filter favoriteData to include only items with matching CardName
        const filteredFavorites = favoriteData.filter(
          (item) => item.CardName === cardName
        );

        console.log("Filtered favorites:", filteredFavorites);
        setFavorites(filteredFavorites);
      } catch (error) {
        console.error("Failed to fetch favorites:", error);
        setError("Failed to fetch favorites.");
      }
    };

    if (user && !hasFetchedFavorites.current) {
      hasFetchedFavorites.current = true;
      fetchFavorites();
    }
  }, [hasFetchedFavorites, favorites, user, cardName]);

  if (error) {
    return <h2>{error}</h2>;
  }

  if (!card) {
    return <h2>Loading...</h2>;
  }

  const getImagePath = (number) => {
    const imageFileName = `/tarot-images/card_${number}.jpg`;
    return imageFileName;
  };

  return (
    <>
      <div className="tarot-card-page">
        <h1>{card.name}</h1>
        <div className="tarot-card">
          <img src={getImagePath(card.number)} alt={card.name} />
        </div>
        <div className="emoji">{card.details.emoji}</div>
        <p>{card.details.summary}</p>
        <p>{card.details.relationships}</p>
        <p>{card.details.career}</p>
        <p>{card.details.reversed}</p>
      </div>
      <div className="specific-favorites-container">
        <h1 className="specific-favorites-header">Your Favorites</h1>
        {favorites.length > 0 ? (
          <div className="specific-favorites-grid">
            {favorites.map((favorite, index) => {
              return (
                <div key={index} className="favorite-item">
                  <img src={favorite.ImageUrl} alt={favorite.CardName} />
                  <p className="favorite-label">{card.name} </p>
                  <p className="emoji-label">
                    {<span>{card.details.emoji}</span>}
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
                    <button
                      className="spooky-button"
                      onClick={() =>
                        handleCardDetailsClick(
                          card,
                          favorite.ImageUrl,
                          "",
                          "specific",
                          favorite.ArtStyle
                        )
                      }
                    >
                      Card Details
                    </button>
                    <button
                      className="spooky-button"
                      onClick={() =>
                        setAsProfilePicture(user, setUser, favorite.ImageUrl)
                      }
                    >
                      Set As Profile Picture
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

export default TarotCard;
