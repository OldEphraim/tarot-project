import React from "react";
import { saveProfileChanges } from "../../services/profileService";
import { useAuth } from "../../context/AuthContext";
import { useModal } from "../../context/ModalContext";
import "../../components/Modal.css";

const ConfirmChangeModal = ({ handleClose, setFadeOut }) => {
  const { user, setUser } = useAuth();
  const { modalData } = useModal();

  const handleConfirm = async () => {
    setFadeOut(true);
    const updatedUser = {
      ...user,
      email: modalData.email,
      username: modalData.username,
      art_style: modalData.artStyle,
    };

    try {
      await saveProfileChanges(updatedUser);
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  return (
    <>
      <h2>Are You Sure?</h2>
      <p>Your new settings will be:</p>
      <ul>
        <li>Email: {modalData.email}</li>
        <li>Username: {modalData.username}</li>
        <li>Art Style: {modalData.artStyle}</li>
      </ul>
      <button onClick={handleConfirm} className="spooky-button">
        I'm Sure
      </button>
      <button onClick={handleClose} className="spooky-button">
        I Changed My Mind
      </button>
    </>
  );
};

export default ConfirmChangeModal;
