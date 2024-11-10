import { useState, useEffect } from "react";
import { useCardImages } from "../hooks/useCardImages";

const useProcessEsmeraldaResponse = (cards) => {
  const { imageRequests } = useCardImages(cards, "Rider-Waite");

  return { imageRequests };
};

export default useProcessEsmeraldaResponse;
