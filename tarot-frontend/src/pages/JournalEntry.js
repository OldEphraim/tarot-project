import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getFavoriteById } from "../services/profileService";

const JournalEntry = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [favorite, setFavorite] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorite = async () => {
      try {
        const data = await getFavoriteById(user, id);
        console.log(data);
        setFavorite(data);
      } catch (error) {
        console.error("Error fetching reading:", error);
      }
    };

    fetchFavorite();
  }, [id, user]);

  if (error) {
    return <h2>{error}</h2>;
  }

  if (!favorite) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h1>{favorite.card_name}</h1>
      <p>{favorite.art_style}</p>
      <div>{favorite.journal_entry.String}</div>
    </div>
  );
};

export default JournalEntry;
