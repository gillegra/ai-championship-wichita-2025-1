// Riley persona script data for conversational intake
// Uses 2 personas to simulate AI personality without actual API calls

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
    "Hi there! I'm Riley, your career development assistant. I'm here to help you discover amazing opportunities in Kansas! 🎯",
    "Welcome! I'm Riley! I'm excited to help you explore new career paths and build a plan that fits your goals. Let's get started! ✨",
    "Hey! I'm Riley, and I'll be your guide on this career journey. Together, we'll create a personalized path that's right for you!",
  ],
  delayMs: 800,
};

export const RILEY_INTRO: RileyMessage = {
  id: 'intro',
  personaType: 'skills-training',
  variations: [
    "I'm going to ask you some questions to understand your background, goals, and what you're looking for. This should only take about 5-10 minutes. Sound good?",
    "I'll guide you through a few questions about your experience and career goals. It's quick - about 5-10 minutes - and helps us create the perfect plan for you!",
    "Let me walk you through a quick series of questions. We'll cover your background, goals, and what matters most to you. Ready to begin?",
  ],
  delayMs: 1200,
};

// Personal Information Questions (Step 1)
export const PERSONAL_INFO_QUESTIONS: QuestionConfig[] = [
  {
    field: 'firstName',
    inputType: 'text',
    question: {
      id: 'q-firstName',
      personaType: 'career-development',
      variations: [
        "Let's start with the basics. What's your first name?",
        "First things first - what should I call you? What's your first name?",
        "I'd love to know your name! What's your first name?",
      ],
      delayMs: 800,
    },
    acknowledgment: {
      id: 'ack-firstName',
      personaType: 'career-development',
      variations: [
        "Nice to meet you, {firstName}! 😊",
        "Great! Hi {firstName}!",
        "{firstName} - I love it! Thanks!",
      ],
      delayMs: 600,
    },
    validation: { required: true },
  },
  {
    field: 'lastName',
    inputType: 'text',
    question: {
      id: 'q-lastName',
      personaType: 'career-development',
      variations: [
        "And your last name?",
        "What's your last name, {firstName}?",
        "Thanks! And your last name?",
      ],
      delayMs: 600,
    },
    acknowledgment: {
      id: 'ack-lastName',
      personaType: 'career-development',
      variations: [
        "Perfect, {firstName} {lastName}!",
        "Got it, thanks!",
        "Excellent!",
      ],
      delayMs: 500,
    },
    validation: { required: true },
  },
  {
    field: 'email',
    inputType: 'email',
    question: {
      id: 'q-email',
      personaType: 'skills-training',
      variations: [
        "What's the best email address to reach you?",
        "I'll need your email so we can save your progress. What's your email address?",
        "Let me get your email address - we'll use this to save your plan.",
      ],
      delayMs: 800,
    },
    acknowledgment: {
      id: 'ack-email',
      personaType: 'skills-training',
      variations: [
        "Great! I'll send your career plan there.",
        "Perfect! Got it saved.",
        "Excellent - that's all set!",
      ],
      delayMs: 600,
    },
    placeholder: "your.email@example.com",
    validation: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  },
  {
    field: 'zipCode',
    inputType: 'text',
    question: {
      id: 'q-zipCode',
      personaType: 'skills-training',
      variations: [
        "What's your ZIP code? This helps us find training opportunities near you.",
        "To connect you with local resources, what's your ZIP code?",
        "Where are you located? Just need your ZIP code to find nearby programs.",
      ],
      delayMs: 900,
    },
    acknowledgment: {
      id: 'ack-zipCode',
      personaType: 'skills-training',
      variations: [
        "Perfect! There are some great opportunities in your area.",
        "Excellent! We'll find local resources for you.",
        "Great! I know some amazing programs near you.",
      ],
      delayMs: 700,
    },
    placeholder: "67202",
    validation: { required: true, pattern: /^\d{5}$/ },
  },
];

