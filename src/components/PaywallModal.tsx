"use client";

import { X, ShieldCheck, QrCode } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function PaywallModal({ isOpen, onClose, onSuccess }: PaywallModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-xl border border-zinc-200 animate-in fade-in zoom-in duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-zinc-700 hover:bg-zinc-100 rounded-full transition"
        >
          <X size={20} />
        </button>

        <div className="p-6 md:p-8 text-center">
          <div className="w-14 h-14 bg-zinc-100 text-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <QrCode size={28} />
          </div>
          
          <h3 className="text-fluid-h2 font-extrabold text-zinc-900 mb-2">Buka Semua Akses</h3>
          <p className="text-sm text-zinc-600 mb-6">
            Dukung pengembangan aplikasi ini dengan donasi satu kali bayar (seumur hidup). Semua nama yang disamarkan akan otomatis terbuka.
          </p>

          <div className="bg-zinc-50 p-5 rounded-2xl border border-zinc-200 mb-6">
            <p className="text-sm font-semibold text-zinc-500 mb-1">Total Pembayaran</p>
            <p className="text-fluid-h2 font-black text-zinc-900 mb-4">Rp 15.000</p>
            
            {/* Simulasi Gambar QRIS */}
            <div className="w-40 h-40 bg-white border-2 border-dashed border-zinc-300 rounded-xl mx-auto flex flex-col items-center justify-center text-zinc-500 gap-2 mb-3">
              <QrCode size={40} className="text-zinc-300" />
              <span className="text-xs font-medium">Scan QRIS (Simulasi)</span>
            </div>
            
            <p className="text-xs text-zinc-500">Gunakan GoPay, OVO, Dana, atau Mobile Banking.</p>
          </div>

          <button 
            onClick={onSuccess}
            className="w-full py-4 bg-zinc-900 text-white font-semibold rounded-xl hover:bg-zinc-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <ShieldCheck size={20} />
            Simulasikan Bayar Berhasil
          </button>
          
          <p className="text-[10px] text-zinc-500 mt-4 text-center">
            *Fitur ini murni simulasi (Tahap 4). Sistem tidak akan memproses pembayaran nyata.
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}
