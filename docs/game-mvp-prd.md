# MVP Product Requirements Document: "Wichita to the Moon"

**Game Challenge**: `/game/*` route
**Version**: 1.0 MVP
**Last Updated**: 2025-10-25
**Status**: Planning / Pre-Development

---

## Executive Summary

**"Wichita to the Moon"** is a browser-based resource management clicker game that celebrates Wichita's aviation and aerospace heritage while building a moonbase. Players gather resources by clicking on Wichita's aerospace industry, unlock local landmarks and companies, and progress through mission phases to establish a fully operational lunar outpost.

**Target Audience**: Adults (25-55) interested in Wichita's aerospace legacy, casual gamers, economic development stakeholders, community members

**Core Value Proposition**:
- Engaging, accessible gameplay (mouse-only, no learning curve)
- Educational about Wichita's "Air Capital of the World" identity
- Satisfying progression with clear milestones
- 10-15 minute play session for completion

---

## Product Vision

### Why This Game?

Wichita's aerospace and aviation heritage is world-class but often underappreciated. This game makes that legacy tangible and fun by connecting historical manufacturing excellence to future space exploration. Players experience firsthand how Wichita's innovation ecosystem can fuel literal moonshots.

### Success Metrics

- **Engagement**: 80%+ players complete the game (reach moonbase operational status)
- **Time-to-Complete**: 10-15 minutes average playtime
- **Educational Impact**: Players can name 3+ Wichita aerospace companies/landmarks after playing
- **Accessibility**: Playable on desktop and mobile with mouse/touch only

---

## Core Gameplay Mechanics

### Game Loop (Resource Management Clicker)

```
CLICK Wichita Resources → GENERATE Currency → UNLOCK Upgrades → BUILD Moonbase → WIN
```

1. **Resource Generation** (Clicker Mechanic)
   - Player clicks on Wichita-themed resource nodes to generate "Innovation Capital" (IC)
   - Each click produces IC based on current multipliers
   - Passive IC generation increases as upgrades are purchased

2. **Three Resource Types**
   - **Aviation Parts** (blue icon) - Generated from aerospace manufacturing facilities
   - **Tech Components** (green icon) - Generated from innovation/tech sector
   - **Innovation Capital** (gold icon) - Universal currency earned by clicking and upgrades

3. **Upgrade System**
   - **Wichita Landmarks** - Unlock buildings that provide passive IC generation
     - Keeper of the Plains
     - Beechcraft/Cessna/Spirit AeroSystems facilities
     - Wichita State University Innovation Campus
     - McConnell Air Force Base (historical tie-in)
   - **Manufacturing Upgrades** - Increase click power and passive generation
   - **Moonbase Modules** - Spend IC to construct moonbase sections

4. **Progression Phases**
   - **Phase 1: Local Industry** (0-30% completion) - Click Wichita resources, unlock first landmarks
   - **Phase 2: Supply Chain** (30-60% completion) - Build production facilities, increase multipliers
   - **Phase 3: Launch Operations** (60-90% completion) - Prepare moonbase components
   - **Phase 4: Moonbase Assembly** (90-100% completion) - Deploy and activate lunar modules

---

## Wichita Integration

### Aviation/Aerospace History

**Narrative Hook**: Wichita earned the title "Air Capital of the World" by producing more aircraft than any other city. Now, that same innovation ecosystem is building the next frontier: a moonbase.

**Featured Companies/Landmarks** (clickable upgrades):
- **Spirit AeroSystems** - Major aerospace manufacturer (produces Boeing components)
- **Textron Aviation** (Cessna/Beechcraft) - General aviation leader
- **Wichita State University** - Innovation Campus, aerospace engineering programs
- **McConnell Air Force Base** - Military aviation heritage
- **Keeper of the Plains** - Iconic landmark (symbolic of reaching new heights)

### Industry/Innovation Themes

**Economic Development Angle**: Game highlights Wichita's:
- Advanced manufacturing capabilities
- Skilled aerospace workforce
- Innovation ecosystem (university-industry partnerships)
- Supply chain excellence
- Future-focused economic development

**Educational Elements** (subtle, not preachy):
- Tooltips on upgrades explain real Wichita aerospace facts
- Visual representation of Wichita's industrial landscape
- End-game summary shows "Did You Know?" facts about Wichita's aerospace sector

