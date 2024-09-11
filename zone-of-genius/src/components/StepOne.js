import React, { useState, useCallback } from 'react';
import './StepOne.css';

function StepOne({ onNext, onBack }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [error, setError] = useState('');

  const handleAnswerSelect = useCallback((questionId, answer) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: answer }));
    setError('');
  }, []);

  const handleSubmit = useCallback(() => {
    if (Object.keys(selectedAnswers).length < 2) {
      setError('Please answer both questions before proceeding.');
      return;
    }
    onNext({ talents: selectedAnswers });
  }, [selectedAnswers, onNext]);

  return (
    <div className="step-one">
      <h2><i className="fas fa-lightbulb icon" aria-hidden="true"></i>Identify Your Top Talents</h2>
      <div className="video-explainer">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="Zone of Genius Explainer"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="multiple-choice-test">
        <h3>Quick Talent Assessment</h3>
        <div className="question">
          <p>1. What energizes you the most?</p>
          <button onClick={() => handleAnswerSelect(1, 'A')} className={selectedAnswers[1] === 'A' ? 'selected' : ''}><i className="fas fa-cogs icon"></i>Solving complex problems</button>
          <button onClick={() => handleAnswerSelect(1, 'B')} className={selectedAnswers[1] === 'B' ? 'selected' : ''}><i className="fas fa-palette icon"></i>Creating artistic works</button>
          <button onClick={() => handleAnswerSelect(1, 'C')} className={selectedAnswers[1] === 'C' ? 'selected' : ''}><i className="fas fa-hands-helping icon"></i>Helping others</button>
        </div>
        <div className="question">
          <p>2. Which skill comes most naturally to you?</p>
          <button onClick={() => handleAnswerSelect(2, 'A')} className={selectedAnswers[2] === 'A' ? 'selected' : ''}><i className="fas fa-chart-bar icon"></i>Analyzing data</button>
          <button onClick={() => handleAnswerSelect(2, 'B')} className={selectedAnswers[2] === 'B' ? 'selected' : ''}><i className="fas fa-comments icon"></i>Communicating ideas</button>
          <button onClick={() => handleAnswerSelect(2, 'C')} className={selectedAnswers[2] === 'C' ? 'selected' : ''}><i className="fas fa-tasks icon"></i>Organizing people or projects</button>
        </div>
      </div>
      {error && <p className="error-message" role="alert"><i className="fas fa-exclamation-triangle icon" aria-hidden="true"></i>{error}</p>}
      <div className="button-group">
        <button onClick={onBack} className="back-button"><i className="fas fa-arrow-left icon" aria-hidden="true"></i>Back</button>
        <button onClick={handleSubmit} className="next-button"><i className="fas fa-arrow-right icon" aria-hidden="true"></i>Next Step</button>
      </div>
    </div>
  );
}

export default React.memo(StepOne);
