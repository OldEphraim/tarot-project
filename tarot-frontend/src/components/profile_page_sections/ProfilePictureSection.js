import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useModal } from "../../context/ModalContext";

const ProfilePictureSection = () => {
  const { user } = useAuth();
  const { openModal, setIsModalOpen } = useModal();

  const handleJournalEntryClick = () => {
    setIsModalOpen(true);
    openModal("journalEntry");
  };

  const handleProfilePictureClick = () => {
    setIsModalOpen(true);
    openModal("profilePicture");
  };

  return (
    <div className="profile-image-container">
      {user.profile_picture ? (
        <img
          src={user.profile_picture}
          alt="Profile"
          className="profile-image"
        />
      ) : (
        <img
          src="/default-profile.jpg"
          alt="Profile"
          className="profile-circle"
        />
      )}
      <div className="profile-buttons">
        <button className="spooky-button" onClick={handleProfilePictureClick}>
          Generate New Profile Image
        </button>
        <Link
          to={`/${user.username}/favorites`}
          style={{ textDecoration: "none" }}
        >
          <button className="spooky-button">Personal Gallery</button>
        </Link>
        <button className="spooky-button" onClick={handleJournalEntryClick}>
          Create New Journal Entry
        </button>
      </div>
    </div>
  );
};

export default ProfilePictureSection;
