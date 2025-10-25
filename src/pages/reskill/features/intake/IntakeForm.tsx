import type { IntakeFormState, IntakeData } from '@/types';
import PersonalInfoStep from './steps/PersonalInfoStep';
import CurrentSituationStep from './steps/CurrentSituationStep';
import CareerGoalsStep from './steps/CareerGoalsStep';
import ConstraintsStep from './steps/ConstraintsStep';
import SkillsInterestsStep from './steps/SkillsInterestsStep';

interface IntakeFormProps {
  formState: IntakeFormState;
  onStepComplete: (data: Partial<IntakeData>) => void;
  onBack: () => void;
  onSubmit: () => void;
}

const IntakeForm: React.FC<IntakeFormProps> = ({
  formState,
  onStepComplete,
  onBack,
  onSubmit,
}) => {
  const { currentStep, data } = formState;

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <PersonalInfoStep
            data={data}
            onNext={onStepComplete}
          />
        );
      case 1:
        return (
          <CurrentSituationStep
            data={data}
            onNext={onStepComplete}
            onBack={onBack}
          />
        );
      case 2:
        return (
          <CareerGoalsStep
            data={data}
            onNext={onStepComplete}
            onBack={onBack}
          />
        );
      case 3:
        return (
          <ConstraintsStep
            data={data}
            onNext={onStepComplete}
            onBack={onBack}
          />
        );
      case 4:
        return (
          <SkillsInterestsStep
            data={data}
            onSubmit={(stepData) => {
              onStepComplete(stepData);
              onSubmit();
            }}
            onBack={onBack}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="intake-form">
      {renderStep()}
    </div>
  );
};

export default IntakeForm;
