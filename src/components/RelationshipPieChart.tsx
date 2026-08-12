"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useLanguage } from '@/i18n/LanguageContext';

interface RelationshipPieChartProps {
  unfollowers: number;
  fans: number;
  mutuals: number;
}

export default function RelationshipPieChart({ unfollowers, fans, mutuals }: RelationshipPieChartProps) {
  const { t } = useLanguage();
  // Gunakan palet warna yang modern dan senada dengan tema aplikasi (Pink, Violet, Blue)
  const data = [
    { name: t('relNotFollowBack'), value: unfollowers, color: '#ec4899' }, // Pink-500
    { name: t('relMutual'), value: mutuals, color: '#8b5cf6' }, // Violet-500
    { name: t('relFans'), value: fans, color: '#3b82f6' }, // Blue-500
  ];

  // Sembunyikan bagian yang bernilai 0
  const filteredData = data.filter(item => item.value > 0);

  // Render teks persentase di tengah potongan (slice) pie
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
      <text x={x} y={y} fill="white" fontSize="13" fontWeight="bold" textAnchor="middle" dominantBaseline="central">
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    );
  };

  return (
    <div className="w-full mt-8 bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100">
      <h3 className="text-xl font-bold text-slate-800 mb-2">{t('relTitle')}</h3>
      <p className="text-sm text-slate-500 mb-6">
        {t('relDesc')}
      </p>
      
      <div className="h-80 w-full flex justify-center items-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={filteredData}
              cx="50%"
              cy="50%"
              innerRadius={70} // Menambahkan innerRadius untuk membuatnya menjadi Donut Chart (Lebih modern)
              outerRadius={120}
              labelLine={false}
              label={renderCustomizedLabel}
              dataKey="value"
              isAnimationActive={true}
              stroke="#ffffff"
              strokeWidth={3} 
            >
              {filteredData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              itemStyle={{ fontWeight: 'bold' }}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
