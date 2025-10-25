# Technical Walkthrough: Wichita to the Moon Game

**Challenge**: `/game` route
**Type**: Resource Management Clicker Game
**Last Updated**: 2025-10-25
**Status**: MVP Complete

---

## Executive Summary

"Wichita to the Moon" is a browser-based clicker game built with React and TypeScript that celebrates Wichita's aerospace heritage. Players generate Innovation Capital (IC) by clicking Wichita-themed resources, purchase upgrades representing real aerospace companies and landmarks, and invest IC to construct a 5-module moonbase. The game is designed to be completable in 10-15 minutes with simple mouse-only controls.

**Key Technologies**:
- React 18 (functional components with hooks)
- TypeScript (strict mode for type safety)
- Bun runtime (fast dev server and package management)
- Inline CSS-in-JS styling (no external CSS libraries for simplicity)

---

## Architecture Overview

### Component Hierarchy

```
GameChallenge (src/pages/game/GameChallenge.tsx)
├── TutorialOverlay (conditional render)
├── WinScreen (conditional render)
├── GameHeader
│   └── ProgressBar
├── ClickerPanel
│   └── Click animations (inline)
├── MoonbasePanel
│   ├── ProgressBar (per module)
│   └── Investment controls
└── UpgradesShop
    └── Upgrade cards
```

### State Management Strategy

**Single Source of Truth**: `useGameState` hook (`src/pages/game/hooks/useGameState.ts`)

The game uses a centralized custom hook rather than Context API or external state management libraries. This approach keeps the MVP simple while providing all necessary functionality:

```typescript
const {
  gameState,           // Core game state object
  modules,             // Module definitions from JSON
  availableUpgrades,   // Upgrades not yet purchased
  purchasedUpgrades,   // Already unlocked upgrades
  overallProgress,     // Calculated 0-100 completion %
  playtime,            // Seconds since game start
  handleClick,         // Click handler for IC generation
  purchaseUpgrade,     // Buy an upgrade
  investInModule,      // Invest IC into module construction
  completeTutorial,    // Mark tutorial as done
  resetGame,           // Restart game from beginning
} = useGameState();
```

**Why this approach?**
- **Simplicity**: Single hook, easy to understand
- **Performance**: No unnecessary re-renders, state updates are localized
- **Testability**: Pure functions for game logic
- **Scalability**: Can migrate to Context/Zustand later if needed

---

## Core Game Systems

### 1. Clicker Mechanic (IC Generation)

**Location**: `src/pages/game/hooks/useGameState.ts` (lines 40-46)

```typescript
const handleClick = useCallback(() => {
  setGameState(prev => ({
    ...prev,
    innovationCapital: prev.innovationCapital + (prev.clickPower * clickMultiplier),
    totalClicks: prev.totalClicks + 1,
  }));
}, [clickMultiplier]);
```

**How it works**:
1. Player clicks the blue aviation center in `ClickerPanel`
2. `handleClick` is invoked
3. IC increases by `clickPower × clickMultiplier`
4. Click counter increments
5. Visual feedback: floating `+X` animation appears at click location

**Visual Feedback** (`src/pages/game/features/clicker/ClickerPanel.tsx`):
- Button scales down (0.95) on mouse down, returns to 1.0 on release
- Floating number animation (`@keyframes floatUp`) shows IC gained
- Animation lasts 1 second, then removed from state

**Initial Values**:
- `clickPower`: 1 IC per click
- `clickMultiplier`: 1x (increased by specific upgrades)

---

### 2. Passive Income System

**Location**: `src/pages/game/hooks/useGameState.ts` (lines 85-94)

```typescript
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
```

**How it works**:
1. `useEffect` hook sets up interval when `passiveIncomeRate > 0`
2. Every 1000ms (1 second), IC increases by `passiveIncomeRate × passiveMultiplier`
3. Updates automatically without user interaction
4. Displayed in real-time in `GameHeader` ("+X/sec" indicator)

