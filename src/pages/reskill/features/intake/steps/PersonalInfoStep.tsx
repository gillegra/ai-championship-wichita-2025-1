import { useState } from 'react';
import type { IntakeData } from '@/types';

interface PersonalInfoStepProps {
  data: Partial<IntakeData>;
  onNext: (data: Partial<IntakeData>) => void;
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({ data, onNext }) => {
  const [formData, setFormData] = useState({
    firstName: data.firstName || '',
    lastName: data.lastName || '',
    email: data.email || '',
    phone: data.phone || '',
    zipCode: data.zipCode || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  const isValid = formData.firstName && formData.lastName && formData.email && formData.zipCode;

  return (
    <form onSubmit={handleSubmit} className="intake-step">
      <h2>Let's start with some basic information</h2>
      <p className="step-description">
        This helps us personalize your career pathway and connect you with local resources.
      </p>

      <div className="form-group">
        <label htmlFor="firstName">First Name *</label>
        <input
          type="text"
          id="firstName"
          value={formData.firstName}
          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="lastName">Last Name *</label>
        <input
          type="text"
          id="lastName"
          value={formData.lastName}
          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email Address *</label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone Number (optional)</label>
        <input
          type="tel"
          id="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label htmlFor="zipCode">ZIP Code *</label>
        <input
          type="text"
          id="zipCode"
          value={formData.zipCode}
          onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
          pattern="[0-9]{5}"
          required
        />
        <small>This helps us find training opportunities near you</small>
      </div>

      <div className="form-actions">
        <button type="submit" disabled={!isValid} className="btn-primary">
          Next
        </button>
      </div>
    </form>
  );
};

export default PersonalInfoStep;
