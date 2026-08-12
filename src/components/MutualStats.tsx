"use client";

interface MutualStatsProps {
  data: { youFirst: number, themFirst: number, sameDay: number };
}

export default function MutualStats({ data }: MutualStatsProps) {
  if (!data) return null;

  const total = data.youFirst + data.themFirst + data.sameDay;
  if (total === 0) return null;

  return (
    <div className="w-full mt-8 bg-gradient-to-br from-violet-600 to-indigo-700 p-6 md:p-8 rounded-3xl shadow-lg text-white">
      <h3 className="text-xl font-bold mb-2">Statistik "Siapa Duluan?"</h3>
      <p className="text-sm text-indigo-200 mb-8 max-w-lg">
        Dari total {total} orang yang saling follow (Mutual) dengan Anda, mari kita lihat siapa yang lebih dulu menekan tombol follow.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all">
          <div className="text-4xl font-extrabold mb-2">{data.youFirst}</div>
          <div className="text-sm font-semibold text-indigo-100">Anda Follow Duluan</div>
          <div className="text-xs text-indigo-300 mt-2">Anda menunggu follback mereka</div>
        </div>
        
        <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all">
          <div className="text-4xl font-extrabold mb-2 text-pink-300">{data.themFirst}</div>
          <div className="text-sm font-semibold text-indigo-100">Mereka Follow Duluan</div>
          <div className="text-xs text-indigo-300 mt-2">Mereka yang menunggu follback Anda</div>
        </div>
        
        <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all">
          <div className="text-4xl font-extrabold mb-2 text-amber-300">{data.sameDay}</div>
          <div className="text-sm font-semibold text-indigo-100">Di Hari yang Sama</div>
          <div className="text-xs text-indigo-300 mt-2">Follow berbarengan &lt; 24 jam</div>
        </div>
      </div>
    </div>
  );
}
