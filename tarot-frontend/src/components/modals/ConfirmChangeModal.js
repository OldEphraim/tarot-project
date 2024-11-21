import React, { useState } from "react";
import { saveProfileChanges } from "../../services/profileService";
import { useAuth } from "../../context/AuthContext";
import { useModal } from "../../context/ModalContext";
import "../../components/Modal.css";

const ConfirmChangeModal = () => {
  const { user, setUser } = useAuth();
  const { modalData, closeModal } = useModal();
  const [isSaved, setIsSaved] = useState(false);

  const handleConfirm = async () => {
    const updatedUser = {
      ...user,
      email: modalData.email,
      username: modalData.username,
      art_style: modalData.artStyle,
    };

    try {
      await saveProfileChanges(updatedUser);
      setUser(updatedUser);
      setIsSaved(true);
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  return (
    <>
      <h2 style={{ color: "black" }}>Are You Sure?</h2>
      <p style={{ color: "black" }}>Your new settings will be:</p>
      <p style={{ color: "black" }}>
        Email: <strong>{modalData.email}</strong>
      </p>
      <p style={{ color: "black" }}>
        Username: <strong>{modalData.username}</strong>
      </p>
      <p style={{ color: "black" }}>
        Art Style: <strong>{modalData.artStyle}</strong>
      </p>

      {isSaved ? (
        <p style={{ color: "green", fontWeight: "bold", marginTop: "20px" }}>
          Your changes have been saved.
        </p>
      ) : (
        <div>
          <button onClick={handleConfirm} className="spooky-button">
            I'm Sure
          </button>
          <button onClick={closeModal} className="spooky-button">
            I Changed My Mind
          </button>
        </div>
      )}
    </>
  );
};

export default ConfirmChangeModal;
