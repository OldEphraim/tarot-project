import React, { useState, useEffect, useRef } from "react";

const Typewriter = ({
  text,
  typingSpeed = 20,
  startAnimation = false,
  onEnd,
  className = "typewriter-effects",
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const hasEnded = useRef(false);

  useEffect(() => {
    if (startAnimation) {
      setDisplayedText("");
      setIndex(0);
      hasEnded.current = false;
    }
  }, [startAnimation, text]);

  useEffect(() => {
    if (!startAnimation || index >= text.length) return;

    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text[index]);
      setIndex((prev) => prev + 1);
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [startAnimation, index, text, typingSpeed]);

  useEffect(() => {
    if (index === text.length && onEnd && !hasEnded.current) {
      hasEnded.current = true;
      onEnd();
    }
  }, [index, text.length, onEnd]);

  return <div className={className}>{displayedText}</div>;
};

export default Typewriter;
