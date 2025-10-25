import type { Milestone } from '@/types';

interface MilestonesListProps {
  milestones: Milestone[];
  expandedMilestones: string[];
  onToggleMilestone: (milestoneId: string) => void;
}

const MilestonesList: React.FC<MilestonesListProps> = ({
  milestones,
  expandedMilestones,
  onToggleMilestone,
}) => {
  return (
    <div className="milestones-list">
      {milestones.map((milestone) => {
        const isExpanded = expandedMilestones.includes(milestone.id);

        return (
          <div key={milestone.id} className="milestone-card">
            <div
              className="milestone-header"
              onClick={() => onToggleMilestone(milestone.id)}
            >
              <div className="milestone-number">{milestone.order + 1}</div>
              <div className="milestone-info">
                <h4>{milestone.title}</h4>
                <p className="milestone-duration">
                  Estimated time: {milestone.estimatedDuration}
                </p>
              </div>
              <button className="milestone-toggle">
                {isExpanded ? '▼' : '▶'}
              </button>
            </div>

            {isExpanded && (
              <div className="milestone-details">
                <p className="milestone-description">{milestone.description}</p>

                {milestone.dependencies.length > 0 && (
                  <div className="milestone-dependencies">
                    <strong>Prerequisites:</strong>
                    <p>Complete steps {milestone.dependencies.join(', ')} first</p>
                  </div>
                )}

                <div className="milestone-tasks">
                  <h5>Tasks to complete:</h5>
                  <ul>
                    {milestone.tasks.map((task) => (
                      <li key={task.id}>
                        <input
                          type="checkbox"
                          checked={task.completed}
                          disabled
                          readOnly
                        />
                        <span>{task.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MilestonesList;
