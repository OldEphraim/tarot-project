import React, { useEffect, useRef, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import tarotCards from "../../constants/TarotCards";
import tarotThemes from "../../constants/TarotThemes";
import { useAuth } from "../../context/AuthContext";
import { searchCardByName } from "../../services/tarotService";
import {
  saveProfileChanges,
  handleSaveImage,
} from "../../services/profileService";
import { useCardImages } from "../../hooks/useCardImages";
import "../../components/Modal.css";

const ChangeProfilePictureModal = ({ handleClose }) => {
  const { user, setUser } = useAuth();

  const [selectedCard, setSelectedCard] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("");
  const [cardObject, setCardObject] = useState(null); // Holds the formatted card object
  const [isGenerating, setIsGenerating] = useState(false); // Tracks generation state
  const [generatedPicture, setGeneratedPicture] = useState([]);
  const [shouldFetchImages, setShouldFetchImages] = useState(false); // Control when to fetch images
  const [shouldClearRequests, setShouldClearRequests] = useState(false);
  const [isSaved, setIsSaved] = useState([]);

  const spinnerRef = useRef(null);

  // Use the custom hook conditionally
  const { imageRequests } = useCardImages(
    shouldFetchImages ? [cardObject] : [],
    shouldFetchImages ? selectedTheme : null,
    shouldClearRequests
  );

  useEffect(() => {
    let loadTimeout;

    if (generatedPicture.length === 0) {
      loadTimeout = setTimeout(() => {
        if (spinnerRef.current) {
          setGeneratedPicture(["/tarot-images/error.webp", "error", "Error"]);
        }
      }, 120000);

      return () => clearTimeout(loadTimeout);
    }
  }, [generatedPicture]);

  const handleSaveProfilePicture = async () => {
    try {
      // Save the generated picture (implement API logic as needed)
      const updatedUser = {
        ...user,
        profile_picture: generatedPicture[0], // Assuming this is the URL of the generated image
      };
      await saveProfileChanges(updatedUser); // Save changes via backend
      setUser(updatedUser); // Update frontend state
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

  // Handle card selection
  const handleCardChange = async (e) => {
    const cardName = e.target.value;
    setSelectedCard(cardName);

    if (cardName) {
      try {
        const card = await searchCardByName(formatCardName(cardName)); // Fetch card object
        setCardObject(card);
      } catch (error) {
        console.error("Failed to fetch card data:", error);
      }
    } else {
      setCardObject(null);
    }
  };

  // Handle theme selection
  const handleThemeChange = (e) => {
    setSelectedTheme(e.target.value);
  };

  // Handle profile picture generation
  const handleGeneratePicture = () => {
    // Clear previous requests before generating a new one
    setShouldClearRequests(true); // Trigger clear in the hook
    setTimeout(() => {
      setIsGenerating(true);
      setShouldFetchImages(true); // Start fetching images
      setShouldClearRequests(false); // Reset the clear flag
    }, 0); // Allow state to reset before fetching
  };

  useEffect(() => {
    if (
      cardObject &&
      imageRequests[cardObject.name] &&
      imageRequests[cardObject.name].status === "ready"
    ) {
      setGeneratedPicture([
        imageRequests[cardObject.name].url,
        formatCardName(cardObject.name),
        selectedTheme,
      ]);
      setIsGenerating(false);
      setShouldFetchImages(false); // Reset fetch state
    }
  }, [imageRequests, cardObject, selectedCard, selectedTheme]);

  const formatCardName = (cardName) => {
    // Remove "The" from the start of the card name (case-insensitive)
    const withoutThe = cardName.replace(/^The\s+/i, "");
    // Split into words and format accordingly
    const words = withoutThe.split(" ");
    return words
      .map(
        (word, index) =>
          index === 0
            ? word.toLowerCase() // First word in lowercase
            : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() // Others capitalized
      )
      .join(""); // Join without spaces
  };

  const isProfilePictureReady = generatedPicture.length > 0;

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
                  isProfilePictureReady ? "border-none" : "border-dashed"
                }`}
              >
                {!isProfilePictureReady && !isGenerating && (
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
                {isProfilePictureReady && !isGenerating && (
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
              isProfilePictureReady ? "border-none" : "border-dashed"
            }`}
          >
            {!isProfilePictureReady && !isGenerating && (
              <p>No Profile Picture</p>
            )}
            {isGenerating && (
              <Box
                ref={spinnerRef}
                sx={{ display: "flex", pointerEvents: "none" }}
              >
                <CircularProgress color="inherit" />
              </Box>
            )}
            {isProfilePictureReady && !isGenerating && (
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
          <div className="button-container">
            <div className="button-container">
              {/* Case 1: Generating is in progress */}
              {isGenerating && (
                <button className="spooky-button" disabled>
                  Generating...
                </button>
              )}

              {/* Case 2: Profile picture is ready */}
              {!isGenerating && isProfilePictureReady && (
                <>
                  <button
                    onClick={handleSaveProfilePicture}
                    className="spooky-button"
                  >
                    Save New Profile Picture
                  </button>
                  <button
                    onClick={handleGeneratePicture}
                    className="spooky-button"
                    disabled={selectedCard === "" || selectedTheme === ""}
                  >
                    Generate New Picture
                  </button>
                </>
              )}

              {/* Case 3: Ready to generate picture */}
              {!isGenerating && !isProfilePictureReady && (
                <button
                  onClick={handleGeneratePicture}
                  className="spooky-button"
                  disabled={selectedCard === "" || selectedTheme === ""} // Disable if inputs are incomplete
                >
                  Generate Picture
                </button>
              )}
            </div>

            <div className="button-container">
              <button onClick={handleClose} className="spooky-button">
                Go Back
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ChangeProfilePictureModal;
