import { useLanguage } from '@/i18n/LanguageContext';
import Link from 'next/link';
import { Camera, Shield, FileText, MessageCircle } from 'lucide-react';

export default function Footer() {
  const { t, language } = useLanguage();
  
  return (
    <footer className="w-full bg-white border-t border-slate-200 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Logo & Slogan */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
              <Camera className="text-slate-800" size={24} />
              <span className="font-bold text-xl text-slate-800 tracking-tight">
                Followins
              </span>
            </div>
            <p className="text-slate-500 text-sm max-w-xs text-center md:text-left leading-relaxed">
              {t('footerText')}
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            <Link href="/privacy" className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-pink-500 transition-colors">
              <Shield size={16} />
              {t('privacyPolicy')}
            </Link>
            <Link href="/terms" className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-pink-500 transition-colors">
              <FileText size={16} />
              {t('termsOfService')}
            </Link>
            <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-green-500 transition-colors">
              <MessageCircle size={16} />
              {t('whatsappSupport')}
            </a>
          </div>

        </div>
        
        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-xs font-medium">
            © {new Date().getFullYear()} Followins. {language === 'en' ? 'All rights reserved.' : 'Hak Cipta Dilindungi.'}
          </p>
          <p className="text-slate-400 text-xs font-medium">
            {language === 'en' ? 'A project by' : 'Sebuah proyek dari'} <span className="font-bold text-slate-600">amatama.inc</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
