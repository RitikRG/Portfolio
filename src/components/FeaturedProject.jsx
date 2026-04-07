import React, { useEffect, useRef } from 'react';
import { featuredProject } from '../data/portfolio';

export default function FeaturedProject() {
  const sectionRef = useRef(null);
  const archRef = useRef(null);

  // General reveal
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible');
        });
      },
      { threshold: 0.12 }
    );

    section.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Arch diagram animation
  useEffect(() => {
    const arch = archRef.current;
    if (!arch) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const nodes = e.target.querySelectorAll('.arch-node');
            const arrows = e.target.querySelectorAll('.arch-arrow');
            nodes.forEach((n, i) => setTimeout(() => n.classList.add('visible'), 300 + i * 120));
            arrows.forEach((a, i) => setTimeout(() => a.classList.add('visible'), 500 + i * 130));
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(arch);
    return () => observer.disconnect();
  }, []);

  const titleLines = featuredProject.title.split('\n');

  return (
    <section className="featured-section" id="featured" ref={sectionRef}>
      <div className="container">
        <div className="section-label reveal">Featured Project</div>
        <h2 className="section-headline reveal reveal-delay-1">The one that made it to production.</h2>

        <div className="feat-card reveal reveal-delay-2">
          <div className="feat-tag">{featuredProject.tag}</div>
          <h3 className="feat-title">
            {titleLines.map((line, i) => (
              <span key={i}>{line}{i < titleLines.length - 1 && <br />}</span>
            ))}
          </h3>
          <p className="feat-sub">{featuredProject.subtitle}</p>

          <div className="arch-diagram" ref={archRef}>
            <div className="arch-flow">
              {featuredProject.archFlow.map((node, i) => (
                <React.Fragment key={i}>
                  <div className="arch-node">
                    <div className="arch-icon">{node.icon}</div>
                    <div className="arch-label">{node.label}</div>
                  </div>
                  {i < featuredProject.archFlow.length - 1 && (
                    <div className="arch-arrow" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="feat-stats">
            {featuredProject.featStats.map((s) => (
              <div className="feat-stat reveal" key={s.label}>
                <div className="feat-stat-label">{s.label}</div>
                <div className="feat-stat-val">{s.value}</div>
                <div className="feat-stat-desc">{s.desc}</div>
              </div>
            ))}
          </div>

          <div className="feat-ctas">
            <a href={featuredProject.liveUrl} className="btn-primary" target="_blank" rel="noreferrer">
              View Live ↗
            </a>
            <a href={featuredProject.githubUrl} className="btn-outline" target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
