# ReSkill KS - Challenge Structure

This document tracks the four challenges that make up the ReSkill KS application. Each challenge has its own sub-route and distinct functionality.

## Overview

ReSkill KS is organized into 4 separate challenges, each accessible via unique routes. This structure allows for modular development and distinct user experiences.

## Challenge 1: "Reskill" (PRIMARY)

**Route**: `/reskill/*`

**Status**: ✅ COMPLETE (Core MVP implemented)

**Purpose**: Workforce development platform helping Kansas citizens transition careers

**Features**:
- Interactive intake portal (5-step form)
- AI-driven personalized career transition plans
- Progress tracking dashboard with milestones
- 6 AI agent personas (Riley, Taylor, Alex, Jordan, Sam, Casey)

**Key Components**:
- `src/pages/reskill/features/intake/` - Multi-step intake form
- `src/pages/reskill/features/plan/` - Career plan display
- `src/pages/reskill/features/progress/` - Progress tracking
- `src/pages/reskill/features/agents/` - AI agent chat

**Current Routes**:
- `/reskill` - Intake portal (index)
- `/reskill/plan` - View generated career plan
- `/reskill/progress` - Track milestone progress
- `/reskill/agents` - Chat with AI assistants

---

## Challenge 2: "Wichita to the Moon" (COMPLETE)

**Route**: `/game`

**Status**: ✅ COMPLETE (MVP Implemented)

**Purpose**: Resource management clicker game celebrating Wichita's aerospace heritage

**Features**:
- Mouse-only clicker mechanic to generate Innovation Capital (IC)
- 12 Wichita-themed upgrades (Spirit AeroSystems, Textron Aviation, WSU Innovation Campus, etc.)
- 5 moonbase modules to construct (Habitat, Power, Research, Manufacturing, Communications)
- Passive income system with multipliers
- Tutorial overlay for first-time players
- Win screen with stats and educational Wichita facts
- 10-15 minute playtime to completion

**Key Components**:
- `src/pages/game/GameChallenge.tsx` - Main game entry point
- `src/pages/game/hooks/useGameState.ts` - Central game state management
- `src/pages/game/features/clicker/` - Click mechanic and IC generation
- `src/pages/game/features/moonbase/` - Module construction interface
- `src/pages/game/features/upgrades/` - Upgrade shop
- `src/pages/game/features/tutorial/` - First-time player guidance

**Technical Documentation**: See `/docs/game-technical-walkthrough.md` for detailed implementation guide

---

## Challenge 3: TBD

**Route**: `/c3`

**Status**: 🚧 NOT STARTED

**Purpose**: TBD

**Features**: TBD

**Notes**:
- Placeholder component created and wired to router
- Details to be determined when requirements arrive
- Route reserved for third challenge

---

## Challenge 4: TBD

**Route**: `/c4`

**Status**: 🚧 NOT STARTED

**Purpose**: TBD

**Features**: TBD

**Notes**:
- Placeholder component created and wired to router
- Details to be determined when requirements arrive
- Route reserved for fourth challenge

---

## Implementation Notes

### Routing Strategy

The application uses nested routing structure with each challenge at its own top-level route:

```
/                 - Root redirect to /reskill

/reskill/*        - Challenge 1: ReSkill KS
  /reskill/       - Intake portal (index)
  /reskill/plan   - Career plan view
  /reskill/progress - Progress tracking dashboard
  /reskill/agents - AI agents chat

/game             - Challenge 2: Game (TBD)

/c3               - Challenge 3: TBD

/c4               - Challenge 4: TBD
```

### Development Guidelines

1. **Directory Structure**: Each challenge lives in `src/pages/[challenge-name]/`
   - For example: `src/pages/reskill/`, `src/pages/game/`, `src/pages/c3/`, `src/pages/c4/`
2. **Feature Organization**: Within each challenge, organize features by domain
   - Example: `src/pages/reskill/features/intake/`, `src/pages/reskill/features/plan/`, etc.
3. **Shared Resources**: Common UI components, types, and utilities go in `/src/shared/`
4. **Types**: Each challenge can have its own types at `src/pages/[challenge-name]/types/`
5. **Routing**: All challenge routes defined in main `src/App.tsx` router
6. **Navigation**: Global header should provide navigation between challenges

### When Adding New Challenges

1. Create challenge directory: `src/pages/[challenge-name]/`
2. Create placeholder component at `src/pages/[challenge-name]/Challenge.tsx` (or appropriate name)
3. Add route in `src/App.tsx` router
4. Update this document with challenge details and route
5. Update CLAUDE.md Project Context if introducing new patterns
6. Update main navigation in Header component
7. Create feature subdirectories as features are developed: `src/pages/[challenge-name]/features/[feature]/`

---

## Team Coordination

**IMPORTANT**: Team members are currently working on updates. Always pull latest changes before making route or navigation modifications.

**Last Updated**: 2025-10-25 - Routes finalized, placeholder components created, ready for Challenge 3 and 4 implementation
