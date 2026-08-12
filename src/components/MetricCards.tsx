import { Users, UserMinus, Heart } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

interface MetricCardsProps {
  unfollowers: number;
  fans: number;
  mutuals: number;
}

export default function MetricCards({ unfollowers, fans, mutuals }: MetricCardsProps) {
  const { t } = useLanguage();
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-6">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition">
        <div className="p-4 bg-red-50 text-red-500 rounded-2xl mb-4">
          <UserMinus size={32} />
        </div>
        <h3 className="text-slate-500 font-medium">Unfollowers</h3>
        <p className="text-4xl font-extrabold text-slate-800 mt-2">{unfollowers}</p>
        <p className="text-sm text-slate-400 mt-2">{t('unfollowersDesc')}</p>
      </div>
      
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition">
        <div className="p-4 bg-yellow-50 text-yellow-500 rounded-2xl mb-4">
          <Heart size={32} />
        </div>
        <h3 className="text-slate-500 font-medium">Fans</h3>
        <p className="text-4xl font-extrabold text-slate-800 mt-2">{fans}</p>
        <p className="text-sm text-slate-400 mt-2">{t('fansDesc')}</p>
      </div>
      
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition">
        <div className="p-4 bg-green-50 text-green-500 rounded-2xl mb-4">
          <Users size={32} />
        </div>
        <h3 className="text-slate-500 font-medium">Mutuals</h3>
        <p className="text-4xl font-extrabold text-slate-800 mt-2">{mutuals}</p>
        <p className="text-sm text-slate-400 mt-2">{t('mutualsDesc')}</p>
      </div>
    </div>
  );
}
