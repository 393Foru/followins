import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/i18n/LanguageContext';
import Link from 'next/link';
import { ReactNode } from 'react';

interface LegalPageLayoutProps {
  children: ReactNode;
}

export default function LegalPageLayout({ children }: LegalPageLayoutProps) {
  const { language } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 text-zinc-900 font-sans">
      <Header />
      
      <main className="flex-1 flex flex-col px-6 py-10 md:py-12 max-w-4xl mx-auto w-full">
        <div className="relative overflow-hidden bg-zinc-900 p-6 md:p-10 rounded-3xl shadow-lg border border-zinc-800">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
          
          <div className="relative z-10">
            {children}
            
            <div className="mt-8 text-center border-t border-zinc-800 pt-6">
              <Link href="/" className="inline-block px-8 py-3 text-sm font-bold bg-emerald-500 text-zinc-950 rounded-full hover:bg-emerald-400 transition shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] transform hover:-translate-y-0.5">
                {language === 'id' ? 'Kembali ke Beranda' : 'Back to Home'}
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
