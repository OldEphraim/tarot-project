import React, { useEffect, useRef, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { useModal } from "../context/ModalContext";

const TarotCardImage = ({
  card,
  imageUrl,
  position,
  positionMeaning,
  theme,
}) => {
  const [imgSrc, setImgSrc] = useState(imageUrl || null);
  const spinnerRef = useRef(null);
  const { openModal } = useModal();

  useEffect(() => {
    setImgSrc(imageUrl);
    let loadTimeout;

    if (!imageUrl) {
      loadTimeout = setTimeout(() => {
        if (spinnerRef.current) {
          setImgSrc("/tarot-images/error.webp");
        }
      }, 120000);

      return () => clearTimeout(loadTimeout);
    }
  }, [imageUrl]);

  const handleClick = () => {
    openModal({ card, imageUrl, position, positionMeaning, theme });
  };

  return (
    <div>
      {imgSrc ? (
        <img src={imgSrc} alt={card.name} onClick={handleClick} />
      ) : (
        <Box ref={spinnerRef} sx={{ display: "flex", pointerEvents: "none" }}>
          <CircularProgress color="inherit" />
        </Box>
      )}
    </div>
  );
};

export default TarotCardImage;
