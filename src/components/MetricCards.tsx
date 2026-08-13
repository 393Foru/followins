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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full relative z-10">
      <div className="bg-white border border-zinc-200 rounded-3xl p-8 flex flex-col items-center text-center hover:border-zinc-300 transition-all shadow-sm hover:shadow-md group">
        <div className="w-20 h-20 bg-zinc-50 rounded-2xl flex items-center justify-center text-zinc-700 mb-6 border border-zinc-200 group-hover:scale-110 transition-transform">
          <UserMinus size={36} />
        </div>
        <h3 className="text-zinc-500 font-bold uppercase tracking-widest text-sm md:text-base mb-2 font-mono">Unfollowers</h3>
        <p className="text-4xl md:text-5xl xl:text-6xl font-black font-mono text-zinc-900 mt-2 mb-6 w-full leading-tight break-words" title={unfollowers.toString()}>{formatCompactNumber(unfollowers)}</p>
        <p className="text-sm text-zinc-500 font-light mt-auto border-t border-zinc-200 pt-6 w-full">{t('unfollowersDesc')}</p>
      </div>
      
      <div className="bg-white border border-zinc-200 rounded-3xl p-8 flex flex-col items-center text-center hover:border-zinc-300 transition-all shadow-sm hover:shadow-md group">
        <div className="w-20 h-20 bg-zinc-50 rounded-2xl flex items-center justify-center text-zinc-700 mb-6 border border-zinc-200 group-hover:scale-110 transition-transform">
          <Heart size={36} />
        </div>
        <h3 className="text-zinc-500 font-bold uppercase tracking-widest text-sm md:text-base mb-2 font-mono">Fans</h3>
        <p className="text-4xl md:text-5xl xl:text-6xl font-black font-mono text-zinc-900 mt-2 mb-6 w-full leading-tight break-words" title={fans.toString()}>{formatCompactNumber(fans)}</p>
        <p className="text-sm text-zinc-500 font-light mt-auto border-t border-zinc-200 pt-6 w-full">{t('fansDesc')}</p>
      </div>
      
      <div className="bg-white border border-zinc-200 rounded-3xl p-8 flex flex-col items-center text-center hover:border-zinc-300 transition-all shadow-sm hover:shadow-md group">
        <div className="w-20 h-20 bg-zinc-50 rounded-2xl flex items-center justify-center text-zinc-700 mb-6 border border-zinc-200 group-hover:scale-110 transition-transform">
          <Users size={36} />
        </div>
        <h3 className="text-zinc-500 font-bold uppercase tracking-widest text-sm md:text-base mb-2 font-mono">Mutuals</h3>
        <p className="text-4xl md:text-5xl xl:text-6xl font-black font-mono text-zinc-900 mt-2 mb-6 w-full leading-tight break-words" title={mutuals.toString()}>{formatCompactNumber(mutuals)}</p>
        <p className="text-sm text-zinc-500 font-light mt-auto border-t border-zinc-200 pt-6 w-full">{t('mutualsDesc')}</p>
      </div>
    </div>
  );
}
