import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import tarotCards from "../../constants/TarotCards";
import tarotThemes from "../../constants/TarotThemes";
import { useAuth } from "../../context/AuthContext";
import { handleSaveImage } from "../../services/profileService";
import { useGenerateImage } from "../../hooks/useGenerateImages";
import "../../components/Modal.css";

const JournalEntryModal = ({ handleClose }) => {
  const { user } = useAuth();

  const {
    selectedCard,
    selectedTheme,
    generatedPicture,
    isGenerating,
    isPictureReady,
    handleCardChange,
    handleThemeChange,
    handleGeneratePicture,
    spinnerRef,
  } = useGenerateImage();

  const navigate = useNavigate();

  const handleStartJournalEntry = async () => {
    try {
      const response = await handleSaveImage(
        user,
        generatedPicture[0],
        generatedPicture[1],
        generatedPicture[2]
      );
      navigate(`/${user.username}/favorites/${response.id}`);
    } catch (error) {
      console.error("Error saving profile picture to saved images", error);
    }
  };

  return (
    <>
      <h2 style={{ color: "black" }} className="profile-picture-header">
        Generate New Journal Entry
      </h2>

      <div className="profile-picture-preview">
        <div
          className={`profile-picture-placeholder ${
            isPictureReady ? "border-none" : "border-dashed"
          }`}
        >
          {!isPictureReady && !isGenerating && <p>No Image Generated</p>}
          {isGenerating && (
            <Box
              ref={spinnerRef}
              sx={{ display: "flex", pointerEvents: "none" }}
            >
              <CircularProgress color="inherit" />
            </Box>
          )}
          {isPictureReady && !isGenerating && (
            <img
              src={generatedPicture[0]}
              alt="New Profile"
              className="profile-picture"
            />
          )}
        </div>
      </div>

      <p style={{ color: "black" }}>
        Your journal entry's header will be a{" "}
        <select
          value={selectedCard}
          onChange={handleCardChange}
          className="dropdown"
        >
          <option value="">Select a Card</option>
          {tarotCards.map((card, index) => (
            <option key={index} value={card}>
              {card}
            </option>
          ))}
        </select>{" "}
        in the{" "}
        <select
          value={selectedTheme}
          onChange={handleThemeChange}
          className="dropdown"
        >
          <option value="">Select a Theme</option>
          {tarotThemes.map((theme, index) => (
            <option key={index} value={theme}>
              {theme}
            </option>
          ))}
        </select>{" "}
        style.
      </p>

      <div className="button-container" style={{ margin: "20px" }}>
        {/* Case 1: Generating is in progress */}
        {isGenerating && (
          <button
            className="spooky-button modal-button"
            disabled
            style={{ margin: "10px" }}
          >
            Generating...
          </button>
        )}

        {/* Case 2: Profile picture is ready */}
        {!isGenerating && isPictureReady && (
          <>
            <button
              onClick={handleStartJournalEntry}
              className="spooky-button modal-button"
              style={{ margin: "10px" }}
            >
              Begin New Journal Entry
            </button>
            <button
              onClick={handleGeneratePicture}
              className="spooky-button modal-button"
              disabled={selectedCard === "" || selectedTheme === ""}
              style={{ margin: "10px" }}
            >
              Generate New Picture
            </button>
          </>
        )}

        {/* Case 3: Ready to generate picture */}
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

        <button
          onClick={handleClose}
          className="spooky-button modal-button"
          style={{ margin: "10px" }}
        >
          Go Back
        </button>
      </div>
    </>
  );
};

export default JournalEntryModal;
