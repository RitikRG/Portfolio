// Portfolio data — single source of truth

export const personalInfo = {
  name: 'Ritik Gupta',
  title: 'Full-Stack Dev. AI Systems Builder.',
  subtitle: 'Building production systems at the intersection of great UX and real AI. 3 internships. 1 agent live in the wild.',
  heroLabel: 'Open to remote · Full-Stack + AI',
  location: 'New Delhi, India',
  email: 'ritik.mpm@gmail.com',
  github: 'https://github.com/RitikRG',
  linkedin: 'https://linkedin.com/in/RgRitik',
  availableForWork: true,
};

export const stats = [
  { value: '9.41', label: 'GPA / 10' },
  { value: 'Top 1%', label: 'CodeVita S12' },
  { value: '3', label: 'Internships' },
];

export const about = {
  paragraphs: [
    "Final-year B.Voc Software Development student at Delhi University (Ramanujan College), currently interning as a Full Stack Developer at Vypzee. I build things that actually ship — ERP systems, AI agents, multi-tenant SaaS platforms.",
    "Competitive programmer ranked in the Top 1% globally at TCS CodeVita Season 12. I care deeply about clean architecture, measurable impact, and developer experience.",
  ],
};

export const featuredProject = {
  tag: 'WHATSAPP · AI AGENT · LIVE IN PRODUCTION',
  title: 'WhatsApp AI\nOrdering Agent',
  subtitle: 'Voice in, order placed. A 5-layer autonomous ordering system integrated into a full ERP.',
  liveUrl: 'https://rnr-erp.netlify.app',
  githubUrl: 'https://github.com/RitikRG',
  archFlow: [
    { icon: '📱', label: 'WhatsApp' },
    { icon: '🔗', label: 'Twilio' },
    { icon: '🎙️', label: 'Whisper STT' },
    { icon: '🧠', label: 'LLM Loop' },
    { icon: '⚙️', label: 'ERP Tools' },
    { icon: '🔊', label: 'ElevenLabs TTS' },
    { icon: '📱', label: 'Reply' },
  ],
  featStats: [
    { label: 'TOOLS', value: '12', desc: 'Custom LLM tools in autonomous loop' },
    { label: 'ARCHITECTURE', value: 'Multi-tenant', desc: 'Isolated inventory and SOPs per shop' },
    { label: 'RAG PIPELINE', value: 'Runtime', desc: 'Shop SOPs injected into prompt at runtime' },
  ],
};

export const experiences = [
  {
    company: 'Vypzee',
    date: 'Jan 2026 – Present',
    role: 'Full Stack Developer Intern',
    tags: ['React', 'TypeScript', 'Redux', 'Node.js', 'MySQL'],
    bullets: [
      'Revamped UI for Malls and Shops modules — modern, responsive, aligned with design system',
      'Architected an HLS-inspired image optimisation pipeline with container-aware bucketing via Sharp — serving correctly-sized images by viewport',
      'Built an App Visual Clone Builder enabling sales team to generate interactive demos on-the-fly with AI content population',
    ],
  },
  {
    company: 'Finsmart Softwares',
    date: 'Jul 2025 – Nov 2025',
    role: 'Software Developer Intern',
    tags: ['React Native', 'Redux', 'PHP', 'MySQL'],
    bullets: [
      ['Converted single-org ledger into a multi-tenant SaaS platform — ', '100+ clients onboarded', ' within the first month'],
      'Led development of a React Native Self-Ordering Kiosk with full backend API design and Redux state management',
      'Built Accounts and Manufacturing modules: transaction tracking, BOM creation, production scheduling, inventory management',
    ],
  },
  {
    company: 'Jobsify Job Portal',
    date: 'Mar 2025 – Oct 2025',
    role: 'Web Developer',
    tags: ['Laravel', 'Tailwind CSS', 'MySQL'],
    bullets: [
      ['Redesigned UI with Laravel Blade + Tailwind — ', '35% higher engagement', ', ', '50%+ more returning users'],
      ['Achieved ', '60% improvement', ' in page load performance'],
      ['Built a custom VPS-based promotional mail system handling ', '90,000+ emails/month'],
    ],
  },
];

