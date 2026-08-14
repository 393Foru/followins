"use client";

import { useState } from 'react';
import { ShieldCheck, Zap, Lock, Printer, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
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
import LoyalFollowers from '@/components/LoyalFollowers';
import AccountHealthRatio from '@/components/AccountHealthRatio';
import NewUnfollowersAlert from '@/components/NewUnfollowersAlert';
import PendingRequests from '@/components/PendingRequests';
import { parseInstagramZip, ParseResult } from '@/utils/instagramParser';
import { saveHistory, HistoryRecord, saveLastScanData, getLastScanData } from '@/utils/storage';

export default function Home() {
  const { t, language } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');
  const [result, setResult] = useState<ParseResult | null>(null);
  const [history, setHistory] = useState<HistoryRecord[]>([]);
  const [isDemo, setIsDemo] = useState(false);
  
  // States for new features
  const [newUnfollowers, setNewUnfollowers] = useState<string[]>([]);
  const [kutuLoncat, setKutuLoncat] = useState<string[]>([]);
  const [isFirstScan, setIsFirstScan] = useState(false);

  const resetApp = () => {
    setStatus('idle');
    setIsDemo(false);
  };

  const handleRestore = () => {
    try {
      const stored = localStorage.getItem('followins_latest_session');
      if (stored) {
        const session = JSON.parse(stored);
        if (session && session.result) {
          setIsDemo(false);
          setResult(session.result);
          setNewUnfollowers(session.newUnfollowers || []);
          setKutuLoncat(session.kutuLoncat || []);
          setIsFirstScan(session.isFirstScan || false);
          setStatus('done');
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDemo = () => {
    setIsDemo(true);
    setStatus('loading');
    
    setTimeout(() => {
      const demoData = {
        ownerUsername: "demo_user",
        unfollowers: Array.from({ length: 42 }).map((_, i) => `unfollower_user_${i}`),
        fans: Array.from({ length: 128 }).map((_, i) => `fan_user_${i}`),
        mutuals: Array.from({ length: 350 }).map((_, i) => `mutual_user_${i}`),
        oldestFollowers: [
          { username: "c2VsZW5hZ29tZXo=", timestamp: 1546300800 },
          { username: "dGF5bG9yc3dpZnQ=", timestamp: 1548979200 },
          { username: "emVuZGF5YQ==", timestamp: 1551398400 },
          { username: "dG9taG9sbGFuZA==", timestamp: 1554076800 },
          { username: "Y2hyaXNoZW1zd29ydGg=", timestamp: 1556668800 }
        ],
        pendingRequests: [
          { username: "cHJpdmF0ZV91c2VyXzE=", timestamp: 1672531200 },
          { username: "c2VjcmV0X2FjY291bnQ=", timestamp: 1675209600 },
          { username: "aGlkZGVuX3Byb2ZpbGU=", timestamp: 1677628800 }
        ],
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
      };
      
      setResult(demoData);
      setNewUnfollowers(["unfollower_user_0", "unfollower_user_1", "unfollower_user_2", "unfollower_user_3"]);
      setKutuLoncat(["unfollower_user_1", "unfollower_user_3"]);
      setIsFirstScan(false);
      
      try {
        localStorage.setItem('followins_latest_session', JSON.stringify({
          result: demoData,
          newUnfollowers: ["unfollower_user_0", "unfollower_user_1", "unfollower_user_2", "unfollower_user_3"],
          kutuLoncat: ["unfollower_user_1", "unfollower_user_3"],
          isFirstScan: false
        }));
      } catch(e) {}
      
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
    
    // Feature: Historical Tracker & Kutu Loncat Detector
    const trackerUsername = data.ownerUsername || 'my_account';
    
    let finalNewUnf: string[] = [];
    let finalKutuLoncat: string[] = [];
    let finalIsFirstScan = false;

    const lastScan = getLastScanData(trackerUsername);
    if (lastScan) {
      // Find new unfollowers (in current unfollowers, but not in last scan's unfollowers)
      finalNewUnf = data.unfollowers.filter(u => !lastScan.unfollowers.includes(u));
      setNewUnfollowers(finalNewUnf);
      
      // Find Kutu Loncat (was in fans or mutuals, now in unfollowers)
      finalKutuLoncat = finalNewUnf.filter(u => lastScan.fans.includes(u) || lastScan.mutuals.includes(u));
      setKutuLoncat(finalKutuLoncat);
      finalIsFirstScan = false;
      setIsFirstScan(false);
    } else {
      setNewUnfollowers([]);
      setKutuLoncat([]);
      finalIsFirstScan = true;
      setIsFirstScan(true);
    }
    
    // Save current data for next scan
    saveLastScanData(trackerUsername, data.unfollowers, data.fans, data.mutuals);
    
    setResult(data);
    
    // Simpan ke LocalStorage dan dapatkan riwayat lengkap
    const newHistory = saveHistory({
      unfollowers: data.unfollowers.length,
      fans: data.fans.length,
      mutuals: data.mutuals.length
    });
    setHistory(newHistory);
    
    try {
      localStorage.setItem('followins_latest_session', JSON.stringify({
        result: data,
        newUnfollowers: finalNewUnf,
        kutuLoncat: finalKutuLoncat,
        isFirstScan: finalIsFirstScan
      }));
    } catch (e) {
      console.warn("Storage is full, cannot save session.");
    }
    
    setStatus('done');
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 text-zinc-900 font-sans relative">
      <div className="relative z-10 flex flex-col min-h-screen">
      <div className="print:hidden sticky top-0 z-[100]">
        <Header />
      </div>
      
        <main className="flex-1 flex flex-col">
          {status === 'idle' && (
            <>
              {/* Clean Minimalist Hero */}
              <div className="w-full flex flex-col lg:flex-row items-center justify-center px-6 pt-10 pb-20 md:px-10 lg:px-16 gap-8 lg:gap-12">
                
                {/* Left Column */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center relative z-10 text-center lg:text-left lg:pr-4">
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight mb-6 leading-[1.1]"
                  >
                    <span className="text-zinc-900">
                      {t('heroTitle1')}
                    </span>
                    <br />
                    <span className="text-zinc-900">
                      {t('heroTitle2')}
                    </span>
                  </motion.h1>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-lg md:text-xl text-zinc-600 max-w-xl leading-relaxed mx-auto lg:mx-0 font-light mb-8"
                  >
                    {t('heroDesc')}
                  </motion.p>

                  {/* Feature Checklist */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 sm:gap-6 text-sm font-medium text-zinc-700"
                  >
                    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-zinc-200 shadow-sm">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      <span>{language === 'en' ? 'No Data Stored' : 'Data Aman'}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-zinc-200 shadow-sm">
                      <Zap className="w-4 h-4 text-amber-500" />
                      <span>{language === 'en' ? 'Instant Results' : 'Hasil Instan'}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-zinc-200 shadow-sm">
                      <Lock className="w-4 h-4 text-blue-500" />
                      <span>{language === 'en' ? 'Fully Private' : '100% Privat'}</span>
                    </div>
                  </motion.div>
                </div>

                {/* Right Column */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="w-full lg:w-1/2 flex flex-col items-center lg:items-end justify-center relative z-10"
                >
                  <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-xl p-6 md:p-8 shadow-sm relative overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                    <div className="relative z-10">
                      <ZipUploader onFileSelect={handleFile} />
                      
                      <div className="w-full mt-6 text-center">
                        <button 
                          onClick={handleDemo}
                          className="text-xs md:text-sm font-medium tracking-wider text-zinc-400 hover:text-emerald-400 transition-all underline underline-offset-4 decoration-zinc-700 hover:decoration-emerald-400"
                        >
                          {language === 'en' ? "View Live Demo" : "Lihat Contoh Hasil (Demo)"}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="w-full px-6"
            >
              <HistoryWidget onRestore={handleRestore} />
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6 }}>
              <HowItWorks />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6 }}>
              <Features />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6 }}>
              <PrivacySection />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6 }}>
              <FAQ />
            </motion.div>
          </>
        )}

        {status === 'loading' && (
          <div className="w-full flex justify-center py-20 px-6">
            <LoadingScreen />
          </div>
        )}

        {status === 'done' && result && (
          <div className="w-full flex flex-col gap-5 items-center px-4 md:px-8 pt-8 pb-20 max-w-[1400px] mx-auto">
            <div className="w-full flex justify-start mb-2 print:hidden">
              <button 
                onClick={() => { setStatus('idle'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 font-medium transition-colors bg-white px-4 py-2 rounded-lg border border-zinc-200 shadow-sm hover:shadow"
              >
                <ArrowLeft className="w-4 h-4" />
                {language === 'en' ? 'Back to Home' : 'Kembali ke Beranda'}
              </button>
            </div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 bg-white border border-zinc-200 rounded-xl p-8 shadow-sm"
            >
              <div>
                <h2 className="text-4xl md:text-5xl font-black text-zinc-900 tracking-tight">
                  {result.ownerUsername ? `@${result.ownerUsername}` : t('summaryTitle')}
                </h2>
                <p className="text-xl text-zinc-600 font-light mt-4">
                  {result.ownerUsername ? `${t('summaryTitle')} • ${t('summaryDesc')}` : t('summaryDesc')}
                </p>
              </div>
              <div className="flex w-full md:w-auto gap-3 flex-col md:flex-row print:hidden">
                <button 
                  onClick={() => window.print()}
                  className="px-6 py-3 text-sm font-medium rounded-lg border border-zinc-200 hover:bg-zinc-50 transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  {language === 'en' ? 'Save PDF' : 'Simpan PDF'}
                </button>
                <button 
                  onClick={resetApp}
                  className="px-8 py-3 text-sm font-medium rounded-lg bg-zinc-900 text-white hover:bg-zinc-800 transition-colors shadow-sm"
                >
                  {t('checkAnotherBtn')}
                </button>
              </div>
            </motion.div>

            {/* Fitur Baru: New Unfollowers Alert */}
            <NewUnfollowersAlert newUnfollowers={newUnfollowers} kutuLoncat={kutuLoncat} isFirstScan={isFirstScan} />

            {isDemo && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="w-full bg-white bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 dark-no-gradient p-6 md:p-8 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between shadow-sm gap-6 print:hidden relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                  <Zap className="w-32 h-32 text-blue-600" />
                </div>
                <div className="relative z-10">
                  <h3 className="font-bold text-2xl tracking-tight mb-2 flex items-center gap-3 text-blue-900 dark-title">
                    <span className="flex h-3 w-3 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
                    </span>
                    {language === 'en' ? "Demo Mode" : "Mode Demo"}
                  </h3>
                  <p className="text-base text-blue-700 dark-desc">{language === 'en' ? "This is sample data. Upload your own ZIP file to see real insights." : "Ini adalah contoh data acak. Unggah file ZIP Anda sendiri untuk melihat data asli."}</p>
                </div>
                <button 
                  onClick={() => { setStatus('idle'); setIsDemo(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="relative z-10 px-6 py-3 bg-white hover:bg-blue-50 border border-blue-200 text-blue-700 dark-button-blue font-medium rounded-xl transition-colors shrink-0 shadow-sm"
                >
                  {language === 'en' ? "Upload My File" : "Unggah File Saya"}
                </button>
              </motion.div>
            )}
            
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} className="w-full">
              <MetricCards 
                unfollowers={result.unfollowers.length}
                fans={result.fans.length}
                mutuals={result.mutuals.length}
              />
            </motion.div>

            <div className="w-full flex flex-col lg:flex-row gap-5 items-stretch">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} className="w-full lg:w-1/2 flex">
                <RelationshipPieChart 
                  unfollowers={result.unfollowers.length}
                  fans={result.fans.length}
                  mutuals={result.mutuals.length}
                />
              </motion.div>
              
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} className="w-full lg:w-1/2 flex">
                <MutualStats data={result.mutualStats} />
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} className="w-full">
              <GrowthChart data={result.timeline} />
            </motion.div>

            <div className="w-full flex flex-col lg:flex-row gap-5 items-stretch">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} className="w-full lg:w-1/2 flex">
                <AccountHealthRatio 
                  followers={result.followersCount} 
                  following={result.followingCount} 
                />
              </motion.div>
              
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} className="w-full lg:w-1/2 flex">
                <LoyalFollowers data={result.oldestFollowers} />
              </motion.div>
            </div>

            <div className="w-full flex flex-col lg:flex-row gap-5 items-stretch">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} className="w-full lg:w-3/5 flex">
                <CohortChart data={result.cohortData} />
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} className="w-full lg:w-2/5 flex">
                <SeasonalityRadar data={result.timeline} />
              </motion.div>
            </div>
            
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} className="w-full">
              <PendingRequests data={result.pendingRequests} />
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} className="w-full">
              <UserTable 
                unfollowers={result.unfollowers}
                fans={result.fans}
                ownerUsername={result.ownerUsername || 'my_account'}
              />
            </motion.div>
          </div>
        )}
        </main>
  
        <div className="print:hidden">
          <Footer />
        </div>
      </div>
    </div>
  );
}
