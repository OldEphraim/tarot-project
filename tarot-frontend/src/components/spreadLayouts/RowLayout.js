import React from "react";
import TarotCardImage from "../TarotCardImage";
import elementalSpreadPositionMeanings from "../../constants/ElementalSpreadPositionMeanings";

const RowLayout = ({ cards, imageRequests, currentCardIndex }) => {
  console.log(cards);
  console.log(currentCardIndex);
  const isVisible = (index) => index < currentCardIndex;

  return (
    <div className={`card-display row-layout`}>
      {cards.map((card, index) => (
        <div
          key={index}
          className={`card ${isVisible(index) ? "visible" : ""}`}
        >
          <TarotCardImage
            card={card}
            imageUrl={imageRequests[card.name]?.url}
            position={index}
            positionMeaning={elementalSpreadPositionMeanings[index + 1]}
            theme="Rider-Waite"
          />
        </div>
      ))}
    </div>
  );
};

export default RowLayout;
