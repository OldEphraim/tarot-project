import React from "react";
import { Box, CircularProgress } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { useGenerateImage } from "../../hooks/useGenerateImages";
import { useProfilePicture } from "../../hooks/useProfilePicture";
import CardAndThemeSelector from "../CardAndThemeSelector";
import ImageGenerationButtons from "../ImageGenerationButtons";
import "../../components/Modal.css";

const ChangeProfilePictureModal = () => {
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
    setGeneratedPicture,
    spinnerRef,
  } = useGenerateImage();
  const { isSaved, handleSaveProfilePicture } =
    useProfilePicture(setGeneratedPicture);

  return (
    <>
      <h2 style={{ color: "black" }} className="profile-picture-header">
        Generate New Profile Picture
      </h2>
      <div className="profile-picture-preview">
        {user.profile_picture && isSaved.length === 0 && (
          <>
            <div className="profile-picture-flexbox">
              <img
                src={user.profile_picture}
                alt="Current Profile"
                className="profile-picture-dual"
              />
              <div
                className={`profile-picture-placeholder ${
                  isPictureReady ? "border-none" : "border-dashed"
                }`}
              >
                {!isPictureReady && !isGenerating && (
                  <p>New Profile Picture Preview</p>
                )}
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
                    className="profile-picture-dual"
                  />
                )}
              </div>
            </div>
          </>
        )}
        {!user.profile_picture && isSaved.length === 0 && (
          <div
            className={`profile-picture-placeholder ${
              isPictureReady ? "border-none" : "border-dashed"
            }`}
          >
            {!isPictureReady && !isGenerating && <p>No Profile Picture</p>}
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
        )}
        {isSaved.length === 2 && (
          <img
            src={user.profile_picture}
            alt="New Profile"
            className="profile-picture-dual"
          />
        )}
      </div>
      <CardAndThemeSelector
        selectedCard={selectedCard}
        selectedTheme={selectedTheme}
        handleCardChange={handleCardChange}
        handleThemeChange={handleThemeChange}
        whatIsThis={"profile picture can"}
      />
      {isSaved.length === 2 ? (
        <p style={{ color: isSaved[1], fontWeight: "bold", marginTop: "20px" }}>
          {isSaved[0]}
        </p>
      ) : (
        <ImageGenerationButtons
          isGenerating={isGenerating}
          isPictureReady={isPictureReady}
          selectedCard={selectedCard}
          selectedTheme={selectedTheme}
          handleGeneratePicture={handleGeneratePicture}
          uniqueButton="Save New Profile Picture"
          uniqueAction={() => handleSaveProfilePicture(generatedPicture)}
        />
      )}
    </>
  );
};

export default ChangeProfilePictureModal;
