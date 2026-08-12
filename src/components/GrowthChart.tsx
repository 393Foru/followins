"use client";

import { useState, useMemo, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList, Legend } from 'recharts';
import { useLanguage } from '@/i18n/LanguageContext';

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
    <div className="w-full mt-8 bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        
        <div className="flex flex-col">
          <h3 className="text-xl font-bold text-slate-800">{t('growthTitle')}</h3>
          <p className="text-sm text-slate-500 mt-1">
            {viewMode === 'monthly' ? `${t('growthDescMonthly')} ${selectedYear}` : t('growthDescYearly')}
          </p>
        </div>
        
        {/* Kontrol UI: Tahun & Toggle Mode */}
        <div className="flex items-center gap-3">
          {viewMode === 'monthly' && availableYears.length > 0 && (
            <select 
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block p-2 outline-none cursor-pointer"
            >
              {availableYears.map(year => (
                <option key={year} value={year}>{t('growthYear')} {year}</option>
              ))}
            </select>
          )}

          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button 
              onClick={() => setViewMode('monthly')}
              className={`px-4 py-1.5 text-sm font-semibold rounded-lg transition-all ${
                viewMode === 'monthly' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {t('growthPerMonth')}
            </button>
            <button 
              onClick={() => setViewMode('yearly')}
              className={`px-4 py-1.5 text-sm font-semibold rounded-lg transition-all ${
                viewMode === 'yearly' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {t('growthPerYear')}
            </button>
          </div>
        </div>
      </div>
      
      <div className="h-72 w-full mt-8">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="displayDate" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
            <Tooltip 
              cursor={{fill: '#f8fafc'}}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              labelStyle={{ fontWeight: 'bold', color: '#1e293b', marginBottom: '8px' }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
            
            {/* Followers Baru */}
            <Bar dataKey="followers" name={t('growthNewFollowers')} fill="#8B5CF6" radius={[4, 4, 0, 0]} maxBarSize={40}>
              <LabelList dataKey="followers" position="top" fill="#64748b" fontSize={11} fontWeight="bold" />
            </Bar>
            
            {/* Following Baru */}
            <Bar dataKey="following" name={t('growthNewFollowing')} fill="#3B82F6" radius={[4, 4, 0, 0]} maxBarSize={40}>
              <LabelList dataKey="following" position="top" fill="#64748b" fontSize={11} fontWeight="bold" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
