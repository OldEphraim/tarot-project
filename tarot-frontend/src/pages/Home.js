import React, { useState } from 'react';
import * as Typewriter from 'react-effect-typewriter';
import CardDisplay from '../components/CardDisplay';
import SpreadInfo from '../components/SpreadInfo';
import SpreadSelector from '../components/SpreadSelector';
import TarotChat from '../components/TarotChat';
import { drawMultipleCards } from '../services/apiService';
import './Home.css';

const Home = () => {
  const [selectedSpread, setSelectedSpread] = useState(null);
  const [cards, setCards] = useState([]);

  const handleSpreadSelect = async (spread) => {
    setSelectedSpread(spread);
    let numCards;

    // Determine the number of cards based on the spread
    if (spread === "Three-Card Spread") {
      numCards = 3;
    } else if (spread === "Celtic Cross") {
      numCards = 10; // Assuming a Celtic Cross uses 10 cards
    } else {
      numCards = 5; // Default for others
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
      <h1 className="home-header">Tarot Card Reader</h1>
      <Typewriter.Container className="typewriter-effects">
      <Typewriter.Paragraph className="typewriter-effects">Welcome, dear visitor, to my tarot card reader. For more information regarding the meanings of specific tarot cards, or the spreads which can be used, please visit the resources which have been made available under ‘Art of Tarot’. If you would like your results saved, so that you can use them for later and develop personal associations with the cards, please log in.</Typewriter.Paragraph>
      <Typewriter.Paragraph className="typewriter-effects">Would you like to speak to our AI assistant about the challenges you are facing, or would you like to proceed directly to the card drawing?</Typewriter.Paragraph>
      </Typewriter.Container>
      <TarotChat />
        <SpreadInfo />
        <SpreadSelector onSelect={handleSpreadSelect} />
      {selectedSpread && <><h2>You selected: {selectedSpread}</h2>
      {cards.length > 0 && <CardDisplay cards={cards} selectedSpread={selectedSpread} />} </>}
    </div>
  );
};

export default Home;