# Wichita to the Moon - Game Implementation Guide

**Challenge 2**: Resource Management Clicker Game
**Route**: `/game`
**Status**: ✅ MVP Complete
**Playtime**: 10-15 minutes

---

## Quick Overview

"Wichita to the Moon" is a browser-based clicker game that celebrates Wichita's aerospace heritage. Players click to generate Innovation Capital (IC), purchase upgrades representing real Wichita companies/landmarks, and invest IC to build a 5-module moonbase.

**Core Loop**: Click → Generate IC → Buy Upgrades → Build Moonbase → Win

---

## Architecture at a Glance

### State Management

**Single Source of Truth**: `hooks/useGameState.ts`

```typescript
const {
  gameState,           // Core state: IC, clicks, progress, etc.
  modules,             // 5 moonbase modules from JSON
  availableUpgrades,   // Upgrades player can purchase
  purchasedUpgrades,   // Already unlocked upgrades
  overallProgress,     // 0-100% moonbase completion
  playtime,            // Seconds since game start
  handleClick,         // Click handler (+IC)
  purchaseUpgrade,     // Buy upgrade with IC
  investInModule,      // Invest IC into module construction
  completeTutorial,    // Mark tutorial done
  resetGame,           // Start over
} = useGameState();
```

**Why a custom hook instead of Context/Redux?**
- Simpler for single-screen game
- No prop drilling needed
- Easy to test and reason about
- Can migrate to Context later if needed

---

## File Structure

```
src/pages/game/
├── GameChallenge.tsx          # Main entry point, orchestrates all components
│
├── types/
│   └── index.ts               # TypeScript interfaces (GameState, Upgrade, Module, etc.)
│
├── data/                      # Game configuration (JSON files)
│   ├── upgrades.json          # 12 Wichita-themed upgrades with costs and effects
│   ├── modules.json           # 5 moonbase modules with IC requirements
│   └── wichitaFacts.json      # 8 educational facts for win screen
│
├── hooks/
│   └── useGameState.ts        # Central game logic and state management
│
├── components/                # Reusable UI components
│   ├── GameHeader.tsx         # IC counter, progress bar, game title
│   ├── ProgressBar.tsx        # Reusable progress bar (modules, overall progress)
│   └── WinScreen.tsx          # Victory modal with stats and facts
│
└── features/                  # Feature-specific components
    ├── clicker/
    │   └── ClickerPanel.tsx   # Click area with animations
    ├── moonbase/
    │   └── MoonbasePanel.tsx  # Module construction interface
    ├── upgrades/
    │   └── UpgradesShop.tsx   # Purchase menu with Wichita upgrades
    └── tutorial/
        └── TutorialOverlay.tsx # First-time player guide (4 steps)
```

**Total Files**: 13
**Total Lines**: ~1,400 (TypeScript + JSX)
**Dependencies**: React, React-DOM, React-Router only

---

## Core Game Systems

### 1. Clicker Mechanic

**File**: `hooks/useGameState.ts` (lines 40-46)

```typescript
const handleClick = useCallback(() => {
  setGameState(prev => ({
    ...prev,
    innovationCapital: prev.innovationCapital + (prev.clickPower * clickMultiplier),
    totalClicks: prev.totalClicks + 1,
  }));
}, [clickMultiplier]);
```

**Flow**:
1. Player clicks blue aviation center in `ClickerPanel`
2. IC increases by `clickPower × clickMultiplier`
3. Floating `+X` animation appears at click location
4. Click counter increments

**Initial Values**: `clickPower = 1`, `clickMultiplier = 1`

---

### 2. Passive Income

**File**: `hooks/useGameState.ts` (lines 85-94)

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
- Activates when player purchases passive income upgrade
- Adds IC every second automatically
- Rate displayed in header ("+X/sec")
- Single timer for all passive income (efficient)

---

### 3. Upgrade System

**File**: `hooks/useGameState.ts` (lines 48-75)

**4 Upgrade Types**:
1. **clickPower**: Additive IC per click (e.g., +50 IC/click)
2. **passiveIncome**: Additive IC per second (e.g., +100 IC/sec)
3. **clickMultiplier**: Multiplicative click boost (e.g., 2x all clicks)
4. **passiveMultiplier**: Multiplicative passive boost (e.g., 3x all passive)

**Validation**:
- Checks if player has enough IC
- Prevents double-purchasing
- Returns `false` if purchase fails

**Example Upgrade** (`data/upgrades.json`):
```json
{
  "id": "spirit-aero",
  "name": "Spirit AeroSystems",
  "description": "World-class aerostructures manufacturer",
  "cost": 500,
  "effect": { "type": "clickPower", "value": 50 },
  "wichitaFact": "World's largest first-tier aerostructures manufacturer...",
  "icon": "✈️"
}
```

