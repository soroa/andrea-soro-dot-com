import React, { useState, useEffect } from 'react';
import {
  Github,
  Linkedin,
  Instagram,
  ExternalLink,
  Music,
  Users,
  Clock,
  ArrowRight,
  BookOpen,
  Mail,
} from 'lucide-react';

// --- CONFIGURATION ---
const CONFIG = {
  socials: {
    instagram: "https://instagram.com/andreasoro",
    linkedin: "https://linkedin.com/in/andreasoro",
    github: "https://github.com/andreasoro",
    substack: "https://andreasoro.substack.com"
  },
  email: "hello@andreasoro.com",
  brandName: "ANDREA SORO"
};

// --- STATIC DATA ---
const STATS = {
  teachingHours: 2500,
  studentsTrained: 150,
  countriesTaught: 12,
  workshopsGiven: 45,
};

// Add your workshops here. Each entry: { id, title, city, year, color }
// color is any Tailwind bg class, e.g. 'bg-cyan-700', 'bg-violet-800'
const WORKSHOPS = [
  // { id: '1', title: 'Sensual Bachata', city: 'Milan', year: 2024, color: 'bg-cyan-800' },
];

// --- SUB-COMPONENTS ---

const Counter = ({ end, label, icon: Icon }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end]);

  return (
    <div className="flex flex-col items-center p-8 bg-zinc-900/50 border border-zinc-800 rounded-2xl hover:border-cyan-500/50 transition-colors group">
      <div className="p-3 bg-zinc-800 rounded-lg group-hover:bg-cyan-500/10 transition-colors mb-4">
        {Icon && <Icon className="text-cyan-500" size={24} />}
      </div>
      <span className="text-4xl font-bold text-white mb-1 font-mono">{count.toLocaleString()}+</span>
      <span className="text-zinc-500 uppercase tracking-widest text-xs font-semibold">{label}</span>
    </div>
  );
};

const SectionHeading = ({ children, subtitle }) => (
  <div className="mb-12">
    <h2 className="text-3xl font-bold text-white mb-2 uppercase tracking-tighter italic">
      {children}
    </h2>
    <div className="h-1 w-20 bg-cyan-500 mb-4"></div>
    {subtitle && <p className="text-zinc-400 max-w-2xl">{subtitle}</p>}
  </div>
);

