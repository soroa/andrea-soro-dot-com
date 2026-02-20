import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Instagram, Linkedin, Mail, ArrowRight, MessageCircle, ExternalLink } from 'lucide-react';
import { CONFIG, STATS, WORKSHOPS } from '../config';

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

function Reveal({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.65s ease-out ${delay}ms, transform 0.65s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ── Counter (scroll-triggered) ────────────────────────────────────────────

const Counter = ({ end, label, delay = 0 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [started, end]);

  return (
    <div
      ref={ref}
      className="text-center"
      style={{
        opacity: started ? 1 : 0,
        transform: started ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
      }}
    >
      <div
        className="font-bold leading-none mb-3"
        style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 'clamp(2.8rem, 5vw, 4rem)',
          color: '#fefaf5',
        }}
      >
        {count.toLocaleString()}+
      </div>
      <div
        className="text-[10px] tracking-[0.25em] uppercase"
        style={{ fontFamily: '"DM Sans", sans-serif', color: '#a08060' }}
      >
        {label}
      </div>
    </div>
  );
};

// ── Page ──────────────────────────────────────────────────────────────────

export default function DancerPage() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // shorthand for hero CSS entrance animations
  const anim = (delay) => ({
    animation: `fadeUp 0.65s ease-out ${delay}ms both`,
  });

  return (
    <div
      className="min-h-screen bg-[#fefaf5] text-[#1c1917] selection:bg-[#c2440e] selection:text-white"
      style={{ fontFamily: '"DM Sans", sans-serif' }}
    >

      {/* ── NAV ── */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-[#fefaf5]/92 backdrop-blur-md border-b py-4' : 'py-6 bg-transparent'
        }`}
        style={{ borderColor: scrolled ? '#e7d7c1' : 'transparent' }}
      >
        <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl italic" style={{ fontFamily: '"Cormorant Garamond", serif', color: '#1c1917' }}>
            Andrea Soro
          </div>
          <div className="flex items-center gap-5">
            <button
              onClick={() => navigate('/code')}
              className="text-xs tracking-[0.15em] uppercase transition-colors border px-3 py-1.5 hidden sm:block hover:border-[#c2440e] hover:text-[#c2440e]"
              style={{ color: '#78716c', borderColor: '#e7d7c1' }}
            >
              The Developer
            </button>
            <a href={CONFIG.socials.instagram} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#c2440e]" style={{ color: '#78716c' }}>
              <Instagram size={17} />
            </a>
            <a href={CONFIG.socials.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#c2440e]" style={{ color: '#78716c' }}>
              <Linkedin size={17} />
            </a>
            <a href={`mailto:${CONFIG.email}`} className="transition-colors hover:text-[#c2440e]" style={{ color: '#78716c' }}>
              <Mail size={17} />
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <header className="min-h-screen flex items-center pt-24 relative overflow-hidden">
        <div
          className="absolute top-1/4 right-0 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle at center, rgba(194,68,14,0.07) 0%, transparent 65%)' }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle at center, rgba(180,83,9,0.05) 0%, transparent 65%)' }}
        />

        <div className="max-w-5xl mx-auto px-6 relative z-10 py-24">

          <p
            className="text-xs tracking-[0.35em] uppercase mb-10"
            style={{ color: 'rgba(194,68,14,0.7)', ...anim(100) }}
          >
            Bachata &amp; Zouk Specialist
          </p>

          <h1
            className="font-bold italic leading-[0.88] mb-10"
            style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(4rem, 10vw, 9rem)', color: '#1c1917' }}
          >
            <span className="block" style={anim(250)}>SYSTEM THINKING</span>
            <span className="block" style={{ color: '#c2440e', ...anim(420) }}>applied to</span>
            <span className="block" style={anim(590)}>MOVEMENT.</span>
          </h1>

          <p
            className="text-lg mb-12 max-w-sm leading-relaxed"
            style={{ color: '#78716c', ...anim(760) }}
          >
            Dancing since 2018. Teaching since 2024. Bringing Bachata &amp; Zouk
            to students across Switzerland and beyond.
          </p>

          <div className="flex flex-wrap gap-4" style={anim(900)}>
            <a
              href={CONFIG.socials.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white text-xs tracking-[0.2em] uppercase px-8 py-4 transition-colors hover:opacity-90"
              style={{ background: '#c2440e' }}
            >
              Book a Private <MessageCircle size={13} />
            </a>
            <a
              href={CONFIG.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase px-8 py-4 border transition-colors hover:border-[#c2440e] hover:text-[#c2440e]"
              style={{ borderColor: '#e7d7c1', color: '#78716c' }}
            >
              <Instagram size={13} /> Follow Along
            </a>
          </div>

          <div className="mt-16 flex items-center gap-3 text-xs tracking-widest" style={{ color: '#c8b8a8', ...anim(1050) }}>
            <div className="h-10 w-px" style={{ background: 'linear-gradient(to bottom, rgba(194,68,14,0.5), transparent)' }} />
            Scroll to discover
          </div>
        </div>
      </header>

      {/* ── STATS ── */}
      <section className="py-24" style={{ background: '#1c1917' }}>
        <div className="max-w-5xl mx-auto px-6">
          <Reveal className="text-center mb-16">
            <h2
              className="font-bold italic mb-4"
              style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#fefaf5' }}
            >
              By the Numbers
            </h2>
            <div className="h-px w-16 mx-auto" style={{ background: '#c2440e' }} />
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            <Counter end={STATS.teachingHours}  label="Teaching Hours"   delay={0} />
            <Counter end={STATS.studentsTrained} label="Students Trained" delay={150} />
            <Counter end={STATS.countriesTaught} label="Countries Taught" delay={300} />
            <Counter end={STATS.workshopsGiven}  label="Workshops Given"  delay={450} />
          </div>
        </div>
      </section>

      {/* ── WHERE I TEACH ── */}
      <section className="py-20 border-b" style={{ background: '#fefaf5', borderColor: '#e7d7c1' }}>
        <div className="max-w-5xl mx-auto px-6">
          <Reveal className="mb-10">
            <h2
              className="font-bold italic mb-3"
              style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', color: '#1c1917' }}
            >
              Where I Teach
            </h2>
            <div className="h-px w-16" style={{ background: '#c2440e' }} />
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-4 max-w-xl">
            <Reveal delay={100}>
              <a
                href="https://fusiondancestudios.ch/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start justify-between p-6 border transition-colors hover:border-[#c2440e]"
                style={{ borderColor: '#e7d7c1' }}
              >
                <div>
                  <p className="text-xs tracking-[0.2em] uppercase mb-1" style={{ color: '#c2440e' }}>Bachata &amp; Bachazouk</p>
                  <p className="font-medium" style={{ color: '#1c1917' }}>Fusion Dance Studios</p>
                </div>
                <ExternalLink size={14} className="mt-1 flex-shrink-0 transition-colors group-hover:text-[#c2440e]" style={{ color: '#c8b8a8' }} />
              </a>
            </Reveal>
            <Reveal delay={220}>
              <a
                href="https://www.zoukessence.ch/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start justify-between p-6 border transition-colors hover:border-[#c2440e]"
                style={{ borderColor: '#e7d7c1' }}
              >
                <div>
                  <p className="text-xs tracking-[0.2em] uppercase mb-1" style={{ color: '#c2440e' }}>Zouk</p>
                  <p className="font-medium" style={{ color: '#1c1917' }}>Zouk Essence</p>
                </div>
                <ExternalLink size={14} className="mt-1 flex-shrink-0 transition-colors group-hover:text-[#c2440e]" style={{ color: '#c8b8a8' }} />
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── WORKSHOP GALLERY ── */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal className="mb-12">
            <h2
              className="font-bold italic mb-3"
              style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#1c1917' }}
            >
              Workshop History
            </h2>
            <div className="h-px w-16 mb-5" style={{ background: '#c2440e' }} />
            <p className="max-w-md" style={{ color: '#78716c' }}>
              A legacy of workshops across the globe, bringing Bachata &amp; Zouk to every corner of the world.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {WORKSHOPS.length > 0 ? WORKSHOPS.map((w, i) => (
              <Reveal key={w.id} delay={i * 100}>
                <div
                  className="relative aspect-[3/4] overflow-hidden cursor-pointer group rounded-sm"
                  style={{ background: '#efe5d4' }}
                >
                  <div
                    className="absolute inset-0 flex flex-col justify-end p-5"
                    style={{ background: 'linear-gradient(to top, rgba(28,25,23,0.8), transparent)' }}
                  >
                    <span className="text-xs font-bold mb-1" style={{ color: '#c2440e' }}>{w.year}</span>
                    <h3 className="font-bold italic text-xl leading-tight text-white" style={{ fontFamily: '"Cormorant Garamond", serif' }}>{w.title}</h3>
                    <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.55)' }}>{w.city}</p>
                  </div>
                </div>
              </Reveal>
            )) : (
              [1, 2, 3, 4].map((i) => (
                <Reveal key={i} delay={i * 80}>
                  <div className="aspect-[3/4] rounded-sm animate-pulse" style={{ background: '#f0e8da', border: '1px solid #e7d7c1' }} />
                </Reveal>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER CTA ── */}
      <section className="py-24 border-t" style={{ background: '#fff8f0', borderColor: '#e7d7c1' }}>
        <div className="max-w-5xl mx-auto px-6">
          <Reveal className="max-w-xl">
            <p className="text-xs tracking-[0.35em] uppercase mb-6" style={{ color: '#c2440e' }}>On Substack</p>
            <h2
              className="font-bold italic mb-6 leading-tight"
              style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#1c1917' }}
            >
              Bits &amp; Body Beats
            </h2>
            <p className="text-lg mb-10 leading-relaxed" style={{ color: '#78716c' }}>
              Exploring the parallels between system architecture and dance biomechanics.
              Join the newsletter for insights on tech, flow, and the art of connection.
            </p>
            <a
              href={CONFIG.socials.substack}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white text-xs tracking-[0.2em] uppercase px-8 py-4 transition-colors"
              style={{ background: '#1c1917' }}
              onMouseEnter={e => e.currentTarget.style.background = '#c2440e'}
              onMouseLeave={e => e.currentTarget.style.background = '#1c1917'}
            >
              Read on Substack <ArrowRight size={13} />
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-8 border-t" style={{ background: '#fefaf5', borderColor: '#e7d7c1' }}>
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="italic text-sm" style={{ fontFamily: '"Cormorant Garamond", serif', color: '#78716c' }}>
            Dance. Code. Repeat.
          </span>
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate('/code')}
              className="text-xs tracking-widest uppercase transition-colors hover:text-[#c2440e]"
              style={{ color: '#78716c' }}
            >
              Switch to developer →
            </button>
            <p className="text-[10px] tracking-widest uppercase" style={{ color: '#d4c5b0' }}>
              &copy; {new Date().getFullYear()} Andrea Soro
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
