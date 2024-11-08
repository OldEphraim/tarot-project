import React, { useEffect, useState } from 'react';
import './Modal.css';

const Modal = ({ onClose, selectedCardData }) => {
    const [fadeOut, setFadeOut] = useState(false);

    const handleScrollToExplanation = () => {
      const targetElement = document.getElementById(`explanation-text-${selectedCardData.position}`);
      if (targetElement) {
        const yOffset = -70;
        const yPosition = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: yPosition, behavior: "smooth" });
      }
      setFadeOut(true);
    };
  
    useEffect(() => {
      if (fadeOut) {
        const timer = setTimeout(onClose, 500);
        return () => clearTimeout(timer);
      }
    }, [fadeOut, onClose]);

return (
  <div className={`modal-overlay ${fadeOut ? "fade-out" : ""}`}>
    <div className="modal-content">
      <button className="modal-close" onClick={() => setFadeOut(true)}>X</button>
      
      {/* Header Section */}
      <div className="modal-header">
        <h2 className="card-name">{selectedCardData.card.name}</h2>
        <p className="art-style">in {selectedCardData.theme === "Rider-Waite" ? "the classic Rider-Waite" : `an AI-generated ${selectedCardData.theme}`} style</p>
      </div>

      {/* Modal Body */}
      <img src={selectedCardData.imageUrl} alt={selectedCardData.card.name} />
          <p className="art-style">You drew {selectedCardData.card.arcana === "Minor Arcana" || selectedCardData.card.name === "Wheel of Fortune" ? "the" : ""} {selectedCardData.card.name} in the {selectedCardData.positionMeaning} position.</p>
          <div>
            <button className="spooky-button" onClick={() => handleScrollToExplanation()}>
              See Explanation
            </button>
            <button className="spooky-button" onClick={() => alert('Saved to Favorites!')}>Save to Favorites</button>
          </div>
    </div>
  </div>
)};

export default Modal;