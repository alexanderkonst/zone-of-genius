import React, { useState } from 'react';
import './StepTwo.css';

function StepTwo({ onNext, onBack }) {
  const [zogSentence, setZogSentence] = useState('');

  const handleZogSentenceChange = (e) => setZogSentence(e.target.value);

  const handleSubmit = () => {
    if (zogSentence.trim() === '') {
      alert('Please enter your Zone of Genius statement before proceeding.');
      return;
    }
    onNext({ zogStatement: zogSentence });
  };

  return (
    <div className="step-two">
      <h2><i className="fas fa-rocket icon"></i>Apply Your Zone of Genius</h2>
      <div className="inspiration">
        <h3><i className="fas fa-lightbulb icon"></i>Inspiration</h3>
        <p>Here are some ways you can apply your Zone of Genius in your daily life:</p>
        <ul>
          <li><i className="fas fa-briefcase icon"></i>Incorporate your top talents into your current job</li>
          <li><i className="fas fa-project-diagram icon"></i>Start a side project that leverages your unique skills</li>
          <li><i className="fas fa-hands-helping icon"></i>Volunteer for organizations that align with your genius</li>
          <li><i className="fas fa-chalkboard-teacher icon"></i>Teach or mentor others in your area of expertise</li>
        </ul>
      </div>
      <div className="zog-statement">
        <h3><i className="fas fa-pen-fancy icon"></i>Create Your Zone of Genius Statement</h3>
        <textarea
          value={zogSentence}
          onChange={handleZogSentenceChange}
          placeholder="My Zone of Genius is..."
          rows="3"
        />
      </div>
      <div className="button-group">
        <button onClick={onBack} className="back-button"><i className="fas fa-arrow-left icon"></i>Back</button>
        <button onClick={handleSubmit} className="next-button"><i className="fas fa-arrow-right icon"></i>Next Step</button>
      </div>
    </div>
  );
}

export default StepTwo;
