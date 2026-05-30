import { motion } from "motion/react";
import { User, Target, Zap, Rocket } from "lucide-react";

export default function About({ data }: { data: any }) {
  const cards = [
    {
      icon: <Target className="w-6 h-6 text-primary" />,
      title: "Mission",
      text: "Integrating AI into medical education and diagnostics to improve patient outcomes."
    },
    {
      icon: <Zap className="w-6 h-6 text-accent" />,
      title: "Innovation",
      text: "Leveraging no-code AI and machine learning to build real-world healthcare tools."
    },
    {
      icon: <Rocket className="w-6 h-6 text-blue-400" />,
      title: "Vision",
      text: "Pioneering the future where every doctor is empowered by intelligent systems."
    }
  ];

  return (
    <section id="about" className="scroll-mt-24">
      <div className="flex flex-col items-center text-center mb-16">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-primary text-xs font-bold tracking-[.4em] uppercase mb-4"
        >
          Introduction
        </motion.span>
        <h2 className="text-4xl md:text-5xl font-bold mb-6">The Physician-Scientist Path</h2>
        <div className="w-20 h-1 bg-primary/20 rounded-full" />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-panel p-8 md:p-12">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <User className="w-6 h-6 text-primary" />
            Extensive Professional Background
          </h3>
          <div className="space-y-6 text-zinc-400 leading-relaxed text-lg font-light">
            <p>
              With over a decade of clinical experience, I've transitioned from traditional medicine to being a 
              <span className="text-white font-medium"> tech-enabled medical professional</span>. As an Associate Professor 
              of Pathology, I witness the massive potential for AI to augment diagnostic precision.
            </p>
            <p>
              My journey is defined by a deep-seated passion for 
              <span className="text-white font-medium"> research and education</span>. My work spans from being a State Additional Nodal Officer 
              (AI/ML) defining policy for medical education in Rajasthan, to developing AI-assisted platforms like MedTutor AI.
            </p>
            <p>
              I believe that the synergy between human expertise and Artificial Intelligence is the key to solving complex medical 
              challenges. I am dedicated to mentoring doctors, medical students, and startups to navigate this new era.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel p-6 flex items-center gap-6 group hover:translate-x-2 transition-transform"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                {card.icon}
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-bold text-white group-hover:text-primary transition-colors">{card.title}</span>
                <p className="text-sm text-zinc-500 leading-snug">{card.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
