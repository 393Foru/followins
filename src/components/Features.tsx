import { useLanguage } from '@/i18n/LanguageContext';
import { ShieldAlert, BarChart3, Zap } from 'lucide-react';

export default function Features() {
  const { t } = useLanguage();

  const features = [
    {
      icon: <ShieldAlert className="w-10 h-10 text-white" />,
      title: t('feat1Title'),
      desc: t('feat1Desc'),
      bg: "bg-gradient-to-br from-green-400 to-emerald-600"
    },
    {
      icon: <BarChart3 className="w-10 h-10 text-white" />,
      title: t('feat2Title'),
      desc: t('feat2Desc'),
      bg: "bg-gradient-to-br from-pink-400 to-rose-600"
    },
    {
      icon: <Zap className="w-10 h-10 text-white" />,
      title: t('feat3Title'),
      desc: t('feat3Desc'),
      bg: "bg-gradient-to-br from-purple-400 to-indigo-600"
    }
  ];

  return (
    <section id="features" className="w-full max-w-6xl mx-auto py-12 px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">{t('featuresTitle')}</h2>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">{t('featuresDesc')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feat, idx) => (
          <div key={idx} className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 hover:-translate-y-2 transition-transform duration-300">
            <div className={`w-16 h-16 rounded-2xl ${feat.bg} flex items-center justify-center mb-6 shadow-lg`}>
              {feat.icon}
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">{feat.title}</h3>
            <p className="text-slate-500 leading-relaxed">{feat.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
