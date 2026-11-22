import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface Artifact {
  id: string;
  img: string;
  title: string;
  proclamation: string;
}

const ARTIFACTS: Artifact[] = [
  {
    id: 'potion',
    img: '/elements/potion.png',
    title: 'Sweet Tooth Elixir',
    proclamation:
      'Warning: One sip brings back the exact chaotic energy of our infamous late-night sugar rushes.',
  },
  {
    id: 'pigeon',
    img: '/elements/pigeon.png',
    title: 'Royal Messenger',
    proclamation:
      'No matter how busy life gets, one text is all it takes—your big sis is always on standby.',
  },
  {
    id: 'clock',
    img: '/elements/gold-clock.png',
    title: 'The 2 AM Hourglass',
    proclamation:
      'Certified proof that we can turn a five-minute catch-up into a three-hour deep talk.',
  },
  {
    id: 'books',
    img: '/elements/books.png',
    title: 'Co-Pilot’s Logbook',
    proclamation:
      'Awarded for unmatched patience—never once complaining about my random detours or food picks.',
  },
];

export const MedievalArtifacts: React.FC = () => {
  const [active, setActive] = useState<Artifact>(ARTIFACTS[0]);

  const handleSelect = (item: Artifact) => {
    soundEngine.playMatchChime();
    setActive(item);
  };

  return (
    <section className="py-6 px-3 sm:px-4">
      <div className="mx-auto max-w-4xl washi-tape rounded-sm p-5 sm:p-7 relative"
        style={{
          background:
            'linear-gradient(150deg, #efe2c4 0%, #dfc99f 65%, #cfb484 100%)',
          color: '#2b1417',
          border: '2px solid #7f4f34',
          boxShadow: '0 16px 40px rgba(0, 0, 0, 0.55)',
          transform: 'rotate(0.6deg)',
        }}
      >
        <img
          src="/elements/lily-1.png"
          alt=""
          className="pointer-events-none absolute -top-5 -left-4 w-14 sm:w-20 opacity-85 -rotate-12"
        />
        <img
          src="/elements/lily-2.png"
          alt=""
          className="pointer-events-none absolute -bottom-5 -right-3 w-14 sm:w-20 opacity-85 rotate-12"
        />

        <div className="text-center mb-4">
          <p className="font-mono-vintage text-[10px] tracking-[0.22em] uppercase text-[#722f37]">
            Interactive Relics &bull; Tap Each Item
          </p>
          <h3 className="font-medieval text-2xl sm:text-3xl font-bold text-[#2b1417]">
            The Scrapbook Desk
          </h3>
        </div>

        <div className="grid grid-cols-4 gap-2 sm:gap-4 mb-5">
          {ARTIFACTS.map((item) => {
            const isSelected = active.id === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item)}
                className={`flex flex-col items-center justify-center rounded-sm p-2 sm:p-3 border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#722f37] border-[#4e0d18] text-[#f5ecd7] scale-105 shadow-lg'
                    : 'bg-[#f5ecd7]/70 border-[#7f4f34]/40 text-[#2b1417] hover:bg-[#f5ecd7]'
                }`}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="h-12 w-12 sm:h-16 sm:w-16 object-contain mb-1"
                />
                <span className="font-cinzel text-[9px] sm:text-[10px] font-bold uppercase tracking-wider leading-tight text-center">
                  {item.title}
                </span>
              </button>
            );
          })}
        </div>

        <div className="rounded-sm bg-[#2b1417]/10 border border-dashed border-[#7f4f34] p-4 text-center">
          <div className="inline-flex items-center gap-1.5 font-cinzel text-xs font-bold uppercase tracking-widest text-[#722f37] mb-1">
            <Sparkles className="h-3.5 w-3.5" />
            {active.title}
          </div>
          <p className="font-display text-base sm:text-lg italic text-[#2b1417]">
            “{active.proclamation}”
          </p>
        </div>
      </div>
    </section>
  );
};
