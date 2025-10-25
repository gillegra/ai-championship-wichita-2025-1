import React from 'react';

interface ProgressBarProps {
  progress: number; // 0-100
  label?: string;
  showPercentage?: boolean;
  color?: string;
  height?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  label,
  showPercentage = true,
  color = '#3b82f6',
  height = '24px',
}) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className="progress-bar-container" style={{ marginBottom: '8px' }}>
      {label && (
        <div className="progress-bar-label" style={{
          fontSize: '14px',
          marginBottom: '4px',
          fontWeight: '500',
          display: 'flex',
          justifyContent: 'space-between',
        }}>
          <span>{label}</span>
          {showPercentage && <span>{clampedProgress.toFixed(0)}%</span>}
        </div>
      )}
      <div
        className="progress-bar-track"
        style={{
          width: '100%',
          height,
          backgroundColor: '#e5e7eb',
          borderRadius: '8px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          className="progress-bar-fill"
          style={{
            width: `${clampedProgress}%`,
            height: '100%',
            backgroundColor: color,
            transition: 'width 0.3s ease-in-out',
            borderRadius: '8px',
          }}
        />
      </div>
    </div>
  );
};
