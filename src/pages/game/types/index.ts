// Game State Types

export interface GameState {
  innovationCapital: number;
  clickPower: number;
  passiveIncomeRate: number;
  unlockedUpgrades: string[];
  moduleProgress: ModuleProgressMap;
  gameStartTime: number;
  totalClicks: number;
  isWon: boolean;
  tutorialComplete: boolean;
}

export interface ModuleProgressMap {
  habitat: number;
  power: number;
  research: number;
  manufacturing: number;
  communications: number;
}

export interface Upgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  effect: UpgradeEffect;
  wichitaFact?: string;
  icon: string;
}

export interface UpgradeEffect {
  type: 'clickPower' | 'passiveIncome' | 'clickMultiplier' | 'passiveMultiplier';
  value: number;
}

export interface MoonbaseModule {
  id: keyof ModuleProgressMap;
  name: string;
  description: string;
  requiredIC: number;
  icon: string;
}

export interface WichitaFact {
  id: string;
  fact: string;
  category: 'aerospace' | 'innovation' | 'landmark';
}

export interface TutorialStep {
  id: string;
  title: string;
  description: string;
  target?: string;
  action?: string;
}
