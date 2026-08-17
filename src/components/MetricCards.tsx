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
    <div className="grid grid-cols-3 divide-x divide-zinc-200 bg-white border border-zinc-200 rounded-2xl relative z-10 shadow-sm overflow-hidden w-full max-w-3xl mx-auto">
      
      <div className="p-3 sm:p-6 md:p-8 flex flex-col items-center justify-center text-center hover:bg-zinc-50 transition-colors group/metric">
        <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-zinc-50 rounded-xl flex items-center justify-center text-zinc-700 mb-2 sm:mb-4 border border-zinc-200 group-hover/metric:scale-110 transition-transform shrink-0">
          <UserMinus className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
        </div>
        <h3 className="text-zinc-500 font-bold uppercase tracking-wider text-[10px] sm:text-xs md:text-sm mb-1 sm:mb-2">{t('cohortUnfollowers') || 'Unfollowers'}</h3>
        <p className="text-xl sm:text-3xl md:text-5xl font-black font-mono text-zinc-900 tracking-tight">{formatCompactNumber(unfollowers)}</p>
      </div>

      <div className="p-3 sm:p-6 md:p-8 flex flex-col items-center justify-center text-center hover:bg-zinc-50 transition-colors group/metric">
        <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-zinc-50 rounded-xl flex items-center justify-center text-zinc-700 mb-2 sm:mb-4 border border-zinc-200 group-hover/metric:scale-110 transition-transform shrink-0">
          <Heart className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
        </div>
        <h3 className="text-zinc-500 font-bold uppercase tracking-wider text-[10px] sm:text-xs md:text-sm mb-1 sm:mb-2">{t('cohortFans') || 'Fans'}</h3>
        <p className="text-xl sm:text-3xl md:text-5xl font-black font-mono text-zinc-900 tracking-tight">{formatCompactNumber(fans)}</p>
      </div>

      <div className="p-3 sm:p-6 md:p-8 flex flex-col items-center justify-center text-center hover:bg-zinc-50 transition-colors group/metric">
        <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-zinc-50 rounded-xl flex items-center justify-center text-zinc-700 mb-2 sm:mb-4 border border-zinc-200 group-hover/metric:scale-110 transition-transform shrink-0">
          <Users className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
        </div>
        <h3 className="text-zinc-500 font-bold uppercase tracking-wider text-[10px] sm:text-xs md:text-sm mb-1 sm:mb-2">{t('cohortMutuals') || 'Mutuals'}</h3>
        <p className="text-xl sm:text-3xl md:text-5xl font-black font-mono text-zinc-900 tracking-tight">{formatCompactNumber(mutuals)}</p>
      </div>
      
    </div>
  );
}
