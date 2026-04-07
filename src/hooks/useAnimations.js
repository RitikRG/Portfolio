import { useEffect, useRef } from 'react';

export function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12 }
    );

    const elements = el.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return ref;
}

export function useCardTilt() {
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    card.style.transform = `perspective(1000px) rotateY(${dx * 5}deg) rotateX(${-dy * 3}deg) translateZ(4px)`;

    const glare = card.querySelector('.glare');
    if (glare) {
      const px = ((e.clientX - rect.left) / rect.width * 100).toFixed(0);
      const py = ((e.clientY - rect.top) / rect.height * 100).toFixed(0);
      glare.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.4), transparent 60%)`;
    }
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = '';
  };

  return { onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave };
}
