import React from 'react';

const SpreadSelector = ({ onSelect }) => {
  const spreads = ["Three-Card Spread", "Celtic Cross", "Five-Card Spread"]; // Add more spreads here

  return (
    <div className="spread-selector">
      <h2>Select a Tarot Spread</h2>
      {spreads.map((spread, index) => (
        <button key={index} onClick={() => onSelect(spread)}>
          {spread}
        </button>
      ))}
    </div>
  );
};

export default SpreadSelector;