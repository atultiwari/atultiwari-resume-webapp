import { motion } from "motion/react";
import { BookOpen, Calendar, ExternalLink, Quote } from "lucide-react";

export default function Publications({ data }: { data: any }) {
  return (
    <section id="publications" className="scroll-mt-24">
      <div className="flex flex-col items-center text-center mb-16">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-primary text-xs font-bold tracking-[.4em] uppercase mb-4"
        >
          Academic Impact
        </motion.span>
        <h2 className="text-4xl md:text-5xl font-bold">Research & Publications</h2>
      </div>

      <div className="space-y-6">
        {data.publications.map((pub: any, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group glass-panel p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start md:items-center hover:bg-white/[0.07] transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:border-primary/30 transition-all duration-500">
              <BookOpen className="w-7 h-7 text-zinc-500 group-hover:text-primary transition-colors" />
            </div>

            <div className="flex-grow space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] px-2 py-0.5 rounded bg-primary/10">
                  {pub.year}
                </span>
                <span className="text-xs text-zinc-500 font-medium">Research Paper</span>
              </div>
              
              <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors leading-tight">
                {pub.title}
              </h3>
              
              <div className="flex items-center gap-4 text-sm text-zinc-500 font-light italic">
                <Quote className="w-3 h-3 text-zinc-700" />
                {pub.journal}
              </div>
            </div>

            <div className="shrink-0">
              <a 
                href={pub.link} 
                className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 text-zinc-500 hover:text-white hover:border-white/20 transition-all active:scale-95"
                target="_blank" 
                rel="noreferrer"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-20 glass-panel p-12 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-30 group-hover:opacity-50 transition-opacity" />
        <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto">
          <Quote className="w-12 h-12 text-primary opacity-20 mb-8" />
          <p className="text-3xl font-display font-light leading-relaxed text-white mb-8 italic">
            "Transforming pathology through <span className="text-primary font-medium">machine learning</span> isn't just about efficiency—it's about accuracy that saves lives."
          </p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-px bg-white/10" />
            <span className="text-sm font-bold uppercase tracking-widest text-zinc-500">Academic Philosophy</span>
            <div className="w-12 h-px bg-white/10" />
          </div>
        </div>
      </div>
    </section>
  );
}
