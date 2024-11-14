import React, { createContext, useContext, useState } from "react";

const TarotContext = createContext();

export const useTarot = () => useContext(TarotContext);

export const TarotProvider = ({ children }) => {
  const [selectedSpread, setSelectedSpread] = useState(null);
  const [userReason, setUserReason] = useState(null);
  const [workflow, setWorkflow] = useState(null); // Add workflow state

  // Workflow functions
  const setWorkflowToCards = () => setWorkflow("cards");
  const setWorkflowToFortuneteller = () => setWorkflow("fortuneteller");
  const clearWorkflow = () => setWorkflow(null);

  // Spread functions
  const chooseSpread = (spread) => setSelectedSpread(spread);
  const clearSpread = () => setSelectedSpread(null);

  // Reason functions
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
        workflow,
        setWorkflowToCards,
        setWorkflowToFortuneteller,
        clearWorkflow,
      }}
    >
      {children}
    </TarotContext.Provider>
  );
};
