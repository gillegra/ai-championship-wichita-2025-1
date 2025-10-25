import { useState } from 'react';
import type { IntakeData, LearningPreference } from '@/types';

interface SkillsInterestsStepProps {
  data: Partial<IntakeData>;
  onSubmit: (data: Partial<IntakeData>) => void;
  onBack: () => void;
}

const SkillsInterestsStep: React.FC<SkillsInterestsStepProps> = ({ data, onSubmit, onBack }) => {
  const [formData, setFormData] = useState({
    currentSkills: data.currentSkills || [] as string[],
    interests: data.interests || [] as string[],
    strengthAreas: data.strengthAreas || [] as string[],
    learningPreferences: data.learningPreferences || [] as LearningPreference[],
  });

  const [skillInput, setSkillInput] = useState('');
  const [interestInput, setInterestInput] = useState('');
  const [strengthInput, setStrengthInput] = useState('');

  const handleAddSkill = () => {
    if (skillInput.trim()) {
      setFormData({
        ...formData,
        currentSkills: [...formData.currentSkills, skillInput.trim()],
      });
      setSkillInput('');
    }
  };

  const handleAddInterest = () => {
    if (interestInput.trim()) {
      setFormData({
        ...formData,
        interests: [...formData.interests, interestInput.trim()],
      });
      setInterestInput('');
    }
  };

  const handleAddStrength = () => {
    if (strengthInput.trim()) {
      setFormData({
        ...formData,
        strengthAreas: [...formData.strengthAreas, strengthInput.trim()],
      });
      setStrengthInput('');
    }
  };

  const handleToggleLearningPreference = (pref: LearningPreference) => {
    const prefs = formData.learningPreferences;
    if (prefs.includes(pref)) {
      setFormData({
        ...formData,
        learningPreferences: prefs.filter((p) => p !== pref),
      });
    } else {
      setFormData({
        ...formData,
        learningPreferences: [...prefs, pref],
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isValid =
    formData.currentSkills.length > 0 &&
    formData.interests.length > 0 &&
    formData.strengthAreas.length > 0 &&
    formData.learningPreferences.length > 0;

  return (
    <form onSubmit={handleSubmit} className="intake-step">
      <h2>Your skills and learning style</h2>
      <p className="step-description">
        This helps us match you with the right training programs and resources.
      </p>

      <div className="form-group">
        <label>Current Skills</label>
        <p className="field-hint">List skills from your current or past work (add at least 1)</p>
        <div className="tag-input-container">
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
            placeholder="e.g., Customer service, Microsoft Excel"
          />
          <button type="button" onClick={handleAddSkill} className="btn-add">
            Add
          </button>
        </div>
        <div className="tags">
          {formData.currentSkills.map((skill, i) => (
            <span key={i} className="tag">
              {skill}
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    currentSkills: formData.currentSkills.filter((_, idx) => idx !== i),
                  })
                }
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Interests</label>
        <p className="field-hint">What topics or activities interest you? (add at least 1)</p>
        <div className="tag-input-container">
          <input
            type="text"
            value={interestInput}
            onChange={(e) => setInterestInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddInterest())}
            placeholder="e.g., Technology, Helping people, Problem solving"
          />
          <button type="button" onClick={handleAddInterest} className="btn-add">
            Add
          </button>
        </div>
        <div className="tags">
          {formData.interests.map((interest, i) => (
            <span key={i} className="tag">
              {interest}
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    interests: formData.interests.filter((_, idx) => idx !== i),
                  })
                }
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Your Strengths</label>
        <p className="field-hint">What are you naturally good at? (add at least 1)</p>
        <div className="tag-input-container">
          <input
            type="text"
            value={strengthInput}
            onChange={(e) => setStrengthInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddStrength())}
            placeholder="e.g., Communication, Attention to detail, Leadership"
          />
          <button type="button" onClick={handleAddStrength} className="btn-add">
            Add
          </button>
        </div>
        <div className="tags">
          {formData.strengthAreas.map((strength, i) => (
            <span key={i} className="tag">
              {strength}
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    strengthAreas: formData.strengthAreas.filter((_, idx) => idx !== i),
                  })
                }
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Learning Preferences (select all that apply) *</label>
        <div className="checkbox-group">
          {[
            { value: 'online-self-paced', label: 'Online self-paced courses' },
            { value: 'online-instructor-led', label: 'Online classes with instructor' },
            { value: 'in-person-classes', label: 'In-person classroom instruction' },
            { value: 'hands-on-training', label: 'Hands-on training/apprenticeship' },
            { value: 'mentorship', label: 'One-on-one mentorship' },
            { value: 'reading-materials', label: 'Books and reading materials' },
          ].map((pref) => (
            <label key={pref.value}>
              <input
                type="checkbox"
                checked={formData.learningPreferences.includes(pref.value as LearningPreference)}
                onChange={() => handleToggleLearningPreference(pref.value as LearningPreference)}
              />
              {pref.label}
            </label>
          ))}
        </div>
      </div>

      <div className="form-actions">
        <button type="button" onClick={onBack} className="btn-secondary">
          Back
        </button>
        <button type="submit" disabled={!isValid} className="btn-primary">
          Generate My Plan
        </button>
      </div>
    </form>
  );
};

export default SkillsInterestsStep;
