import { useEffect, useState } from 'react';
import { personalInfo } from '../data/portfolio';

export default function Navbar() {
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

        <button
          className="nav-mobile-btn"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className={`nav-mobile-menu${mobileOpen ? ' open' : ''}`}>
        {links.map((l) => (
          <a key={l} onClick={() => scrollTo(l.toLowerCase())} href={`#${l.toLowerCase()}`}>
            {l}
          </a>
        ))}
      </div>
    </>
  );
}
