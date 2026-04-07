import { useEffect, useRef } from 'react';
import { achievements } from '../data/portfolio';

export default function Achievements() {
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
    <section className="achieve-section" ref={sectionRef}>
      <div className="container">
        <div className="section-label reveal">Recognition</div>
        <h2 className="section-headline reveal reveal-delay-1">A few highlights.</h2>
        <div className="achieve-grid">
          {achievements.map((a, i) => (
            <div className={`achieve-card reveal reveal-delay-${i + 1}`} key={a.title}>
              <div className="achieve-num">{a.num}</div>
              <div className="achieve-title">{a.title}</div>
              <div className="achieve-sub">{a.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
