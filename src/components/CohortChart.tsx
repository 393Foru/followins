"use client";

import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useLanguage } from '@/i18n/LanguageContext';
import ChartContainer from './ChartContainer';

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
    <ChartContainer title={t('cohortTitle')} description={t('cohortDesc')}>
      <div className="h-80 w-full mt-auto relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={paginatedData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" />
            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#71717a', fontSize: 12, fontFamily: 'monospace'}} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#71717a', fontSize: 12, fontFamily: 'monospace'}} />
            <Tooltip 
              cursor={{fill: '#f4f4f5'}}
              contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e4e4e7', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontFamily: 'monospace' }}
              itemStyle={{ fontWeight: 'bold' }}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
            
            <Bar dataKey="mutuals" name={t('cohortMutuals')} stackId="a" fill="#10b981" maxBarSize={40} />
            <Bar dataKey="fans" name={t('cohortFans')} stackId="a" fill="#14b8a6" maxBarSize={40} />
            <Bar dataKey="unfollowers" name={t('cohortUnfollowers')} stackId="a" fill="#52525b" maxBarSize={40} radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Kontrol Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-10 gap-4 relative z-10">
          <button 
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="text-sm font-medium text-zinc-700 bg-white px-5 py-2.5 rounded-xl disabled:opacity-30 transition-all hover:bg-zinc-50 border border-zinc-200 flex items-center gap-2"
          >
            <span>&larr;</span> {t('cohortOlder')}
          </button>
          
          <span className="text-sm font-medium text-zinc-600 px-4 py-2 bg-zinc-50 rounded-xl border border-zinc-200">
            {t('cohortPage')} {currentPage} / {totalPages}
          </span>
          
          <button 
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="text-sm font-medium text-zinc-700 bg-white px-5 py-2.5 rounded-xl disabled:opacity-30 transition-all hover:bg-zinc-50 border border-zinc-200 flex items-center gap-2"
          >
            {t('cohortNewer')} <span>&rarr;</span>
          </button>
        </div>
      )}
    </ChartContainer>
  );
}