---

## Moonbase Connection

### Why a Moonbase?

**Thematic Link**: Wichita builds aircraft that reach the skies; the moonbase represents the logical next step—reaching beyond Earth. It's aspirational but grounded in Wichita's real capabilities.

### Moonbase Modules (Win Condition Components)

Players must construct 5 moonbase modules to win:

1. **Habitat Module** - Living quarters (built with Aviation Parts)
2. **Power Module** - Solar arrays (built with Tech Components)
3. **Research Lab** - Scientific equipment (built with Innovation Capital)
4. **Manufacturing Bay** - Lunar resource processing (built with Aviation Parts + Tech Components)
5. **Communications Hub** - Earth-Moon link (built with Innovation Capital)

**Visual Representation**: Split-screen or toggle view showing Wichita (left) and Moonbase (right) as it's constructed.

---

## User Experience & Flow

### Game Start (Introduction)

**Opening Screen**:
- Title: "Wichita to the Moon"
- Subtitle: "From Air Capital to Space Frontier"
- Tagline: "Tap Wichita's aerospace innovation to build a moonbase"
- **START GAME** button

**Tutorial (First 60 seconds)**:
- Step 1: "Click the aircraft factory to generate Innovation Capital" (guided click)
- Step 2: "Spend IC to unlock your first upgrade: Keeper of the Plains" (guided purchase)
- Step 3: "Watch your moonbase grow as you unlock more of Wichita" (show progress bar)
- Step 4: "You're ready! Build all 5 moonbase modules to win."

### Main Game Screen Layout

```
┌─────────────────────────────────────────────────────────────┐
│ WICHITA TO THE MOON            IC: 1,250  [Progress: 45%]   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────┐  ┌────────────────────────────┐  │
│  │   WICHITA PANEL      │  │    MOONBASE PANEL          │  │
│  │                      │  │                            │  │
│  │  [Click Areas]       │  │  [Module Progress Bars]    │  │
│  │  ◉ Aircraft Factory  │  │  ▓▓▓▓▓░░░ Habitat (60%)    │  │
│  │  ◉ Tech Campus       │  │  ▓▓░░░░░░ Power (25%)      │  │
│  │  ◉ Innovation Hub    │  │  ░░░░░░░░ Research (0%)    │  │
│  │                      │  │  ░░░░░░░░ Manufacturing (0%)│  │
│  │  [Passive Gen]       │  │  ░░░░░░░░ Comms (0%)       │  │
│  │  +15 IC/sec          │  │                            │  │
│  └──────────────────────┘  └────────────────────────────┘  │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ UPGRADES SHOP                                          │ │
│  │ [Spirit AeroSystems] 500 IC - +50 IC/click             │ │
│  │ [WSU Innovation] 1,200 IC - +100 IC/sec (LOCKED)       │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### User Journey

1. **Start** → Tutorial (60 seconds)
2. **Early Game** (2-4 min) → Click resources, unlock first 2-3 upgrades, build Habitat Module
3. **Mid Game** (4-8 min) → Passive income flowing, unlock landmarks, build Power + Research Modules
4. **Late Game** (8-12 min) → High passive income, purchase final upgrades, complete Manufacturing + Comms Modules
5. **Win State** → All 5 modules complete, moonbase operational
6. **End Screen** → Victory message, stats summary, "Did You Know?" Wichita facts, "Play Again" button

### Win Condition

**Trigger**: All 5 moonbase modules reach 100% completion

**Win Screen**:
```
🌙 MOONBASE OPERATIONAL! 🚀

Congratulations! Wichita's aerospace innovation has reached the moon.

Your Stats:
- Time Played: 12:34
- Innovation Capital Generated: 45,320 IC
- Clicks: 1,245
- Upgrades Unlocked: 12/12

DID YOU KNOW?
Wichita produces more aircraft than any other city on Earth,
earning it the title "Air Capital of the World." Companies like
Spirit AeroSystems, Textron Aviation, and others employ thousands
of skilled workers building the planes that connect our world—
and now, the moonbase that expands it.

