import React, { useState } from "react";
import { getChatResponse } from "../services/openaiService";

const TarotChat = () => {
  const [userMessage, setUserMessage] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const aiResponse = await getChatResponse(userMessage);
    setResponse(aiResponse);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder="Ask the tarot a question..."
        />
        <button type="submit">Ask ChatGPT</button>
      </form>
      <div>
        <h3>Response:</h3>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default TarotChat;