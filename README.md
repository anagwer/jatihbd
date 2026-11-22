# For Jati — Vintage Birthday Keepsake

An interactive, mobile-first (optimized for iPhone XR & desktop) vintage burgundy, cedar, cream, and gold birthday keepsake website from **Anagwer** to **Jati**.

## Features

- **Theatre Curtain & Wax-Sealed Envelope Intro**: Break the golden seal to part the curtains and start the Web Audio vintage music box.
- **4-Stage Birthday Quest**:
  1. **Blow Out the Candles**: Tiered vintage cake with **live microphone blow detection** (plus a *Hold to Blow* fallback).
  2. **The Secret Letter & Cedar Apothecary**: Heartfelt English birthday letter, interactive *"Open When..."* drawers, and flippable 3D keepsake postcards.
  3. **This Is Us — Scrapbook & Cinema Reel**: 8 personal photos framed in vintage borders + 6 `.mp4` video reels (`playsInline` ready for iOS Safari).
  4. **The Parlor Arcade**:
     - *The Parlor Memory Deck* (custom vintage keepsake card-matching game)
     - *Sugar Rush Catcher* (touch-friendly 30-second arcade game)
  5. **The Secret Vault**: Unlocks Anagwer's final *Golden Birthday Decree* once all 4 stamps are collected.
- **Parlor Gramophone**: Floating vinyl player synthesizing a warm music-box *Birthday Waltz* with toggleable vinyl crackle.

---

## Media Format Notes

All media in `public/media/us/` has been converted to web- and iOS-Safari-compatible formats:
- `.HEIC` images converted to `.jpg`
- `.MOV` videos converted to H.264 `.mp4`

---

## Local Installation & Setup

### 1. Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher (includes `npm`)
- [Git](https://git-scm.com/)

### 2. Clone the Repository
```bash
git clone <YOUR_GITHUB_REPO_URL>
cd jati-birthday
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run the Development Server
```bash
npm run dev
```
Open the URL printed in your terminal (typically `http://localhost:5173`).

### 5. Build for Production
```bash
npm run build
```
The production-ready static files will be generated in the `dist/` folder. You can preview the production build locally with:
```bash
npm run preview
```

---

## Deployment Guide

> **Important for Microphone Feature:** Modern browsers (especially iOS Safari on iPhone XR) only allow microphone access (`getUserMedia`) over **HTTPS** (or `localhost`). All three hosting options below provide free HTTPS automatically.

### Option A: Deploy to Vercel (Recommended)
1. Push your project to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Jati vintage birthday website"
   git branch -M main
   git remote add origin <YOUR_GITHUB_REPO_URL>
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
3. Click **Add New → Project** and import your repository.
4. Keep the default Vite settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**.

### Option B: Deploy to Netlify
1. Push your code to GitHub (same steps as above).
2. Go to [netlify.com](https://www.netlify.com/) → **Add new site → Import an existing project**.
3. Set:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. Click **Deploy site**.

### Option C: Deploy via GitHub Pages
1. In `vite.config.ts`, set `base: '/<YOUR_REPO_NAME>/'`.
2. Build and push `dist/` to `gh-pages` (e.g., using `npx gh-pages -d dist`), or configure a GitHub Actions workflow to deploy `dist/` on push to `main`.
