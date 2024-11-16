import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useModal } from "../context/ModalContext";
import { useTarot } from "../context/TarotContext";
import Modal from "../components/Modal";
import Typewriter from "../components/Typewriter";
import ProceedToCardsWorkflow from "../components/workflows/ProceedToCardsWorkflow";
import SpeakToFortunetellerWorkflow from "../components/workflows/SpeakToFortunetellerWorkflow";
import "./Home.css";

const Home = () => {
  const [isSecondParagraphVisible, setIsSecondParagraphVisible] =
    useState(false);
  const [areTopButtonsVisible, setAreTopButtonsVisible] = useState(false);

  const { isAuthenticated, user } = useAuth();
  const { isModalOpen, closeModal } = useModal();
  const { workflow, setWorkflowToCards, setWorkflowToFortuneteller } =
    useTarot();

  const closeModalRef = useRef(closeModal);

  // Close any open modal when Home mounts
  useEffect(() => {
    closeModalRef.current();
  }, [closeModalRef]);

  return (
    <div className="home">
      {isModalOpen && <Modal onClose={closeModal} />}
      <h1 className="home-header">Tarot Card Reader</h1>
      <Typewriter
        text={`WELCOME, ${user.username ? user.username : "dear visitor"}, to my tarot card reader. For more information regarding the meanings of specific tarot cards, or the spreads which can be used, please visit the resources which have been made available under ‘About Tarot’.`}
        startAnimation
        onEnd={() => setIsSecondParagraphVisible(true)}
      />

      <Typewriter
        text={`WOULD you like to speak to the AI fortuneteller, Esmeralda, about the challenges you are facing, or would you like to proceed directly to a card drawing? ${isAuthenticated ? "You will be able to save your results and refer to them later." : "If you would like your results saved, so that you can use them for later and learn what the cards have meant for you, please log in."}`}
        startAnimation={isSecondParagraphVisible}
        onEnd={() => setAreTopButtonsVisible(true)}
      />

      {areTopButtonsVisible && !workflow && (
        <div className="button-container">
          <button
            className="spooky-button"
            onClick={setWorkflowToFortuneteller}
          >
            SPEAK TO FORTUNETELLER
          </button>
          <button className="spooky-button" onClick={setWorkflowToCards}>
            PROCEED TO CARDS
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

      {workflow === "cards" && <ProceedToCardsWorkflow />}
      {workflow === "fortuneteller" && <SpeakToFortunetellerWorkflow />}
    </div>
  );
};

export default Home;
