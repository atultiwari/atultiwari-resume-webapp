import { motion, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { 
  Dna, 
  Brain, 
  Microscope, 
  BookOpen, 
  Terminal, 
  Mail, 
  Linkedin, 
  Github,
  Award,
  ChevronRight,
  Menu,
  X,
  ExternalLink,
  MessageSquare
} from "lucide-react";
import { resumeData } from "./data";
import Hero from "./components/Hero";
import About from "./components/About";
import Timeline from "./components/Timeline";
import Projects from "./components/Projects";
import Publications from "./components/Publications";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";

export default function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen font-sans selection:bg-primary/30">
      {/* Custom Cursor Glow */}
      <div 
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.1), transparent 80%)`
        }}
      />

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Background Elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] pointer-events-none grayscale invert" 
             style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <Navbar />
      
      <main className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 pt-24 pb-20 space-y-32">
        <Hero data={resumeData} />
        <About data={resumeData} />
        <Timeline data={resumeData} />
        <Skills data={resumeData} />
        <Projects data={resumeData} />
        <Publications data={resumeData} />
        <Contact data={resumeData} />
      </main>

      <footer className="relative z-10 border-t border-white/5 py-12 px-6 bg-black/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col gap-2">
            <span className="font-display font-bold text-xl text-white">Dr. Atul Tiwari</span>
            <p className="text-zinc-500 text-sm max-w-xs leading-relaxed">
              Advancing the frontiers of pathology and medical AI research through innovation and education.
            </p>
          </div>
          <div className="flex gap-8">
            <a href={resumeData.linkedin} className="text-zinc-500 hover:text-white transition-colors" target="_blank" rel="noreferrer">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href={`https://twitter.com/${resumeData.twitter}`} className="text-zinc-500 hover:text-white transition-colors" target="_blank" rel="noreferrer">
              <TwitterIcon className="w-5 h-5" />
            </a>
            <a href={`mailto:${resumeData.email}`} className="text-zinc-500 hover:text-white transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
          <div className="text-zinc-600 text-xs">
            © {new Date().getFullYear()} Dr. Atul Tiwari. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

// Utility Twitter icon since it's not in older lucide versions or different names
function TwitterIcon(props: any) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}