---

### 4. Module Construction

**File**: `hooks/useGameState.ts` (lines 77-93)

**5 Moonbase Modules**:
1. **Habitat** - 5,000 IC (living quarters)
2. **Power** - 8,000 IC (solar arrays)
3. **Research** - 12,000 IC (science lab)
4. **Manufacturing** - 18,000 IC (resource processing)
5. **Communications** - 25,000 IC (Earth-Moon link)

**Total to Win**: 68,000 IC

**Investment Logic**:
```typescript
const progressIncrement = (amount / module.requiredIC) * 100;
const newProgress = Math.min(prev.moduleProgress[moduleId] + progressIncrement, 100);
```

- Player invests any amount of IC
- Progress calculated as percentage of total cost
- Capped at 100% (can't over-invest)
- "Max" button auto-fills with affordable amount

---

### 5. Win Condition

**File**: `hooks/useGameState.ts` (lines 96-102)

```typescript
useEffect(() => {
  const allModulesComplete = Object.values(gameState.moduleProgress).every(p => p >= 100);
  if (allModulesComplete && !gameState.isWon) {
    setGameState(prev => ({ ...prev, isWon: true }));
  }
}, [gameState.moduleProgress, gameState.isWon]);
```

**Triggers when**: All 5 modules reach 100%

**Win Screen displays**:
- Playtime (MM:SS format)
- Total IC generated
- Total clicks
- Upgrades unlocked
- Random Wichita aerospace fact

---

## Key Design Decisions

### 1. Why JSON for Data?

**Files**: `data/upgrades.json`, `data/modules.json`, `data/wichitaFacts.json`

**Benefits**:
- Separate content from logic (non-devs can edit)
- Type-safe imports with TypeScript
- Easy to balance (adjust costs without touching code)
- Can migrate to database/CMS later

**Alternative Considered**: Hardcoded in TypeScript
- **Rejected**: Makes balancing harder, mixes concerns

---

### 2. Why Inline CSS-in-JS?

**Approach**: All styles inline with `style={{}}` prop

**Benefits**:
- No external dependencies (Tailwind, Styled Components, etc.)
- Styles co-located with components
- Dynamic styles easy (e.g., progress bar width)
- Zero build configuration

**Tradeoffs**:
- Larger component files
- No class reusability (acceptable for MVP)
- More verbose than utility classes

**When to Refactor**: If styling becomes repetitive across multiple games/challenges, migrate to Tailwind CSS

---

### 3. Why Single useGameState Hook?

**Alternative Considered**: React Context + separate hooks for each feature

**Why Custom Hook Won**:
- Single-screen game (no deep component tree)
- No prop drilling issues
- Simpler mental model
- Easier to test (single source of truth)

**When to Refactor**: If adding multiple game modes or screens, migrate to Context API

---

### 4. Why One Passive Income Timer?

**Implementation**: Single `setInterval` that adds total passive income

**Alternative Considered**: One timer per passive upgrade

**Why Single Timer**:
- O(1) timers instead of O(n) where n = number of upgrades
- Simpler state management
- Better performance (less interval overhead)

---

## Wichita Integration

### Educational Strategy

**Goal**: Teach players about Wichita's aerospace ecosystem while they play

**Methods**:
1. **Upgrade Names**: Real companies/landmarks (Spirit AeroSystems, Textron Aviation, WSU Innovation Campus, McConnell AFB)
2. **Tooltips**: `wichitaFact` appears when upgrade selected in shop
3. **Win Screen**: Random fact from `wichitaFacts.json` displayed on victory

**12 Wichita Entities Featured**:
- Aerospace: Spirit AeroSystems, Textron Aviation (Cessna/Beechcraft), McConnell AFB, Stearman Field
- Innovation: WSU Innovation Campus, NetApp, Koch Industries, Aviation Manufacturing District
- Legacy: Keeper of the Plains, Wichita Workforce, Air Capital Legacy, Moonshot Mentality

**Educational Content Sources**:
- Wichita State University aerospace programs
- Kansas Department of Commerce economic data
- Local aerospace company histories
- "Air Capital of the World" heritage

---

## Performance Optimizations

### 1. Memoization

All event handlers wrapped in `useCallback`:

```typescript
const handleClick = useCallback(() => { /* ... */ }, [clickMultiplier]);
const purchaseUpgrade = useCallback((id) => { /* ... */ }, [upgrades]);
const investInModule = useCallback((id, amt) => { /* ... */ }, [modules]);
```

**Impact**: Prevents child components (`ClickerPanel`, `UpgradesShop`, `MoonbasePanel`) from re-rendering unnecessarily

---

### 2. Conditional Rendering

```typescript
{!gameState.tutorialComplete && <TutorialOverlay />}
{gameState.isWon && <WinScreen />}
```

**Impact**: Tutorial and win screen only mount when needed, reducing React reconciliation work

---

### 3. Animation Cleanup

Floating click animations removed after 1 second:

```typescript
setTimeout(() => {
  setClickAnimations(prev => prev.filter(anim => anim.id !== id));
}, 1000);
```

**Impact**: Prevents memory leaks from accumulated animation objects

---

### 4. Efficient State Updates

Always use functional updaters:

```typescript
setGameState(prev => ({
  ...prev,
  innovationCapital: prev.innovationCapital + amount,
}));
```

**Impact**: Avoids stale closure issues with rapid clicks or async updates

---

## Mobile Responsiveness

### Layout Strategy

**CSS Grid with auto-fit**:
```css
gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))'
```

- **Desktop (>800px)**: 2 columns (Clicker + Moonbase side-by-side)
- **Mobile (<800px)**: 1 column (stacked vertically)

### Touch Targets

All interactive elements meet 44x44px minimum:
- Click area: 280x200px (large blue button)
- Upgrade cards: Full width on mobile
- Investment buttons: 44px height
- Tutorial/win screen buttons: 48px height

---

## Common Workflows

### Adding a New Upgrade

1. **Edit** `data/upgrades.json`:
```json
{
  "id": "new-upgrade",
  "name": "New Wichita Company",
  "description": "Brief description",
  "cost": 1000,
  "effect": { "type": "clickPower", "value": 25 },
  "wichitaFact": "Educational fact here",
  "icon": "🏭"
}
```

2. **Test**: Purchase upgrade, verify effect applies
3. **Balance**: Adjust cost based on playtesting

**No code changes needed** - JSON auto-loads

---

### Adjusting Module Costs

1. **Edit** `data/modules.json`:
```json
{
  "id": "habitat",
  "name": "Habitat Module",
  "description": "Living quarters for lunar crew",
  "requiredIC": 5000,  // ← Change this
  "icon": "🏠"
}
```

2. **Test**: Verify win time still 10-15 minutes

---

### Changing Tutorial Steps

1. **Edit** `features/tutorial/TutorialOverlay.tsx`:
```typescript
const TUTORIAL_STEPS: TutorialStep[] = [
  {
    title: 'New Step Title',
    description: 'New step description',
    icon: '👋',
  },
  // ... more steps
];
```

2. **Test**: Walk through tutorial, verify flow

---

### Adding Win Screen Facts

1. **Edit** `data/wichitaFacts.json`:
```json
{
  "id": "new-fact",
  "fact": "Your new Wichita fact here.",
  "category": "aerospace"
}
```

2. **Test**: Complete game multiple times, verify random fact appears

---

## Debugging Tips

### Issue: Clicks Not Registering

**Check**:
1. Is `handleClick` prop passed to `ClickerPanel`?
2. Is `onClick` bound to the click area div?
3. Check browser console for errors

**Fix**: Verify prop chain: `GameChallenge` → `ClickerPanel` → `div onClick`

---

### Issue: Passive Income Not Working

**Check**:
1. Has player purchased passive income upgrade?
2. Is `passiveIncomeRate > 0` in game state?
3. Check if interval is running (add `console.log` in useEffect)

**Fix**: Purchase Textron Aviation or similar upgrade to activate passive income

---

### Issue: Win Screen Won't Appear

**Check**:
1. Are all 5 modules at 100% progress?
2. Is `isWon` flag set in game state?
3. Check win condition useEffect logic

**Fix**: Open React DevTools, inspect `gameState.moduleProgress` and `gameState.isWon`

---

### Issue: Tutorial Stuck

**Check**:
1. Is `tutorialComplete` false in game state?
2. Is `completeTutorial` function wired to buttons?

**Fix**: Manually set `tutorialComplete: true` in localStorage (if persistence added) or click "Skip Tutorial"

---

## Testing Checklist

### Functional Tests

- [ ] Clicking generates IC
- [ ] Click counter increments
- [ ] Can purchase affordable upgrades
- [ ] Cannot purchase locked upgrades (insufficient IC)
- [ ] Cannot double-purchase same upgrade
- [ ] Upgrade effects apply correctly (click power, passive income, multipliers)
- [ ] Passive income generates every second
- [ ] Can invest in modules
- [ ] Progress bars update correctly
- [ ] Cannot invest more than available IC
- [ ] Win screen appears when all modules complete
- [ ] Stats display correctly on win screen
- [ ] "Play Again" resets game
- [ ] Tutorial appears on first load
- [ ] Tutorial can be skipped
- [ ] Tutorial doesn't reappear after completion

### Visual Tests

- [ ] Floating click animations appear and disappear
- [ ] Progress bars animate smoothly
- [ ] Upgrade cards highlight on hover (desktop)
- [ ] Buttons scale on click
- [ ] Mobile layout stacks correctly (<800px)
- [ ] Touch targets large enough on mobile

### Performance Tests

- [ ] Rapid clicking doesn't lag
- [ ] Passive income updates smoothly
- [ ] No memory leaks (check DevTools Memory tab)
- [ ] No console errors or warnings

---

## Deployment

### Build for Production

```bash
# Build optimized bundle
bun run build

# Output in dist/ directory
```

### Deploy to AWS

**Option A: S3 + CloudFront (Static)**
```bash
aws s3 sync dist/ s3://your-bucket-name --delete
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
```

**Option B: AWS Amplify**
```bash
amplify publish
```

### Environment Variables

**None required for MVP** - all data in JSON files

**Future (v2 with AI agent)**: Add `VITE_CLAUDE_API_KEY` for AI NPC

---

## Future Enhancements (v2)

### Planned Features

1. **AI Agent NPC** ("Commander Ada")
   - Dynamic hints based on progress
   - Contextual Wichita facts
   - Uses Anthropic Claude API
   - Integrates with `/reskill` agent architecture

2. **Persistence** (localStorage)
   - Save game state on progress
   - Resume after page refresh
   - "Continue" vs "New Game" on load

3. **Sound Effects**
   - Click sound
   - Purchase chime
   - Passive income tick
   - Module completion fanfare
   - Background music (Wichita-themed)
   - Mute toggle

4. **Leaderboard**
   - Fastest completion times
   - Highest IC generated
   - Most efficient (IC per click)

5. **Difficulty Modes**
   - Easy: Lower costs, higher income
   - Normal: Current balance
   - Hard: Higher costs, lower income

6. **Additional Animations**
   - Particle effects on module completion
   - Upgrade unlock celebrations
   - Moonbase visual (not just progress bars)

7. **Advanced Stats**
   - IC per minute
   - Efficiency ratio
   - Upgrade ROI calculations

---

## Troubleshooting Build Issues

### TypeScript Errors

**Command**: `bun run type-check` or `npx tsc --noEmit`

**Common Issues**:
- Unused imports (remove them)
- Missing types (ensure all JSON files typed correctly)
- `any` types (replace with proper interfaces)

**Game-Specific Files**: Only 1 minor error expected (unused React import in GameChallenge.tsx) - already fixed in current version

---

### Import Errors

**Symptom**: `Cannot find module '@/types'` or similar

**Fix**: Ensure paths are relative (`../types`) not aliased (`@/types`) unless tsconfig.json has path mapping configured

**Game uses relative imports only** - no path aliases needed

---

### JSON Import Issues

**Symptom**: `Cannot find module './data/upgrades.json'`

**Fix**: Ensure `tsconfig.json` has:
```json
{
  "compilerOptions": {
    "resolveJsonModule": true
  }
}
```

---

## Code Quality Standards

### TypeScript

- ✅ Strict mode enabled
- ✅ No `any` types (use `unknown` and type guards if needed)
- ✅ Explicit return types for functions
- ✅ Interfaces for all complex objects
- ✅ Proper typing for JSON imports

### React

- ✅ Functional components only
- ✅ Props destructured in signature
- ✅ Keys on list items
- ✅ `useCallback` for handlers passed to children
- ✅ Cleanup in useEffect (clear intervals/timeouts)

### File Organization

- ✅ Feature-based directory structure
- ✅ Co-located components with features
- ✅ Shared components in `/components`
- ✅ Types centralized in `/types`
- ✅ Data separate from logic (`/data`)

---

## Additional Resources

### Documentation

- **MVP PRD**: `/specs/game-mvp-prd.md` - Full product requirements
- **Technical Walkthrough**: `/docs/game-technical-walkthrough.md` - 400+ line implementation guide
- **Challenges Overview**: `/docs/challenges.md` - Multi-challenge structure

### External References

- **Wichita Aerospace**: [Wichita State Aerospace](https://www.wichita.edu/industry_and_defense/NIAR/)
- **Kansas Commerce**: [Kansas Department of Commerce](https://www.kansascommerce.gov/)
- **Spirit AeroSystems**: [Spirit AeroSystems](https://www.spiritaero.com/)
- **Textron Aviation**: [Textron Aviation](https://www.txtav.com/)

---

## Questions or Issues?

1. **Check existing docs**: Read PRD and technical walkthrough first
2. **Review this README**: Common workflows and debugging tips above
3. **Inspect game state**: Use React DevTools to examine `gameState` object
4. **Test in isolation**: Comment out components to isolate issue
5. **Check console**: Look for errors or warnings in browser DevTools

---

**Last Updated**: 2025-10-25
**Version**: 1.0 MVP
**Status**: ✅ Complete and Ready for Deployment
