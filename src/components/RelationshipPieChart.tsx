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
  const data = [
    { name: t('relNotFollowBack'), value: unfollowers, color: '#52525b' }, // Zinc-500
    { name: t('relMutual'), value: mutuals, color: '#10b981' }, // Emerald-500
    { name: t('relFans'), value: fans, color: '#14b8a6' }, // Teal-500
  ];

  // Sembunyikan bagian yang bernilai 0
  const filteredData = data.filter(item => item.value > 0);

  // Render teks persentase di tengah potongan (slice) pie
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    const textColor = percent > 0.1 && data.find(d => d.value === percent)?.color === '#ffffff' ? '#000' : '#fff';
    // For simplicity, we just use a contrasting color strategy:
    const fillCol = (index === 1) ? "#000" : "#fff";

    return (
      <text x={x} y={y} fill={fillCol} fontSize="13" fontWeight="bold" textAnchor="middle" dominantBaseline="central">
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    );
  };

  return (
    <div className="w-full h-full flex flex-col bg-white border border-zinc-200 rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden">
      
      <div className="relative z-10 mb-8 border-b border-zinc-200 pb-6">
        <h3 className="text-2xl font-bold text-zinc-900 tracking-tight mb-2">{t('relTitle')}</h3>
        <p className="text-sm text-zinc-600 font-light max-w-2xl">
          {t('relDesc')}
        </p>
      </div>
      
      <div className="h-80 w-full flex justify-center items-center relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={filteredData}
              cx="50%"
              cy="50%"
              innerRadius={70} // Make it a donut chart for a more modern look
              outerRadius={120}
              labelLine={false}
              label={renderCustomizedLabel}
              dataKey="value"
              isAnimationActive={true}
              stroke="#ffffff"
              strokeWidth={2} 
            >
              {filteredData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e4e4e7', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontFamily: 'monospace' }}
              itemStyle={{ fontWeight: 'bold', color: '#18181b' }}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
