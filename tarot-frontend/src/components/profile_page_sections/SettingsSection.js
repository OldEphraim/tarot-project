import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useModal } from "../../context/ModalContext";
import tarotThemes from "../../constants/TarotThemes";

const SettingsSection = () => {
  const [artStyle, setArtStyle] = useState("Rider-Waite");
  const [customArtStyle, setCustomArtStyle] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [emailEditable, setEmailEditable] = useState(false);
  const [usernameEditable, setUsernameEditable] = useState(false);

  const { user } = useAuth();
  const { openModal, setIsModalOpen } = useModal();

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
    <>
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
      <button
        className="spooky-button"
        onClick={handleSaveClick}
        style={{ marginBottom: "20px" }}
      >
        Save Settings
      </button>
    </>
  );
};

export default SettingsSection;
