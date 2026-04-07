import { useEffect, useRef } from 'react';
import { about, stats } from '../data/portfolio';

export default function About() {
  const sectionRef = useRef(null);
  const numRef = useRef(null);

  // Reveal observer
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

  // Number parallax
  useEffect(() => {
    const num = numRef.current;
    if (!num) return;

    const handleScroll = () => {
      const section = num.closest('section');
      const rect = section.getBoundingClientRect();
      const progress = 1 - rect.bottom / window.innerHeight;
      num.style.transform = `rotateY(${progress * 20}deg)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="about-section" id="about" ref={sectionRef}>
      <div className="container">
        <div className="section-label reveal">About</div>
        <h2 className="section-headline reveal reveal-delay-1">The person behind the commits.</h2>

        <div className="about-grid">
          <div className="reveal reveal-delay-2">
            <div className="about-number" ref={numRef}>01</div>
          </div>
          <div>
            <div className="about-text reveal reveal-delay-2">
              {about.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="stats-row reveal reveal-delay-3">
              {stats.map((s) => (
                <div className="stat" key={s.label}>
                  <span className="stat-val">{s.value}</span>
                  <span className="stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
