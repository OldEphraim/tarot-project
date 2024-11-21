import React from "react";
import { useModal } from "../context/ModalContext";
import Modal from "../components/Modal";
import ProfilePictureSection from "../components/profile_page_sections/ProfilePictureSection";
import SavedLogsSection from "../components/profile_page_sections/SavedLogsSection";
import SettingsSection from "../components/profile_page_sections/SettingsSection";
import "./Profile.css";

const Profile = () => {
  const { isModalOpen } = useModal();

  return (
    <div className="profile-page">
      <div className="profile-left">
        <ProfilePictureSection />
        <SavedLogsSection />
      </div>

      <div className="profile-right">
        <h2>Settings</h2>

        <SettingsSection />
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && <Modal />}
    </div>
  );
};

export default Profile;
