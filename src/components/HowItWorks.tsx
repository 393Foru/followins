import { useLanguage } from '@/i18n/LanguageContext';
import { Settings, Download, Mail, Upload } from 'lucide-react';

export default function HowItWorks() {
  const { t } = useLanguage();

  const steps = [
    {
      icon: <Settings className="w-8 h-8 text-pink-500" />,
      title: t('step1Title'),
      desc: t('step1Desc'),
      color: "bg-pink-100"
    },
    {
      icon: <Download className="w-8 h-8 text-purple-500" />,
      title: t('step2Title'),
      desc: t('step2Desc'),
      color: "bg-purple-100"
    },
    {
      icon: <Mail className="w-8 h-8 text-blue-500" />,
      title: t('step3Title'),
      desc: t('step3Desc'),
      color: "bg-blue-100"
    },
    {
      icon: <Upload className="w-8 h-8 text-green-500" />,
      title: t('step4Title'),
      desc: t('step4Desc'),
      color: "bg-green-100"
    }
  ];

  return (
    <section id="how-it-works" className="w-full max-w-5xl mx-auto py-12 px-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">{t('howItWorksTitle')}</h2>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">{t('howItWorksDesc')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, idx) => (
          <div key={idx} className="relative flex flex-col items-center text-center group">
            {/* Connector Line for Desktop */}
            {idx < steps.length - 1 && (
              <div className="hidden lg:block absolute top-12 left-1/2 w-full h-[2px] bg-slate-200 -z-10 group-hover:bg-pink-200 transition-colors duration-300"></div>
            )}
            
            <div className={`w-24 h-24 rounded-full ${step.color} flex items-center justify-center mb-6 shadow-sm ring-4 ring-white`}>
              {step.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">{step.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
