import React from "react";
import { useCardDetails } from "../hooks/useCardDetails";
import { formatCardName } from "../utils/formatCardName";
import tarotCards from "../constants/TarotCards";
import tarotThemes from "../constants/TarotThemes";

const CardAndThemeSelector = ({
  selectedCard,
  selectedTheme,
  handleCardChange,
  handleThemeChange,
  whatIsThis,
}) => {
  const { card } = useCardDetails(formatCardName(selectedCard));

  return (
    <p style={{ color: "black" }}>
      {`Your ${whatIsThis} be `}
      {card?.arcana === "Minor Arcana" || card?.name === "Wheel of Fortune"
        ? "the "
        : ""}
      <select
        value={selectedCard}
        onChange={handleCardChange}
        className="dropdown"
      >
        <option value="">Select a Card</option>
        {tarotCards.map((card, index) => (
          <option key={index} value={card}>
            {card}
          </option>
        ))}
      </select>{" "}
      in the{" "}
      <select
        value={selectedTheme}
        onChange={handleThemeChange}
        className="dropdown"
      >
        <option value="">Select a Theme</option>
        {tarotThemes.map((theme, index) => (
          <option key={index} value={theme}>
            {theme}
          </option>
        ))}
      </select>{" "}
      style.
    </p>
  );
};

export default CardAndThemeSelector;
