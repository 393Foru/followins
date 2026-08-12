# Followins: Implementation Plan (IMPLEMENTATION_PLAN.md)

Rencana eksekusi langkah demi langkah untuk membangun Minimum Viable Product (MVP) Followins.

## Tahap 1: Setup Proyek & Infrastruktur Dasar
- [x] Inisialisasi `create-next-app` dengan TypeScript dan Tailwind CSS.
- [x] Instal library tambahan: `jszip`, `recharts`, `lucide-react`, `framer-motion`.
- [x] Atur tema global (*light mode* by default) di `tailwind.config.ts`.

## Tahap 2: Core Logic (Pengolahan Data Client-Side)
- [x] Buat file utilitas `src/utils/instagramParser.ts`.
- [x] Tulis fungsi membaca Buffer ZIP menggunakan `JSZip`.
- [x] Tulis logika **Fuzzy Search** untuk menemukan file bereksistensi `.json` yang mengandung kata `followers` dan `following` tanpa bergantung pada *path* folder yang kaku.
- [x] Tulis fungsi algoritma himpunan (Set) untuk mencari Unfollowers, Fans, dan Mutuals.

## Tahap 3: Halaman Upload & Dashboard UI
- [x] Buat komponen `ZipUploader.tsx` di halaman utama (Drag & Drop UI + Tombol khusus Mobile).
- [x] Hubungkan uploader dengan `instagramParser.ts`.
- [x] Peningkatan Landing Page: Tambahkan komponen informatif (`Features.tsx`, `HowItWorks.tsx`, `FAQ.tsx`, `PrivacySection.tsx`).
- [x] Tambahkan `HistoryWidget.tsx` untuk menampilkan riwayat upload terakhir dari `LocalStorage` agar pengguna tidak perlu memproses ulang data.
- [x] Buat halaman `/dashboard` yang menerima hasil data JSON.
- [x] Implementasikan `MetricCards.tsx` (Jumlah followers/unfollowers).
- [x] Implementasikan `GrowthChart.tsx` dan fitur visualisasi lainnya (Cohort, Seasonality Radar, dll).
- [x] Implementasikan `UserTable.tsx` (Menampilkan maksimal 100 akun yang dipilih secara **acak** untuk versi gratis. Setelah berbayar, tampilkan semua akun yang diurutkan abjad tanpa batas 100 akun).

## Tahap 4: Sistem Bisnis (Rate Limit & Paywall)
- [ ] Buat Next.js API Route untuk mencatat batas harian IP (sementara gunakan memori lokal sebelum beralih ke Redis).
- [x] Buat komponen `PaywallModal.tsx` dengan UI *mock-up* pembayaran QRIS.
- [x] **Keamanan Paywall:** Terapkan enkripsi di sisi memori untuk daftar sisa nama, di mana *Decryption Key* hanya diberikan dari respons server setelah pembayaran sukses (Bypass F12 Protection).

## Tahap 5: Standar Produksi (Keamanan, SEO & Support)
- [x] **Error Handling:** Tambahkan logika pengecekan ekstensi file (harus `.zip`) dan batas maksimal ukuran (100MB) pada `ZipUploader.tsx`.
- [x] **Legal & Support:** Buat komponen `Footer.tsx` dan halaman statis terpisah (`/terms`, `/privacy`) untuk *Privacy Policy*, *Terms of Service*, dan bantuan WhatsApp.
- [ ] **SEO & Shareability:** Konfigurasi `Metadata` dan *Open Graph (OG Tags)* di `layout.tsx` agar terlihat premium saat tautan web dibagikan.
- [ ] **Anti-Bot:** Pasang pelindung transparan (*Cloudflare Turnstile*) di area upload untuk mencegah *spam request*.
- [x] **Bilingual (i18n):** Siapkan dukungan dua bahasa (Indonesia/Inggris) untuk menjangkau pengguna global (`LanguageContext.tsx`).
- [ ] **PWA Support:** Konfigurasikan *Progressive Web App* agar website bisa diinstal ke *Home Screen* HP.
- [ ] **Multi-Account Reset:** Tambahkan fungsi bersihkan *cache* untuk memungkinkan pengguna mengecek akun lain tanpa *reload*.
- [ ] Lakukan End-to-End (E2E) Test keseluruhan alur dari *upload* hingga simulasi pembayaran.
