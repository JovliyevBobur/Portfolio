"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Github, Linkedin, Mail, Instagram, Layout, Database, Smartphone, Code } from "lucide-react";
import { Button } from "./ui/button";
import { LiquidButton } from "./ui/LiquidButton";
import { BadgeLanyard } from "./ui/BadgeLanyard";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import Spline from '@splinetool/react-spline';

const Hero = () => {
  const { t } = useTranslation();
  
  const socialLinks = [
    { icon: Github, href: "https://github.com/JBoburHacker005", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/Bobur005", label: "LinkedIn" },
    { icon: Instagram, href: "https://instagram.com/j.bobur005", label: "Instagram" },
    { icon: Mail, href: "mailto:jbobur005@gmail.com", label: "Email" },
  ];

  return (
    <>
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-10">
      
      {/* 3D Spline Robot - Leftmost */}
      <div className="hidden lg:flex absolute top-[10%] left-[-5%] xl:left-0 w-[500px] h-[600px] z-10 pointer-events-auto opacity-90 items-center justify-center">
         <Spline scene="https://prod.spline.design/FcZ66SFMX1YbF-0I/scene.splinecode" className="w-full h-full cursor-grab active:cursor-grabbing" />
      </div>

      {/* 3D Spline Robot - Rightmost (Replaced BadgeLanyard) */}
      <div className="hidden lg:flex absolute top-[10%] right-[-5%] xl:right-0 w-[500px] h-[600px] z-10 pointer-events-auto opacity-90 items-center justify-center">
        <Spline scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" className="w-full h-full cursor-grab active:cursor-grabbing" />
      </div>

      <div className="container mx-auto px-4 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-10"
          >
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <motion.img
                src="/brand-logo.png"
                alt="JBN creative monogram"
                className="w-32 h-32 md:w-40 md:h-40 z-20"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
              />
              <div className="text-center md:text-left flex flex-col items-center md:items-start gap-4">

                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-heading leading-tight">
                  <span className="text-white">{t('Hero.Software')}</span> <br className="hidden md:block" />
                  <span className="gradient-text glow-text-primary">
                    {t('Hero.Engineer')}
                  </span>
                </h1>
              </div>
            </div>
          </motion.div>

          <div className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 h-16 md:h-20 max-w-2xl mx-auto">
            <TypeAnimation
              key={t('Hero.TypeSequence.0')} // Force re-render on language change
              sequence={[
                t('Hero.TypeSequence.0'),
                2000,
                t('Hero.TypeSequence.1'),
                2000,
                t('Hero.TypeSequence.2'),
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            {t('Hero.Description')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex justify-center gap-8 md:gap-16 mb-12 text-xs md:text-sm uppercase tracking-wider font-semibold text-muted-foreground glass py-6 px-10 rounded-2xl mx-auto max-w-3xl border border-primary/20"
          >
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-5xl font-extrabold text-primary mb-2 glow-text-primary">3+</span>
              <span>{t('Hero.Experience')}</span>
            </div>
            <div className="w-px bg-primary/30 h-16"></div>
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-5xl font-extrabold text-primary mb-2 glow-text-primary">25+</span>
              <span>{t('Hero.Projects')}</span>
            </div>
            <div className="w-px bg-primary/30 h-16"></div>
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-5xl font-extrabold text-primary mb-2 glow-text-primary">100%</span>
              <span>{t('Hero.Satisfaction')}</span>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.8 }}
            className="flex gap-4 justify-center mb-10"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1, type: "spring" }}
                whileHover={{ scale: 1.2, backgroundColor: "rgba(6, 182, 212, 0.2)", borderColor: "rgba(6, 182, 212, 0.5)", boxShadow: "0 0 20px rgba(6, 182, 212, 0.4)" }}
                className="p-3 glass rounded-full border border-primary/10 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                <social.icon className="w-5 h-5 text-primary/80" />
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-wrap gap-4 justify-center mb-16"
          >
            <Link href="/projects" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-[30px]">
              <LiquidButton active={true}>
                {t('Hero.ViewWork')}
              </LiquidButton>
            </Link>
            <a href="tel:+998930054287" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-[30px]">
              <LiquidButton>
                {t('Hero.GetTouch')}
              </LiquidButton>
            </a>
          </motion.div>


        </motion.div>
      </div>



      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-5 h-9 border-2 border-primary/30 rounded-full flex justify-center p-1.5"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-1 bg-primary/60 rounded-full"
          />
        </motion.div>
      </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-black/40">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-center gap-10 mb-16 text-center md:text-left"
          >
            <motion.img
              src="/My Portret.png"
              alt="Bobur Portrait"
              className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-tr-[100px] rounded-bl-[100px] border-2 border-primary/30 shadow-2xl transition-transform duration-500"
              whileHover={{ scale: 1.05 }}
            />
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                {t('Services.Title')} <span className="text-primary italic">{t('Services.Span')}</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {t('Services.Description')}
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Layout,
                title: t('Services.Items.Frontend'),
                desc: t('Services.Items.FrontendDesc'),
              },
              {
                icon: Database,
                title: t('Services.Items.Backend'),
                desc: t('Services.Items.BackendDesc'),
              },
              {
                icon: Smartphone,
                title: t('Services.Items.Responsive'),
                desc: t('Services.Items.ResponsiveDesc'),
              },
              {
                icon: Code,
                title: t('Services.Items.CleanCode'),
                desc: t('Services.Items.CleanCodeDesc'),
              },
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass p-6 rounded-2xl border border-primary/20 hover:border-primary/50 transition-all duration-300 group hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                tabIndex={0}
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};


export default Hero;
