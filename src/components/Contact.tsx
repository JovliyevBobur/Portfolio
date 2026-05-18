import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Mail, Phone, Github, Linkedin, Instagram, Send, MapPin, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const { toast } = useToast();
  
  // Persist form data using useLocalStorage hook
  const [formData, setFormData] = useLocalStorage("contact-form-data", {
    name: "",
    email: "",
    message: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      toast({
        title: "Xatolik!",
        description: "Telegram bot sozlamalari topilmadi. Dasturchiga murojaat qiling.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    const text = `📩 <b>Yangi xabar portfoliodan!</b>\n\n👤 <b>Ism:</b> ${formData.name}\n📧 <b>Email:</b> ${formData.email}\n📝 <b>Xabar:</b> ${formData.message}`;

    try {
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
          parse_mode: "HTML"
        }),
      });

      if (response.ok) {
        toast({
          title: "Xabar yuborildi!",
          description: "Tez orada siz bilan bog'lanaman.",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error("Telegram API xatosi");
      }
    } catch (error) {
      toast({
        title: "Xatolik!",
        description: "Xabarni yuborishda xatolik yuz berdi. Iltimos keyinroq urinib ko'ring.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactLinks = [
    { icon: Mail, label: "Email", value: "jbobur005@gmail.com", href: "mailto:jbobur005@gmail.com", color: "text-red-400" },
    { icon: Phone, label: "Telefon", value: "+998 93 005 42 87", href: "tel:+998930054287", color: "text-green-400" },
    { icon: Send, label: "Telegram", value: "@Jovliyev_Bobur", href: "https://t.me/Jovliyev_Bobur", color: "text-blue-400" },
    { icon: Github, label: "GitHub", value: "JBoburHacker005", href: "https://github.com/JBoburHacker005", color: "text-gray-200" },
    { icon: Linkedin, label: "LinkedIn", value: "Bobur005", href: "https://linkedin.com/in/Bobur005", color: "text-blue-500" },
    { icon: Instagram, label: "Instagram", value: "@j.bobur005", href: "https://instagram.com/j.bobur005", color: "text-pink-500" },
  ];

  return (
    <section ref={ref} id="contact" className="py-32 relative overflow-hidden bg-black/20">
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
            Bog'lanish
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold font-heading mb-6 leading-tight">
            Keling, birga <br /> <span className="gradient-text glow-text-primary italic">Mo'jiza</span> yaratamiz!
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sizda ajoyib g'oya bormi? Yoki loyiha ustida ishlashni xohlaysizmi? Xabar qoldiring va men siz bilan tezda bog'lanaman.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactLinks.map((info, index) => (
                <motion.a
                  href={info.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={info.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group flex flex-col p-8 glass rounded-[2rem] border border-white/5 hover:border-primary/40 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 blur-2xl rounded-full -mr-8 -mt-8 group-hover:bg-primary/20 transition-all"></div>
                  
                  <div className="p-4 bg-primary/10 rounded-2xl w-fit mb-6 group-hover:bg-primary group-hover:text-black transition-all">
                    <info.icon className={`w-7 h-7 ${info.color} group-hover:text-inherit transition-colors`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white mb-1">{info.label}</h3>
                    <p className="text-sm text-muted-foreground group-hover:text-white transition-colors">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
            
            <div className="p-10 rounded-[2.5rem] glass border border-primary/20 relative overflow-hidden">
               <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-primary/10 blur-[100px] rounded-full"></div>
               <h4 className="text-xl font-bold flex items-center gap-3 mb-4">
                 <Sparkles className="text-primary w-6 h-6" /> 
                 Tezkor bog'lanish
               </h4>
               <p className="text-muted-foreground leading-relaxed">
                 Telegram orqali yuborilgan xabarlarga odatda 15-30 daqiqa ichida javob beraman. Maxfiy loyihalar uchun alohida shifrlangan kanallarimiz mavjud.
               </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/10 via-transparent to-primary/10 blur-3xl -z-10 rounded-full opacity-50"></div>
            <form onSubmit={handleSubmit} className="glass p-10 md:p-14 rounded-[3rem] border border-white/10 space-y-8 relative overflow-hidden backdrop-blur-2xl">
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary/60 ml-4 uppercase tracking-widest">Ismingiz</label>
                <Input
                  type="text"
                  placeholder="Loyihalaringiz uchun qanday murojaat qilay?"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="bg-white/5 border-white/10 focus:border-primary/50 focus:ring-primary/20 h-16 rounded-2xl px-6 transition-all text-white placeholder:text-white/20"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary/60 ml-4 uppercase tracking-widest">Email Manzilingiz</label>
                <Input
                  type="email"
                  placeholder="Sizga qayerdan javob beray?"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="bg-white/5 border-white/10 focus:border-primary/50 focus:ring-primary/20 h-16 rounded-2xl px-6 transition-all text-white placeholder:text-white/20"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary/60 ml-4 uppercase tracking-widest">Xabaringiz</label>
                <Textarea
                  placeholder="G'oyangiz yoki savolingiz haqida batafsil yozing..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  rows={5}
                  className="bg-white/5 border-white/10 focus:border-primary/50 focus:ring-primary/20 rounded-[2rem] p-6 transition-all text-white placeholder:text-white/20 resize-none"
                />
              </div>
              
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full h-20 bg-primary hover:bg-primary/90 text-black font-black uppercase tracking-widest rounded-3xl transition-all duration-300 flex items-center justify-center gap-4 group hover:scale-[1.02] active:scale-95 shadow-[0_20px_40px_rgba(6,182,212,0.2)]"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-3">
                    Yuborilmoqda... <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                  </span>
                ) : (
                  <>
                    Xabarni Yuborish 
                    <Send className="w-5 h-5 group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </Button>
              
              <p className="text-center text-xs text-muted-foreground mt-6 opacity-60">
                 * Ma'lumotlaringiz xavfsizligi va maxfiyligi kafolatlanadi.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;


