import { useLanguage } from '@/i18n/LanguageContext';
import { ShieldAlert, BarChart3, Zap } from 'lucide-react';

export default function Features() {
  const { t } = useLanguage();

  const features = [
    {
      icon: <ShieldAlert className="w-10 h-10" />,
      title: t('feat1Title'),
      desc: t('feat1Desc'),
    },
    {
      icon: <BarChart3 className="w-10 h-10" />,
      title: t('feat2Title'),
      desc: t('feat2Desc'),
    },
    {
      icon: <Zap className="w-10 h-10" />,
      title: t('feat3Title'),
      desc: t('feat3Desc'),
    }
  ];

  return (
    <section id="features" className="w-full max-w-7xl mx-auto py-20 px-6 md:px-12 relative z-10">
      <div className="mb-12 text-center">
        <h2 className="text-4xl md:text-6xl font-black text-zinc-900 mb-6 tracking-tight leading-tight">{t('featuresTitle')}</h2>
        <p className="text-xl md:text-2xl text-zinc-600 font-light max-w-3xl mx-auto leading-relaxed">{t('featuresDesc')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feat, idx) => (
          <div key={idx} className="group relative flex flex-col items-center p-10 rounded-2xl bg-zinc-900 border border-zinc-800 transition-all shadow-lg overflow-hidden hover:border-emerald-500/50 text-center">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
              
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-8 bg-emerald-500/10 border border-emerald-500/20 group-hover:scale-110 transition-transform duration-300 [&>svg]:text-emerald-500 relative z-10">
              {feat.icon}
            </div>
            <h3 className="text-2xl font-bold mb-4 text-zinc-100 tracking-tight relative z-10">{feat.title}</h3>
            <p className="font-light text-zinc-400 text-lg leading-relaxed relative z-10">{feat.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
