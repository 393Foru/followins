"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { useLanguage } from '@/i18n/LanguageContext';

export default function LoadingScreen() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const messages = [
    t('loadingMsg0'),
    t('loadingMsg1'),
    t('loadingMsg2'),
    t('loadingMsg3'),
    t('loadingMsg4'),
    t('loadingMsg5'),
    t('loadingMsg6'),
    t('loadingMsg7'),
    t('loadingMsg8')
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev < messages.length - 1 ? prev + 1 : prev));
    }, 400);

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto bg-zinc-950 rounded-xl shadow-2xl overflow-hidden font-mono text-sm sm:text-base border border-zinc-200/20"
    >
      <div className="flex items-center px-4 py-3 bg-zinc-900 border-b border-zinc-800">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500"></div>
          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
        </div>
        <div className="mx-auto text-zinc-400 text-xs font-semibold tracking-wider font-sans">
          {t('terminalTitle')} - Terminal
        </div>
      </div>
      <div className="p-6 h-72 overflow-hidden flex flex-col justify-end bg-zinc-950/90 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900/50 via-zinc-950/0 to-transparent pointer-events-none"></div>
        
        {messages.slice(0, currentIndex + 1).map((msg, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-emerald-400 mb-3 flex items-start gap-3 leading-tight z-10"
          >
            <span className="text-zinc-500 mt-0.5 select-none">$</span> 
            <span>{msg}</span>
          </motion.div>
        ))}
        <motion.div 
          animate={{ opacity: [1, 0] }} 
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="w-2.5 h-5 bg-emerald-400 mt-1 ml-6 z-10"
        ></motion.div>
      </div>
    </motion.div>
  );
}
