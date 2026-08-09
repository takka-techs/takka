import { motion } from "motion/react";
import { ScanBarcode, Wrench, PackageSearch, ArrowLeftRight, Wallet, Store, LineChart, ShieldCheck, CreditCard, Link, Smartphone } from "lucide-react";
import { AnimatedText } from "./AnimatedText";
import { useTranslation } from "react-i18next";

export function BentoGrid() {
  const { t } = useTranslation();

  return (
    <section className="py-32 bg-secondary/50 relative overflow-hidden" id="features">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-overlay"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
           <div className="inline-block mb-4">
              <span className="text-[var(--color-takka-gold)] font-medium tracking-widest uppercase text-sm">{t('features.badge')}</span>
          </div>
          <AnimatedText 
            text={t('features.title')} 
            className="text-4xl md:text-5xl font-bold mb-6 text-foreground max-w-3xl mx-auto"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          
          {/* 1. POS */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="md:col-span-2 relative p-8 md:p-12 rounded-3xl bg-card border border-border group overflow-hidden shadow-sm"
          >
            <div className="absolute top-0 right-0 w-full h-full bg-[var(--color-takka-gold)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <div className="flex flex-col md:flex-row gap-8 items-center relative z-10 h-full">
              <div className="flex-1 text-right ltr:text-left">
                <div className="w-14 h-14 bg-[var(--color-takka-gold)]/20 rounded-2xl flex items-center justify-center mb-6 text-[var(--color-takka-gold)]">
                  <ScanBarcode size={28} />
                </div>
                <h3 className="text-3xl font-bold text-card-foreground mb-4">{t('features.pos.title')}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">{t('features.pos.desc')}</p>
              </div>
              
              <div className="flex-1 w-full flex justify-center">
                {/* Fake Barcode Scan Animation */}
                <div className="w-48 h-48 bg-background/50 backdrop-blur-md rounded-2xl border border-border relative p-4 flex items-center justify-center shadow-inner">
                   <div className="flex flex-col gap-2 w-full max-w-[120px]">
                      <div className="h-2 w-full bg-foreground/80 rounded-full"></div>
                      <div className="h-2 w-full bg-foreground/80 rounded-full"></div>
                      <div className="h-2 w-3/4 bg-foreground/80 rounded-full"></div>
                      <div className="h-2 w-full bg-foreground/80 rounded-full"></div>
                      <div className="h-2 w-1/2 bg-foreground/80 rounded-full"></div>
                   </div>
                   <motion.div 
                      animate={{ y: [-70, 70, -70] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                      className="absolute left-4 right-4 h-1 bg-red-500 shadow-[0_0_10px_red]"
                   />
                </div>
              </div>
            </div>
          </motion.div>

          {/* 2. Installments */}
          <motion.div 
             initial={{ opacity: 0, y: 50 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ delay: 0.1 }}
             className="relative p-8 rounded-3xl bg-card border border-border group overflow-hidden hover:border-[var(--color-takka-gold)] transition-colors shadow-sm"
          >
             <div className="w-12 h-12 bg-green-500/10 dark:bg-green-500/20 rounded-xl flex items-center justify-center mb-6 text-green-600 dark:text-green-500">
               <Wallet size={24} />
             </div>
             <h3 className="text-xl font-bold text-card-foreground mb-3">{t('features.installments.title')}</h3>
             <p className="text-muted-foreground text-sm">{t('features.installments.desc')}</p>
          </motion.div>

          {/* 3. Maintenance */}
          <motion.div 
             initial={{ opacity: 0, y: 50 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ delay: 0.2 }}
             className="relative p-8 rounded-3xl bg-card border border-border group overflow-hidden hover:border-[var(--color-takka-gold)] transition-colors shadow-sm"
          >
            <div className="w-12 h-12 bg-blue-500/10 dark:bg-blue-500/20 rounded-xl flex items-center justify-center mb-6 text-blue-600 dark:text-blue-500">
              <Wrench size={24} />
            </div>
            <h3 className="text-xl font-bold text-card-foreground mb-2">{t('features.maintenance.title')}</h3>
            <p className="text-muted-foreground text-sm">{t('features.maintenance.desc')}</p>
          </motion.div>

          {/* 4. Inventory */}
           <motion.div 
             initial={{ opacity: 0, y: 50 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ delay: 0.3 }}
             className="relative p-8 rounded-3xl bg-card border border-border group overflow-hidden hover:border-[var(--color-takka-gold)] transition-colors shadow-sm"
          >
            <div className="w-12 h-12 bg-purple-500/10 dark:bg-purple-500/20 rounded-xl flex items-center justify-center mb-6 text-purple-600 dark:text-purple-400">
              <PackageSearch size={24} />
            </div>
            <h3 className="text-xl font-bold text-card-foreground mb-2">{t('features.inventory.title')}</h3>
            <p className="text-muted-foreground text-sm">{t('features.inventory.desc')}</p>
          </motion.div>

          {/* 5. Branches */}
           <motion.div 
             initial={{ opacity: 0, y: 50 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ delay: 0.4 }}
             className="relative p-8 rounded-3xl bg-card border border-border group overflow-hidden hover:border-[var(--color-takka-gold)] transition-colors flex flex-col justify-center shadow-sm"
          >
            <div className="w-12 h-12 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-xl flex items-center justify-center mb-6 text-indigo-600 dark:text-indigo-400">
              <Store size={24} />
            </div>
            <h3 className="text-xl font-bold text-card-foreground mb-2">{t('features.branches.title')}</h3>
            <p className="text-muted-foreground text-sm">{t('features.branches.desc')}</p>
          </motion.div>

          {/* 6. Shifts */}
          <motion.div 
             initial={{ opacity: 0, y: 50 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ delay: 0.5 }}
             className="relative p-8 rounded-3xl bg-card border border-border group overflow-hidden hover:border-[var(--color-takka-gold)] transition-colors flex flex-col justify-center shadow-sm"
          >
            <div className="w-12 h-12 bg-orange-500/10 dark:bg-orange-500/20 rounded-xl flex items-center justify-center mb-6 text-orange-600 dark:text-orange-500">
              <ArrowLeftRight size={24} />
            </div>
            <h3 className="text-xl font-bold text-card-foreground mb-2">{t('features.shifts.title')}</h3>
            <p className="text-muted-foreground text-sm">{t('features.shifts.desc')}</p>
          </motion.div>

          {/* 7. Reports */}
          <motion.div 
             initial={{ opacity: 0, y: 50 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ delay: 0.6 }}
             className="relative p-8 rounded-3xl bg-card border border-border group overflow-hidden hover:border-[var(--color-takka-gold)] transition-colors flex flex-col justify-center shadow-sm"
          >
            <div className="w-12 h-12 bg-cyan-500/10 dark:bg-cyan-500/20 rounded-xl flex items-center justify-center mb-6 text-cyan-600 dark:text-cyan-400">
              <LineChart size={24} />
            </div>
            <h3 className="text-xl font-bold text-card-foreground mb-2">{t('features.reports.title')}</h3>
            <p className="text-muted-foreground text-sm">{t('features.reports.desc')}</p>
          </motion.div>

          {/* 8. Roles */}
          <motion.div 
             initial={{ opacity: 0, y: 50 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ delay: 0.7 }}
             className="relative p-8 rounded-3xl bg-card border border-border group overflow-hidden hover:border-[var(--color-takka-gold)] transition-colors flex flex-col justify-center shadow-sm"
          >
            <div className="w-12 h-12 bg-rose-500/10 dark:bg-rose-500/20 rounded-xl flex items-center justify-center mb-6 text-rose-600 dark:text-rose-500">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-bold text-card-foreground mb-2">{t('features.roles.title')}</h3>
            <p className="text-muted-foreground text-sm">{t('features.roles.desc')}</p>
          </motion.div>

          {/* 9. Shipping Machines */}
          <motion.div 
             initial={{ opacity: 0, y: 50 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ delay: 0.8 }}
             className="relative p-8 rounded-3xl bg-card border border-border group overflow-hidden hover:border-[var(--color-takka-gold)] transition-colors flex flex-col justify-center shadow-sm"
          >
            <div className="w-12 h-12 bg-teal-500/10 dark:bg-teal-500/20 rounded-xl flex items-center justify-center mb-6 text-teal-600 dark:text-teal-400">
              <CreditCard size={24} />
            </div>
            <h3 className="text-xl font-bold text-card-foreground mb-2">{t('features.shipping.title')}</h3>
            <p className="text-muted-foreground text-sm">{t('features.shipping.desc')}</p>
          </motion.div>

          {/* 10. Customer Tracking Links */}
          <motion.div 
             initial={{ opacity: 0, y: 50 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ delay: 0.9 }}
             className="relative p-8 rounded-3xl bg-card border border-border group overflow-hidden hover:border-[var(--color-takka-gold)] transition-colors flex flex-col justify-center shadow-sm"
          >
            <div className="w-12 h-12 bg-yellow-500/10 dark:bg-yellow-500/20 rounded-xl flex items-center justify-center mb-6 text-yellow-600 dark:text-yellow-500">
              <Link size={24} />
            </div>
            <h3 className="text-xl font-bold text-card-foreground mb-2">{t('features.tracking.title')}</h3>
            <p className="text-muted-foreground text-sm">{t('features.tracking.desc')}</p>
          </motion.div>

          {/* 11. Mobile App */}
          <motion.div 
             initial={{ opacity: 0, y: 50 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ delay: 1.0 }}
             className="relative p-8 rounded-3xl bg-card border border-border group overflow-hidden hover:border-[var(--color-takka-gold)] transition-colors flex flex-col justify-center shadow-sm"
          >
            <div className="w-12 h-12 bg-pink-500/10 dark:bg-pink-500/20 rounded-xl flex items-center justify-center mb-6 text-pink-600 dark:text-pink-400">
              <Smartphone size={24} />
            </div>
            <h3 className="text-xl font-bold text-card-foreground mb-2">{t('features.mobile.title')}</h3>
            <p className="text-muted-foreground text-sm">{t('features.mobile.desc')}</p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
