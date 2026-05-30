import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send, Linkedin } from "lucide-react";

export default function Contact({ data }: { data: any }) {
  return (
    <section id="contact" className="scroll-mt-24 pb-20">
      <div className="flex flex-col items-center text-center mb-20">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-primary text-xs font-bold tracking-[.4em] uppercase mb-4"
        >
          Collaboration
        </motion.span>
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's Connect</h2>
        <p className="text-zinc-500 max-w-sm">
          Interested in research collaborations, speaking engagements, or AI workshops? Reach out.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
        {/* Contact Info */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-panel p-8 space-y-8">
            <h3 className="text-xl font-bold mb-4">Contact Information</h3>
            
            <div className="flex items-start gap-5 group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-600">Email</span>
                <a href={`mailto:${data.email}`} className="text-white hover:text-primary transition-colors font-medium">
                  {data.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-5 group">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0 group-hover:scale-110 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-600">Phone</span>
                <span className="text-white font-medium">{data.phone}</span>
              </div>
            </div>

            <div className="flex items-start gap-5 group">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 shrink-0 group-hover:scale-110 transition-transform">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-600">Location</span>
                <span className="text-white font-medium leading-tight">
                  {data.location}
                </span>
              </div>
            </div>
          </div>

          <a 
            href={data.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between p-6 rounded-2xl bg-primary/10 border border-primary/20 group hover:bg-primary/20 transition-all"
          >
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white">
                <Linkedin className="w-5 h-5 fill-current" />
               </div>
               <div className="flex flex-col">
                <span className="text-white font-bold">Connect on LinkedIn</span>
                <span className="text-xs text-zinc-500">Professional Network</span>
               </div>
            </div>
            <Send className="w-5 h-5 text-zinc-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>

        {/* Contact Form Placeholder */}
        <div className="lg:col-span-3 glass-panel p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Mail className="w-48 h-48" />
          </div>
          
          <form className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-zinc-600 ml-1">Full Name</label>
              <input 
                type="text" 
                placeholder="John Doe"
                className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-primary/50 focus:bg-white/10 outline-none text-white transition-all"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-zinc-600 ml-1">Email Address</label>
              <input 
                type="email" 
                placeholder="john@example.com"
                className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-primary/50 focus:bg-white/10 outline-none text-white transition-all"
              />
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-zinc-600 ml-1">Message</label>
              <textarea 
                rows={5}
                placeholder="How can we collaborate?"
                className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-primary/50 focus:bg-white/10 outline-none text-white transition-all resize-none"
              ></textarea>
            </div>
            <button className="md:col-span-2 py-4 rounded-xl bg-primary text-white font-bold hover:bg-primary-dark transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] active:scale-[0.98] flex items-center justify-center gap-2">
              Send Message
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
