import * as Typewriter from 'react-effect-typewriter';

const TypewriterStep = ({ text, isVisible, onEnd }) => (
  <Typewriter.Container className="typewriter-effects">
    <Typewriter.Paragraph 
      className="typewriter-effects" 
      typingSpeed={20} 
      startAnimation={isVisible} 
      onEnd={onEnd}
    >
      {text}
    </Typewriter.Paragraph>
  </Typewriter.Container>
);

export default TypewriterStep;