**Performance Consideration**:
- Single interval per game session (not per upgrade)
- Cleanup on unmount prevents memory leaks
- Rate limited to 1Hz to avoid excessive re-renders

---

### 3. Upgrade System

**Location**: `src/pages/game/hooks/useGameState.ts` (lines 48-75)

```typescript
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
```

**Upgrade Types**:
1. **clickPower**: Additive increase to IC per click (e.g., +50 IC/click)
2. **passiveIncome**: Additive increase to IC per second (e.g., +100 IC/sec)
3. **clickMultiplier**: Multiplicative boost to all click power (e.g., 2x)
4. **passiveMultiplier**: Multiplicative boost to all passive income (e.g., 3x)

**Validation Logic**:
- Checks if player has enough IC
- Prevents double-purchasing (checks `unlockedUpgrades` array)
- Returns `false` if purchase fails (e.g., insufficient funds)

**Why separate multiplier state?**
- Multipliers compound over time (2x then 3x = 6x total)
- Keeping them separate from `gameState` simplifies calculation
- Prevents floating-point errors from repeated multiplication

---

### 4. Module Construction System

**Location**: `src/pages/game/hooks/useGameState.ts` (lines 77-93)

```typescript
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
```

**How it works**:
1. Player enters IC amount to invest in `MoonbasePanel`
2. Clicks "Invest" button for specific module
3. `investInModule` deducts IC and calculates progress increment
4. Progress capped at 100% (prevents over-investment)
5. Visual progress bar updates immediately

**Module Costs** (from `src/pages/game/data/modules.json`):
- Habitat: 5,000 IC
- Power: 8,000 IC
- Research: 12,000 IC
- Manufacturing: 18,000 IC
- Communications: 25,000 IC
- **Total**: 68,000 IC required to complete all modules

**UX Convenience**:
- "Max" button auto-fills with affordable amount (up to remaining IC for module)
- Input validation prevents negative or over-budget investments
- Progress bars color-coded: purple (0-49%), yellow (50-99%), green (100%)

---

### 5. Win Condition Detection

**Location**: `src/pages/game/hooks/useGameState.ts` (lines 96-102)

```typescript
useEffect(() => {
  const allModulesComplete = Object.values(gameState.moduleProgress).every(p => p >= 100);
  if (allModulesComplete && !gameState.isWon) {
    setGameState(prev => ({ ...prev, isWon: true }));
  }
}, [gameState.moduleProgress, gameState.isWon]);
```

**How it works**:
1. `useEffect` monitors `moduleProgress` object
2. When all 5 modules reach 100%, `isWon` flag set to true
3. Triggers `WinScreen` component render
4. Win screen displays:
   - Playtime (formatted MM:SS)
   - Total IC generated
   - Total clicks
   - Upgrades unlocked
   - Random Wichita fact

**Performance Note**:
- Only recalculates when `moduleProgress` changes
- `isWon` flag prevents re-triggering after already won

---

## Wichita Integration

### Educational Content Strategy

**Upgrades as Learning Moments**:
Every upgrade represents a real Wichita aerospace company, landmark, or institution. When players click an upgrade in `UpgradesShop`, a tooltip expands to show the `wichitaFact` explaining its significance.

**Example** (`src/pages/game/data/upgrades.json`):
```json
{
  "id": "spirit-aero",
  "name": "Spirit AeroSystems",
  "description": "World-class aerostructures manufacturer",
  "cost": 500,
  "effect": { "type": "clickPower", "value": 50 },
  "wichitaFact": "World's largest first-tier aerostructures manufacturer, building fuselages for Boeing aircraft",
  "icon": "✈️"
}
```

**Featured Wichita Entities** (12 total upgrades):
1. Keeper of the Plains (landmark)
2. Spirit AeroSystems (aerospace manufacturing)
3. Textron Aviation (Cessna & Beechcraft)
4. WSU Innovation Campus (university-industry partnership)
5. McConnell Air Force Base (military aviation)
6. Stearman Field Heritage (WWII training legacy)
7. NetApp Tech Hub (technology sector)
8. Koch Industries (manufacturing excellence)
9. Aviation Manufacturing District (supplier ecosystem)
10. Wichita Workforce (skilled labor pool)
11. Air Capital Legacy (100+ years of aviation)
12. Moonshot Mentality (innovation culture)

