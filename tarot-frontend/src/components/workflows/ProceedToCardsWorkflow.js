import React, { useState } from "react";
import { Link } from "react-router-dom";
import CardDisplay from "../CardDisplay";
import TextArea from "../TextArea";
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
  const [isArtStyleSelectionChoiceKnown, setIsArtStyleSelectionChoiceKnown] =
    useState(false);
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

  const { isAuthenticated, user } = useAuth();
  const { selectedSpread, chooseSpread, userReason, submitReason } = useTarot();

  const handleArtStyleSelection = (style) => {
    setAreArtStyleSelectionButtonsVisible(false);
    setArtStyle(style);
    setIsArtStyleSelectionChoiceKnown(true);
  };

  const handleSpreadSelect = async (spread) => {
    setAreCardSelectionButtonsVisible(false);
    setIsFortunetellerTextVisible(true);
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
    setIsCardSelectionTextVisible(true);
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

  return (
    <div className="proceed-to-cards-workflow">
      <Typewriter
        text="YOUR CARDS will be drawn, but only after you answer three questions."
        startAnimation
        onEnd={() => setIsArtStyleSelectionTextVisible(true)}
      />

      {isArtStyleSelectionTextVisible && !isArtStyleSelectionChoiceKnown && (
        <Typewriter
          text={`WOULD you prefer the classic Rider-Waite designs, or AI-generated artwork for your cards in a randomly-chosen style? If you would like to customize the style of your AI-generated cards, ${user?.username ? "you can do so in your Profile page." : "please log in."}`}
          startAnimation
          onEnd={() => setAreArtStyleSelectionButtonsVisible(true)}
        />
      )}

      {areArtStyleSelectionButtonsVisible &&
        !isArtStyleSelectionChoiceKnown && (
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
            {!isAuthenticated && (
              <button className="spooky-button">
                <Link to="/login" className="no-style-link">
                  LOGIN
                </Link>
              </button>
            )}
          </div>
        )}

      {isArtStyleSelectionChoiceKnown && (
        <Typewriter
          text={`You have chosen for the cards to be drawn in the ${artStyle} style.`}
          startAnimation
          onEnd={() => setIsReasonTextVisible(true)}
        />
      )}

      {isReasonTextVisible && !isCardSelectionTextVisible && (
        <Typewriter
          text="WOULD you like to tell the fortuneteller about the reason you have chosen to consult the cards today?"
          startAnimation
          onEnd={() => setIsReasonMessageBoxVisible(true)}
        />
      )}

      {isReasonMessageBoxVisible && !isCardSelectionTextVisible && (
        <div className="message-input-box">
          <TextArea
            value={userReasonEntry}
            onChange={handleInputChange}
            onSubmit={handleReasonSubmit}
            belowText="Type your message and press Enter to tell the Fortuneteller about
            the reason for this drawing."
          />
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

      {isCardSelectionTextVisible && (
        <div className="user-message">
          <p>{userReason}</p>
        </div>
      )}

      {isCardSelectionTextVisible && !isFortunetellerTextVisible && (
        <Typewriter
          text="WOULD you like to draw one card, three cards, a five-card Elemental spread, or an entire Celtic Cross?"
          startAnimation
          onEnd={() => setAreCardSelectionButtonsVisible(true)}
        />
      )}

      {areCardSelectionButtonsVisible && !isFortunetellerTextVisible && (
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
