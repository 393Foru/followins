import { useLanguage } from '@/i18n/LanguageContext';
import { ShieldCheck, KeyRound, Code } from 'lucide-react';

export default function PrivacySection() {
  const { t } = useLanguage();

  return (
    <section className="w-full bg-slate-900 text-white py-12 mt-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-10">
        
        <div className="w-full lg:w-1/2">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 text-slate-300 text-sm font-semibold mb-6">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            {t('privacyTitle')}
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
            {t('privacyTitle')}
          </h2>
          <p className="text-lg text-slate-400 mb-8">
            {t('privacyDesc')}
          </p>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center shrink-0">
                <Code className="w-6 h-6 text-pink-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">{t('priv1Title')}</h3>
                <p className="text-slate-400 text-sm">{t('priv1Desc')}</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center shrink-0">
                <KeyRound className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">{t('priv2Title')}</h3>
                <p className="text-slate-400 text-sm">{t('priv2Desc')}</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">{t('priv3Title')}</h3>
                <p className="text-slate-400 text-sm">{t('priv3Desc')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <div className="relative rounded-3xl overflow-hidden bg-slate-800 p-1 shadow-2xl border border-slate-700">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-500/20"></div>
            <div className="relative bg-slate-900 rounded-3xl p-8 font-mono text-sm text-emerald-400 overflow-x-auto">
              <p>{`> Initializing client-side extraction...`}</p>
              <p>{`> Reading followers_1.json [LOCAL]`}</p>
              <p>{`> Reading following.json [LOCAL]`}</p>
              <p className="text-yellow-400">{`> Network isolated. No outbound requests.`}</p>
              <p>{`> Cross-referencing sets...`}</p>
              <p className="text-pink-400">{`> Found 142 Unfollowers.`}</p>
              <p>{`> Rendering UI dashboard.`}</p>
              <p className="mt-4 text-slate-500">{`// All operations performed in your browser's memory`}</p>
              <p className="text-slate-500">{`// Data is destroyed upon closing the tab`}</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
