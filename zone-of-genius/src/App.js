import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './App.css';
import WelcomeScreen from './components/WelcomeScreen';
import StepOne from './components/StepOne';
import StepTwo from './components/StepTwo';
import StepThree from './components/StepThree';
import PaymentGateway from './components/PaymentGateway';
import PremiumOptions from './components/PremiumOptions';
import Results from './components/Results';
import ProgressBar from './components/ProgressBar';

function App() {
  const [step, setStep] = useState(0);
  const [results, setResults] = useState({});
  const [isPaid, setIsPaid] = useState(false);

  const handleStart = () => setStep(1);
  const handleNextStep = (stepResults) => {
    setResults({ ...results, ...stepResults });
    setStep(step + 1);
  };
  const handlePreviousStep = () => setStep(step - 1);
  const handleFinish = () => setStep(5);
  const handlePaymentSuccess = () => {
    setIsPaid(true);
    setStep(3);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const totalSteps = 4;

  const renderStep = () => {
    switch (step) {
      case 0:
        return <WelcomeScreen onStart={handleStart} />;
      case 1:
        return <StepOne onNext={handleNextStep} onBack={() => setStep(0)} />;
      case 2:
        return <StepTwo onNext={handleNextStep} onBack={handlePreviousStep} />;
      case 3:
        return isPaid ? (
          <StepThree onNext={handleNextStep} onBack={handlePreviousStep} />
        ) : (
          <PaymentGateway 
            amount={20} 
            onSuccess={handlePaymentSuccess} 
            onCancel={handlePreviousStep}
          />
        );
      case 4:
        return <PremiumOptions onFinish={handleFinish} onBack={handlePreviousStep} />;
      case 5:
        return <Results results={results} onRestart={handleStart} />;
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <div className="app-background">
        <div className="iridescent-swirl"></div>
      </div>
      {step > 0 && step < 5 && <ProgressBar currentStep={step} totalSteps={totalSteps} />}
      <TransitionGroup>
        <CSSTransition
          key={step}
          classNames="fade"
          timeout={300}
        >
          {renderStep()}
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default App;
