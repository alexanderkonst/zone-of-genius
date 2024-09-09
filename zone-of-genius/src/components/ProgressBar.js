import React from 'react';
import './ProgressBar.css';

function ProgressBar({ currentStep, totalSteps }) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="progress-bar-container">
      <div className="progress-bar" style={{ width: `${progress}%` }}>
        <div className="progress-glow"></div>
      </div>
    </div>
  );
}

export default ProgressBar;