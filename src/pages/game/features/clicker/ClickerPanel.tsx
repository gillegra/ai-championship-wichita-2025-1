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
        borderRadius: '8px',
        padding: '12px',
        position: 'relative',
      }}
    >
      <h2 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', color: '#1f2937' }}>
        🏭 Wichita Innovation Center
      </h2>

      <div
        className="click-area"
        onClick={handleClick}
        style={{
          backgroundColor: '#3b82f6',
          borderRadius: '12px',
          padding: '24px 20px',
          textAlign: 'center',
          cursor: 'pointer',
          userSelect: 'none',
          transition: 'transform 0.1s, box-shadow 0.1s',
          position: 'relative',
          overflow: 'hidden',
          border: '3px solid #1e40af',
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
        <div style={{ fontSize: '40px', marginBottom: '8px' }}>
          ✈️
        </div>
        <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'white', marginBottom: '4px' }}>
          Click to Generate IC
        </div>
        <div style={{ fontSize: '12px', color: '#bfdbfe' }}>
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
              fontSize: '18px',
              pointerEvents: 'none',
              animation: 'floatUp 1s ease-out forwards',
            }}
          >
            +{clickPower}
          </div>
        ))}
      </div>

      <div style={{
        marginTop: '12px',
        padding: '10px',
        backgroundColor: '#e5e7eb',
        borderRadius: '6px',
      }}>
        <div style={{ fontSize: '11px', color: '#4b5563', marginBottom: '4px' }}>
          <strong>Click Power:</strong> {clickPower} IC
        </div>
        <div style={{ fontSize: '11px', color: '#4b5563' }}>
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
            transform: translateY(-40px);
          }
        }
      `}</style>
    </div>
  );
};
