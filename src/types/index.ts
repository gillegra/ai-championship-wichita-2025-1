// Core domain types for the workforce development application

export interface UserProfile {
  id: string;
  email?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IntakeData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  zipCode: string;

  // Current Situation
  currentOccupation: string;
  currentIndustry: string;
  yearsOfExperience: number;
  educationLevel: EducationLevel;

  // Career Goals
  desiredField: string;
  desiredOccupation: string;
  careerChangeReason: string;
  timelineExpectation: TimelineExpectation;

  // Constraints & Resources
  geographicConstraints: GeographicConstraint;
  timeAvailability: TimeAvailability;
  financialConstraints: FinancialConstraint;
  hasTransportation: boolean;
  hasInternetAccess: boolean;

  // Skills & Interests
  currentSkills: string[];
  interests: string[];
  strengthAreas: string[];
  learningPreferences: LearningPreference[];
}

export type EducationLevel =
  | 'no-high-school'
  | 'high-school'
  | 'some-college'
  | 'associates'
  | 'bachelors'
  | 'masters'
  | 'doctorate';

export type TimelineExpectation =
  | '3-months'
  | '6-months'
  | '1-year'
  | '2-years'
  | 'flexible';

export type GeographicConstraint =
  | 'local-only'
  | 'willing-to-relocate'
  | 'remote-preferred'
  | 'hybrid';

export type TimeAvailability =
  | 'full-time'
  | 'part-time'
  | 'evenings-weekends'
  | 'flexible';

export type FinancialConstraint =
  | 'no-budget'
  | 'limited-budget'
  | 'moderate-budget'
  | 'well-funded';

export type LearningPreference =
  | 'online-self-paced'
  | 'online-instructor-led'
  | 'in-person-classes'
  | 'hands-on-training'
  | 'mentorship'
  | 'reading-materials';

// Career Plan Types
export interface CareerPlan {
  id: string;
  userId: string;
  intakeData: IntakeData;
  generatedAt: Date;
  updatedAt: Date;

  // Plan Content
  summary: string;
  skillGapAnalysis: SkillGap[];
  milestones: Milestone[];
  estimatedDuration: string;
  estimatedCost: string;

  // Resources
  trainingPrograms: TrainingProgram[];
  certifications: Certification[];
  localResources: LocalResource[];
}

export interface SkillGap {
  skill: string;
  currentLevel: SkillLevel;
  requiredLevel: SkillLevel;
  priority: 'high' | 'medium' | 'low';
  howToAcquire: string;
}

export type SkillLevel =
  | 'none'
  | 'beginner'
  | 'intermediate'
  | 'advanced'
  | 'expert';

export interface Milestone {
  id: string;
  title: string;
  description: string;
  order: number;
  estimatedDuration: string;
  dependencies: string[]; // IDs of prerequisite milestones
  tasks: Task[];
  status: MilestoneStatus;
}

export type MilestoneStatus =
  | 'not-started'
  | 'in-progress'
  | 'completed'
  | 'skipped';

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  notes?: string;
  completedAt?: Date;
}

export interface TrainingProgram {
  id: string;
  name: string;
  provider: string;
  description: string;
  duration: string;
  cost: string;
  format: 'online' | 'in-person' | 'hybrid';
  location?: string;
  url?: string;
  relevantSkills: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuingOrganization: string;
  description: string;
  cost: string;
  examFormat: string;
  preparationTime: string;
  url?: string;
}

export interface LocalResource {
  id: string;
  name: string;
  type: 'community-college' | 'library' | 'workforce-center' | 'nonprofit' | 'other';
  description: string;
  address?: string;
  city: string;
  phone?: string;
  email?: string;
  website?: string;
  services: string[];
}

// Progress Tracking Types
export interface UserProgress {
  userId: string;
  planId: string;
  startedAt: Date;
  lastActivityAt: Date;

  overallProgress: number; // 0-100 percentage
  completedMilestones: number;
  totalMilestones: number;

  milestoneProgress: Record<string, MilestoneProgress>;
}

export interface MilestoneProgress {
  milestoneId: string;
  status: MilestoneStatus;
  startedAt?: Date;
  completedAt?: Date;
  completedTasks: number;
  totalTasks: number;
  notes: string[];
}

// Agent Persona Types
export type AgentType =
  | 'intake-assistant'
  | 'career-counselor'
  | 'skills-assessor'
  | 'progress-coach'
  | 'motivation-coach'
  | 'resource-navigator';

export interface Agent {
  type: AgentType;
  name: string;
  avatar: string;
  description: string;
  expertise: string[];
  personality: string;
}

export interface AgentMessage {
  id: string;
  agentType: AgentType;
  content: string;
  timestamp: Date;
  context?: Record<string, unknown>;
}

export interface AgentConversation {
  id: string;
  userId: string;
  agentType: AgentType;
  messages: AgentMessage[];
  startedAt: Date;
  lastMessageAt: Date;
}

// UI State Types
export interface IntakeFormState {
  currentStep: number;
  totalSteps: number;
  completedSteps: number[];
  data: Partial<IntakeData>;
}

export interface PlanViewState {
  selectedMilestoneId?: string;
  expandedMilestones: string[];
  filterStatus?: MilestoneStatus;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface GeneratePlanRequest {
  intakeData: IntakeData;
}

export interface GeneratePlanResponse {
  plan: CareerPlan;
}

export interface UpdateProgressRequest {
  milestoneId: string;
  taskId?: string;
  status?: MilestoneStatus;
  taskCompleted?: boolean;
  notes?: string;
}
