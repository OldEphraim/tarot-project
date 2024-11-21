import { useEffect, useRef, useState } from "react";
import { searchCardByName } from "../services/tarotService";
import { useCardImages } from "../hooks/useCardImages";
import { formatCardName } from "../utils/formatCardName";

export const useGenerateImage = () => {
  const [selectedCard, setSelectedCard] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("");
  const [cardObject, setCardObject] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPicture, setGeneratedPicture] = useState([]);
  const [shouldFetchImages, setShouldFetchImages] = useState(false);
  const [shouldClearRequests, setShouldClearRequests] = useState(false);

  const spinnerRef = useRef(null);

  const { imageRequests } = useCardImages(
    shouldFetchImages ? [cardObject] : [],
    shouldFetchImages ? selectedTheme : null,
    shouldClearRequests
  );

  useEffect(() => {
    let loadTimeout;

    if (
      generatedPicture.length === 0 ||
      !generatedPicture[0].includes("images/")
    ) {
      loadTimeout = setTimeout(() => {
        if (spinnerRef.current) {
          setGeneratedPicture(["/tarot-images/error.webp", "error", "Error"]);
        }
      }, 120000);

      return () => clearTimeout(loadTimeout);
    }
  }, [generatedPicture]);

  useEffect(() => {
    if (
      cardObject &&
      imageRequests[cardObject.name] &&
      imageRequests[cardObject.name].status === "ready"
    ) {
      setGeneratedPicture([
        imageRequests[cardObject.name].url,
        formatCardName(cardObject.name),
        selectedTheme,
      ]);
      setIsGenerating(false);
      setShouldFetchImages(false);
    }
  }, [imageRequests, cardObject, selectedCard, selectedTheme]);

  const handleCardChange = async (e) => {
    const cardName = e.target.value;
    setSelectedCard(cardName);

    if (cardName) {
      try {
        const card = await searchCardByName(formatCardName(cardName));
        setCardObject(card);
      } catch (error) {
        console.error("Failed to fetch card data:", error);
      }
    } else {
      setCardObject(null);
    }
  };

  const handleThemeChange = (e) => {
    setSelectedTheme(e.target.value);
  };

  const handleGeneratePicture = () => {
    setShouldClearRequests(true);
    setTimeout(() => {
      setIsGenerating(true);
      setShouldFetchImages(true);
      setShouldClearRequests(false);
    }, 0);
  };

  const isPictureReady = generatedPicture.length > 0;

  return {
    selectedCard,
    selectedTheme,
    generatedPicture,
    isGenerating,
    isPictureReady,
    handleCardChange,
    handleThemeChange,
    handleGeneratePicture,
    setGeneratedPicture,
    spinnerRef,
  };
};