[PLAY AGAIN]  [SHARE RESULTS]
```

---

## Technical Requirements

### Technology Stack

- **Runtime**: Bun
- **Frontend Framework**: React 18+ with TypeScript
- **State Management**: React Context API or Zustand (for game state: IC, upgrades, module progress)
- **Styling**: CSS Modules or Tailwind CSS (match existing `/reskill` styling)
- **Animation**: CSS transitions for visual polish (module construction, IC counters)
- **Deployment**: AWS (same infrastructure as main app)

### Route Integration

**Primary Route**: `/game/*`
**Index Route**: `/game` (game start screen)
**No Sub-Routes**: Single-page game experience (all views on one route)

### File Structure

```
src/pages/game/
├── GameChallenge.tsx          # Main game component (entry point)
├── features/
│   ├── clicker/
│   │   ├── ClickerPanel.tsx   # Wichita resource click areas
│   │   ├── ResourceNode.tsx   # Individual clickable resources
│   │   └── useClickHandler.ts # Click logic and IC generation
│   ├── moonbase/
│   │   ├── MoonbasePanel.tsx  # Moonbase visualization
│   │   ├── ModuleProgress.tsx # Individual module progress bars
│   │   └── moonbaseLogic.ts   # Module construction logic
│   ├── upgrades/
│   │   ├── UpgradesShop.tsx   # Purchase menu for landmarks/upgrades
│   │   ├── UpgradeCard.tsx    # Individual upgrade display
│   │   └── upgradeDefinitions.ts # All upgrade configs
│   └── tutorial/
│       ├── TutorialOverlay.tsx # First-time player guidance
│       └── tutorialSteps.ts    # Tutorial sequence config
├── components/
│   ├── GameHeader.tsx          # IC counter, progress bar, game title
│   ├── WinScreen.tsx           # Victory modal/screen
│   └── ProgressBar.tsx         # Reusable progress bar component
├── hooks/
│   ├── useGameState.ts         # Central game state management
│   ├── usePassiveIncome.ts     # Tick-based IC generation
│   └── usePersistence.ts       # LocalStorage save/load (optional)
├── types/
│   └── index.ts                # Game-specific TypeScript types
└── data/
    ├── upgrades.json           # Upgrade definitions (cost, effects, descriptions)
    ├── modules.json            # Moonbase module configs
    └── wichitaFacts.json       # Educational content for tooltips/win screen
```

### Key Types (TypeScript)

```typescript
interface GameState {
  innovationCapital: number;
  aviationParts: number;
  techComponents: number;
  clickPower: number;
  passiveIncomeRate: number;
  unlockedUpgrades: string[];
  moduleProgress: {
    habitat: number;
    power: number;
    research: number;
    manufacturing: number;
    communications: number;
  };
  gameStartTime: number;
  totalClicks: number;
  isWon: boolean;
}

interface Upgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  effect: {
    type: 'clickPower' | 'passiveIncome' | 'moduleBoost';
    value: number;
  };
  wichitaFact?: string; // Educational tooltip
  iconUrl: string;
  isUnlocked: boolean;
}

interface MoonbaseModule {
  id: string;
  name: string;
  requiredIC: number;
  progress: number; // 0-100
  isComplete: boolean;
}
```

### Core Game Logic

**Clicker Mechanic**:
```typescript
const handleClick = (resourceType: 'aviation' | 'tech' | 'general') => {
  const icGenerated = baseClickPower * clickMultiplier;
  setInnovationCapital(ic => ic + icGenerated);
  setTotalClicks(clicks => clicks + 1);
  // Trigger click animation
};
```

**Passive Income** (runs every second):
```typescript
useEffect(() => {
  const interval = setInterval(() => {
    setInnovationCapital(ic => ic + passiveIncomeRate);
  }, 1000);
  return () => clearInterval(interval);
}, [passiveIncomeRate]);
```

**Upgrade Purchase**:
```typescript
const purchaseUpgrade = (upgradeId: string) => {
  const upgrade = upgrades.find(u => u.id === upgradeId);
  if (innovationCapital >= upgrade.cost) {
    setInnovationCapital(ic => ic - upgrade.cost);
    applyUpgradeEffect(upgrade.effect);
    setUnlockedUpgrades([...unlockedUpgrades, upgradeId]);
  }
};
```

**Module Construction**:
```typescript
const buildModule = (moduleId: string, icAmount: number) => {
  const module = modules[moduleId];
  const progressIncrement = (icAmount / module.requiredIC) * 100;
  setModuleProgress({
    ...moduleProgress,
    [moduleId]: Math.min(moduleProgress[moduleId] + progressIncrement, 100)
  });

  if (moduleProgress[moduleId] >= 100) {
    checkWinCondition();
  }
};
```

**Win Condition Check**:
```typescript
const checkWinCondition = () => {
  const allModulesComplete = Object.values(moduleProgress).every(p => p >= 100);
  if (allModulesComplete) {
    setIsWon(true);
    // Show win screen
  }
};
```

### Performance Considerations

- **Lightweight State**: Keep game state minimal to avoid re-render thrashing
- **Debounced Animations**: Click animations should not block rendering
- **Efficient Updates**: Use React.memo for static components
- **Mobile Optimization**: Touch targets minimum 44x44px for mobile play

### Accessibility (WCAG 2.1 AA)

- **Keyboard Support**: While mouse-focused, support spacebar for clicking primary resource
- **Color Contrast**: Ensure IC counters and progress bars meet 4.5:1 ratio
- **Screen Reader**: Provide aria-labels for clickable areas and progress bars
- **Reduced Motion**: Respect prefers-reduced-motion for animations
- **Text Size**: All text minimum 16px, scalable with zoom

---

## Deliverables Checklist

### 1. Publicly Accessible Demo Site

**Requirement**: Deployed game accessible via URL for review

**Implementation**:
- Deploy to AWS alongside main ReSkill KS application
- Accessible at: `[domain]/game` or `[domain]/#/game`
- No authentication required (publicly playable)
- Works on desktop (Chrome, Firefox, Safari) and mobile (iOS Safari, Chrome Android)

**Acceptance Criteria**:
- [ ] Game loads in under 3 seconds on standard broadband
- [ ] Playable from start to win screen without errors
- [ ] Mobile-responsive (playable on 375px+ width screens)
- [ ] Publicly accessible URL provided

---

### 2. Instructions on How to Play

**Requirement**: Clear player guidance before/during gameplay

**Implementation**:

**Option A: In-Game Tutorial** (RECOMMENDED for MVP)
- 4-step interactive tutorial on first load
- Tooltips appear on hover/tap for all clickable elements
- "How to Play" button in header reopens tutorial

**Option B: Separate Instructions Page** (if needed)
- `/game/instructions` route with static guide
- Link from game start screen

**Content Requirements**:
```markdown
# How to Play: Wichita to the Moon

**Objective**: Build all 5 moonbase modules by harnessing Wichita's aerospace innovation.

**Controls**: Mouse/Touch only

**Steps**:
1. Click on Wichita resource nodes (aircraft factories, tech campuses) to generate Innovation Capital (IC)
2. Spend IC to unlock upgrades that increase your click power and passive income
3. Invest IC into moonbase modules to construct your lunar outpost
4. Complete all 5 modules (Habitat, Power, Research, Manufacturing, Communications) to win!

**Tips**:
- Early game: Focus on clicking to build up IC
- Mid game: Unlock passive income upgrades to generate IC automatically
- Late game: Balance clicking, upgrades, and module construction to finish efficiently

**Time to Complete**: 10-15 minutes
```

**Acceptance Criteria**:
- [ ] Instructions accessible before starting game
- [ ] Tutorial guides first-time players through first purchase
- [ ] Tooltips explain each upgrade and module
- [ ] "How to Play" accessible from game UI

---

### 3. Technical Walkthrough of Implementation

**Requirement**: Document technical approach for demo/review

**Implementation**: Create `/docs/game-technical-walkthrough.md` in repository

**Required Sections**:
1. **Architecture Overview** - Component hierarchy, state management approach
2. **Core Systems** - Clicker mechanic, upgrade system, module construction, win condition
3. **Wichita Integration** - How aerospace/innovation themes are represented
4. **Moonbase Visualization** - Implementation of progress tracking and visual feedback
5. **Data Flow** - How user clicks → IC generation → upgrades → module construction → win
6. **Technology Choices** - Why React/TypeScript, state management rationale
7. **Key Code Snippets** - Examples of core game logic (click handler, passive income, upgrade purchase)
8. **Performance** - Optimization strategies for smooth 60fps gameplay
9. **Future Enhancements** - AI agent NPC system (v2), additional features

**Acceptance Criteria**:
- [ ] Technical walkthrough document exists at `/docs/game-technical-walkthrough.md`
- [ ] Covers architecture, core systems, and implementation decisions
- [ ] Includes code examples of key mechanics
- [ ] Explains Wichita and moonbase integration approach

---

## Challenge Opportunity: AI Agent NPC (Future v2)

**Requirement**: "Create a CPU or NPC that uses agents to interact with the player and add another dynamic level AI Prompt to the game."

**Status**: OUT OF SCOPE for MVP, planned for v2

**Concept for Future Implementation**:

**Agent Persona**: "Commander Ada" - AI moonbase coordinator who:
- Provides dynamic hints based on player progress ("You're close to unlocking Spirit AeroSystems!")
- Shares Wichita aerospace facts contextually ("Did you know Wichita builds more aircraft than...")
- Encourages player during slow progress ("Keep clicking! Innovation takes persistence.")
- Celebrates milestones ("Habitat module complete! You're 20% to a full moonbase!")

**Implementation Approach** (when ready):
- Integrate with existing agent architecture from `/reskill/features/agents/`
- Use Anthropic Claude API for dynamic, contextual responses
- Trigger agent messages based on game events (module completion, upgrade purchase, idle time)
- Personality: Enthusiastic, knowledgeable about Wichita, mission-focused

**Why v2**: Adds complexity that could delay MVP; core gameplay should prove engaging first.

---

## Success Criteria & Testing

### MVP Launch Checklist

**Functional**:
- [ ] Game playable from start to win screen
- [ ] All 5 moonbase modules constructible
- [ ] Upgrade system functional (12+ upgrades available)
- [ ] Clicker mechanic responsive (no lag on rapid clicks)
- [ ] Passive income generates correctly
- [ ] Win screen displays with accurate stats

**Content**:
- [ ] All Wichita aerospace companies/landmarks represented
- [ ] Educational tooltips present on upgrades
- [ ] Win screen includes "Did You Know?" facts
- [ ] Moonbase modules visually distinct

**Technical**:
- [ ] No console errors during normal gameplay
- [ ] Runs smoothly on Chrome, Firefox, Safari (desktop + mobile)
- [ ] Loads in under 3 seconds
- [ ] Responsive on 375px+ width screens

**Deliverables**:
- [ ] Publicly accessible demo URL
- [ ] Instructions available in-game or at `/game/instructions`
- [ ] Technical walkthrough at `/docs/game-technical-walkthrough.md`

### User Testing Scenarios

**Test 1: First-Time Player**
- User has never seen the game
- Should complete tutorial and reach first module construction within 5 minutes
- Should understand core loop without external help

**Test 2: Mobile Player**
- User plays on iPhone/Android
- Touch targets should be easily tappable
- Progress should save if player navigates away (optional for MVP)

**Test 3: Completion Speedrun**
- Experienced player aims for fastest win time
- Should be possible to complete in 8-12 minutes with optimal strategy

**Test 4: Accessibility Check**
- User with screen reader navigates game
- User with colorblindness can distinguish resources
- User with keyboard-only can interact (partial support acceptable)

---

## Timeline & Priorities

### MVP Development Phases

**Phase 1: Core Mechanics** (Week 1)
- Set up `/game` route and file structure
- Implement clicker mechanic with IC generation
- Build basic upgrade system
- Create simple moonbase module progress tracking

**Phase 2: Wichita Content** (Week 2)
- Define all 12 upgrades with Wichita aerospace companies/landmarks
- Add tooltips with educational content
- Create Wichita-themed visual assets (icons, backgrounds)
- Implement win screen with "Did You Know?" facts

**Phase 3: Polish & UX** (Week 3)
- Add tutorial system
- Implement animations (click feedback, progress bars, module construction)
- Mobile responsiveness
- Sound effects (optional: click sounds, ambient music)

**Phase 4: Deliverables & Deploy** (Week 4)
- Write technical walkthrough
- Deploy to public demo site
- QA testing on multiple devices/browsers
- Final polish based on feedback

---

## Open Questions & Decisions Needed

### Design Decisions

1. **Visual Style**: Realistic aerospace imagery vs. stylized/illustrated?
   - **Recommendation**: Stylized with Wichita skyline silhouette, clean icons for upgrades

2. **Sound Effects**: Include click sounds and background music?
   - **Recommendation**: Optional toggle, off by default (accessibility)

3. **Save System**: LocalStorage persistence so players can return?
   - **Recommendation**: Nice-to-have for MVP, not critical (game is 10-15 min)

4. **Leaderboard**: Track fastest completion times?
   - **Recommendation**: v2 feature, skip for MVP

### Content Decisions

5. **Upgrade Count**: 12 upgrades enough for progression pacing?
   - **Recommendation**: Start with 12, can add more if playtesting shows need

6. **Module Costs**: Balance required IC for each module?
   - **Recommendation**: Test during development, aim for 2-3 min per module

7. **Wichita Facts**: How many facts to include?
   - **Recommendation**: 8-10 facts for tooltips, 3-5 for win screen rotation

---

## Appendix: Sample Upgrades & Modules

### Sample Upgrades (12 Total)

| Upgrade Name | Cost (IC) | Effect | Wichita Fact |
|--------------|-----------|--------|--------------|
| Keeper of the Plains | 100 | +10 IC/click | "44-foot steel sculpture overlooking Arkansas River confluence" |
| Spirit AeroSystems | 500 | +50 IC/click | "World's largest first-tier aerostructures manufacturer" |
| Textron Aviation | 750 | +100 IC/sec passive | "Home of Cessna and Beechcraft, leaders in general aviation" |
| WSU Innovation Campus | 1,200 | +150 IC/sec passive | "University-industry partnership hub for aerospace research" |
| McConnell AFB | 2,000 | +200 IC/click | "Air refueling wing supporting global military operations" |
| Stearman Field | 3,500 | +500 IC/sec passive | "Historic site where thousands learned to fly in WWII" |
| NetApp | 5,000 | +300 IC/click (tech boost) | "Global data infrastructure company with major Wichita presence" |
| Koch Industries | 7,500 | +1,000 IC/sec passive | "One of world's largest privately held companies, HQ in Wichita" |
| Aviation Manufacturing District | 10,000 | 2x click power | "Cluster of aerospace suppliers and OEMs in Wichita metro" |
| Wichita Workforce | 15,000 | 2x passive income | "Skilled labor pool of 30,000+ aerospace workers" |
| Air Capital Legacy | 25,000 | 3x all income | "100+ years of aviation innovation and leadership" |
| Moonshot Mentality | 50,000 | Unlock final module boost | "Wichita's culture of bold innovation and can-do spirit" |

### Moonbase Modules (5 Total)

| Module | Required IC | Purpose | Construction Time (est.) |
|--------|-------------|---------|--------------------------|
| Habitat Module | 5,000 IC | Living quarters for crew | 2 minutes |
| Power Module | 8,000 IC | Solar arrays and energy systems | 2.5 minutes |
| Research Lab | 12,000 IC | Scientific experiments and analysis | 3 minutes |
| Manufacturing Bay | 18,000 IC | Process lunar resources | 3.5 minutes |
| Communications Hub | 25,000 IC | Maintain Earth-Moon link | 4 minutes |

**Total IC for Full Moonbase**: 68,000 IC
**Estimated Playtime**: 10-15 minutes (depends on upgrade strategy)

---

## Conclusion

This MVP PRD defines a simple, engaging, mouse-only resource management game that:

✅ **Includes Wichita**: Aviation/aerospace history and innovation themes throughout
✅ **Includes Moonbase**: 5 modules players construct to win
✅ **Interactive with Beginning & End**: Clear tutorial, progression, and win state
✅ **Meets Deliverables**: Public demo, play instructions, technical walkthrough
🔮 **Sets up AI NPC**: Architecture ready for v2 agent integration

The game is designed to be completable in 10-15 minutes, accessible to adults, educational about Wichita's aerospace legacy, and technically straightforward to implement with React/TypeScript.

**Next Steps**: Approve PRD → Begin Phase 1 development → Iterate based on playtesting
