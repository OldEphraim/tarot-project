import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useModal } from '../context/ModalContext';
import CardDisplay from '../components/CardDisplay';
import Modal from '../components/Modal';
import Typewriter from '../components/Typewriter';
import { drawMultipleCards } from '../services/apiService';
import './Home.css';

const Home = () => {
  const { isModalOpen, selectedCardData, closeModal } = useModal();

  const [artStyle, setArtStyle] = useState("");
  const [selectedSpread, setSelectedSpread] = useState(null);
  const [cards, setCards] = useState([]);

  const [areCardSelectionButtonsVisible, setAreCardSelectionButtonsVisible] = useState(false);
  const [areTopButtonsVisible, setAreTopButtonsVisible] = useState(false); 
  const [isSecondParagraphVisible, setIsSecondParagraphVisible] = useState(false);
  const [areArtStyleSelectionButtonsVisible, setAreArtStyleSelectionButtonsVisible] = useState(false);
  const [proceedingTextIsVisible, setProceedingTextIsVisible] = useState(false);
  const [isCardSelectionTextVisible, setIsCardSelectionTextVisible] = useState(false);
  const [isFortunetellerTextVisible, setIsFortunetellerTextVisible] = useState(false);
  const [isCardDisplayVisible, setIsCardDisplayVisible] = useState(false);
  const [isArtStyleSelectionTextVisible, setIsArtStyleSelectionTextVisible] = useState(false);

  const handleProceedToCards = () => {
    setAreTopButtonsVisible(false);
    setProceedingTextIsVisible(true);
  }

  const handleArtStyleSelection = (style) => {
    setAreArtStyleSelectionButtonsVisible(false);
    setArtStyle(style);
    setIsCardSelectionTextVisible(true);
  }

  const handleSpreadSelect = async (spread) => {
    setAreCardSelectionButtonsVisible(false);
    setIsFortunetellerTextVisible(true);
    setSelectedSpread(spread);
    let numCards;

    switch (spread) {
      case "One": numCards = 1; break;
      case "Three": numCards = 3; break;
      case "Five": numCards = 5; break;
      case "Celtic Cross": numCards = 10; break;
      default: return;
    }

    try {
      const fetchedCards = await drawMultipleCards(numCards);
      setCards(fetchedCards);
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };

  return (
    <div className="home">
      {/* Modal component */}
      {isModalOpen && (
        <Modal onClose={closeModal} selectedCardData={selectedCardData} />
      )}
      <h1 className="home-header">Tarot Card Reader</h1>
      <Typewriter
        text="WELCOME, dear visitor, to my tarot card reader. For more information regarding the meanings of specific tarot cards, or the spreads which can be used, please visit the resources which have been made available under ‘Art of Tarot’. If you would like your results saved, so that you can use them for later and develop personal associations with the cards, please log in."
        startAnimation
        onEnd={() => setIsSecondParagraphVisible(true)}
      />

      <Typewriter
        text="WOULD you like to speak to our AI assistant about the challenges you are facing, or would you like to proceed directly to the card drawing?"
        startAnimation={isSecondParagraphVisible}
        onEnd={() => setAreTopButtonsVisible(true)}
      />

      {areTopButtonsVisible && !proceedingTextIsVisible &&
        <div className="button-container">
        <button className="spooky-button" onClick={() => {/* Logic to speak to assistant */}}>
          SPEAK TO ASSISTANT
        </button>
        <button className="spooky-button" onClick={() => handleProceedToCards()}>
          PROCEED TO CARDS
        </button>
        <button className="spooky-button"><Link to="/login" className="no-style-link">
          LOGIN
        </Link></button>
      </div>}

      <Typewriter
        text="SO YOU have chosen to proceed directly to the cards."
        startAnimation={proceedingTextIsVisible}
        onEnd={() => setIsArtStyleSelectionTextVisible(true)}
      />

      <Typewriter
        text="WOULD you prefer the classic Rider-Waite designs, or AI-generated artwork for your cards in a randomly-chosen style? If you would like to customize the style of your AI-generated cards, please log in."
        startAnimation={isArtStyleSelectionTextVisible}
        onEnd={() => setAreArtStyleSelectionButtonsVisible(true)}
      />

      {areArtStyleSelectionButtonsVisible && !isCardSelectionTextVisible &&
        <div className="button-container">
        <button className="spooky-button" onClick={() => handleArtStyleSelection("Rider-Waite")}>
          RIDER-WAITE CLASSIC
        </button>
        <button className="spooky-button" onClick={() => handleArtStyleSelection("Random")}>
          AI SURPRISE
        </button>
        <button className="spooky-button"><Link to="/login" className="no-style-link">
          LOGIN
        </Link></button>
      </div>}

      <Typewriter
        text="WOULD you like to draw one card, three cards, five cards, or an entire Celtic cross?"
        startAnimation={isCardSelectionTextVisible}
        onEnd={() => setAreCardSelectionButtonsVisible(true)}
      />

        {areCardSelectionButtonsVisible && !isFortunetellerTextVisible &&
        <div className="button-container">
        <button className="spooky-button" onClick={() => handleSpreadSelect("One")}>
          ONE CARD
        </button>
        <button className="spooky-button" onClick={() => handleSpreadSelect("Three")}>
          THREE CARDS
        </button>
        <button className="spooky-button" onClick={() => handleSpreadSelect("Five")}>
          FIVE CARDS
        </button>
        <button className="spooky-button" onClick={() => handleSpreadSelect("Celtic Cross")}>
          CELTIC CROSS
        </button>
      </div>}

      <Typewriter
        text={`THE FORTUNETELLER will now draw a ${selectedSpread}${selectedSpread !== "Celtic Cross" ? "-Card Spread" : ""} for you.`}
        startAnimation={isFortunetellerTextVisible}
        onEnd={() => setIsCardDisplayVisible(true)}
      />

      {isCardDisplayVisible && cards.length > 0 && <CardDisplay cards={cards} selectedSpread={selectedSpread} artStyle={artStyle} />}
    </div>
  );
};

export default Home;