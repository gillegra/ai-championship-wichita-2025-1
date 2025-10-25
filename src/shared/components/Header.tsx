import { Link, useLocation } from 'react-router-dom';
import './shared.css';

const Header: React.FC = () => {
  const location = useLocation();

  // Determine which challenge route is active based on current path
  const isActive = (path: string) => {
    if (path === '/reskill') {
      return location.pathname === '/' || location.pathname.startsWith('/reskill');
    }
    return location.pathname.startsWith(path);
  };

  // Determine which logo to show based on current route
  const getLogoConfig = () => {
    if (location.pathname.startsWith('/game')) {
      return {
        src: '/wichita-ttm-logo.webp',
        alt: 'Wichita to the Moon',
        linkTo: '/game'
      };
    }
    // Default to ReSkill logo for home and reskill routes
    return {
      src: '/assets/reskill-logo.webp',
      alt: 'ReSkill KS',
      linkTo: '/'
    };
  };

  const logoConfig = getLogoConfig();

  return (
    <header className="app-header">
      <div className="header-content">
        <Link to={logoConfig.linkTo} className="header-logo">
          <img src={logoConfig.src} alt={logoConfig.alt} className="logo-image" />
        </Link>

        <nav className="header-nav">
          <Link
            to="/reskill"
            className={`nav-link ${isActive('/reskill') ? 'active' : ''}`}
          >
            Reskill
          </Link>
          <Link
            to="/game"
            className={`nav-link ${isActive('/game') ? 'active' : ''}`}
          >
            Wichita to the Moon
          </Link>
          <Link
            to="/c3"
            className={`nav-link ${isActive('/c3') ? 'active' : ''}`}
          >
            Challenge 3
          </Link>
          <Link
            to="/c4"
            className={`nav-link ${isActive('/c4') ? 'active' : ''}`}
          >
            Challenge 4
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
