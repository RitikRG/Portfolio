import { useEffect, useRef } from "react";
import { personalInfo } from "../data/portfolio";

export default function Contact() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.12 }
    );

    section.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="contact-section" id="contact" ref={sectionRef}>
      <div className="container">
        <div className="contact-inner">
          <div
            className="section-label reveal"
            style={{ justifyContent: "center", display: "flex" }}
          >
            Open for Collaboration
          </div>
          <h2
            className="section-headline reveal reveal-delay-1"
            style={{ textAlign: "center" }}
          >
            Let's build
            <br />
            something.
          </h2>
          <p className="reveal reveal-delay-2"></p>
          <a
            href={`mailto:${personalInfo.email}`}
            className="btn-primary reveal reveal-delay-3"
          >
            Send a message →
          </a>
          <div className="contact-links reveal reveal-delay-4">
            <a
              href={personalInfo.linkedin}
              className="contact-link"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn ↗
            </a>
            <a
              href={personalInfo.github}
              className="contact-link"
              target="_blank"
              rel="noreferrer"
            >
              GitHub ↗
            </a>
            <a href={`mailto:${personalInfo.email}`} className="contact-link">
              Email ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
