import type { CareerPlan } from '@/types';

interface PlanSummaryProps {
  plan: CareerPlan;
}

const PlanSummary: React.FC<PlanSummaryProps> = ({ plan }) => {
  return (
    <div className="plan-summary">
      <div className="summary-content">
        <h3>Overview</h3>
        <p>{plan.summary}</p>
      </div>

      <div className="summary-stats">
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <div className="stat-label">Estimated Duration</div>
            <div className="stat-value">{plan.estimatedDuration}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <div className="stat-label">Estimated Cost</div>
            <div className="stat-value">{plan.estimatedCost}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <div className="stat-label">Milestones</div>
            <div className="stat-value">{plan.milestones.length} steps</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanSummary;
