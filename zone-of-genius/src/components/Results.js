import React, { useState } from 'react';
import './Results.css';

function Results({ results, onRestart }) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const downloadSummary = () => {
    const summary = `
Zone of Genius Summary:

Name: ${results.name || 'Not specified'}
Email: ${results.email || 'Not specified'}
Top Talents: ${results.talents ? Object.values(results.talents).join(', ') : 'Not specified'}
Inner States: ${results.innerStates || 'Not specified'}
ZoG Statement: ${results.zogStatement || 'Not specified'}

Next Steps:
1. Reflect on your Zone of Genius daily
2. Incorporate your talents into your work
3. Share your insights with others
4. Explore ways to further develop your strengths
    `;

    const blob = new Blob([summary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'zone_of_genius_summary.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleRestartClick = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmRestart = () => {
    setShowConfirmModal(false);
    onRestart();
  };

  const handleCancelRestart = () => {
    setShowConfirmModal(false);
  };

  return (
    <div className="results">
      <div className="nature-element leaf"></div>
      <div className="nature-element crystal"></div>
      <h2><i className="fas fa-star icon"></i>Your Zone of Genius Journey</h2>
      <div className="journey-map">
        <div className="journey-step">
          <i className="fas fa-user icon"></i>
          <h3>Personal Info</h3>
          <p>Name: {results.name || 'Not specified'}</p>
          <p>Email: {results.email || 'Not specified'}</p>
        </div>
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
      <div className="button-group">
        <button onClick={downloadSummary} className="download-button">
          <i className="fas fa-download icon"></i>Download Summary
        </button>
        <button onClick={handleRestartClick} className="restart-button">
          <i className="fas fa-redo icon"></i>Restart Journey
        </button>
      </div>
      {showConfirmModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Confirm Restart</h3>
            <p>Are you sure you want to restart your journey? All progress will be lost.</p>
            <div className="modal-buttons">
              <button onClick={handleConfirmRestart}>Yes, Restart</button>
              <button onClick={handleCancelRestart}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Results;