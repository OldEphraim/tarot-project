import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useModal } from "../../context/ModalContext";
import { useTarot } from "../../context/TarotContext";
import "../../components/Modal.css";
import { getSavedImage, handleSaveImage } from "../../services/profileService";

const CardDetailModal = ({ setFadeOut }) => {
  const [hasSaved, setHasSaved] = useState(false);
  const [isFavorite, setIsFavored] = useState(false);

  const hasFetchedFavorites = useRef(false);

  const { user } = useAuth();
  const { modalData } = useModal();
  const { selectedSpread, workflow } = useTarot();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoriteData = await getSavedImage(user);
        console.log(favoriteData);

        const isImageAlreadyFavorite = favoriteData.some(
          (favorite) => favorite.ImageUrl === modalData.imageUrl
        );

        if (isImageAlreadyFavorite) {
          setIsFavored(true);
        } else {
          setIsFavored(false);
        }
      } catch (error) {
        console.error("Failed to fetch favorites:", error);
      }
    };

    if (user && !hasFetchedFavorites.current) {
      hasFetchedFavorites.current = true;
      fetchFavorites();
    }
  });

  const handleScrollToExplanation = () => {
    const targetElement = document.getElementById(
      `explanation-text-${modalData.position}`
    );
    if (targetElement) {
      const yOffset = -70;
      const yPosition =
        targetElement.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;
      window.scrollTo({ top: yPosition, behavior: "smooth" });
    }
    setFadeOut(true);
  };

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
      {/* Header Section */}
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

      {/* Modal Body */}
      <img
        className="card-detail"
        src={
          modalData.imageUrl ? modalData.imageUrl : "/tarot-images/error.webp"
        }
        alt={modalData.card.name}
      />
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
        {isFavorite && "This image has already been saved to your favorites."}
      </p>
      <div>
        <button
          className="spooky-button"
          onClick={() => handleScrollToExplanation()}
        >
          See Explanation
        </button>
        {!isFavorite && (
          <button className="spooky-button" onClick={() => handleSaveClick()}>
            Save to Favorites
          </button>
        )}
      </div>
    </>
  );
};

export default CardDetailModal;
