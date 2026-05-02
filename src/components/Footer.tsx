import { Github, Linkedin, Instagram, Send, Heart, Check } from "lucide-react";
import { useBg, bgImages } from "../contexts/BgContext";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { activeBgIndex, setActiveBgIndex } = useBg();

  return (
    <footer className="border-t border-primary/10 bg-background/50 backdrop-blur-lg pt-16 pb-8 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <img src="/brand-logo.png" alt="Logo" className="w-8 h-8 drop-shadow-lg" />
              <h3 className="text-xl font-bold gradient-text">Jovliyev Bobur<br/>Nuriddin o'g'li</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Zamonaviy dasturlash va kreativ yechimlar. Zamonaviy web texnologiyalari va dasturlash tillari bilan ishlayman. Kreativ yechimlar va sifatli kod yozishni yaxshi ko'raman.
            </p>
            <div className="flex gap-4 pt-4">
              <a href="https://t.me/Jovliyev_Bobur" className="text-muted-foreground hover:text-primary transition-colors" target="_blank" rel="noreferrer">
                <Send className="w-5 h-5" />
              </a>
              <a href="https://github.com/JBoburHacker005" className="text-muted-foreground hover:text-primary transition-colors" target="_blank" rel="noreferrer">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com/in/Bobur005" className="text-muted-foreground hover:text-primary transition-colors" target="_blank" rel="noreferrer">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://instagram.com/j.bobur005" className="text-muted-foreground hover:text-primary transition-colors" target="_blank" rel="noreferrer">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6 text-foreground">Loyihalar</h4>
            <ul className="space-y-4">
              {["Web Development", "Mobile Apps", "AI/ML", "Cloud Solutions"].map((item) => (
                <li key={item}>
                  <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-default">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6 text-foreground">Texnologiyalar</h4>
            <ul className="space-y-4">
              {["Frontend", "Backend", "Database", "DevOps"].map((item) => (
                <li key={item}>
                  <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-default">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6 text-foreground">Yordam</h4>
            <ul className="space-y-4">
              {["FAQ", "Aloqa", "Blog", "Jamiyat"].map((item) => (
                <li key={item}>
                  <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-default">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Background Selector */}
        <div className="flex flex-col items-center justify-center pt-8 mb-8 border-t border-primary/10">
          <h4 className="text-sm font-medium text-muted-foreground mb-4">Orqa fonni tanlang</h4>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {/* None option */}
            <button
              onClick={() => setActiveBgIndex(null)}
              className="relative w-10 h-10 rounded-md bg-white border-2 transition-all duration-300 flex items-center justify-center overflow-hidden"
              style={{ borderColor: activeBgIndex === null ? 'hsl(var(--primary))' : 'transparent' }}
              aria-label="No background"
            >
              {activeBgIndex === null && <Check className="w-5 h-5 text-primary drop-shadow-md z-10" />}
            </button>
            
            {/* Image options */}
            {bgImages.map((imgUrl, idx) => (
              <button
                key={idx}
                onClick={() => setActiveBgIndex(idx)}
                className="relative w-10 h-10 rounded-md bg-[#1a1a1a] border-2 transition-all duration-300 flex items-center justify-center overflow-hidden group"
                style={{ borderColor: activeBgIndex === idx ? 'hsl(var(--primary))' : 'transparent' }}
                aria-label={`Background ${idx + 1}`}
              >
                <img 
                  src={imgUrl} 
                  alt={`Bg ${idx + 1}`} 
                  className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity"
                />
                {activeBgIndex === idx && <Check className="w-5 h-5 text-primary drop-shadow-md z-10" />}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-primary/10 text-sm text-muted-foreground">
          <p>© {currentYear} Jovliyev Bobur Nuriddin o'g'li. Barcha huquqlar himoyalangan.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="https://jbobur.vercel.app/" className="hover:text-primary transition-colors">Maxfiylik</a>
            <a href="https://jbobur.vercel.app/" className="hover:text-primary transition-colors">Shartlar</a>
            <a href="https://jbobur.vercel.app/" className="hover:text-primary transition-colors">Cookie</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

