import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Github, Linkedin, Mail, BookOpen, ArrowRight } from 'lucide-react';
import { CONFIG } from '../config';

const STACK = [
  { cat: 'LANGUAGES', items: 'TypeScript  ·  Python  ·  Go' },
  { cat: 'FRONTEND',  items: 'React  ·  Next.js  ·  Tailwind CSS' },
  { cat: 'BACKEND',   items: 'Node.js  ·  FastAPI  ·  GraphQL' },
  { cat: 'DATABASE',  items: 'PostgreSQL  ·  Redis  ·  MongoDB' },
  { cat: 'DEVOPS',    items: 'Docker  ·  AWS  ·  Vercel  ·  GitHub Actions' },
];

// ── Animation helpers ──────────────────────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
}

// Slide up + fade in (for section headings, newsletter)
function Reveal({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// Slide in from left (for stack rows)
function RevealLeft({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInView(0.1);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateX(0)' : 'translateX(-20px)',
        transition: `opacity 0.5s ease-out ${delay}ms, transform 0.5s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ── Components ─────────────────────────────────────────────────────────────

const Cursor = () => (
  <span className="inline-block w-2 h-[1.1em] bg-green-500 ml-1 align-middle animate-blink" />
);

// ── Page ──────────────────────────────────────────────────────────────────

export default function CoderPage() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const anim = (delay) => ({
    animation: `fadeUp 0.6s ease-out ${delay}ms both`,
  });

  return (
    <div
      className="min-h-screen bg-[#0d0d0d] text-[#d4d4d4] selection:bg-green-500 selection:text-black"
      style={{ fontFamily: '"JetBrains Mono", monospace' }}
    >

      {/* ── NAV ── */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0d0d0d]/92 backdrop-blur-md border-b border-green-900/25 py-4'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
          <div className="text-sm flex items-center gap-0.5 leading-none" style={{ color: '#d4d4d4' }}>
            <span style={{ color: '#22c55e' }}>andreasoro</span>
            <span style={{ color: '#444' }}>@</span>
            <span style={{ color: '#888' }}>dev</span>
            <span style={{ color: '#444' }}>:~$</span>
            <Cursor />
          </div>
          <div className="flex items-center gap-5">
            <button
              onClick={() => navigate('/dance')}
              className="text-xs text-[#666] hover:text-green-500 transition-colors tracking-widest uppercase border border-[#2a2a2a] hover:border-green-900/60 px-3 py-1.5 hidden sm:block"
            >
              ./dance.sh
            </button>
            <a href={CONFIG.socials.github} target="_blank" rel="noopener noreferrer" className="text-[#666] hover:text-green-500 transition-colors">
              <Github size={17} />
            </a>
            <a href={CONFIG.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#666] hover:text-green-500 transition-colors">
              <Linkedin size={17} />
            </a>
            <a href={`mailto:${CONFIG.email}`} className="text-[#666] hover:text-green-500 transition-colors">
              <Mail size={17} />
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <header className="min-h-screen flex items-center pt-24 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(#22c55e 1px, transparent 1px), linear-gradient(90deg, #22c55e 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            opacity: 0.035,
          }}
        />
        <div
          className="absolute top-1/2 left-0 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle at center, rgba(34,197,94,0.06) 0%, transparent 65%)' }}
        />

        <div className="max-w-5xl mx-auto px-6 relative z-10 py-24">

          <div className="space-y-1 mb-8 text-sm" style={anim(100)}>
            <div>
              <span style={{ color: '#22c55e' }}>$ </span>
              <span style={{ color: '#888' }}>whoami</span>
            </div>
          </div>

          <h1
            className="font-bold text-white leading-[0.88] tracking-tighter mb-8"
            style={{ fontSize: 'clamp(3.5rem, 9vw, 7.5rem)', ...anim(280) }}
          >
            ANDREA<br />
            <span style={{ color: '#22c55e' }}>SORO</span>
          </h1>

          <div className="space-y-1 mb-12 text-sm" style={{ color: '#555', ...anim(480) }}>
            <div><span style={{ color: '#3a5a3a' }}>/**</span></div>
            <div>&nbsp;* Full-stack developer. <span style={{ color: '#22c55e' }}>Code poet.</span> Systems thinker.</div>
            <div>&nbsp;* Building things that live at the intersection</div>
            <div>&nbsp;* of logic, craft, and human experience.</div>
            <div><span style={{ color: '#3a5a3a' }}> */</span></div>
          </div>

          <div className="flex flex-wrap gap-4" style={anim(680)}>
            <a
              href={`mailto:${CONFIG.email}`}
              className="flex items-center gap-2 bg-green-500 text-black px-6 py-3 text-xs font-bold tracking-widest uppercase hover:bg-green-400 transition-colors"
            >
              <Mail size={13} /> contact.me()
            </a>
            <a
              href={CONFIG.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-[#2a2a2a] text-[#888] px-6 py-3 text-xs tracking-widest uppercase hover:border-green-900/70 hover:text-green-500 transition-colors"
            >
              <Github size={13} /> github.profile()
            </a>
          </div>

          <div className="mt-20 flex items-center gap-3 text-[#3a3a3a] text-xs tracking-widest" style={anim(850)}>
            <div className="h-10 w-px bg-gradient-to-b from-green-500/40 to-transparent" />
            SCROLL
          </div>
        </div>
      </header>

      {/* ── TECH STACK ── */}
      <section className="py-20 border-t border-[#1a1a1a]">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal className="mb-10">
            <div className="text-sm mb-3">
              <span style={{ color: '#22c55e' }}>$ </span>
              <span style={{ color: '#888' }}>cat stack.txt</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tighter">TECH STACK</h2>
            <div className="h-px w-10 bg-green-500 mt-3" />
          </Reveal>

          <div className="space-y-0">
            {STACK.map((row, i) => (
              <RevealLeft key={row.cat} delay={i * 80}>
                <div
                  className={`grid items-center gap-6 py-4 ${i < STACK.length - 1 ? 'border-b border-[#1a1a1a]' : ''}`}
                  style={{ gridTemplateColumns: '130px 1fr' }}
                >
                  <span className="text-xs tracking-widest" style={{ color: '#22c55e' }}>{row.cat}</span>
                  <span className="text-sm" style={{ color: '#888' }}>{row.items}</span>
                </div>
              </RevealLeft>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="py-20 border-t border-[#1a1a1a]">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal>
            <div className="border border-[#1f1f1f] rounded-sm overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1a1a1a] bg-[#111]">
                <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
                <span className="ml-4 text-xs" style={{ color: '#555' }}>~/bits-and-body-beats.md</span>
              </div>
              <div className="p-8 md:p-12 bg-[#0f0f0f] relative overflow-hidden">
                <div
                  className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.05), transparent)' }}
                />
                <div className="relative z-10">
                  <div className="text-sm mb-6" style={{ color: '#444' }}>
                    <span style={{ color: '#22c55e' }}>$ </span>
                    <span style={{ color: '#888' }}>cat newsletter.txt</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tighter">
                    BITS &amp; <span style={{ color: '#22c55e' }}>BODY BEATS</span>
                  </h2>
                  <div className="space-y-1 text-sm mb-10" style={{ color: '#555' }}>
                    <div><span style={{ color: '#3a5a3a' }}>/*</span></div>
                    <div>&nbsp;* Exploring the parallels between system architecture</div>
                    <div>&nbsp;* and dance biomechanics. Tech. Flow.</div>
                    <div>&nbsp;* The art of human connection.</div>
                    <div><span style={{ color: '#3a5a3a' }}> */</span></div>
                  </div>
                  <a
                    href={CONFIG.socials.substack}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-green-500 text-black px-6 py-3 text-xs font-bold tracking-widest uppercase hover:bg-green-400 transition-colors"
                  >
                    <BookOpen size={13} /> subscribe()
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-8 border-t border-[#1a1a1a]">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-xs tracking-widest" style={{ color: '#3a3a3a' }}>
            <span style={{ color: '#22c55e' }}>©</span> {new Date().getFullYear()} ANDREA SORO
          </span>
          <button
            onClick={() => navigate('/dance')}
            className="text-xs tracking-widest uppercase transition-colors hover:text-green-500"
            style={{ color: '#555' }}
          >
            switch to dancer mode <ArrowRight className="inline" size={11} />
          </button>
        </div>
      </footer>

    </div>
  );
}
