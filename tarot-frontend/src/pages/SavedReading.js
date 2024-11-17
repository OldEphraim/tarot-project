import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getReadingBySlug } from "../services/profileService";

const SavedReading = () => {
  const { username, slug } = useParams();
  const { user } = useAuth();
  const [reading, setReading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReading = async () => {
      try {
        const data = await getReadingBySlug(user, slug);
        setReading(data);
      } catch (error) {
        console.error("Error fetching reading:", error);
      }
    };

    fetchReading();
  }, [slug, user]);

  if (error) {
    return <h2>{error}</h2>;
  }

  if (!reading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h1>{reading.title}</h1>
      <p>{reading.created_at}</p>
      <div>{JSON.stringify(reading.workflow_log)}</div>
    </div>
  );
};

export default SavedReading;
