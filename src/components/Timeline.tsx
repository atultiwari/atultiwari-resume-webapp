import { motion } from "motion/react";
import { Briefcase, GraduationCap, Calendar, MapPin } from "lucide-react";

export default function Timeline({ data }: { data: any }) {
  return (
    <section id="experience" className="scroll-mt-24">
      <div className="grid lg:grid-cols-2 gap-20">
        {/* Experience Side */}
        <div>
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Briefcase className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight">Professional Journey</h2>
          </div>

          <div className="relative border-l border-white/10 ml-6 pl-8 space-y-12">
            {data.experience.map((exp: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                {/* Dot */}
                <div className="absolute top-1.5 -left-[41px] w-5 h-5 rounded-full bg-black border-4 border-primary shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase tracking-widest">
                    <Calendar className="w-3 h-3" />
                    {exp.period}
                  </div>
                  <h3 className="text-xl font-bold text-white leading-tight">
                    {exp.role}
                  </h3>
                  <div className="flex items-center gap-2 text-zinc-500 text-sm font-medium">
                    <MapPin className="w-4 h-4 text-zinc-600" />
                    {exp.institution}
                  </div>
                  <p className="text-zinc-400 mt-2 text-[15px] leading-relaxed">
                    {exp.description}
                  </p>
                  {exp.type && (
                    <span className="mt-2 text-[10px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-zinc-500 w-fit font-bold uppercase tracking-wider">
                      {exp.type}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education Side */}
        <div>
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight">Academic Foundations</h2>
          </div>

          <div className="relative border-l border-white/10 ml-6 pl-8 space-y-12">
            {data.education.map((edu: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                 {/* Dot */}
                 <div className="absolute top-1.5 -left-[41px] w-5 h-5 rounded-full bg-black border-4 border-accent shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-accent font-mono text-xs font-bold uppercase tracking-widest">
                    <Calendar className="w-3 h-3" />
                    {edu.period}
                  </div>
                  <h3 className="text-xl font-bold text-white leading-tight">
                    {edu.degree}
                  </h3>
                  <div className="text-zinc-400 text-sm italic font-light">
                    {edu.institution}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
