import { useTranslation } from "react-i18next";
import { useTheme } from "./ThemeProvider";
import { Moon, Sun, Globe, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import logoImg from '../assets/logo.png';

export function Navbar() {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
  };

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: "#features", label: t('nav.features') },
    { href: "#tour", label: t('nav.tour') },
    { href: "#why-us", label: t('nav.whyUs') },
    { href: "#pricing", label: t('nav.pricing') },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a href="#" className="flex items-center group transition-transform hover:scale-105">
          <img src={logoImg} alt="Takka Logo" className="h-14 w-auto object-contain rounded-xl shadow-lg" />
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-muted-foreground hover:text-[var(--color-takka-gold)] transition-colors">
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleLanguage} aria-label="Toggle Language" className="text-muted-foreground hover:text-[var(--color-takka-gold)]">
            <Globe className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label="Toggle Theme"
            className="text-muted-foreground hover:text-[var(--color-takka-gold)]"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
          <Button onClick={() => window.open('https://drive.google.com/file/d/1L948Ncit48tH-A58hYvBddErVkzLkLAG/view?usp=drive_link', '_blank')} variant="outline" className="ml-4 border-[var(--color-takka-gold)] text-[var(--color-takka-gold)] hover:bg-[var(--color-takka-gold)] hover:text-[var(--color-takka-navy)] transition-colors rounded-full px-6">
            {t('nav.download')}
          </Button>
          <Button onClick={() => window.open('https://wa.me/201037230660', '_blank')} className="rtl:mr-2 ltr:ml-2 bg-[var(--color-takka-gold)] text-[var(--color-takka-navy)] hover:bg-foreground hover:text-background transition-colors rounded-full px-6 font-bold">
            {t('nav.contact')}
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleLanguage} aria-label="Toggle Language">
            <Globe className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label="Toggle Theme"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="flex flex-col px-4 py-6 gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.href} 
                  href={link.href} 
                  className="text-lg font-medium text-muted-foreground hover:text-[var(--color-takka-gold)] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button onClick={() => window.open('https://drive.google.com/file/d/1L948Ncit48tH-A58hYvBddErVkzLkLAG/view?usp=drive_link', '_blank')} variant="outline" className="w-full mt-2 border-[var(--color-takka-gold)] text-[var(--color-takka-gold)] hover:bg-[var(--color-takka-gold)] hover:text-[var(--color-takka-navy)] rounded-full">
                {t('nav.download')}
              </Button>
              <Button onClick={() => window.open('https://wa.me/201037230660', '_blank')} className="w-full bg-[var(--color-takka-gold)] text-[var(--color-takka-navy)] hover:bg-foreground hover:text-background rounded-full font-bold">
                {t('nav.contact')}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
