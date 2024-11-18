import React, { useState } from "react";
import Typewriter from "../Typewriter";
import TarotChat from "../TarotChat";

const SpeakToFortunetellerWorkflow = () => {
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [isFortunetellerVisible, setIsFortunetellerVisible] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [startTypewriter, setStartTypewriter] = useState(false);

  const handleStartChat = () => {
    setIsChatVisible(true);
  };

  const handleImageLoad = () => {
    setIsImageLoaded(true);

    setTimeout(() => {
      setStartTypewriter(true);
    }, 1500);
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
    <div className="proceed-to-cards-workflow">
      <Typewriter
        text="SO YOU have chosen to speak with the fortuneteller."
        startAnimation
        onEnd={() => setIsFortunetellerVisible(true)}
      />

      {isFortunetellerVisible && (
        <div className="speak-to-fortuneteller-workflow">
          <img
            className={`esmeralda ${isImageLoaded ? "fade-in" : ""}`}
            src="/esmeralda-universe-images/esmeralda.webp"
            alt="esmeralda"
            onLoad={handleImageLoad}
          />

          {startTypewriter && (
            <Typewriter
              text={esmeraldaIntro}
              startAnimation
              onEnd={() => handleStartChat()}
            />
          )}

          {isChatVisible && <TarotChat />}
        </div>
      )}
    </div>
  );
};

export default SpeakToFortunetellerWorkflow;
