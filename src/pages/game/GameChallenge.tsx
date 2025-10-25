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
        minHeight: '100vh',
        backgroundColor: '#111827',
        fontFamily: 'system-ui, -apple-system, sans-serif',
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

      {/* Game Header */}
      <GameHeader
        innovationCapital={gameState.innovationCapital}
        overallProgress={overallProgress}
        passiveIncomeRate={gameState.passiveIncomeRate}
      />

      {/* Main Game Area */}
      <div
        className="game-content"
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '24px',
        }}
      >
        {/* Top Row: Clicker and Moonbase */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '24px',
            marginBottom: '24px',
          }}
        >
          <ClickerPanel
            onClick={handleClick}
            clickPower={gameState.clickPower}
            passiveIncomeRate={gameState.passiveIncomeRate}
          />
          <MoonbasePanel
            modules={modules}
            moduleProgress={gameState.moduleProgress}
            innovationCapital={gameState.innovationCapital}
            onInvest={investInModule}
          />
        </div>

        {/* Bottom Row: Upgrades Shop */}
        <div>
          <UpgradesShop
            availableUpgrades={availableUpgrades}
            purchasedUpgrades={purchasedUpgrades}
            innovationCapital={gameState.innovationCapital}
            onPurchase={purchaseUpgrade}
          />
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          textAlign: 'center',
          padding: '24px',
          color: '#9ca3af',
          fontSize: '14px',
        }}
      >
        <p style={{ margin: 0 }}>
          Built with pride for the Air Capital of the World 🛩️
        </p>
        <p style={{ margin: '8px 0 0 0', fontSize: '12px' }}>
          Playtime: {Math.floor(playtime / 60)}:{(playtime % 60).toString().padStart(2, '0')} |
          Clicks: {gameState.totalClicks.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
