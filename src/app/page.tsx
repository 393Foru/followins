"use client";

import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ZipUploader from '@/components/ZipUploader';
import LoadingScreen from '@/components/LoadingScreen';
import HowItWorks from '@/components/HowItWorks';
import Features from '@/components/Features';
import PrivacySection from '@/components/PrivacySection';
import FAQ from '@/components/FAQ';
import HistoryWidget from '@/components/HistoryWidget';
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
  const { t } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');
  const [result, setResult] = useState<ParseResult | null>(null);
  const [history, setHistory] = useState<HistoryRecord[]>([]);
  const [isDemo, setIsDemo] = useState(false);

  const handleDemo = () => {
    setIsDemo(true);
    setStatus('loading');
    
    setTimeout(() => {
      setResult({
        unfollowers: Array.from({ length: 42 }).map((_, i) => `unfollower_user_${i}`),
        fans: Array.from({ length: 128 }).map((_, i) => `fan_user_${i}`),
        mutuals: Array.from({ length: 350 }).map((_, i) => `mutual_user_${i}`),
        followersCount: 478,
        followingCount: 392,
        timeline: [
          { date: "2023-01", followers: 12, following: 5 },
          { date: "2023-02", followers: 18, following: 8 },
          { date: "2023-03", followers: 25, following: 12 },
          { date: "2023-04", followers: 40, following: 20 },
          { date: "2023-05", followers: 35, following: 15 },
          { date: "2023-06", followers: 55, following: 30 }
        ],
        cohortData: [
          { year: "2020", fans: 5, mutuals: 50, unfollowers: 10 },
          { year: "2021", fans: 15, mutuals: 80, unfollowers: 15 },
          { year: "2022", fans: 45, mutuals: 120, unfollowers: 12 },
          { year: "2023", fans: 63, mutuals: 100, unfollowers: 5 }
        ],
        mutualStats: { youFirst: 120, themFirst: 180, sameDay: 50 },
        seasonalityData: [
          { month: "Jan", followers: 45 },
          { month: "Feb", followers: 52 },
          { month: "Mar", followers: 68 },
          { month: "Apr", followers: 80 },
          { month: "Mei", followers: 75 },
          { month: "Jun", followers: 90 },
          { month: "Jul", followers: 85 },
          { month: "Agu", followers: 110 },
          { month: "Sep", followers: 95 },
          { month: "Okt", followers: 70 },
          { month: "Nov", followers: 60 },
          { month: "Des", followers: 105 }
        ]
      });
      setStatus('done');
    }, 2500);
  };

  const handleFile = async (file: File) => {
    setIsDemo(false);
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
      
      <main className="flex-1 flex flex-col">
        {status === 'idle' && (
          <>
            {/* Brutalist Split-Screen Hero */}
            <div className="w-full flex flex-col lg:flex-row min-h-[85vh] border-b border-slate-200">
              
              {/* Left Column: Light / Typography */}
              <div className="w-full lg:w-1/2 bg-[#f4f4f4] flex flex-col justify-center px-8 md:px-16 lg:px-24 py-20 relative overflow-hidden">
                {/* Dot Pattern Background */}
                <div 
                  className="absolute inset-0 opacity-20 pointer-events-none" 
                  style={{ backgroundImage: 'radial-gradient(circle at center, #000 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }}
                ></div>
                
                <div className="relative z-10">
                  <h1 className="text-6xl md:text-7xl xl:text-[5.5rem] font-black tracking-tighter mb-8 text-black leading-[0.95] uppercase">
                    {t('heroTitle1')} <br />
                    {t('heroTitle2')}
                  </h1>
                  
                  <p className="text-xl md:text-2xl text-slate-800 max-w-xl leading-snug font-medium">
                    {t('heroDesc')}
                  </p>
                </div>
              </div>

              {/* Right Column: Dark / Uploader */}
              <div className="w-full lg:w-1/2 bg-[#0a0a0a] flex flex-col items-center justify-center p-8 md:p-12 relative overflow-hidden border-t lg:border-t-0 lg:border-l border-slate-800">
                
                <div className="w-full max-w-md relative z-10">
                  <ZipUploader onFileSelect={handleFile} />
                  
                  <div className="w-full mt-6 text-center">
                    <button 
                      onClick={handleDemo}
                      className="text-sm font-semibold text-slate-400 hover:text-white transition-colors underline underline-offset-4 decoration-slate-700 hover:decoration-white"
                    >
                      {t('language') === 'en' ? "View Live Demo" : "Lihat Contoh Hasil (Demo)"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full max-w-4xl mx-auto mb-10 mt-16 px-6">
              <HistoryWidget />
            </div>
            
            <HowItWorks />
            <Features />
            <PrivacySection />
            <FAQ />
          </>
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
                <h2 className="text-3xl font-extrabold text-slate-900">{t('summaryTitle')}</h2>
                <p className="text-slate-500 mt-2 font-medium">{t('summaryDesc')}</p>
              </div>
              <button 
                onClick={() => { setStatus('idle'); setIsDemo(false); }}
                className="px-6 py-2.5 text-sm font-bold bg-white text-slate-700 border border-slate-200 rounded-full hover:bg-slate-100 hover:border-slate-300 transition shadow-sm"
              >
                {t('checkAnotherBtn')}
              </button>
            </div>

            {isDemo && (
              <div className="w-full max-w-5xl bg-indigo-50 border border-indigo-200 text-indigo-700 px-6 py-5 rounded-2xl mb-8 flex flex-col sm:flex-row items-center justify-between shadow-sm gap-4">
                <div>
                  <h3 className="font-bold text-lg">{t('language') === 'en' ? "Demo Mode" : "Mode Demo"}</h3>
                  <p className="text-sm opacity-80">{t('language') === 'en' ? "This is sample data. Upload your own ZIP file to see real insights." : "Ini adalah contoh data acak. Unggah file ZIP Anda sendiri untuk melihat data asli."}</p>
                </div>
                <button 
                  onClick={() => { setStatus('idle'); setIsDemo(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="px-5 py-2.5 bg-indigo-600 text-white font-bold rounded-full text-sm hover:bg-indigo-700 transition shrink-0"
                >
                  {t('language') === 'en' ? "Upload My File" : "Unggah File Saya"}
                </button>
              </div>
            )}
            
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
