import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CardDisplay from "../CardDisplay";
import Typewriter from "../Typewriter";
import { useAuth } from "../../context/AuthContext";
import { useTarot } from "../../context/TarotContext";
import { drawMultipleCards } from "../../services/tarotService";

const ProceedToCardsWorkflow = ({ onExit }) => {
  const [artStyle, setArtStyle] = useState("");
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
  const [isReasonTextVisible, setIsReasonTextVisible] = useState(false);
  const [isReasonMessageBoxVisible, setIsReasonMessageBoxVisible] =
    useState(false);
  const [isFortunetellerTextVisible, setIsFortunetellerTextVisible] =
    useState(false);
  const [userReasonEntry, setUserReasonEntry] = useState("");

  const { username } = useAuth();
  const { selectedSpread, chooseSpread, userReason, submitReason } = useTarot();
  const textareaRef = useRef(null);

  const handleArtStyleSelection = (style) => {
    setAreArtStyleSelectionButtonsVisible(false);
    setArtStyle(style);
    setIsCardSelectionTextVisible(true);
  };

  const handleSpreadSelect = async (spread) => {
    setAreCardSelectionButtonsVisible(false);
    setIsReasonTextVisible(true);
    chooseSpread(spread);
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

  const handleReasonSubmit = () => {
    if (userReasonEntry.trim() && userReasonEntry.trim() !== "") {
      submitReason(userReasonEntry);
    }
    setIsReasonMessageBoxVisible(false);
    setIsFortunetellerTextVisible(true);
  };

  const getFortunetellerNowDrawingText = (spread) => {
    switch (spread) {
      case "One":
        return "THE FORTUNETELLER will now draw a single tarot card for you.";
      case "Three":
        return "THE FORTUNETELLER will now draw a Three-Card Spread for you.";
      case "Five":
        return "THE FORTUNETELLER will now draw an Elemental Spread for you.";
      case "Celtic Cross":
        return "THE FORTUNETELLER will now draw a Celtic Cross for you.";
      default:
        return "You have not chosen a spread successfully for THE FORTUNETELLER.";
    }
  };

  const handleInputChange = (e) => {
    setUserReasonEntry(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleReasonSubmit();
    }
  };

  const adjustTextareaHeight = (reset = false) => {
    if (textareaRef.current) {
      if (reset) {
        textareaRef.current.style.height = "auto";
      }
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [userReasonEntry]);

  return (
    <div className="proceed-to-cards-workflow">
      <Typewriter
        text="SO YOU have chosen to proceed directly to the cards."
        startAnimation
        onEnd={() => setIsArtStyleSelectionTextVisible(true)}
      />

      {isArtStyleSelectionTextVisible && (
        <Typewriter
          text={`WOULD you prefer the classic Rider-Waite designs, or AI-generated artwork for your cards in a randomly-chosen style? If you would like to customize the style of your AI-generated cards, ${username ? "you can do so in your Profile page." : "please log in."}`}
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
          {!username && (
            <button className="spooky-button">
              <Link to="/login" className="no-style-link">
                LOGIN
              </Link>
            </button>
          )}
        </div>
      )}

      {isCardSelectionTextVisible && (
        <Typewriter
          text="WOULD you like to draw one card, three cards, a five-card Elemental spread, or an entire Celtic Cross?"
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
            ELEMENTAL SPREAD
          </button>
          <button
            className="spooky-button"
            onClick={() => handleSpreadSelect("Celtic Cross")}
          >
            CELTIC CROSS
          </button>
        </div>
      )}

      {isReasonTextVisible && (
        <Typewriter
          text="WOULD you like to tell the fortuneteller about the reason you have chosen to consult the cards today?"
          startAnimation
          onEnd={() => setIsReasonMessageBoxVisible(true)}
        />
      )}

      {isReasonMessageBoxVisible && (
        <div className="message-input-box">
          <textarea
            ref={textareaRef}
            value={userReasonEntry}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="message-input"
            style={{ resize: "none", overflow: "hidden" }}
          />
          <div className="below-text">
            Type your message and press Enter to tell the Fortuneteller about
            the reason for this drawing.
          </div>
          <div className="button-container">
            <button className="spooky-button" onClick={handleReasonSubmit}>
              SUBMIT
            </button>
            <button className="spooky-button" onClick={handleReasonSubmit}>
              NO REASON
            </button>
          </div>
        </div>
      )}

      {isFortunetellerTextVisible && (
        <div className="user-message">
          <p>{userReason}</p>
        </div>
      )}

      {isFortunetellerTextVisible && (
        <Typewriter
          text={getFortunetellerNowDrawingText(selectedSpread)}
          startAnimation
          onEnd={() => setIsCardDisplayVisible(true)}
        />
      )}

      {isCardDisplayVisible && cards.length > 0 && (
        <CardDisplay cards={cards} artStyle={artStyle} />
      )}
    </div>
  );
};

export default ProceedToCardsWorkflow;
