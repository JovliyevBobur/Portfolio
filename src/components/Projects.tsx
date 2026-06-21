"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { 
  Laptop, Smartphone, Gamepad2, Briefcase, 
  Bot, Shield, ExternalLink, ArrowRight,
  Code2, Sparkles, Globe, Terminal
} from "lucide-react";

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const categories = [
    {
      title: "Operatsion Tizimlar",
      description: "Zamonaviy OS interfeyslari faqat web platformasida.",
      icon: Laptop,
      gradient: "from-blue-600 via-indigo-600 to-violet-600",
      links: [
        { name: "Windows 11", url: "https://windowsxi.vercel.app/Bobur" },
        { name: "Mac OS", url: "https://chrisbinsunny.github.io/chrishub/#/" },
        { name: "Linux Kali", url: "https://ali-abo-alshamlat.github.io/" },
        { name: "Ubuntu", url: "https://distrosea.com/view/" },
      ]
    },
    {
      title: "Full-Stack Ilovalar",
      description: "Biznesingiz uchun mukammal raqamli yechimlar.",
      icon: Smartphone,
      gradient: "from-cyan-500 via-blue-500 to-indigo-500",
      links: [
        { name: "JBN Services", url: "https://jbn-services.vercel.app/" },
        { name: "Smart Coding", url: "https://smartcoding.vercel.app/" },
        { name: "My Services", url: "https://my-services.vercel.app/" },
        { name: "Renessans", url: "https://go-renessans.vercel.app/" },
      ]
    },
    {
      title: "Multiplayer O'yinlar",
      description: "Real-time rejimida ishlovchi qiziqarli o'yinlar.",
      icon: Gamepad2,
      gradient: "from-fuchsia-600 via-purple-600 to-indigo-600",
      links: [
        { name: "Ballz Game", url: "https://ballz-game.vercel.app/" },
        { name: "Air Hockey", url: "https://airhockey-uz.vercel.app/" },
        { name: "Snake Game", url: "https://snake-uz.vercel.app/" },
        { name: "Chess 3D", url: "https://chess3d-uz.vercel.app/" },
      ]
    },
    {
      title: "Professional Botlar",
      description: "AI va avtomatizatsiya uchun Telegram botlari.",
      icon: Bot,
      gradient: "from-emerald-500 via-teal-500 to-cyan-500",
      links: [
        { name: "JBN AI", url: "https://jbobur.vercel.app/" },
        { name: "Music Bot", url: "https://jbobur.vercel.app/" },
        { name: "Video Bot", url: "https://jbobur.vercel.app/" },
        { name: "News Bot", url: "https://jbobur.vercel.app/" },
      ]
    },
    {
      title: "KiberXavfsizlik",
      description: "Ma'lumotlarni shifrlash va himoya qilish platformalari.",
      icon: Shield,
      gradient: "from-rose-600 via-red-600 to-orange-600",
      links: [
        { name: "Encrypt", url: "https://shifr.vercel.app/" },
        { name: "Pass Gen", url: "https://password-uz.vercel.app/" },
        { name: "SecureVPN", url: "https://vpn-uz.vercel.app/" },
      ]
    },
    {
      title: "Mijoz Loyihalari",
      description: "Buyurtma asosida tayyorlangan eksklyuziv loyihalar.",
      icon: Briefcase,
      gradient: "from-amber-500 via-orange-500 to-red-500",
      links: [
        { name: "Portfolio", url: "https://uzb-portfolio.vercel.app/" },
        { name: "Flux Shop", url: "https://offer-uz.vercel.app/#work" },
        { name: "Creative", url: "https://creative-craft.vercel.app/" },
      ]
    }
  ];

  return (
    <section ref={ref} id="projects" className="py-32 relative overflow-hidden bg-black/40">

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.span 
            className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-widest uppercase border border-primary/20 mb-4"
          >
            Portfoliom
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold font-heading mb-6">
            Saralangan <span className="gradient-text glow-text-primary italic">Loyihalar</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Har bir loyiha — bu yangi chaqiriq va mukammal yechim sari tashlangan qadamdir.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              whileHover={{ scale: 1.03, y: -10 }}
              className="group relative cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary rounded-[2.8rem]"
              tabIndex={0}
            >
              <div className="relative z-10 glass p-10 rounded-[2.5rem] h-full flex flex-col border border-white/5 group-hover:border-primary/40 transition-all duration-500 hover:shadow-[0_0_50px_rgba(6,182,212,0.1)] overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-[0.03] transition-all duration-700`} />
                
                <div className="flex items-center justify-between mb-8">
                  <div className="p-4 bg-primary/10 rounded-2xl group-hover:bg-primary group-hover:text-black transition-all duration-300">
                    <category.icon className="w-8 h-8" />
                  </div>
                  <Sparkles className="w-6 h-6 text-primary/20 group-hover:text-primary transition-all duration-500" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors">
                  {category.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-10 flex-grow">
                  {category.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4 mt-auto">
                  {category.links.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-primary hover:text-black text-white text-xs font-bold rounded-xl border border-white/10 hover:border-primary transition-all group/btn focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      <span className="truncate">{link.name}</span>
                      <ExternalLink className="w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </a>
                  ))}
                </div>
              </div>
              
              {/* Background glow effect */}
              <div 
                className={`absolute -inset-2 bg-gradient-to-br ${category.gradient} rounded-[2.8rem] blur-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10`}
              />
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="mt-24 text-center"
        >
          <a 
            href="https://github.com/JBoburHacker005" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full glass border border-primary/30 text-primary font-bold hover:bg-primary hover:text-black hover:scale-105 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Barcha loyihalarni GitHubda ko'rish
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;


