import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useModal } from "../context/ModalContext";
import { getSavedReading } from "../services/profileService";
import tarotThemes from "../constants/TarotThemes";
import Modal from "../components/Modal";
import "./Profile.css";

const Profile = () => {
  const [artStyle, setArtStyle] = useState("Rider-Waite");
  const [customArtStyle, setCustomArtStyle] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailEditable, setEmailEditable] = useState(false);
  const [usernameEditable, setUsernameEditable] = useState(false);
  const [readings, setReadings] = useState([]);
  const [error, setError] = useState(null);

  const { user } = useAuth();
  const { openModal, closeModal } = useModal();

  const closeModalRef = useRef(closeModal);

  useEffect(() => {
    closeModalRef.current();
  }, [closeModalRef]);

  useEffect(() => {
    const fetchReadings = async () => {
      try {
        const data = await getSavedReading(user); // Fetch saved readings
        console.log(data);
        setReadings(data); // Update state with readings
      } catch (error) {
        console.error("Failed to fetch readings:", error);
        setError("Could not load saved readings.");
      }
    };

    if (user) {
      fetchReadings();
    }
  }, [user]);

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

  const handleJournalEntryClick = () => {
    setIsModalOpen(true);
    openModal("journalEntry");
  };

  const handleProfilePictureClick = () => {
    setIsModalOpen(true);
    openModal("profilePicture");
  };

  return (
    <div className="profile-page">
      <div className="profile-left">
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
            <button
              className="spooky-button"
              onClick={handleProfilePictureClick}
            >
              Generate New Profile Image
            </button>
            <Link to={`/${user.username}/favorites`}>
              <button className="spooky-button">Personal Gallery</button>
            </Link>
            <button className="spooky-button" onClick={handleJournalEntryClick}>
              Create New Journal Entry
            </button>
          </div>
        </div>

        <div className="saved-logs">
          <h2>Saved Logs</h2>
          {error ? (
            <p className="error">{error}</p>
          ) : readings.length === 0 ? (
            <p>No saved logs yet.</p>
          ) : (
            <ul>
              {readings.map((reading, index) => (
                <li key={index}>
                  <Link to={`/${user.username}/readings/${reading.slug}`}>
                    {reading.title} -{" "}
                    {new Date(reading.created_at).toLocaleDateString()}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="profile-right">
        <h2>Settings</h2>

        {/* Art Style */}
        <div className="settings-section">
          <label>
            Art Style:{" "}
            <strong>{user.art_style ? user.art_style : "Random"}</strong>
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
        </div>

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
          Save
        </button>

        {/* Update Password Field */}
        <div className="settings-section">
          <label>
            To change your password, enter your current password and we'll email
            you a link.
          </label>
          <input type="password" placeholder="Password" />
        </div>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default Profile;
