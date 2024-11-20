import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  getFavoriteById,
  updateJournalEntry,
} from "../services/profileService";
import { useCardDetails } from "../hooks/useCardDetails";
import TextArea from "../components/TextArea";
import "./JournalEntry.css";

const JournalEntry = () => {
  const [favorite, setFavorite] = useState(null);
  const [error, setError] = useState(null);
  const [journalText, setJournalText] = useState(""); // Tracks user input

  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { card, error: cardError } = useCardDetails(favorite?.card_name);

  useEffect(() => {
    const fetchFavorite = async () => {
      try {
        const data = await getFavoriteById(user, id);
        setFavorite(data);

        // Initialize journal text
        const initialText = data.journal_entry.Valid
          ? data.journal_entry.String
          : "";
        setJournalText(initialText);
      } catch (error) {
        console.error("Error fetching favorite:", error);
        setError("Error fetching journal entry.");
      }
    };

    fetchFavorite();
  }, [id, user]);

  const handleSave = async () => {
    try {
      await updateJournalEntry(user, id, journalText);
    } catch (err) {
      console.error("Failed to save journal entry:", err);
    }
  };

  const handleAbandon = () => {
    navigate(`/${user.username}/favorites`);
  };

  const handleChange = (e) => {
    setJournalText(e.target.value);
  };

  const combinedError = error || cardError;

  if (combinedError) {
    return <h2>{combinedError}</h2>;
  }

  if (!favorite || !card) {
    return <h2>Loading...</h2>;
  }

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }

  return (
    <div className="journal-entry-page">
      <h1 className="journal-entry-header">{card.name}</h1>
      <p className="journal-entry-art-style">
        in the {favorite.art_style} style
      </p>
      <p style={{ color: "black" }}>
        Image generated on {formatTimestamp(favorite.created_at)}
      </p>
      <p style={{ color: "black" }}>
        Journal entry updated on {formatTimestamp(favorite.updated_at)}
      </p>
      <div className="tarot-card">
        <img src={favorite.image_url} alt={card.name} />
      </div>
      <div className="emoji">{card.details.emoji}</div>
      <TextArea
        value={journalText}
        onChange={handleChange}
        onSubmit={handleSave}
        belowText=""
        placeholder="Add your journal entry..."
      />
      <div className="button-container" style={{ textTransform: "uppercase" }}>
        <button className="spooky-button" onClick={handleSave}>
          SAVE JOURNAL ENTRY
        </button>
        <button className="spooky-button" onClick={handleAbandon}>
          ABANDON CHANGES
        </button>
      </div>
    </div>
  );
};

export default JournalEntry;
