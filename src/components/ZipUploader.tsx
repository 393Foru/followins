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
    <div
      className={`relative p-8 md:p-10 w-full max-w-xl mx-auto border border-dashed rounded-2xl text-center transition-all duration-300 bg-[#111] ${
        isDragging ? 'border-white bg-[#1a1a1a] scale-105' : 'border-slate-800 hover:border-slate-600 hover:bg-[#161616]'
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept=".zip"
        onChange={handleChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      <div className="flex flex-col items-center gap-4 pointer-events-none">
        <div className="p-5 bg-[#1a1a1a] rounded-full border border-slate-800">
          <UploadCloud className="text-white" size={40} strokeWidth={1.5} />
        </div>
        <div>
          <p className="text-xl font-medium text-white tracking-tight">
            {t('uploadPrompt')}
          </p>
          <p className="text-slate-400 mt-2 max-w-md mx-auto leading-relaxed text-sm">
            {t('uploadDesc')}
          </p>
        </div>
      </div>
    </div>
  );
}
