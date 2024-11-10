import React, { useState } from "react";
import Typewriter from "../Typewriter";
import TarotChat from "../TarotChat";

const SpeakToFortunetellerWorkflow = ({ onExit }) => {
  const [isChatVisible, setIsChatVisible] = useState(false);

  const handleStartChat = () => {
    setIsChatVisible(true);
  };

  const esmeraldaIntro = `
  Ah, you've come seeking answers, have you? 
  They call me Esmeralda Nightshade, and I've been reading these cards longer than most have been alive.
  Sit yourself down, breathe deep, and let the incense clear your mind—I'll tell you this now: 
  I don't sugarcoat. Life’s like a garden, you see—sometimes you've got to pull up the pretty weeds 
  to let the useful ones grow. So, speak freely, or let me do the talking, 
  but I promise, I'll tell you what you need to hear—not just what you want.
`;

  return (
    <div className="speak-to-fortuneteller-workflow">
      <img
        className="esmeralda"
        src="/esmeralda-universe-images/esmeralda.webp"
        alt="esmeralda"
      />

      <Typewriter
        text={esmeraldaIntro}
        startAnimation
        onEnd={() => handleStartChat()}
      />

      {isChatVisible && <TarotChat />}
    </div>
  );
};

export default SpeakToFortunetellerWorkflow;
