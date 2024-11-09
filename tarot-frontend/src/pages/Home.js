import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useModal } from '../context/ModalContext';
import Modal from '../components/Modal';
import Typewriter from '../components/Typewriter';
import ProceedToCardsWorkflow from '../components/workflows/ProceedToCardsWorkflow';
import SpeakToFortunetellerWorkflow from '../components/workflows/SpeakToFortunetellerWorkflow';
import './Home.css';

const Home = () => {
  const { isModalOpen, selectedCardData, closeModal } = useModal();
  const [workflow, setWorkflow] = useState(null);
  const [isSecondParagraphVisible, setIsSecondParagraphVisible] = useState(false);
  const [areTopButtonsVisible, setAreTopButtonsVisible] = useState(false);

  const handleProceedToCards = () => {
    setWorkflow('cards');
  }

  const handleProceedToFortuneteller = () => {
    setWorkflow('fortuneteller');
  }

  return (
    <div className="home">
      {/* Modal component */}
      {isModalOpen && (
        <Modal onClose={closeModal} selectedCardData={selectedCardData} />
      )}
      <h1 className="home-header">Tarot Card Reader</h1>
      <Typewriter
        text="WELCOME, dear visitor, to my tarot card reader. For more information regarding the meanings of specific tarot cards, or the spreads which can be used, please visit the resources which have been made available under ‘About Tarot’."
        startAnimation
        onEnd={() => setIsSecondParagraphVisible(true)}
      />

      <Typewriter
        text="WOULD you like to speak to the AI fortuneteller, Esmeralda, about the challenges you are facing, or would you like to proceed directly to a card drawing? If you would like your results saved, so that you can use them for later and learn what the cards have meant for you, please log in."
        startAnimation={isSecondParagraphVisible}
        onEnd={() => setAreTopButtonsVisible(true)}
      />

      {areTopButtonsVisible && !workflow &&
        <div className="button-container">
        <button className="spooky-button" onClick={() => handleProceedToFortuneteller()}>
          SPEAK TO FORTUNETELLER
        </button>
        <button className="spooky-button" onClick={() => handleProceedToCards()}>
          PROCEED TO CARDS
        </button>
        <button className="spooky-button"><Link to="/login" className="no-style-link">
          LOGIN
        </Link></button>
      </div>}

      {workflow === 'cards' && <ProceedToCardsWorkflow />}
      {workflow === 'fortuneteller' && <SpeakToFortunetellerWorkflow />}
    </div>
  );
};

export default Home;