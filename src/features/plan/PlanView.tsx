import { useState } from 'react';
import type { CareerPlan, PlanViewState } from '@/types';
import PlanSummary from './PlanSummary';
import SkillGapAnalysis from './SkillGapAnalysis';
import MilestonesList from './MilestonesList';
import ResourcesList from './ResourcesList';
import './plan.css';

interface PlanViewProps {
  plan: CareerPlan;
  onStartPlan: () => void;
}

const PlanView: React.FC<PlanViewProps> = ({ plan, onStartPlan }) => {
  const [viewState, setViewState] = useState<PlanViewState>({
    expandedMilestones: [],
  });

  const toggleMilestone = (milestoneId: string) => {
    setViewState({
      ...viewState,
      expandedMilestones: viewState.expandedMilestones.includes(milestoneId)
        ? viewState.expandedMilestones.filter((id) => id !== milestoneId)
        : [...viewState.expandedMilestones, milestoneId],
    });
  };

  return (
    <div className="plan-view">
      <header className="plan-header">
        <h1>Your Personalized Career Transition Plan</h1>
        <p>
          From {plan.intakeData.currentOccupation} to {plan.intakeData.desiredOccupation}
        </p>
      </header>

      <PlanSummary plan={plan} />

      <section className="plan-section">
        <h2>Skill Gap Analysis</h2>
        <p className="section-description">
          Here's what you need to learn to reach your goal:
        </p>
        <SkillGapAnalysis skillGaps={plan.skillGapAnalysis} />
      </section>

      <section className="plan-section">
        <h2>Your Pathway Milestones</h2>
        <p className="section-description">
          Follow these steps to achieve your career transition:
        </p>
        <MilestonesList
          milestones={plan.milestones}
          expandedMilestones={viewState.expandedMilestones}
          onToggleMilestone={toggleMilestone}
        />
      </section>

      <section className="plan-section">
        <h2>Recommended Resources</h2>
        <ResourcesList
          trainingPrograms={plan.trainingPrograms}
          certifications={plan.certifications}
          localResources={plan.localResources}
        />
      </section>

      <div className="plan-actions">
        <button onClick={onStartPlan} className="btn-primary btn-large">
          Start My Journey
        </button>
      </div>
    </div>
  );
};

export default PlanView;
