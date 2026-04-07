import { useEffect, useRef } from 'react';
import { skills } from '../data/portfolio';

export default function Skills() {
  const sectionRef = useRef(null);
  const cloudRef = useRef(null);

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

  // Skill float animations
  useEffect(() => {
    const cloud = cloudRef.current;
    if (!cloud) return;
    cloud.querySelectorAll('.skill-tag').forEach((tag) => {
      const dur = (8 + Math.random() * 8).toFixed(1);
      const delay = (Math.random() * -10).toFixed(1);
      tag.style.animation = `skillFloat ${dur}s ${delay}s ease-in-out infinite`;
    });
  }, []);

  return (
    <section className="skills-section" id="skills" ref={sectionRef}>
      <div className="container">
        <div className="section-label reveal">Technical Skills</div>
        <h2 className="section-headline reveal reveal-delay-1">The stack.</h2>
        <div className="skills-cloud reveal reveal-delay-2" ref={cloudRef}>
          {skills.map(({ label, size, ai }) => (
            <span
              key={label}
              className={`skill-tag skill-${size}${ai ? ' skill-ai' : ''}`}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
