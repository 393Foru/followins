import { useEffect, useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { HistoryRecord } from '@/utils/storage';
import { Clock, Users, UserMinus, Heart, RotateCcw } from 'lucide-react';

interface HistoryWidgetProps {
  onRestore?: () => void;
}

export default function HistoryWidget({ onRestore }: HistoryWidgetProps) {
  const { t, language } = useLanguage();
  const [history, setHistory] = useState<HistoryRecord | null>(null);
  const [hasSession, setHasSession] = useState(false);

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
      if (localStorage.getItem('followins_latest_session')) {
        setHasSession(true);
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

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat(language === 'id' ? 'id-ID' : 'en-US', {
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(num);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-8 md:my-12 bg-zinc-950 rounded-xl p-6 shadow-2xl relative overflow-hidden font-mono border border-zinc-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-zinc-800 pb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="bg-zinc-900 border border-zinc-700 p-2 rounded-lg shrink-0">
            <Clock className="w-5 h-5 text-emerald-500" />
          </div>
          <h3 className="font-bold text-lg md:text-xl text-zinc-300 tracking-tight">
            <span className="text-emerald-500 select-none mr-2">~ $</span>{t('historyTitle')}
          </h3>
        </div>
        <div className="self-start sm:self-auto">
          <span className="text-xs bg-zinc-900 text-emerald-400/70 px-3 py-1.5 rounded border border-zinc-800 inline-block">
            [{date}]
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2 md:gap-4 relative z-10">
        <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-lg p-3 md:p-5 flex flex-col hover:bg-zinc-900 transition-colors">
          <div className="flex flex-col md:flex-row md:items-center gap-1.5 md:gap-3 mb-2 md:mb-3">
            <UserMinus className="w-4 h-4 md:w-5 md:h-5 text-rose-400 shrink-0" />
            <span className="text-[10px] md:text-sm text-zinc-500 font-medium truncate">{t('cohortUnfollowers')}</span>
          </div>
          <span className="text-2xl md:text-3xl font-black text-zinc-200 mt-auto">{formatNumber(history.unfollowers)}</span>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-lg p-3 md:p-5 flex flex-col hover:bg-zinc-900 transition-colors">
          <div className="flex flex-col md:flex-row md:items-center gap-1.5 md:gap-3 mb-2 md:mb-3">
            <Heart className="w-4 h-4 md:w-5 md:h-5 text-emerald-400 shrink-0" />
            <span className="text-[10px] md:text-sm text-zinc-500 font-medium truncate">{t('cohortFans')}</span>
          </div>
          <span className="text-2xl md:text-3xl font-black text-zinc-200 mt-auto">{formatNumber(history.fans)}</span>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-lg p-3 md:p-5 flex flex-col hover:bg-zinc-900 transition-colors">
          <div className="flex flex-col md:flex-row md:items-center gap-1.5 md:gap-3 mb-2 md:mb-3">
            <Users className="w-4 h-4 md:w-5 md:h-5 text-indigo-400 shrink-0" />
            <span className="text-[10px] md:text-sm text-zinc-500 font-medium truncate">{t('cohortMutuals')}</span>
          </div>
          <span className="text-2xl md:text-3xl font-black text-zinc-200 mt-auto">{formatNumber(history.mutuals)}</span>
        </div>
      </div>

      {onRestore && hasSession && (
        <div className="mt-6 flex justify-center relative z-10">
          <button 
            onClick={onRestore}
            className="px-6 py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            {language === 'en' ? 'Open Last Analysis' : 'Buka Riwayat Terakhir'}
          </button>
        </div>
      )}
    </div>
  );
}