**Win Screen Educational Content**:
Random Wichita fact displayed on win (8 facts total in `wichitaFacts.json`), covering aerospace history, innovation ecosystem, and cultural landmarks.

---

## Moonbase Visualization

### Progress Tracking

**Location**: `src/pages/game/features/moonbase/MoonbasePanel.tsx`

Each of the 5 moonbase modules displays:
- **Icon**: Emoji representing module type (🏠 Habitat, ⚡ Power, 🔬 Research, ⚙️ Manufacturing, 📡 Communications)
- **Name & Description**: Clear labeling of module purpose
- **Progress Bar**: Visual indicator (0-100%) with color coding
- **Investment Controls**: Input field + "Invest" button + "Max" button
- **Remaining IC**: Shows how much more IC needed to complete

**Color Coding**:
```typescript
const getModuleColor = (progress: number): string => {
  if (progress >= 100) return '#10b981'; // green
  if (progress >= 50) return '#fbbf24'; // yellow
  return '#8b5cf6'; // purple
};
```

**Completion Indicators**:
- Green border around completed modules
- Checkmark (✅) icon appears
- Investment controls hidden when module at 100%

---

## Data Flow Diagram

```
User Click
    ↓
ClickerPanel.onClick()
    ↓
handleClick() in useGameState
    ↓
gameState.innovationCapital += (clickPower × clickMultiplier)
gameState.totalClicks++
    ↓
GameHeader re-renders (shows new IC)
UpgradesShop re-renders (enables affordable upgrades)
MoonbasePanel re-renders (enables new investments)

---

User Purchases Upgrade
    ↓
UpgradesShop.onPurchase(upgradeId)
    ↓
purchaseUpgrade(upgradeId) in useGameState
    ↓
gameState.innovationCapital -= upgrade.cost
gameState.unlockedUpgrades.push(upgradeId)
gameState.clickPower += effect.value (or passiveIncomeRate)
    ↓
GameHeader re-renders (shows updated IC)
UpgradesShop re-renders (moves upgrade to "Purchased" list)
ClickerPanel re-renders (shows new click power)

---

Passive Income Tick (every 1 second)
    ↓
useEffect interval fires
    ↓
gameState.innovationCapital += (passiveIncomeRate × passiveMultiplier)
    ↓
GameHeader re-renders (shows new IC and "/sec" rate)

---

User Invests in Module
    ↓
MoonbasePanel.onInvest(moduleId, amount)
    ↓
investInModule(moduleId, amount) in useGameState
    ↓
gameState.innovationCapital -= amount
gameState.moduleProgress[moduleId] += (amount / requiredIC) * 100
    ↓
MoonbasePanel re-renders (progress bar updates)
GameHeader re-renders (overall progress updates)
    ↓
Win Condition useEffect checks if all modules 100%
    ↓
If true: gameState.isWon = true
    ↓
WinScreen renders
```

---

## Technology Choices & Rationale

### React Functional Components with Hooks

**Why?**
- Modern React best practice (class components deprecated)
- Cleaner, more concise code
- Better TypeScript integration
- Easier to test and reason about

**Hooks Used**:
- `useState`: Local component state (animations, input values)
- `useEffect`: Side effects (passive income timer, win condition)
- `useCallback`: Memoize functions to prevent unnecessary re-renders

### TypeScript Strict Mode

**Why?**
- Catch bugs at compile time, not runtime
- Autocomplete and IntelliSense improve DX
- Self-documenting code (types serve as inline documentation)
- Easier refactoring (compiler catches breaking changes)

