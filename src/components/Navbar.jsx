import { useEffect, useState } from 'react';
import { personalInfo } from '../data/portfolio';

export default function Navbar({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  const links = ['About', 'Work', 'Projects', 'Contact'];

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <span className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          {personalInfo.name}
        </span>

        <ul className="nav-links">
          {links.map((l) => (
            <li key={l}>
              <a onClick={() => scrollTo(l.toLowerCase())} href={`#${l.toLowerCase()}`}>
                {l}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <button
            type="button"
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-pressed={theme === 'dark'}
          >
            <span className="theme-toggle-icon" aria-hidden="true">
              <span className="theme-toggle-sun" />
              <span className="theme-toggle-moon" />
            </span>
          </button>

          <button
            type="button"
            className="nav-mobile-btn"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            aria-controls="nav-mobile-menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div className={`nav-mobile-menu${mobileOpen ? ' open' : ''}`} id="nav-mobile-menu">
        {links.map((l) => (
          <a key={l} onClick={() => scrollTo(l.toLowerCase())} href={`#${l.toLowerCase()}`}>
            {l}
          </a>
        ))}
      </div>
    </>
  );
}
