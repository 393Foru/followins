"use client";

import { useLanguage } from '@/i18n/LanguageContext';
import { deobfuscate } from '@/utils/crypto';
import { UserMinus, AlertTriangle, Info, History, Bookmark, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface NewUnfollowersAlertProps {
  newUnfollowers: string[];
  kutuLoncat: string[];
  isFirstScan?: boolean;
}

export default function NewUnfollowersAlert({ newUnfollowers, kutuLoncat, isFirstScan = false }: NewUnfollowersAlertProps) {
  const { t, language } = useLanguage();
  const [expanded, setExpanded] = useState(false);

  if (isFirstScan) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <History className="w-32 h-32 text-indigo-600" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row gap-6 md:items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-indigo-100 text-indigo-600 rounded-full">
                <Bookmark className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-indigo-900 tracking-tight">
                {language === 'en' ? 'First Scan Saved!' : 'Riwayat Pertama Disimpan!'}
              </h2>
            </div>
            <p className="text-indigo-700 max-w-2xl text-sm md:text-base">
              {language === 'en' 
                ? 'Come back next month or whenever you feel your followers count has changed, and upload your new ZIP. We will automatically track who unfollowed you and detect any "Hit & Run" accounts!' 
                : 'Kembalilah bulan depan, atau kapanpun Anda merasa ada perubahan jumlah followers. Unggah ZIP terbaru Anda di sini, dan kami akan melacak siapa saja yang baru unfollow Anda serta mendeteksi akun "Kutu Loncat"!'}
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  if (!newUnfollowers || newUnfollowers.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <ShieldCheck className="w-32 h-32 text-emerald-600" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row gap-6 md:items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-emerald-100 text-emerald-600 rounded-full">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-emerald-900 tracking-tight">
                {language === 'en' ? 'All Clear!' : 'Aman Terkendali!'}
              </h2>
            </div>
            <p className="text-emerald-700 max-w-2xl text-sm md:text-base">
              {language === 'en' 
                ? 'No new unfollowers detected since your last scan. Your followers are staying loyal! Whenever you feel your followers count has changed, feel free to come back and check it here.' 
                : 'Tidak ada unfollower baru yang terdeteksi sejak pemindaian terakhir Anda. Followers Anda masih setia! Kapan pun Anda merasa jumlah followers berubah, silakan kembali untuk mengeceknya lagi di sini.'}
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-gradient-to-r from-rose-50 to-orange-50 border border-rose-200 rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
        <UserMinus className="w-32 h-32 text-rose-600" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row gap-6 md:items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-rose-100 text-rose-600 rounded-full animate-pulse">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-rose-900 tracking-tight">
              {language === 'en' ? 'New Unfollowers Detected!' : 'Unfollowers Baru Terdeteksi!'}
            </h2>
          </div>
          <p className="text-rose-700 max-w-2xl text-sm md:text-base">
            {language === 'en' 
              ? `Since your last scan, ${newUnfollowers.length} account(s) have unfollowed you.` 
              : `Sejak pemindaian terakhir Anda, ada ${newUnfollowers.length} akun yang baru saja berhenti mengikuti Anda.`
            }
            {kutuLoncat.length > 0 && (
              <span className="font-bold ml-1">
                {language === 'en' ? `Including ${kutuLoncat.length} "Hit & Run" account(s).` : `Termasuk ${kutuLoncat.length} akun "Kutu Loncat".`}
              </span>
            )}
          </p>
          <div className="mt-3 flex items-center gap-2 text-xs text-rose-500/80">
            <Info className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Data compared locally on this device.' : 'Data ini dibandingkan secara lokal di perangkat Anda.'}</span>
          </div>
        </div>

        <button 
          onClick={() => setExpanded(!expanded)}
          className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-medium rounded-xl transition-colors shrink-0 shadow-sm shadow-rose-200"
        >
          {expanded 
            ? (language === 'en' ? 'Hide List' : 'Sembunyikan Daftar')
            : (language === 'en' ? 'View Who Unfollowed' : 'Lihat Siapa Saja')
          }
        </button>
      </div>

      {expanded && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="relative z-10 mt-6 pt-6 border-t border-rose-200/50"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {newUnfollowers.map((u, i) => {
              const isKutuLoncat = kutuLoncat.includes(u);
              return (
                <div key={i} className={`p-3 rounded-lg border flex items-center justify-between ${isKutuLoncat ? 'bg-orange-100/50 border-orange-200' : 'bg-white/60 border-rose-100'} backdrop-blur-sm`}>
                  <span className="font-medium text-zinc-800 text-sm truncate pr-2">@{deobfuscate(u)}</span>
                  {isKutuLoncat && (
                    <span className="text-[10px] font-bold bg-orange-500 text-white px-2 py-0.5 rounded-full whitespace-nowrap" title={language === 'en' ? 'Hit & Run (Follow-Unfollow tactic)' : 'Kutu Loncat (Taktik Follow-Unfollow)'}>
                      {language === 'en' ? 'Hit&Run' : 'Kutu Loncat'}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
