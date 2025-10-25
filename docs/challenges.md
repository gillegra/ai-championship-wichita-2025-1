# ReSkill KS - Challenge Structure

This document tracks the four challenges that make up the ReSkill KS application. Each challenge has its own sub-route and distinct functionality.

## Overview

ReSkill KS is organized into 4 separate challenges, each accessible via unique routes. This structure allows for modular development and distinct user experiences.

## Challenge 1: "Reskill" (PRIMARY)

**Route**: `/reskill`

**Status**: ✅ COMPLETE (Core MVP implemented)

**Purpose**: Workforce development platform helping Kansas citizens transition careers

**Features**:
- Interactive intake portal (5-step form)
- AI-driven personalized career transition plans
- Progress tracking dashboard with milestones
- 6 AI agent personas (Riley, Taylor, Alex, Jordan, Sam, Casey)

**Key Components**:
- `src/features/intake/` - Multi-step intake form
- `src/features/plan/` - Career plan display
- `src/features/progress/` - Progress tracking
- `src/features/agents/` - AI agent chat

**Current Routes**:
- `/` - Intake portal
- `/plan` - View generated career plan
- `/progress` - Track milestone progress
- `/agents` - Chat with AI assistants

---

## Challenge 2: "Game" (PLACEHOLDER)

**Route**: `/game`

**Status**: 🚧 NOT STARTED

**Purpose**: TBD

**Features**: TBD

**Notes**:
- Placeholder name only
- Details to be determined
- Route reserved for second challenge

---

## Challenge 3: TBD

**Route**: TBD

**Status**: 🚧 NOT STARTED

**Purpose**: TBD

**Features**: TBD

---

## Challenge 4: TBD

**Route**: TBD

**Status**: 🚧 NOT STARTED

**Purpose**: TBD

**Features**: TBD

---

## Implementation Notes

### Routing Strategy

The application will use nested routing structure:

```
/reskill/*        - Challenge 1 routes
  /reskill/       - Intake portal
  /reskill/plan   - Career plan
  /reskill/progress - Progress tracking
  /reskill/agents - AI agents

/game/*           - Challenge 2 routes (TBD)

/challenge3/*     - Challenge 3 routes (TBD)

/challenge4/*     - Challenge 4 routes (TBD)
```

### Development Guidelines

1. **Isolation**: Each challenge should be self-contained in its own feature directory
2. **Shared Resources**: Common UI components, types, and utilities go in `/src/shared/`
3. **Routing**: All challenge routes defined in main App.tsx router
4. **Navigation**: Global header should provide navigation between challenges

### When Adding New Challenges

1. Update this document with challenge details
2. Create feature directory: `src/features/[challenge-name]/`
3. Add routes in App.tsx
4. Update CLAUDE.md Project Context if needed
5. Update main navigation in Header component

---

## Team Coordination

**IMPORTANT**: Team members are currently working on updates. Always pull latest changes before making route or navigation modifications.

**Last Updated**: 2025-10-25