// Current Situation Questions (Step 2)
export const CURRENT_SITUATION_QUESTIONS: QuestionConfig[] = [
  {
    field: 'currentOccupation',
    inputType: 'text',
    question: {
      id: 'q-currentOccupation',
      personaType: 'skills-training',
      variations: [
        "Now let's talk about where you are today. What's your current job title?",
        "Tell me about your current role - what's your job title?",
        "What do you do now? What's your current position?",
      ],
      delayMs: 1000,
    },
    acknowledgment: {
      id: 'ack-currentOccupation',
      personaType: 'skills-training',
      variations: [
        "I see - thanks for sharing that.",
        "Got it. That experience will be valuable!",
        "Understood - that's great background.",
      ],
      delayMs: 600,
    },
    placeholder: "e.g., Retail Manager, Administrative Assistant",
    validation: { required: true },
  },
  {
    field: 'currentIndustry',
    inputType: 'text',
    question: {
      id: 'q-currentIndustry',
      personaType: 'skills-training',
      variations: [
        "And what industry are you in?",
        "What industry is that in?",
        "Which industry would you say you're working in?",
      ],
      delayMs: 700,
    },
    acknowledgment: {
      id: 'ack-currentIndustry',
      personaType: 'skills-training',
      variations: [
        "Thanks! That helps me understand your background.",
        "Perfect - got it.",
        "Great, thanks!",
      ],
      delayMs: 500,
    },
    placeholder: "e.g., Retail, Healthcare, Manufacturing",
    validation: { required: true },
  },
  {
    field: 'yearsOfExperience',
    inputType: 'number',
    question: {
      id: 'q-yearsOfExperience',
      personaType: 'skills-training',
      variations: [
        "How many years of work experience do you have total?",
        "About how many years have you been working?",
        "What's your total years of work experience?",
      ],
      delayMs: 800,
    },
    acknowledgment: {
      id: 'ack-yearsOfExperience',
      personaType: 'skills-training',
      variations: [
        "That's valuable experience you can build on!",
        "Great! You bring a lot to the table.",
        "Excellent - that experience will help you!",
      ],
      delayMs: 600,
    },
    validation: { required: true, min: 0, max: 50 },
  },
  {
    field: 'educationLevel',
    inputType: 'select',
    question: {
      id: 'q-educationLevel',
      personaType: 'skills-training',
      variations: [
        "What's the highest level of education you've completed?",
        "Tell me about your education - what's the highest level you've completed?",
        "What's your educational background? Highest level completed?",
      ],
      delayMs: 900,
    },
    acknowledgment: {
      id: 'ack-educationLevel',
      personaType: 'skills-training',
      variations: [
        "Wonderful! Education is just one part of your story.",
        "Perfect - every path is unique!",
        "Great, thanks for sharing!",
      ],
      delayMs: 600,
    },
    options: [
      { value: 'no-high-school', label: 'Some High School' },
      { value: 'high-school', label: 'High School Diploma or GED' },
      { value: 'some-college', label: 'Some College' },
      { value: 'associates', label: "Associate's Degree" },
      { value: 'bachelors', label: "Bachelor's Degree" },
      { value: 'masters', label: "Master's Degree" },
      { value: 'doctorate', label: 'Doctorate' },
    ],
    validation: { required: true },
  },
];

