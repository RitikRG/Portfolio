import { useEffect, useRef } from 'react';
import { personalInfo, heroTags } from '../data/portfolio';

export default function Hero() {
  const bgRef = useRef(null);
  const contentRef = useRef(null);

  // Floating tags
  useEffect(() => {
    const bg = bgRef.current;
    if (!bg) return;

    const spawnTag = () => {
      const el = document.createElement('div');
      el.className = 'float-tag';
      el.textContent = heroTags[Math.floor(Math.random() * heroTags.length)];
      el.style.left = Math.random() * 90 + '%';
      el.style.bottom = '-30px';
      el.style.animationDuration = (10 + Math.random() * 10) + 's';
      bg.appendChild(el);
      setTimeout(() => el.remove(), 22000);
    };

    const interval = setInterval(spawnTag, 1800);
    for (let i = 0; i < 5; i++) setTimeout(spawnTag, i * 400);

    return () => clearInterval(interval);
  }, []);

  // Hero reveal
  useEffect(() => {
    const timer = setTimeout(() => {
      contentRef.current?.querySelectorAll('.reveal').forEach((el) =>
        el.classList.add('visible')
      );
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="hero" id="hero">
      <div className="hero-bg" ref={bgRef} />
      <div className="hero-content" ref={contentRef}>
        <div className="hero-label reveal">
          <span className="dot" />
          {personalInfo.heroLabel}
        </div>
        <h1 className="reveal reveal-delay-1">
          Full-Stack Dev<span className="accent">.</span>
          <br />
          AI Systems Builder<span className="accent">.</span>
        </h1>
        <p className="hero-sub reveal reveal-delay-2">
          {personalInfo.subtitle}
        </p>
        <div className="hero-ctas reveal reveal-delay-3">
          <a href="#projects" className="btn-primary" onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}>
            View my work ↓
          </a>
          <a href={personalInfo.github} className="btn-outline" target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
        </div>
      </div>
      <div className="scroll-hint">
        <div className="scroll-line" />
      </div>
    </section>
  );
}
