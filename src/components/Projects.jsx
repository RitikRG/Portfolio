import { useEffect, useMemo, useRef, useState } from 'react';
import { projects } from '../data/portfolio';
import { useCardTilt } from '../hooks/useAnimations';

const DESKTOP_PREVIEW_WIDTH = 1440;
const CARD_PREVIEW_HEIGHT = 900;
const MODAL_PREVIEW_HEIGHT = 900;

function TagList({ tags }) {
  return (
    <div className="proj-tags">
      {tags.map((tag) => {
        const label = typeof tag === 'string' ? tag : tag.label;
        const ai = typeof tag === 'object' && tag.ai;
        return (
          <span key={label} className={`tag${ai ? ' skill-ai' : ''}`}>
            {label}
          </span>
        );
      })}
    </div>
  );
}

function hasProjectTag(project, targetLabel) {
  return project.tags.some((tag) => {
    const label = typeof tag === 'string' ? tag : tag.label;
    return label === targetLabel;
  });
}

function LivePreview({ project, interactive = false, modal = false }) {
  const [status, setStatus] = useState(() => (project.hasLivePreview ? 'loading' : 'unavailable'));
  const frameRef = useRef(null);
  const desktopHeight = modal ? MODAL_PREVIEW_HEIGHT : CARD_PREVIEW_HEIGHT;
  const [previewScale, setPreviewScale] = useState(1);

  useEffect(() => {
    if (!project.hasLivePreview || !project.liveUrl || status !== 'loading') return undefined;
    const timer = window.setTimeout(() => {
      setStatus((current) => (current === 'loading' ? 'fallback' : current));
    }, 6000);

    return () => window.clearTimeout(timer);
  }, [project.hasLivePreview, project.liveUrl, status]);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return undefined;

    const updateScale = () => {
      const nextScale = Math.min(frame.clientWidth / DESKTOP_PREVIEW_WIDTH, 1);
      setPreviewScale(nextScale || 1);
    };

    updateScale();

    const observer = new ResizeObserver(() => {
      updateScale();
    });

    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  if (!project.hasLivePreview || !project.liveUrl || status === 'unavailable') {
    return (
      <div className={`project-preview-shell${modal ? ' modal-shell' : ''}`}>
        <div className="project-preview-topbar">
          <span />
          <span />
          <span />
        </div>
        <div
          ref={frameRef}
          className={`project-preview-frame${modal ? ' modal-frame' : ''}`}
          style={{ height: `${desktopHeight * previewScale}px` }}
        >
          <div className="project-preview-placeholder">
            <strong>Live preview unavailable</strong>
            <span>Project details and external links are available below.</span>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'fallback') {
    return (
      <div className={`project-preview-shell${modal ? ' modal-shell' : ''}`}>
        <div className="project-preview-topbar">
          <span />
          <span />
          <span />
        </div>
        <div
          ref={frameRef}
          className={`project-preview-frame${modal ? ' modal-frame' : ''}`}
          style={{ height: `${desktopHeight * previewScale}px` }}
        >
          <div className="project-preview-placeholder">
            <strong>Embedded preview blocked or still loading</strong>
            <span>Open the live site in a new tab if this preview does not render.</span>
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="proj-link">
              Open live site
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`project-preview-shell${modal ? ' modal-shell' : ''}`}>
      <div className="project-preview-topbar">
        <span />
        <span />
        <span />
      </div>
      <div
        ref={frameRef}
        className={`project-preview-frame${modal ? ' modal-frame' : ''}`}
        style={{ height: `${desktopHeight * previewScale}px` }}
      >
        <div
          className="project-preview-canvas"
          style={{
            width: `${DESKTOP_PREVIEW_WIDTH}px`,
            height: `${desktopHeight}px`,
            transform: `scale(${previewScale})`,
          }}
        >
          <iframe
            src={project.liveUrl}
            title={`${project.title} live preview`}
            className="project-preview-iframe"
            loading="lazy"
            onLoad={() => setStatus('loaded')}
          />
          {!interactive && <div className="project-preview-overlay" aria-hidden="true" />}
        </div>
        {status === 'loading' && <div className="project-preview-status">Loading live preview...</div>}
      </div>
    </div>
  );
}

function ProjectCard({ project, delay, onOpen }) {
  const tilt = useCardTilt();
  const openProject = () => onOpen(project);
  const isUnderConstruction = hasProjectTag(project, 'Under Construction');

  return (
    <div
      className={`proj-card reveal reveal-delay-${delay}`}
      onClick={openProject}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openProject();
        }
      }}
      role="button"
      tabIndex={0}
      aria-haspopup="dialog"
      aria-label={`Open ${project.title} project details`}
      {...tilt}
    >
      <div className="glare" />
      {!isUnderConstruction && <LivePreview project={project} />}
      <div className="proj-category">{project.category}</div>
      <h3 className="proj-title">{project.title}</h3>
      <p className="proj-desc">{project.desc}</p>
      <TagList tags={project.tags} />
      <div className="proj-card-cta">{isUnderConstruction ? 'View details' : 'Open preview'}</div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isShowAllOpen, setIsShowAllOpen] = useState(false);

  const primaryProjects = useMemo(
    () => projects.filter((project) => project.showInPrimaryGrid),
    []
  );
  const secondaryProjects = useMemo(
    () => projects.filter((project) => !project.showInPrimaryGrid),
    []
  );
  const isSelectedProjectUnderConstruction = selectedProject
    ? hasProjectTag(selectedProject, 'Under Construction')
    : false;
  const selectedProjectLinks = selectedProject
    ? selectedProject.links.filter((link) => {
        if (!isSelectedProjectUnderConstruction) return true;
        return !link.label.toLowerCase().includes('github');
      })
    : [];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.12 }
    );

    section.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isShowAllOpen]);

  useEffect(() => {
    if (!selectedProject) return undefined;

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedProject(null);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [selectedProject]);

  return (
    <section className="projects-section" id="projects" ref={sectionRef}>
      <div className="container">
        <div className="section-label reveal">Projects</div>
        <h2 className="section-headline reveal reveal-delay-1">Things I&apos;ve built.</h2>

        <div className="projects-grid primary-grid">
          {primaryProjects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              delay={i + 1}
              onOpen={setSelectedProject}
            />
          ))}
        </div>

        <button
          type="button"
          className="show-all-toggle reveal reveal-delay-4"
          onClick={() => setIsShowAllOpen((open) => !open)}
          aria-expanded={isShowAllOpen}
          aria-controls="more-projects"
        >
          {isShowAllOpen ? 'Show less' : 'Show all'}
          <span>
            {isShowAllOpen ? 'Hide the remaining 2 projects' : 'Reveal the remaining 2 projects'}
          </span>
        </button>

        {isShowAllOpen && (
          <div className="projects-grid secondary-grid" id="more-projects">
            {secondaryProjects.map((project) => (
              <ProjectCard
                key={project.title}
                project={project}
                delay={1}
                onOpen={setSelectedProject}
              />
            ))}
          </div>
        )}
      </div>

      {selectedProject && (
        <div
          className="project-modal-backdrop"
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) setSelectedProject(null);
          }}
        >
          <div
            className="project-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
          >
            <button
              type="button"
              className="project-modal-close"
              onClick={() => setSelectedProject(null)}
              aria-label="Close project modal"
            >
              x
            </button>

            {!isSelectedProjectUnderConstruction && (
              <LivePreview key={selectedProject.title} project={selectedProject} interactive modal />
            )}

            <div className="project-modal-body">
              <div className="proj-category">{selectedProject.category}</div>
              <h3 className="proj-title" id="project-modal-title">
                {selectedProject.title}
              </h3>
              <p className="proj-desc modal-desc">{selectedProject.desc}</p>
              <TagList tags={selectedProject.tags} />
              {selectedProjectLinks.length > 0 && (
                <div className="proj-links modal-links">
                  {selectedProjectLinks.map((link) => (
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
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
