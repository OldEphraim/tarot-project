import { useEffect } from 'react';

export const useInactivityHandler = (cardsLength, setSkipAnimation, setCurrentCardIndex) => {
  useEffect(() => {
    let inactivityTimeout;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        inactivityTimeout = setTimeout(() => {
          setSkipAnimation(true);
          setCurrentCardIndex(cardsLength);
        }, 60000); // 60 seconds
      } else {
        clearTimeout(inactivityTimeout);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearTimeout(inactivityTimeout); // Cleanup on unmount
    };
  }, [cardsLength, setSkipAnimation, setCurrentCardIndex]);
};