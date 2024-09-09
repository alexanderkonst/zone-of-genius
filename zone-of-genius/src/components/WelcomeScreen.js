import React, { useEffect, useState } from 'react';
import './WelcomeScreen.css';

function WelcomeScreen({ onStart }) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const breathingAnimation = setInterval(() => {
      setScale((prevScale) => (prevScale === 1 ? 1.2 : 1));
    }, 3500);

    return () => clearInterval(breathingAnimation);
  }, []);

  return (
    <div className="welcome-screen">
      <div className="content">
        <div className="nature-element leaf"></div>
        <div className="nature-element crystal"></div>
        <div 
          className="breathing-bubble"
          style={{ transform: `scale(${scale})` }}
        />
        <h1>Zone of Genius</h1>
        <p>Discover the synergy of human intelligence and AI wisdom</p>
        <button className="pulsating-button" onClick={onStart}>
          <i className="fas fa-rocket icon"></i>
          Begin Your Journey
        </button>
      </div>
    </div>
  );
}

export default WelcomeScreen;
