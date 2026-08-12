import { Camera } from 'lucide-react';

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
      <div className="flex items-center gap-2">
        <Camera className="text-pink-500" size={28} />
        <span className="font-bold text-xl bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
          Followins
        </span>
      </div>
      <div className="flex gap-4">
        <button className="text-sm font-medium text-slate-500 hover:text-slate-800 transition">
          ID / EN
        </button>
      </div>
    </header>
  );
}
