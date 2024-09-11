import React, { useState, useEffect } from 'react';
import './StepThree.css';
import LoadingSpinner from './LoadingSpinner';

function StepThree({ onNext, onBack }) {
  const [isMediating, setIsMediating] = useState(false);
  const [meditationTime, setMeditationTime] = useState(60);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [breathPhase, setBreathPhase] = useState('inhale');

  const handleStartMeditation = () => {
    setIsMediating(true);
    setMeditationTime(60);
  };

  useEffect(() => {
    let timer;
    if (isMediating && meditationTime > 0) {
      timer = setTimeout(() => {
        setMeditationTime(meditationTime - 1);
        setBreathPhase(prevPhase => prevPhase === 'inhale' ? 'exhale' : 'inhale');
      }, 1000);
    } else if (meditationTime === 0) {
      setIsMediating(false);
    }
    return () => clearTimeout(timer);
  }, [isMediating, meditationTime]);

  const handleNotesChange = (e) => setNotes(e.target.value);

  const handleSubmit = () => {
    if (notes.trim() === '') {
      alert('Please enter your reflections before proceeding.');
      return;
    }
    setLoading(true);
    // Simulate processing time
    setTimeout(() => {
      setLoading(false);
      onNext({ activationNotes: notes });
    }, 1500);
  };

  return (
    <div className="step-three">
      <h2><i className="fas fa-brain icon"></i>Activate Your Zone of Genius</h2>
      <div className="meditation">
        <h3><i className="fas fa-om icon"></i>Guided Meditation</h3>
        <p>Take a moment to connect with your inner genius through this guided meditation.</p>
        {isMediating ? (
          <div className="meditation-timer">
            <p><i className="fas fa-hourglass-half icon"></i>Time remaining: {meditationTime} seconds</p>
            <div className="meditation-progress-container">
              <div className="meditation-progress" style={{ width: `${(meditationTime / 60) * 100}%` }}></div>
            </div>
            <div className={`breath-bubble ${breathPhase}`}></div>
            <p className="breath-instruction">{breathPhase === 'inhale' ? 'Breathe in...' : 'Breathe out...'}</p>
          </div>
        ) : (
          <button onClick={handleStartMeditation}><i className="fas fa-play icon"></i>Start 1-Minute Meditation</button>
        )}
      </div>
      <div className="note-taking">
        <h3><i className="fas fa-pen-fancy icon"></i>Reflect on Your Experience</h3>
        <textarea
          value={notes}
          onChange={handleNotesChange}
          placeholder="Enter your thoughts and reflections here..."
          rows="5"
        />
      </div>
      <div className="button-group">
        <button onClick={onBack} className="back-button"><i className="fas fa-arrow-left icon"></i>Back</button>
        <button onClick={handleSubmit} className="next-button">
          {loading ? <LoadingSpinner /> : <><i className="fas fa-paper-plane icon"></i>Submit and Continue</>}
        </button>
      </div>
    </div>
  );
}

export default StepThree;
