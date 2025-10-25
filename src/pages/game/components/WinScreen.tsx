import React, { useState, useEffect } from 'react';
import wichitaFactsData from '../data/wichitaFacts.json';
import type { WichitaFact } from '../types';

interface WinScreenProps {
  playtime: number;
  totalClicks: number;
  innovationCapital: number;
  upgradesUnlocked: number;
  onPlayAgain: () => void;
}

export const WinScreen: React.FC<WinScreenProps> = ({
  playtime,
  totalClicks,
  innovationCapital,
  upgradesUnlocked,
  onPlayAgain,
}) => {
  const [randomFact, setRandomFact] = useState<WichitaFact | null>(null);

  useEffect(() => {
    const facts = wichitaFactsData as WichitaFact[];
    const fact = facts[Math.floor(Math.random() * facts.length)];
    setRandomFact(fact);
  }, []);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div
      className="win-screen-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px',
      }}
    >
      <div
        className="win-screen-content"
        style={{
          backgroundColor: '#1f2937',
          color: 'white',
          padding: '40px',
          borderRadius: '16px',
          maxWidth: '600px',
          textAlign: 'center',
          border: '3px solid #fbbf24',
        }}
      >
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>
          🌙 🚀
        </div>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', margin: '0 0 16px 0', color: '#fbbf24' }}>
          MOONBASE OPERATIONAL!
        </h1>
        <p style={{ fontSize: '18px', color: '#9ca3af', marginBottom: '32px' }}>
          Congratulations! Wichita's aerospace innovation has reached the moon.
        </p>

        <div style={{
          backgroundColor: '#374151',
          padding: '24px',
          borderRadius: '8px',
          marginBottom: '24px',
          textAlign: 'left',
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
            Your Stats:
          </h2>
          <div style={{ fontSize: '16px', lineHeight: '1.8' }}>
            <div>⏱️ Time Played: <strong>{formatTime(playtime)}</strong></div>
            <div>💰 Innovation Capital Generated: <strong>{Math.floor(innovationCapital).toLocaleString()} IC</strong></div>
            <div>🖱️ Total Clicks: <strong>{totalClicks.toLocaleString()}</strong></div>
            <div>🔓 Upgrades Unlocked: <strong>{upgradesUnlocked}/12</strong></div>
          </div>
        </div>

        {randomFact && (
          <div style={{
            backgroundColor: '#1e40af',
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '24px',
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px', color: '#93c5fd' }}>
              DID YOU KNOW?
            </h3>
            <p style={{ fontSize: '14px', margin: 0, lineHeight: '1.6' }}>
              {randomFact.fact}
            </p>
          </div>
        )}

        <button
          onClick={onPlayAgain}
          style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            padding: '16px 32px',
            fontSize: '18px',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
        >
          🔄 PLAY AGAIN
        </button>
      </div>
    </div>
  );
};
