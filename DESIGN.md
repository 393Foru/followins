# Followins: Design Document (DESIGN.md)

## 1. Visi Produk
Followins adalah alat pelacak pengikut Instagram yang 100% berbasis privasi (Client-Side) dan menggunakan file ekspor resmi Instagram (.zip) untuk akurasi mutlak tanpa perlu login akun.

## 2. Tema Visual (UI/UX)
- **Tema Utama:** Light Mode (Terang) dengan sentuhan minimalis, bayangan halus (soft shadow), dan *whitespace* yang lega untuk memberikan kesan *Premium* layaknya aplikasi modern.
- **Warna Aksen:** Palet elegan berbasis `Zinc` (abu-abu gelap) untuk kerangka utama, dikombinasikan dengan aksen warna solid (Emerald, Amber, Blue, Pink) untuk tombol dan indikator status.
- **Tipografi:** *Inter* atau *Geist* (Modern, bersih, mudah dibaca).
- **Aset Visual:** Penggunaan gambar latar estetik (`cloud-bg.jpg`, `3d-zip.jpg`) untuk memberikan kesan 3D yang imersif pada area hero dan *uploader*.

## 3. Komponen Utama & Halaman (Routes)
- **Komponen Global:**
  - **`Header.tsx`:** Bilah navigasi atas yang berisi Logo dan tombol *Toggle Language* (ID/EN) menggunakan `LanguageContext`.
  - **`Footer.tsx`:** Bilah bawah berisi tautan *Privacy Policy*, *Terms of Service*, dan bantuan.
- **`/` (Landing Page):**
  - **Hero Section:** Penjelasan singkat yang persuasif.
  - **`Features.tsx` & `HowItWorks.tsx`:** Penjelasan nilai jual dan cara penggunaan alat secara visual.
  - **`FAQ.tsx` & `PrivacySection.tsx`:** Menjawab keraguan pengguna tentang keamanan (100% Client-Side) dan pertanyaan umum.
  - **`HistoryWidget.tsx`:** Menampilkan cuplikan hasil analisis sebelumnya yang tersimpan di memori lokal.
  - **`ZipUploader.tsx` & Live Demo:** Area Drag & Drop yang menerima file ZIP dari Instagram, dilengkapi dengan tombol *Live Demo* untuk melihat pratinjau data simulasi. Ekstraksi ZIP asli dilakukan via `JSZip` secara aman di memori browser.
  - **`LoadingScreen.tsx`:** Animasi *loading* bergaya "Terminal Hacker" (menggunakan Framer Motion) yang memberikan *feedback* interaktif kepada pengguna selama proses *parsing* file besar.
- **`/dashboard` (Hasil Analisis):**
  - **`NewUnfollowersAlert.tsx`:** Notifikasi pintar yang mendeteksi unfollower baru dan akun "Kutu Loncat" (Hit & Run) dengan membandingkan data ZIP saat ini dengan hasil pemindaian sebelumnya dari LocalStorage.
  - **`MetricCards.tsx` & `MutualStats.tsx`:** Menampilkan statistik metrik utama (Unfollowers, Fans, Mutual).
  - **`AccountHealthRatio.tsx`:** Indikator *gauge* (Framer Motion) untuk rasio perbandingan Followers vs Following guna mengukur tingkat kesehatan akun.
  - **`LoyalFollowers.tsx` & `PendingRequests.tsx`:** Menampilkan daftar pengikut yang bertahan paling lama dan daftar akun yang belum menerima permintaan *follow* Anda.
  - **Visualisasi Data (`Recharts`):**
    - **`GrowthChart.tsx`:** Grafik garis tren Follow/Unfollow.
    - **`RelationshipPieChart.tsx`:** Proporsi pengikut vs yang tidak mengikuti balik.
    - **`CohortChart.tsx`:** Retensi followers.
    - **`SeasonalityRadar.tsx`:** Aktivitas atau rasio followers berdasarkan tipe/waktu (mockup visualisai kompleks).
  - **`UserTable.tsx`:** Menampilkan nama-nama akun yang di-filter berdasarkan status. Pada versi gratis dibatasi maksimal 100 akun; sisa data disembunyikan total dari DOM menggunakan *Skeleton Dummy Data* untuk mencegah eksploitasi *Inspect Element* (Anti-F12).
- **`PaywallModal.tsx`:**
  - Dirender menggunakan `createPortal` pada level tertinggi DOM. Muncul ketika pengguna ingin membuka batasan freemium untuk melihat seluruh akun. Menampilkan simulasi UI pembayaran QRIS yang interaktif.
- **Halaman Legal Statis:**
  - **`/privacy`:** Halaman Kebijakan Privasi yang menegaskan komitmen pengolahan data secara lokal.
  - **`/terms`:** Halaman Syarat dan Ketentuan penggunaan layanan.

## 4. Tech Stack Frontend
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS + Framer Motion (Animasi)
- **Data Parser:** `JSZip`
- **Charts:** `Recharts`
- **Lokalisasi:** Context API (`LanguageContext.tsx` & `dictionaries.ts`)
- **State & Storage:** LocalStorage (`storage.ts`) & Web Crypto API (`crypto.ts`)
