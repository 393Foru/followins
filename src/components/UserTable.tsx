"use client";

import { useState, useMemo } from 'react';
import { Lock } from 'lucide-react';
import PaywallModal from './PaywallModal';
import { deobfuscate } from '@/utils/crypto';
import { useLanguage } from '@/i18n/LanguageContext';

interface UserTableProps {
  unfollowers: string[];
  fans: string[];
}

export default function UserTable({ unfollowers, fans }: UserTableProps) {
  const { t, formatCompactNumber } = useLanguage();
  
  const [activeTab, setActiveTab] = useState<'unfollowers' | 'fans'>('unfollowers');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPremium, setIsPremium] = useState(false);

  const currentList = activeTab === 'unfollowers' ? unfollowers : fans;
  
  const totalHidden = Math.max(0, currentList.length - 100);
  
  const displayList = useMemo(() => {
    if (isPremium) {
      return [...currentList].map(deobfuscate).sort();
    }
    const shuffled = [...currentList].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 100).map(deobfuscate);
  }, [currentList, isPremium]);

  const handleTabChange = (tab: 'unfollowers' | 'fans') => {
    setActiveTab(tab);
  };

  const handlePaymentSuccess = () => {
    setIsPremium(true);
    setIsModalOpen(false);
  };

  return (
    <div className="w-full bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm flex flex-col h-full relative z-10">
      
      <div className="flex flex-col md:flex-row border-b border-zinc-200 bg-zinc-50/50">
        <button
          className={`flex-1 py-5 text-center font-bold text-lg md:text-xl transition-colors border-r border-zinc-200 ${
            activeTab === 'unfollowers' ? 'bg-white text-zinc-900 shadow-[inset_0_-2px_0_0_#52525b]' : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700'
          }`}
          onClick={() => handleTabChange('unfollowers')}
        >
          Unfollowers <span className="font-mono text-sm text-zinc-400 ml-1">({formatCompactNumber(unfollowers.length)})</span>
        </button>
        <button
          className={`flex-1 py-5 text-center font-bold text-lg md:text-xl transition-colors ${
            activeTab === 'fans' ? 'bg-white text-teal-600 shadow-[inset_0_-2px_0_0_#14b8a6]' : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700'
          }`}
          onClick={() => handleTabChange('fans')}
        >
          Fans <span className="font-mono text-sm text-teal-400 ml-1">({formatCompactNumber(fans.length)})</span>
        </button>
      </div>
      
      <div className="p-6 md:p-10 relative flex-1 flex flex-col">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 border-b border-zinc-200 pb-4 relative z-10">
          <p className="text-base text-zinc-600 font-light flex items-center gap-2">
            {t('showing')} <span className="text-xl font-bold font-mono text-zinc-900">{formatCompactNumber(displayList.length)}</span> {t('from')} <span className="font-medium font-mono text-zinc-900">{formatCompactNumber(currentList.length)}</span> {t('accounts')}
          </p>
          {!isPremium && totalHidden > 0 && (
            <span className="text-xs font-bold px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full uppercase tracking-wider">
              {t('maxRandomFree')}
            </span>
          )}
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 relative z-10">
          {displayList.map((user, idx) => (
            <li key={idx} className="px-5 py-4 bg-zinc-50/50 border border-zinc-200 rounded-xl font-medium text-zinc-700 text-sm md:text-base truncate hover:bg-zinc-900 hover:border-zinc-900 hover:text-zinc-50 transition-all group shadow-sm flex items-center gap-3">
              <span className="text-xs text-zinc-400 font-mono w-6 text-right select-none group-hover:text-zinc-500">{idx + 1}</span>
              <a href={`https://instagram.com/${user}`} target="_blank" rel="noreferrer" className="block group-hover:translate-x-1 transition-transform font-mono w-full">
                @{user}
              </a>
            </li>
          ))}
          
          {/* Skeleton Dummy Data untuk Anti-F12 Rule */}
          {!isPremium && totalHidden > 0 && Array.from({ length: 4 }).map((_, i) => (
             <li key={`dummy-${i}`} className="px-5 py-4 bg-zinc-50 border border-zinc-200 border-dashed rounded-xl flex items-center gap-3 select-none opacity-50 shadow-sm">
               <span className="text-xs text-zinc-400 font-mono w-6 text-right select-none">~</span>
               <Lock size={16} className="text-zinc-400" />
               <span className="h-4 w-24 bg-zinc-200 rounded-md"></span>
             </li>
          ))}
        </ul>

        {!isPremium && totalHidden > 0 && (
          <div className="mt-12 text-center p-8 md:p-10 bg-white border border-zinc-200 rounded-3xl relative overflow-hidden z-10 shadow-lg">
            <Lock className="mx-auto text-zinc-400 mb-4 opacity-80" size={48} />
            <h4 className="text-3xl md:text-4xl font-black font-mono text-zinc-900 mb-3 tracking-tight leading-tight">{t('hiddenNames1')} <span className="text-teal-600">{formatCompactNumber(totalHidden)}</span> {t('hiddenNames2')}</h4>
            <p className="text-base md:text-lg text-zinc-600 font-light max-w-2xl mx-auto mb-8 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('hiddenDesc') }} />
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-4 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl font-medium shadow-sm transition-colors text-lg flex items-center gap-3 mx-auto"
            >
              <Lock size={20} />
              {t('unlockAll')}
            </button>
          </div>
        )}
      </div>

      <PaywallModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
}
