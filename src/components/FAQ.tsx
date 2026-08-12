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
    <section id="faq" className="w-full max-w-3xl mx-auto py-12 px-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">{t('faqTitle')}</h2>
        <p className="text-lg text-slate-500">{t('faqDesc')}</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div 
            key={idx} 
            className={`border rounded-2xl overflow-hidden transition-colors ${openIdx === idx ? 'border-pink-200 bg-pink-50/50' : 'border-slate-200 bg-white'}`}
          >
            <button
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
            >
              <span className="font-bold text-lg text-slate-800">{faq.q}</span>
              <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${openIdx === idx ? 'rotate-180 text-pink-500' : ''}`} />
            </button>
            
            <div 
              className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openIdx === idx ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <p className="text-slate-600 leading-relaxed">{faq.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
