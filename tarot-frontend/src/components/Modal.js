import React from "react";
import { useModal } from "../context/ModalContext";
import CardDetailModal from "./modals/CardDetailModal";
import ChangeProfilePictureModal from "./modals/ChangeProfilePictureModal";
import ConfirmChangeModal from "./modals/ConfirmChangeModal";
import JournalEntryModal from "./modals/JournalEntryModal";
import "./Modal.css";

const Modal = () => {
  const { modalType, closeModal, fadeOut } = useModal();

  return (
    <div className={`modal-overlay ${fadeOut ? "fade-out" : ""}`}>
      <div className="modal-content">
        <div className="modal-close" onClick={closeModal}>
          X
        </div>
        {modalType === "cardDetail" && <CardDetailModal />}
        {modalType === "confirmChange" && <ConfirmChangeModal />}
        {modalType === "profilePicture" && <ChangeProfilePictureModal />}
        {modalType === "journalEntry" && <JournalEntryModal />}
      </div>
    </div>
  );
};

export default Modal;
