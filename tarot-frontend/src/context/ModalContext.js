import React, { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [fadeOut, setFadeOut] = useState(false);

  const openModal = (type, data = null) => {
    setModalType(type);
    setModalData(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setFadeOut(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setModalType(null);
      setModalData(null);
      setFadeOut(false);
    }, 500);
  };

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        setIsModalOpen,
        modalType,
        modalData,
        openModal,
        closeModal,
        fadeOut,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
