import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getRandomTheme } from "../constants/TarotThemes";
import {
  generateCardImage,
  retrieveCardImage,
} from "../services/openaiService";

export const useCardImages = (cards, artStyle, shouldClear) => {
  const [imageRequests, setImageRequests] = useState({});
  const hasFetched = useRef(false);

  const { user } = useAuth();

  useEffect(() => {
    if (shouldClear) {
      setImageRequests({});
      hasFetched.current = false;
    }
  }, [shouldClear]);

  useEffect(() => {
    if (!cards.length || !artStyle) return;

    const fetchImages = async () => {
      if (hasFetched.current) return;
      hasFetched.current = true;

      const newImageRequests = {};

      for (const card of cards) {
        if (artStyle === "Rider-Waite") {
          newImageRequests[card.name] = {
            status: "ready",
            url: `/tarot-images/card_${card.number}.jpg`,
            theme: "Rider-Waite",
          };
        } else if (artStyle === "Random") {
          const theme = getRandomTheme();
          const requestId = await generateCardImage(user, theme, card.name);
          newImageRequests[card.name] = {
            requestId,
            status: "pending",
            theme: theme,
          };
        } else {
          const requestId = await generateCardImage(user, artStyle, card.name);
          newImageRequests[card.name] = {
            requestId,
            status: "pending",
            theme: artStyle,
          };
        }
      }

      setImageRequests(newImageRequests);
    };

    if (cards.length > 0) {
      fetchImages();
    }
  }, [artStyle, cards, user]);

  useEffect(() => {
    const pollForImages = async () => {
      const newImageRequests = { ...imageRequests };

      for (const [cardName, request] of Object.entries(imageRequests)) {
        if (request.status === "pending") {
          const result = await retrieveCardImage(request.requestId);
          if (result.status === "ready") {
            newImageRequests[cardName] = {
              status: "ready",
              url: result.url,
              theme: request.theme,
            };
          }
        }
      }

      setImageRequests(newImageRequests);
    };

    if (
      artStyle !== "Rider-Waite" &&
      Object.values(imageRequests).some((req) => req.status === "pending")
    ) {
      const interval = setInterval(pollForImages, 3000);
      return () => clearInterval(interval);
    }
  }, [imageRequests, artStyle]);

  return { imageRequests, setImageRequests };
};
