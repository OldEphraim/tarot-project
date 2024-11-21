import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { handleSaveImage } from "../../services/profileService";
import { useGenerateImage } from "../../hooks/useGenerateImages";
import CardAndThemeSelector from "../CardAndThemeSelector";
import ImageGenerationButtons from "../ImageGenerationButtons";
import "../../components/Modal.css";

const JournalEntryModal = () => {
  const { user } = useAuth();
  const {
    selectedCard,
    selectedTheme,
    generatedPicture,
    isGenerating,
    isPictureReady,
    handleGeneratePicture,
    handleCardChange,
    handleThemeChange,
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

      <CardAndThemeSelector
        selectedCard={selectedCard}
        selectedTheme={selectedTheme}
        handleCardChange={handleCardChange}
        handleThemeChange={handleThemeChange}
        whatIsThis={"journal entry's header will"}
      />

      <ImageGenerationButtons
        isGenerating={isGenerating}
        isPictureReady={isPictureReady}
        selectedCard={selectedCard}
        selectedtheme={selectedTheme}
        handleGeneratePicture={handleGeneratePicture}
        uniqueButton="Begin New Journal Entry"
        uniqueAction={handleStartJournalEntry}
      />
    </>
  );
};

export default JournalEntryModal;
