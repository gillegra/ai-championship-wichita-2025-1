import { useState } from 'react';
import type { CareerPlan, UserProgress, MilestoneStatus } from '@/types';
import ProgressOverview from './ProgressOverview';
import MilestoneTracker from './MilestoneTracker';
import './progress.css';

interface ProgressDashboardProps {
  plan: CareerPlan;
  userProgress: UserProgress;
  onUpdateProgress: (milestoneId: string, taskId?: string, completed?: boolean, notes?: string) => void;
}

const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
  plan,
  userProgress,
  onUpdateProgress,
}) => {
  const [filterStatus, setFilterStatus] = useState<MilestoneStatus | 'all'>('all');

  const filteredMilestones = plan.milestones.filter((milestone) => {
    if (filterStatus === 'all') return true;
    const progress = userProgress.milestoneProgress[milestone.id];
    return progress?.status === filterStatus || (!progress && filterStatus === 'not-started');
  });

  return (
    <div className="progress-dashboard">
      <header className="dashboard-header">
        <h1>My Progress</h1>
        <p>Track your journey from {plan.intakeData.currentOccupation} to {plan.intakeData.desiredOccupation}</p>
      </header>

      <ProgressOverview plan={plan} userProgress={userProgress} />

      <section className="milestone-tracking">
        <div className="tracking-header">
          <h2>Milestone Progress</h2>
          <div className="filter-controls">
            <label htmlFor="statusFilter">Filter by status:</label>
            <select
              id="statusFilter"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as MilestoneStatus | 'all')}
            >
              <option value="all">All Milestones</option>
              <option value="not-started">Not Started</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <MilestoneTracker
          milestones={filteredMilestones}
          userProgress={userProgress}
          onUpdateProgress={onUpdateProgress}
        />
      </section>
    </div>
  );
};

export default ProgressDashboard;
