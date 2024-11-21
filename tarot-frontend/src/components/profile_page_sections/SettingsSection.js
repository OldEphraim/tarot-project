import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useModal } from "../../context/ModalContext";
import { updatePassword } from "../../services/profileService";
import tarotThemes from "../../constants/TarotThemes";

const SettingsSection = () => {
  const [artStyle, setArtStyle] = useState("Rider-Waite");
  const [customArtStyle, setCustomArtStyle] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [emailEditable, setEmailEditable] = useState(false);
  const [usernameEditable, setUsernameEditable] = useState(false);
  const [passwordEditable, setPasswordEditable] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { user, logout } = useAuth();
  const { openModal, setIsModalOpen } = useModal();

  const handleChangePassword = async () => {
    try {
      await updatePassword(user, currentPassword, newPassword, confirmPassword);
      logout();
      alert("Password updated successfully!");
    } catch (error) {
      console.error("Error updating password:", error);
      alert("Failed to update password. Please try again.");
    }
  };

  const handleArtStyleChange = (e) => {
    const selectedStyle = e.target.value;
    setArtStyle(selectedStyle);
    if (selectedStyle !== "Custom") {
      setCustomArtStyle("");
    }
  };

  const handleSaveClick = () => {
    setIsModalOpen(true);
    openModal("confirmChange", {
      email: email !== "" ? email : user.email,
      username: username !== "" ? username : user.username,
      artStyle:
        artStyle === "Custom"
          ? customArtStyle
          : artStyle !== ""
            ? artStyle
            : user.art_style
              ? user.art_style
              : "Random",
    });
  };

  return (
    <div className="settings-section">
      {/* Art Style */}
      <label>
        Art Style: <strong>{user.art_style ? user.art_style : "Random"}</strong>
      </label>
      <select value={artStyle} onChange={handleArtStyleChange}>
        <option value="Random">Random</option>
        <option value="Custom">Custom</option>
        <option value="Rider-Waite">Rider-Waite</option>
        {tarotThemes.map((theme) => (
          <option key={theme} value={theme}>
            {theme}
          </option>
        ))}
      </select>
      {artStyle === "Custom" && (
        <input
          type="text"
          value={customArtStyle}
          onChange={(e) => setCustomArtStyle(e.target.value)}
          placeholder="Enter custom art style"
          style={{ marginTop: "15px" }}
        />
      )}

      {/* Email */}
      <div className="settings-section">
        <label>
          Email: {emailEditable ? email : <strong>{user.email}</strong>}
        </label>
        {emailEditable && (
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Update Email"
          />
        )}
        <input
          type="checkbox"
          checked={emailEditable}
          onChange={() => setEmailEditable(!emailEditable)}
        />{" "}
        Edit
      </div>

      {/* Username */}
      <div className="settings-section">
        <label>
          Username:{" "}
          {usernameEditable ? username : <strong>{user.username}</strong>}
        </label>
        {usernameEditable && (
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Update Username"
          />
        )}
        <input
          type="checkbox"
          checked={usernameEditable}
          onChange={() => setUsernameEditable(!usernameEditable)}
        />{" "}
        Edit
      </div>

      {/* Save Button */}
      <button
        className="spooky-button"
        onClick={handleSaveClick}
        style={{ marginBottom: "20px" }}
      >
        Save Settings
      </button>

      {/* Update Password Field */}
      <div className="settings-section">
        <label>
          Password:{" "}
          {!passwordEditable ? (
            <strong>********</strong>
          ) : (
            <>
              <strong>
                {newPassword === "" && confirmPassword === "" ? (
                  "No new password entered"
                ) : newPassword !== confirmPassword ? (
                  "You have entered multiple values for your new password."
                ) : (
                  <span style={{ color: "green" }}>
                    You may make this value your new password.
                  </span>
                )}
              </strong>
              <span>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter Current Password"
                />
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter New Password"
                  style={{ marginTop: "10px" }}
                />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm New Password"
                  style={{ marginTop: "10px" }}
                />
                <div className="button-container">
                  <button
                    className="spooky-button"
                    onClick={handleChangePassword}
                    style={{ marginTop: "10px" }}
                  >
                    Change Password
                  </button>
                  <button
                    className="spooky-button"
                    onClick={() => setPasswordEditable(false)}
                    style={{ marginTop: "10px" }}
                  >
                    Keep As Is
                  </button>
                </div>
              </span>
            </>
          )}
        </label>
        <input
          type="checkbox"
          checked={passwordEditable}
          onChange={() => setPasswordEditable(!passwordEditable)}
        />{" "}
        Edit
      </div>
    </div>
  );
};

export default SettingsSection;
