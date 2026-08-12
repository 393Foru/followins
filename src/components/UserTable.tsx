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
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'unfollowers' | 'fans'>('unfollowers');
  const [isPremium, setIsPremium] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentList = activeTab === 'unfollowers' ? unfollowers : fans;
  
  // Logika dekripsi (deobfuscate) dan pembatasan data
  const displayList = useMemo(() => {
    if (isPremium) {
      // Dekripsi semua dan urutkan abjad jika sudah bayar
      return [...currentList].map(deobfuscate).sort();
    }
    
    // Jika belum bayar, acak dulu lalu ambil 100 (biar dekripsinya lebih ringan)
    const shuffled = [...currentList].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 100).map(deobfuscate);
  }, [currentList, isPremium]);

  const totalHidden = Math.max(0, currentList.length - 100);

  const handlePaymentSuccess = () => {
    setIsPremium(true);
    setIsModalOpen(false);
  };

  return (
    <div className="w-full mt-8 bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="flex border-b border-slate-100 bg-slate-50/50">
        <button
          className={`flex-1 py-5 text-center font-bold text-lg transition-colors ${
            activeTab === 'unfollowers' ? 'text-pink-600 border-b-2 border-pink-500 bg-white shadow-sm' : 'text-slate-400 hover:text-slate-600'
          }`}
          onClick={() => setActiveTab('unfollowers')}
        >
          Unfollowers ({unfollowers.length})
        </button>
        <button
          className={`flex-1 py-5 text-center font-bold text-lg transition-colors ${
            activeTab === 'fans' ? 'text-pink-600 border-b-2 border-pink-500 bg-white shadow-sm' : 'text-slate-400 hover:text-slate-600'
          }`}
          onClick={() => setActiveTab('fans')}
        >
          Fans ({fans.length})
        </button>
      </div>
      
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm font-medium text-slate-500">
            {t('showing')} <span className="text-slate-800 font-bold">{displayList.length}</span> {t('from')} {currentList.length} {t('accounts')}
          </p>
          {!isPremium && totalHidden > 0 && (
            <span className="text-xs font-bold px-4 py-1.5 bg-purple-100 text-purple-700 rounded-full border border-purple-200">
              {t('maxRandomFree')}
            </span>
          )}
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayList.map((user, idx) => (
            <li key={idx} className="px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 font-medium text-slate-700 truncate hover:bg-slate-100 transition shadow-sm hover:shadow">
              <a href={`https://instagram.com/${user}`} target="_blank" rel="noreferrer" className="block">
                @{user}
              </a>
            </li>
          ))}
          
          {/* Skeleton Dummy Data untuk Anti-F12 Rule */}
          {!isPremium && totalHidden > 0 && Array.from({ length: 4 }).map((_, i) => (
             <li key={`dummy-${i}`} className="px-4 py-3 bg-slate-100/50 rounded-xl border border-slate-200 border-dashed flex items-center justify-center gap-2 select-none opacity-60">
               <Lock size={16} className="text-slate-400" />
               <span className="h-4 w-20 bg-slate-200 rounded blur-[3px]"></span>
             </li>
          ))}
        </ul>

        {!isPremium && totalHidden > 0 && (
          <div className="mt-10 text-center p-10 bg-gradient-to-b from-white to-slate-50 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-5"></div>
            <Lock className="mx-auto text-pink-500 mb-4" size={40} />
            <h4 className="text-2xl font-bold text-slate-800 mb-3">{t('hiddenNames1')} {totalHidden} {t('hiddenNames2')}</h4>
            <p className="text-base text-slate-600 max-w-lg mx-auto mb-8 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('hiddenDesc') }} />
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-4 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white font-extrabold rounded-full shadow-lg shadow-pink-500/30 hover:shadow-xl hover:shadow-pink-500/50 transition hover:scale-[1.02] active:scale-95 text-lg flex items-center gap-3 mx-auto"
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
