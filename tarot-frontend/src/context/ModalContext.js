import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCardData, setSelectedCardData] = useState(null);

  const openModal = (cardData) => {
    setSelectedCardData(cardData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCardData(null);
  };

  return (
    <ModalContext.Provider value={{ isModalOpen, selectedCardData, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};