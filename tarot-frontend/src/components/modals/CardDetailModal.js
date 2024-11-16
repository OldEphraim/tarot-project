import React from "react";
import { useModal } from "../../context/ModalContext";
import { useTarot } from "../../context/TarotContext";
import "../../components/Modal.css";

const CardDetailModal = ({ setFadeOut }) => {
  const { modalData } = useModal();
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
};

export default CardDetailModal;
