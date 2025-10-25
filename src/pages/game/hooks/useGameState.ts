import { useState, useCallback, useEffect } from 'react';
import type { GameState, Upgrade, MoonbaseModule } from '../types';
import upgradesData from '../data/upgrades.json';
import modulesData from '../data/modules.json';

const INITIAL_STATE: GameState = {
  innovationCapital: 0,
  clickPower: 1,
  passiveIncomeRate: 0,
  unlockedUpgrades: [],
  moduleProgress: {
    habitat: 0,
    power: 0,
    research: 0,
    manufacturing: 0,
    communications: 0,
  },
  gameStartTime: Date.now(),
  totalClicks: 0,
  isWon: false,
  tutorialComplete: false,
};

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const [clickMultiplier, setClickMultiplier] = useState(1);
  const [passiveMultiplier, setPassiveMultiplier] = useState(1);

  const upgrades = upgradesData as Upgrade[];
  const modules = modulesData as MoonbaseModule[];

  // Handle click to generate IC
  const handleClick = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      innovationCapital: prev.innovationCapital + (prev.clickPower * clickMultiplier),
      totalClicks: prev.totalClicks + 1,
    }));
  }, [clickMultiplier]);

  // Purchase upgrade
  const purchaseUpgrade = useCallback((upgradeId: string) => {
    const upgrade = upgrades.find(u => u.id === upgradeId);
    if (!upgrade) return false;

    setGameState(prev => {
      if (prev.innovationCapital < upgrade.cost) return prev;
      if (prev.unlockedUpgrades.includes(upgradeId)) return prev;

      let newState = {
        ...prev,
        innovationCapital: prev.innovationCapital - upgrade.cost,
        unlockedUpgrades: [...prev.unlockedUpgrades, upgradeId],
      };

      // Apply upgrade effect
      switch (upgrade.effect.type) {
        case 'clickPower':
          newState.clickPower += upgrade.effect.value;
          break;
        case 'passiveIncome':
          newState.passiveIncomeRate += upgrade.effect.value;
          break;
      }

      return newState;
    });

    // Handle multipliers separately
    if (upgrade.effect.type === 'clickMultiplier') {
      setClickMultiplier(prev => prev * upgrade.effect.value);
    } else if (upgrade.effect.type === 'passiveMultiplier') {
      setPassiveMultiplier(prev => prev * upgrade.effect.value);
    }

    return true;
  }, [upgrades]);

  // Invest IC into module construction
  const investInModule = useCallback((moduleId: keyof GameState['moduleProgress'], amount: number) => {
    const module = modules.find(m => m.id === moduleId);
    if (!module) return false;

    setGameState(prev => {
      if (prev.innovationCapital < amount) return prev;
      if (prev.moduleProgress[moduleId] >= 100) return prev;

      const progressIncrement = (amount / module.requiredIC) * 100;
      const newProgress = Math.min(prev.moduleProgress[moduleId] + progressIncrement, 100);

      return {
        ...prev,
        innovationCapital: prev.innovationCapital - amount,
        moduleProgress: {
          ...prev.moduleProgress,
          [moduleId]: newProgress,
        },
      };
    });

    return true;
  }, [modules]);

  // Complete tutorial
  const completeTutorial = useCallback(() => {
    setGameState(prev => ({ ...prev, tutorialComplete: true }));
  }, []);

  // Reset game
  const resetGame = useCallback(() => {
    setGameState({ ...INITIAL_STATE, gameStartTime: Date.now() });
    setClickMultiplier(1);
    setPassiveMultiplier(1);
  }, []);

  // Passive income generation
  useEffect(() => {
    if (gameState.passiveIncomeRate === 0) return;

    const interval = setInterval(() => {
      setGameState(prev => ({
        ...prev,
        innovationCapital: prev.innovationCapital + (prev.passiveIncomeRate * passiveMultiplier),
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState.passiveIncomeRate, passiveMultiplier]);

  // Check win condition
  useEffect(() => {
    const allModulesComplete = Object.values(gameState.moduleProgress).every(p => p >= 100);
    if (allModulesComplete && !gameState.isWon) {
      setGameState(prev => ({ ...prev, isWon: true }));
    }
  }, [gameState.moduleProgress, gameState.isWon]);

  // Calculate overall progress (0-100)
  const overallProgress = Object.values(gameState.moduleProgress).reduce((sum, val) => sum + val, 0) / 5;

  // Get available upgrades (not yet purchased)
  const availableUpgrades = upgrades.filter(u => !gameState.unlockedUpgrades.includes(u.id));

  // Get purchased upgrades
  const purchasedUpgrades = upgrades.filter(u => gameState.unlockedUpgrades.includes(u.id));

  // Calculate playtime in seconds
  const playtime = Math.floor((Date.now() - gameState.gameStartTime) / 1000);

  return {
    gameState,
    upgrades,
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
  };
};
