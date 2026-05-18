"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Badge, Medal, ExternalLink, Sparkles } from "lucide-react";

export const certificates = [
  { title: "Back-end sertifikati", platform: "IBM", link: "https://jbobur.vercel.app/Sertifikat/Back-end%20sertifikati.pdf" },
  { title: "Data Science Math Skills", platform: "Coursera", link: "https://jbobur.vercel.app/Sertifikat/Data%20Science%20Math%20Skills%20sertifikati.pdf" },
  { title: "Development Microsoft Servers", platform: "Microsoft", link: "https://jbobur.vercel.app/Sertifikat/Development%20Microsoft%20Servers%20sertifikati.pdf" },
  { title: "Django SQL Development", platform: "IBM", link: "https://jbobur.vercel.app/Sertifikat/Django%20SQL%20Development%20sertifikati.pdf" },
  { title: "Elektron tijorat", platform: "E-commerce", link: "https://jbobur.vercel.app/Sertifikat/Elektron%20tijorat.pdf" },
  { title: "Full-stack sertifikati", platform: "IBM", link: "https://jbobur.vercel.app/Sertifikat/Full-stacke%20sertifikati.pdf" },
  { title: "Full-stack sertifikati (2)", platform: "IBM", link: "https://jbobur.vercel.app/Sertifikat/Full-stacke%20sertifikati%20%282%29.pdf" },
  { title: "Front-end sertifikati", platform: "IBM", link: "https://jbobur.vercel.app/Sertifikat/Front-end%20sertifikati.pdf" },
  { title: "Generative AI Elevate", platform: "IBM", link: "https://jbobur.vercel.app/Sertifikat/Generative%20AI%20Elevate%20your%20Software%20Development%20sertifikati.pdf" },
  { title: "Git va GitHub", platform: "IBM", link: "https://jbobur.vercel.app/Sertifikat/Git%20va%20GitHub%20sertifikati.pdf" },
  { title: "HTML, CSS va JavaScript", platform: "IBM", link: "https://jbobur.vercel.app/Sertifikat/HTML,%20CSS%20va%20JavaScript%20sertifikati.pdf" },
  { title: "Introduction to Cloud Computing", platform: "IBM", link: "https://jbobur.vercel.app/Sertifikat/Introduction%20to%20Cloud%20Computing%20sertifikati.pdf" },
  { title: "Containers w Docker, Kubernetes", platform: "IBM", link: "https://jbobur.vercel.app/Sertifikat/Introduction%20to%20Containers%20w%20Docker,%20Kubernetes%20sertifikati.pdf" },
  { title: "Introduction to Generative AI", platform: "IBM", link: "https://jbobur.vercel.app/Sertifikat/Introduction%20to%20Generative%20AI%20sertifikati.pdf" },
  { title: "Introduction to Software Engineering", platform: "IBM", link: "https://jbobur.vercel.app/Sertifikat/Introduction%20to%20Software%20Engineering%20sertifikati.pdf" },
  { title: "Introduction to User Experience", platform: "IBM", link: "https://jbobur.vercel.app/Sertifikat/Introduction%20to%20User%20Experience%20Design%20sertifikati.pdf" },
  { title: "Software Developer Guide", platform: "IBM", link: "https://jbobur.vercel.app/Sertifikat/Software%20Developer%20Career%20Guide%20and%20Interview%20sertifikati.pdf" },
  { title: "WEB Dezayn", platform: "Web Design", link: "https://jbobur.vercel.app/Sertifikat/WEB%20Dezayn.pdf" },
  { title: "SMM", platform: "Social Media Marketing", link: "https://jbobur.vercel.app/Sertifikat/SMM.pdf" },
  { title: "Ingliz tili", platform: "English Language", link: "https://jbobur.vercel.app/Sertifikat/Ingliz%20tili.pdf" },
  { title: "JavaScript (Basic)", platform: "HackerRank", link: "https://jbobur.vercel.app/Hackerrank/javascript_basic%20certificate.pdf" },
  { title: "CSS (Basic)", platform: "HackerRank", link: "https://jbobur.vercel.app/Hackerrank/css%20certificate.pdf" },
  { title: "Python (Basic)", platform: "HackerRank", link: "https://jbobur.vercel.app/Hackerrank/python_basic%20certificate.pdf" },
  { title: "Software Engineer Intern", platform: "HackerRank", link: "https://jbobur.vercel.app/Hackerrank/software_engineer_intern%20certificate.pdf" },
  { title: "Java (Basic)", platform: "HackerRank", link: "https://jbobur.vercel.app/Hackerrank/java_basic%20certificate.pdf" },
  { title: "R (Basic)", platform: "HackerRank", link: "https://jbobur.vercel.app/Hackerrank/r_basic%20certificate.pdf" },
  { title: "Problem Solving (Basic)", platform: "HackerRank", link: "https://jbobur.vercel.app/Hackerrank/problem_solving_basic%20certificate.pdf" },
  { title: "SQL (Basic)", platform: "HackerRank", link: "https://jbobur.vercel.app/Hackerrank/sql_basic%20certificate.pdf" },
  { title: "React (Basic)", platform: "HackerRank", link: "https://jbobur.vercel.app/Hackerrank/react_basic%20certificate.pdf" },
  { title: "C# (Basic)", platform: "HackerRank", link: "https://jbobur.vercel.app/Hackerrank/c_sharp_basic%20certificate.pdf" },
  { title: "Software Engineer", platform: "HackerRank", link: "https://jbobur.vercel.app/Hackerrank/software_engineer%20certificate.pdf" },
  { title: "Go (Basic)", platform: "HackerRank", link: "https://jbobur.vercel.app/Hackerrank/golang_basic%20certificate.pdf" }
];

const Certificates = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });

  return (
    <section ref={ref} id="certificates" className="py-32 relative overflow-hidden">
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
            Yutuqlar
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold font-heading mb-6">
            Mening <span className="gradient-text glow-text-primary italic">Sertifikatlarim</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Xalqaro platformalar va kompaniyalar tomonidan tan olingan bilimlarim tasdig'i.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: (index % 12) * 0.05 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass p-8 rounded-3xl group border border-white/5 hover:border-primary/40 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 blur-2xl rounded-full -mr-10 -mt-10 group-hover:bg-primary/20 transition-all"></div>
              
              <div>
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 border border-primary/20 group-hover:bg-primary group-hover:text-black transition-all">
                  {cert.platform === "IBM" ? (
                    <Badge className="w-7 h-7" />
                  ) : cert.platform === "HackerRank" ? (
                    <Medal className="w-7 h-7" />
                  ) : (
                    <Award className="w-7 h-7" />
                  )}
                </div>
                <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                  {cert.title}
                </h3>
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-8">
                  {cert.platform}
                </p>
              </div>

              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto group/btn flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-primary hover:text-black hover:border-primary transition-all overflow-hidden relative"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Ko'rish <ExternalLink className="w-4 h-4" />
                </span>
                <Sparkles className="absolute right-4 opacity-0 group-hover/btn:opacity-100 group-hover/btn:scale-125 transition-all" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;

