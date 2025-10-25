import { useState } from 'react';
import type { IntakeData, TimelineExpectation } from '@/types';

interface CareerGoalsStepProps {
  data: Partial<IntakeData>;
  onNext: (data: Partial<IntakeData>) => void;
  onBack: () => void;
}

const CareerGoalsStep: React.FC<CareerGoalsStepProps> = ({ data, onNext, onBack }) => {
  const [formData, setFormData] = useState({
    desiredField: data.desiredField || '',
    desiredOccupation: data.desiredOccupation || '',
    careerChangeReason: data.careerChangeReason || '',
    timelineExpectation: data.timelineExpectation || ('' as TimelineExpectation),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  const isValid =
    formData.desiredField &&
    formData.desiredOccupation &&
    formData.careerChangeReason &&
    formData.timelineExpectation;

  return (
    <form onSubmit={handleSubmit} className="intake-step">
      <h2>Where do you want to go?</h2>
      <p className="step-description">
        Let's define your career goals so we can build a targeted pathway.
      </p>

      <div className="form-group">
        <label htmlFor="desiredField">Desired Career Field *</label>
        <input
          type="text"
          id="desiredField"
          value={formData.desiredField}
          onChange={(e) => setFormData({ ...formData, desiredField: e.target.value })}
          placeholder="e.g., Healthcare, Technology, Advanced Manufacturing"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="desiredOccupation">Desired Job Title *</label>
        <input
          type="text"
          id="desiredOccupation"
          value={formData.desiredOccupation}
          onChange={(e) => setFormData({ ...formData, desiredOccupation: e.target.value })}
          placeholder="e.g., Registered Nurse, Web Developer, CNC Machinist"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="careerChangeReason">Why do you want to change careers? *</label>
        <textarea
          id="careerChangeReason"
          value={formData.careerChangeReason}
          onChange={(e) => setFormData({ ...formData, careerChangeReason: e.target.value })}
          placeholder="Share what's motivating this change..."
          rows={4}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="timelineExpectation">How soon do you want to make this transition? *</label>
        <select
          id="timelineExpectation"
          value={formData.timelineExpectation}
          onChange={(e) =>
            setFormData({ ...formData, timelineExpectation: e.target.value as TimelineExpectation })
          }
          required
        >
          <option value="">Select timeline</option>
          <option value="3-months">Within 3 months</option>
          <option value="6-months">Within 6 months</option>
          <option value="1-year">Within 1 year</option>
          <option value="2-years">Within 2 years</option>
          <option value="flexible">Flexible / Long-term plan</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="button" onClick={onBack} className="btn-secondary">
          Back
        </button>
        <button type="submit" disabled={!isValid} className="btn-primary">
          Next
        </button>
      </div>
    </form>
  );
};

export default CareerGoalsStep;
