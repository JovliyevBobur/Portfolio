"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { 
  Terminal, FileCode2, Code2, Server, Atom, Box, 
  Database, Cloud, Laptop, Monitor, Container,
  Braces, Cpu, Globe, Rocket, Shield, PenTool
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
  const [selectedSkill, setSelectedSkill] = useState<any>(null);

  const skillCategories = [
    {
      title: "Backend Development",
      icon: Server,
      skills: [
        { name: "Python / Django / Fast API", icon: Terminal, level: "95%", description: "Python va uning ilg'or freymvorklari yordamida yuqori yuklamali, xavfsiz va tezkor backend tizimlarini yaratish. RESTful API va GraphQL arxitekturalarini ishlab chiqish tajribasi." },
        { name: "Node.js / Express", icon: Box, level: "90%", description: "Asinxron va real vaqtda ishlovchi ilovalarni Node.js va Express yordamida tezkor qurish. WebSockets orqali jonli aloqani ta'minlash." },
        { name: "Java / Spring Boot", icon: Code2, level: "85%", description: "Yirik korporativ darajadagi (Enterprise) loyihalar uchun Java Spring Boot orqali ishonchli va mikroxizmat arxitekturasiga asoslangan yechimlar yaratish." },
        { name: "PHP / Laravel", icon: Server, level: "80%", description: "Laravel freymvorkida zamonaviy MVC arxitekturasida dasturlar yaratish, Eloquent ORM yordamida ma'lumotlar bazasi bilan samarali ishlash." },
      ]
    },
    {
      title: "Frontend Development",
      icon: Laptop,
      skills: [
        { name: "React / Next.js", icon: Atom, level: "95%", description: "Foydalanuvchilar uchun qulay, interaktiv va SSR/SSG qo'llab-quvvatlovchi zamonaviy web interfeyslarni React va Next.js orqali yaratish." },
        { name: "TypeScript", icon: Braces, level: "90%", description: "Katta miqyosdagi loyihalarda xatolarni oldini olish va kod sifatini oshirish uchun qat'iy tiplangan TypeScript dasturlash tilidan samarali foydalanish." },
        { name: "Tailwind CSS", icon: PenTool, level: "98%", description: "Zamonaviy, moslashuvchan (responsive) va chiroyli dizaynlarni Tailwind CSS utility-first yondashuvi yordamida tezkorlik bilan ishlab chiqish." },
        { name: "Vue.js", icon: Globe, level: "75%", description: "Tezkor va yengil frontend ilovalarini Vue.js freymvorki yordamida qurish va uning ekotizimidan foydalanish." },
      ]
    },
    {
      title: "DevOps & Tools",
      icon: Cpu,
      skills: [
        { name: "Docker / Kubernetes", icon: Container, level: "85%", description: "Ilovalarni konteynerlashtirish (Docker) va ularni klasterlarda avtomatik boshqarish (Kubernetes) orqali yuqori mavjudlikni ta'minlash." },
        { name: "Linux / Bash", icon: Terminal, level: "90%", description: "Linux serverlarini sozlash, boshqarish va Bash skriptlari yordamida jarayonlarni avtomatlashtirish bo'yicha chuqur bilimlar." },
        { name: "Git / CI/CD", icon: Rocket, level: "95%", description: "Jamoaviy ishlashda Git versiya nazorati va GitHub Actions/GitLab CI orqali kodni avtomatik test qilish va serverga yuklash (CI/CD) jarayonlarini yo'lga qo'yish." },
        { name: "PostgreSQL / MongoDB", icon: Database, level: "92%", description: "Relyatsion (PostgreSQL) va NoSQL (MongoDB) ma'lumotlar bazalarini loyihalash, optimizatsiya qilish va murakkab so'rovlarni yozish malakasi." },
      ]
    }
  ];

  return (
    <section ref={ref} id="skills" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.span 
            className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-widest uppercase border border-primary/20 mb-4"
          >
            Mahoratlar
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold font-heading mb-6">
            Mening <span className="gradient-text glow-text-primary italic">Arsenalim</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hozirgi kunda men foydalanayotgan va professional darajada o'zlashtirgan texnologiyalar to'plami.
          </p>
        </motion.div>

        <div className="space-y-16">
          {skillCategories.map((category, catIndex) => (
            <div key={category.title}>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: catIndex * 0.2 }}
                className="flex items-center gap-4 mb-8"
              >
                <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                  <category.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold font-heading text-white">{category.title}</h3>
                <div className="flex-grow h-px bg-gradient-to-r from-primary/30 to-transparent"></div>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: catIndex * 0.2 + skillIndex * 0.1, type: "spring", stiffness: 100 }}
                    whileHover={{ y: -8, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedSkill(skill)}
                    className="glass p-6 rounded-2xl border border-primary/20 hover:border-primary/60 hover:shadow-[0_0_40px_rgba(6,182,212,0.25)] transition-all duration-300 group relative overflow-hidden cursor-pointer backdrop-blur-xl bg-black/40"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 rounded-xl bg-background/50 border border-white/5 group-hover:bg-primary group-hover:text-black transition-all duration-300">
                        <skill.icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold text-primary opacity-60 group-hover:opacity-100 transition-opacity">
                        {skill.level}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">{skill.name}</h4>
                    
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mt-4">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={isInView ? { width: skill.level } : {}}
                        transition={{ duration: 1.5, delay: 1 + skillIndex * 0.1 }}
                        className="h-full bg-gradient-to-r from-primary to-cyan-400"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedSkill} onOpenChange={(open) => !open && setSelectedSkill(null)}>
        <DialogContent className="glass border-primary/20 bg-black/60 backdrop-blur-3xl text-white sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-4 mb-4 mt-2">
              <div className="p-4 rounded-2xl bg-primary/20 border border-primary/30 text-primary shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                {selectedSkill?.icon && <selectedSkill.icon className="w-8 h-8" />}
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold tracking-tight">{selectedSkill?.name}</DialogTitle>
                <div className="text-sm font-bold text-primary mt-1 opacity-90">
                  O'zlashtirish darajasi: {selectedSkill?.level}
                </div>
              </div>
            </div>
            <DialogDescription className="text-base text-gray-300 leading-relaxed mt-4 text-left">
              {selectedSkill?.description}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </section>
  );
};

export default Skills;

