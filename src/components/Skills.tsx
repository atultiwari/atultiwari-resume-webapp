import { motion } from "motion/react";
import { Brain, Microscope, Terminal, Code } from "lucide-react";

export default function Skills({ data }: { data: any }) {
  const skillGroups = [
    {
      title: "Medical Pathology",
      icon: <Microscope className="w-5 h-5" />,
      color: "text-accent",
      skills: data.skills.medical
    },
    {
      title: "Artificial Intelligence",
      icon: <Brain className="w-5 h-5" />,
      color: "text-primary",
      skills: data.skills.ai
    },
    {
      title: "Tech & Programming",
      icon: <Code className="w-5 h-5" />,
      color: "text-white",
      skills: data.skills.technical
    }
  ];

  return (
    <section id="skills" className="scroll-mt-24">
      <div className="flex flex-col items-center text-center mb-16">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-primary text-xs font-bold tracking-[.4em] uppercase mb-4"
        >
          Expertise
        </motion.span>
        <h2 className="text-4xl md:text-5xl font-bold">Interdisciplinary Skillset</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {skillGroups.map((group, i) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel p-8 group hover:-translate-y-2 transition-all duration-300"
          >
            <div className={`mb-8 p-4 rounded-2xl bg-white/5 border border-white/10 w-fit ${group.color}`}>
              {group.icon}
            </div>
            <h3 className="text-xl font-bold mb-8">{group.title}</h3>
            
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill: string) => (
                <span 
                  key={skill}
                  className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/5 text-zinc-400 text-xs font-medium hover:border-primary/50 hover:text-white transition-all cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Progress Visualization */}
            <div className="mt-12 space-y-4">
               <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-zinc-600">
                <span>Expertise Level</span>
                <span>Advanced</span>
               </div>
               <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "90%" }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className={`h-full bg-gradient-to-r from-transparent to-${group.color.split('-')[1] || 'primary'}-500 opacity-60`}
                />
               </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
