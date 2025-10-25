interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  completedSteps: number[];
}

const stepLabels = [
  'Personal Info',
  'Current Situation',
  'Career Goals',
  'Your Constraints',
  'Skills & Interests',
];

const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps,
  completedSteps,
}) => {
  return (
    <div className="step-indicator">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={`step ${
            index === currentStep
              ? 'active'
              : completedSteps.includes(index)
              ? 'completed'
              : ''
          }`}
        >
          <div className="step-number">
            {completedSteps.includes(index) ? '✓' : index + 1}
          </div>
          <div className="step-label">{stepLabels[index]}</div>
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
