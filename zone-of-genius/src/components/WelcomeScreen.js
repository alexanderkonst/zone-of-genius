import React, { useState, useCallback, useEffect } from 'react';
import './WelcomeScreen.css';

function WelcomeScreen({ onStart }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const breathingAnimation = setInterval(() => {
      setScale((prevScale) => (prevScale === 1 ? 1.5 : 1));
    }, 5500);

    return () => clearInterval(breathingAnimation);
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (name || email) {
      if (email && !isValidEmail(email)) {
        setError('Please enter a valid email address.');
        return;
      }
    }
    onStart({ name, email });
  }, [name, email, onStart]);

  const handleSkip = useCallback(() => {
    onStart({});
  }, [onStart]);

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  return (
    <div className="welcome-screen">
      <div className="content">
        <div 
          className="breathing-bubble"
          style={{ transform: `scale(${scale})` }}
        />
        <p className="breathing-instruction">
          Take your deepest breath of today, start with your belly, then inflate your chest, all the way up
        </p>
        <h1>Zone of Genius</h1>
        <p>Discover the synergy of human intelligence and AI wisdom</p>
        <form onSubmit={handleSubmit} className="user-form">
          <input
            type="text"
            placeholder="Your Name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-label="Your Name"
          />
          <input
            type="email"
            placeholder="Your Email (optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Your Email"
          />
          {error && <p className="error-message" role="alert">{error}</p>}
          <button type="submit" className="pulsating-button">
            <i className="fas fa-rocket icon" aria-hidden="true"></i>
            Begin Your Journey
          </button>
        </form>
        <button onClick={handleSkip} className="skip-button">
          Skip and Start Anonymously
        </button>
      </div>
    </div>
  );
}

export default React.memo(WelcomeScreen);
