import React, { useState } from 'react';

interface TutorialStep {
  title: string;
  description: string;
  icon: string;
}

const TUTORIAL_STEPS: TutorialStep[] = [
  {
    title: 'Welcome to Wichita to the Moon!',
    description: 'Use Wichita\'s aerospace innovation to build a moonbase. Click the innovation center to generate Innovation Capital (IC).',
    icon: '👋',
  },
  {
    title: 'Unlock Upgrades',
    description: 'Spend IC to unlock Wichita landmarks and companies. These upgrades increase your click power and provide passive IC generation.',
    icon: '🏪',
  },
  {
    title: 'Build the Moonbase',
    description: 'Invest IC into the 5 moonbase modules. Complete all modules to win!',
    icon: '🌙',
  },
  {
    title: 'Ready to Launch!',
    description: 'Click to generate IC, unlock upgrades, and build your moonbase. Good luck!',
    icon: '🚀',
  },
];

interface TutorialOverlayProps {
  onComplete: () => void;
}

export const TutorialOverlay: React.FC<TutorialOverlayProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < TUTORIAL_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const step = TUTORIAL_STEPS[currentStep];

  return (
    <div
      className="tutorial-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px',
      }}
    >
      <div
        className="tutorial-content"
        style={{
          backgroundColor: '#1f2937',
          color: 'white',
          padding: '40px',
          borderRadius: '16px',
          maxWidth: '500px',
          textAlign: 'center',
          border: '3px solid #3b82f6',
        }}
      >
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>
          {step.icon}
        </div>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
          {step.title}
        </h2>
        <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '32px', color: '#d1d5db' }}>
          {step.description}
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '16px' }}>
          {TUTORIAL_STEPS.map((_, index) => (
            <div
              key={index}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: index === currentStep ? '#3b82f6' : '#4b5563',
              }}
            />
          ))}
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button
            onClick={handleSkip}
            style={{
              padding: '12px 24px',
              backgroundColor: '#6b7280',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            Skip Tutorial
          </button>
          <button
            onClick={handleNext}
            style={{
              padding: '12px 24px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
            }}
          >
            {currentStep < TUTORIAL_STEPS.length - 1 ? 'Next' : 'Start Game!'}
          </button>
        </div>
      </div>
    </div>
  );
};
