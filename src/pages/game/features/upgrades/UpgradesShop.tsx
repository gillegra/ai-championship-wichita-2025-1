import React, { useState } from 'react';
import type { Upgrade } from '../../types';

interface UpgradesShopProps {
  availableUpgrades: Upgrade[];
  purchasedUpgrades: Upgrade[];
  innovationCapital: number;
  onPurchase: (upgradeId: string) => void;
}

export const UpgradesShop: React.FC<UpgradesShopProps> = ({
  availableUpgrades,
  purchasedUpgrades,
  innovationCapital,
  onPurchase,
}) => {
  const [showPurchased, setShowPurchased] = useState(false);
  const [selectedUpgrade, setSelectedUpgrade] = useState<Upgrade | null>(null);

  const displayUpgrades = showPurchased ? purchasedUpgrades : availableUpgrades;

  const getEffectDescription = (upgrade: Upgrade): string => {
    switch (upgrade.effect.type) {
      case 'clickPower':
        return `+${upgrade.effect.value} IC per click`;
      case 'passiveIncome':
        return `+${upgrade.effect.value} IC per second`;
      case 'clickMultiplier':
        return `${upgrade.effect.value}x click power`;
      case 'passiveMultiplier':
        return `${upgrade.effect.value}x passive income`;
      default:
        return '';
    }
  };

  return (
    <div
      className="upgrades-shop"
      style={{
        backgroundColor: '#f9fafb',
        borderRadius: '12px',
        padding: '24px',
        minHeight: '300px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>
          🏪 Wichita Upgrades
        </h2>
        <button
          onClick={() => setShowPurchased(!showPurchased)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          {showPurchased ? 'Show Available' : 'Show Purchased'} ({showPurchased ? purchasedUpgrades.length : availableUpgrades.length})
        </button>
      </div>

      {displayUpgrades.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
          {showPurchased ? 'No upgrades purchased yet' : 'All upgrades unlocked!'}
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '12px' }}>
          {displayUpgrades.map(upgrade => {
            const canAfford = innovationCapital >= upgrade.cost;

            return (
              <div
                key={upgrade.id}
                style={{
                  padding: '16px',
                  backgroundColor: showPurchased ? '#e5e7eb' : (canAfford ? 'white' : '#f3f4f6'),
                  border: showPurchased ? '2px solid #10b981' : (canAfford ? '2px solid #3b82f6' : '1px solid #d1d5db'),
                  borderRadius: '8px',
                  cursor: showPurchased ? 'default' : (canAfford ? 'pointer' : 'not-allowed'),
                  opacity: showPurchased ? 1 : (canAfford ? 1 : 0.6),
                  transition: 'all 0.2s',
                }}
                onClick={() => {
                  if (!showPurchased) {
                    setSelectedUpgrade(upgrade);
                  }
                }}
                onMouseEnter={(e) => {
                  if (!showPurchased && canAfford) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ fontSize: '24px' }}>{upgrade.icon}</span>
                      <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#1f2937' }}>
                        {upgrade.name}
                      </span>
                    </div>
                    <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>
                      {upgrade.description}
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#3b82f6' }}>
                      {getEffectDescription(upgrade)}
                    </div>
                    {upgrade.wichitaFact && selectedUpgrade?.id === upgrade.id && (
                      <div style={{
                        marginTop: '12px',
                        padding: '12px',
                        backgroundColor: '#dbeafe',
                        borderRadius: '6px',
                        fontSize: '13px',
                        color: '#1e40af',
                        lineHeight: '1.5',
                      }}>
                        💡 {upgrade.wichitaFact}
                      </div>
                    )}
                  </div>
                  <div style={{ marginLeft: '16px', textAlign: 'right' }}>
                    {!showPurchased && (
                      <>
                        <div style={{
                          fontSize: '18px',
                          fontWeight: 'bold',
                          color: canAfford ? '#059669' : '#dc2626',
                          marginBottom: '8px',
                        }}>
                          {upgrade.cost.toLocaleString()} IC
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (canAfford) {
                              onPurchase(upgrade.id);
                            }
                          }}
                          disabled={!canAfford}
                          style={{
                            padding: '8px 16px',
                            backgroundColor: canAfford ? '#3b82f6' : '#9ca3af',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: canAfford ? 'pointer' : 'not-allowed',
                            fontSize: '14px',
                            fontWeight: 'bold',
                          }}
                        >
                          {canAfford ? 'Purchase' : 'Locked'}
                        </button>
                      </>
                    )}
                    {showPurchased && (
                      <div style={{ fontSize: '24px' }}>✅</div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