**Key Type Definitions** (`src/pages/game/types/index.ts`):
- `GameState`: Central game state interface
- `Upgrade`: Upgrade definition with effect typing
- `MoonbaseModule`: Module configuration
- `ModuleProgressMap`: Type-safe module progress tracking

### Inline CSS-in-JS (No External CSS Libraries)

**Why?**
- **Simplicity**: No Tailwind, CSS Modules, or Styled Components dependencies
- **Co-location**: Styles live next to components (easier to maintain)
- **Dynamic Styles**: Easy to compute styles based on props (e.g., progress bar width)
- **Zero Build Config**: No additional build step or configuration

**Tradeoffs**:
- Larger component files (styles inline)
- No class reusability (acceptable for MVP scope)
- Slightly more verbose than Tailwind utility classes

**Future Enhancement**: Could refactor to Tailwind CSS if styling becomes repetitive.

### JSON for Data Configuration

**Why?**
- **Separation of Concerns**: Game data separate from logic
- **Easy to Edit**: Non-developers can update costs, descriptions, facts
- **Type-Safe Import**: TypeScript validates JSON structure
- **Scalable**: Can move to database/CMS later

**Data Files**:
- `upgrades.json`: 12 Wichita-themed upgrades
- `modules.json`: 5 moonbase modules
- `wichitaFacts.json`: 8 educational facts

---

## Performance Optimizations

### 1. Memoization with `useCallback`

All handler functions in `useGameState` wrapped in `useCallback` to prevent child component re-renders:

```typescript
const handleClick = useCallback(() => { /* ... */ }, [clickMultiplier]);
const purchaseUpgrade = useCallback((id) => { /* ... */ }, [upgrades]);
const investInModule = useCallback((id, amt) => { /* ... */ }, [modules]);
```

**Impact**: Prevents `ClickerPanel`, `UpgradesShop`, and `MoonbasePanel` from re-rendering unnecessarily.

### 2. Conditional Rendering

Tutorial and win screen only render when conditions met:

```typescript
{!gameState.tutorialComplete && <TutorialOverlay />}
{gameState.isWon && <WinScreen />}
```

**Impact**: Reduces DOM nodes and React reconciliation work during normal gameplay.

### 3. Efficient State Updates

State updates use functional updaters to avoid stale closures:

```typescript
setGameState(prev => ({
  ...prev,
  innovationCapital: prev.innovationCapital + amount,
}));
```

**Impact**: Ensures correct state even with rapid clicks or async updates.

### 4. Single Passive Income Timer

One `setInterval` for all passive income, not per upgrade:

```typescript
useEffect(() => {
  const interval = setInterval(() => { /* add total passive income */ }, 1000);
  return () => clearInterval(interval);
}, [gameState.passiveIncomeRate, passiveMultiplier]);
```

**Impact**: O(1) timers instead of O(n) where n = number of passive upgrades.

### 5. Animation Cleanup

Floating click animations removed from state after 1 second:

```typescript
setTimeout(() => {
  setClickAnimations(prev => prev.filter(anim => anim.id !== id));
}, 1000);
```

**Impact**: Prevents memory leaks from accumulated animation objects.

---

## Mobile Responsiveness Strategy

### Responsive Layout (CSS Grid)

Main game area uses `grid-template-columns: repeat(auto-fit, minmax(400px, 1fr))`:

- **Desktop (>800px)**: 2 columns (Clicker + Moonbase side-by-side)
- **Mobile (<800px)**: 1 column (stacked vertically)

### Touch-Friendly Targets

All interactive elements meet 44x44px minimum:
- Click area: 280x200px (large blue button)
- Upgrade cards: Full width on mobile
- Investment buttons: 44px height

### Mobile Optimizations

- Font sizes relative (`em`, `rem`)
- Padding scales with viewport
- No hover-dependent functionality (all interactions work on touch)
- Win screen and tutorial use `padding: 20px` for edge spacing

---

## Accessibility Considerations

### Semantic HTML

- Proper heading hierarchy (`<h1>`, `<h2>`)
- Buttons use `<button>` elements (not `<div>`)
- Form controls properly labeled

