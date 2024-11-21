import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getSavedReading } from "../../services/profileService";
import { useFavorites } from "../../hooks/useFavorites";
import { useTarotDeck } from "../../hooks/useTarotDeck";

const SavedLogsSection = () => {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState(null);

  const { user } = useAuth();
  const { deck, error: deckError } = useTarotDeck();
  const { favorites, error: favoritesError } = useFavorites(user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (deck && user && favorites) {
          const readings = await getSavedReading(user);
          const filteredJournalEntries = favorites.filter(
            (entry) => entry.JournalEntry?.String !== ""
          );

          const combinedLogs = [
            ...readings.map((reading) => ({
              type: "reading",
              timestamp: new Date(reading.created_at).getTime(),
              title: reading.title,
              ...reading,
            })),
            ...filteredJournalEntries.map((entry) => {
              const cardDetails = getCardDetails(entry.CardName, deck);
              return {
                type: "journal",
                timestamp: new Date(entry.UpdatedAt).getTime(),
                title: `${cardDetails ? cardDetails.name : entry.CardName}, ${entry.ArtStyle}`, // Use card.details.name or fallback to entry.CardName
                ...entry,
              };
            }),
          ];

          const sortedLogs = combinedLogs.sort(
            (a, b) => b.timestamp - a.timestamp
          );

          setLogs(sortedLogs);
        }
      } catch (error) {
        setError("Could not load saved logs or tarot deck.");
      }
    };

    fetchData();
  }, [user, deck, favorites]);

  const getCardDetails = (cardName, deck) => {
    const card = deck.find((card) => card.details.name === cardName);
    return card ? card : null;
  };

  const combinedError = error || deckError || favoritesError;

  return (
    <div className="saved-logs">
      <h2>Saved Logs</h2>
      {combinedError ? (
        <p className="error">{combinedError}</p>
      ) : logs.length === 0 ? (
        <p>No saved logs yet.</p>
      ) : (
        <ul>
          {logs.map((log, index) => (
            <li key={index}>
              {log.type === "reading" ? (
                <Link
                  to={`/${user.username}/readings/${log.slug}`}
                  className="log-link"
                >
                  {log.title} - {new Date(log.timestamp).toLocaleDateString()}
                </Link>
              ) : (
                <Link
                  to={`/${user.username}/favorites/${log.ID}`}
                  className="log-link"
                >
                  {log.title} - {new Date(log.timestamp).toLocaleDateString()}
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedLogsSection;
