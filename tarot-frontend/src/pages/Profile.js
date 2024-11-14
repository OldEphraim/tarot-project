import React, { useState } from "react";
import "./Profile.css";

const Profile = () => {
  const [artStyle, setArtStyle] = useState("Rider-Waite");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleArtStyleChange = (e) => setArtStyle(e.target.value);

  return (
    <div className="profile-page">
      <div className="profile-left">
        <div className="profile-image-container">
          <img
            src="/default-profile.jpg"
            alt="Profile"
            className="profile-image"
          />
          <div className="profile-buttons">
            <button className="spooky-button">
              Generate New Profile Image
            </button>
            <button className="spooky-button">Personal Gallery</button>
            <button className="spooky-button">Calendar</button>
          </div>
        </div>

        <div className="saved-logs">
          <h2>Saved Logs</h2>
          <ul>
            <li>Log Entry 1 - 10/24/2024</li>
            <li>Log Entry 2 - 10/18/2024</li>
            <li>Log Entry 3 - 10/05/2024</li>
          </ul>
        </div>
      </div>

      <div className="profile-right">
        <h2>Settings</h2>
        <div className="settings-section">
          <label>Art Style</label>
          <select value={artStyle} onChange={handleArtStyleChange}>
            <option value="Rider-Waite">Rider-Waite</option>
            <option value="AI">AI-Generated</option>
            <option value="Random">Random Style</option>
          </select>
        </div>

        <div className="settings-section">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Update Email"
          />
        </div>

        <div className="settings-section">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Update Username"
          />
        </div>

        <div className="settings-section">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Update Password"
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
