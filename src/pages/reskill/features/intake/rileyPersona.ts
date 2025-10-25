// Riley persona script data for conversational intake
// Streamlined for quick demo - showcases 2 personas with minimal questions

export type PersonaType = 'skills-training' | 'career-development';

export interface RileyMessage {
  id: string;
  personaType: PersonaType;
  variations: string[]; // Multiple variations to feel less robotic
  delayMs: number; // Typing indicator duration
}

export interface QuestionConfig {
  field: string; // Which IntakeData field this maps to
  inputType: 'text' | 'email' | 'select' | 'number' | 'textarea' | 'tags' | 'radio' | 'checkbox-group';
  question: RileyMessage;
  acknowledgment: RileyMessage;
  options?: { value: string; label: string }[]; // For select/radio
  placeholder?: string;
  validation?: {
    required?: boolean;
    pattern?: RegExp;
    min?: number;
    max?: number;
  };
}

// Welcome message
export const RILEY_WELCOME: RileyMessage = {
  id: 'welcome',
  personaType: 'career-development',
  variations: [
    "Hi! I'm Riley, your career development assistant for ReSkill KS! 👋",
    "Welcome! I'm Riley, here to help you discover your career path! 👋",
    "Hey there! I'm Riley, ready to guide your career journey! 👋",
  ],
  delayMs: 800,
};

// Intro message
export const RILEY_INTRO: RileyMessage = {
  id: 'intro',
  personaType: 'career-development',
  variations: [
    "I'll ask you just 5 quick questions - takes about 2 minutes. Then I'll create two personalized plans: one for career development and one for training resources!",
    "Let me ask 5 quick questions to understand your goals. You'll get personalized career guidance AND training resources tailored just for you!",
    "Ready for 5 quick questions? After this, I'll generate your career roadmap AND connect you with local training opportunities!",
  ],
  delayMs: 1200,
};

// Streamlined questions showcasing both personas
const INTAKE_QUESTIONS: QuestionConfig[] = [
  // Question 1: Full Name (career-development persona)
  {
    field: 'firstName',
    inputType: 'text',
    question: {
      id: 'q-fullName',
      personaType: 'career-development',
      variations: [
        "Let's start! What's your full name?",
        "First - what's your name?",
        "What should I call you?",
      ],
      delayMs: 700,
    },
    acknowledgment: {
      id: 'ack-fullName',
      personaType: 'career-development',
      variations: [
        "Nice to meet you! Let's map out your future.",
        "Great! I'm excited to help you succeed.",
        "Perfect! Let's build your plan.",
      ],
      delayMs: 500,
    },
    placeholder: "e.g., John Smith",
    validation: { required: true },
  },

  // Question 2: ZIP Code (skills-training persona)
  {
    field: 'zipCode',
    inputType: 'text',
    question: {
      id: 'q-zipCode',
      personaType: 'skills-training',
      variations: [
        "What's your ZIP code? I'll find training programs near you.",
        "ZIP code? This helps me connect you with local resources.",
        "Where are you located? Just your ZIP code.",
      ],
      delayMs: 700,
    },
    acknowledgment: {
      id: 'ack-zipCode',
      personaType: 'skills-training',
      variations: [
        "Perfect! Great opportunities in your area.",
        "Excellent! I know some programs near you.",
        "Got it! Local resources coming up.",
      ],
      delayMs: 500,
    },
    placeholder: "67202",
    validation: { required: true },
  },

  // Question 3: Current Job (career-development persona)
  {
    field: 'currentOccupation',
    inputType: 'text',
    question: {
      id: 'q-currentJob',
      personaType: 'career-development',
      variations: [
        "What's your current job or occupation?",
        "What do you do now?",
        "Tell me about your current role.",
      ],
      delayMs: 700,
    },
    acknowledgment: {
      id: 'ack-currentJob',
      personaType: 'career-development',
      variations: [
        "Got it! That experience is valuable.",
        "Great background - let's build on it.",
        "Perfect! Now let's look ahead.",
      ],
      delayMs: 500,
    },
    placeholder: "e.g., Retail Manager, Teacher",
    validation: { required: true },
  },

  // Question 4: Desired Career (career-development persona)
  {
    field: 'desiredOccupation',
    inputType: 'text',
    question: {
      id: 'q-desiredCareer',
      personaType: 'career-development',
      variations: [
        "What career are you aiming for?",
        "Where do you want to be? What's your dream job?",
        "What field do you want to move into?",
      ],
      delayMs: 800,
    },
    acknowledgment: {
      id: 'ack-desiredCareer',
      personaType: 'career-development',
      variations: [
        "Awesome goal! Let's make it happen.",
        "Great choice! I'll show you the path.",
        "Excellent! We'll get you there.",
      ],
      delayMs: 500,
    },
    placeholder: "e.g., Software Developer, Nurse",
    validation: { required: true },
  },

  // Question 5: Time Availability (skills-training persona)
  {
    field: 'timeAvailability',
    inputType: 'select',
    question: {
      id: 'q-timeAvailability',
      personaType: 'skills-training',
      variations: [
        "How much time can you dedicate to training each week?",
        "What's your weekly availability for learning?",
        "Time you can commit to training weekly?",
      ],
      delayMs: 800,
    },
    acknowledgment: {
      id: 'ack-timeAvailability',
      personaType: 'skills-training',
      variations: [
        "Perfect! I'll match programs to your schedule.",
        "Got it! I'll find flexible options for you.",
        "Great! Plenty of programs fit that timeline.",
      ],
      delayMs: 500,
    },
    options: [
      { value: 'less-than-5', label: 'Less than 5 hours/week' },
      { value: '5-10', label: '5-10 hours/week' },
      { value: '10-20', label: '10-20 hours/week' },
      { value: 'full-time', label: 'Full-time (40+ hours/week)' },
    ],
    validation: { required: true },
  },
];

// Single step with all questions
export const INTAKE_STEPS = [
  {
    title: 'Quick Assessment',
    questions: INTAKE_QUESTIONS,
  },
];

// Helper function to get random variation
export function getRandomVariation(variations: string[], context: Record<string, string> = {}): string {
  const randomIndex = Math.floor(Math.random() * variations.length);
  let message = variations[randomIndex];

  // Replace context variables like {firstName}
  Object.keys(context).forEach((key) => {
    message = message.replace(new RegExp(`\\{${key}\\}`, 'g'), context[key]);
  });

  return message;
}
