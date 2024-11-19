import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createAccount } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import "./CreateAccount.css";

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, user } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const { username, email, password, confirmPassword } = formData;

    if (!username)
      setErrors((prev) => ({ ...prev, username: "Username is required" }));
    if (!email) setErrors((prev) => ({ ...prev, email: "Email is required" }));
    if (password !== confirmPassword)
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords must match",
      }));

    if (username && email && password === confirmPassword) {
      try {
        setIsSubmitting(true);
        await createAccount(formData);
      } catch (error) {
        if (error.message.includes("Username is already taken")) {
          setErrors((prev) => ({ ...prev, username: error.message }));
        } else if (error.message.includes("Email is already taken")) {
          setErrors((prev) => ({ ...prev, email: error.message }));
        } else {
          setErrors({ form: error.message });
        }
      } finally {
        setIsSubmitting(false);
        try {
          await login({ username, password });
        } catch (error) {
          // This will eventually require Delete Account functionality to do right
          setErrors({ form: error.message });
        } finally {
          navigate(`/${user.username}`); // Go to profile if logged in
        }
      }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content create-account-modal">
        <Link to="/">
          <div className="modal-close">X</div>
        </Link>

        <h2 className="modal-name">Join Us</h2>
        <p className="explanation">
          Embrace new beginnings. Fill in your details below to create your
          account!
        </p>

        <div className="tarot-images">
          <img src="/tarot-images/card_00.jpg" alt="First Card" />
          <img src="/tarot-images/card_78.jpg" alt="Last Card" />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && (
              <span className="error-text">{errors.username}</span>
            )}
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <span className="error-text">{errors.confirmPassword}</span>
            )}
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating Account..." : "Create Your Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
