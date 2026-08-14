"use client";

import { useState, useMemo, useEffect } from 'react';
import { Lock, Tag, X, Check, Filter, CheckSquare, Square, Search, ArrowDownAZ, ArrowUpZA, Shuffle } from 'lucide-react';
import PaywallModal from './PaywallModal';
import { deobfuscate } from '@/utils/crypto';
import { useLanguage } from '@/i18n/LanguageContext';
import { getUserLabels, saveUserLabel } from '@/utils/storage';
import { getLabelColor, getColorClasses } from '@/utils/labelColors';

interface UserTableProps {
  unfollowers: string[];
  fans: string[];
  ownerUsername: string;
  isPremium: boolean;
  onUnlock: () => void;
  totalUnfollowersCount: number;
  totalFansCount: number;
}

export default function UserTable({ unfollowers, fans, ownerUsername, isPremium, onUnlock, totalUnfollowersCount, totalFansCount }: UserTableProps) {
  const { t, formatCompactNumber, language } = useLanguage();
  
  const [activeTab, setActiveTab] = useState<'unfollowers' | 'fans'>('unfollowers');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [labels, setLabels] = useState<Record<string, string>>({});
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [editInputValue, setEditInputValue] = useState("");
  
  // CRM Features State
  const [labelFilter, setLabelFilter] = useState<string>('all');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [bulkLabelValue, setBulkLabelValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"random" | "asc" | "desc">("random");

  // Subsets are handled by the parent component now
  // We use unfollowers and fans directly as they are already filtered if not premium

  useEffect(() => {
    if (ownerUsername) {
      setLabels(getUserLabels(ownerUsername));
    }
  }, [ownerUsername]);

  const handleSaveLabel = (user: string, overrideLabel?: string) => {
    let trimmed = (overrideLabel !== undefined ? overrideLabel : editInputValue).trim();
    if (trimmed === "") {
      trimmed = "Unfollow";
    }
    
    saveUserLabel(ownerUsername, user, trimmed);
    setLabels(prev => {
      const next = { ...prev };
      next[user] = trimmed;
      return next;
    });
    setEditingUser(null);
  };

  const currentList = activeTab === 'unfollowers' ? unfollowers : fans;
  const baseList = currentList; // The parent already truncates if not premium
  
  const filteredList = useMemo(() => {
    let list = [...baseList];
    if (labelFilter === 'unlabeled') {
      list = list.filter(u => !labels[u]);
    } else if (labelFilter !== 'all') {
      list = list.filter(u => labels[u] === labelFilter);
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      list = list.filter(u => deobfuscate(u).toLowerCase().includes(q));
    }
    return list;
  }, [baseList, labels, labelFilter, searchQuery]);
  
  const realFilteredCount = useMemo(() => {
    let list = [...currentList];
    if (labelFilter === 'unlabeled') {
      list = list.filter(u => !labels[u]);
    } else if (labelFilter !== 'all') {
      list = list.filter(u => labels[u] === labelFilter);
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      let matches = 0;
      for (let i = 0; i < list.length; i++) {
        if (deobfuscate(list[i]).toLowerCase().includes(q)) matches++;
      }
      return matches;
    }
    return list.length;
  }, [currentList, labels, labelFilter, searchQuery]);
  
  const presetOptions = useMemo(() => {
    const defaults = language === 'en' 
      ? ['Unfollowed', 'Ignore', 'Friend'] 
      : ['Sudah Unfollow', 'Abaikan', 'Teman'];
    const existingLabels = Array.from(new Set(Object.values(labels).filter(l => l.trim() !== '')));
    return Array.from(new Set([...defaults, ...existingLabels])).slice(0, 6);
  }, [labels, language]);
  
  const uniqueLabelsUsed = useMemo(() => {
    return Array.from(new Set(Object.values(labels).filter(l => l.trim() !== '')));
  }, [labels]);
  
  const currentTotalCount = activeTab === 'unfollowers' ? totalUnfollowersCount : totalFansCount;
  const totalHidden = Math.max(0, currentTotalCount - currentList.length);
  
  const displayList = useMemo(() => {
    let listToSort = [...filteredList];
    
    if (sortBy === 'asc') {
      listToSort.sort((a, b) => deobfuscate(a).localeCompare(deobfuscate(b)));
    } else if (sortBy === 'desc') {
      listToSort.sort((a, b) => deobfuscate(b).localeCompare(deobfuscate(a)));
    } else {
      listToSort.sort(() => 0.5 - Math.random());
    }
    
    return listToSort.map(deobfuscate);
  }, [filteredList, sortBy]);

  const labeledCount = currentList.filter(u => !!labels[u]).length;
  const progressPercent = currentList.length > 0 ? Math.round((labeledCount / currentList.length) * 100) : 0;

  const handleSortChange = (val: string) => {
    if ((val === 'asc' || val === 'desc') && !isPremium) {
      setIsModalOpen(true);
      setSortBy('random');
      return;
    }
    setSortBy(val as any);
  };

  const handleTabChange = (tab: 'unfollowers' | 'fans') => {
    setActiveTab(tab);
    setLabelFilter('all');
    setSearchQuery('');
    setSelectedUsers([]);
  };

  const toggleSelect = (user: string) => {
    setSelectedUsers(prev => prev.includes(user) ? prev.filter(u => u !== user) : [...prev, user]);
  };
  
  const selectAll = () => {
    if (selectedUsers.length === displayList.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers([...displayList]);
    }
  };

  const applyBulkLabel = () => {
    let trimmed = bulkLabelValue.trim();
    if (trimmed === "") {
      trimmed = "Unfollow";
    }
    
    selectedUsers.forEach(user => {
      saveUserLabel(ownerUsername, user, trimmed);
    });
    
    setLabels(prev => {
      const next = { ...prev };
      selectedUsers.forEach(user => {
        next[user] = trimmed;
      });
      return next;
    });
    
    setSelectedUsers([]);
    setBulkLabelValue("");
  };

  const handlePaymentSuccess = () => {
    setIsModalOpen(false);
    onUnlock();
  };

  return (
    <div className="w-full bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm flex flex-col h-full relative z-10">
      
      <div className="flex flex-col md:flex-row border-b border-zinc-200 bg-zinc-50">
        <button
          className={`flex-1 py-5 text-center font-bold text-lg md:text-xl transition-colors border-r border-zinc-200 ${
            activeTab === 'unfollowers' ? 'bg-white text-zinc-900 shadow-[inset_0_-2px_0_0_#52525b]' : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700'
          }`}
          onClick={() => handleTabChange('unfollowers')}
        >
          Unfollowers <span className="font-mono text-sm text-zinc-400 ml-1">({formatCompactNumber(totalUnfollowersCount)})</span>
        </button>
        <button
          className={`flex-1 py-5 text-center font-bold text-lg md:text-xl transition-colors ${
            activeTab === 'fans' ? 'bg-white text-teal-600 shadow-[inset_0_-2px_0_0_#14b8a6]' : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700'
          }`}
          onClick={() => handleTabChange('fans')}
        >
          Fans <span className="font-mono text-sm text-teal-400 ml-1">({formatCompactNumber(totalFansCount)})</span>
        </button>
      </div>
      
      <div className="p-6 md:p-10 relative flex-1 flex flex-col">
        {selectedUsers.length > 0 && (
          <div className="fixed bottom-6 left-4 right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 z-[100] bg-zinc-900 text-white p-4 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl border border-zinc-700 md:min-w-[600px]">
            <div className="flex items-center gap-3">
              <span className="font-mono bg-zinc-800 px-2.5 py-1 rounded-lg text-zinc-300 font-bold">{selectedUsers.length}</span>
              <span className="font-medium text-sm">{language === 'en' ? 'Accounts Selected' : 'Akun Dipilih'}</span>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <input 
                type="text"
                placeholder={language === 'en' ? "Type a label..." : "Ketik label..."}
                className="bg-zinc-800 border border-zinc-700 text-white rounded-lg px-3 py-2 text-sm flex-1 md:w-64 focus:outline-none focus:border-teal-500"
                value={bulkLabelValue}
                onChange={(e) => setBulkLabelValue(e.target.value)}
              />
              <button 
                onClick={applyBulkLabel}
                className="bg-teal-600 hover:bg-teal-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                {language === 'en' ? 'Apply' : 'Terapkan'}
              </button>
              <button 
                onClick={() => setSelectedUsers([])}
                className="p-2 text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Gamification Progress Bar */}
        <div className="mb-8 w-full">
          <div className="flex justify-between items-end mb-2">
            <div>
              <h4 className="font-bold text-zinc-800 text-sm md:text-base">
                {language === 'en' ? 'Cleanup Progress' : 'Progres Beres-beres'}
              </h4>
              <p className="text-xs text-zinc-500">
                {language === 'en' 
                  ? `${labeledCount} of ${currentList.length} accounts labeled`
                  : `${labeledCount} dari ${currentList.length} akun telah dilabeli`}
              </p>
            </div>
            <span className="font-mono font-black text-teal-600 text-lg md:text-xl">
              {progressPercent}%
            </span>
          </div>
          <div className="w-full bg-zinc-100 h-2.5 rounded-full overflow-hidden">
            <div 
              className="bg-teal-500 h-2.5 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 border-b border-zinc-200 pb-4 relative z-10">
          <div className="flex flex-col gap-2">
            <p className="text-base text-zinc-600 font-light flex items-center gap-2">
              {t('showing')} <span className="text-xl font-bold font-mono text-zinc-900">{formatCompactNumber(displayList.length)}</span> {t('from')} <span className="font-medium font-mono text-zinc-900">{formatCompactNumber(realFilteredCount)}</span> {t('accounts')}
            </p>
            <div className="flex items-center gap-2 text-sm">
              <button 
                onClick={selectAll}
                className="flex items-center gap-1.5 text-zinc-500 hover:text-zinc-800 font-medium transition-colors"
              >
                {selectedUsers.length === displayList.length && displayList.length > 0 ? <CheckSquare className="w-4 h-4 text-teal-600" /> : <Square className="w-4 h-4" />}
                {language === 'en' ? 'Select All' : 'Pilih Semua'}
              </button>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 w-full md:w-auto">
            {/* Search Bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-zinc-400" />
              </div>
              <input
                type="text"
                placeholder={language === 'en' ? "Search user..." : "Cari user..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-zinc-50 border border-zinc-200 text-zinc-700 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full pl-9 p-2.5"
              />
            </div>

            {/* Filter Dropdown */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-zinc-400 hidden md:block" />
              <select 
                className="bg-zinc-50 border border-zinc-200 text-zinc-700 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full md:w-auto p-2.5 font-medium cursor-pointer"
                value={labelFilter}
                onChange={(e) => setLabelFilter(e.target.value)}
              >
                <option value="all">{language === 'en' ? 'All Accounts' : 'Semua Akun'}</option>
                <option value="unlabeled">{language === 'en' ? 'Not Labeled' : 'Belum Dilabeli'}</option>
                {uniqueLabelsUsed.length > 0 && <optgroup label="Labels">
                  {uniqueLabelsUsed.map((lbl, i) => (
                    <option key={i} value={lbl}>{lbl}</option>
                  ))}
                </optgroup>}
              </select>
            </div>

            {/* Sort Dropdown */}
            <select 
              className="bg-zinc-50 border border-zinc-200 text-zinc-700 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full md:w-auto p-2.5 font-medium cursor-pointer"
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
            >
              <option value="random">{language === 'en' ? 'Random (Default)' : 'Acak (Bawaan)'}</option>
              <option value="asc">{language === 'en' ? 'A to Z' : 'A sampai Z'}{!isPremium && ' 🔒'}</option>
              <option value="desc">{language === 'en' ? 'Z to A' : 'Z sampai A'}{!isPremium && ' 🔒'}</option>
            </select>
          </div>
          
          {!isPremium && totalHidden > 0 && (
            <span className="text-xs font-bold px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full uppercase tracking-wider hidden md:block">
              {t('maxRandomFree')}
            </span>
          )}
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 relative z-10">
          {displayList.map((user, idx) => {
            const isEditing = editingUser === user;
            const currentLabel = labels[user];
            const isSelected = selectedUsers.includes(user);
            const badgeColor = currentLabel ? getLabelColor(currentLabel) : 'teal';
            const badgeClasses = currentLabel ? getColorClasses(badgeColor) : '';
            
            return (
              <li key={idx} className={`bg-white border rounded-xl hover:shadow-sm transition-all group flex flex-col justify-center min-h-[72px] overflow-hidden ${isSelected ? 'border-teal-400 ring-1 ring-teal-400 bg-teal-50/10' : 'border-zinc-200 hover:border-zinc-300'}`}>
                {isEditing ? (
                  <div className="p-3 flex flex-col gap-2 bg-zinc-50 h-full w-full justify-center">
                    <div className="flex items-center gap-2">
                      <input 
                        type="text" 
                        autoFocus
                        className="flex-1 text-xs border border-zinc-200 rounded-md px-2 py-1.5 focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400"
                        placeholder={language === 'en' ? "Add label..." : "Beri label..."}
                        value={editInputValue}
                        onChange={(e) => setEditInputValue(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSaveLabel(user);
                          if (e.key === 'Escape') setEditingUser(null);
                        }}
                      />
                      <button onClick={() => handleSaveLabel(user)} className="p-1.5 bg-zinc-900 text-white rounded-md hover:bg-zinc-800 transition-colors shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => setEditingUser(null)} className="p-1.5 bg-zinc-200 text-zinc-600 rounded-md hover:bg-zinc-300 transition-colors shrink-0">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {presetOptions.map((preset, pIdx) => (
                        <button 
                          key={pIdx}
                          onClick={() => handleSaveLabel(user, preset)}
                          className="text-[9px] px-1.5 py-0.5 bg-white border border-zinc-200 text-zinc-500 rounded hover:bg-zinc-100 hover:text-zinc-700 transition-colors"
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-3.5 flex flex-col gap-1.5 w-full relative">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <button 
                          onClick={() => toggleSelect(user)}
                          className={`shrink-0 z-20 transition-colors ${isSelected ? 'opacity-100 text-teal-600' : 'opacity-0 group-hover:opacity-100 text-zinc-300 hover:text-zinc-500'}`}
                        >
                          {isSelected ? <CheckSquare className="w-4.5 h-4.5" /> : <Square className="w-4.5 h-4.5" />}
                        </button>
                        <a 
                          href={`https://instagram.com/${user}`} 
                          target="_blank" 
                          rel="noreferrer" 
                          onClick={(e) => {
                              if (!isPremium) {
                                const today = new Date().toISOString().split('T')[0];
                                const key = `followins_clicked_users_${today}`;
                                let clickedUsers: string[] = [];
                                try {
                                  // We use sessionStorage to enforce session-based limits for free users, harder to bypass permanently
                                  clickedUsers = JSON.parse(sessionStorage.getItem(key) || '[]');
                                } catch (err) {}
                                
                                const hasClickedBefore = clickedUsers.includes(user);
                                
                                if (!hasClickedBefore && clickedUsers.length >= 10) {
                                  e.preventDefault();
                                  setIsModalOpen(true);
                                } else if (!hasClickedBefore) {
                                  clickedUsers.push(user);
                                  sessionStorage.setItem(key, JSON.stringify(clickedUsers));
                                }
                              }
                            }}
                          className="block text-sm md:text-base font-medium text-zinc-800 hover:text-teal-600 font-mono truncate transition-colors"
                        >
                          @{user}
                        </a>
                      </div>
                      <button 
                        onClick={() => {
                          setEditingUser(user);
                          setEditInputValue(currentLabel || "");
                        }}
                        className={`p-1.5 rounded-md transition-colors shrink-0 ${currentLabel ? 'opacity-100 text-teal-600 hover:bg-teal-50' : 'opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100'}`}
                        title={language === 'en' ? 'Add/Edit Label' : 'Tambah/Edit Label'}
                      >
                        <Tag className="w-4 h-4" />
                      </button>
                    </div>
                    
                    {currentLabel && (
                      <div className="pl-6 pr-2 w-full">
                        <span className={`inline-block text-[10px] font-bold px-2 py-0.5 border rounded-full truncate max-w-full ${badgeClasses}`}>
                          {currentLabel}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </li>
            );
          })}
          
          {/* Skeleton Dummy Data untuk Anti-F12 Rule */}
          {!isPremium && totalHidden > 0 && Array.from({ length: 4 }).map((_, i) => (
             <li key={`dummy-${i}`} className="px-5 py-4 bg-zinc-50 border border-zinc-200 border-dashed rounded-xl flex items-center gap-3 select-none opacity-50 shadow-sm">
               <span className="text-xs text-zinc-400 font-mono w-6 text-right select-none">~</span>
               <Lock size={16} className="text-zinc-400" />
               <span className="h-4 w-24 bg-zinc-200 rounded-md"></span>
             </li>
          ))}
        </ul>

        {!isPremium && totalHidden > 0 && (
          <div className="mt-12 text-center p-8 md:p-10 bg-white border border-zinc-200 rounded-3xl relative overflow-hidden z-10 shadow-lg">
            <Lock className="mx-auto text-zinc-400 mb-4 opacity-80" size={48} />
            <h4 className="text-3xl md:text-4xl font-black font-mono text-zinc-900 mb-3 tracking-tight leading-tight">{t('hiddenNames1')} <span className="text-teal-600">{formatCompactNumber(totalHidden)}</span> {t('hiddenNames2')}</h4>
            <p className="text-base md:text-lg text-zinc-600 font-light max-w-2xl mx-auto mb-8 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('hiddenDesc') }} />
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-4 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl font-medium shadow-sm transition-colors text-lg flex items-center gap-3 mx-auto"
            >
              <Lock size={20} />
              {t('unlockAll')}
            </button>
          </div>
        )}
      </div>

      <PaywallModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
}
