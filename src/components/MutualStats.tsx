"use client";

import { useLanguage } from '@/i18n/LanguageContext';

interface MutualStatsProps {
  data: { youFirst: number, themFirst: number, sameDay: number };
}

export default function MutualStats({ data }: MutualStatsProps) {
  const { t, formatCompactNumber } = useLanguage();
  if (!data) return null;

  const total = data.youFirst + data.themFirst + data.sameDay;
  if (total === 0) return null;

  return (
    <div className="w-full h-full flex flex-col bg-white border border-zinc-200 rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden">
      
      <div className="relative z-10 mb-8 border-b border-zinc-200 pb-6">
        <h3 className="text-2xl font-bold text-zinc-900 tracking-tight mb-2">{t('mutualStatsTitle')}</h3>
        <p className="text-sm text-zinc-600 font-light max-w-2xl">
          {t('mutualStatsDesc1')} <span className="text-zinc-900 font-bold font-mono px-2 py-0.5 bg-zinc-100 rounded border border-zinc-200 mx-1">{formatCompactNumber(total)}</span> {t('mutualStatsDesc2')}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 pt-4 pb-2">
        {/* You First */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left group w-full">
          <div className="text-4xl md:text-5xl xl:text-6xl font-black font-mono tracking-tight text-teal-600 mb-3 leading-tight group-hover:text-teal-500 transition-colors w-full break-words" title={data.youFirst.toString()}>
            {formatCompactNumber(data.youFirst)}
          </div>
          <div className="text-xs lg:text-sm font-bold uppercase tracking-widest text-zinc-900 font-mono mb-2">{t('youFirst')}</div>
          <div className="text-sm text-zinc-500 font-light leading-relaxed">{t('youFirstDesc')}</div>
        </div>
        
        {/* Same Day */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left border-t md:border-t-0 md:border-l border-zinc-200 pt-6 md:pt-0 md:pl-6 group w-full">
          <div className="text-4xl md:text-5xl xl:text-6xl font-black font-mono tracking-tight text-emerald-500 mb-3 leading-tight group-hover:text-emerald-400 transition-colors w-full break-words" title={data.sameDay.toString()}>
            {formatCompactNumber(data.sameDay)}
          </div>
          <div className="text-xs lg:text-sm font-bold uppercase tracking-widest text-zinc-900 font-mono mb-2">{t('sameDay')}</div>
          <div className="text-sm text-zinc-500 font-light leading-relaxed">{t('sameDayDesc')}</div>
        </div>

        {/* Them First */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left border-t md:border-t-0 md:border-l border-zinc-200 pt-6 md:pt-0 md:pl-6 group w-full">
          <div className="text-4xl md:text-5xl xl:text-6xl font-black font-mono tracking-tight text-zinc-400 mb-3 leading-tight group-hover:text-zinc-500 transition-colors w-full break-words" title={data.themFirst.toString()}>
            {formatCompactNumber(data.themFirst)}
          </div>
          <div className="text-xs lg:text-sm font-bold uppercase tracking-widest text-zinc-900 font-mono mb-2">{t('themFirst')}</div>
          <div className="text-sm text-zinc-500 font-light leading-relaxed">{t('themFirstDesc')}</div>
        </div>
      </div>

      {/* Visual Progress Bar to fill space */}
      <div className="mt-auto pt-8 relative z-10 w-full flex flex-col gap-2">
        <div className="w-full h-3 bg-zinc-100 rounded-full overflow-hidden flex">
          <div className="bg-teal-600 h-full transition-all duration-1000 ease-out" style={{ width: `${(data.youFirst / total) * 100}%` }}></div>
          <div className="bg-emerald-500 h-full transition-all duration-1000 ease-out" style={{ width: `${(data.sameDay / total) * 100}%` }}></div>
          <div className="bg-zinc-400 h-full transition-all duration-1000 ease-out" style={{ width: `${(data.themFirst / total) * 100}%` }}></div>
        </div>
        <div className="flex justify-between text-[10px] sm:text-xs font-mono text-zinc-400">
          <span>{((data.youFirst / total) * 100).toFixed(1)}%</span>
          <span>{((data.sameDay / total) * 100).toFixed(1)}%</span>
          <span>{((data.themFirst / total) * 100).toFixed(1)}%</span>
        </div>
      </div>

    </div>
  );
}
