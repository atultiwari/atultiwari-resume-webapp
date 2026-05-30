import { motion } from "motion/react";
import { Brain, Microscope, Sparkles, ArrowRight } from "lucide-react";

export default function Hero({ data }: { data: any }) {
  return (
    <section id="hero" className="min-h-[80vh] flex flex-col justify-center relative">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-6"
          >
            <Sparkles className="w-3 h-3" />
            Empowering Medicine with AI
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-[1.0] tracking-tighter">
            <span className="text-gradient">Bridging</span> <br />
            Medicine & <span className="text-accent">Intelligence</span>
          </h1>
          
          <p className="text-xl text-zinc-400 max-w-xl mb-10 leading-relaxed font-light">
            I'm <span className="text-white font-medium">{data.name}</span>, a physician-scientist specializing in 
            <span className="text-white"> Pathology</span> and <span className="text-white">Applied AI</span>. 
            Transforming healthcare delivery through advanced computational research and medical education.
          </p>

          <div className="flex flex-wrap gap-4">
            <a 
              href="#projects" 
              className="group px-8 py-4 rounded-2xl bg-white text-black font-bold flex items-center gap-3 hover:bg-zinc-200 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Explore Research
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#contact" 
              className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Contact Me
            </a>
          </div>

          <div className="mt-16 flex items-center gap-12 text-zinc-500">
            <div className="flex flex-col">
              <span className="text-2xl font-display font-bold text-white tracking-tight">15+</span>
              <span className="text-xs uppercase tracking-widest font-bold">Publications</span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="flex flex-col">
              <span className="text-2xl font-display font-bold text-white tracking-tight">10+</span>
              <span className="text-xs uppercase tracking-widest font-bold">Years Exp.</span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="flex flex-col">
              <span className="text-2xl font-display font-bold text-white tracking-tight">5+</span>
              <span className="text-xs uppercase tracking-widest font-bold">AI Platforms</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          {/* Main Visual Composition */}
          <div className="relative w-full aspect-square max-w-lg mx-auto">
            {/* Background glowing shape */}
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
            
            {/* Conceptual Hexagon Grid for "Doctor + AI" */}
            <div className="relative z-10 w-full h-full glass-panel flex items-center justify-center p-12 overflow-hidden border-white/20">
              <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
                 <div className="w-full h-full opacity-50" style={{ backgroundImage: 'radial-gradient(circle, var(--color-primary) 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
              </div>
              
              <div className="relative flex flex-col items-center gap-8">
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="w-32 h-32 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-3xl flex items-center justify-center relative group"
                >
                  <Microscope className="w-16 h-16 text-primary group-hover:scale-110 transition-transform" />
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-accent rounded-full animate-ping" />
                </motion.div>
                
                <div className="flex gap-6">
                   <motion.div 
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                    className="w-24 h-24 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-2xl flex items-center justify-center"
                   >
                    <Brain className="w-10 h-10 text-white/50" />
                   </motion.div>
                   <motion.div 
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                    className="w-24 h-24 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-2xl flex items-center justify-center"
                   >
                    <Sparkles className="w-10 h-10 text-accent/50" />
                   </motion.div>
                </div>
              </div>

               {/* Decorative labels */}
               <div className="absolute top-8 left-8 text-[10px] font-mono text-zinc-500 uppercase tracking-[.3em]">
                System Status: Active
               </div>
               <div className="absolute bottom-8 right-8 text-[10px] font-mono text-zinc-500 uppercase tracking-[.3em]">
                AI Research Lab
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
