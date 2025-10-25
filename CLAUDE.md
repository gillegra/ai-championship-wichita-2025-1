# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Context

This is a workforce development application for the Kansas Department of Labor designed to help citizens upskill and change careers. The system features an interactive intake portal, AI-driven personalized career transition plans, progress tracking, and multiple agent personas to guide users through their learning journey.

**Mission-Critical Constraint**: This application serves public-sector users who may have varying levels of digital literacy. Accessibility, simplicity, and clear guidance are paramount.

## Quick Reference

### Documentation
*Documentation will be added as architectural patterns are established*

### Active Work
*Active specifications will be tracked here during development*

## Critical Rules (MUST FOLLOW)

### File Creation (MANDATORY)
- NEVER create files for reporting/status unless they track ONGOING work with action items
- NEVER create audit reports, status summaries, or "findings" documents - report verbally instead
- NEVER create files at project root (except CLAUDE.md) - use docs/ or specs/
- ALWAYS ask: "Will this need to be deleted when done?"
  - YES → specs/ (transitional work tracking)
  - NO → docs/ (only if permanent architectural value)
  - Neither → DON'T CREATE, communicate verbally
- WHY: Every file is maintenance burden. Minimize files, maximize verbal communication.

### AI Agent Integration
- ALWAYS design agent personas with distinct purposes (intake assistant, career counselor, progress coach, etc.)
- NEVER create generic "chatbot" interfaces - each agent must have specific domain expertise
- READ docs/agent_architecture.md (when created) BEFORE implementing new agent personas
- WHY: Agent personas are core differentiator and must provide genuine value beyond basic Q&A

### User Data Handling
- ALWAYS treat intake data as sensitive - users may disclose personal employment history, financial constraints, disabilities
- NEVER store raw user inputs without sanitization and validation
- ALWAYS implement privacy controls - users must be able to view, edit, and delete their data
- WHY: Public sector application must meet higher privacy and accessibility standards

### Plan Generation
- NEVER generate generic career plans - plans must be personalized based on intake data
- ALWAYS include concrete next steps with estimated timeframes
- ALWAYS consider Kansas-specific resources, programs, and labor market data
- WHY: Generic plans reduce user trust; localized, actionable plans drive engagement

### Progress Tracking
- ALWAYS persist progress state - users may access system intermittently over weeks/months
- NEVER require users to "start over" if they abandon and return to application
- ALWAYS provide clear visual indicators of completion percentage
- WHY: Career transitions take time; system must support long-term engagement

## Development Workflows

### Project Setup (First Time)
1. Install dependencies: `npm install` (or equivalent for chosen stack)
2. Set up environment variables (copy `.env.example` to `.env`)
3. Initialize database/storage (command TBD based on tech stack)
4. Run development server (command TBD)
5. Verify all three core modules load: intake portal, plan generation, progress dashboard

### Running the Application
- **Development server**: TBD based on framework choice
- **Build for production**: TBD
- **Run tests**: TBD
- **Lint code**: TBD

### Deploying Demo Site
- **Target**: Publicly accessible URL for demo/review
- **Process**: TBD based on hosting choice (Vercel/Netlify/AWS/etc.)
- **Environment**: Ensure demo uses test data, not real user information

### Testing Agent Personas
1. Create test intake scenarios representing diverse user profiles
2. Verify each agent responds appropriately to its domain
3. Test handoff between agents (e.g., intake assistant → career counselor)
4. Validate agent responses include actionable guidance, not just information

## Key Patterns You Must Follow

### Intake Portal Design
**How**: Multi-step form with progress indication, conversational UI optional but not required
**When**: First user interaction with system
**Why**: Gathering quality data drives personalization; overwhelming users with long forms reduces completion
**Fields to Consider**: Current occupation, desired field, skills inventory, education level, geographic constraints, time availability, financial constraints

### Dynamic Plan Generation
**How**: Generate plans based on intake data using AI/rules engine hybrid approach
**When**: Immediately after intake completion OR allow users to regenerate with updated inputs
**Why**: Instant feedback increases engagement; allowing regeneration supports exploration
**Components**: Skill gap analysis, recommended training programs, timeline estimates, resource links, milestones

### Progress Dashboard
**How**: Visual timeline or checklist showing completed/in-progress/upcoming steps
**When**: Primary interface for returning users
**Why**: Clear progress indication motivates continued engagement
**Features**: Mark steps complete, add notes, skip non-applicable items, track time spent

