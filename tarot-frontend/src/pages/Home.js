import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as Typewriter from 'react-effect-typewriter';
import CardDisplay from '../components/CardDisplay';
import TarotChat from '../components/TarotChat';
import { drawMultipleCards } from '../services/apiService';
import './Home.css';

const Home = () => {
  const [artStyle, setArtStyle] = useState("");
  const [selectedSpread, setSelectedSpread] = useState(null);
  const [cards, setCards] = useState([]);
  const [areCardSelectionButtonsVisible, setAreCardSelectionButtonsVisible] = useState(false);
  const [areTopButtonsVisible, setAreTopButtonsVisible] = useState(false); 
  const [areArtStyleSelectionButtonsVisible, setAreArtStyleSelectionButtonsVisible] = useState(false);
  const [proceedingTextIsVisible, setProceedingTextIsVisible] = useState(false);
  const [isCardSelectionTextVisible, setIsCardSelectionTextVisible] = useState(false);
  const [isCardDisplayVisible, setIsCardDisplayVisible] = useState(false);
  const [isArtStyleSelectionTextVisible, setIsArtStyleSelectionTextVisible] = useState(false);

  const handleSpreadSelect = async (spread) => {
    setSelectedSpread(spread);
    setAreCardSelectionButtonsVisible(false);

    document.getElementById("the-fortuneteller-will-now-draw").scrollIntoView({behavior: "smooth"})

    let numCards;

    if (spread === "One") {
      numCards = 1;
    } else if (spread === "Three") {
      numCards = 3;
    } else if (spread === "Five") {
      numCards = 5;
    }
    else if (spread === "Celtic Cross") {
      numCards = 10; 
    } else {
      return (
        <h1>Error drawing cards...</h1>
      )
    }

    try {
      const fetchedCards = await drawMultipleCards(numCards);
      setCards(fetchedCards);
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };

  const makeCardDisplayVisible = () => {
    setIsCardDisplayVisible(true);
  }

  const makeCardSelectionTextVisible = () => {
    setIsCardSelectionTextVisible(true);
  }

  const makeCardSelectionButtonsVisible = () => {
    setAreCardSelectionButtonsVisible(true); 
  };

  const makeArtStyleSelectionTextVisible = () => {
    setIsArtStyleSelectionTextVisible(true);
  }

  const makeArtStyleSelectionButtonsVisible = () => {
    setAreArtStyleSelectionButtonsVisible(true);
  }

  const makeTopButtonsVisible = () => {
    setAreTopButtonsVisible(true); 
  };

  const proceedToCards = () => {
    setAreTopButtonsVisible(false);

    setTimeout(() => {
      setProceedingTextIsVisible(true);
    }, 500); // Adjust the delay in milliseconds as needed (500 ms = 0.5 seconds)  

    setProceedingTextIsVisible(true);
  }

  const handleArtStyleSelection = (style) => {
    setAreArtStyleSelectionButtonsVisible(false);
    setArtStyle(style);
    makeCardSelectionTextVisible();
  }

  return (
    <div className="home">
      <h1 className="home-header">Tarot Card Reader</h1>
      <Typewriter.Container className="typewriter-effects">
      <Typewriter.Paragraph className="typewriter-effects" typingSpeed={20}>WELCOME, dear visitor, to my tarot card reader. For more information regarding the meanings of specific tarot cards, or the spreads which can be used, please visit the resources which have been made available under ‘Art of Tarot’. If you would like your results saved, so that you can use them for later and develop personal associations with the cards, please log in.</Typewriter.Paragraph>
      <Typewriter.Paragraph className="typewriter-effects" typingSpeed={20} onEnd={() => makeTopButtonsVisible()}>WOULD you like to speak to our AI assistant about the challenges you are facing, or would you like to proceed directly to the card drawing?</Typewriter.Paragraph>
      </Typewriter.Container>

      {areTopButtonsVisible &&
        <div className="button-container" style={{visibility: areTopButtonsVisible ? 'visible' : 'hidden'}}>
        <button className="spooky-button" onClick={() => {/* Logic to speak to assistant */}}>
          SPEAK TO ASSISTANT
        </button>
        <button className="spooky-button" onClick={() => proceedToCards()}>
          PROCEED TO CARDS
        </button>
      </div>}

      <Typewriter.Container className="typewriter-effects">
        <Typewriter.Paragraph className="typewriter-effects" typingSpeed={20} startAnimation={proceedingTextIsVisible} onEnd={() => makeArtStyleSelectionTextVisible()}>SO YOU have chosen to proceed directly to the cards.</Typewriter.Paragraph>
      </Typewriter.Container>

      <Typewriter.Container className="typewriter-effects">
        <Typewriter.Paragraph className="typewriter-effects" typingSpeed={20} startAnimation={isArtStyleSelectionTextVisible} onEnd={() => makeArtStyleSelectionButtonsVisible()}>WOULD you prefer the classic Rider-Waite designs, or AI-generated artwork for your cards in a randomly-chosen style? If you would like to customize the style of your AI-generated cards, please log in.</Typewriter.Paragraph>
      </Typewriter.Container>

      {areArtStyleSelectionButtonsVisible &&
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

        <Typewriter.Container className="typewriter-effects">
        <Typewriter.Paragraph className="typewriter-effects" id="would-you-like-to-draw" typingSpeed={20} startAnimation={isCardSelectionTextVisible} onEnd={() => makeCardSelectionButtonsVisible()}>WOULD you like to draw one card, three cards, five cards, or an entire Celtic cross?</Typewriter.Paragraph>
        </Typewriter.Container>

        {areCardSelectionButtonsVisible &&
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
      
        <Typewriter.Container className="typewriter-effects" style={{visibility: selectedSpread ? 'visible' : 'hidden'}}>
        {selectedSpread === "Celtic Cross" && <Typewriter.Paragraph className="typewriter-effects" id="the-fortuneteller-will-now-draw" typingSpeed={20} startAnimation={selectedSpread !== null} onEnd={() => makeCardDisplayVisible()}>THE FORTUNETELLER will now draw a {selectedSpread} for you.</Typewriter.Paragraph>}
        {selectedSpread !== "Celtic Cross" && <Typewriter.Paragraph className="typewriter-effects" id="the-fortuneteller-will-now-draw" typingSpeed={20} startAnimation={selectedSpread !== null} onEnd={() => makeCardDisplayVisible()}>THE FORTUNETELLER will now draw a {selectedSpread}-Card Spread for you.</Typewriter.Paragraph>}
        </Typewriter.Container>

      {isCardDisplayVisible && cards.length > 0 && <CardDisplay cards={cards} selectedSpread={selectedSpread} />}
    </div>
  );
};

export default Home;