import React, { useEffect, useState } from 'react';
import './BreathingAnimation.css';

const BreathingAnimation = () => {
  const [phase, setPhase] = useState('inhale');

  useEffect(() => {
    const timer = setInterval(() => {
      setPhase(prevPhase => {
        switch(prevPhase) {
          case 'inhale': return 'hold1';
          case 'hold1': return 'exhale';
          case 'exhale': return 'hold2';
          case 'hold2': return 'inhale';
          default: return 'inhale';
        }
      });
    }, 4000); // Change phase every 4 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`breathing-animation ${phase}`}>
      <div className="circle"></div>
      <p>{phase.charAt(0).toUpperCase() + phase.slice(1)}</p>
    </div>
  );
};

export default BreathingAnimation;
