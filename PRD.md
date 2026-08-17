# Product Requirements Document (PRD) - Followins

## 1. Visi Produk
Followins adalah alat analitik Instagram berbasis web yang mengutamakan privasi (privacy-first). Berbeda dengan aplikasi analitik tradisional yang meminta *username* dan *password* Instagram, Followins beroperasi 100% di perangkat pengguna (*Client-Side*) dengan membaca file ekstraksi ZIP resmi dari Instagram. Hal ini menjamin keamanan akun pengguna dari risiko peretasan atau pemblokiran sistem.

## 2. Target Pengguna
- **Pengguna Kasual:** Individu yang penasaran siapa yang tidak melakukan *follow-back* (Kutu Loncat).
- **Kreator Konten / Influencer:** Membutuhkan data pertumbuhan (growth) dan data loyalitas pengikut untuk meningkatkan *Engagement Rate*.
- **Social Media Manager (Agensi B2B):** Membutuhkan ekspor laporan rapi untuk diserahkan kepada klien.

## 3. Fitur Inti (MVP - Telah Diimplementasikan)
- **Ekstraksi Client-Side (JSZip):** Pemrosesan data yang 100% aman di browser tanpa melibatkan server.
- **Sistem CRM Mini:** Kemampuan melabeli akun (Teman, Abaikan, dll) dan melakukan pencarian.
- **Paywall "Bait":** Versi gratis yang membatasi tampilan hingga 100 akun pertama secara acak.
- **Rate Limiting Anti-Spam:** Membatasi unggahan ZIP maksimal 5x per bulan per perangkat (menggunakan *FingerprintJS*).
- **Dashboard Visual:** Grafik interaktif untuk visualisasi pertumbuhan (*Growth Chart*), demografi (*Cohort*), dan retensi pengikut.

---

## 4. Peta Jalan Pengembangan (Future Roadmap)

> [!NOTE] 
> **Status: Backlog (Direncanakan untuk Iterasi Mendatang)**
> Fitur-fitur dan strategi arsitektur di bawah ini merupakan bagian dari visi ekspansi jangka panjang produk. Implementasinya sengaja ditunda (*on-hold*) pada fase MVP saat ini agar kita dapat berfokus mematangkan stabilitas inti, perbaikan UI/UX dasar, dan peluncuran (*soft-launch*). Rencana-rencana ini akan dieksekusi secara bertahap pada pembaruan versi (v2.0) selanjutnya.

### 4.1. Analitik Tingkat Lanjut & Manajemen
- **Manajemen Multi-Akun (Cross-Account Dashboard):** Kemampuan untuk menyimpan dan beralih secara instan antar riwayat analisis dari beberapa akun Instagram yang berbeda di satu perangkat tanpa harus mengunggah ulang *file* ZIP berulang kali (sangat berguna bagi Agensi/Manajer Sosial Media yang memegang banyak akun klien).
- **Detektor "Ghost Follower":** Menyilangkan (*cross-reference*) data pengikut dengan histori file *Likes* dan *Comments* di dalam ZIP untuk mendeteksi pengikut pasif yang tidak pernah berinteraksi.
- **Super Fans Leaderboard:** Memetakan 10 pengikut paling interaktif berdasarkan frekuensi *likes/comments*, yang sangat berguna untuk program *Giveaway*.

### 4.2. Monetisasi & Sistem Bisnis
- **Integrasi Payment Gateway Otomatis (QRIS):** Mengganti UI simulasi QRIS saat ini dengan API riil (seperti Midtrans atau Xendit) agar transaksi mikro untuk membuka batas *paywall* 100 nama tervalidasi secara instan tanpa tenaga admin.
- **Sistem Premium Bertingkat (Multi-Tier Paywall):** Memperluas skema monetisasi dari sistem satu harga menjadi paket berjenjang (*Tiering*). Misalnya: "Paket Dasar" (menampilkan setengah dari total nama) dan "Paket Penuh" (menampilkan seluruh daftar nama 100%).
- **Lisensi Premium Lintas Akun:** Menerapkan skema validasi premium berbasis sesi identitas pengguna (*Device/Browser*), bukan mengikat pada satu profil Instagram. Sehingga, manajer media sosial yang membeli lisensi Premium dapat menggunakannya untuk menembus *paywall* 5 akun klien yang berbeda tanpa harus membayar langganan terpisah per akun.
- **Ekspor Laporan PDF Profesional (White-label):** Generator laporan eksklusif berbentuk PDF/CSV yang memungkinkan Manajer Sosial Media (*Agensi B2B*) mengunggah logo perusahaan mereka sendiri di dokumen laporan.
- **Model Bisnis "Jual Putus" (One-Time Audit):** Skema pembayaran sekali transaksi (bukan langganan) bagi *influencer* yang hanya membutuhkan laporan mendalam secara periodik (misal: audit setiap 3 bulan).
- **Ruang Monetisasi Iklan (Google AdSense):** Memanfaatkan efisiensi biaya server (*Client-Side*) dengan menyisipkan slot iklan (AdSense/Affiliate) yang tidak mengganggu untuk meraup pendapatan pasif dari lalu lintas pengguna gratis.

### 4.3. Infrastruktur, Keamanan, & Distribusi
- **Serverless Anti-Jebol (Vercel):** Memastikan arsitektur web tetap 100% terdistribusi di sisi klien agar limitasi fungsi eksekusi Vercel (10 detik pada *Hobby Tier*) tidak pernah tersentuh, mengizinkan skalabilitas tak terbatas secara gratis.
- **Server-Side Rate Limiting via Vercel KV (Redis):** Meng-upgrade keamanan anti-spam yang tadinya mengandalkan *Browser LocalStorage/FingerprintJS* menjadi sistem basis data Redis (Vercel KV). Ini menambal kelemahan versi gratis di mana *user* nakal mencoba mereset limit 5x *upload* dengan cara membersihkan riwayat *cache* browser.
- **Domain Bootstrapping & Cloudflare:** Peluncuran tahap awal menggunakan domain hemat biaya (`.my.id`) sebelum ditingkatkan ke domain premium (`.app`), dikombinasikan dengan manajemen DNS dan proteksi DDoS dari Cloudflare.
- **Cloudflare Turnstile (Anti-Bot):** Implementasi tantangan transparan pengganti CAPTCHA di area unggah file untuk mencegah skrip robot menguras limit aplikasi.
- **Aplikasi Mobile (Android Native):** Membungkus atau memigrasikan web Next.js ke platform *mobile* menggunakan *framework* seperti Capacitor atau React Native agar aplikasi Followins dapat didistribusikan dan diunduh langsung melalui Google Play Store.
- **PWA (Progressive Web App):** Konfigurasi *manifest* yang mengizinkan web untuk diinstal langsung ke *Home Screen* perangkat seluler iOS dan Android, melewati kerumitan persetujuan *App Store/Play Store*.
- **Optimasi SEO & Open Graph (OG Tags):** Injeksi meta tags dinamis (*thumbnail* khusus) agar tautan Followins terlihat premium dan meyakinkan saat dibagikan di platform media sosial seperti WhatsApp atau X (Twitter).
