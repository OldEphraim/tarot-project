import React, { useEffect, useRef, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { useModal } from "../context/ModalContext";
import { scrollToElement } from "../utils/scrollToElement";

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

    if (!imageUrl || imageUrl.indexOf("images/") === -1) {
      loadTimeout = setTimeout(() => {
        if (spinnerRef.current) {
          setImgSrc("/tarot-images/error.webp");
        }
      }, 240000);

      return () => clearTimeout(loadTimeout);
    }
  }, [imageUrl]);

  const handleImageClick = () => {
    openModal("cardDetail", {
      card,
      imageUrl,
      position,
      positionMeaning,
      theme,
    });
  };

  return (
    <div className="card-container">
      {imgSrc ? (
        <img
          src={imgSrc}
          alt={card.name}
          onClick={handleImageClick}
          data-theme={theme}
        />
      ) : (
        <Box ref={spinnerRef} sx={{ display: "flex", pointerEvents: "none" }}>
          <CircularProgress color="inherit" />
        </Box>
      )}
      {positionMeaning && (
        <div onClick={() => scrollToElement(`explanation-text-${position}`)}>
          <div className="position-meaning">
            <strong>{positionMeaning.text}</strong>
          </div>
          <div className="position-meaning">{positionMeaning.emoji}</div>
        </div>
      )}
    </div>
  );
};

export default TarotCardImage;
