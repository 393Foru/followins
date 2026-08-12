"use client";

import { Camera, Globe, ArrowUpCircle } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { usePathname, useRouter } from 'next/navigation';

export default function Header() {
  const { t, toggleLanguage } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();

  const scrollToTop = () => {
    if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push('/');
    }
  };

  const scrollToSection = (id: string) => {
    if (pathname === '/') {
      const el = document.getElementById(id);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    } else {
      router.push('/#' + id);
    }
  };

  return (
    <header className="flex items-center justify-between p-4 md:px-8 bg-white sticky top-0 z-50 border-b border-slate-200">
      <div className="flex items-center gap-2 cursor-pointer" onClick={scrollToTop}>
        <Camera className="text-black" size={28} />
        <span className="font-black text-xl text-black tracking-tight uppercase">
          Followins
        </span>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-8">
        <button onClick={() => scrollToSection('how-it-works')} className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">
          {t('navHowItWorks')}
        </button>
        <button onClick={() => scrollToSection('features')} className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">
          {t('navFeatures')}
        </button>
        <button onClick={() => scrollToSection('faq')} className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">
          {t('navFaq')}
        </button>
      </nav>

      <div className="flex items-center gap-3">
        <button 
          onClick={toggleLanguage}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors px-3 py-1.5 bg-slate-100 rounded-full hover:bg-slate-200"
          title="Toggle Language"
        >
          <Globe size={14} className="text-slate-500" />
          <span>{t('langSwitch')}</span>
        </button>

        <button 
          onClick={scrollToTop}
          className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white rounded-full text-sm font-bold hover:bg-slate-800 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
        >
          {t('navUpload')}
          <ArrowUpCircle size={16} className="text-pink-400" />
        </button>
      </div>
    </header>
  );
}
