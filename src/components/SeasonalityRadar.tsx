"use client";

import { useState, useMemo } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { useLanguage } from '@/i18n/LanguageContext';

interface SeasonalityRadarProps {
  data: { date: string, followers: number }[];
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

export default function SeasonalityRadar({ data }: SeasonalityRadarProps) {
  const { t } = useLanguage();
  const MONTHS = t('months') as unknown as string[];
  const [selectedYear, setSelectedYear] = useState<string>('all');

  const availableYears = useMemo(() => {
    if (!data || data.length === 0) return [];
    // Ekstrak tahun dari "YYYY-MM"
    const years = new Set(data.map(d => d.date.split('-')[0]));
    return Array.from(years).sort().reverse();
  }, [data]);

  const chartData = useMemo(() => {
    // Inisialisasi 12 bulan dengan 0
    const monthlyMap: Record<string, number> = {};
    MONTHS.forEach(m => monthlyMap[m] = 0);

    data.forEach(item => {
      if (!item.date) return;
      const [year, monthStr] = item.date.split('-');
      if (selectedYear === 'all' || selectedYear === year) {
        const monthIndex = parseInt(monthStr, 10) - 1;
        if (monthIndex >= 0 && monthIndex < 12) {
          monthlyMap[MONTHS[monthIndex]] += item.followers;
        }
      }
    });

    return MONTHS.map(month => ({
      month,
      followers: monthlyMap[month]
    }));
  }, [data, selectedYear, MONTHS]);

  if (!data || data.length === 0) return null;

  return (
    <div className="w-full h-full flex flex-col bg-white border border-zinc-200 rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden">

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-6 border-b border-zinc-200 pb-6 relative z-10">
        <div>
          <h3 className="text-2xl font-bold text-zinc-900 tracking-tight mb-2">{t('seasonTitle')}</h3>
          <p className="text-sm text-zinc-600 font-light">
            {selectedYear === 'all' 
              ? t('seasonDescAll')
              : `${t('seasonDescYear')} ${selectedYear}?`
            }
          </p>
        </div>
        
        {availableYears.length > 0 && (
          <select 
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="bg-zinc-50 border border-zinc-200 text-zinc-900 font-medium text-sm rounded-xl focus:ring-2 focus:ring-emerald-500/50 block p-2.5 outline-none cursor-pointer [&>option]:bg-white [&>option]:text-zinc-900 min-w-[140px]"
          >
            <option value="all">{t('seasonAllTime')}</option>
            {availableYears.map(year => (
              <option key={year} value={year}>{t('growthYear')} {year}</option>
            ))}
          </select>
        )}
      </div>
      
      <div className="h-96 w-full mt-auto relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
            <PolarGrid stroke="#e4e4e7" />
            <PolarAngleAxis dataKey="month" tick={{ fill: '#71717a', fontSize: 12, fontFamily: 'monospace' }} />
            <PolarRadiusAxis angle={30} domain={[0, 'auto']} tick={{ fill: '#a1a1aa', fontSize: 10, fontFamily: 'monospace' }} axisLine={false} />
            <Radar name={t('seasonTotalFollowers')} dataKey="followers" stroke="#10b981" strokeWidth={2} fill="#34d399" fillOpacity={0.4} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e4e4e7', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontFamily: 'monospace' }}
              itemStyle={{ fontWeight: 'bold', color: '#18181b' }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
