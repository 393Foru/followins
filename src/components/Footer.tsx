export default function Footer() {
  return (
    <footer className="mt-16 py-8 text-center text-slate-400 text-sm border-t border-slate-100">
      <div className="flex justify-center gap-6 mb-4">
        <a href="#" className="hover:text-slate-800 transition">Privacy Policy</a>
        <a href="#" className="hover:text-slate-800 transition">Terms of Service</a>
        <a href="#" className="hover:text-slate-800 transition">WhatsApp Support</a>
      </div>
      <p>© {new Date().getFullYear()} Followins. 100% Client-Side Privacy.</p>
    </footer>
  );
}
