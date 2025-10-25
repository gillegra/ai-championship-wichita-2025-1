import { Link } from 'react-router-dom';
import './shared.css';

interface HeaderProps {
  currentPage?: string;
}

const Header: React.FC<HeaderProps> = ({ currentPage }) => {
  return (
    <header className="app-header">
      <div className="header-content">
        <Link to="/" className="header-logo">
          <span className="logo-icon">🎯</span>
          <span className="logo-text">Kansas Career Pathways</span>
        </Link>

        <nav className="header-nav">
          <Link
            to="/"
            className={`nav-link ${currentPage === 'intake' ? 'active' : ''}`}
          >
            Get Started
          </Link>
          <Link
            to="/plan"
            className={`nav-link ${currentPage === 'plan' ? 'active' : ''}`}
          >
            My Plan
          </Link>
          <Link
            to="/progress"
            className={`nav-link ${currentPage === 'progress' ? 'active' : ''}`}
          >
            Progress
          </Link>
          <Link
            to="/agents"
            className={`nav-link ${currentPage === 'agents' ? 'active' : ''}`}
          >
            AI Assistants
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
