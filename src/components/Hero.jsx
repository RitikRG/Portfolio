import { useEffect, useRef } from 'react';
import { personalInfo, heroTags } from '../data/portfolio';

export default function Hero() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const bg = bgRef.current;
    if (!bg) return undefined;

    const spawnTag = () => {
      const el = document.createElement('div');
      el.className = 'float-tag';
      el.textContent = heroTags[Math.floor(Math.random() * heroTags.length)];
      el.style.left = Math.random() * 90 + '%';
      el.style.bottom = '-30px';
      el.style.animationDuration = 10 + Math.random() * 10 + 's';
      bg.appendChild(el);
      setTimeout(() => el.remove(), 22000);
    };

    const interval = setInterval(spawnTag, 1800);
    for (let i = 0; i < 5; i += 1) setTimeout(spawnTag, i * 400);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    let rafId = 0;
    const updateScrollProgress = () => {
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const start = viewportHeight * 0.88;
      const end = -rect.height * 0.18;
      const progress = Math.min(Math.max((start - rect.top) / (start - end), 0), 1);
      section.style.setProperty('--hero-scroll-progress', progress.toFixed(3));
    };

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(updateScrollProgress);
    };

    updateScrollProgress();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      contentRef.current?.querySelectorAll('.reveal').forEach((el) => {
        el.classList.add('visible');
      });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="hero" id="hero" ref={sectionRef}>
      <div className="hero-bg" ref={bgRef} />
      <div className="hero-content" ref={contentRef}>
        <h1 className="hero-main-copy hero-typing reveal reveal-delay-1">
          <span className="hero-type-line hero-type-line-1">Full-Stack Dev.</span>
          <span className="hero-type-line hero-type-line-2">AI Systems Builder.</span>
        </h1>
        <p className="hero-sub reveal reveal-delay-2">{personalInfo.subtitle}</p>
        <div className="hero-ctas reveal reveal-delay-3">
          <a
            href="#projects"
            className="btn-primary"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            View my work
          </a>
          <a href={personalInfo.github} className="btn-outline" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </div>
      <div className="scroll-hint">
        <div className="scroll-line" />
      </div>
    </section>
  );
}
