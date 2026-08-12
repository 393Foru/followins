"use client";

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/i18n/LanguageContext';
import Link from 'next/link';

export default function PrivacyPolicy() {
  const { language } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Header />
      
      <main className="flex-1 flex flex-col px-6 py-10 md:py-12 max-w-4xl mx-auto w-full">
        <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-slate-100">
          {language === 'id' ? (
            <div className="space-y-6 text-slate-600 leading-relaxed">
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">Kebijakan Privasi</h1>
              <p className="text-sm text-slate-400 mb-8">Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              
              <p>Selamat datang di Followins. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi Anda saat Anda menggunakan layanan kami. Followins dirancang dengan pendekatan <strong className="text-slate-900">Privacy-First</strong> yang berarti perlindungan data Anda adalah prioritas utama kami.</p>

              <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">1. Pengumpulan dan Pemrosesan Data</h2>
              <p>Followins adalah aplikasi 100% Client-Side. Ini berarti:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong className="text-slate-900">Semua pemrosesan data terjadi di perangkat Anda (di dalam browser Anda).</strong></li>
                <li>File ZIP Instagram yang Anda unggah <strong className="text-slate-900">tidak pernah</strong> dikirim, diunggah, atau disimpan di server kami.</li>
                <li>Kami tidak memiliki akses ke data pengikut, yang mengikuti, atau informasi pribadi apa pun yang terdapat di dalam file ZIP Anda.</li>
              </ul>

              <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">2. Informasi yang Kami Kumpulkan</h2>
              <p>Karena sifat layanan kami yang memproses secara lokal, kami <strong className="text-slate-900">tidak</strong> mengumpulkan atau menyimpan Data Pribadi (Personal Data) Anda. Kami dapat menggunakan layanan analitik pihak ketiga yang mengumpulkan data penggunaan anonim (seperti kunjungan halaman, klik, dan jenis browser) untuk membantu kami meningkatkan layanan kami.</p>

              <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">3. Penyimpanan Data Lokal</h2>
              <p>Followins mungkin menggunakan penyimpanan lokal pada browser Anda (seperti <em className="italic">localStorage</em>) untuk menyimpan preferensi Anda (misalnya pilihan bahasa) atau riwayat ringkasan statistik secara lokal agar Anda bisa melihatnya kembali nanti. Data ini tetap berada di perangkat Anda dan dapat dihapus kapan saja melalui pengaturan browser Anda.</p>

              <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">4. Keamanan Data</h2>
              <p>Karena kami tidak mengumpulkan atau mentransfer data Instagram Anda ke server mana pun, risiko peretasan atau kebocoran data dari pihak kami secara praktis dihilangkan. Anda sepenuhnya mengontrol data Anda.</p>

              <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">5. Tautan Pihak Ketiga</h2>
              <p>Situs web kami mungkin berisi tautan ke situs web lain. Kami tidak bertanggung jawab atas praktik privasi atau konten dari situs pihak ketiga tersebut.</p>

              <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">6. Perubahan pada Kebijakan Privasi</h2>
              <p>Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Kami akan memberi tahu Anda tentang setiap perubahan dengan memposting Kebijakan Privasi baru di halaman ini. Anda disarankan untuk meninjau Kebijakan Privasi ini secara berkala untuk setiap perubahan.</p>

              <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">7. Hubungi Kami</h2>
              <p>Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, silakan hubungi kami melalui <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-700 underline font-medium">WhatsApp Support</a> kami.</p>
            </div>
          ) : (
            <div className="space-y-6 text-slate-600 leading-relaxed">
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">Privacy Policy</h1>
              <p className="text-sm text-slate-400 mb-8">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              
              <p>Welcome to Followins. This Privacy Policy explains how we collect, use, and protect your information when you use our services. Followins is designed with a <strong className="text-slate-900">Privacy-First</strong> approach, meaning your data protection is our top priority.</p>

              <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">1. Data Collection and Processing</h2>
              <p>Followins is a 100% Client-Side application. This means:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong className="text-slate-900">All data processing happens on your device (within your browser).</strong></li>
                <li>The Instagram ZIP file you upload is <strong className="text-slate-900">never</strong> sent, uploaded, or stored on our servers.</li>
                <li>We do not have access to your followers, following, or any personal information contained in your ZIP file.</li>
              </ul>

              <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">2. Information We Collect</h2>
              <p>Due to the local processing nature of our service, we <strong className="text-slate-900">do not</strong> collect or store your Personal Data. We may use third-party analytics services that collect anonymous usage data (like page visits, clicks, and browser type) to help us improve our services.</p>

              <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">3. Local Data Storage</h2>
              <p>Followins may use your browser&apos;s local storage (such as <em className="italic">localStorage</em>) to save your preferences (like language selection) or summary statistics history locally so you can view them later. This data remains on your device and can be cleared at any time via your browser settings.</p>

              <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">4. Data Security</h2>
              <p>Since we do not collect or transfer your Instagram data to any servers, the risk of hacks or data breaches from our side is practically eliminated. You are in full control of your data.</p>

              <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">5. Third-Party Links</h2>
              <p>Our website may contain links to other websites. We are not responsible for the privacy practices or the content of such third-party sites.</p>

              <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">6. Changes to This Privacy Policy</h2>
              <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>

              <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">7. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us via our <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-700 underline font-medium">WhatsApp Support</a>.</p>
            </div>
          )}
          
          <div className="mt-8 text-center border-t border-slate-100 pt-6">
            <Link href="/" className="inline-block px-8 py-3 text-sm font-bold bg-slate-900 text-white rounded-full hover:bg-slate-800 transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
              {language === 'id' ? 'Kembali ke Beranda' : 'Back to Home'}
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
