import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

const Login = ({ onClose }) => {
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setServerError(""); // Clear previous server errors
    const { username, password } = formData;

    // Frontend validation
    const validationErrors = {};
    if (!username) validationErrors.username = "Username is required";
    if (!password) validationErrors.password = "Password is required";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      // Use login from context to handle login logic
      await login({ username, password });
      onClose(); // Close modal on successful login
    } catch (error) {
      setServerError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content login-modal">
        <button className="modal-close" onClick={onClose}>
          X
        </button>

        <h2 className="modal-name">Welcome Back</h2>
        <p className="explanation">
          Glad to see you again. Enter your credentials below to continue your
          journey with us.
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
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <span className="error-text">{errors.password}</span>
            )}
          </div>

          {serverError && <div className="server-error">{serverError}</div>}

          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging In..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
