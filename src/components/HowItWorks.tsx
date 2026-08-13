import { useLanguage } from '@/i18n/LanguageContext';
import { Settings, Download, Mail, Upload } from 'lucide-react';

export default function HowItWorks() {
  const { t } = useLanguage();

  const steps = [
    {
      icon: <Settings className="w-8 h-8" />,
      title: t('step1Title'),
      desc: t('step1Desc'),
    },
    {
      icon: <Download className="w-8 h-8" />,
      title: t('step2Title'),
      desc: t('step2Desc'),
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: t('step3Title'),
      desc: t('step3Desc'),
    },
    {
      icon: <Upload className="w-8 h-8" />,
      title: t('step4Title'),
      desc: t('step4Desc'),
    }
  ];

  return (
    <section id="how-it-works" className="w-full max-w-7xl mx-auto py-20 px-6 md:px-12 relative z-10">
      <div className="mb-12">
        <h2 className="text-4xl md:text-6xl font-black text-zinc-900 mb-6 tracking-tight leading-tight">{t('howItWorksTitle')}</h2>
        <p className="text-xl md:text-2xl text-zinc-600 font-light max-w-3xl leading-relaxed">{t('howItWorksDesc')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, idx) => (
          <div key={idx} className="group relative flex flex-col items-start p-8 rounded-2xl bg-zinc-900 border border-zinc-800 transition-all shadow-lg overflow-hidden hover:border-emerald-500/50">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
            
            <div className="absolute top-4 right-6 text-6xl font-black text-zinc-800/40 group-hover:text-zinc-700/50 transition-colors select-none z-10">0{idx + 1}</div>
              
            <div className="mb-8 w-14 h-14 rounded-xl flex items-center justify-center bg-emerald-500/10 border border-emerald-500/20 group-hover:border-emerald-500/40 transition-all [&>svg]:text-emerald-500 relative z-10">
              {step.icon}
            </div>
            <h3 className="text-xl font-bold mb-3 text-zinc-100 tracking-tight relative z-10">{step.title}</h3>
            <p className="font-light text-zinc-400 leading-relaxed text-base relative z-10">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
