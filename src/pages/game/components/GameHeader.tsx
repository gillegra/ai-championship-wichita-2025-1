import React from 'react';
import { ProgressBar } from './ProgressBar';

interface GameHeaderProps {
  innovationCapital: number;
  overallProgress: number;
  passiveIncomeRate: number;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  innovationCapital,
  overallProgress,
  passiveIncomeRate,
}) => {
  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return Math.floor(num).toString();
  };

  return (
    <div className="game-header" style={{
      padding: '8px 16px',
      backgroundColor: '#1f2937',
      color: 'white',
      borderBottom: '2px solid #3b82f6',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '6px',
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>
            Wichita to the Moon
          </h1>
          <p style={{ margin: '2px 0 0 0', fontSize: '10px', color: '#9ca3af' }}>
            From Air Capital to Space Frontier
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#fbbf24' }}>
            {formatNumber(innovationCapital)} IC
          </div>
          {passiveIncomeRate > 0 && (
            <div style={{ fontSize: '11px', color: '#86efac' }}>
              +{formatNumber(passiveIncomeRate)}/sec
            </div>
          )}
        </div>
      </div>
      <ProgressBar
        progress={overallProgress}
        label="Moonbase Progress"
        color="#8b5cf6"
        height="12px"
      />
    </div>
  );
};