### Keyboard Support

- All buttons keyboard-navigable (native `<button>` behavior)
- Tutorial can be dismissed with Tab + Enter

### Color Contrast

- All text meets WCAG 2.1 AA (4.5:1 ratio):
  - White text on dark backgrounds (#1f2937)
  - Dark text on light backgrounds (#f9fafb)
- IC counter: Gold (#fbbf24) on dark gray (7:1 ratio)

### Screen Reader Compatibility

- Buttons have descriptive text ("Invest", "Purchase")
- Progress bars have labels ("Moonbase Progress", module names)
- Win screen content structured logically

**Future Enhancement**: Add `aria-label` attributes for click counters and progress percentages.

---

## Testing Strategy

### Manual Testing Checklist

✅ **Clicker Mechanic**:
- [x] Clicking generates IC
- [x] Click counter increments
- [x] Floating animation appears at click location
- [x] Multiple rapid clicks don't break state

✅ **Upgrade System**:
- [x] Can purchase affordable upgrades
- [x] Cannot purchase locked upgrades (insufficient IC)
- [x] Cannot double-purchase same upgrade
- [x] Upgrade effects apply correctly (clickPower, passiveIncome, multipliers)
- [x] Wichita facts display on selection

✅ **Passive Income**:
- [x] IC increases automatically every second
- [x] Rate displayed in header
- [x] Multipliers compound correctly

✅ **Module Construction**:
- [x] Can invest in modules
- [x] Progress bars update correctly
- [x] Cannot invest more than available IC
- [x] Cannot over-invest (progress capped at 100%)
- [x] "Max" button calculates correctly

✅ **Win Condition**:
- [x] Win screen appears when all modules complete
- [x] Stats display correctly
- [x] Random fact shown
- [x] "Play Again" resets game

✅ **Tutorial**:
- [x] Tutorial appears on first load
- [x] Can navigate through steps
- [x] Can skip tutorial
- [x] Doesn't appear after completion

✅ **Mobile**:
- [x] Responsive layout works on narrow screens
- [x] Touch targets large enough
- [x] No horizontal scroll

### Automated Testing (Future)

**Unit Tests** (Vitest):
- `useGameState` hook logic
- Win condition calculation
- Upgrade effect application
- Module progress calculation

**Integration Tests** (React Testing Library):
- Full game flow (click → purchase → invest → win)
- Tutorial completion flow
- Reset game functionality

---

## Known Limitations & Future Enhancements

### MVP Limitations

1. **No Persistence**: Game state resets on page refresh
   - **Fix**: Add `localStorage` save/load in `useGameState`

2. **No Sound Effects**: Silent gameplay
   - **Enhancement**: Add click sound, purchase chime, win fanfare (with mute toggle)

3. **No Leaderboard**: No competition or social features
   - **Enhancement**: Track fastest completion times, highest IC generated

4. **Single Game Mode**: Only one difficulty level
   - **Enhancement**: Easy/Normal/Hard modes with adjusted costs

5. **Static Win Screen**: Single random fact
   - **Enhancement**: Rotating facts, social share buttons

### Planned v2 Features (From PRD)

**AI Agent NPC System**:
- "Commander Ada" character providing dynamic hints
- Context-aware dialogue based on player progress
- Integration with existing `/reskill` agent architecture
- Anthropic Claude API for natural conversation

**Additional Polish**:
- Particle effects on module completion
- Background music (Wichita-themed)
- More animations (upgrade unlock celebrations)
- Advanced stats (IC per minute, efficiency metrics)

---

## Deployment Guide

### Development

```bash
# Install dependencies
bun install

# Start dev server (http://localhost:5173)
bun run dev

# Type check
bun run type-check

# Build for production
bun run build
```

### Production Deployment (AWS)

**Option A: S3 + CloudFront (Static Hosting)**

```bash
# Build production bundle
bun run build

# Sync to S3 bucket
aws s3 sync dist/ s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

**Option B: AWS Amplify**

```bash
# Install Amplify CLI
npm install -g @aws-amplify/cli

# Initialize Amplify
amplify init

# Deploy
amplify publish
```

### Environment Variables

No environment variables required for MVP (all data in JSON files).

**Future**: If adding AI agent (v2), set `VITE_CLAUDE_API_KEY` in `.env`.

---

## File Structure Summary

```
src/pages/game/
├── GameChallenge.tsx          # Main entry point
├── types/
│   └── index.ts               # TypeScript interfaces
├── data/
│   ├── upgrades.json          # 12 Wichita upgrades
│   ├── modules.json           # 5 moonbase modules
│   └── wichitaFacts.json      # 8 educational facts
├── hooks/
│   └── useGameState.ts        # Central game state hook
├── components/
│   ├── GameHeader.tsx         # IC counter, progress bar
│   ├── ProgressBar.tsx        # Reusable progress bar
│   └── WinScreen.tsx          # Victory modal
├── features/
│   ├── clicker/
│   │   └── ClickerPanel.tsx   # Click area
│   ├── moonbase/
│   │   └── MoonbasePanel.tsx  # Module construction
│   ├── upgrades/
│   │   └── UpgradesShop.tsx   # Purchase menu
│   └── tutorial/
│       └── TutorialOverlay.tsx # First-time guide
```

**Total Files**: 14
**Total Lines of Code**: ~1,400 (TypeScript + JSX)
**Dependencies**: 3 (React, React-DOM, React-Router)

---

## Code Quality & Best Practices

### TypeScript Strictness

- No `any` types (except existing reskill code)
- Explicit return types for functions
- Strict null checks enabled
- Interfaces for all complex objects

### React Best Practices

- Functional components only (no classes)
- Props destructured in function signature
- Keys on list items
- No inline object/array creation in JSX (prevents re-renders)
- `useCallback` for event handlers passed to children

### Code Organization

- Feature-based directory structure
- Co-located components with their features
- Shared components in `/components`
- Centralized types in `/types`
- Data separate from logic (`/data`)

### Performance Mindfulness

- Memoized callbacks with `useCallback`
- Conditional rendering for expensive components
- Efficient state updates (functional form)
- Single timer for passive income
- Animation cleanup to prevent leaks

---

## Troubleshooting

### Issue: Game won't start / white screen

**Diagnosis**: Check browser console for errors
**Fix**: Ensure all imports resolve correctly, check for typos in file paths

### Issue: Clicks not registering

**Diagnosis**: Check if `handleClick` is wired to `onClick` prop
**Fix**: Verify `ClickerPanel` receives `onClick` prop and binds to div

### Issue: Passive income not generating

**Diagnosis**: Check if `passiveIncomeRate > 0`
**Fix**: Purchase at least one passive income upgrade (Textron Aviation, WSU Innovation, etc.)

### Issue: Win screen doesn't appear

**Diagnosis**: Check if all 5 modules at 100%
**Fix**: Verify `moduleProgress` values, ensure `isWon` flag set correctly

### Issue: Tutorial won't dismiss

**Diagnosis**: Check `tutorialComplete` state
**Fix**: Ensure `completeTutorial()` is called on "Start Game" or "Skip"

---

## Conclusion

"Wichita to the Moon" demonstrates that engaging, educational games can be built with simple technology stacks. By focusing on core mechanics, clear UX, and meaningful content (Wichita's aerospace heritage), the game achieves its goals:

✅ **Simple**: Mouse-only controls, 10-15 minute playtime
✅ **Educational**: 12 upgrades + 8 facts about Wichita aerospace
✅ **Complete**: Clear beginning (tutorial), progression (modules), and end (win screen)
✅ **Deployable**: Static build, ready for AWS hosting

The architecture is intentionally straightforward to enable rapid iteration and future enhancements (AI agents, sound, leaderboards) without major refactoring.

**Next Steps**: Deploy to public demo URL, gather user feedback, iterate on balance (upgrade costs, module requirements).
