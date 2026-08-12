# Followins: Design Document (DESIGN.md)

## 1. Visi Produk
Followins adalah alat pelacak pengikut Instagram yang 100% berbasis privasi (Client-Side) dan menggunakan file ekspor resmi Instagram (.zip) untuk akurasi mutlak.

## 2. Tema Visual (UI/UX)
- **Tema Utama:** Light Mode (Terang) dengan sentuhan minimalis, bayangan halus (soft shadow), dan *whitespace* yang lega untuk memberikan kesan *Premium* layaknya aplikasi iOS modern.
- **Warna Aksen:** Gradien khas aplikasi Instagram (campuran Kuning, Oranye, Pink, dan Ungu: `from-yellow-400 via-pink-500 to-purple-600`) untuk tombol utama dan elemen interaktif.
- **Tipografi:** *Inter* atau *Geist* (Modern, bersih, mudah dibaca).

## 3. Komponen Utama & Halaman (Routes)
- **Komponen Global:**
  - **`Header.tsx`:** Bilah navigasi atas yang berisi Logo, tombol *Toggle Language* (ID/EN), dan tombol *Reset Akun* (Hapus *Cache*).
  - **`Footer.tsx`:** Bilah bawah berisi tautan *Privacy Policy*, *Terms of Service*, dan logo WhatsApp (*Support*).
- **`/` (Landing Page):**
  - Hero Section dengan animasi halus.
  - Komponen `ZipUploader.tsx`: Area Drag & Drop (dan tombol khusus Mobile) yang menerima file ZIP. Ekstraksi dilakukan via `JSZip` di memori browser.
  - **`LoadingScreen.tsx`:** Animasi *loading* bergaya "Terminal Hacker" yang interaktif (menampilkan teks proses secara cepat) untuk mengurangi *bounce rate* saat file diproses.
- **`/dashboard` (Hasil Analisis):**
  - **`MetricCards.tsx`:** Menampilkan 3 kartu statistik raksasa (Unfollowers, Fans, Mutual).
  - **`GrowthChart.tsx`:** Menggunakan library `Recharts` untuk grafik area tren *follow/unfollow* bulanan.
  - **`UserTable.tsx`:** Menampilkan dua tabel terpisah: 100 daftar nama teratas akun yang tidak *follback* Anda, dan 100 daftar nama teratas akun yang mem-follow Anda tapi tidak Anda *follback*. Sisa nama di luar 100 teratas akan disensor menggunakan CSS Filter (Blur).
- **`PaywallModal.tsx`:** 
  - Muncul ketika pengguna ingin melihat > 100 nama. Menampilkan QRIS (Midtrans/Xendit) untuk pembayaran Rp 15.000.

## 4. Tech Stack Frontend
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS + Framer Motion (untuk animasi)
- **Data Parser:** `JSZip`
- **Charts:** `Recharts`
