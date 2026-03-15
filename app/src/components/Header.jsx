import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Link to="/">Forest City Digital</Link>
          </div>
          <nav className={`nav ${navOpen ? 'active' : ''}`}>
            <ul>
              <li><Link to="/" onClick={() => setNavOpen(false)}>Home</Link></li>
              <li><a href="/#work" onClick={() => setNavOpen(false)}>Our Work</a></li>
              <li><a href="/#packages" onClick={() => setNavOpen(false)}>Packages</a></li>
              <li><Link to="/contact" onClick={() => setNavOpen(false)}>Contact</Link></li>
              <li><Link to="/portfolio" onClick={() => setNavOpen(false)}>Portfolio</Link></li>
            </ul>
          </nav>
          <Link to="/contact" className="btn btn-primary mobile-hidden">Get Started</Link>
          <button
            type="button"
            className={`mobile-menu-toggle ${navOpen ? 'active' : ''}`}
            aria-label="Toggle menu"
            onClick={() => setNavOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
