import React, { useState } from 'react';
import * as Typewriter from 'react-effect-typewriter';
import CardDisplay from '../components/CardDisplay';
import TarotChat from '../components/TarotChat';
import { drawMultipleCards } from '../services/apiService';
import './Home.css';

const Home = () => {
  const [selectedSpread, setSelectedSpread] = useState(null);
  const [cards, setCards] = useState([]);
  const [areCardSelectionButtonsVisible, setAreCardSelectionButtonsVisible] = useState(false);
  const [areTopButtonsVisible, setAreTopButtonsVisible] = useState(false); 
  const [isProceedToCardsVisible, setIsProceedToCardsVisible] = useState(false);

  const handleSpreadSelect = async (spread) => {
    setSelectedSpread(spread);
    let numCards;

    if (spread === "One-Card Spread") {
      numCards = 1;
    } else if (spread === "Three-Card Spread") {
      numCards = 3;
    } else if (spread === "Five-Card Spread") {
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

  const makeCardSelectionButtonsVisible = () => {
    setAreCardSelectionButtonsVisible(true); 
  };

  const makeTopButtonsVisible = () => {
    setAreTopButtonsVisible(true); 
  };

  const proceedToCards = () => {
    setAreTopButtonsVisible(false);
    setIsProceedToCardsVisible(true);
  }

  return (
    <div className="home">
      <h1 className="home-header">Tarot Card Reader</h1>
      <Typewriter.Container className="typewriter-effects">
      <Typewriter.Paragraph className="typewriter-effects" typingSpeed={20}>WELCOME, dear visitor, to my tarot card reader. For more information regarding the meanings of specific tarot cards, or the spreads which can be used, please visit the resources which have been made available under ‘Art of Tarot’. If you would like your results saved, so that you can use them for later and develop personal associations with the cards, please log in.</Typewriter.Paragraph>
      <Typewriter.Paragraph className="typewriter-effects" typingSpeed={20} onEnd={() => makeTopButtonsVisible()}>WOULD you like to speak to our AI assistant about the challenges you are facing, or would you like to proceed directly to the card drawing?</Typewriter.Paragraph>
      </Typewriter.Container>

      {/* Buttons */}
        <div className="button-container" style={{visibility: areTopButtonsVisible ? 'visible' : 'hidden'}}>
        <button className="spooky-button" onClick={() => {/* Logic to speak to assistant */}}>
          SPEAK TO ASSISTANT
        </button>
        <button className="spooky-button" onClick={() => proceedToCards()}>
          PROCEED TO CARDS
        </button>
      </div>

        <Typewriter.Container className="typewriter-effects" style={{visibility: isProceedToCardsVisible ? 'visible' : 'hidden'}}>
        <Typewriter.Paragraph className="typewriter-effects" typingSpeed={20} startAnimation={isProceedToCardsVisible} onEnd={() => makeCardSelectionButtonsVisible()}>WOULD you like to draw one card, three cards, five cards, or an entire Celtic cross?</Typewriter.Paragraph>
        </Typewriter.Container>

        {/* Buttons */}
        <div className="button-container" style={{visibility: areCardSelectionButtonsVisible ? 'visible' : 'hidden'}}>
        <button className="spooky-button" onClick={() => handleSpreadSelect("One-Card Spread")}>
          ONE CARD
        </button>
        <button className="spooky-button" onClick={() => handleSpreadSelect("Three-Card Spread")}>
          THREE CARDS
        </button>
        <button className="spooky-button" onClick={() => handleSpreadSelect("Five-Card Spread")}>
          FIVE CARDS
        </button>
        <button className="spooky-button" onClick={() => handleSpreadSelect("Celtic Cross")}>
          CELTIC CROSS
        </button>
      </div>
      {selectedSpread && <><h2>You selected: {selectedSpread}</h2>
      {cards.length > 0 && <CardDisplay cards={cards} selectedSpread={selectedSpread} />} </>}
    </div>
  );
};

export default Home;