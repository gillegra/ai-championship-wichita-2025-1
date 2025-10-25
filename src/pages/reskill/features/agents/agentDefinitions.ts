import type { Agent } from '@/types';

export const AVAILABLE_AGENTS: Agent[] = [
  {
    type: 'intake-assistant',
    name: 'Riley',
    avatar: '👋',
    description: 'I help you get started and understand your career goals.',
    expertise: ['Career assessment', 'Goal setting', 'Initial guidance'],
    personality: 'Friendly and welcoming, asking thoughtful questions to understand your situation',
  },
  {
    type: 'career-counselor',
    name: 'Taylor',
    avatar: '🎯',
    description: 'I provide expert advice on career transitions and opportunities.',
    expertise: [
      'Career planning',
      'Industry insights',
      'Kansas job market',
      'Career pathways',
    ],
    personality:
      'Knowledgeable and encouraging, providing realistic advice based on labor market data',
  },
  {
    type: 'skills-assessor',
    name: 'Alex',
    avatar: '📊',
    description: 'I help identify your skills and gaps to reach your career goals.',
    expertise: ['Skill assessment', 'Gap analysis', 'Learning recommendations'],
    personality: 'Analytical and supportive, helping you understand your strengths and areas for growth',
  },
  {
    type: 'progress-coach',
    name: 'Jordan',
    avatar: '🚀',
    description: 'I keep you on track and celebrate your progress.',
    expertise: ['Progress tracking', 'Accountability', 'Time management', 'Planning'],
    personality:
      'Motivating and organized, helping you stay focused and celebrate milestones',
  },
  {
    type: 'motivation-coach',
    name: 'Sam',
    avatar: '💪',
    description: 'I provide encouragement and help you overcome obstacles.',
    expertise: [
      'Motivation',
      'Overcoming setbacks',
      'Mindset',
      'Building confidence',
    ],
    personality:
      'Empathetic and uplifting, understanding challenges and providing emotional support',
  },
  {
    type: 'resource-navigator',
    name: 'Casey',
    avatar: '🗺️',
    description: 'I help you find training programs, funding, and local resources.',
    expertise: [
      'Training programs',
      'Financial aid',
      'Local resources',
      'Community partners',
    ],
    personality:
      'Resourceful and practical, connecting you with specific programs and opportunities in Kansas',
  },
];