// Career Goals Questions (Step 3)
export const CAREER_GOALS_QUESTIONS: QuestionConfig[] = [
  {
    field: 'desiredField',
    inputType: 'text',
    question: {
      id: 'q-desiredField',
      personaType: 'career-development',
      variations: [
        "Now for the exciting part - where do you want to go? What career field interests you?",
        "Let's talk about your dreams! What field do you want to move into?",
        "This is where it gets fun! What career field are you drawn to?",
      ],
      delayMs: 1100,
    },
    acknowledgment: {
      id: 'ack-desiredField',
      personaType: 'career-development',
      variations: [
        "That's a fantastic field with great opportunities in Kansas!",
        "I love that! There's so much potential there.",
        "Excellent choice! That field is growing in Kansas.",
      ],
      delayMs: 700,
    },
    placeholder: "e.g., Healthcare, Technology, Advanced Manufacturing",
    validation: { required: true },
  },
  {
    field: 'desiredOccupation',
    inputType: 'text',
    question: {
      id: 'q-desiredOccupation',
      personaType: 'career-development',
      variations: [
        "What specific job title are you aiming for?",
        "What's your dream job title in that field?",
        "What position do you see yourself in?",
      ],
      delayMs: 800,
    },
    acknowledgment: {
      id: 'ack-desiredOccupation',
      personaType: 'career-development',
      variations: [
        "I can absolutely help you get there! That's an achievable goal.",
        "Love it! We can build a path to that role.",
        "Perfect! I've helped others reach that same goal.",
      ],
      delayMs: 800,
    },
    placeholder: "e.g., Registered Nurse, Web Developer, CNC Machinist",
    validation: { required: true },
  },
  {
    field: 'careerChangeReason',
    inputType: 'textarea',
    question: {
      id: 'q-careerChangeReason',
      personaType: 'career-development',
      variations: [
        "What's motivating this career change? I'd love to understand what's driving you.",
        "Everyone has their own 'why' - what's yours? Why this change?",
        "Tell me what's inspiring this career shift. What's your story?",
      ],
      delayMs: 1200,
    },
    acknowledgment: {
      id: 'ack-careerChangeReason',
      personaType: 'career-development',
      variations: [
        "Thank you for sharing that. Your 'why' will keep you motivated through this journey.",
        "I really appreciate you opening up. That's a powerful reason to make a change.",
        "That's meaningful. Keeping this 'why' in mind will help you stay focused.",
      ],
      delayMs: 900,
    },
    placeholder: "Share what's motivating this change...",
    validation: { required: true },
  },
  {
    field: 'timelineExpectation',
    inputType: 'select',
    question: {
      id: 'q-timelineExpectation',
      personaType: 'career-development',
      variations: [
        "How soon are you looking to make this transition?",
        "What's your ideal timeline for this career change?",
        "When would you like to be in your new role?",
      ],
      delayMs: 800,
    },
    acknowledgment: {
      id: 'ack-timelineExpectation',
      personaType: 'career-development',
      variations: [
        "Perfect! I'll build a plan that fits your timeline.",
        "Great! We'll create a roadmap for that timeframe.",
        "Got it - I'll structure your plan around that timeline.",
      ],
      delayMs: 700,
    },
    options: [
      { value: '3-months', label: 'Within 3 months' },
      { value: '6-months', label: 'Within 6 months' },
      { value: '1-year', label: 'Within 1 year' },
      { value: '2-years', label: 'Within 2 years' },
      { value: 'flexible', label: 'Flexible / Long-term plan' },
    ],
    validation: { required: true },
  },
];

