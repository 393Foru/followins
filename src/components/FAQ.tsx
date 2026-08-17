import { useLanguage } from '@/i18n/LanguageContext';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const { t } = useLanguage();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    { q: t('q1'), a: t('a1') },
    { q: t('q2'), a: t('a2') },
    { q: t('q3'), a: t('a3') }
  ];

  return (
    <section id="faq" className="w-full max-w-4xl mx-auto py-8 md:py-20 px-6 md:px-12 relative z-10">
      <div className="mb-8 md:mb-12 text-left">
        <h2 className="text-fluid-h2 font-black text-zinc-900 mb-6 tracking-tight leading-tight">{t('faqTitle')}</h2>
        <p className="text-fluid-subtitle text-zinc-600 font-light leading-relaxed">{t('faqDesc')}</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div 
            key={idx} 
            className={`rounded-xl border transition-all duration-300 overflow-hidden relative ${openIdx === idx ? 'bg-zinc-900 border-emerald-500/50 shadow-lg shadow-emerald-500/5' : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'}`}
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
            
            <button
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              className="w-full p-6 md:p-8 flex items-center justify-between text-left focus:outline-none relative z-10"
            >
              <span className={`font-bold text-fluid-h4 tracking-tight pr-8 ${openIdx === idx ? 'text-emerald-400' : 'text-zinc-100'}`}>
                {faq.q}
              </span>
              <ChevronDown className={`w-6 h-6 transition-transform duration-300 shrink-0 ${openIdx === idx ? 'rotate-180 text-emerald-500' : 'text-zinc-500'}`} />
            </button>
            
            <div 
              className={`px-6 md:px-8 transition-all duration-300 ease-in-out relative z-10 ${openIdx === idx ? 'max-h-[500px] pb-8 opacity-100' : 'max-h-0 py-0 opacity-0'}`}
            >
              <p className="text-zinc-400 font-light text-base md:text-lg leading-relaxed">{faq.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