### Agent Persona Architecture
**How**: Define distinct agents with specific roles (examples: Intake Assistant, Career Counselor, Skills Assessor, Motivation Coach, Resource Navigator)
**When**: Agents activate based on user context and journey stage
**Why**: Specialized agents provide focused expertise; personality differentiation improves user experience
**Implementation**: Each agent has defined knowledge domain, response style, and trigger conditions

## What You Need to Know

### Core Requirements
This application MUST deliver:
1. **Intake Portal**: Interactive, engaging information gathering about individual's career goals and constraints
2. **Plan Generation**: AI-driven personalized career transition plans based on intake data
3. **Progress Dashboard**: User interface for interacting with plan and tracking completion
4. **Agent Personas**: Multiple AI agents with distinct purposes assisting throughout journey
5. **Public Demo**: Deployed site accessible for review and demonstration

### Technology Stack Considerations
- **Frontend**: Must support rich interactivity for intake and dashboard (React/Vue/Svelte candidates)
- **Backend**: Must handle AI agent orchestration and plan generation
- **Database**: Must persist user profiles, plans, and progress over extended timeframes
- **AI Integration**: Must support multiple agent personas with distinct behaviors
- **Hosting**: Must support public demo deployment

### Kansas Context
- Labor market trends in Kansas (growing sectors: healthcare, advanced manufacturing, technology)
- State resources: Kansas Department of Commerce, local community colleges, apprenticeship programs
- Geographic considerations: Urban (Wichita, Kansas City, Topeka) vs rural access to training
- Target populations: Displaced workers, underemployed individuals, career changers

### User Journey
1. **Discovery**: User arrives seeking career change guidance
2. **Intake**: Interactive portal gathers background, goals, constraints (Intake Assistant agent)
3. **Plan Generation**: System creates personalized transition plan (Career Counselor agent)
4. **Review**: User reviews plan, asks questions, requests modifications (Career Counselor agent)
5. **Execution**: User begins working through plan steps (Progress Coach agent)
6. **Tracking**: User logs progress, accesses resources, updates status (Progress Coach, Resource Navigator agents)
7. **Support**: User seeks motivation, problem-solving, adjustments (Motivation Coach agent)
8. **Completion**: User achieves career transition goals

### Accessibility Requirements
- WCAG 2.1 AA compliance minimum (public sector application)
- Mobile-responsive design (users may access on phones)
- Clear, jargon-free language (diverse education levels)
- Support for users with limited digital literacy

## Before Completing Major Work

### Update Documentation (MANDATORY)
- [ ] Changed architecture/behavior? → Update docs/
- [ ] Used specs/ for planning? → Delete when done, extract to docs/ if permanent value
- [ ] Created/deleted docs or specs? → Update Quick Reference section
- [ ] Introduced new patterns? → Document in this file
- [ ] Added new agent persona? → Document in docs/agent_architecture.md

### File Hygiene Check (MANDATORY)
- [ ] Created any new files? → Verify correct location (docs/ permanent, specs/ transitional)
- [ ] Any specs/ files with no remaining work? → DELETE them now
- [ ] Created any status/report/audit files? → DELETE (should have reported verbally)
- [ ] Root directory clean? → No stray .md files except CLAUDE.md
- [ ] Did you create a file documenting completed work with no actions? → DELETE and don't do this again

### Validation Checklist
- [ ] All three core features functional: intake, plan generation, progress tracking
- [ ] Agent personas demonstrably distinct in purpose and behavior
- [ ] Demo site publicly accessible
- [ ] User data properly validated and sanitized
- [ ] Application usable on mobile devices
- [ ] Clear user guidance throughout journey
- [ ] No broken links to Kansas resources
- [ ] Privacy controls functional (view/edit/delete data)

## Technical Walkthrough Preparation

When preparing for technical walkthrough:
1. **Architecture Overview**: Diagram showing intake → plan generation → progress tracking flow
2. **Agent Implementation**: Demonstrate how agent personas are triggered and differentiated
3. **Data Flow**: Show how user inputs transform into personalized plans
4. **Key Technical Decisions**: Explain framework choices, AI integration approach, state management
5. **Demo Scenarios**: Prepare 2-3 user personas with distinct needs to showcase personalization

## Commands Reference

*This section will be populated once technology stack is selected and project is initialized.*

### Development
- Start dev server: TBD
- Run tests: TBD
- Lint/format: TBD
- Type check: TBD

### Database
- Run migrations: TBD
- Seed test data: TBD
- Reset database: TBD

### Deployment
- Build production: TBD
- Deploy to demo: TBD
- View logs: TBD