// Constraints Questions (Step 4)
export const CONSTRAINTS_QUESTIONS: QuestionConfig[] = [
  {
    field: 'geographicConstraints',
    inputType: 'select',
    question: {
      id: 'q-geographicConstraints',
      personaType: 'career-development',
      variations: [
        "Let's talk about logistics. What are your location preferences?",
        "Where do you see yourself working? Any location constraints?",
        "Tell me about your location flexibility.",
      ],
      delayMs: 900,
    },
    acknowledgment: {
      id: 'ack-geographicConstraints',
      personaType: 'skills-training',
      variations: [
        "Got it - I'll factor that into your plan.",
        "Perfect, that's helpful to know.",
        "Thanks! I'll keep that in mind.",
      ],
      delayMs: 600,
    },
    options: [
      { value: 'local-only', label: 'Must stay in my current area' },
      { value: 'willing-to-relocate', label: 'Willing to relocate within Kansas' },
      { value: 'remote-preferred', label: 'Prefer remote work' },
      { value: 'hybrid', label: 'Open to hybrid opportunities' },
    ],
    validation: { required: true },
  },
  {
    field: 'timeAvailability',
    inputType: 'select',
    question: {
      id: 'q-timeAvailability',
      personaType: 'skills-training',
      variations: [
        "How much time can you dedicate to training and learning?",
        "What's your availability for training programs?",
        "How much time do you have for skill development?",
      ],
      delayMs: 900,
    },
    acknowledgment: {
      id: 'ack-timeAvailability',
      personaType: 'career-development',
      variations: [
        "Perfect! I'll find programs that fit your schedule.",
        "Great! We'll work with your availability.",
        "Excellent - lots of options for that schedule!",
      ],
      delayMs: 700,
    },
    options: [
      { value: 'full-time', label: 'Full-time (can dedicate full days)' },
      { value: 'part-time', label: 'Part-time (mornings or afternoons)' },
      { value: 'evenings-weekends', label: 'Evenings and weekends only' },
      { value: 'flexible', label: 'Flexible schedule' },
    ],
    validation: { required: true },
  },
  {
    field: 'financialConstraints',
    inputType: 'select',
    question: {
      id: 'q-financialConstraints',
      personaType: 'skills-training',
      variations: [
        "Let's be real about budget. What can you invest in training and education?",
        "I want to be upfront about costs. What's your budget for training?",
        "Being honest about budget helps me find the right fit. What can you afford?",
      ],
      delayMs: 1000,
    },
    acknowledgment: {
      id: 'ack-financialConstraints',
      personaType: 'skills-training',
      variations: [
        "Thanks for being honest. There are great options at every price point, including free programs!",
        "I appreciate that! Don't worry - we'll find programs that work with your budget.",
        "Perfect. There are grants, scholarships, and free programs I can point you to!",
      ],
      delayMs: 900,
    },
    options: [
      { value: 'no-budget', label: 'Need free or fully-funded options' },
      { value: 'limited-budget', label: 'Can afford $500-2,000' },
      { value: 'moderate-budget', label: 'Can afford $2,000-10,000' },
      { value: 'well-funded', label: 'Can afford $10,000+' },
    ],
    validation: { required: true },
  },
  {
    field: 'hasTransportation',
    inputType: 'radio',
    question: {
      id: 'q-hasTransportation',
      personaType: 'skills-training',
      variations: [
        "Do you have reliable transportation?",
        "Can you get to in-person training if needed?",
        "Do you have access to transportation?",
      ],
      delayMs: 700,
    },
    acknowledgment: {
      id: 'ack-hasTransportation',
      personaType: 'skills-training',
      variations: [
        "Got it, thanks!",
        "Perfect, noted!",
        "Understood!",
      ],
      delayMs: 500,
    },
    options: [
      { value: 'true', label: 'Yes' },
      { value: 'false', label: 'No' },
    ],
    validation: { required: true },
  },
  {
    field: 'hasInternetAccess',
    inputType: 'radio',
    question: {
      id: 'q-hasInternetAccess',
      personaType: 'skills-training',
      variations: [
        "Do you have reliable internet access at home?",
        "Can you access online learning resources?",
        "Do you have internet at home?",
      ],
      delayMs: 700,
    },
    acknowledgment: {
      id: 'ack-hasInternetAccess',
      personaType: 'skills-training',
      variations: [
        "Perfect!",
        "Thanks!",
        "Got it!",
      ],
      delayMs: 500,
    },
    options: [
      { value: 'true', label: 'Yes' },
      { value: 'false', label: 'No' },
    ],
    validation: { required: true },
  },
];

