import { useState } from 'react';
import type { IntakeData, EducationLevel } from '@/types';

interface CurrentSituationStepProps {
  data: Partial<IntakeData>;
  onNext: (data: Partial<IntakeData>) => void;
  onBack: () => void;
}

const CurrentSituationStep: React.FC<CurrentSituationStepProps> = ({
  data,
  onNext,
  onBack,
}) => {
  const [formData, setFormData] = useState({
    currentOccupation: data.currentOccupation || '',
    currentIndustry: data.currentIndustry || '',
    yearsOfExperience: data.yearsOfExperience || 0,
    educationLevel: data.educationLevel || ('' as EducationLevel),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  const isValid =
    formData.currentOccupation &&
    formData.currentIndustry &&
    formData.yearsOfExperience >= 0 &&
    formData.educationLevel;

  return (
    <form onSubmit={handleSubmit} className="intake-step">
      <h2>Tell us about where you are now</h2>
      <p className="step-description">
        Understanding your current situation helps us identify transferable skills.
      </p>

      <div className="form-group">
        <label htmlFor="currentOccupation">Current Job Title *</label>
        <input
          type="text"
          id="currentOccupation"
          value={formData.currentOccupation}
          onChange={(e) => setFormData({ ...formData, currentOccupation: e.target.value })}
          placeholder="e.g., Retail Manager, Administrative Assistant"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="currentIndustry">Current Industry *</label>
        <input
          type="text"
          id="currentIndustry"
          value={formData.currentIndustry}
          onChange={(e) => setFormData({ ...formData, currentIndustry: e.target.value })}
          placeholder="e.g., Retail, Healthcare, Manufacturing"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="yearsOfExperience">Years of Work Experience *</label>
        <input
          type="number"
          id="yearsOfExperience"
          min="0"
          max="50"
          value={formData.yearsOfExperience}
          onChange={(e) =>
            setFormData({ ...formData, yearsOfExperience: parseInt(e.target.value) || 0 })
          }
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="educationLevel">Highest Level of Education *</label>
        <select
          id="educationLevel"
          value={formData.educationLevel}
          onChange={(e) =>
            setFormData({ ...formData, educationLevel: e.target.value as EducationLevel })
          }
          required
        >
          <option value="">Select education level</option>
          <option value="no-high-school">Some High School</option>
          <option value="high-school">High School Diploma or GED</option>
          <option value="some-college">Some College</option>
          <option value="associates">Associate's Degree</option>
          <option value="bachelors">Bachelor's Degree</option>
          <option value="masters">Master's Degree</option>
          <option value="doctorate">Doctorate</option>
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

export default CurrentSituationStep;
