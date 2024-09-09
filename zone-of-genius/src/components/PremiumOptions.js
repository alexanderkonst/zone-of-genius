import React from 'react';
import './PremiumOptions.css';

function PremiumOptions({ onFinish, onBack }) {
  const handleOptionSelect = (option) => {
    // Here you would typically handle the selection of a premium option
    console.log('Selected premium option:', option);
    // For now, we'll just move to the finish step
    onFinish();
  };

  return (
    <div className="premium-options">
      <div className="nature-element leaf"></div>
      <div className="nature-element crystal"></div>
      <h2><i className="fas fa-star icon"></i>Enhance Your Zone of Genius Experience</h2>
      <p>Choose from our premium options to take your journey to the next level:</p>
      <div className="options-grid">
        <div className="option-card" onClick={() => handleOptionSelect('career')}>
          <i className="fas fa-briefcase icon"></i>
          <h3>Level Up Your Career</h3>
          <p>Personalized coaching to apply your Zone of Genius in your professional life.</p>
        </div>
        <div className="option-card" onClick={() => handleOptionSelect('job')}>
          <i className="fas fa-search icon"></i>
          <h3>Find an Aligned Job</h3>
          <p>Job matching service based on your unique Zone of Genius.</p>
        </div>
        <div className="option-card" onClick={() => handleOptionSelect('club')}>
          <i className="fas fa-users icon"></i>
          <h3>Join ZoG Club</h3>
          <p>Connect with others who share your Zone of Genius.</p>
        </div>
        <div className="option-card" onClick={() => handleOptionSelect('deep-dive')}>
          <i className="fas fa-dharmachakra icon"></i>
          <h3>Deep ZoG Connection</h3>
          <p>Advanced techniques for enhanced flow state and monetization.</p>
        </div>
      </div>
      <div className="button-group">
        <button onClick={onBack} className="back-button"><i className="fas fa-arrow-left icon"></i>Back</button>
        <button onClick={onFinish} className="skip-button"><i className="fas fa-forward icon"></i>Skip for Now</button>
      </div>
    </div>
  );
}

export default PremiumOptions;