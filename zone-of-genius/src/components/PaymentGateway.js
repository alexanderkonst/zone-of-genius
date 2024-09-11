import React, { useState } from 'react';
import './PaymentGateway.css';

const PaymentGateway = ({ amount, onSuccess, onCancel }) => {
  const [processing, setProcessing] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      onSuccess();
    }, 2000);
  };

  const handleSkip = () => {
    onSuccess();
  };

  return (
    <div className="payment-gateway">
      <div className="nature-element leaf"></div>
      <div className="nature-element crystal"></div>
      <h2><i className="fas fa-lock icon"></i>Activate Your Zone of Genius</h2>
      <div className="dummy-notice">
        <p><strong>Note:</strong> This is a dummy payment page. You will not be charged.</p>
      </div>
      <p>Unlock the full potential of your Zone of Genius with our guided meditation.</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="card-number">Card Number</label>
          <input type="text" id="card-number" placeholder="1234 5678 9012 3456" />
        </div>
        <div className="form-group">
          <label htmlFor="expiry">Expiry Date</label>
          <input type="text" id="expiry" placeholder="MM/YY" />
        </div>
        <div className="form-group">
          <label htmlFor="cvc">CVC</label>
          <input type="text" id="cvc" placeholder="123" />
        </div>
        <button type="submit" disabled={processing} className="pay-button">
          {processing ? 'Processing...' : `Pay $${amount}`}
        </button>
      </form>
      <div className="button-group">
        <button onClick={handleSkip} className="skip-button">Skip Payment (Continue for Free)</button>
        <button onClick={onCancel} className="cancel-button">Cancel</button>
      </div>
    </div>
  );
};

export default PaymentGateway;