import type { Agent } from '@/types';

interface AgentSelectorProps {
  agents: Agent[];
  selectedAgent: Agent | null;
  onSelectAgent: (agent: Agent) => void;
}

const AgentSelector: React.FC<AgentSelectorProps> = ({
  agents,
  selectedAgent,
  onSelectAgent,
}) => {
  return (
    <div className="agent-selector">
      {agents.map((agent) => (
        <button
          key={agent.type}
          className={`agent-card ${selectedAgent?.type === agent.type ? 'selected' : ''}`}
          onClick={() => onSelectAgent(agent)}
        >
          <div className="agent-card-avatar">{agent.avatar}</div>
          <div className="agent-card-info">
            <h4>{agent.name}</h4>
            <p className="agent-card-expertise">
              {agent.expertise.slice(0, 2).join(', ')}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
};

export default AgentSelector;
