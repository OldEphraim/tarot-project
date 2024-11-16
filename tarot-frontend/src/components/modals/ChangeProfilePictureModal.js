import React, { useState, useEffect } from "react";
import tarotThemes from "../../constants/TarotThemes"; // Assuming tarotThemes is an array of theme names
import { useAuth } from "../../context/AuthContext";
import { searchCardByName } from "../../services/tarotService"; // Function to get card object
import { useCardImages } from "../../hooks/useCardImages"; // Existing hook
import "../../components/Modal.css";

const tarotCards = [
  "The Fool",
  "The Magician",
  "The High Priestess",
  // Add all card names here...
];

const ChangeProfilePictureModal = ({ handleClose }) => {
  const { user, setUser } = useAuth();

  const [selectedCard, setSelectedCard] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("");
  const [cardObject, setCardObject] = useState(null); // Holds the formatted card object
  const [isGenerating, setIsGenerating] = useState(false); // Tracks generation state
  const [generatedPicture, setGeneratedPicture] = useState("");

  console.log(cardObject);

  // Use the custom hook
  const { imageRequests } = useCardImages(
    cardObject ? [cardObject] : [],
    selectedTheme || "Random"
  );

  console.log("imageRequests:", imageRequests);

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
    setIsGenerating(true);
  };

  useEffect(() => {
    if (
      cardObject &&
      imageRequests[cardObject.name] &&
      imageRequests[cardObject.name].status === "ready"
    ) {
      setGeneratedPicture(imageRequests[cardObject.name].url);
      setIsGenerating(false);
    }
  }, [imageRequests, cardObject]);

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

  return (
    <>
      <h2 style={{ color: "black" }} className="profile-picture-header">
        Generate New Profile Picture
      </h2>

      <div className="profile-picture-preview">
        {user.profile_picture ? (
          <>
            <img
              src={user.profile_picture}
              alt="Current Profile"
              className="profile-picture"
            />
            <div className="profile-picture-placeholder">
              <p>New Profile Picture Preview</p>
              {cardObject &&
                imageRequests[cardObject.name] &&
                imageRequests[cardObject.name].status === "ready" && (
                  <img
                    src={imageRequests[cardObject.name].url}
                    alt="New Profile"
                    className="profile-picture"
                  />
                )}
            </div>
          </>
        ) : (
          <div className="profile-picture-placeholder">
            <p>No Profile Picture</p>
            {cardObject &&
              imageRequests[cardObject.name] &&
              imageRequests[cardObject.name].status === "ready" && (
                <img
                  src={imageRequests[cardObject.name].url}
                  alt="New Profile"
                  className="profile-picture"
                />
              )}
          </div>
        )}
      </div>

      <p style={{ color: "black" }}>
        Your profile picture will be{" "}
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
        <button
          onClick={handleGeneratePicture}
          className="spooky-button"
          disabled={!selectedCard || !selectedTheme || isGenerating} // Disable if not fully selected or already generating
        >
          {isGenerating ? "Generating..." : "Generate Picture"}
        </button>
        <button onClick={handleClose} className="spooky-button">
          Go Back
        </button>
      </div>
    </>
  );
};

export default ChangeProfilePictureModal;
