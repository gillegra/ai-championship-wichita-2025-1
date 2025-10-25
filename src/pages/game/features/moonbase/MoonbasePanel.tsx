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
        backgroundColor: '#1f2937',
        borderRadius: '12px',
        padding: '24px',
        minHeight: '400px',
        color: 'white',
      }}
    >
      <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        🌙 Moonbase Construction
      </h2>

      <div style={{ marginBottom: '24px' }}>
        {modules.map(module => {
          const progress = moduleProgress[module.id];
          const isComplete = progress >= 100;
          const remaining = module.requiredIC - (module.requiredIC * progress / 100);

          return (
            <div
              key={module.id}
              style={{
                marginBottom: '20px',
                padding: '16px',
                backgroundColor: isComplete ? '#065f46' : '#374151',
                borderRadius: '8px',
                border: isComplete ? '2px solid #10b981' : '1px solid #4b5563',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '24px' }}>{module.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{module.name}</div>
                  <div style={{ fontSize: '12px', color: '#9ca3af' }}>{module.description}</div>
                </div>
                {isComplete && <span style={{ fontSize: '24px' }}>✅</span>}
              </div>

              <ProgressBar
                progress={progress}
                showPercentage={true}
                color={getModuleColor(progress)}
                height="16px"
              />

              {!isComplete && (
                <div style={{ marginTop: '12px', display: 'flex', gap: '8px', alignItems: 'center' }}>
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
                      padding: '8px',
                      borderRadius: '4px',
                      border: '1px solid #4b5563',
                      backgroundColor: '#1f2937',
                      color: 'white',
                      fontSize: '14px',
                    }}
                  />
                  <button
                    onClick={() => handleInvest(module)}
                    disabled={!investAmounts[module.id] || investAmounts[module.id] > innovationCapital}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px',
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
                      padding: '8px 12px',
                      backgroundColor: '#6b7280',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px',
                    }}
                  >
                    Max
                  </button>
                </div>
              )}

              {!isComplete && (
                <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '8px' }}>
                  Remaining: {Math.floor(remaining).toLocaleString()} IC
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
