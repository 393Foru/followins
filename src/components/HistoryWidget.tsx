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
    <div className="w-full max-w-4xl mx-auto my-8 md:my-12 bg-zinc-950 rounded-xl p-6 shadow-2xl relative overflow-hidden font-mono border border-zinc-800">
      <div className="flex items-center gap-4 mb-6 border-b border-zinc-800 pb-4 relative z-10">
        <div className="bg-zinc-900 border border-zinc-700 p-2 rounded-lg">
          <Clock className="w-5 h-5 text-emerald-500" />
        </div>
        <h3 className="font-bold text-xl text-zinc-300 tracking-tight flex items-center gap-2">
          <span className="text-emerald-500 select-none">~ $</span> {t('historyTitle')}
        </h3>
        <span className="text-xs bg-zinc-900 text-emerald-400/70 px-3 py-1 rounded border border-zinc-800 ml-auto">
          [{date}]
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10 text-sm">
        <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-lg p-5 flex flex-col hover:bg-zinc-900 transition-colors">
          <div className="flex items-center gap-3 mb-3">
            <UserMinus className="w-5 h-5 text-rose-400" />
            <span className="text-zinc-500">{t('cohortUnfollowers')}</span>
          </div>
          <span className="text-3xl font-black text-zinc-200 mt-auto">{history.unfollowers}</span>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-lg p-5 flex flex-col hover:bg-zinc-900 transition-colors">
          <div className="flex items-center gap-3 mb-3">
            <Heart className="w-5 h-5 text-emerald-400" />
            <span className="text-zinc-500">{t('cohortFans')}</span>
          </div>
          <span className="text-3xl font-black text-zinc-200 mt-auto">{history.fans}</span>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-lg p-5 flex flex-col hover:bg-zinc-900 transition-colors">
          <div className="flex items-center gap-3 mb-3">
            <Users className="w-5 h-5 text-indigo-400" />
            <span className="text-zinc-500">{t('cohortMutuals')}</span>
          </div>
          <span className="text-3xl font-black text-zinc-200 mt-auto">{history.mutuals}</span>
        </div>
      </div>
    </div>
  );
}
