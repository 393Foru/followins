"use client";

import { useLanguage } from '@/i18n/LanguageContext';
import { deobfuscate } from '@/utils/crypto';
import { Award, Medal, Clock } from 'lucide-react';

interface LoyalFollowersProps {
  data: { username: string; timestamp: number }[];
}

export default function LoyalFollowers({ data }: LoyalFollowersProps) {
  const { t, language } = useLanguage();

  if (!data || data.length === 0) return null;

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="w-full h-full flex flex-col bg-white border border-zinc-200 rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-amber-50 text-amber-500 rounded-lg">
          <Award className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-bold text-lg text-zinc-900 tracking-tight">{t('loyalTitle')}</h3>
          <p className="text-sm text-zinc-500">{t('loyalDesc')}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 flex-1 justify-center">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-zinc-50 transition-colors border border-transparent hover:border-zinc-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-zinc-100 text-zinc-400 flex items-center justify-center font-bold text-sm">
                {index === 0 ? <Medal className="w-4 h-4 text-amber-500" /> : 
                 index === 1 ? <Medal className="w-4 h-4 text-zinc-400" /> : 
                 index === 2 ? <Medal className="w-4 h-4 text-amber-700" /> : 
                 index + 1}
              </div>
              <span className="font-medium text-zinc-800">@{deobfuscate(item.username)}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-zinc-500">
              <Clock className="w-3.5 h-3.5" />
              <span>{formatDate(item.timestamp)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
