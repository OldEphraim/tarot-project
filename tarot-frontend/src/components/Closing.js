import React from "react";
import { Link } from "react-router-dom";
import Typewriter from "./Typewriter";
import { handleSaveReading } from "../services/profileService";
import { useAuth } from "../context/AuthContext";
import { useTarot } from "../context/TarotContext";
import { extractWorkflowData } from "../utils/formatWorkflowJson";

const Closing = ({ artStyle }) => {
  const { isAuthenticated, user } = useAuth();
  const { selectedSpread, userReason, workflow } = useTarot();

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

  const saveReading = async () => {
    try {
      const workflowData =
        workflow === "cards"
          ? extractWorkflowData(workflow, {
              artStyle: artStyle,
              userReason: userReason,
              layout: selectedSpread,
            })
          : extractWorkflowData(workflow);
      await handleSaveReading(user, workflowData);
    } catch (error) {
      console.error("Error saving log:", error);
    }
  };

  return (
    <div className={`closing ${workflow}`}>
      {workflow === "cards" ? (
        <Typewriter text={getMessage()} startAnimation />
      ) : (
        <div className="saved-typewriter">{getMessage()}</div>
      )}

      <div className="button-container">
        {isAuthenticated ? (
          <button className="spooky-button" onClick={saveReading}>
            SAVE READING
          </button>
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
