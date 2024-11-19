import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import tarotCards from "../../constants/TarotCards";
import tarotThemes from "../../constants/TarotThemes";
import { useAuth } from "../../context/AuthContext";
import { searchCardByName } from "../../services/tarotService";
import { handleSaveImage } from "../../services/profileService";
import { useCardImages } from "../../hooks/useCardImages";
import "../../components/Modal.css";

const JournalEntryModal = ({ handleClose }) => {
  const { user } = useAuth();

  const [selectedCard, setSelectedCard] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("");
  const [cardObject, setCardObject] = useState(null); // Holds the formatted card object
  const [isGenerating, setIsGenerating] = useState(false); // Tracks generation state
  const [generatedPicture, setGeneratedPicture] = useState([]);
  const [shouldFetchImages, setShouldFetchImages] = useState(false); // Control when to fetch images
  const [shouldClearRequests, setShouldClearRequests] = useState(false);

  const spinnerRef = useRef(null);
  const navigate = useNavigate();

  // Use the custom hook conditionally
  const { imageRequests } = useCardImages(
    shouldFetchImages ? [cardObject] : [],
    shouldFetchImages ? selectedTheme : null,
    shouldClearRequests
  );

  useEffect(() => {
    let loadTimeout;

    if (
      generatedPicture.length === 0 ||
      !generatedPicture[0].includes("images/")
    ) {
      loadTimeout = setTimeout(() => {
        if (spinnerRef.current) {
          setGeneratedPicture(["/tarot-images/error.webp", "error", "Error"]);
        }
      }, 120000);

      return () => clearTimeout(loadTimeout);
    }
  }, [generatedPicture]);

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

  // Handle picture generation
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

  const isPictureReady = generatedPicture.length > 0;

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

      <div className="button-container">
        <div className="button-container">
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
                onClick={handleStartJournalEntry}
                className="spooky-button modal-button"
              >
                Begin New Journal Entry
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
              disabled={selectedCard === "" || selectedTheme === ""} // Disable if inputs are incomplete
            >
              Generate Picture
            </button>
          )}
        </div>

        <div className="button-container">
          <button onClick={handleClose} className="spooky-button modal-button">
            Go Back
          </button>
        </div>
      </div>
    </>
  );
};

export default JournalEntryModal;
