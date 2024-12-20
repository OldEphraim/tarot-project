import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useModal } from "../../context/ModalContext";
import { useTarot } from "../../context/TarotContext";
import { useFavorites } from "../../hooks/useFavorites";
import { handleSaveImage } from "../../services/profileService";
import { scrollToElement } from "../../utils/scrollToElement";
import "../../components/Modal.css";

const CardDetailModal = () => {
  const [hasSaved, setHasSaved] = useState(false);

  const { user, isAuthenticated } = useAuth();
  const { modalData, closeModal } = useModal();
  const { selectedSpread, workflow } = useTarot();
  const { favorites } = useFavorites(user, modalData.card.name);

  const isFavorite = favorites.some(
    (favorite) => favorite.ImageUrl === modalData.imageUrl
  );

  const handleSaveClick = async () => {
    try {
      await handleSaveImage(
        user,
        modalData.imageUrl,
        modalData.card.details.name,
        modalData.theme
      );
      setHasSaved(true);
    } catch (error) {
      console.error("Error saving profile picture to saved images", error);
    }
  };

  return (
    <>
      <div className="modal-header">
        <h2 className="card-name">{modalData.card.name}</h2>
        <p className="emoji-style">{modalData.card.details.emoji}</p>
        <p className="art-style">
          {modalData.imageUrl === undefined &&
            "You should have seen this card "}
          in{" "}
          {modalData.theme === "Rider-Waite"
            ? "the classic Rider-Waite"
            : `an AI-generated ${modalData.theme}`}{" "}
          style
          {modalData.imageUrl === undefined &&
            ". Unfortunately, you encountered an error in generating the image."}
        </p>
      </div>
      <img
        className="card-detail"
        src={
          modalData.imageUrl ? modalData.imageUrl : "/tarot-images/error.webp"
        }
        alt={modalData.card.name}
      />
      {modalData.position !== "" && modalData.positionMeaning !== "" ? (
        <>
          {" "}
          <p className="art-style">
            You drew{" "}
            {modalData.card.arcana === "Minor Arcana" ||
            modalData.card.name === "Wheel of Fortune"
              ? "the"
              : ""}{" "}
            {modalData.card.name}
            {selectedSpread !== "One" && workflow !== "fortuneteller"
              ? ` in the ${modalData.positionMeaning.text} position.`
              : "."}
            {hasSaved && (
              <strong>{" This image has been saved to your favorites."}</strong>
            )}
            {isFavorite &&
              "This image has already been saved to your favorites."}
          </p>
          <div>
            <button
              className="spooky-button"
              onClick={() => {
                scrollToElement(`explanation-text-${modalData.position}`);
                closeModal();
              }}
            >
              See Explanation
            </button>
            {!isFavorite && !hasSaved && isAuthenticated && (
              <button
                className="spooky-button"
                onClick={() => handleSaveClick()}
              >
                Save to Favorites
              </button>
            )}
          </div>{" "}
        </>
      ) : (
        <>
          {modalData.positionMeaning !== "specific" ? (
            <div>
              <Link
                to={`/tarot/cards/${modalData.card.details.name}`}
                style={{ textDecoration: "none" }}
              >
                <button className="spooky-button">See More Card Details</button>
              </Link>
              <button className="spooky-button" onClick={closeModal}>
                Close Modal
              </button>
            </div>
          ) : (
            <div style={{ marginBottom: "60px" }}></div>
          )}
        </>
      )}
    </>
  );
};

export default CardDetailModal;
