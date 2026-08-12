"use client";

import { useState, useCallback } from 'react';
import { UploadCloud } from 'lucide-react';

interface ZipUploaderProps {
  onFileSelect: (file: File) => void;
}

export default function ZipUploader({ onFileSelect }: ZipUploaderProps) {
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
        alert("Mohon unggah file berekstensi .zip dari Instagram.");
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
        alert("Mohon unggah file berekstensi .zip dari Instagram.");
      }
    }
  };

  return (
    <div
      className={`relative mt-8 p-12 w-full max-w-2xl mx-auto border-2 border-dashed rounded-3xl text-center transition-all duration-300 ${
        isDragging ? 'border-pink-500 bg-pink-50/50 scale-105' : 'border-slate-200 hover:border-pink-300 hover:bg-slate-50'
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
        <div className="p-5 bg-white rounded-full shadow-sm border border-slate-100">
          <UploadCloud className="text-purple-500" size={48} />
        </div>
        <div>
          <p className="text-xl font-semibold text-slate-800">
            Klik atau Tarik file .zip Instagram Anda ke sini
          </p>
          <p className="text-slate-500 mt-2 max-w-md mx-auto leading-relaxed">
            Data Anda 100% aman. Seluruh proses perhitungan dilakukan langsung di memori HP/Komputer Anda. Tidak ada data yang dikirim ke server.
          </p>
        </div>
      </div>
    </div>
  );
}
