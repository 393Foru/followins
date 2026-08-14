"use client";

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/i18n/LanguageContext';
import Link from 'next/link';
import EmailSupportLink from '@/components/EmailSupportLink';

export default function TermsAndConditions() {
  const { language } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 text-zinc-900 font-sans">
      <Header />
      
      <main className="flex-1 flex flex-col px-6 py-10 md:py-12 max-w-4xl mx-auto w-full">
        <div className="relative overflow-hidden bg-zinc-900 p-6 md:p-10 rounded-3xl shadow-lg border border-zinc-800">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
          
          <div className="relative z-10">
            {language === 'id' ? (
              <div className="space-y-6 text-zinc-400 leading-relaxed text-justify">
                <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 text-left">Syarat & Ketentuan</h1>
                <p className="text-sm text-zinc-500 mb-8 text-left">Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                
                <p>Selamat datang di Followins. Dengan mengakses dan menggunakan layanan kami, Anda menyetujui untuk terikat oleh Syarat dan Ketentuan berikut. Jika Anda tidak setuju dengan bagian mana pun dari syarat ini, mohon untuk tidak menggunakan layanan kami.</p>

                <h2 className="text-xl font-bold text-white mt-8 mb-4 text-left">1. Deskripsi Layanan</h2>
                <p>Followins adalah alat bantu berbasis web yang memungkinkan pengguna untuk membandingkan daftar pengikut (followers) dan yang diikuti (following) Instagram dari file ZIP ekspor data. Layanan ini disediakan &quot;sebagaimana adanya&quot; tanpa jaminan apa pun.</p>

                <h2 className="text-xl font-bold text-white mt-8 mb-4 text-left">2. Pemrosesan Data Lokal</h2>
                <p>Kami menggunakan pendekatan <strong className="text-white">100% Client-Side</strong>. Ini berarti seluruh pemrosesan file ZIP Anda dilakukan secara lokal di perangkat Anda melalui browser. Kami tidak mengunggah, mengirim, atau menyimpan file ZIP maupun isinya di server kami.</p>

                <h2 className="text-xl font-bold text-white mt-8 mb-4 text-left">3. Tidak Ada Afiliasi dengan Instagram</h2>
                <p>Followins adalah proyek independen dan <strong className="text-white">TIDAK berafiliasi</strong>, dikaitkan, didukung, atau disponsori dengan cara apa pun oleh Instagram, Inc. atau perusahaan induknya, Meta Platforms, Inc.</p>

                <h2 className="text-xl font-bold text-white mt-8 mb-4 text-left">4. Batasan Tanggung Jawab</h2>
                <p>Penggunaan layanan ini sepenuhnya menjadi risiko Anda sendiri. Dalam kondisi apa pun, Followins atau pengembangnya tidak bertanggung jawab atas kerugian langsung, tidak langsung, insidental, atau konsekuensial apa pun yang timbul dari penggunaan alat ini, termasuk namun tidak terbatas pada, penangguhan akun (banned), hilangnya data, atau kerugian lainnya.</p>

                <h2 className="text-xl font-bold text-white mt-8 mb-4 text-left">5. Kebijakan Privasi</h2>
                <p>Penggunaan Anda atas layanan ini juga tunduk pada Kebijakan Privasi kami. Untuk informasi lebih lanjut mengenai bagaimana kami (tidak) menangani data Anda, silakan baca <Link href="/privacy" className="text-emerald-500 hover:text-emerald-400 underline font-medium">Kebijakan Privasi</Link> kami.</p>

                <h2 className="text-xl font-bold text-white mt-8 mb-4 text-left">6. Perubahan Syarat</h2>
                <p>Kami berhak untuk memodifikasi atau mengganti Syarat dan Ketentuan ini kapan saja. Anda diharapkan untuk memeriksa halaman ini secara berkala untuk mengetahui perubahan apa pun. Penggunaan berkelanjutan atas layanan kami setelah modifikasi apa pun merupakan penerimaan Anda terhadap syarat yang baru.</p>

                <h2 className="text-xl font-bold text-white mt-8 mb-4 text-left">7. Hubungi Kami</h2>
                <p>Jika Anda memiliki pertanyaan terkait Syarat dan Ketentuan ini, silakan hubungi kami melalui <EmailSupportLink /> kami.</p>
              </div>
            ) : (
              <div className="space-y-6 text-zinc-400 leading-relaxed text-justify">
                <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 text-left">Terms & Conditions</h1>
                <p className="text-sm text-zinc-500 mb-8 text-left">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                
                <p>Welcome to Followins. By accessing and using our service, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, please do not use our service.</p>

                <h2 className="text-xl font-bold text-white mt-8 mb-4 text-left">1. Service Description</h2>
                <p>Followins is a web-based utility tool that allows users to compare their Instagram followers and following lists from a data export ZIP file. The service is provided on an &quot;as is&quot; basis without any warranties.</p>

                <h2 className="text-xl font-bold text-white mt-8 mb-4 text-left">2. Local Data Processing</h2>
                <p>We use a <strong className="text-white">100% Client-Side</strong> approach. This means all processing of your ZIP file is done locally on your device through your browser. We do not upload, send, or store your ZIP file or its contents on our servers.</p>

                <h2 className="text-xl font-bold text-white mt-8 mb-4 text-left">3. No Affiliation with Instagram</h2>
                <p>Followins is an independent project and is <strong className="text-white">NOT affiliated</strong>, associated, endorsed, or sponsored in any way by Instagram, Inc. or its parent company, Meta Platforms, Inc.</p>

                <h2 className="text-xl font-bold text-white mt-8 mb-4 text-left">4. Limitation of Liability</h2>
                <p>Use of this service is entirely at your own risk. In no event shall Followins or its developers be liable for any direct, indirect, incidental, or consequential damages arising out of the use of this tool, including but not limited to account suspension (bans), loss of data, or any other damages.</p>

                <h2 className="text-xl font-bold text-white mt-8 mb-4 text-left">5. Privacy Policy</h2>
                <p>Your use of this service is also subject to our Privacy Policy. For more information on how we (do not) handle your data, please review our <Link href="/privacy" className="text-emerald-500 hover:text-emerald-400 underline font-medium">Privacy Policy</Link>.</p>

                <h2 className="text-xl font-bold text-white mt-8 mb-4 text-left">6. Changes to Terms</h2>
                <p>We reserve the right to modify or replace these Terms and Conditions at any time. You are expected to check this page periodically to become aware of any changes. Your continued use of our service after any modification constitutes your acceptance of the new terms.</p>

                <h2 className="text-xl font-bold text-white mt-8 mb-4 text-left">7. Contact Us</h2>
                <p>If you have any questions regarding these Terms and Conditions, please contact us via our <EmailSupportLink />.</p>
              </div>
            )}
            
            <div className="mt-8 text-center border-t border-zinc-800 pt-6">
              <Link href="/" className="inline-block px-8 py-3 text-sm font-bold bg-emerald-500 text-zinc-950 rounded-full hover:bg-emerald-400 transition shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] transform hover:-translate-y-0.5">
                {language === 'id' ? 'Kembali ke Beranda' : 'Back to Home'}
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
