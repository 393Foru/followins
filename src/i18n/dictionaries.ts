export const dictionaries = {
  id: {
    // page.tsx
    privacyBadge: "100% Client-Side Privacy",
    heroTitle1: "Lacak Siapa yang",
    heroTitle2: "Unfollow Anda",
    heroDesc: "Analisis data ekspor ZIP Instagram Anda secara langsung di browser. Privasi terjamin aman, data tidak pernah dikirim ke server.",
    summaryTitle: "Ringkasan Akun Anda",
    summaryDesc: "Berdasarkan pemrosesan data lokal di perangkat Anda.",
    checkAnotherBtn: "Cek File Lain",
    
    // ZipUploader.tsx
    uploadError: "Mohon unggah file berekstensi .zip dari Instagram.",
    uploadPrompt: "Klik atau Tarik file .zip Instagram Anda ke sini",
    uploadDesc: "Data Anda 100% aman. Seluruh proses perhitungan dilakukan langsung di memori HP/Komputer Anda. Tidak ada data yang dikirim ke server.",
    
    // Header
    langSwitch: "ID / EN",
    navHowItWorks: "Cara Kerja",
    navFeatures: "Fitur",
    navFaq: "FAQ",
    navUpload: "Upload ZIP",

    // MetricCards.tsx
    unfollowersDesc: "Tidak Follback Anda",
    fansDesc: "Tidak Anda Follback",
    mutualsDesc: "Saling Follow",

    // UserTable.tsx
    showing: "Menampilkan",
    from: "dari",
    accounts: "akun.",
    maxRandomFree: "Maks 100 Acak (Versi Gratis)",
    hiddenNames1: "Ada",
    hiddenNames2: "Nama yang Disembunyikan",
    hiddenDesc: "Untuk melindungi sistem dari penyalahgunaan, versi gratis hanya menampilkan 100 nama <strong>secara acak</strong> (dilindungi secara sistem menggunakan Base64). Buka kunci untuk melihat seluruh daftar.",
    unlockAll: "Buka Semua Akses (Rp 15.000)",

    // Footer.tsx
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    emailSupport: "Email Support",
    footerText: "Followins. 100% Client-Side Privacy.",

    // LoadingScreen.tsx
    terminalTitle: "Terminal - Proses Analisis",
    loadingMsg0: "Membaca ZIP ke dalam memori browser...",
    loadingMsg1: "Memindai direktori file...",
    loadingMsg2: "Mencari letak file followers & following JSON (Fuzzy Search)...",
    loadingMsg3: "Mengekstrak data list jaringan (string_list_data)...",
    loadingMsg4: "Membangun algoritma Himpunan (Sets)...",
    loadingMsg5: "Mengkalkulasi irisan untuk Mutuals...",
    loadingMsg6: "Mencari selisih (Unfollowers dan Fans)...",
    loadingMsg7: "Mengamankan data dari Inspect Element (Anti-F12)...",
    loadingMsg8: "Menyiapkan Dashboard...",

    // MutualStats.tsx
    mutualStatsTitle: "Statistik \"Siapa Duluan?\"",
    mutualStatsDesc1: "Dari total",
    mutualStatsDesc2: "orang yang saling follow (Mutual) dengan Anda, mari kita lihat siapa yang lebih dulu menekan tombol follow.",
    youFirst: "Anda Follow Duluan",
    youFirstDesc: "Anda menunggu follback mereka",
    themFirst: "Mereka Follow Duluan",
    themFirstDesc: "Mereka yang menunggu follback Anda",
    sameDay: "Di Hari yang Sama",
    sameDayDesc: "Follow berbarengan < 24 jam",

    // RelationshipPieChart.tsx
    relTitle: "Ringkasan Status Pertemanan",
    relDesc: "Melihat perbandingan jumlah antara orang yang saling follow, pengikut setia (fans), dan orang yang belum mem-follback Anda.",
    relNotFollowBack: "Tidak Follback Anda",
    relMutual: "Mutual (Saling Follow)",
    relFans: "Fans (Aku Tidak Follback)",

    // GrowthChart.tsx
    growthNoData: "Belum ada data",
    growthTitle: "Grafik Penambahan Followers Baru",
    growthDescMonthly: "Detail penambahan setiap bulan di tahun",
    growthDescYearly: "Total penambahan dari tahun ke tahun",
    growthYear: "Tahun",
    growthPerMonth: "Per Bulan",
    growthPerYear: "Per Tahun",
    growthNewFollowers: "Followers Baru",
    growthNewFollowing: "Following Baru",

    // CohortChart.tsx
    cohortTitle: "Fans, Mutualan, dan Unfollower",
    cohortDesc: "Grafik ini mengelompokkan akun berdasarkan tahun pertama kali kalian terhubung (entah saat mereka mulai men-follow Anda, atau Anda men-follow mereka). Dari kelompok tahun tersebut, Anda bisa melihat berapa jumlah akun yang saat ini berstatus sebagai Mutualan, Fans, atau Unfollower.",
    cohortMutuals: "Mutualan",
    cohortFans: "Fans",
    cohortUnfollowers: "Unfollower",
    cohortOlder: "Lebih Lama",
    cohortPage: "Halaman",
    cohortNewer: "Lebih Baru",

    // SeasonalityRadar.tsx
    seasonTitle: "Bulan Paling Ramai",
    seasonDescAll: "Secara keseluruhan: Di bulan apa Anda paling banyak mendapat pengikut baru?",
    seasonDescYear: "Bulan apa yang paling ramai pengikut baru di tahun",
    seasonAllTime: "Semua Waktu",
    seasonTotalFollowers: "Total Followers Didapat",
    
    // LoyalFollowers.tsx
    loyalTitle: "Followers Paling Setia",
    loyalDesc: "Akun yang paling lama mengikuti Anda",

    // AccountHealthRatio.tsx
    healthTitle: "Rasio Akun",
    healthDesc: "Perbandingan Followers vs Following",
    healthGood: "Akun Populer / Sehat",
    healthBad: "Lebih Banyak Mengikuti",

    // PendingRequests.tsx
    pendingTitle: "Menunggu Persetujuan",
    pendingDesc: "Permintaan follow Anda yang belum di-ACC (akun di-Private)",

    months: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],

    // How It Works
    howItWorksTitle: "Cara Menggunakan Followins",
    howItWorksDesc: "Hanya butuh 3 langkah mudah untuk melihat siapa yang berhenti mengikuti Anda tanpa perlu login.",
    step1Title: "1. Buka Pengaturan Instagram",
    step1Desc: "Buka aplikasi Instagram, masuk ke Profil > Pengaturan (Garis tiga) > Aktivitas Anda (Your activity).",
    step2Title: "2. Unduh Informasi Anda",
    step2Desc: "Pilih 'Unduh informasi Anda' (Download your information). Pilih format JSON dan rentang waktu 'Semua waktu' (All time).",
    step3Title: "3. Tunggu Email dari Instagram",
    step3Desc: "Instagram akan memproses permintaan Anda. Ini memakan waktu dari beberapa menit hingga beberapa jam.",
    step4Title: "4. Unggah File ZIP",
    step4Desc: "Setelah mendapat email, unduh file ZIP-nya dan tarik/unggah ke area di atas. Selesai!",

    // Features
    featuresTitle: "Kenapa Memilih Followins?",
    featuresDesc: "Analisis mendalam tanpa mengorbankan keamanan akun Anda.",
    feat1Title: "Aman dari Banned",
    feat1Desc: "Karena tidak perlu login, akun Anda 100% terhindar dari risiko diblokir atau di-*banned* oleh Instagram.",
    feat2Title: "Grafik Interaktif",
    feat2Desc: "Lihat tren pengikut, retensi, dan statistik siapa yang lebih dulu mem-follow lewat grafik yang indah.",
    feat3Title: "Super Cepat",
    feat3Desc: "Pemrosesan file jutaan baris data dapat diselesaikan dalam hitungan detik langsung di perangkat Anda.",

    // Privacy
    privacyTitle: "Privasi Anda adalah Prioritas Utama",
    privacyDesc: "Kami tidak pernah menyimpan, mengintip, atau mengirim data Anda ke mana pun.",
    priv1Title: "100% Client-Side",
    priv1Desc: "Kode kami mengekstrak file ZIP Anda menggunakan memori di browser Anda. Server kami tidak menerima data apa pun.",
    priv2Title: "Tidak Perlu Password",
    priv2Desc: "Banyak aplikasi pihak ketiga yang mencuri kredensial Anda. Kami tidak pernah memintanya.",
    priv3Title: "Buka Sumber (Transparan)",
    priv3Desc: "Proses ekstraksi yang kami lakukan bisa Anda lihat sendiri. Keamanan bukan hanya janji, tapi jaminan teknis.",

    // FAQ
    faqTitle: "Pertanyaan yang Sering Diajukan",
    faqDesc: "Punya pertanyaan? Mungkin sudah kami jawab di sini.",
    q1: "Apakah aplikasi ini gratis?",
    a1: "Ya! Fitur visualisasi dan grafik 100% gratis. Hanya untuk melihat daftar lengkap nama yang Unfollow kami membatasi hingga 100 nama acak di versi gratis untuk mencegah penyalahgunaan sistem.",
    q2: "Berapa lama Instagram mengirim file ZIP saya?",
    a2: "Biasanya hanya memakan waktu 5-15 menit. Namun jika akun Anda memiliki puluhan ribu pengikut atau history yang panjang, bisa memakan waktu hingga beberapa jam.",
    q3: "Mengapa menggunakan format JSON dan bukan HTML?",
    a3: "Sistem Followins membaca data mentah (JSON) untuk menghasilkan perhitungan himpunan (sets) dengan akurasi 100% dan memvisualisasikannya menjadi grafik. Format HTML ditujukan hanya untuk dibaca manusia.",
    
    // History
    historyTitle: "Riwayat Analisis Anda"
  },
  en: {
    // page.tsx
    privacyBadge: "100% Client-Side Privacy",
    heroTitle1: "Track Who",
    heroTitle2: "Unfollowed You",
    heroDesc: "Analyze your Instagram ZIP export directly in your browser. Your privacy is guaranteed; no data is ever sent to our servers.",
    summaryTitle: "Your Account Summary",
    summaryDesc: "Based on data processed locally on your device.",
    checkAnotherBtn: "Check Another File",
    
    // ZipUploader.tsx
    uploadError: "Please upload a valid .zip file from Instagram.",
    uploadPrompt: "Click or drag your Instagram .zip file here",
    uploadDesc: "Your data is 100% safe. All processing happens locally on your device. No data is ever uploaded.",
    
    // Header
    langSwitch: "EN / ID",
    navHowItWorks: "How it Works",
    navFeatures: "Features",
    navFaq: "FAQ",
    navUpload: "Upload ZIP",

    // MetricCards.tsx
    unfollowersDesc: "Not following you back",
    fansDesc: "You're not following back",
    mutualsDesc: "Following each other",

    // UserTable.tsx
    showing: "Showing",
    from: "of",
    accounts: "accounts.",
    maxRandomFree: "Max 100 Random (Free)",
    hiddenNames1: "You have",
    hiddenNames2: "hidden names",
    hiddenDesc: "To prevent abuse, the free version only reveals 100 <strong>random</strong> names. Unlock to view your complete list.",
    unlockAll: "Unlock Full Access (Rp 15.000)",

    // Footer.tsx
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    emailSupport: "Email Support",
    footerText: "Followins. 100% Client-Side Privacy.",

    // LoadingScreen.tsx
    terminalTitle: "Terminal - Analyzing",
    loadingMsg0: "Reading ZIP file into browser memory...",
    loadingMsg1: "Scanning directory structure...",
    loadingMsg2: "Locating followers & following JSON files...",
    loadingMsg3: "Extracting network list data...",
    loadingMsg4: "Initializing Set algorithms...",
    loadingMsg5: "Calculating mutual followers...",
    loadingMsg6: "Identifying unfollowers and fans...",
    loadingMsg7: "Applying Anti-F12 data obfuscation...",
    loadingMsg8: "Preparing dashboard...",

    // MutualStats.tsx
    mutualStatsTitle: "Who Followed First?",
    mutualStatsDesc1: "Out of",
    mutualStatsDesc2: "mutual followers, let's see who pressed the follow button first.",
    youFirst: "You Followed First",
    youFirstDesc: "You waited for them to follow back",
    themFirst: "They Followed First",
    themFirstDesc: "They waited for you to follow back",
    sameDay: "Same Day",
    sameDayDesc: "Followed each other within 24 hours",

    // RelationshipPieChart.tsx
    relTitle: "Network Overview",
    relDesc: "A breakdown of your mutuals, loyal fans, and unfollowers.",
    relNotFollowBack: "Not Following Back",
    relMutual: "Mutuals",
    relFans: "Fans (You aren't following back)",

    // GrowthChart.tsx
    growthNoData: "No data available",
    growthTitle: "Follower Growth",
    growthDescMonthly: "Monthly breakdown of new followers in",
    growthDescYearly: "Year-over-year new followers summary",
    growthYear: "Year",
    growthPerMonth: "Monthly",
    growthPerYear: "Yearly",
    growthNewFollowers: "New Followers",
    growthNewFollowing: "New Following",

    // CohortChart.tsx
    cohortTitle: "Audience Retention",
    cohortDesc: "This chart groups your audience based on the year you first connected. It shows the current status (Mutuals, Fans, or Unfollowers) of accounts from each yearly cohort.",
    cohortMutuals: "Mutuals",
    cohortFans: "Fans",
    cohortUnfollowers: "Unfollowers",
    cohortOlder: "Older",
    cohortPage: "Page",
    cohortNewer: "Newer",

    // SeasonalityRadar.tsx
    seasonTitle: "Busiest Months",
    seasonDescAll: "Historically, which months bring in the most new followers?",
    seasonDescYear: "Which month had the most new followers in",
    seasonAllTime: "All Time",
    seasonTotalFollowers: "Followers Gained",
    
    // LoyalFollowers.tsx
    loyalTitle: "Most Loyal Followers",
    loyalDesc: "Accounts that have followed you the longest",

    // AccountHealthRatio.tsx
    healthTitle: "Account Ratio",
    healthDesc: "Followers vs Following Comparison",
    healthGood: "Popular / Healthy Account",
    healthBad: "Following More People",

    // PendingRequests.tsx
    pendingTitle: "Pending Requests",
    pendingDesc: "Your follow requests that haven't been accepted (Private accounts)",

    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

    // How It Works
    howItWorksTitle: "How to Use Followins",
    howItWorksDesc: "It takes just 3 easy steps to see who unfollowed you without ever logging in.",
    step1Title: "1. Open Instagram Settings",
    step1Desc: "Open the Instagram app, go to Profile > Settings (Hamburger menu) > Your activity.",
    step2Title: "2. Download Your Information",
    step2Desc: "Select 'Download your information'. Choose JSON format and 'All time' for the date range.",
    step3Title: "3. Wait for the Email",
    step3Desc: "Instagram will process your request. This takes anywhere from a few minutes to a couple of hours.",
    step4Title: "4. Upload the ZIP File",
    step4Desc: "Once you receive the email, download the ZIP file and drop it in the area above. That's it!",

    // Features
    featuresTitle: "Why Choose Followins?",
    featuresDesc: "Deep analytics without compromising your account's safety.",
    feat1Title: "Ban-Proof",
    feat1Desc: "Since you never log in, your account is 100% safe from being blocked or banned by Instagram.",
    feat2Title: "Interactive Charts",
    feat2Desc: "View follower trends, retention, and see who followed first through beautiful visualizations.",
    feat3Title: "Lightning Fast",
    feat3Desc: "Processing millions of lines of data is completed in seconds right on your device.",

    // Privacy
    privacyTitle: "Your Privacy is Our Top Priority",
    privacyDesc: "We never store, peek at, or send your data anywhere.",
    priv1Title: "100% Client-Side",
    priv1Desc: "Our code extracts your ZIP file using your browser's memory. Our servers receive absolutely nothing.",
    priv2Title: "No Passwords Required",
    priv2Desc: "Many third-party apps steal your credentials. We will never ask for them.",
    priv3Title: "Transparent Process",
    priv3Desc: "The extraction process we use happens right in front of you. Security isn't just a promise, it's a technical guarantee.",

    // FAQ
    faqTitle: "Frequently Asked Questions",
    faqDesc: "Got questions? We've probably answered them here.",
    q1: "Is this app free?",
    a1: "Yes! Visualizations and charts are 100% free. To view the complete list of names that unfollowed you, we limit it to 100 random names in the free version to prevent system abuse.",
    q2: "How long does Instagram take to send my ZIP file?",
    a2: "Usually, it only takes 5-15 minutes. However, if your account has tens of thousands of followers or a long history, it can take up to a few hours.",
    q3: "Why use JSON format instead of HTML?",
    a3: "Followins' system reads raw data (JSON) to perform set calculations with 100% accuracy and visualize it into charts. HTML format is intended only for human reading.",
    
    // History
    historyTitle: "Your Analysis History"
  }
};

export type Language = keyof typeof dictionaries;
export type DictionaryKey = keyof typeof dictionaries.id;