export const skills = [
  { label: 'JavaScript', size: 'lg' },
  { label: 'TypeScript', size: 'lg' },
  { label: 'Python', size: 'md' },
  { label: 'PHP', size: 'sm' },
  { label: 'Java', size: 'sm' },
  { label: 'React.js', size: 'lg' },
  { label: 'Node.js', size: 'lg' },
  { label: 'Redux', size: 'md' },
  { label: 'Angular', size: 'md' },
  { label: 'React Native', size: 'md' },
  { label: 'Tailwind CSS', size: 'sm' },
  { label: 'Express.js', size: 'md' },
  { label: 'Laravel', size: 'sm' },
  { label: 'MongoDB', size: 'md' },
  { label: 'MySQL', size: 'sm' },
  { label: 'Milvus', size: 'sm' },
  { label: 'LLM Tool Calling', size: 'lg', ai: true },
  { label: 'RAG Pipelines', size: 'lg', ai: true },
  { label: 'OpenRouter', size: 'md', ai: true },
  { label: 'Groq API', size: 'md', ai: true },
  { label: 'Whisper STT', size: 'md', ai: true },
  { label: 'ElevenLabs TTS', size: 'md', ai: true },
  { label: 'Prompt Engineering', size: 'sm', ai: true },
  { label: 'Twilio', size: 'sm' },
  { label: 'Supabase', size: 'sm' },
  { label: 'Razorpay', size: 'sm' },
  { label: 'Netlify', size: 'sm' },
];

export const projects = [
  {
    featured: true,
    category: 'PRODUCTION · ERP + AI AGENT',
    title: 'RNR ERP',
    desc: 'Full-featured retail ERP covering inventory, billing, ledger, and reporting — plus a WhatsApp AI ordering agent with voice-in, order-placed capability. Live and in active production use.',
    tags: ['Angular', 'Node.js', 'MongoDB', { label: 'OpenRouter', ai: true }, { label: 'Twilio', ai: true }, { label: 'Whisper', ai: true }],
    links: [
      { label: 'Live ↗', url: 'https://rnr-erp.netlify.app' },
      { label: 'GitHub ↗', url: 'https://github.com/RitikRG' },
    ],
  },
  {
    category: 'SOCIAL PLATFORM',
    title: 'RConnect',
    desc: 'College-exclusive platform for anonymous/public posts, polls, and reactions. Instagram-inspired feed with real-time sync via Supabase.',
    tags: ['React', 'Redux', 'Supabase'],
    links: [
      { label: 'GitHub ↗', url: 'https://github.com/RitikRG' },
    ],
  },
  {
    wip: true,
    category: 'VS CODE EXTENSION',
    title: 'repo-visualizer',
    desc: 'VS Code extension for visualising code structure and tech debt in vibe-coded projects. AST parsing via ts-morph + force-directed graph via D3.js inside a Webview panel.',
    tags: ['TypeScript', 'ts-morph', 'D3.js', 'VS Code API'],
    links: [
      { label: 'GitHub ↗', url: 'https://github.com/RitikRG' },
    ],
  },
];

export const achievements = [
  {
    num: 'Top 1%',
    title: 'TCS CodeVita Season 12',
    sub: 'Rank 532 out of 200,000+ participants globally',
  },
  {
    num: 'Runner-up',
    title: 'Overload++ DSA Competition',
    sub: 'ANDC, Delhi University — competitive DSA contest',
  },
  {
    num: '9.41',
    title: 'GPA — Delhi University',
    sub: 'B.Voc. Software Development, Ramanujan College (2022–2027)',
  },
];

export const heroTags = ['React', 'TypeScript', 'Node.js', 'MongoDB', 'LLM', 'RAG', 'Twilio', 'Whisper', 'Express', 'Redux', 'Angular', 'Python', 'Groq', 'ElevenLabs'];
