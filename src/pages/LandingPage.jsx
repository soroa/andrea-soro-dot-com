import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const [hover, setHover] = useState(null);
  const navigate = useNavigate();

  const EASE = 'flex 0.55s cubic-bezier(0.4, 0, 0.2, 1)';
  const codeFlex  = hover === 'code'  ? '1.6' : hover === 'dance' ? '0.4' : '1';
  const danceFlex = hover === 'dance' ? '1.6' : hover === 'code'  ? '0.4' : '1';

  return (
    <div className="h-screen flex flex-col md:flex-row overflow-hidden">

      {/* ── CODE SIDE ── */}
      <div
        className="relative flex items-center justify-center overflow-hidden cursor-pointer"
        style={{ flex: codeFlex, transition: EASE, background: '#0d0d0d' }}
        onMouseEnter={() => setHover('code')}
        onMouseLeave={() => setHover(null)}
        onClick={() => navigate('/code')}
      >
        {/* Subtle grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(#22c55e 1px, transparent 1px), linear-gradient(90deg, #22c55e 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            opacity: 0.04,
          }}
        />
        {/* Glow */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle at center, rgba(34,197,94,0.12) 0%, transparent 70%)' }}
        />

        <div
          className="relative z-10 text-center px-8 select-none"
          style={{ fontFamily: '"JetBrains Mono", monospace' }}
        >
          <p className="text-xs tracking-[0.3em] mb-6" style={{ color: 'rgba(34,197,94,0.55)' }}>
            $ ./whoami.sh
          </p>
          <h1
            className="font-bold text-white leading-[0.9]"
            style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4.5rem)' }}
          >
            ANDREA<br />SORO
          </h1>
          <div className="flex items-center justify-center gap-3 mt-5 mb-10">
            <span className="h-px w-5" style={{ background: 'rgba(34,197,94,0.35)' }} />
            <p className="text-xs tracking-[0.25em]" style={{ color: '#22c55e' }}>THE DEVELOPER</p>
            <span className="h-px w-5" style={{ background: 'rgba(34,197,94,0.35)' }} />
          </div>
          <div
            className="border px-6 py-2.5 text-xs tracking-[0.2em] transition-all duration-200 inline-block hover:bg-green-500 hover:text-black hover:border-green-500"
            style={{ borderColor: 'rgba(34,197,94,0.35)', color: '#22c55e' }}
          >
            ENTER &gt;_
          </div>
        </div>
      </div>

      {/* ── DIVIDER ── */}
      <div className="h-px w-full md:h-full md:w-px flex-shrink-0" style={{ background: 'rgba(255,255,255,0.08)' }} />

      {/* ── DANCE SIDE ── */}
      <div
        className="relative flex items-center justify-center overflow-hidden cursor-pointer"
        style={{ flex: danceFlex, transition: EASE, background: '#fefaf5' }}
        onMouseEnter={() => setHover('dance')}
        onMouseLeave={() => setHover(null)}
        onClick={() => navigate('/dance')}
      >
        {/* Warm glow */}
        <div
          className="absolute top-1/4 right-1/3 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle at center, rgba(194,68,14,0.1) 0%, transparent 70%)' }}
        />

        <div className="relative z-10 text-center px-8 select-none">
          <p
            className="text-xs tracking-[0.3em] mb-6 italic"
            style={{ fontFamily: '"DM Sans", sans-serif', color: 'rgba(194,68,14,0.6)' }}
          >
            Bachata &amp; Zouk
          </p>
          <h1
            className="font-bold italic leading-[0.9]"
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 'clamp(2.2rem, 5.5vw, 4.5rem)',
              color: '#1c1917',
            }}
          >
            Andrea<br />Soro
          </h1>
          <div className="flex items-center justify-center gap-3 mt-5 mb-10">
            <span className="h-px w-5" style={{ background: 'rgba(194,68,14,0.35)' }} />
            <p
              className="text-xs tracking-[0.25em]"
              style={{ fontFamily: '"DM Sans", sans-serif', color: '#c2440e' }}
            >
              THE DANCER
            </p>
            <span className="h-px w-5" style={{ background: 'rgba(194,68,14,0.35)' }} />
          </div>
          <div
            className="border px-6 py-2.5 text-xs tracking-[0.2em] transition-all duration-200 inline-block hover:bg-[#c2440e] hover:text-white hover:border-[#c2440e]"
            style={{
              fontFamily: '"DM Sans", sans-serif',
              borderColor: 'rgba(194,68,14,0.35)',
              color: '#c2440e',
            }}
          >
            ENTER →
          </div>
        </div>
      </div>

    </div>
  );
}
