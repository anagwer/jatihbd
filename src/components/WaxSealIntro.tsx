import React, { useState } from 'react';
import { soundEngine } from '../utils/soundEngine';

interface WaxSealIntroProps {
  onOpen: () => void;
}

export const WaxSealIntro: React.FC<WaxSealIntroProps> = ({ onOpen }) => {
  const [breaking, setBreaking] = useState(false);

  const handleBreakSeal = () => {
    if (breaking) return;
    setBreaking(true);
    soundEngine.playWaxSealBreak();
    soundEngine.startVintageMusic();
    setTimeout(() => {
      onOpen();
    }, 900);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-700 overflow-hidden"
      style={{
        background:
          'radial-gradient(circle at center, #381018 0%, #1c070c 70%, #100306 100%)',
        opacity: breaking ? 0 : 1,
        pointerEvents: breaking ? 'none' : 'auto',
      }}
    >
      {/* Full-bleed Medieval Scrapbook Desk Collages */}
      <img
        src="elements/ocean-top-left.png"
        alt=""
        className="pointer-events-none absolute top-0 left-0 w-44 sm:w-64 opacity-45"
      />
      <img
        src="elements/paper-top-left-butterfly.png"
        alt=""
        className="pointer-events-none absolute top-0 left-0 w-36 sm:w-52 opacity-85"
      />
      <img
        src="elements/paper-bottom-left.png"
        alt=""
        className="pointer-events-none absolute bottom-0 left-0 w-36 sm:w-52 opacity-70"
      />
      <img
        src="elements/paper-bottom-right-1.png"
        alt=""
        className="pointer-events-none absolute bottom-0 right-0 w-40 sm:w-56 opacity-80"
      />
      <img
        src="elements/red-bottom-right.png"
        alt=""
        className="pointer-events-none absolute top-0 right-0 w-32 sm:w-48 opacity-45 rotate-180"
      />

      {/* Celestial & Botanical Engravings */}
      <img
        src="elements/sun-face.png"
        alt=""
        className="pointer-events-none absolute top-8 right-6 sm:right-16 w-16 sm:w-24 opacity-75 animate-float"
      />
      <img
        src="elements/moon-eclips.png"
        alt=""
        className="pointer-events-none absolute bottom-20 left-5 sm:left-16 w-14 sm:w-20 opacity-70 animate-float"
      />
      <img
        src="elements/red-rose.png"
        alt=""
        className="pointer-events-none absolute bottom-6 right-5 sm:right-20 w-20 sm:w-28 opacity-90 rotate-6"
      />
      <img
        src="elements/gold-butterfly.png"
        alt=""
        className="pointer-events-none absolute top-24 left-6 sm:left-24 w-12 sm:w-16 opacity-85 -rotate-12"
      />

      {/* Torn-Paper Medieval Journal Cover */}
      <div
        className="relative z-10 w-full max-w-md washi-tape p-6 sm:p-9 text-center transition-transform duration-700"
        style={{
          background:
            'linear-gradient(155deg, #efe2c4 0%, #dfc99f 55%, #cbb082 100%)',
          color: '#2b1417',
          border: '2px solid #7f4f34',
          boxShadow:
            '0 24px 60px rgba(0, 0, 0, 0.75), inset 0 0 45px rgba(78, 46, 29, 0.28)',
          transform: breaking
            ? 'scale(1.06) translateY(-16px) rotate(0deg)'
            : 'rotate(-1deg)',
        }}
      >
        {/* Pinned Corner Stamps */}
        <img
          src="elements/memories-stamp.png"
          alt=""
          className="pointer-events-none absolute -top-4 -right-3 w-14 sm:w-16 opacity-85 rotate-12 drop-shadow"
        />
        <img
          src="elements/love-stamp.png"
          alt=""
          className="pointer-events-none absolute -bottom-3 -left-3 w-14 sm:w-16 opacity-80 -rotate-12 drop-shadow"
        />

        <img
          src="elements/envelope-letter.png"
          alt="Medieval Dispatch"
          className="mx-auto mb-2 w-24 sm:w-28 drop-shadow-md -rotate-3"
        />

        <p className="font-mono-vintage text-[11px] tracking-[0.22em] uppercase text-[#581525] mb-1">
          Codex &bull; Chapter of Jati
        </p>

        <h1 className="font-medieval text-3xl sm:text-4xl font-bold text-[#2b1417] mb-1">
          For Jati
        </h1>
        <p className="font-script text-3xl text-[#722f37] mb-3">
          scribed by Anagwer
        </p>

        <div className="gold-divider">
          <span className="text-[10px] font-cinzel tracking-widest text-[#4e2e1d]">
            MEDIEVAL SCRAPBOOK
          </span>
        </div>

        <p className="font-display text-base sm:text-lg italic text-[#3c1e22] max-w-xs mx-auto mb-6">
          “Break the crimson wax seal to unroll this keepsake journal, gather
          all 4 stamps, and unlock the secret vault.”
        </p>

        {/* Interactive Wax Seal */}
        <button
          onClick={handleBreakSeal}
          aria-label="Break wax seal to open birthday journal"
          className="group relative mx-auto flex h-24 w-24 items-center justify-center rounded-full cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none"
          style={{
            background:
              'radial-gradient(circle at 32% 30%, #9b2638 0%, #6d1523 55%, #3d0912 100%)',
            boxShadow:
              '0 10px 25px rgba(43, 10, 18, 0.7), inset 0 2px 6px rgba(255, 200, 180, 0.25), inset 0 -4px 10px rgba(0, 0, 0, 0.5)',
            border: '3px solid #4e0d18',
          }}
        >
          <img
            src="elements/gold-stamp.png"
            alt="Seal"
            className="h-16 w-16 object-contain drop-shadow group-hover:rotate-12 transition-transform duration-300"
          />
        </button>

        <p className="mt-4 font-mono-vintage text-[11px] tracking-[0.18em] uppercase text-[#581525] animate-pulse">
          [ Tap Wax Seal to Open ]
        </p>
      </div>
    </div>
  );
};
