import React, { useState } from 'react';
import type { Upgrade } from '../../types';

interface UpgradesShopProps {
  availableUpgrades: Upgrade[];
  purchasedUpgrades: Upgrade[];
  innovationCapital: number;
  onPurchase: (upgradeId: string) => void;
  upgradeCounts?: Record<string, number>;
}

export const UpgradesShop: React.FC<UpgradesShopProps> = ({
  availableUpgrades,
  purchasedUpgrades,
  innovationCapital,
  onPurchase,
  upgradeCounts = {},
}) => {
  const [showPurchased, setShowPurchased] = useState(false);
  const [selectedUpgrade, setSelectedUpgrade] = useState<Upgrade | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

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

  const getUpgradeCount = (upgradeId: string): number => {
    return upgradeCounts[upgradeId] || 0;
  };

  return (
    <div
      className="upgrades-shop"
      style={{
        backgroundColor: '#f9fafb',
        borderRadius: '8px',
        padding: '12px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: isExpanded ? '8px' : '0' }}>
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#1f2937',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            userSelect: 'none',
            flex: 1,
            paddingRight: '12px',
          }}
        >
          <span>🏪 Wichita Upgrades</span>
          <span style={{ transition: 'transform 0.2s', display: 'inline-block', transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}>▶</span>
        </div>
        {isExpanded && <button
          onClick={() => setShowPurchased(!showPurchased)}
          style={{
            padding: '4px 10px',
            backgroundColor: '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '11px',
          }}
        >
          {showPurchased ? 'Available' : 'Purchased'} ({showPurchased ? purchasedUpgrades.length : availableUpgrades.length})
        </button>}
      </div>

      {isExpanded && (displayUpgrades.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '20px', color: '#6b7280', fontSize: '11px' }}>
          {showPurchased ? 'No upgrades purchased yet' : 'All upgrades unlocked!'}
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '8px' }}>
          {displayUpgrades.map(upgrade => {
            const canAfford = innovationCapital >= upgrade.cost;
            const purchaseCount = getUpgradeCount(upgrade.id);
            const isPurchased = purchaseCount > 0;

            return (
              <div
                key={upgrade.id}
                style={{
                  padding: '10px',
                  backgroundColor: showPurchased ? '#e5e7eb' : (canAfford ? 'white' : '#f3f4f6'),
                  border: showPurchased ? '2px solid #10b981' : (canAfford ? '2px solid #2563eb' : '1px solid #d1d5db'),
                  borderRadius: '6px',
                  cursor: showPurchased ? 'pointer' : (canAfford ? 'pointer' : 'not-allowed'),
                  opacity: canAfford || showPurchased ? 1 : 0.6,
                  transition: 'all 0.2s',
                }}
                onClick={() => {
                  setSelectedUpgrade(upgrade);
                }}
                onMouseEnter={(e) => {
                  if (canAfford || showPurchased) {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                      <span style={{ fontSize: '16px' }}>{upgrade.icon}</span>
                      <span style={{ fontWeight: 'bold', fontSize: '12px', color: '#1f2937' }}>
                        {upgrade.name}
                      </span>
                      {isPurchased && (
                        <span style={{
                          fontSize: '10px',
                          fontWeight: 'bold',
                          backgroundColor: '#10b981',
                          color: 'white',
                          padding: '1px 6px',
                          borderRadius: '10px',
                        }}>
                          x{purchaseCount}
                        </span>
                      )}
                      {upgrade.detailedInfo && (
                        <div
                          className="info-icon-container"
                          style={{ position: 'relative', display: 'inline-block' }}
                          onMouseEnter={(e) => {
                            const tooltip = e.currentTarget.querySelector('.info-tooltip') as HTMLElement;
                            if (tooltip) {
                              tooltip.style.opacity = '1';
                              tooltip.style.visibility = 'visible';
                            }
                          }}
                          onMouseLeave={(e) => {
                            const tooltip = e.currentTarget.querySelector('.info-tooltip') as HTMLElement;
                            if (tooltip) {
                              tooltip.style.opacity = '0';
                              tooltip.style.visibility = 'hidden';
                            }
                          }}
                        >
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: '14px',
                              height: '14px',
                              borderRadius: '50%',
                              backgroundColor: '#2563eb',
                              color: 'white',
                              fontSize: '10px',
                              fontWeight: 'bold',
                              cursor: 'help',
                              userSelect: 'none',
                            }}
                          >
                            i
                          </span>
                          <div
                            className="info-tooltip"
                            style={{
                              position: 'absolute',
                              top: '50%',
                              left: '100%',
                              transform: 'translateY(-50%)',
                              marginLeft: '8px',
                              padding: '12px',
                              backgroundColor: 'white',
                              border: '2px solid #2563eb',
                              borderRadius: '8px',
                              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                              width: '300px',
                              maxWidth: '90vw',
                              fontSize: '11px',
                              lineHeight: '1.5',
                              color: '#1f2937',
                              zIndex: 9999,
                              opacity: 0,
                              visibility: 'hidden',
                              transition: 'opacity 0.2s, visibility 0.2s',
                              pointerEvents: 'none',
                            }}
                          >
                            <div style={{ fontWeight: 'bold', marginBottom: '6px', color: '#2563eb', fontSize: '12px' }}>
                              About {upgrade.name}
                            </div>
                            {upgrade.detailedInfo}
                            <div
                              style={{
                                position: 'absolute',
                                top: '50%',
                                right: '100%',
                                transform: 'translateY(-50%)',
                                width: 0,
                                height: 0,
                                borderTop: '8px solid transparent',
                                borderBottom: '8px solid transparent',
                                borderRight: '8px solid #2563eb',
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <div style={{ fontSize: '10px', color: '#6b7280', marginBottom: '4px' }}>
                      {upgrade.description}
                    </div>
                    <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#2563eb' }}>
                      {getEffectDescription(upgrade)}
                    </div>
                    {upgrade.wichitaFact && selectedUpgrade?.id === upgrade.id && (
                      <div style={{
                        marginTop: '8px',
                        padding: '8px',
                        backgroundColor: '#dbeafe',
                        borderRadius: '4px',
                        fontSize: '10px',
                        color: '#1e40af',
                        lineHeight: '1.4',
                      }}>
                        💡 {upgrade.wichitaFact}
                      </div>
                    )}
                  </div>
                  <div style={{ marginLeft: '12px', textAlign: 'right' }}>
                    <>
                      <div style={{
                        fontSize: '13px',
                        fontWeight: 'bold',
                        color: canAfford ? '#059669' : '#dc2626',
                        marginBottom: '4px',
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
                          padding: '4px 10px',
                          backgroundColor: canAfford ? '#2563eb' : '#9ca3af',
                          color: '#f5f1e3',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: canAfford ? 'pointer' : 'not-allowed',
                          fontSize: '11px',
                          fontWeight: 'bold',
                        }}
                      >
                        {canAfford ? (isPurchased ? 'Buy Again' : 'Purchase') : 'Locked'}
                      </button>
                    </>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
