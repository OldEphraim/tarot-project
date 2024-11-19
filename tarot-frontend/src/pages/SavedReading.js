import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useModal } from "../context/ModalContext";
import { getReadingBySlug } from "../services/profileService";
import { readTarotDeck } from "../services/tarotService";
import Modal from "../components/Modal";
import CelticCrossLayout from "../components/spreadLayouts/CelticCrossLayout";
import RowLayout from "../components/spreadLayouts/RowLayout";
import "./SavedReading.css";

const SavedReading = () => {
  const { username, slug } = useParams();
  const { user } = useAuth();
  const { closeModal, isModalOpen } = useModal();
  const hasFetchedDeck = useRef(false);

  const [reading, setReading] = useState(null);
  const [error, setError] = useState(null);
  const [deck, setDeck] = useState(null);

  useEffect(() => {
    const fetchReading = async () => {
      try {
        const data = await getReadingBySlug(user, slug);
        setReading(data);
      } catch (error) {
        console.error("Error fetching reading:", error);
      }
    };

    fetchReading();
  }, [slug, user]);

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const deckData = await readTarotDeck();
        setDeck(deckData);
      } catch (err) {
        console.error("Failed to fetch tarot deck:", err);
        setError("Failed to load tarot deck.");
      }
    };

    if (!hasFetchedDeck.current) {
      hasFetchedDeck.current = true;
      fetchDeck();
    }
  }, [hasFetchedDeck, deck]);

  const getCardDetails = (cardName) => {
    const card = deck.find((card) => card.name === cardName);
    return card ? card : null;
  };

  const getFortunetellerNowDrawingText = (layout, length) => {
    if (length === 10 && layout === "Celtic Cross") {
      return "THE FORTUNETELLER will now draw a Celtic Cross for you.";
    } else {
      switch (length) {
        case 1:
          return "THE FORTUNETELLER will now draw a single tarot card for you.";
        case 3:
          return "THE FORTUNETELLER will now draw a Three-Card Spread for you.";
        case 5:
          return "THE FORTUNETELLER will now draw an Elemental Spread for you.";
        default:
          return "You have not chosen a spread successfully for THE FORTUNETELLER.";
      }
    }
  };

  if (error) {
    return <h2>{error}</h2>;
  }

  if (!reading) {
    return <h2>Loading...</h2>;
  }

  const esmeraldaIntro = `
  Ah, you've come seeking answers, have you? 
  They call me Esmeralda Nightshade, and I've been reading these cards longer than most have been alive.
  Sit yourself down, breathe deep, and let the incense clear your mind—I'll tell you this now: 
  I don't sugarcoat. Life’s like a garden, you see—sometimes you've got to pull up the pretty weeds 
  to let the useful ones grow. So, speak freely, or let me do the talking, 
  but I promise, I'll tell you what you need to hear—not just what you want.
`;

  return (
    <>
      <div className="home">
        {isModalOpen && <Modal onClose={closeModal} />}
        <h1 className="home-header">{reading.title}</h1>
        <div className="saved-typewriter">
          {`WELCOME, ${username}, to my tarot card reader. For more information regarding the meanings of specific tarot cards, or the spreads which can be used, please visit the resources which have been made available under ‘About Tarot’.`}
        </div>

        {reading.workflow_log.workflow === "cards" && (
          <div className="proceed-to-cards-workflow">
            <div className="saved-typewriter">
              YOUR CARDS will be drawn, but only after you answer three
              questions.
            </div>

            <div className="saved-typewriter">
              {`You have chosen for the cards to be drawn in the ${reading.workflow_log.artStyle} style.`}
            </div>

            {reading.workflow_log.userReason !== "" && (
              <div className="user-message">
                <p>{reading.workflow_log.userReason}</p>
              </div>
            )}

            <div className="saved-typewriter">
              {getFortunetellerNowDrawingText(
                reading.workflow_log.layout,
                reading.workflow_log.cardImages.length
              )}
            </div>

            {deck && reading.workflow_log.layout === "Celtic Cross" && (
              <CelticCrossLayout
                cards={reading.workflow_log.cardNames.map(getCardDetails)}
                imageRequests={reading.workflow_log.cardNames.reduce(
                  (acc, cardName, index) => {
                    acc[cardName] = {
                      status: "ready",
                      url: reading.workflow_log.cardImages[index],
                      theme: reading.workflow_log.cardThemes[index],
                    };
                    return acc;
                  },
                  {}
                )}
                currentCardIndex={reading.workflow_log.cardNames.length}
              />
            )}
            {deck && reading.workflow_log.layout !== "Celtic Cross" && (
              <RowLayout
                cards={reading.workflow_log.cardNames.map(getCardDetails)}
                imageRequests={reading.workflow_log.cardNames.reduce(
                  (acc, cardName, index) => {
                    acc[cardName] = {
                      status: "ready",
                      url: reading.workflow_log.cardImages[index],
                      theme: reading.workflow_log.cardThemes[index],
                    };
                    return acc;
                  },
                  {}
                )}
                currentCardIndex={reading.workflow_log.cardNames.length}
              />
            )}
            {reading.workflow_log.explanations.map((explanation, index) => (
              <div className="saved-typewriter" key={index}>
                {explanation}
              </div>
            ))}
          </div>
        )}
        {reading.workflow_log.workflow === "fortuneteller" && (
          <div className="proceed-to-cards-workflow">
            <div className="saved-typewriter">
              SO YOU have chosen to speak with the fortuneteller.
            </div>

            <div className="speak-to-fortuneteller-workflow">
              <img
                className={`esmeralda fade-in`}
                src="/esmeralda-universe-images/esmeralda.webp"
                alt="esmeralda"
              />

              <div className="saved-typewriter">{esmeraldaIntro}</div>

              {reading.workflow_log.messages.map((message, index) => (
                <React.Fragment key={index}>
                  {/* Render user message */}
                  <div className="user-message">{message.user}</div>

                  {/* Conditionally render the RowLayout if esmeralda.images is not empty */}
                  {message.esmeralda.images.length > 0 && (
                    <RowLayout
                      cards={message.esmeralda.names.map(getCardDetails)}
                      imageRequests={message.esmeralda.names.reduce(
                        (acc, cardName, index) => {
                          acc[cardName] = {
                            status: "ready",
                            url: message.esmeralda.images[index],
                            theme: message.esmeralda.themes[index],
                          };
                          return acc;
                        },
                        {}
                      )}
                      currentCardIndex={message.esmeralda.names.length}
                    />
                  )}

                  {/* Render esmeralda text */}
                  <div className="saved-typewriter">
                    {message.esmeralda.text}
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SavedReading;
