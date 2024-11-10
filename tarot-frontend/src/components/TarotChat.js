import React, { useState, useRef, useEffect } from 'react';
import Typewriter from './Typewriter';
import { getEsmeraldaResponse } from '../services/openaiService';
import './TarotChat.css';

const TarotChat = () => {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  const [showTextarea, setShowTextarea] = useState(true);
  const [loading, setLoading] = useState(false);
  const [startTyping, setStartTyping] = useState(false);
  const textareaRef = useRef(null);

  const handleInputChange = (e) => {
    const text = e.target.value;
    setMessage(text);
    adjustTextareaHeight();
  };

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter' && !e.shiftKey && message.trim()) {
      e.preventDefault();
      setLoading(true);
      setShowTextarea(false);
      setConversation((prevConversation) => [
        ...prevConversation,
        { text: message, sender: 'user' },
      ]);

      const aiResponse = await getEsmeraldaResponse(message);
      setMessage('');
      setLoading(false);

      setConversation((prevConversation) => [
        ...prevConversation,
        { text: aiResponse, sender: 'esmeralda' },
      ]);
      setStartTyping(true);
    }
  };

  const adjustTextareaHeight = (reset = false) => {
    if (textareaRef.current) {
      if (reset) {
        textareaRef.current.style.height = 'auto';
      }
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [message]);

  const handleTypewriterEnd = () => {
    setStartTyping(false);
    setShowTextarea(true);
  };

  return (
    <div className="tarot-chat">
      {/* Render conversation history */}
      <div className="conversation-history">
        {conversation.map((msg, index) => {
          const isLastMessage = index === conversation.length - 1;
          const shouldType = msg.sender === 'esmeralda' && isLastMessage && startTyping;

          return (
            <p key={index} className={msg.sender === 'user' ? 'user-message' : 'esmeralda-message'}>
              {shouldType ? (
                <Typewriter text={msg.text} startAnimation onEnd={handleTypewriterEnd} />
              ) : (
                msg.text
              )}
            </p>
          );
        })}
      </div>

      {/* Render textarea only when Esmeralda has finished typing */}
      {showTextarea && (
        <div className="message-input-box">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="message-input"
            style={{ resize: 'none', overflow: 'hidden' }}
          />
          <div className="below-text">
            Type your message and press Enter to respond to Esmeralda.
          </div>
        </div>
      )}

      {loading && <div className="loading-spinner">...</div>}
    </div>
  );
};

export default TarotChat;
