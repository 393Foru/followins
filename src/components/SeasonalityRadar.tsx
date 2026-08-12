"use client";

import { useState, useMemo } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface SeasonalityRadarProps {
  data: { date: string, followers: number }[];
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

export default function SeasonalityRadar({ data }: SeasonalityRadarProps) {
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
  }, [data, selectedYear]);

  if (!data || data.length === 0) return null;

  return (
    <div className="w-full mt-8 bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col h-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-1">Bulan Paling Ramai</h3>
          <p className="text-sm text-slate-500">
            {selectedYear === 'all' 
              ? 'Secara keseluruhan: Di bulan apa Anda paling banyak mendapat pengikut baru?'
              : `Bulan apa yang paling ramai pengikut baru di tahun ${selectedYear}?`
            }
          </p>
        </div>
        
        {availableYears.length > 0 && (
          <select 
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-sm font-semibold rounded-lg focus:ring-pink-500 focus:border-pink-500 block p-2 outline-none cursor-pointer shadow-sm min-w-[140px]"
          >
            <option value="all">Semua Waktu</option>
            {availableYears.map(year => (
              <option key={year} value={year}>Tahun {year}</option>
            ))}
          </select>
        )}
      </div>
      
      <div className="h-80 w-full mt-auto">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
            <PolarGrid stroke="#e2e8f0" />
            <PolarAngleAxis dataKey="month" tick={{ fill: '#475569', fontSize: 13, fontWeight: 'bold' }} />
            <PolarRadiusAxis angle={30} domain={[0, 'auto']} tick={{ fill: '#94a3b8' }} />
            <Radar name="Total Followers Didapat" dataKey="followers" stroke="#ec4899" strokeWidth={3} fill="#ec4899" fillOpacity={0.4} />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              itemStyle={{ fontWeight: 'bold', color: '#ec4899' }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
