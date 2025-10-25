import { useState } from 'react';
import type { IntakeData, IntakeFormState } from '@/types';
import IntakeForm from './IntakeForm';
import StepIndicator from './StepIndicator';
import './intake.css';

interface IntakePortalProps {
  onComplete: (data: IntakeData) => void;
}

const IntakePortal: React.FC<IntakePortalProps> = ({ onComplete }) => {
  const [formState, setFormState] = useState<IntakeFormState>({
    currentStep: 0,
    totalSteps: 5,
    completedSteps: [],
    data: {},
  });

  const handleStepComplete = (stepData: Partial<IntakeData>) => {
    const updatedData = { ...formState.data, ...stepData };
    const updatedCompletedSteps = [...formState.completedSteps, formState.currentStep];

    setFormState({
      ...formState,
      data: updatedData,
      completedSteps: updatedCompletedSteps,
      currentStep: formState.currentStep + 1,
    });
  };

  const handleBack = () => {
    setFormState({
      ...formState,
      currentStep: Math.max(0, formState.currentStep - 1),
    });
  };

  const handleSubmit = () => {
    if (isIntakeDataComplete(formState.data)) {
      onComplete(formState.data as IntakeData);
    }
  };

  return (
    <div className="intake-portal">
      <header className="intake-header">
        <h1>Kansas Career Pathways</h1>
        <p>Let's build your personalized career transition plan</p>
      </header>

      <StepIndicator
        currentStep={formState.currentStep}
        totalSteps={formState.totalSteps}
        completedSteps={formState.completedSteps}
      />

      <IntakeForm
        formState={formState}
        onStepComplete={handleStepComplete}
        onBack={handleBack}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

// Type guard to check if intake data is complete
function isIntakeDataComplete(data: Partial<IntakeData>): data is IntakeData {
  return !!(
    data.firstName &&
    data.lastName &&
    data.email &&
    data.zipCode &&
    data.currentOccupation &&
    data.currentIndustry &&
    data.yearsOfExperience !== undefined &&
    data.educationLevel &&
    data.desiredField &&
    data.desiredOccupation &&
    data.careerChangeReason &&
    data.timelineExpectation &&
    data.geographicConstraints &&
    data.timeAvailability &&
    data.financialConstraints &&
    data.hasTransportation !== undefined &&
    data.hasInternetAccess !== undefined &&
    data.currentSkills &&
    data.interests &&
    data.strengthAreas &&
    data.learningPreferences
  );
}

export default IntakePortal;
