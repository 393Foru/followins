import { Users, UserMinus, Heart } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

interface MetricCardsProps {
  unfollowers: number;
  fans: number;
  mutuals: number;
}

export default function MetricCards({ unfollowers, fans, mutuals }: MetricCardsProps) {
  const { t, formatCompactNumber } = useLanguage();
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 w-full relative z-10">
      <div className="bg-white border border-zinc-200 rounded-2xl lg:rounded-3xl p-4 sm:p-5 lg:p-8 flex flex-row md:flex-col items-center md:items-center justify-start md:justify-start text-left md:text-center hover:border-zinc-300 transition-all shadow-sm hover:shadow-md group gap-4 md:gap-0">
        <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-zinc-50 rounded-xl lg:rounded-2xl flex items-center justify-center text-zinc-700 md:mb-4 lg:mb-6 border border-zinc-200 group-hover:scale-110 transition-transform shrink-0">
          <UserMinus className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9" />
        </div>
        <div className="flex-1 min-w-0 flex flex-col md:items-center">
          <h3 className="text-zinc-500 font-bold uppercase tracking-wider md:tracking-widest text-xs sm:text-sm mb-0.5 md:mb-2 font-mono truncate w-full">Unfollowers</h3>
          <p className="text-2xl sm:text-3xl md:text-[clamp(1.75rem,2.5vw+0.5rem,2.25rem)] lg:text-[clamp(2.5rem,4vw+0.5rem,4rem)] font-black font-mono text-zinc-900 leading-normal py-1 truncate w-full md:mb-3 lg:mb-5" title={unfollowers.toString()}>{formatCompactNumber(unfollowers)}</p>
        </div>
        <p className="hidden md:block text-xs lg:text-sm text-zinc-500 font-light mt-auto border-t border-zinc-200 pt-3 lg:pt-6 w-full">{t('unfollowersDesc')}</p>
      </div>
      
      <div className="bg-white border border-zinc-200 rounded-2xl lg:rounded-3xl p-4 sm:p-5 lg:p-8 flex flex-row md:flex-col items-center md:items-center justify-start md:justify-start text-left md:text-center hover:border-zinc-300 transition-all shadow-sm hover:shadow-md group gap-4 md:gap-0">
        <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-zinc-50 rounded-xl lg:rounded-2xl flex items-center justify-center text-zinc-700 md:mb-4 lg:mb-6 border border-zinc-200 group-hover:scale-110 transition-transform shrink-0">
          <Heart className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9" />
        </div>
        <div className="flex-1 min-w-0 flex flex-col md:items-center">
          <h3 className="text-zinc-500 font-bold uppercase tracking-wider md:tracking-widest text-xs sm:text-sm mb-0.5 md:mb-2 font-mono truncate w-full">Fans</h3>
          <p className="text-2xl sm:text-3xl md:text-[clamp(1.75rem,2.5vw+0.5rem,2.25rem)] lg:text-[clamp(2.5rem,4vw+0.5rem,4rem)] font-black font-mono text-zinc-900 leading-normal py-1 truncate w-full md:mb-3 lg:mb-5" title={fans.toString()}>{formatCompactNumber(fans)}</p>
        </div>
        <p className="hidden md:block text-xs lg:text-sm text-zinc-500 font-light mt-auto border-t border-zinc-200 pt-3 lg:pt-6 w-full">{t('fansDesc')}</p>
      </div>
      
      <div className="bg-white border border-zinc-200 rounded-2xl lg:rounded-3xl p-4 sm:p-5 lg:p-8 flex flex-row md:flex-col items-center md:items-center justify-start md:justify-start text-left md:text-center hover:border-zinc-300 transition-all shadow-sm hover:shadow-md group gap-4 md:gap-0">
        <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-zinc-50 rounded-xl lg:rounded-2xl flex items-center justify-center text-zinc-700 md:mb-4 lg:mb-6 border border-zinc-200 group-hover:scale-110 transition-transform shrink-0">
          <Users className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9" />
        </div>
        <div className="flex-1 min-w-0 flex flex-col md:items-center">
          <h3 className="text-zinc-500 font-bold uppercase tracking-wider md:tracking-widest text-xs sm:text-sm mb-0.5 md:mb-2 font-mono truncate w-full">Mutuals</h3>
          <p className="text-2xl sm:text-3xl md:text-[clamp(1.75rem,2.5vw+0.5rem,2.25rem)] lg:text-[clamp(2.5rem,4vw+0.5rem,4rem)] font-black font-mono text-zinc-900 leading-normal py-1 truncate w-full md:mb-3 lg:mb-5" title={mutuals.toString()}>{formatCompactNumber(mutuals)}</p>
        </div>
        <p className="hidden md:block text-xs lg:text-sm text-zinc-500 font-light mt-auto border-t border-zinc-200 pt-3 lg:pt-6 w-full">{t('mutualsDesc')}</p>
      </div>
    </div>
  );
}
