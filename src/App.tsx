import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import type { IntakeData, CareerPlan, UserProgress, AgentType } from '@/types';
import Header from './shared/components/Header';
import LandingPage from './pages/reskill/features/landing/LandingPage';
import ConversationalIntake from './pages/reskill/features/intake/ConversationalIntake';
import PlanView from './pages/reskill/features/plan/PlanView';
import ProgressDashboard from './pages/reskill/features/progress/ProgressDashboard';
import AgentChat from './pages/reskill/features/agents/AgentChat';
import { AVAILABLE_AGENTS } from './pages/reskill/features/agents/agentDefinitions';
import Loading from './shared/components/Loading';
import GameChallenge from './pages/game/GameChallenge';
import Challenge3 from './pages/c3/Challenge3';
import Challenge4 from './pages/c4/Challenge4';
import './App.css';

// Mock data generation functions (to be replaced with real API calls)
const generateMockPlan = (intakeData: IntakeData): CareerPlan => {
  return {
    id: `plan-${Date.now()}`,
    userId: 'user-1',
    intakeData,
    generatedAt: new Date(),
    updatedAt: new Date(),
    summary: `Based on your experience in ${intakeData.currentOccupation} and your goal to become a ${intakeData.desiredOccupation}, we've created a personalized pathway that leverages your existing skills and addresses key gaps. This plan takes into account your ${intakeData.timelineExpectation} timeline and ${intakeData.financialConstraints} budget constraints.`,
    estimatedDuration: '12-18 months',
    estimatedCost: '$2,000-$5,000',
    skillGapAnalysis: [
      {
        skill: 'Technical Certification',
        currentLevel: 'none',
        requiredLevel: 'advanced',
        priority: 'high',
        howToAcquire: 'Complete accredited certification program at local community college',
      },
      {
        skill: 'Industry-Specific Software',
        currentLevel: 'beginner',
        requiredLevel: 'intermediate',
        priority: 'high',
        howToAcquire: 'Online courses and hands-on practice projects',
      },
      {
        skill: 'Professional Networking',
        currentLevel: 'beginner',
        requiredLevel: 'intermediate',
        priority: 'medium',
        howToAcquire: 'Attend industry meetups and join professional associations',
      },
    ],
    milestones: [
      {
        id: 'milestone-1',
        title: 'Complete Career Assessment & Research',
        description: 'Research the target industry, understand job requirements, and validate your career choice.',
        order: 0,
        estimatedDuration: '2-4 weeks',
        dependencies: [],
        status: 'not-started',
        tasks: [
          { id: 'task-1-1', title: 'Research 10 job postings in target field', description: '', completed: false },
          { id: 'task-1-2', title: 'Informational interviews with 3 professionals', description: '', completed: false },
          { id: 'task-1-3', title: 'Document required skills and qualifications', description: '', completed: false },
        ],
      },
      {
        id: 'milestone-2',
        title: 'Enroll in Core Training Program',
        description: 'Complete foundational training or certification for your new career.',
        order: 1,
        estimatedDuration: '6-12 months',
        dependencies: ['milestone-1'],
        status: 'not-started',
        tasks: [
          { id: 'task-2-1', title: 'Research and select training program', description: '', completed: false },
          { id: 'task-2-2', title: 'Apply for financial aid if needed', description: '', completed: false },
          { id: 'task-2-3', title: 'Complete enrollment process', description: '', completed: false },
          { id: 'task-2-4', title: 'Attend all classes and complete coursework', description: '', completed: false },
        ],
      },
      {
        id: 'milestone-3',
        title: 'Build Portfolio & Gain Experience',
        description: 'Create tangible examples of your work and gain practical experience.',
        order: 2,
        estimatedDuration: '3-6 months',
        dependencies: ['milestone-2'],
        status: 'not-started',
        tasks: [
          { id: 'task-3-1', title: 'Complete 3 practice projects', description: '', completed: false },
          { id: 'task-3-2', title: 'Volunteer or intern in target field', description: '', completed: false },
          { id: 'task-3-3', title: 'Document accomplishments and create portfolio', description: '', completed: false },
        ],
      },
      {
        id: 'milestone-4',
        title: 'Job Search & Transition',
        description: 'Prepare application materials, network, and secure new position.',
        order: 3,
        estimatedDuration: '2-3 months',
        dependencies: ['milestone-3'],
        status: 'not-started',
        tasks: [
          { id: 'task-4-1', title: 'Update resume and LinkedIn profile', description: '', completed: false },
          { id: 'task-4-2', title: 'Apply to 20+ relevant positions', description: '', completed: false },
          { id: 'task-4-3', title: 'Prepare for interviews (practice & research)', description: '', completed: false },
          { id: 'task-4-4', title: 'Accept job offer in new field', description: '', completed: false },
        ],
      },
    ],
    trainingPrograms: [
      {
        id: 'program-1',
        name: 'Professional Certification Program',
        provider: 'Wichita State University',
        description: 'Comprehensive training program designed for career changers',
        duration: '6 months',
        cost: '$3,500',
        format: 'hybrid',
        location: 'Wichita, KS',
        url: 'https://wichita.edu',
        relevantSkills: ['Technical Skills', 'Industry Knowledge'],
      },
    ],
    certifications: [
      {
        id: 'cert-1',
        name: 'Industry Certification',
        issuingOrganization: 'Professional Association',
        description: 'Nationally recognized certification demonstrating competency',
        cost: '$400',
        examFormat: 'Computer-based test',
        preparationTime: '3-6 months',
        url: 'https://example.com',
      },
    ],
    localResources: [
      {
        id: 'resource-1',
        name: 'Kansas Department of Commerce',
        type: 'workforce-center',
        description: 'State workforce development resources and job placement assistance',
        city: 'Wichita',
        website: 'https://kansascommerce.gov',
        services: ['Career counseling', 'Job search assistance', 'Training grants'],
      },
      {
        id: 'resource-2',
        name: 'Wichita Public Library',
        type: 'library',
        description: 'Free computer access, career resources, and workshop space',
        address: '223 S Main St',
        city: 'Wichita',
        phone: '(316) 261-8500',
        website: 'https://wichitalibrary.org',
        services: ['Computer access', 'Career workshops', 'Resume assistance'],
      },
    ],
  };
};

