import React from 'react';

interface GameHeaderProps {
  innovationCapital: number;
  passiveIncomeRate: number;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  innovationCapital,
  passiveIncomeRate,
}) => {
  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return Math.floor(num).toString();
  };

  return (
    <div className="game-header" style={{
      padding: '12px 16px',
      backgroundColor: '#1a2332',
      color: '#f5f1e3',
      borderBottom: '2px solid #2563eb',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <img
          src="/wichita-ttm-logo.webp"
          alt="Wichita to the Moon Logo"
          style={{
            height: '48px',
            width: 'auto',
          }}
        />
        <h1 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', color: '#f5f1e3' }}>
          Wichita to the Moon
        </h1>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#f2b136' }}>
          {formatNumber(innovationCapital)} IC
        </div>
        {passiveIncomeRate > 0 && (
          <div style={{ fontSize: '11px', color: '#86efac' }}>
            +{formatNumber(passiveIncomeRate)}/sec
          </div>
        )}
      </div>
    </div>
  );
};
