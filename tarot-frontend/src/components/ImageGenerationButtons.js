import React from "react";
import { useModal } from "../context/ModalContext";

const ImageGenerationButtons = ({
  selectedCard,
  selectedTheme,
  isGenerating,
  isPictureReady,
  handleGeneratePicture,
  uniqueButton,
  uniqueAction,
}) => {
  const { closeModal } = useModal();
  return (
    <div className="button-container" style={{ margin: "20px" }}>
      {isGenerating && (
        <button className="spooky-button modal-button" disabled>
          Generating...
        </button>
      )}
      {!isGenerating && isPictureReady && (
        <>
          <button onClick={uniqueAction} className="spooky-button modal-button">
            {uniqueButton}
          </button>
          <button
            onClick={handleGeneratePicture}
            className="spooky-button modal-button"
            disabled={selectedCard === "" || selectedTheme === ""}
          >
            Generate New Picture
          </button>
        </>
      )}
      {!isGenerating && !isPictureReady && (
        <button
          onClick={handleGeneratePicture}
          className="spooky-button modal-button"
          disabled={selectedCard === "" || selectedTheme === ""}
          style={{ margin: "10px" }}
        >
          Generate Picture
        </button>
      )}
      <button onClick={closeModal} className="spooky-button modal-button">
        Go Back
      </button>
    </div>
  );
};

export default ImageGenerationButtons;
