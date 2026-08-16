"use client";

import { useState, useMemo, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList, Legend } from 'recharts';
import { useLanguage } from '@/i18n/LanguageContext';
import ChartContainer from './ChartContainer';

interface GrowthChartProps {
  data: { date: string, followers: number, following: number }[];
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

export default function GrowthChart({ data }: GrowthChartProps) {
  const { t, language } = useLanguage();
  const MONTHS = t('months') as unknown as string[];
  const [viewMode, setViewMode] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedYear, setSelectedYear] = useState<string>('');

  // Dapatkan daftar tahun yang tersedia dari data
  const availableYears = useMemo(() => {
    if (!data || data.length === 0) return [];
    const years = new Set(data.map(d => d.date.split('-')[0]));
    return Array.from(years).sort().reverse(); // Urutkan dari tahun terbaru ke terlama
  }, [data]);

  // Set tahun default ke tahun terbaru saat komponen dimuat
  useEffect(() => {
    if (availableYears.length > 0 && !selectedYear) {
      setSelectedYear(availableYears[0]);
    }
  }, [availableYears, selectedYear]);

  // Proses data berdasarkan mode yang dipilih
  const chartData = useMemo(() => {
    if (!data || data.length === 0) {
      return [{ displayDate: t('growthNoData') }];
    }

    if (viewMode === 'yearly') {
      // Agregasi (Total) per Tahun
      const yearlyMap: Record<string, { followers: number, following: number }> = {};
      
      data.forEach(item => {
        const year = item.date.split('-')[0];
        if (!yearlyMap[year]) {
          yearlyMap[year] = { followers: 0, following: 0 };
        }
        yearlyMap[year].followers += item.followers;
        yearlyMap[year].following += item.following;
      });

      return Object.keys(yearlyMap).sort().map(year => ({
        displayDate: year,
        // Gunakan undefined untuk nilai 0 agar label '0' tidak mengotori grafik
        followers: yearlyMap[year].followers > 0 ? yearlyMap[year].followers : undefined,
        following: yearlyMap[year].following > 0 ? yearlyMap[year].following : undefined
      }));

    } else {
      // Mode Per Bulan (Khusus untuk tahun yang dipilih, seperti screenshot Python)
      if (!selectedYear) return [];
      
      const yearData = data.filter(d => d.date.startsWith(selectedYear));
      const monthlyMap: Record<string, { followers: number, following: number }> = {};
      
      yearData.forEach(item => {
        const monthIndex = parseInt(item.date.split('-')[1], 10) - 1;
        monthlyMap[MONTHS[monthIndex]] = { followers: item.followers, following: item.following };
      });

      // Kembalikan 12 bulan penuh agar sumbu X selalu konsisten (Jan-Des)
      return MONTHS.map(m => ({
        displayDate: m,
        followers: monthlyMap[m]?.followers > 0 ? monthlyMap[m].followers : undefined,
        following: monthlyMap[m]?.following > 0 ? monthlyMap[m].following : undefined
      }));
    }
  }, [data, viewMode, selectedYear, MONTHS, t]);

  return (
    <ChartContainer 
      title={t('growthTitle')} 
      description={viewMode === 'monthly' ? `${t('growthDescMonthly')} ${selectedYear}` : t('growthDescYearly')}
      controls={
        <>
          {viewMode === 'monthly' && availableYears.length > 0 && (
            <select 
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="bg-zinc-50 border border-zinc-200 text-zinc-900 font-medium text-sm rounded-xl focus:ring-2 focus:ring-blue-500/50 block p-2.5 outline-none cursor-pointer [&>option]:bg-white [&>option]:text-zinc-900"
            >
              {availableYears.map(year => (
                <option key={year} value={year}>{t('growthYear')} {year}</option>
              ))}
            </select>
          )}

          <div className="flex bg-zinc-100 rounded-xl p-1 border border-zinc-200">
            <button 
              onClick={() => setViewMode('monthly')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                viewMode === 'monthly' ? 'bg-white text-zinc-900 shadow-sm border border-zinc-200' : 'text-zinc-500 hover:text-zinc-700'
              }`}
            >
              {t('growthPerMonth')}
            </button>
            <button 
              onClick={() => setViewMode('yearly')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                viewMode === 'yearly' ? 'bg-white text-zinc-900 shadow-sm border border-zinc-200' : 'text-zinc-500 hover:text-zinc-700'
              }`}
            >
              {t('growthPerYear')}
            </button>
          </div>
        </>
      }
    >
      <div className="h-96 w-full relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" />
            <XAxis dataKey="displayDate" axisLine={false} tickLine={false} tick={{fill: '#71717a', fontSize: 12, fontFamily: 'monospace'}} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#71717a', fontSize: 12, fontFamily: 'monospace'}} />
            <Tooltip 
              cursor={{fill: '#f4f4f5'}}
              contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e4e4e7', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontFamily: 'monospace' }}
              labelStyle={{ fontWeight: 'bold', color: '#18181b', marginBottom: '8px' }}
              itemStyle={{ color: '#52525b' }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
            
            {/* Followers Baru */}
            <Bar dataKey="followers" name={t('growthNewFollowers')} fill="#10b981" radius={[6, 6, 0, 0]} maxBarSize={40}>
              <LabelList dataKey="followers" position="top" fill="#71717a" fontSize={12} fontFamily="monospace" />
            </Bar>
            
            {/* Following Baru */}
            <Bar dataKey="following" name={t('growthNewFollowing')} fill="#52525b" radius={[6, 6, 0, 0]} maxBarSize={40}>
              <LabelList dataKey="following" position="top" fill="#71717a" fontSize={12} fontFamily="monospace" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartContainer>
  );
}
