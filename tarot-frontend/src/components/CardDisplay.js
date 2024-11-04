import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { getRandomTheme } from '../constants/TarotThemes';
import { getCardAtPositionExplanation, generateCardImage } from '../services/openaiService';
import TarotCardImage from './TarotCardImage';
import * as Typewriter from 'react-effect-typewriter';
import './CardDisplay.css';

const celticCrossPositionMeanings = {
  1: "Present situation",
  2: "Challenges",
  3: "Past influences",
  4: "Future influences",
  5: "Conscious influences",
  6: "Subconscious influences",
  7: "Advice",
  8: "External influences",
  9: "Hopes and fears",
  10: "Outcome"
};

const CardDisplay = ({ cards, selectedSpread, artStyle }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(1);
  const [explanationTexts, setExplanationTexts] = useState([]);
  const [imageRequests, setImageRequests] = useState({});

  const explanationsFetched = useRef(new Set());
  const hasFetchedImages = useRef(false);

  const handleTypewriterEnd = () => {
    if (currentCardIndex < cards.length) {
      setCurrentCardIndex(currentCardIndex + 1);
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const fetchExplanation = async () => {
      if (currentCardIndex > 0 && currentCardIndex <= cards.length) {
        const card = cards[currentCardIndex - 1];
        const meaning = celticCrossPositionMeanings[currentCardIndex];
        const explanationKey = `${card.name}-${meaning}`

        if (!explanationsFetched.current.has(explanationKey)) {
          explanationsFetched.current.add(explanationKey);
          const explanation = await getCardAtPositionExplanation(card.name, meaning);
          setExplanationTexts((prevTexts) => [...prevTexts, `${meaning}: ${explanation}`]);
        }
      }
    };
  
    fetchExplanation();
  }, [cards, currentCardIndex]);

  useEffect(() => {
    if (!hasFetchedImages.current) {
    const fetchImages = async () => {
      const newImageRequests = {};

      for (const card of cards) {
        if (artStyle === "Rider-Waite") {
          newImageRequests[card.name] = { status: "ready", url: `/tarot-images/card_${card.number}.jpg` };
        } else if (artStyle === "Random") {
          const theme = getRandomTheme();
          const requestId = await generateCardImage(theme, card.name);
          newImageRequests[card.name] = { requestId, status: "pending" };
        }
      }

      setImageRequests(newImageRequests);
    };

    fetchImages();
    hasFetchedImages.current = true;
  }
  }, [artStyle, cards]); 

  useEffect(() => {
    const pollForImages = async () => {
      const newImageRequests = { ...imageRequests };

      for (const [cardName, request] of Object.entries(imageRequests)) {
        if (request.status === "pending") {
          try {
            const response = await axios.get(`http://localhost:8080/api/get-image-result?requestID=${request.requestId}`);
            if (response.status === 200 && response.data.imageUrl) {
              newImageRequests[cardName] = { status: "ready", url: response.data.imageUrl };
            }
          } catch (error) {
            console.error(`Error fetching image for ${cardName}:`, error);
          }
        }
      }

      setImageRequests(newImageRequests);
    };

    if (artStyle === "Random" && Object.values(imageRequests).some(req => req.status === "pending")) {
      const interval = setInterval(pollForImages, 3000);
      return () => clearInterval(interval);
    }
  }, [imageRequests, artStyle]);

  const renderCardLayout = () => {
    const isVisible = (index) => index < currentCardIndex;

    if (selectedSpread === "Celtic Cross") {
      return (
        <div className="card-display">
          <div className="cross-wrapper">
            {cards.slice(0, 6).map((card, index) => (
              <div key={index} className={`card position-${index + 1} ${isVisible(index) ? "visible" : ""}`}>
              <TarotCardImage card={card} imageUrl={imageRequests[card.name]?.url} />
              <span className="tooltip">{`${celticCrossPositionMeanings[index + 1]}: ${card.name}`}</span>
              </div>
            ))}
          </div>
          <div className="right-column">
            {cards.slice(6, 10).map((card, index) => (
              <div key={index} className={`card position-${index + 7} ${isVisible(index + 6) ? "visible" : ""}`}>
              <TarotCardImage card={card} imageUrl={imageRequests[card.name]?.url} />
              <span className="tooltip">{`${celticCrossPositionMeanings[index + 7]}: ${card.name}`}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    // Alternative layout if not Celtic Cross
    return (
      <div className={`card-display row-layout ${selectedSpread}`}>
        {cards.map((card, index) => (
          <div key={index} className={`card ${isVisible(index) ? "visible" : ""}`}>
          <TarotCardImage card={card} imageUrl={imageRequests[card.name]?.url} />
          <span className="tooltip">{card.name}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      {renderCardLayout()}
      {explanationTexts.map((text, index) => (
        <div className="explanation-text" key={index}>
          {index === explanationTexts.length - 1 ? (
            <Typewriter.Paragraph
              className="typewriter-effects"
              typingSpeed={20}
              startAnimation={index === explanationTexts.length - 1}
              onEnd={handleTypewriterEnd}
            >
              {text}
            </Typewriter.Paragraph>
          ) : (
            <p className="typewriter-effects">{text}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default CardDisplay;