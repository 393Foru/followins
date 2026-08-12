import { useEffect, useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { HistoryRecord } from '@/utils/storage';
import { Clock, Users, UserMinus, Heart } from 'lucide-react';

export default function HistoryWidget() {
  const { t, language } = useLanguage();
  const [history, setHistory] = useState<HistoryRecord | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('followins_history');
      if (stored) {
        const parsed = JSON.parse(stored) as HistoryRecord[];
        if (parsed && parsed.length > 0) {
          // Get the most recent one
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setHistory(parsed[0]);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  if (!history) return null;

  const date = new Date(history.timestamp).toLocaleDateString(
    language === 'id' ? 'id-ID' : 'en-US', 
    { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }
  );

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4 text-slate-700">
        <Clock className="w-5 h-5 text-pink-500" />
        <h3 className="font-bold text-lg">{t('historyTitle')}</h3>
        <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded-full ml-auto">{date}</span>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-rose-50 rounded-xl p-3 flex flex-col items-center justify-center text-center">
          <UserMinus className="w-5 h-5 text-rose-500 mb-1" />
          <span className="text-2xl font-extrabold text-slate-800">{history.unfollowers}</span>
          <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">{t('cohortUnfollowers')}</span>
        </div>
        <div className="bg-emerald-50 rounded-xl p-3 flex flex-col items-center justify-center text-center">
          <Heart className="w-5 h-5 text-emerald-500 mb-1" />
          <span className="text-2xl font-extrabold text-slate-800">{history.fans}</span>
          <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">{t('cohortFans')}</span>
        </div>
        <div className="bg-blue-50 rounded-xl p-3 flex flex-col items-center justify-center text-center">
          <Users className="w-5 h-5 text-blue-500 mb-1" />
          <span className="text-2xl font-extrabold text-slate-800">{history.mutuals}</span>
          <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">{t('cohortMutuals')}</span>
        </div>
      </div>
    </div>
  );
}
