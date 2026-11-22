import { useState } from 'react';
import { Cake, Mail, Camera, Gamepad2, Sparkles } from 'lucide-react';
import { WaxSealIntro } from './components/WaxSealIntro';
import { GramophonePlayer } from './components/GramophonePlayer';
import { QuestTracker, QuestProgress } from './components/QuestTracker';
import { MedievalArtifacts } from './components/MedievalArtifacts';
import { BirthdayCake } from './components/BirthdayCake';
import { LetterAndMemories } from './components/LetterAndMemories';
import { ScrapbookGallery } from './components/ScrapbookGallery';
import { VintageGames } from './components/VintageGames';
import { SecretVault } from './components/SecretVault';

export function App() {
  const [opened, setOpened] = useState(false);
  const [quest, setQuest] = useState<QuestProgress>({
    candlesBlown: false,
    secretDrawersRead: false,
    memoriesViewed: false,
    arcadeWon: false,
  });

  return (
    <div
      className="min-h-screen relative text-[#f5ecd7]"
      style={{
        background:
          'radial-gradient(ellipse at top, #4e1322 0%, #2b0912 45%, #19050a 100%)',
      }}
    >
      <div className="vintage-grain" />

      {!opened && <WaxSealIntro onOpen={() => setOpened(true)} />}

      {/* Compact Sticky Nav optimized for iPhone XR */}
      <header className="sticky top-0 z-30 border-b border-[#d4af37]/25 bg-[#1e070d]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-3 sm:px-4 py-2.5">
          <div className="flex items-center gap-2 shrink-0">
            <span className="font-script text-2xl text-[#ecd06f]">Jati</span>
            <span className="hidden sm:inline font-cinzel text-[10px] tracking-[0.2em] uppercase text-[#a97452]">
              &bull; Vintage Keepsake
            </span>
          </div>

          <nav className="flex items-center gap-3 sm:gap-5 font-cinzel text-[10px] sm:text-[11px] tracking-[0.12em] uppercase">
            <a
              href="#cake-section"
              className="flex items-center gap-1 text-[#eadbc0] hover:text-[#ecd06f] transition-colors py-1"
            >
              <Cake className="h-3.5 w-3.5 text-[#d4af37]" />
              <span>Cake</span>
            </a>
            <a
              href="#letter-section"
              className="flex items-center gap-1 text-[#eadbc0] hover:text-[#ecd06f] transition-colors py-1"
            >
              <Mail className="h-3.5 w-3.5 text-[#d4af37]" />
              <span>Letter</span>
            </a>
            <a
              href="#scrapbook-section"
              className="flex items-center gap-1 text-[#eadbc0] hover:text-[#ecd06f] transition-colors py-1"
            >
              <Camera className="h-3.5 w-3.5 text-[#d4af37]" />
              <span>Us</span>
            </a>
            <a
              href="#games-section"
              className="flex items-center gap-1 text-[#eadbc0] hover:text-[#ecd06f] transition-colors py-1"
            >
              <Gamepad2 className="h-3.5 w-3.5 text-[#d4af37]" />
              <span>Games</span>
            </a>
          </nav>
        </div>
      </header>

      <main className="relative z-10 pb-24 overflow-hidden">
        {/* Hero Collage Banner */}
        <section className="relative pt-10 pb-6 px-4 text-center overflow-hidden">
          <img
            src="/elements/ocean-top-left.png"
            alt=""
            className="pointer-events-none absolute top-0 left-0 w-32 sm:w-52 opacity-40"
          />
          <img
            src="/elements/red-bottom-right.png"
            alt=""
            className="pointer-events-none absolute bottom-0 right-0 w-28 sm:w-44 opacity-45"
          />
          <img
            src="/elements/sun-face.png"
            alt=""
            className="pointer-events-none hidden sm:block absolute top-8 left-12 w-20 opacity-65 animate-float"
          />
          <img
            src="/elements/moon-eclips.png"
            alt=""
            className="pointer-events-none hidden sm:block absolute top-10 right-12 w-16 opacity-65 animate-float"
          />
          <img
            src="/elements/flower.png"
            alt=""
            className="pointer-events-none absolute bottom-2 left-3 sm:left-16 w-14 sm:w-20 opacity-70"
          />
          <img
            src="/elements/butterfly.png"
            alt=""
            className="pointer-events-none absolute top-6 right-4 sm:right-24 w-12 sm:w-16 opacity-80 animate-float"
          />

          <div className="mx-auto max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/40 bg-[#2f0b14]/80 px-4 py-1.5 mb-5">
              <Sparkles className="h-3.5 w-3.5 text-[#d4af37]" />
              <span className="font-cinzel text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-[#ecd06f]">
                A Vintage Birthday Quest
              </span>
            </div>

            <h1 className="font-medieval text-4xl sm:text-6xl font-bold tracking-tight text-[#f5ecd7] drop-shadow-lg mb-3">
              Happy Birthday,{' '}
              <span className="text-[#ecd06f] italic font-normal">Jati</span>
            </h1>

            <p className="font-script text-3xl sm:text-4xl text-[#d4af37] mb-4">
              from your favorite big sis, Anagwer
            </p>

            <div className="gold-divider">
              <span className="font-cinzel text-[10px] sm:text-xs tracking-[0.22em] text-[#d4af37]">
                FOR SIR JATI &bull; KEEPSAKE CODEX
              </span>
            </div>

            <p className="text-base sm:text-xl italic text-[#eadbc0]/90 max-w-xl mx-auto">
              “Another year wiser, kinder, and still the coolest little cousin
              around. Open each chapter below to claim your birthday stamps.”
            </p>
          </div>
        </section>

        {/* 4-Stage Quest Progress Bar */}
        <QuestTracker progress={quest} />

        {/* Interactive Medieval Scrapbook Relics */}
        <MedievalArtifacts />

        {/* Quest 1: Mic-Blowable Birthday Cake */}
        <BirthdayCake
          onCandlesBlown={() =>
            setQuest((prev) => ({ ...prev, candlesBlown: true }))
          }
        />

        {/* Quest 2: Heartfelt Letter, Open When Drawers & Postcards */}
        <div id="letter-section">
          <LetterAndMemories
            onDrawersRead={(count) => {
              if (count >= 2) {
                setQuest((prev) => ({ ...prev, secretDrawersRead: true }));
              }
            }}
          />
        </div>

        {/* Quest 3: This Is Us Scrapbook & Cinema Reel */}
        <ScrapbookGallery
          onMemoryViewed={(count) => {
            if (count >= 3) {
              setQuest((prev) => ({ ...prev, memoriesViewed: true }));
            }
          }}
        />

        {/* Quest 4: Parlor Arcade */}
        <VintageGames
          onArcadeWin={() =>
            setQuest((prev) => ({ ...prev, arcadeWon: true }))
          }
        />

        {/* Grand Finale Secret Vault */}
        <SecretVault progress={quest} />

        <footer className="mt-8 border-t border-[#d4af37]/20 pt-8 pb-6 text-center px-4">
          <img
            src="/elements/swan.png"
            alt=""
            className="mx-auto w-14 opacity-75 mb-2"
          />
          <p className="font-script text-3xl text-[#ecd06f] mb-1">
            Always here for you, Jati
          </p>
          <p className="font-cinzel text-[11px] tracking-[0.22em] uppercase text-[#a97452]">
            Crafted with love by Anagwer
          </p>
        </footer>
      </main>

      <GramophonePlayer />
    </div>
  );
}

export default App;
