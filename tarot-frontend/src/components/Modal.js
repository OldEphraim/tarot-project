import React, { useEffect, useState } from "react";
import { saveProfileChanges } from "../services/profileService";
import { useAuth } from "../context/AuthContext";
import { useModal } from "../context/ModalContext";
import { useTarot } from "../context/TarotContext";
import "./Modal.css";

const Modal = ({ onClose }) => {
  const [fadeOut, setFadeOut] = useState(false);

  const { user, setUser } = useAuth();
  const { modalType, modalData, closeModal } = useModal();
  const { selectedSpread, workflow } = useTarot();

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

  useEffect(() => {
    if (fadeOut) {
      const timer = setTimeout(onClose, 500);
      return () => clearTimeout(timer);
    }
  }, [fadeOut, onClose]);

  const handleClose = () => setFadeOut(true);

  const handleConfirm = async () => {
    setFadeOut(true); // Start fade-out effect
    const updatedUser = {
      ...user,
      email: modalData.email,
      username: modalData.username,
      art_style: modalData.artStyle,
    };

    try {
      await saveProfileChanges(updatedUser);
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  const renderModalContent = () => {
    console.log("rendering modal content", modalType, modalData);

    switch (modalType) {
      case "cardDetail":
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
              src={
                modalData.imageUrl
                  ? modalData.imageUrl
                  : "/tarot-images/error.webp"
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
            </p>
            <div>
              <button
                className="spooky-button"
                onClick={() => handleScrollToExplanation()}
              >
                See Explanation
              </button>
              <button
                className="spooky-button"
                onClick={() => alert("Saved to Favorites!")}
              >
                Save to Favorites
              </button>
            </div>
          </>
        );
      case "confirmChange":
        return (
          <>
            <h2>Are You Sure?</h2>
            <p>Your new settings will be:</p>
            <ul>
              <li>Email: {modalData.email}</li>
              <li>Username: {modalData.username}</li>
              <li>Art Style: {modalData.artStyle}</li>
            </ul>
            <button onClick={handleConfirm} className="spooky-button">
              I'm Sure
            </button>
            <button onClick={handleClose} className="spooky-button">
              I Changed My Mind
            </button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`modal-overlay ${fadeOut ? "fade-out" : ""}`}>
      <div className="modal-content">
        <button className="modal-close" onClick={handleClose}>
          X
        </button>
        {renderModalContent()}
      </div>
    </div>
  );
};

export default Modal;
