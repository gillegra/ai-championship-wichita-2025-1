import { useState, useEffect } from 'react';
import type { QuestionConfig } from './rileyPersona';

interface ConversationalInputProps {
  question: QuestionConfig;
  value: any;
  onChange: (field: string, value: any) => void;
  onSubmit: () => void;
  context?: Record<string, string>;
}

const ConversationalInput: React.FC<ConversationalInputProps> = ({
  question,
  value,
  onChange,
  onSubmit,
  context: _context,
}) => {
  const [localValue, setLocalValue] = useState<any>(value || '');
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    setLocalValue(value || (question.inputType === 'tags' || question.inputType === 'checkbox-group' ? [] : ''));
  }, [value, question.inputType]);

  const handleChange = (newValue: any) => {
    setLocalValue(newValue);
    onChange(question.field, newValue);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && question.inputType !== 'textarea') {
      e.preventDefault();
      if (isValid()) {
        onSubmit();
      }
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim()) {
      const newTags = [...(localValue || []), tagInput.trim()];
      handleChange(newTags);
      setTagInput('');
    }
  };

  const handleRemoveTag = (index: number) => {
    const newTags = (localValue || []).filter((_: any, i: number) => i !== index);
    handleChange(newTags);
  };

  const handleCheckboxToggle = (optionValue: string) => {
    const current = localValue || [];
    if (current.includes(optionValue)) {
      handleChange(current.filter((v: string) => v !== optionValue));
    } else {
      handleChange([...current, optionValue]);
    }
  };

  const isValid = () => {
    if (!question.validation?.required) return true;

    if (question.inputType === 'tags' || question.inputType === 'checkbox-group') {
      return localValue && localValue.length > 0;
    }

    if (question.inputType === 'email' && question.validation?.pattern) {
      return question.validation.pattern.test(localValue);
    }

    return localValue !== '' && localValue !== null && localValue !== undefined;
  };

  // Render different input types
  switch (question.inputType) {
    case 'text':
    case 'email':
      return (
        <div className="conversational-input">
          <input
            type={question.inputType}
            value={localValue}
            onChange={(e) => handleChange(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={question.placeholder}
            autoFocus
            className="input-field"
          />
        </div>
      );

    case 'number':
      return (
        <div className="conversational-input">
          <input
            type="number"
            value={localValue}
            onChange={(e) => handleChange(parseInt(e.target.value) || 0)}
            onKeyPress={handleKeyPress}
            min={question.validation?.min}
            max={question.validation?.max}
            autoFocus
            className="input-field"
          />
        </div>
      );

    case 'textarea':
      return (
        <div className="conversational-input">
          <textarea
            value={localValue}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={question.placeholder}
            rows={4}
            autoFocus
            className="input-field textarea-field"
          />
        </div>
      );

    case 'select':
      return (
        <div className="conversational-input">
          <select
            value={localValue}
            onChange={(e) => handleChange(e.target.value)}
            autoFocus
            className="input-field select-field"
          >
            <option value="">Select an option...</option>
            {question.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      );

    case 'radio':
      return (
        <div className="conversational-input radio-group">
          {question.options?.map((option) => (
            <label key={option.value} className="radio-option">
              <input
                type="radio"
                name={question.field}
                value={option.value}
                checked={localValue === option.value}
                onChange={(e) => handleChange(e.target.value)}
                autoFocus={option === question.options?.[0]}
              />
              <span className="radio-label">{option.label}</span>
            </label>
          ))}
        </div>
      );

    case 'tags':
      return (
        <div className="conversational-input tags-input">
          <div className="tags-display">
            {(localValue || []).map((tag: string, index: number) => (
              <span key={index} className="tag">
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(index)}
                  className="tag-remove"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="tag-input-wrapper">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
              placeholder={question.placeholder}
              autoFocus
              className="input-field"
            />
            <button
              type="button"
              onClick={handleAddTag}
              disabled={!tagInput.trim()}
              className="btn-add-tag"
            >
              Add
            </button>
          </div>
          {(localValue || []).length > 0 && (
            <small className="input-hint">
              Press Enter or click Add to add more. {(localValue || []).length} added.
            </small>
          )}
        </div>
      );

    case 'checkbox-group':
      return (
        <div className="conversational-input checkbox-group">
          {question.options?.map((option) => (
            <label key={option.value} className="checkbox-option">
              <input
                type="checkbox"
                value={option.value}
                checked={(localValue || []).includes(option.value)}
                onChange={() => handleCheckboxToggle(option.value)}
              />
              <span className="checkbox-label">{option.label}</span>
            </label>
          ))}
          {(localValue || []).length > 0 && (
            <small className="input-hint">
              {(localValue || []).length} selected
            </small>
          )}
        </div>
      );

    default:
      return null;
  }
};

export default ConversationalInput;
