import React, { useState } from "react";
import { Link } from "react-router-dom";
import CardDisplay from "../CardDisplay";
import Typewriter from "../Typewriter";
import { drawMultipleCards } from "../../services/apiService";

const ProceedToCardsWorkflow = ({ onExit }) => {
  const [artStyle, setArtStyle] = useState("");
  const [selectedSpread, setSelectedSpread] = useState(null);
  const [cards, setCards] = useState([]);
  const [isCardDisplayVisible, setIsCardDisplayVisible] = useState(false);
  const [isArtStyleSelectionTextVisible, setIsArtStyleSelectionTextVisible] =
    useState(false);
  const [
    areArtStyleSelectionButtonsVisible,
    setAreArtStyleSelectionButtonsVisible,
  ] = useState(false);
  const [isCardSelectionTextVisible, setIsCardSelectionTextVisible] =
    useState(false);
  const [areCardSelectionButtonsVisible, setAreCardSelectionButtonsVisible] =
    useState(false);
  const [isFortunetellerTextVisible, setIsFortunetellerTextVisible] =
    useState(false);

  const handleArtStyleSelection = (style) => {
    setAreArtStyleSelectionButtonsVisible(false);
    setArtStyle(style);
    setIsCardSelectionTextVisible(true);
  };

  const handleSpreadSelect = async (spread) => {
    setAreCardSelectionButtonsVisible(false);
    setIsFortunetellerTextVisible(true);
    setSelectedSpread(spread);
    let numCards;

    switch (spread) {
      case "One":
        numCards = 1;
        break;
      case "Three":
        numCards = 3;
        break;
      case "Five":
        numCards = 5;
        break;
      case "Celtic Cross":
        numCards = 10;
        break;
      default:
        return;
    }

    try {
      const fetchedCards = await drawMultipleCards(numCards);
      setCards(fetchedCards);
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };

  return (
    <div className="proceed-to-cards-workflow">
      <Typewriter
        text="SO YOU have chosen to proceed directly to the cards."
        startAnimation
        onEnd={() => setIsArtStyleSelectionTextVisible(true)}
      />

      {isArtStyleSelectionTextVisible && (
        <Typewriter
          text="WOULD you prefer the classic Rider-Waite designs, or AI-generated artwork for your cards in a randomly-chosen style? If you would like to customize the style of your AI-generated cards, please log in."
          startAnimation
          onEnd={() => setAreArtStyleSelectionButtonsVisible(true)}
        />
      )}

      {areArtStyleSelectionButtonsVisible && !isCardSelectionTextVisible && (
        <div className="button-container">
          <button
            className="spooky-button"
            onClick={() => handleArtStyleSelection("Rider-Waite")}
          >
            RIDER-WAITE CLASSIC
          </button>
          <button
            className="spooky-button"
            onClick={() => handleArtStyleSelection("Random")}
          >
            AI SURPRISE
          </button>
          <button className="spooky-button">
            <Link to="/login" className="no-style-link">
              LOGIN
            </Link>
          </button>
        </div>
      )}

      {isCardSelectionTextVisible && (
        <Typewriter
          text="WOULD you like to draw one card, three cards, five cards, or an entire Celtic cross?"
          startAnimation
          onEnd={() => setAreCardSelectionButtonsVisible(true)}
        />
      )}

      {areCardSelectionButtonsVisible && (
        <div className="button-container">
          <button
            className="spooky-button"
            onClick={() => handleSpreadSelect("One")}
          >
            ONE CARD
          </button>
          <button
            className="spooky-button"
            onClick={() => handleSpreadSelect("Three")}
          >
            THREE CARDS
          </button>
          <button
            className="spooky-button"
            onClick={() => handleSpreadSelect("Five")}
          >
            FIVE CARDS
          </button>
          <button
            className="spooky-button"
            onClick={() => handleSpreadSelect("Celtic Cross")}
          >
            CELTIC CROSS
          </button>
        </div>
      )}

      {isFortunetellerTextVisible && (
        <Typewriter
          text={`THE FORTUNETELLER will now draw a ${selectedSpread}${selectedSpread !== "Celtic Cross" ? "-Card Spread" : ""} for you.`}
          startAnimation
          onEnd={() => setIsCardDisplayVisible(true)}
        />
      )}

      {isCardDisplayVisible && cards.length > 0 && (
        <CardDisplay
          cards={cards}
          selectedSpread={selectedSpread}
          artStyle={artStyle}
        />
      )}
    </div>
  );
};

export default ProceedToCardsWorkflow;
