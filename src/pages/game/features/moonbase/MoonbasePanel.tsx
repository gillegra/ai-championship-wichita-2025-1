import React, { useState } from 'react';
import { ProgressBar } from '../../components/ProgressBar';
import type { MoonbaseModule, ModuleProgressMap } from '../../types';

interface MoonbasePanelProps {
  modules: MoonbaseModule[];
  moduleProgress: ModuleProgressMap;
  innovationCapital: number;
  onInvest: (moduleId: keyof ModuleProgressMap, amount: number) => void;
}

export const MoonbasePanel: React.FC<MoonbasePanelProps> = ({
  modules,
  moduleProgress,
  innovationCapital,
  onInvest,
}) => {
  const [investAmounts, setInvestAmounts] = useState<Record<string, number>>({});
  const [isExpanded, setIsExpanded] = useState(true);

  const handleInvest = (module: MoonbaseModule) => {
    const amount = investAmounts[module.id] || 0;
    if (amount > 0 && amount <= innovationCapital) {
      onInvest(module.id, amount);
      setInvestAmounts(prev => ({ ...prev, [module.id]: 0 }));
    }
  };

  const getModuleColor = (progress: number): string => {
    if (progress >= 100) return '#10b981'; // green
    if (progress >= 50) return '#fbbf24'; // yellow
    return '#8b5cf6'; // purple
  };

  return (
    <div
      className="moonbase-panel"
      style={{
        backgroundColor: '#1a2332',
        borderRadius: '8px',
        padding: '12px',
        color: '#f5f1e3',
        border: '1px solid #2563eb',
      }}
    >
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          fontSize: '14px',
          fontWeight: 'bold',
          marginBottom: isExpanded ? '8px' : '0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        <span>🌙 Moonbase Construction</span>
        <span style={{ transition: 'transform 0.2s', display: 'inline-block', transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}>▶</span>
      </div>

      {isExpanded && <div>
        {modules.map(module => {
          const progress = moduleProgress[module.id];
          const isComplete = progress >= 100;
          const remaining = module.requiredIC - (module.requiredIC * progress / 100);

          return (
            <div
              key={module.id}
              style={{
                marginBottom: '10px',
                padding: '10px',
                backgroundColor: isComplete ? '#065f46' : '#374151',
                borderRadius: '6px',
                border: isComplete ? '2px solid #10b981' : '1px solid #4b5563',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <span style={{ fontSize: '18px' }}>{module.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 'bold', fontSize: '12px' }}>{module.name}</div>
                  <div style={{ fontSize: '10px', color: '#9ca3af' }}>{module.description}</div>
                </div>
                {isComplete && <span style={{ fontSize: '18px' }}>✅</span>}
              </div>

              <ProgressBar
                progress={progress}
                showPercentage={true}
                color={getModuleColor(progress)}
                height="10px"
              />

              {!isComplete && (
                <div style={{ marginTop: '8px', display: 'flex', gap: '6px', alignItems: 'center' }}>
                  <input
                    type="number"
                    min="0"
                    max={Math.min(innovationCapital, remaining)}
                    value={investAmounts[module.id] || ''}
                    onChange={(e) => setInvestAmounts(prev => ({
                      ...prev,
                      [module.id]: parseInt(e.target.value) || 0,
                    }))}
                    placeholder="Amount"
                    style={{
                      flex: 1,
                      padding: '6px',
                      borderRadius: '4px',
                      border: '1px solid #4b5563',
                      backgroundColor: '#1f2937',
                      color: 'white',
                      fontSize: '11px',
                    }}
                  />
                  <button
                    onClick={() => handleInvest(module)}
                    disabled={!investAmounts[module.id] || investAmounts[module.id] > innovationCapital}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: '#2563eb',
                      color: '#f5f1e3',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '11px',
                      fontWeight: 'bold',
                      opacity: (!investAmounts[module.id] || investAmounts[module.id] > innovationCapital) ? 0.5 : 1,
                    }}
                  >
                    Invest
                  </button>
                  <button
                    onClick={() => setInvestAmounts(prev => ({
                      ...prev,
                      [module.id]: Math.floor(Math.min(innovationCapital, remaining)),
                    }))}
                    style={{
                      padding: '6px 10px',
                      backgroundColor: '#6b7280',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '10px',
                    }}
                  >
                    Max
                  </button>
                </div>
              )}

              {!isComplete && (
                <div style={{ fontSize: '10px', color: '#9ca3af', marginTop: '6px' }}>
                  Remaining: {Math.floor(remaining).toLocaleString()} IC
                </div>
              )}
            </div>
          );
        })}
      </div>}
    </div>
  );
};
