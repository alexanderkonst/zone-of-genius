import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
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
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [results, setResults] = useState({});
  const [isPaid, setIsPaid] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    try {
      console.log('App mounted');
      const savedUserData = localStorage.getItem('userData');
      if (savedUserData) {
        try {
          const parsedUserData = JSON.parse(savedUserData);
          if (parsedUserData && typeof parsedUserData === 'object') {
            setUserData(parsedUserData);
          } else {
            console.warn('Invalid user data format in localStorage');
          }
        } catch (parseError) {
          console.error('Error parsing userData from localStorage:', parseError);
          localStorage.removeItem('userData'); // Clear invalid data
        }
      }
    } catch (err) {
      console.error('Error in initialization:', err);
      setError('An error occurred while initializing the app.');
    }
  }, []);

  const handleStart = useCallback((userInfo) => {
    setUserData(userInfo);
    localStorage.setItem('userData', JSON.stringify(userInfo));
    setIsLoading(true);
    setTimeout(() => {
      navigate('/step1');
      setIsLoading(false);
    }, 500);
  }, [navigate]);

  const handleNextStep = useCallback((stepResults) => {
    setResults(prevResults => ({ ...prevResults, ...stepResults }));
    setIsLoading(true);
    setTimeout(() => {
      const currentPath = location.pathname;
      const nextStep = parseInt(currentPath.slice(-1)) + 1;
      navigate(`/step${nextStep}`);
      setIsLoading(false);
    }, 500);
  }, [navigate, location]);

  const handlePreviousStep = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      const currentPath = location.pathname;
      const prevStep = parseInt(currentPath.slice(-1)) - 1;
      navigate(prevStep === 0 ? '/' : `/step${prevStep}`);
      setIsLoading(false);
    }, 500);
  }, [navigate, location]);

  const handleFinish = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      navigate('/results');
      setIsLoading(false);
    }, 500);
  }, [navigate]);

  const handlePaymentSuccess = useCallback(() => {
    setIsPaid(true);
    setIsLoading(true);
    setTimeout(() => {
      navigate('/step3');
      setIsLoading(false);
    }, 500);
  }, [navigate]);

  const handleRestart = useCallback(() => {
    setResults({});
    setIsPaid(false);
    navigate('/');
  }, [navigate]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="App" role="main">
      <div className="app-background">
        <div className="iridescent-swirl" aria-hidden="true"></div>
      </div>
      <ProgressBar currentStep={parseInt(location.pathname.slice(-1)) || 0} totalSteps={4} />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <TransitionGroup>
          <CSSTransition
            key={location.pathname}
            classNames="fade"
            timeout={300}
          >
            <Routes location={location}>
              <Route path="/" element={<WelcomeScreen onStart={handleStart} />} />
              <Route path="/step1" element={<StepOne onNext={handleNextStep} onBack={handlePreviousStep} />} />
              <Route path="/step2" element={<StepTwo onNext={handleNextStep} onBack={handlePreviousStep} />} />
              <Route path="/step3" element={
                isPaid ? (
                  <StepThree onNext={handleNextStep} onBack={handlePreviousStep} />
                ) : (
                  <PaymentGateway 
                    amount={20} 
                    onSuccess={handlePaymentSuccess} 
                    onCancel={handlePreviousStep}
                  />
                )
              } />
              <Route path="/step4" element={<PremiumOptions onFinish={handleFinish} onBack={handlePreviousStep} />} />
              <Route path="/results" element={<Results results={{...results, ...userData}} onRestart={handleRestart} />} />
            </Routes>
          </CSSTransition>
        </TransitionGroup>
      )}
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
