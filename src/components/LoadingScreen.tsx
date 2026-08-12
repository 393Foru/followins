"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const messages = [
  "Membaca ZIP ke dalam memori browser...",
  "Memindai direktori file...",
  "Mencari letak file followers & following JSON (Fuzzy Search)...",
  "Mengekstrak data list jaringan (string_list_data)...",
  "Membangun algoritma Himpunan (Sets)...",
  "Mengkalkulasi irisan untuk Mutuals...",
  "Mencari selisih (Unfollowers dan Fans)...",
  "Mengamankan data dari Inspect Element (Anti-F12)...",
  "Menyiapkan Dashboard...",
];

export default function LoadingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev < messages.length - 1 ? prev + 1 : prev));
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-2xl mx-auto mt-12 bg-slate-900 rounded-2xl shadow-2xl overflow-hidden font-mono text-sm sm:text-base border border-slate-800"
    >
      <div className="flex items-center px-4 py-3 bg-slate-950 border-b border-slate-800">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="mx-auto text-slate-500 text-xs font-semibold tracking-wider uppercase">
          Terminal - Proses Analisis
        </div>
      </div>
      <div className="p-6 h-72 overflow-hidden flex flex-col justify-end bg-[#0B1120]">
        {messages.slice(0, currentIndex + 1).map((msg, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-green-400 mb-3 flex items-start gap-3 leading-tight"
          >
            <span className="text-purple-400 mt-0.5">➜</span> 
            <span>{msg}</span>
          </motion.div>
        ))}
        <motion.div 
          animate={{ opacity: [1, 0] }} 
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="w-2.5 h-5 bg-green-400 mt-1 ml-6"
        ></motion.div>
      </div>
    </motion.div>
  );
}