const generateMockProgress = (plan: CareerPlan): UserProgress => {
  const milestoneProgress: Record<string, any> = {};
  plan.milestones.forEach((milestone: CareerPlan['milestones'][number]) => {
    milestoneProgress[milestone.id] = {
      milestoneId: milestone.id,
      status: 'not-started' as const,
      completedTasks: 0,
      totalTasks: milestone.tasks.length,
      notes: [],
    };
  });

  return {
    userId: 'user-1',
    planId: plan.id,
    startedAt: new Date(),
    lastActivityAt: new Date(),
    overallProgress: 0,
    completedMilestones: 0,
    totalMilestones: plan.milestones.length,
    milestoneProgress,
  };
};

function App() {
  const [_intakeData, setIntakeData] = useState<IntakeData | null>(null);
  const [careerPlan, setCareerPlan] = useState<CareerPlan | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);

  const handleIntakeComplete = async (data: IntakeData) => {
    setIntakeData(data);
    setIsGeneratingPlan(true);

    // Simulate API call to generate plan
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const plan = generateMockPlan(data);
    const progress = generateMockProgress(plan);

    setCareerPlan(plan);
    setUserProgress(progress);
    setIsGeneratingPlan(false);
  };

  const handleStartPlan = () => {
    // Navigate to progress dashboard
    window.location.href = '/reskill/progress';
  };

  const handleUpdateProgress = (
    milestoneId: string,
    taskId?: string,
    completed?: boolean,
    notes?: string
  ) => {
    if (!careerPlan || !userProgress) return;

    const updatedProgress = { ...userProgress };
    const milestoneProgress = updatedProgress.milestoneProgress[milestoneId];

    if (taskId && completed !== undefined) {
      // Update task completion
      const milestone = careerPlan.milestones.find((m: CareerPlan['milestones'][number]) => m.id === milestoneId);
      if (milestone) {
        const task = milestone.tasks.find((t: CareerPlan['milestones'][number]['tasks'][number]) => t.id === taskId);
        if (task) {
          task.completed = completed;
          task.completedAt = completed ? new Date() : undefined;

          milestoneProgress.completedTasks = milestone.tasks.filter((t: CareerPlan['milestones'][number]['tasks'][number]) => t.completed).length;

          // Update milestone status
          if (milestoneProgress.completedTasks === milestone.tasks.length) {
            milestoneProgress.status = 'completed';
            milestoneProgress.completedAt = new Date();
            updatedProgress.completedMilestones += 1;
          } else if (milestoneProgress.completedTasks > 0) {
            milestoneProgress.status = 'in-progress';
            if (!milestoneProgress.startedAt) {
              milestoneProgress.startedAt = new Date();
            }
          } else {
            milestoneProgress.status = 'not-started';
          }
        }
      }
    }

    if (notes) {
      milestoneProgress.notes.push(notes);
    }

    // Recalculate overall progress
    updatedProgress.overallProgress = Math.round(
      (updatedProgress.completedMilestones / updatedProgress.totalMilestones) * 100
    );
    updatedProgress.lastActivityAt = new Date();

    setUserProgress(updatedProgress);
  };

  const handleSendAgentMessage = async (
    agentType: AgentType,
    _message: string
  ): Promise<string> => {
    // Simulate API call to agent
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock responses based on agent type
    const responses: Record<AgentType, string> = {
      'intake-assistant':
        "That's a great question! To help you better, could you tell me more about what's motivating this career change?",
      'career-counselor':
        "Based on the Kansas job market, your target field has strong growth potential. I'd recommend focusing on these key skills first...",
      'skills-assessor':
        "Let me analyze your current skills against the requirements. You have strong transferable skills in [area], but you'll need to develop [specific skills].",
      'progress-coach':
        "You're making great progress! You've completed 3 out of 12 tasks in this milestone. Let's focus on the next priority item...",
      'motivation-coach':
        "I understand it can feel overwhelming. Remember why you started this journey. You've already accomplished so much! Let's break this into smaller steps.",
      'resource-navigator':
        "I found several local programs that match your needs. The Wichita Area Technical College offers a program starting next month, and there are financial aid options available.",
    };

    return responses[agentType] || 'Thank you for your message. How else can I assist you?';
  };

  return (
    <BrowserRouter>
      <div className="app">
        <Header />

        <main className="app-main">
          {isGeneratingPlan ? (
            <Loading message="Generating your personalized career plan..." />
          ) : (
            <Routes>
              {/* Root - Landing Page */}
              <Route path="/" element={<LandingPage />} />

              {/* Challenge 1: ReSkill KS Intake */}
              <Route path="/reskill" element={<ConversationalIntake onComplete={handleIntakeComplete} />} />

              {/* ReSkill sub-routes */}
              <Route
                path="/reskill/plan"
                element={
                  careerPlan ? (
                    <PlanView plan={careerPlan} onStartPlan={handleStartPlan} />
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              />
              <Route
                path="/reskill/progress"
                element={
                  careerPlan && userProgress ? (
                    <ProgressDashboard
                      plan={careerPlan}
                      userProgress={userProgress}
                      onUpdateProgress={handleUpdateProgress}
                    />
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              />
              <Route
                path="/reskill/agents"
                element={
                  <AgentChat
                    availableAgents={AVAILABLE_AGENTS}
                    onSendMessage={handleSendAgentMessage}
                  />
                }
              />

              {/* Challenge 2: Game */}
              <Route path="/game" element={<GameChallenge />} />

              {/* Challenge 3: TBD */}
              <Route path="/c3" element={<Challenge3 />} />

              {/* Challenge 4: TBD */}
              <Route path="/c4" element={<Challenge4 />} />
            </Routes>
          )}
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
