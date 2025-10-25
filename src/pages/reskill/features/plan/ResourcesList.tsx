import { useState } from 'react';
import type { TrainingProgram, Certification, LocalResource } from '@/types';

interface ResourcesListProps {
  trainingPrograms: TrainingProgram[];
  certifications: Certification[];
  localResources: LocalResource[];
}

type ResourceTab = 'training' | 'certifications' | 'local';

const ResourcesList: React.FC<ResourcesListProps> = ({
  trainingPrograms,
  certifications,
  localResources,
}) => {
  const [activeTab, setActiveTab] = useState<ResourceTab>('training');

  return (
    <div className="resources-list">
      <div className="resources-tabs">
        <button
          className={`tab ${activeTab === 'training' ? 'active' : ''}`}
          onClick={() => setActiveTab('training')}
        >
          Training Programs ({trainingPrograms.length})
        </button>
        <button
          className={`tab ${activeTab === 'certifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('certifications')}
        >
          Certifications ({certifications.length})
        </button>
        <button
          className={`tab ${activeTab === 'local' ? 'active' : ''}`}
          onClick={() => setActiveTab('local')}
        >
          Local Resources ({localResources.length})
        </button>
      </div>

      <div className="resources-content">
        {activeTab === 'training' && (
          <div className="training-programs">
            {trainingPrograms.map((program) => (
              <div key={program.id} className="resource-card">
                <h4>{program.name}</h4>
                <p className="resource-provider">{program.provider}</p>
                <p className="resource-description">{program.description}</p>
                <div className="resource-meta">
                  <span className="meta-item">
                    <strong>Duration:</strong> {program.duration}
                  </span>
                  <span className="meta-item">
                    <strong>Cost:</strong> {program.cost}
                  </span>
                  <span className="meta-item">
                    <strong>Format:</strong> {program.format}
                  </span>
                  {program.location && (
                    <span className="meta-item">
                      <strong>Location:</strong> {program.location}
                    </span>
                  )}
                </div>
                {program.url && (
                  <a
                    href={program.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resource-link"
                  >
                    Learn More →
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'certifications' && (
          <div className="certifications">
            {certifications.map((cert) => (
              <div key={cert.id} className="resource-card">
                <h4>{cert.name}</h4>
                <p className="resource-provider">{cert.issuingOrganization}</p>
                <p className="resource-description">{cert.description}</p>
                <div className="resource-meta">
                  <span className="meta-item">
                    <strong>Cost:</strong> {cert.cost}
                  </span>
                  <span className="meta-item">
                    <strong>Exam Format:</strong> {cert.examFormat}
                  </span>
                  <span className="meta-item">
                    <strong>Prep Time:</strong> {cert.preparationTime}
                  </span>
                </div>
                {cert.url && (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resource-link"
                  >
                    Learn More →
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'local' && (
          <div className="local-resources">
            {localResources.map((resource) => (
              <div key={resource.id} className="resource-card">
                <h4>{resource.name}</h4>
                <p className="resource-type">{resource.type}</p>
                <p className="resource-description">{resource.description}</p>
                <div className="resource-contact">
                  {resource.address && (
                    <p>
                      <strong>Address:</strong> {resource.address}, {resource.city}
                    </p>
                  )}
                  {resource.phone && (
                    <p>
                      <strong>Phone:</strong> {resource.phone}
                    </p>
                  )}
                  {resource.email && (
                    <p>
                      <strong>Email:</strong> {resource.email}
                    </p>
                  )}
                </div>
                <div className="resource-services">
                  <strong>Services:</strong>
                  <ul>
                    {resource.services.map((service, idx) => (
                      <li key={idx}>{service}</li>
                    ))}
                  </ul>
                </div>
                {resource.website && (
                  <a
                    href={resource.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resource-link"
                  >
                    Visit Website →
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourcesList;
