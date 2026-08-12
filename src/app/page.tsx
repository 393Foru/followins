"use client";

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ZipUploader from '@/components/ZipUploader';
import LoadingScreen from '@/components/LoadingScreen';
import MetricCards from '@/components/MetricCards';
import UserTable from '@/components/UserTable';
import GrowthChart from '@/components/GrowthChart';
import RelationshipPieChart from '@/components/RelationshipPieChart';
import CohortChart from '@/components/CohortChart';
import MutualStats from '@/components/MutualStats';
import SeasonalityRadar from '@/components/SeasonalityRadar';
import { parseInstagramZip, ParseResult } from '@/utils/instagramParser';
import { saveHistory, HistoryRecord } from '@/utils/storage';

export default function Home() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');
  const [result, setResult] = useState<ParseResult | null>(null);
  const [history, setHistory] = useState<HistoryRecord[]>([]);

  const handleFile = async (file: File) => {
    setStatus('loading');
    
    const startTime = Date.now();
    const data = await parseInstagramZip(file);
    const elapsed = Date.now() - startTime;
    
    if (elapsed < 3800) {
      await new Promise(r => setTimeout(r, 3800 - elapsed));
    }
    
    setResult(data);
    
    // Simpan ke LocalStorage dan dapatkan riwayat lengkap
    const newHistory = saveHistory({
      unfollowers: data.unfollowers.length,
      fans: data.fans.length,
      mutuals: data.mutuals.length
    });
    setHistory(newHistory);
    
    setStatus('done');
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Header />
      
      <main className="flex-1 flex flex-col px-6 py-16">
        {status === 'idle' && (
          <div className="text-center w-full max-w-3xl mx-auto flex flex-col items-center justify-center mt-12">
            <div className="px-4 py-1.5 bg-pink-100 text-pink-600 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-pink-200">
              100% Client-Side Privacy
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-slate-900 leading-tight">
              Lacak Siapa yang <br />
              <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">Unfollow Anda</span>
            </h1>
            <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto">
              Analisis data ekspor ZIP Instagram Anda secara langsung di *browser*. Privasi terjamin aman, data tidak pernah dikirim ke server.
            </p>
            <ZipUploader onFileSelect={handleFile} />
          </div>
        )}

        {status === 'loading' && (
          <div className="w-full flex justify-center mt-12">
            <LoadingScreen />
          </div>
        )}

        {status === 'done' && result && (
          <div className="w-full flex flex-col items-center">
            <div className="w-full max-w-5xl flex justify-between items-end mb-6">
              <div>
                <h2 className="text-3xl font-extrabold text-slate-900">Ringkasan Akun Anda</h2>
                <p className="text-slate-500 mt-2 font-medium">Berdasarkan pemrosesan data lokal di perangkat Anda.</p>
              </div>
              <button 
                onClick={() => setStatus('idle')}
                className="px-6 py-2.5 text-sm font-bold bg-white text-slate-700 border border-slate-200 rounded-full hover:bg-slate-100 hover:border-slate-300 transition shadow-sm"
              >
                Cek File Lain
              </button>
            </div>
            
            <MetricCards 
              unfollowers={result.unfollowers.length}
              fans={result.fans.length}
              mutuals={result.mutuals.length}
            />

            <RelationshipPieChart 
              unfollowers={result.unfollowers.length}
              fans={result.fans.length}
              mutuals={result.mutuals.length}
            />

            <GrowthChart data={result.timeline} />
            
            <MutualStats data={result.mutualStats} />

            <div className="w-full flex flex-col lg:flex-row gap-6 mb-8">
              <div className="w-full lg:w-3/5">
                <CohortChart data={result.cohortData} />
              </div>
              <div className="w-full lg:w-2/5">
                <SeasonalityRadar data={result.timeline} />
              </div>
            </div>
            
            <UserTable 
              unfollowers={result.unfollowers}
              fans={result.fans}
            />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
