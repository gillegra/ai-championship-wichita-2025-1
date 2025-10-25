import type { SkillGap } from '@/types';

interface SkillGapAnalysisProps {
  skillGaps: SkillGap[];
}

const SkillGapAnalysis: React.FC<SkillGapAnalysisProps> = ({ skillGaps }) => {
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  const sortedGaps = [...skillGaps].sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
  );

  return (
    <div className="skill-gap-analysis">
      {sortedGaps.map((gap, index) => (
        <div key={index} className={`skill-gap-card priority-${gap.priority}`}>
          <div className="skill-gap-header">
            <h4>{gap.skill}</h4>
            <span className={`priority-badge priority-${gap.priority}`}>
              {gap.priority} priority
            </span>
          </div>

          <div className="skill-levels">
            <div className="level-item">
              <span className="level-label">Current:</span>
              <span className="level-value">{gap.currentLevel}</span>
            </div>
            <div className="level-arrow">→</div>
            <div className="level-item">
              <span className="level-label">Required:</span>
              <span className="level-value">{gap.requiredLevel}</span>
            </div>
          </div>

          <div className="skill-gap-acquire">
            <strong>How to acquire:</strong>
            <p>{gap.howToAcquire}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillGapAnalysis;
