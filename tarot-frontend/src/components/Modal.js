import React, { useEffect, useState } from "react";
import { useModal } from "../context/ModalContext";
import CardDetailModal from "./modals/CardDetailModal";
import ChangeProfilePictureModal from "./modals/ChangeProfilePictureModal";
import ConfirmChangeModal from "./modals/ConfirmChangeModal";
import JournalEntryModal from "./modals/JournalEntryModal";
import "./Modal.css";

const Modal = ({ onClose }) => {
  const [fadeOut, setFadeOut] = useState(false);

  const { modalType } = useModal();

  const handleClose = () => setFadeOut(true);

  useEffect(() => {
    if (fadeOut) {
      const timer = setTimeout(onClose, 500);
      return () => clearTimeout(timer);
    }
  }, [fadeOut, onClose]);

  return (
    <div className={`modal-overlay ${fadeOut ? "fade-out" : ""}`}>
      <div className="modal-content">
        <div className="modal-close" onClick={handleClose}>
          X
        </div>
        {modalType === "cardDetail" && (
          <CardDetailModal setFadeOut={setFadeOut} />
        )}
        {modalType === "confirmChange" && (
          <ConfirmChangeModal handleClose={handleClose} />
        )}
        {modalType === "profilePicture" && (
          <ChangeProfilePictureModal handleClose={handleClose} />
        )}
        {modalType === "journalEntry" && (
          <JournalEntryModal handleClose={handleClose} />
        )}
      </div>
    </div>
  );
};

export default Modal;
