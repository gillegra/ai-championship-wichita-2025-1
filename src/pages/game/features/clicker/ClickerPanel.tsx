import React, { useState } from 'react';

interface ClickerPanelProps {
  onClick: () => void;
  clickPower: number;
  passiveIncomeRate: number;
}

export const ClickerPanel: React.FC<ClickerPanelProps> = ({
  onClick,
  clickPower,
  passiveIncomeRate,
}) => {
  const [clickAnimations, setClickAnimations] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    onClick();

    // Create floating number animation
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setClickAnimations(prev => [...prev, { id, x, y }]);

    // Remove animation after 1 second
    setTimeout(() => {
      setClickAnimations(prev => prev.filter(anim => anim.id !== id));
    }, 1000);
  };

  return (
    <div
      className="clicker-panel"
      style={{
        backgroundColor: '#f3f4f6',
        borderRadius: '12px',
        padding: '24px',
        minHeight: '400px',
        position: 'relative',
      }}
    >
      <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px', color: '#1f2937' }}>
        🏭 Wichita Innovation Center
      </h2>

      <div
        className="click-area"
        onClick={handleClick}
        style={{
          backgroundColor: '#3b82f6',
          borderRadius: '16px',
          padding: '60px 40px',
          textAlign: 'center',
          cursor: 'pointer',
          userSelect: 'none',
          transition: 'transform 0.1s, box-shadow 0.1s',
          position: 'relative',
          overflow: 'hidden',
          border: '4px solid #1e40af',
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = 'scale(0.95)';
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>
          ✈️
        </div>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>
          Click to Generate IC
        </div>
        <div style={{ fontSize: '16px', color: '#bfdbfe' }}>
          +{clickPower} IC per click
        </div>

        {/* Floating number animations */}
        {clickAnimations.map(anim => (
          <div
            key={anim.id}
            style={{
              position: 'absolute',
              left: anim.x,
              top: anim.y,
              color: '#fbbf24',
              fontWeight: 'bold',
              fontSize: '24px',
              pointerEvents: 'none',
              animation: 'floatUp 1s ease-out forwards',
            }}
          >
            +{clickPower}
          </div>
        ))}
      </div>

      <div style={{
        marginTop: '20px',
        padding: '16px',
        backgroundColor: '#e5e7eb',
        borderRadius: '8px',
      }}>
        <div style={{ fontSize: '14px', color: '#4b5563', marginBottom: '8px' }}>
          <strong>Click Power:</strong> {clickPower} IC
        </div>
        <div style={{ fontSize: '14px', color: '#4b5563' }}>
          <strong>Passive Income:</strong> {passiveIncomeRate > 0 ? `+${passiveIncomeRate} IC/sec` : 'None yet'}
        </div>
      </div>

      <style>{`
        @keyframes floatUp {
          0% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-60px);
          }
        }
      `}</style>
    </div>
  );
};
