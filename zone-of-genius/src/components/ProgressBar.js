import React from 'react';
import './ProgressBar.css';

function ProgressBar({ currentStep, totalSteps }) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="progress-bar-container">
      <div className="progress-bar" style={{ width: `${progress}%` }}>
        <div className="progress-glow"></div>
      </div>
      <div className="step-indicators">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div
            key={i}
            className={`step-indicator ${i < currentStep ? 'completed' : ''} ${i === currentStep - 1 ? 'current' : ''}`}
            aria-label={`Step ${i + 1} ${i < currentStep ? 'completed' : i === currentStep - 1 ? 'current' : ''}`}
          >
            <span className="step-number">{i + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProgressBar;