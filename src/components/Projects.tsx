import { motion } from "motion/react";
import { ExternalLink, Rocket, Layout, Database, Terminal } from "lucide-react";

export default function Projects({ data }: { data: any }) {
  const getIcon = (category: string) => {
    switch(category) {
      case 'Education': return <Layout className="w-5 h-5" />;
      case 'Assessment': return <Database className="w-5 h-5" />;
      default: return <Terminal className="w-5 h-5" />;
    }
  };

  return (
    <section id="projects" className="scroll-mt-24">
      <div className="flex justify-between items-end mb-16 px-4">
        <div>
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-primary text-xs font-bold tracking-[.4em] uppercase mb-4 block"
          >
            Showcase
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold">Innovation & Projects</h2>
        </div>
        <div className="hidden md:flex items-center gap-2 text-zinc-500 font-mono text-xs">
          <Rocket className="w-4 h-4 text-primary" />
          Translating Theory into Tools
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.projects.map((project: any, i: number) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="group relative overflow-hidden glass-panel h-full flex flex-col"
          >
            {/* Visual Header */}
            <div className="h-48 bg-black/40 relative overflow-hidden flex items-center justify-center border-b border-white/5">
              <div className="absolute inset-0 opacity-10 bg-gradient-to-tr from-primary to-accent" />
              <div className="relative z-10 w-20 h-20 rounded-2xl bg-white/5 backdrop-blur-3xl border border-white/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
                {getIcon(project.category)}
              </div>
              
              {/* Animated particles */}
              <div className="absolute inset-0 opacity-10">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      y: [0, -20, 0],
                      x: [0, Math.random() * 20 - 10, 0],
                      opacity: [0.2, 0.5, 0.2]
                    }}
                    transition={{ 
                      duration: 3 + Math.random() * 4,
                      repeat: Infinity,
                      delay: i * 0.5
                    }}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{ 
                      top: `${Math.random() * 100}%`, 
                      left: `${Math.random() * 100}%` 
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="p-8 flex-grow flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary px-2 py-0.5 rounded bg-primary/10">
                  {project.category}
                </span>
              </div>
              
              <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              
              <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-grow">
                {project.description}
              </p>

              <div className="space-y-4 pt-6 border-t border-white/5">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase font-bold text-zinc-600 tracking-wider">Impact</span>
                  <p className="text-xs text-zinc-500 italic">
                    "{project.impact}"
                  </p>
                </div>
                
                <button className="flex items-center gap-2 text-xs font-bold text-white group-hover:gap-3 transition-all">
                  View Implementation
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
            
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
               <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/20">
                <ExternalLink className="w-4 h-4" />
               </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
