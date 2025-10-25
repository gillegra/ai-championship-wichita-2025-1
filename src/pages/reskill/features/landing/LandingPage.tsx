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

        {/* Feature Cards */}
        <div className="feature-cards">
          <div className="feature-card">
            <h3 className="feature-title">In-demand Careers</h3>
            <p className="feature-description">
              See roles growing in the Wichita region and what they pay.
            </p>
            <button
              className="btn-feature"
              onClick={() => navigate('/reskill/intake')}
            >
              Explore careers
            </button>
          </div>

          <div className="feature-card">
            <h3 className="feature-title">Scholarships & Aid</h3>
            <p className="feature-description">
              Learn about the <strong>Kansas Promise Scholarship</strong> and <strong>Wichita Promise</strong> pathways.
            </p>
            <button
              className="btn-feature"
              onClick={() => navigate('/reskill/intake')}
            >
              See scholarships
            </button>
          </div>

          <div className="feature-card">
            <h3 className="feature-title">Support Services</h3>
            <p className="feature-description">
              Find GED, ESL, and resume help via NexStep Alliance and Wichita Public Library.
            </p>
            <button
              className="btn-feature"
              onClick={() => navigate('/reskill/intake')}
            >
              Find support
            </button>
          </div>
        </div>

        {/* Challenge Navigation */}
        <div className="challenges-section">
          <h2 className="challenges-title">AI Championship Wichita Challenges</h2>
          <div className="challenges-grid">
            <div className="challenge-card">
              <div className="challenge-number">Challenge 1</div>
              <h3 className="challenge-name">ReSkill KS</h3>
              <p className="challenge-description">
                Career transition platform with AI-guided intake and personalized planning.
              </p>
              <button
                className="btn-challenge"
                onClick={() => navigate('/reskill/intake')}
              >
                Start Challenge →
              </button>
            </div>

            <div className="challenge-card">
              <div className="challenge-number">Challenge 2</div>
              <h3 className="challenge-name">Game Challenge</h3>
              <p className="challenge-description">
                Interactive game experience (details TBD).
              </p>
              <button
                className="btn-challenge"
                onClick={() => navigate('/game')}
              >
                View Challenge →
              </button>
            </div>

            <div className="challenge-card">
              <div className="challenge-number">Challenge 3</div>
              <h3 className="challenge-name">Challenge 3</h3>
              <p className="challenge-description">
                Coming soon - details to be announced.
              </p>
              <button
                className="btn-challenge"
                onClick={() => navigate('/c3')}
              >
                View Challenge →
              </button>
            </div>

            <div className="challenge-card">
              <div className="challenge-number">Challenge 4</div>
              <h3 className="challenge-name">Challenge 4</h3>
              <p className="challenge-description">
                Coming soon - details to be announced.
              </p>
              <button
                className="btn-challenge"
                onClick={() => navigate('/c4')}
              >
                View Challenge →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
