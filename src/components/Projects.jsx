import { useEffect, useRef } from 'react';
import { projects } from '../data/portfolio';
import { useCardTilt } from '../hooks/useAnimations';

function TagList({ tags }) {
  return (
    <div className="proj-tags">
      {tags.map((tag) => {
        const label = typeof tag === 'string' ? tag : tag.label;
        const ai = typeof tag === 'object' && tag.ai;
        return (
          <span key={label} className={`tag${ai ? ' skill-ai' : ''}`}>{label}</span>
        );
      })}
    </div>
  );
}

function ProjectCard({ project, delay }) {
  const tilt = useCardTilt();

  return (
    <div
      className={`proj-card${project.featured ? ' featured' : ''} reveal reveal-delay-${delay}`}
      {...tilt}
    >
      <div className="glare" />
      {project.wip && <div className="wip-badge">WIP</div>}
      <div className="proj-category">{project.category}</div>
      <h3 className="proj-title">{project.title}</h3>
      <p className="proj-desc">{project.desc}</p>
      <TagList tags={project.tags} />
      <div className="proj-links">
        {project.links.map((link) => (
          <a
            key={link.label}
            href={link.url}
            className="proj-link"
            target="_blank"
            rel="noreferrer"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);

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

  return (
    <section className="projects-section" id="projects" ref={sectionRef}>
      <div className="container">
        <div className="section-label reveal">Projects</div>
        <h2 className="section-headline reveal reveal-delay-1">Things I've built.</h2>
        <div className="projects-grid">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} delay={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
