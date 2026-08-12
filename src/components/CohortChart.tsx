"use client";

import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useLanguage } from '@/i18n/LanguageContext';

interface CohortChartProps {
  data: { year: string, fans: number, mutuals: number, unfollowers: number }[];
}

export default function CohortChart({ data }: CohortChartProps) {
  const { t } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  if (!data || data.length === 0) return null;

  // Menghitung total halaman
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Logika Pagination:
  // Data aslinya diurutkan dari tahun terlama -> terbaru.
  // Halaman 1 = 10 tahun terbaru.
  // Untuk mengambilnya dengan mudah: balikkan array (terbaru di depan), potong, lalu balikkan lagi untuk render di grafik (agar X-axis tetap terlama -> terbaru).
  const reversedData = [...data].reverse();
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = reversedData.slice(startIndex, startIndex + itemsPerPage).reverse();

  return (
    <div className="w-full mt-8 bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col h-full">
      <h3 className="text-xl font-bold text-slate-800 mb-2">{t('cohortTitle')}</h3>
      <p className="text-sm text-slate-500 mb-6">
        {t('cohortDesc')}
      </p>
      
      <div className="h-80 w-full mt-auto">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={paginatedData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
            <Tooltip 
              cursor={{fill: '#f8fafc'}}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              itemStyle={{ fontWeight: 'bold' }}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
            
            <Bar dataKey="mutuals" name={t('cohortMutuals')} stackId="a" fill="#8b5cf6" maxBarSize={50} />
            <Bar dataKey="fans" name={t('cohortFans')} stackId="a" fill="#3b82f6" maxBarSize={50} />
            <Bar dataKey="unfollowers" name={t('cohortUnfollowers')} stackId="a" fill="#ec4899" maxBarSize={50} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Kontrol Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 gap-6">
          <button 
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="text-sm font-bold text-pink-500 hover:text-pink-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-1"
          >
            <span>&larr;</span> {t('cohortOlder')}
          </button>
          
          <span className="text-xs font-semibold bg-slate-100 text-slate-500 px-3 py-1 rounded-full">
            {t('cohortPage')} {currentPage} {t('from')} {totalPages}
          </span>
          
          <button 
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="text-sm font-bold text-pink-500 hover:text-pink-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-1"
          >
            {t('cohortNewer')} <span>&rarr;</span>
          </button>
        </div>
      )}
    </div>
  );
}
