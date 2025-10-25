/**
 * Challenge 2: Wichita to the Moon
 * A resource management clicker game celebrating Wichita's aerospace heritage
 */

import { useGameState } from './hooks/useGameState';
import { GameHeader } from './components/GameHeader';
import { WinScreen } from './components/WinScreen';
import { ClickerPanel } from './features/clicker/ClickerPanel';
import { MoonbasePanel } from './features/moonbase/MoonbasePanel';
import { UpgradesShop } from './features/upgrades/UpgradesShop';
import { TutorialOverlay } from './features/tutorial/TutorialOverlay';

export default function GameChallenge() {
  const {
    gameState,
    modules,
    availableUpgrades,
    purchasedUpgrades,
    overallProgress,
    playtime,
    handleClick,
    purchaseUpgrade,
    investInModule,
    completeTutorial,
    resetGame,
  } = useGameState();

  return (
    <div
      className="game-challenge"
      style={{
        height: '100vh',
        overflow: 'auto',
        backgroundColor: '#1a2332',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      {/* Tutorial Overlay */}
      {!gameState.tutorialComplete && (
        <TutorialOverlay onComplete={completeTutorial} />
      )}

      {/* Win Screen */}
      {gameState.isWon && (
        <WinScreen
          playtime={playtime}
          totalClicks={gameState.totalClicks}
          innovationCapital={gameState.innovationCapital}
          upgradesUnlocked={gameState.unlockedUpgrades.length}
          onPlayAgain={resetGame}
        />
      )}

      {/* Main Game Area - 2 Column Grid */}
      <div
        className="game-content"
        style={{
          flex: 1,
          padding: '12px',
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
            alignItems: 'start',
          }}
        >
          {/* Left Column: Game Header + Clicker */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <GameHeader
              innovationCapital={gameState.innovationCapital}
              passiveIncomeRate={gameState.passiveIncomeRate}
            />
            <ClickerPanel
              onClick={handleClick}
              clickPower={gameState.clickPower}
              passiveIncomeRate={gameState.passiveIncomeRate}
              overallProgress={overallProgress}
            />
          </div>

          {/* Right Column: Moonbase + Upgrades */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <MoonbasePanel
              modules={modules}
              moduleProgress={gameState.moduleProgress}
              innovationCapital={gameState.innovationCapital}
              onInvest={investInModule}
            />

            <UpgradesShop
              availableUpgrades={availableUpgrades}
              purchasedUpgrades={purchasedUpgrades}
              innovationCapital={gameState.innovationCapital}
              onPurchase={purchaseUpgrade}
              upgradeCounts={gameState.upgradeCounts}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          textAlign: 'center',
          padding: '8px',
          color: '#9ca3af',
          fontSize: '11px',
          backgroundColor: '#1a2332',
          borderTop: '1px solid #2563eb',
        }}
      >
        <p style={{ margin: 0 }}>
          Built with pride for the Air Capital of the World 🛩️ |
          Playtime: {Math.floor(playtime / 60)}:{(playtime % 60).toString().padStart(2, '0')} |
          Clicks: {gameState.totalClicks.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
