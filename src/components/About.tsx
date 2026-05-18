"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Check, Terminal, Code2, Database, Layout, 
  Server, Monitor, Globe, Laptop, Cpu, 
  ShieldCheck, Zap, Layers, Award
} from "lucide-react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const stats = [
    { label: "Real loyihalar", value: "25+", icon: Zap },
    { label: "Tajriba (yil)", value: "3+", icon: Layers },
    { label: "Sertifikatlar", value: "10+", icon: Award },
    { label: "Mijozlar roziligi", value: "100%", icon: ShieldCheck },
  ];

  const highlights = [
    {
      title: "Full-Stack Development",
      description: "Nafaqat front-end, balki murakkab back-end tizimlarni ham noldan qura olaman.",
      icon: Terminal
    },
    {
      title: "UI/UX Fokus",
      description: "Foydalanuvchilar uchun qulay va zamonaviy interfeyslar dizayniga alohida e'tibor beraman.",
      icon: Layout
    },
    {
      title: "Xavfsizlik",
      description: "Tizimlarni yaratishda xavfsizlik va ma'lumotlar himoyasi birinchi o'rinda turadi.",
      icon: ShieldCheck
    },
    {
      title: "Masshtablilik",
      description: "Katta yuklamalarga chidamli va oson kengayadigan arxitektura quraman.",
      icon: Cpu
    }
  ];

  return (
    <section ref={ref} id="about" className="py-32 relative overflow-hidden bg-black/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:w-1/2 space-y-10"
          >
            <div className="space-y-4">
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 }}
                className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-widest uppercase border border-primary/20"
              >
                Men haqimda
              </motion.span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading leading-tight">
                Dasturiy mahsulotlarni <br />
                <span className="gradient-text glow-text-primary italic">san'at darajasiga</span> <br />
                chiqaraman.
              </h2>
            </div>

            <div className="space-y-6 text-base leading-relaxed text-muted-foreground max-w-xl">
              <p>
                Salom! Men <span className="text-white font-bold">Jovliyev Bobur</span>, 2010-yilda tug'ilgan, lekin yosh bo'lishimga qaramay dasturlash dunyosida 3 yildan ortiq professional tajribaga ega bo'lgan <span className="text-primary font-medium">Software Engineer</span>man.
              </p>
              <p>
                Mening maqsadim — shunchaki kod yozish emas, balki biznesingizni yangi bosqichga olib chiquvchi, foydalanuvchilarni o'ziga jalb qiladigan va xavfsiz raqamli ekotizimlar yaratishdir. Har bir loyihada men eng so'nggi texnologiyalar va eng yaxshi amaliyotlardan (clean code, SOLID, DRY) foydalanaman.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="glass p-6 rounded-2xl border border-primary/10 group hover:border-primary/40 transition-all"
                >
                  <stat.icon className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                  <div className="text-2xl font-extrabold text-white mb-1">{stat.value}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="lg:w-1/2 space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {highlights.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/30 transition-all group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-black transition-all">
                    <item.icon className="w-7 h-7 text-primary group-hover:text-inherit" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="p-10 rounded-3xl glass border border-primary/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl -mr-16 -mt-16 rounded-full group-hover:bg-primary/40 transition-all"></div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Check className="text-primary w-8 h-8" /> 
                Nega men?
              </h3>
              <ul className="space-y-4">
                {[
                  "Har bir detalga mukammal yondashuv",
                  "Muddati o'tmasdan topshirilgan 25+ loyihalar",
                  "IBM va Google darajasidagi bilim sertifikatlari",
                  "Tun-u kun qo'llab-quvvatlash va maslahatlar"
                ].map((point, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="flex items-center gap-3 text-muted-foreground"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_#06b6d4]"></div>
                    {point}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;

