# Kansas Career Pathways

A workforce development application for the Kansas Department of Labor, designed to help citizens upskill and change careers through personalized career transition plans and AI-guided support.

## Features

- **Interactive Intake Portal**: Multi-step form to gather user information in an engaging way
- **Dynamic Plan Generation**: AI-driven personalized career transition plans based on intake data
- **Progress Tracking Dashboard**: Track milestones, complete tasks, and monitor journey progress
- **AI Agent Personas**: Multiple specialized AI assistants to guide users throughout their journey
  - Riley (Intake Assistant)
  - Taylor (Career Counselor)
  - Alex (Skills Assessor)
  - Jordan (Progress Coach)
  - Sam (Motivation Coach)
  - Casey (Resource Navigator)

## Tech Stack

- **Runtime**: Bun
- **Frontend**: React 18 + TypeScript
- **Routing**: React Router v6
- **Bundler**: Vite
- **Styling**: CSS Modules
- **Deployment**: AWS (planned)

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) runtime installed

### Installation

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview
```

### Development Commands

```bash
# Type checking
bun run type-check

# Linting (if configured)
bun run lint

# Testing (if configured)
bun test
```

## Project Structure

```
src/
├── features/           # Feature-based organization
│   ├── intake/        # Intake portal components
│   ├── plan/          # Plan generation and display
│   ├── progress/      # Progress tracking dashboard
│   └── agents/        # AI agent personas
├── shared/            # Shared components and utilities
│   └── components/    # Reusable UI components
├── types/             # TypeScript type definitions
└── App.tsx            # Main application with routing
```

## Architecture

This application follows a **feature-based architecture** where code is organized by feature/domain rather than by technical type. Each feature contains its own components, styles, and logic.

### Key Patterns

- **TypeScript Strict Mode**: All code uses strict TypeScript with explicit types
- **Component Structure**: Feature-based organization for scalability
- **State Management**: React hooks and local state (can be extended with Context/Zustand)
- **Routing**: React Router for navigation between features

## Development Workflow

1. **Intake Flow**: User completes multi-step intake form
2. **Plan Generation**: System generates personalized career plan (currently mocked, ready for AI integration)
3. **Progress Tracking**: User tracks milestone completion and task progress
4. **AI Assistance**: Users can chat with specialized AI agents for guidance

## Next Steps

- [ ] Integrate real AI/LLM API for plan generation (Anthropic Claude or AWS Bedrock)
- [ ] Integrate real AI/LLM API for agent chat functionality
- [ ] Add database persistence (AWS DynamoDB or RDS)
- [ ] Implement user authentication
- [ ] Deploy to AWS (Amplify, S3+CloudFront, or ECS)
- [ ] Add Kansas-specific labor market data integration
- [ ] Implement progress analytics and reporting

## Contributing

This project was built for the AI Championship Wichita 2025 - Architect Challenge.

## References

- [Project Vision & High-Level Overview](https://docs.google.com/document/d/10wFO0kH4dSxpM89E1HsRr-z-TxXcfdvX-Km2PV53A9U/edit?tab=t.0) - Team vision document and project goals

## License

TBD
