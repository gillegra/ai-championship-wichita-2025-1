import { useNavigate } from 'react-router-dom';
import './landing.css';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <div className="landing-container">
        {/* Header Badge */}
        <div className="demo-badge">KANSAS DEPARTMENT OF LABOR (DEMO)</div>

        {/* Main Content Grid */}
        <div className="landing-grid">
          {/* Left Column - Hero */}
          <div className="landing-hero">
            <h1 className="hero-title">Upskill faster. Land the job.</h1>

            <p className="hero-description">
              ReSkill KS helps Kansans discover in-demand careers, match to local training and scholarships, and follow a step-by-step plan with built-in support.
            </p>

            {/* CTA Buttons */}
            <div className="cta-buttons">
              <button
                className="btn-cta btn-primary-cta"
                onClick={() => navigate('/reskill/intake')}
              >
                Start your 3-minute intake
              </button>
              <button
                className="btn-cta btn-secondary-cta"
                onClick={() => navigate('/reskill/progress')}
              >
                See Wichita resources
              </button>
            </div>

            <p className="privacy-note">
              Privacy-first demo: your data is stored only in your browser.
            </p>
          </div>

          {/* Right Column - Benefits */}
          <div className="landing-benefits">
            <div className="benefits-card">
              <h2 className="benefits-title">What you get</h2>
              <ul className="benefits-list">
                <li>Personalized career recommendations aligned to Wichita labor demand</li>
                <li>Training programs and scholarships (Kansas Promise, Wichita Promise)</li>
                <li>Actionable tasks, reminders, and progress tracking</li>
                <li>Connections to community partners for childcare, GED/ESL, and more</li>
              </ul>
              <div className="demo-notice">
                <span className="demo-label">Demo</span>
                <span className="demo-text">This is a static prototype for evaluation.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Challenge Showcase */}
        <div className="challenges-showcase">
          <h2 className="showcase-title">AI Championship Wichita 2025 - Architect Track</h2>

          <div className="feature-cards">
            <div className="feature-card featured-primary">
              <div className="challenge-badge">Challenge 1 - Primary</div>
              <h3 className="feature-title">ReSkill KS</h3>
              <p className="feature-description">
                AI-powered career transition platform with conversational intake, personalized planning, and progress tracking for Kansas workers.
              </p>
              <button
                className="btn-feature btn-primary"
                onClick={() => navigate('/reskill/intake')}
              >
                Start Career Assessment →
              </button>
            </div>

            <div className="feature-card">
              <div className="challenge-badge">Challenge 2</div>
              <h3 className="feature-title">Interactive Game</h3>
              <p className="feature-description">
                Gamified experience demonstrating AI-driven interactions and engagement patterns.
              </p>
              <button
                className="btn-feature"
                onClick={() => navigate('/game')}
              >
                Play Game →
              </button>
            </div>

            <div className="feature-card">
              <div className="challenge-badge">Challenge 3</div>
              <h3 className="feature-title">Wichita Tech Scene</h3>
              <p className="feature-description">
                Mockup showcasing Wichita's growing technology ecosystem and innovation community.
              </p>
              <button
                className="btn-feature"
                onClick={() => navigate('/c3')}
              >
                View Mockup →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
