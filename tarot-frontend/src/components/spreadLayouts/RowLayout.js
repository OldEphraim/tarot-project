import React from "react";
import { useTarot } from "../../context/TarotContext";
import TarotCardImage from "../TarotCardImage";
import elementalSpreadPositionMeanings from "../../constants/ElementalSpreadPositionMeanings";

const RowLayout = ({ cards, imageRequests, currentCardIndex }) => {
  const { selectedSpread, workflow } = useTarot();

  const isVisible = (index) => index < currentCardIndex;

  const getPositionMeaning = (index) => {
    if (workflow === "cards") {
      if (selectedSpread === "Five") {
        return elementalSpreadPositionMeanings[index + 1];
      } else if (selectedSpread === "Three") {
        return (
          [{ text: "Past" }, { text: "Present" }, { text: "Future" }][index] ||
          ""
        );
      }
    }
    return "";
  };

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
            positionMeaning={getPositionMeaning(index)}
            theme="Rider-Waite"
          />
        </div>
      ))}
    </div>
  );
};

export default RowLayout;
