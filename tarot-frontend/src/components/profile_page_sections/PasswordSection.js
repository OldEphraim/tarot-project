import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { updatePassword } from "../../services/profileService";

const PasswordSection = () => {
  const [passwordEditable, setPasswordEditable] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { user, logout } = useAuth();

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

  return (
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
  );
};

export default PasswordSection;
