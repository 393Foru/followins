"use client";

import { X, ShieldCheck, QrCode } from 'lucide-react';
import { useEffect } from 'react';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function PaywallModal({ isOpen, onClose, onSuccess }: PaywallModalProps) {
  // Cegah scroll pada body saat modal terbuka
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition"
        >
          <X size={20} />
        </button>

        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-pink-100 text-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <QrCode size={32} />
          </div>
          
          <h3 className="text-2xl font-extrabold text-slate-800 mb-2">Buka Semua Akses</h3>
          <p className="text-sm text-slate-500 mb-8">
            Dukung pengembangan aplikasi ini dengan donasi satu kali bayar (seumur hidup). Semua nama yang disamarkan akan otomatis terbuka.
          </p>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-8">
            <p className="text-sm font-semibold text-slate-500 mb-2">Total Pembayaran</p>
            <p className="text-4xl font-black text-slate-800 mb-4">Rp 15.000</p>
            
            {/* Simulasi Gambar QRIS */}
            <div className="w-48 h-48 bg-white border-2 border-dashed border-slate-300 rounded-xl mx-auto flex flex-col items-center justify-center text-slate-400 gap-3 mb-4">
              <QrCode size={48} className="text-slate-300" />
              <span className="text-xs font-medium">Scan QRIS (Simulasi)</span>
            </div>
            
            <p className="text-xs text-slate-400">Gunakan GoPay, OVO, Dana, atau Mobile Banking.</p>
          </div>

          <button 
            onClick={onSuccess}
            className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-xl shadow-lg shadow-pink-500/25 hover:shadow-xl hover:shadow-pink-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2"
          >
            <ShieldCheck size={20} />
            Simulasikan Bayar Berhasil
          </button>
          
          <p className="text-[10px] text-slate-400 mt-4 text-center">
            *Fitur ini murni simulasi (Tahap 4). Sistem tidak akan memproses pembayaran nyata.
          </p>
        </div>
      </div>
    </div>
  );
}