// --- MAIN APP ---

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const SOCIAL_LINKS = [
    { name: 'Instagram', icon: Instagram, url: CONFIG.socials.instagram, color: 'hover:text-pink-500' },
    { name: 'LinkedIn',  icon: Linkedin,  url: CONFIG.socials.linkedin,  color: 'hover:text-blue-500' },
    { name: 'Substack',  icon: BookOpen,  url: CONFIG.socials.substack,  color: 'hover:text-orange-500' },
    { name: 'GitHub',    icon: Github,    url: CONFIG.socials.github,     color: 'hover:text-white' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-300 font-sans selection:bg-cyan-500 selection:text-black">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md py-4 border-b border-zinc-800' : 'bg-transparent py-8'}`}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <div className="text-white font-bold text-xl tracking-tighter flex items-center gap-2 group cursor-default">
            <span className="w-8 h-8 bg-cyan-500 rounded flex items-center justify-center text-black group-hover:rotate-12 transition-transform">A</span>
            {CONFIG.brandName}
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium tracking-widest uppercase">
            <a href="#dev"     className="hover:text-cyan-500 transition-colors">Developer</a>
            <a href="#dance"   className="hover:text-cyan-500 transition-colors">Dance</a>
            <a href="#history" className="hover:text-cyan-500 transition-colors">History</a>
            <a href="#writing" className="hover:text-cyan-500 transition-colors">Writing</a>
          </div>
          <div className="flex gap-4">
            {SOCIAL_LINKS.map((link) => (
              <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className={`transition-colors ${link.color}`}>
                <link.icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[120px]" />
        <div className="max-w-6xl mx-auto px-6 w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] mb-8 uppercase italic">
                Crafting Code. <br />
                <span className="text-transparent border-t-2 border-cyan-500 pt-2" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>Moving Souls.</span>
              </h1>
              <p className="text-xl text-zinc-400 mb-10 max-w-lg leading-relaxed">
                Full-stack developer by day, Bachata & Zouk specialist by night. Bridging technical logic with physical expression.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href={`mailto:${CONFIG.email}`} className="px-8 py-4 bg-cyan-500 text-black font-bold uppercase tracking-tighter hover:bg-white transition-all transform hover:-translate-y-1 flex items-center gap-2">
                  Contact Me <Mail size={18} />
                </a>
                <button onClick={() => window.open(CONFIG.socials.github)} className="px-8 py-4 bg-transparent border border-zinc-700 text-white font-bold uppercase tracking-tighter hover:bg-zinc-900 transition-all">
                  Github Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-px h-12 bg-gradient-to-b from-cyan-500 to-transparent"></div>
        </div>
      </header>

      {/* Dance Stats Section */}
      <section id="dance" className="py-24 bg-zinc-950 relative">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading subtitle="My teaching methodology is built on technical precision and structural analysis.">
            The Dance Statistics
          </SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Counter end={STATS.teachingHours}  label="Teaching Hours"   icon={Clock} />
            <Counter end={STATS.studentsTrained} label="Students Trained" icon={Users} />
            <Counter end={STATS.countriesTaught} label="Countries Taught" icon={ExternalLink} />
            <Counter end={STATS.workshopsGiven}  label="Workshops Given"  icon={Music} />
          </div>
        </div>
      </section>

      {/* Workshop History Wall */}
      <section id="history" className="py-24 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading subtitle="A legacy of workshops across the globe. Hover to reveal location details.">
            History Wall
          </SectionHeading>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {WORKSHOPS.length > 0 ? WORKSHOPS.map((workshop) => (
              <div
                key={workshop.id}
                className="relative aspect-[3/4] overflow-hidden group rounded-sm grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer"
              >
                <div className={`absolute inset-0 ${workshop.color || 'bg-zinc-800'} opacity-40 group-hover:opacity-10 transition-opacity`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <div className="absolute inset-0 border-8 border-transparent group-hover:border-white/20 transition-all m-2 flex flex-col justify-end p-6">
                  <span className="text-cyan-500 font-mono text-xs mb-1">{workshop.year}</span>
                  <h3 className="text-white font-black uppercase text-xl leading-tight mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                    {workshop.title}
                  </h3>
                  <div className="flex items-center gap-2 text-zinc-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="w-4 h-[1px] bg-cyan-500"></span>
                    {workshop.city}
                  </div>
                </div>
              </div>
            )) : (
              [1, 2, 3, 4].map(i => (
                <div key={i} className="aspect-[3/4] bg-zinc-900/50 border border-zinc-800 animate-pulse rounded-sm" />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Writing Section (Substack) */}
      <section id="writing" className="py-24 bg-zinc-950 border-y border-zinc-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-gradient-to-r from-zinc-900 to-black p-12 md:p-20 rounded-3xl border border-zinc-800 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[100px] group-hover:bg-cyan-500/20 transition-colors" />
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic mb-6">
                Bits & <br />
                <span className="text-cyan-500">Body Beats</span>
              </h2>
              <p className="text-xl text-zinc-400 mb-10 leading-relaxed">
                Exploring the parallels between system architecture and dance biomechanics. Join my Substack for insights on tech, flow, and the art of connection.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={CONFIG.socials.substack}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-white text-black font-bold uppercase tracking-tighter hover:bg-cyan-500 transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  Join the Newsletter <ArrowRight size={18} />
                </a>
              </div>
              <p className="mt-4 text-xs text-zinc-500 uppercase tracking-widest font-semibold">Live on Substack</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-zinc-900 bg-black">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-white/10 font-black text-4xl uppercase italic select-none">
            Dance.Code.Repeat
          </div>
          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex gap-6">
              {SOCIAL_LINKS.map((link) => (
                <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors">
                  <link.icon size={20} />
                </a>
              ))}
            </div>
            <p className="text-zinc-600 text-[10px] uppercase tracking-widest">
              &copy; {new Date().getFullYear()} {CONFIG.brandName}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
