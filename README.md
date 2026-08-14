# Followins 🚀

Followins is a privacy-first Instagram followers tracker that works 100% on the client side. By utilizing official Instagram data exports (.zip files), Followins provides complete accuracy without requiring you to log in to your Instagram account or compromise your credentials.

## ✨ Features

- **🔒 100% Client-Side Privacy:** All data parsing (ZIP extraction and JSON processing) happens in your browser's memory. No Instagram data is ever sent to our servers.
- **📊 Advanced Analytics:** Visualizes your follower growth, mutuals, fans, and unfollowers using modern charts (Growth, Relationship, Cohort, etc).
- **👀 Live Demo Mode:** Experience the full dashboard with sample data before uploading your own ZIP file.
- **🏷️ Mini CRM System:** Add custom colored labels to accounts, perform bulk actions, search, and organize your follower lists.
- **🌓 Dark Mode Support:** Seamlessly switch between elegant light and dark themes.
- **🕰️ Local History:** Instantly view your latest insights without re-uploading, using secure LocalStorage.
- **🌍 Bilingual Support:** Available in both English and Indonesian, powered by React Context API.
- **💎 Premium Design:** Clean, modern interface with interactive landing page sections and dedicated Legal pages (Terms, Privacy), built with Tailwind CSS and Framer Motion.
- **🛡️ Secure Freemium Model:** Uses Client-Side encryption combined with an API mockup to secure premium data until a valid payment is made.
- **🕵️ Anti-F12 Protection:** Advanced DOM rendering ensures hidden premium data cannot be scraped via DevTools by injecting skeleton dummy data.
- **🛑 Advanced Rate Limiting:** Prevents spam and abuse by tracking device fingerprints securely to limit file uploads per month without needing user accounts.
- **🚨 Smart Alerts:** Automatically detect new unfollowers and identify "Hit & Run" accounts across different scans.
- **📈 Advanced Insights:** Discover your most loyal followers, pending follow requests, and monitor your account's health ratio.

## 🚀 Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🛠️ Technology Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Data Parsing:** JSZip
- **Charts:** Recharts
- **Icons:** Lucide React

## 📖 How It Works

1. Users request their data from Instagram via the official app (Settings > Your Activity > Download your information).
2. Users drop the provided `.zip` file into the Followins dashboard.
3. Followins uses `JSZip` to extract the relevant JSON files (`followers_1.json`, `following.json`) in the browser.
4. Data is analyzed to identify "Unfollowers", "Fans", and "Mutuals".
5. The processed insights are beautifully rendered on the screen.