// Skills & Interests Questions (Step 5)
export const SKILLS_INTERESTS_QUESTIONS: QuestionConfig[] = [
  {
    field: 'currentSkills',
    inputType: 'tags',
    question: {
      id: 'q-currentSkills',
      personaType: 'career-development',
      variations: [
        "Almost done! Let's celebrate what you already bring to the table. What skills do you have from your current or past work?",
        "You've got skills! Tell me what you're already good at from your work experience.",
        "Let's inventory your superpowers! What skills have you developed in your career so far?",
      ],
      delayMs: 1200,
    },
    acknowledgment: {
      id: 'ack-currentSkills',
      personaType: 'career-development',
      variations: [
        "Those are valuable skills! They'll transfer to your new career.",
        "Wow! You've built some great capabilities. We can definitely leverage these!",
        "Fantastic! These skills are more valuable than you might think.",
      ],
      delayMs: 800,
    },
    placeholder: "e.g., Customer service, Microsoft Excel",
    validation: { required: true },
  },
  {
    field: 'interests',
    inputType: 'tags',
    question: {
      id: 'q-interests',
      personaType: 'career-development',
      variations: [
        "What topics or activities genuinely interest you? What gets you excited?",
        "What are you naturally drawn to? What captures your attention?",
        "Tell me what you're passionate about! What interests you?",
      ],
      delayMs: 1000,
    },
    acknowledgment: {
      id: 'ack-interests',
      personaType: 'career-development',
      variations: [
        "I love that! Passion drives success.",
        "Those are great interests! We'll align your career with what you love.",
        "Perfect! Finding work you're passionate about makes all the difference.",
      ],
      delayMs: 700,
    },
    placeholder: "e.g., Technology, Helping people, Problem solving",
    validation: { required: true },
  },
  {
    field: 'strengthAreas',
    inputType: 'tags',
    question: {
      id: 'q-strengthAreas',
      personaType: 'career-development',
      variations: [
        "What are you naturally good at? What comes easily to you?",
        "Everyone has strengths! What are yours?",
        "What would others say you're really good at?",
      ],
      delayMs: 900,
    },
    acknowledgment: {
      id: 'ack-strengthAreas',
      personaType: 'career-development',
      variations: [
        "Those strengths will serve you well in your new path!",
        "Excellent! Knowing your strengths helps us find the right fit.",
        "Perfect! We'll build on these strengths.",
      ],
      delayMs: 700,
    },
    placeholder: "e.g., Communication, Attention to detail, Leadership",
    validation: { required: true },
  },
  {
    field: 'learningPreferences',
    inputType: 'checkbox-group',
    question: {
      id: 'q-learningPreferences',
      personaType: 'skills-training',
      variations: [
        "Last question! How do you learn best? Select all that apply.",
        "Final question - what learning formats work best for you? Choose all that fit.",
        "Almost there! How do you prefer to learn? Pick all that resonate with you.",
      ],
      delayMs: 1000,
    },
    acknowledgment: {
      id: 'ack-learningPreferences',
      personaType: 'career-development',
      variations: [
        "Perfect! I'll find programs that match your learning style. You're all set - let me create your personalized plan!",
        "Excellent! Now I can recommend programs that fit how you learn best. Generating your career roadmap now!",
        "Great! I've got everything I need. Let me build you an amazing career transition plan!",
      ],
      delayMs: 1000,
    },
    options: [
      { value: 'online-self-paced', label: 'Online self-paced courses' },
      { value: 'online-instructor-led', label: 'Online classes with instructor' },
      { value: 'in-person-classes', label: 'In-person classroom instruction' },
      { value: 'hands-on-training', label: 'Hands-on training/apprenticeship' },
      { value: 'mentorship', label: 'One-on-one mentorship' },
      { value: 'reading-materials', label: 'Books and reading materials' },
    ],
    validation: { required: true },
  },
];

// All questions organized by step
export const INTAKE_STEPS = [
  {
    stepNumber: 0,
    stepName: 'Personal Information',
    questions: PERSONAL_INFO_QUESTIONS,
  },
  {
    stepNumber: 1,
    stepName: 'Current Situation',
    questions: CURRENT_SITUATION_QUESTIONS,
  },
  {
    stepNumber: 2,
    stepName: 'Career Goals',
    questions: CAREER_GOALS_QUESTIONS,
  },
  {
    stepNumber: 3,
    stepName: 'Your Constraints',
    questions: CONSTRAINTS_QUESTIONS,
  },
  {
    stepNumber: 4,
    stepName: 'Skills & Interests',
    questions: SKILLS_INTERESTS_QUESTIONS,
  },
];

// Helper function to get random variation from array
export function getRandomVariation(variations: string[], context?: Record<string, string>): string {
  const variation = variations[Math.floor(Math.random() * variations.length)];

  if (!context) return variation;

  // Replace placeholders like {firstName} with actual values
  return Object.entries(context).reduce(
    (str, [key, value]) => str.replace(new RegExp(`\\{${key}\\}`, 'g'), value),
    variation
  );
}
