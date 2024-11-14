import React from "react";
import { Link } from "react-router-dom";
import Typewriter from "./Typewriter";
import { useAuth } from "../context/AuthContext";
import { useTarot } from "../context/TarotContext";

const Closing = () => {
  const { isAuthenticated } = useAuth();
  const { workflow } = useTarot();

  const getMessage = () => {
    if (workflow === "cards") {
      return isAuthenticated
        ? "I hope you have found meaning in the cards today. You may save your results."
        : "I hope you have found meaning in the cards today. To save your results, please log in.";
    } else if (workflow === "fortuneteller") {
      return isAuthenticated
        ? "The fortuneteller has drawn your cards. While you may continue speaking to the fortuneteller, you may save your results."
        : "The fortuneteller has drawn your cards. While you may continue speaking to the fortuneteller, you can also log in to save your results.";
    }
    return "";
  };

  return (
    <div className={`closing ${workflow}`}>
      <Typewriter text={getMessage()} startAnimation />

      <div className="button-container">
        {isAuthenticated ? (
          <button className="spooky-button">SAVE READING</button>
        ) : (
          <button className="spooky-button">
            <Link to="/login" className="no-style-link">
              LOG IN
            </Link>
          </button>
        )}
        <button
          className="spooky-button"
          onClick={() => window.location.reload()}
        >
          REFRESH PAGE FOR NEW CARDS
        </button>
      </div>
    </div>
  );
};

export default Closing;
