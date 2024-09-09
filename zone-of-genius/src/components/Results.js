import React from 'react';
import './Results.css';

function Results({ results, onRestart }) {
  return (
    <div className="results">
      <div className="nature-element leaf"></div>
      <div className="nature-element crystal"></div>
      <h2><i className="fas fa-star icon"></i>Your Zone of Genius Journey</h2>
      <div className="journey-map">
        <div className="journey-step">
          <i className="fas fa-lightbulb icon"></i>
          <h3>Top Talents</h3>
          <p>{results.talents ? Object.values(results.talents).join(', ') : 'Not specified'}</p>
        </div>
        <div className="journey-step">
          <i className="fas fa-brain icon"></i>
          <h3>Inner States</h3>
          <p>{results.innerStates || 'Not specified'}</p>
        </div>
        <div className="journey-step">
          <i className="fas fa-rocket icon"></i>
          <h3>ZoG Statement</h3>
          <p>{results.zogStatement || 'Not specified'}</p>
        </div>
      </div>
      <div className="next-steps">
        <h3><i className="fas fa-forward icon"></i>Next Steps</h3>
        <ul>
          <li>Reflect on your Zone of Genius daily</li>
          <li>Incorporate your talents into your work</li>
          <li>Share your insights with others</li>
          <li>Explore ways to further develop your strengths</li>
        </ul>
      </div>
      <button onClick={onRestart} className="restart-button">
        <i className="fas fa-redo icon"></i>Restart Journey
      </button>
    </div>
  );
}

export default Results;