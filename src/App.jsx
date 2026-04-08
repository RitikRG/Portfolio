import { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import FeaturedProject from './components/FeaturedProject';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';

const SPLASH_START_DELAY_MS = 500;
const SPLASH_STEP_MS = 500;
const SPLASH_TOTAL_MS = SPLASH_START_DELAY_MS + (SPLASH_STEP_MS * 10);
const SPLASH_EXIT_MS = 700;

const splashGreetings = [
  { id: 'en', text: "Hello, I'm Ritik", dir: 'ltr' },
  { id: 'hi', text: 'नमस्ते, मैं रितिक हूँ', dir: 'ltr' },
  { id: 'es', text: 'Hola, soy Ritik', dir: 'ltr' },
  { id: 'de', text: 'Hallo, ich bin Ritik', dir: 'ltr' },
  { id: 'ko', text: '안녕하세요, 저는 리틱입니다', dir: 'ltr' },
  { id: 'it', text: 'Ciao, sono Ritik', dir: 'ltr' },
  { id: 'fr', text: 'Bonjour, je suis Ritik', dir: 'ltr' },
  { id: 'no', text: 'Hei, jeg heter Ritik', dir: 'ltr' },
  { id: 'ar', text: 'مرحبًا، أنا ريتيك', dir: 'rtl' },
  { id: 'ru', text: 'Привет, я Ритик', dir: 'ltr' },
];

function SplashScreen({ greeting, isExiting }) {
  return (
    <div className={`app-splash${isExiting ? ' is-exiting' : ''}`}>
      <div className="app-splash-inner">
        <div className="app-splash-stage" role="status" aria-live="polite">
          {greeting ? (
            <p
              key={greeting.id}
              className="app-splash-message"
              lang={greeting.id}
              dir={greeting.dir}
            >
              {greeting.text}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function AppShell() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <FeaturedProject />
        <Experience />
        <Skills />
        <Projects />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  const [greetingIndex, setGreetingIndex] = useState(-1);
  const [isSplashActive, setIsSplashActive] = useState(true);
  const [isSplashExiting, setIsSplashExiting] = useState(false);
  const [hasEnteredSite, setHasEnteredSite] = useState(false);

  useEffect(() => {
    const greetingTimers = splashGreetings.map((_, index) =>
      window.setTimeout(() => {
        setGreetingIndex(index);
      }, SPLASH_START_DELAY_MS + (index * SPLASH_STEP_MS))
    );

    const exitTimer = window.setTimeout(() => {
      setHasEnteredSite(true);
      setIsSplashExiting(true);
    }, SPLASH_TOTAL_MS);

    const cleanupTimer = window.setTimeout(() => {
      setIsSplashActive(false);
    }, SPLASH_TOTAL_MS + SPLASH_EXIT_MS);

    return () => {
      greetingTimers.forEach((timer) => window.clearTimeout(timer));
      window.clearTimeout(exitTimer);
      window.clearTimeout(cleanupTimer);
    };
  }, []);

  const currentGreeting = useMemo(
    () => (greetingIndex >= 0 ? splashGreetings[Math.min(greetingIndex, splashGreetings.length - 1)] : null),
    [greetingIndex]
  );

  return (
    <>
      {hasEnteredSite && (
        <div className={`app-shell${isSplashExiting ? ' is-entering' : ''}`}>
          <AppShell />
        </div>
      )}
      {isSplashActive && <SplashScreen greeting={currentGreeting} isExiting={isSplashExiting} />}
    </>
  );
}
