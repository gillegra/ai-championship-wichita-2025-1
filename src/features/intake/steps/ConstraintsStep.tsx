import { useState } from 'react';
import type {
  IntakeData,
  GeographicConstraint,
  TimeAvailability,
  FinancialConstraint,
} from '@/types';

interface ConstraintsStepProps {
  data: Partial<IntakeData>;
  onNext: (data: Partial<IntakeData>) => void;
  onBack: () => void;
}

const ConstraintsStep: React.FC<ConstraintsStepProps> = ({ data, onNext, onBack }) => {
  const [formData, setFormData] = useState({
    geographicConstraints: data.geographicConstraints || ('' as GeographicConstraint),
    timeAvailability: data.timeAvailability || ('' as TimeAvailability),
    financialConstraints: data.financialConstraints || ('' as FinancialConstraint),
    hasTransportation: data.hasTransportation ?? true,
    hasInternetAccess: data.hasInternetAccess ?? true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  const isValid =
    formData.geographicConstraints &&
    formData.timeAvailability &&
    formData.financialConstraints &&
    formData.hasTransportation !== undefined &&
    formData.hasInternetAccess !== undefined;

  return (
    <form onSubmit={handleSubmit} className="intake-step">
      <h2>Understanding your situation</h2>
      <p className="step-description">
        This helps us recommend resources and programs that fit your circumstances.
      </p>

      <div className="form-group">
        <label htmlFor="geographicConstraints">Location Preference *</label>
        <select
          id="geographicConstraints"
          value={formData.geographicConstraints}
          onChange={(e) =>
            setFormData({
              ...formData,
              geographicConstraints: e.target.value as GeographicConstraint,
            })
          }
          required
        >
          <option value="">Select preference</option>
          <option value="local-only">Must stay in my current area</option>
          <option value="willing-to-relocate">Willing to relocate within Kansas</option>
          <option value="remote-preferred">Prefer remote work</option>
          <option value="hybrid">Open to hybrid opportunities</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="timeAvailability">Time Availability for Training *</label>
        <select
          id="timeAvailability"
          value={formData.timeAvailability}
          onChange={(e) =>
            setFormData({ ...formData, timeAvailability: e.target.value as TimeAvailability })
          }
          required
        >
          <option value="">Select availability</option>
          <option value="full-time">Full-time (can dedicate full days)</option>
          <option value="part-time">Part-time (mornings or afternoons)</option>
          <option value="evenings-weekends">Evenings and weekends only</option>
          <option value="flexible">Flexible schedule</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="financialConstraints">Budget for Training/Education *</label>
        <select
          id="financialConstraints"
          value={formData.financialConstraints}
          onChange={(e) =>
            setFormData({ ...formData, financialConstraints: e.target.value as FinancialConstraint })
          }
          required
        >
          <option value="">Select budget range</option>
          <option value="no-budget">Need free or fully-funded options</option>
          <option value="limited-budget">Can afford $500-2,000</option>
          <option value="moderate-budget">Can afford $2,000-10,000</option>
          <option value="well-funded">Can afford $10,000+</option>
        </select>
      </div>

      <div className="form-group">
        <label>Do you have reliable transportation? *</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="hasTransportation"
              checked={formData.hasTransportation === true}
              onChange={() => setFormData({ ...formData, hasTransportation: true })}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="hasTransportation"
              checked={formData.hasTransportation === false}
              onChange={() => setFormData({ ...formData, hasTransportation: false })}
            />
            No
          </label>
        </div>
      </div>

      <div className="form-group">
        <label>Do you have reliable internet access at home? *</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="hasInternetAccess"
              checked={formData.hasInternetAccess === true}
              onChange={() => setFormData({ ...formData, hasInternetAccess: true })}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="hasInternetAccess"
              checked={formData.hasInternetAccess === false}
              onChange={() => setFormData({ ...formData, hasInternetAccess: false })}
            />
            No
          </label>
        </div>
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

export default ConstraintsStep;
