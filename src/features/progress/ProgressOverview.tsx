import type { CareerPlan, UserProgress } from '@/types';

interface ProgressOverviewProps {
  plan: CareerPlan;
  userProgress: UserProgress;
}

const ProgressOverview: React.FC<ProgressOverviewProps> = ({ plan, userProgress }) => {
  const daysSinceStart = Math.floor(
    (Date.now() - userProgress.startedAt.getTime()) / (1000 * 60 * 60 * 24)
  );

  const daysSinceActivity = Math.floor(
    (Date.now() - userProgress.lastActivityAt.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="progress-overview">
      <div className="overview-main">
        <div className="progress-circle">
          <svg viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#ecf0f1"
              strokeWidth="10"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#3498db"
              strokeWidth="10"
              strokeDasharray={`${userProgress.overallProgress * 2.827} 282.7`}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="progress-percentage">{userProgress.overallProgress}%</div>
        </div>

        <div className="overview-stats">
          <h3>Overall Progress</h3>
          <p className="progress-description">
            You've completed {userProgress.completedMilestones} of {userProgress.totalMilestones} milestones
          </p>
        </div>
      </div>

      <div className="overview-cards">
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <div className="stat-label">Days Active</div>
            <div className="stat-value">{daysSinceStart} days</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <div className="stat-label">Completed</div>
            <div className="stat-value">
              {userProgress.completedMilestones}/{userProgress.totalMilestones}
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏰</div>
          <div className="stat-content">
            <div className="stat-label">Last Activity</div>
            <div className="stat-value">
              {daysSinceActivity === 0 ? 'Today' : `${daysSinceActivity} days ago`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressOverview;
