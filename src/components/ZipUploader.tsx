"use client";

import { useState, useCallback } from 'react';
import { UploadCloud } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

interface ZipUploaderProps {
  onFileSelect: (file: File) => void;
}

export default function ZipUploader({ onFileSelect }: ZipUploaderProps) {
  const { t } = useLanguage();
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.name.endsWith('.zip')) {
        onFileSelect(file);
      } else {
        alert(t('uploadError'));
      }
    }
  }, [onFileSelect]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.name.endsWith('.zip')) {
        onFileSelect(file);
      } else {
        alert(t('uploadError'));
      }
    }
  };

  return (
    <div className={`relative w-full max-w-xl mx-auto rounded-xl border border-zinc-800 text-center transition-all duration-300 overflow-hidden font-mono bg-zinc-950 shadow-2xl ${isDragging ? 'border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.15)]' : 'hover:border-zinc-700'}`}>
      
      {/* Terminal Header */}
      <div className="flex items-center px-4 py-3 bg-zinc-900 border-b border-zinc-800 relative z-20">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500"></div>
          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
        </div>
        <div className="mx-auto text-zinc-500 text-xs font-semibold tracking-wider font-sans select-none">
          uploader.sh
        </div>
      </div>

      <div
        className="p-6 md:p-8 relative"
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900/50 via-zinc-950/0 to-transparent pointer-events-none"></div>

        <input
          type="file"
          accept=".zip"
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        
        <div className="flex flex-col items-center gap-6 relative z-10 pointer-events-none">
          <div className={`p-4 rounded-xl transition-all duration-300 border ${isDragging ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 scale-110' : 'bg-zinc-900 border-zinc-800 text-zinc-500'}`}>
            <UploadCloud size={32} strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-xl md:text-2xl font-bold text-zinc-200 tracking-tight mb-3 leading-snug">
              {t('uploadPrompt')}
            </p>
            <p className="text-zinc-500 font-light max-w-md mx-auto leading-relaxed text-sm md:text-base">
              {t('uploadDesc')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
