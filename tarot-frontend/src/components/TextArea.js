import React, { useRef, useEffect } from "react";

const TextArea = ({ value, onChange, onSubmit, belowText, placeholder }) => {
  const textareaRef = useRef(null);

  const handleChange = (e) => {
    onChange(e);
    adjustTextareaHeight();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && value.trim()) {
      e.preventDefault();
      onSubmit();
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [value]);

  return (
    <>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="message-input"
        style={{ resize: "none", overflow: "hidden" }}
      />
      <div className="below-text">{belowText}</div>
    </>
  );
};

export default TextArea;
