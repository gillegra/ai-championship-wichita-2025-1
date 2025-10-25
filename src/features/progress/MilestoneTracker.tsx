import { useState } from 'react';
import type { Milestone, UserProgress } from '@/types';

interface MilestoneTrackerProps {
  milestones: Milestone[];
  userProgress: UserProgress;
  onUpdateProgress: (milestoneId: string, taskId?: string, completed?: boolean, notes?: string) => void;
}

const MilestoneTracker: React.FC<MilestoneTrackerProps> = ({
  milestones,
  userProgress,
  onUpdateProgress,
}) => {
  const [expandedMilestone, setExpandedMilestone] = useState<string | null>(null);
  const [notesInput, setNotesInput] = useState<Record<string, string>>({});

  const toggleMilestone = (milestoneId: string) => {
    setExpandedMilestone(expandedMilestone === milestoneId ? null : milestoneId);
  };

  const handleTaskToggle = (milestoneId: string, taskId: string, completed: boolean) => {
    onUpdateProgress(milestoneId, taskId, completed);
  };

  const handleAddNote = (milestoneId: string) => {
    const note = notesInput[milestoneId];
    if (note && note.trim()) {
      onUpdateProgress(milestoneId, undefined, undefined, note.trim());
      setNotesInput({ ...notesInput, [milestoneId]: '' });
    }
  };

  return (
    <div className="milestone-tracker">
      {milestones.map((milestone) => {
        const progress = userProgress.milestoneProgress[milestone.id];
        const isExpanded = expandedMilestone === milestone.id;
        const completionPercentage = progress
          ? Math.round((progress.completedTasks / progress.totalTasks) * 100)
          : 0;

        return (
          <div key={milestone.id} className={`milestone-track-card status-${progress?.status || 'not-started'}`}>
            <div
              className="milestone-track-header"
              onClick={() => toggleMilestone(milestone.id)}
            >
              <div className="milestone-track-number">{milestone.order + 1}</div>
              <div className="milestone-track-info">
                <h4>{milestone.title}</h4>
                <div className="milestone-track-progress">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${completionPercentage}%` }}
                    />
                  </div>
                  <span className="progress-text">
                    {progress?.completedTasks || 0} of {milestone.tasks.length} tasks
                  </span>
                </div>
              </div>
              <button className="milestone-toggle">
                {isExpanded ? '▼' : '▶'}
              </button>
            </div>

            {isExpanded && (
              <div className="milestone-track-details">
                <p className="milestone-description">{milestone.description}</p>

                <div className="milestone-tasks">
                  <h5>Tasks:</h5>
                  {milestone.tasks.map((task) => (
                    <div key={task.id} className="task-item">
                      <label>
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={(e) =>
                            handleTaskToggle(milestone.id, task.id, e.target.checked)
                          }
                        />
                        <span className={task.completed ? 'completed' : ''}>
                          {task.title}
                        </span>
                      </label>
                      {task.description && (
                        <p className="task-description">{task.description}</p>
                      )}
                      {task.completed && task.completedAt && (
                        <span className="task-completed-date">
                          Completed: {new Date(task.completedAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="milestone-notes">
                  <h5>Notes:</h5>
                  {progress?.notes && progress.notes.length > 0 ? (
                    <ul className="notes-list">
                      {progress.notes.map((note, idx) => (
                        <li key={idx}>{note}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="no-notes">No notes yet</p>
                  )}

                  <div className="add-note">
                    <input
                      type="text"
                      placeholder="Add a note about your progress..."
                      value={notesInput[milestone.id] || ''}
                      onChange={(e) =>
                        setNotesInput({ ...notesInput, [milestone.id]: e.target.value })
                      }
                      onKeyPress={(e) =>
                        e.key === 'Enter' && handleAddNote(milestone.id)
                      }
                    />
                    <button
                      onClick={() => handleAddNote(milestone.id)}
                      disabled={!notesInput[milestone.id]?.trim()}
                    >
                      Add Note
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MilestoneTracker;
