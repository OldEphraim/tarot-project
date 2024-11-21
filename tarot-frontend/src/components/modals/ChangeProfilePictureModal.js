import React, { useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import tarotCards from "../../constants/TarotCards";
import tarotThemes from "../../constants/TarotThemes";
import { useAuth } from "../../context/AuthContext";
import {
  saveProfileChanges,
  handleSaveImage,
} from "../../services/profileService";
import { useCardDetails } from "../../hooks/useCardDetails";
import { useGenerateImage } from "../../hooks/useGenerateImages";
import { formatCardName } from "../../utils/formatCardName";
import "../../components/Modal.css";

const ChangeProfilePictureModal = ({ handleClose }) => {
  const { user, setUser } = useAuth();
  const {
    selectedCard,
    selectedTheme,
    generatedPicture,
    isGenerating,
    isPictureReady,
    handleCardChange,
    handleThemeChange,
    handleGeneratePicture,
    setGeneratedPicture,
    spinnerRef,
  } = useGenerateImage();
  const { card } = useCardDetails(formatCardName(selectedCard));

  const [isSaved, setIsSaved] = useState([]);

  const handleSaveProfilePicture = async () => {
    try {
      const updatedUser = {
        ...user,
        profile_picture: generatedPicture[0],
      };
      await saveProfileChanges(updatedUser);
      setUser(updatedUser);
      setIsSaved(["Profile picture saved successfully!", "green"]);
      setGeneratedPicture([]);
      try {
        await handleSaveImage(
          user,
          generatedPicture[0],
          generatedPicture[1],
          generatedPicture[2]
        );
      } catch (error) {
        console.error("Error saving profile picture to saved images", error);
      }
    } catch (error) {
      console.error("Error saving profile picture:", error);
      setIsSaved(["Failed to save profile picture. Please try again.", "red"]);
    }
  };

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

      <p style={{ color: "black" }}>
        Your profile picture can be{" "}
        {card?.arcana === "Minor Arcana" || card?.name === "Wheel of Fortune"
          ? "the "
          : ""}
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

      {isSaved.length === 2 ? (
        <p style={{ color: isSaved[1], fontWeight: "bold", marginTop: "20px" }}>
          {isSaved[0]}
        </p>
      ) : (
        <>
          <div className="button-container" style={{ margin: "20px" }}>
            {/* Case 1: Generating is in progress */}
            {isGenerating && (
              <button className="spooky-button modal-button" disabled>
                Generating...
              </button>
            )}

            {/* Case 2: Profile picture is ready */}
            {!isGenerating && isPictureReady && (
              <>
                <button
                  onClick={handleSaveProfilePicture}
                  className="spooky-button modal-button"
                >
                  Save New Profile Picture
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
            >
              Go Back
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default ChangeProfilePictureModal;
