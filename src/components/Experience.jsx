import { useEffect, useRef } from 'react';
import { experiences } from '../data/portfolio';
import { useCardTilt } from '../hooks/useAnimations';

function BulletContent({ bullet }) {
  if (typeof bullet === 'string') return <>{bullet}</>;
  return (
    <>
      {bullet.map((part, i) =>
        i % 2 === 1 ? (
          <span className="exp-metric" key={i}>{part}</span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

function ExpCard({ exp }) {
  const tilt = useCardTilt();

  return (
    <div className="exp-card reveal" {...tilt}>
      <div className="glare" />
      <div className="exp-header">
        <div>
          <div className="exp-company">{exp.company}</div>
          <div className="exp-date">{exp.date}</div>
        </div>
      </div>
      <div className="exp-role">{exp.role}</div>
      <div className="exp-tags">
        {exp.tags.map((tag) => (
          <span className="tag" key={tag}>{tag}</span>
        ))}
      </div>
      <ul className="exp-bullets">
        {exp.bullets.map((bullet, i) => (
          <li key={i}>
            <BulletContent bullet={bullet} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Experience() {
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
    <section className="exp-section" id="work" ref={sectionRef}>
      <div className="container">
        <div className="section-label reveal">Experience</div>
        <h2 className="section-headline reveal reveal-delay-1">Where I've shipped.</h2>
        <div className="timeline">
          {experiences.map((exp) => (
            <ExpCard exp={exp} key={exp.company} />
          ))}
        </div>
      </div>
    </section>
  );
}
