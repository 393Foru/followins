import { useLanguage } from '@/i18n/LanguageContext';
import { ShieldCheck, KeyRound, Code } from 'lucide-react';

export default function PrivacySection() {
  const { t } = useLanguage();

  return (
    <section className="w-full py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row items-stretch bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm relative">

          <div className="w-full lg:w-1/2 p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-zinc-200 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-bold mb-8 border border-blue-200">
              <ShieldCheck className="w-5 h-5" />
              {t('privacyTitle')}
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-zinc-900 leading-tight">
              {t('privacyTitle')}
            </h2>
            <p className="text-xl text-zinc-600 font-light mb-12 leading-relaxed">
              {t('privacyDesc')}
            </p>
            
            <div className="space-y-8">
              <div className="flex gap-6 items-start group">
                <div className="w-14 h-14 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-700 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Code className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-zinc-900">{t('priv1Title')}</h3>
                  <p className="text-zinc-600 font-light text-base leading-relaxed">{t('priv1Desc')}</p>
                </div>
              </div>
              
              <div className="flex gap-6 items-start group">
                <div className="w-14 h-14 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-700 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <KeyRound className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-zinc-900">{t('priv2Title')}</h3>
                  <p className="text-zinc-600 font-light text-base leading-relaxed">{t('priv2Desc')}</p>
                </div>
              </div>
              
              <div className="flex gap-6 items-start group">
                <div className="w-14 h-14 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-700 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-zinc-900">{t('priv3Title')}</h3>
                  <p className="text-zinc-600 font-light text-base leading-relaxed">{t('priv3Desc')}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 p-8 md:p-12 flex items-center justify-center bg-zinc-900 relative z-10 overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="w-full max-w-lg bg-zinc-950 rounded-xl shadow-2xl overflow-hidden font-mono border border-zinc-800 relative z-10">
              
              <div className="flex items-center px-4 py-3 bg-zinc-900 border-b border-zinc-800 relative z-20">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                </div>
                <div className="mx-auto text-zinc-500 text-xs font-semibold tracking-wider font-sans select-none">
                  engine.sh
                </div>
              </div>

              <div className="p-6 md:p-8 relative">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900/50 via-zinc-950/0 to-transparent pointer-events-none"></div>
                <div className="text-sm md:text-base text-zinc-300 font-medium leading-loose space-y-2 relative z-10">
                  <div className="flex items-center gap-2"><span className="text-emerald-500">{`>`}</span> Initializing extraction...</div>
                  <div className="flex items-center gap-2 text-zinc-400"><span className="text-emerald-500">{`>`}</span> Reading followers.json [LOCAL]</div>
                  <div className="flex items-center gap-2 text-zinc-400"><span className="text-emerald-500">{`>`}</span> Reading following.json [LOCAL]</div>
                  <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-md border border-emerald-500/20 mt-2 mb-2"><span className="text-emerald-500">{`>`}</span> Network isolated.</div>
                  <div className="flex items-center gap-2 mt-2"><span className="text-emerald-500">{`>`}</span> Cross-referencing sets...</div>
                  <div className="flex items-center gap-2 text-zinc-100 border-b border-zinc-800 pb-1 inline-flex"><span className="text-emerald-500">{`>`}</span> Found 142 Unfollowers.</div>
                  <div className="flex items-center gap-2 mt-4"><span className="text-emerald-500">{`>`}</span> Rendering UI.</div>
                  <div className="mt-10 border-t border-dashed border-zinc-800 pt-6 opacity-70 text-xs md:text-sm space-y-1 text-zinc-500">
                    <div>{`// ALL OPERATIONS PERFORMED IN-BROWSER`}</div>
                    <div>{`// DATA IS DESTROYED UPON EXIT`}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
