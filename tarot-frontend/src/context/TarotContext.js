import React, { createContext, useContext, useState } from "react";

const TarotContext = createContext();

export const useTarot = () => useContext(TarotContext);

export const TarotProvider = ({ children }) => {
  const [selectedSpread, setSelectedSpread] = useState(null);
  const [userReason, setUserReason] = useState(null);

  const chooseSpread = (spread) => setSelectedSpread(spread);
  const clearSpread = () => setSelectedSpread(null);

  const submitReason = (reason) => setUserReason(reason);
  const clearReason = () => setUserReason("");

  return (
    <TarotContext.Provider
      value={{
        selectedSpread,
        chooseSpread,
        clearSpread,
        userReason,
        submitReason,
        clearReason,
      }}
    >
      {children}
    </TarotContext.Provider>
  );
};
