import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface DrawerNote {
  id: string;
  label: string;
  tag: string;
  message: string;
}

const APOTHECARY_DRAWERS: DrawerNote[] = [
  {
    id: 'heavy',
    label: 'Open when Monday hits too hard',
    tag: 'Sealed Note I',
    message:
      'Take a breath, Jati. You do not have to figure everything out in one day. Go grab your favorite drink, put on a good playlist, and remember you are doing better than you think.',
  },
  {
    id: 'sugar',
    label: 'Open when you cannot sleep at 2 AM',
    tag: 'Sealed Note II',
    message:
      'If your brain will not quiet down tonight, text me. Even if I am half-asleep, I would rather hear what is on your mind than let you overthink alone.',
  },
  {
    id: 'food',
    label: 'Open when you forget how cool you are',
    tag: 'Sealed Note III',
    message:
      'Gentle reminder: you are genuinely kind, easy to be around, and the kind of person people feel safe with. Never shrink yourself for anyone.',
  },
  {
    id: 'win',
    label: 'Open when you hit a new milestone',
    tag: 'Sealed Note IV',
    message:
      'I always knew you had it in you! Whether it is a giant leap or a quiet personal win, I am cheering the loudest for you. Proud of you always, little bro.',
  },
];

interface PostcardItem {
  id: number;
  title: string;
  subtitle: string;
  artwork: string;
  stamp: string;
  backNote: string;
}

const POSTCARDS: PostcardItem[] = [
  {
    id: 1,
    title: 'New Horizons',
    subtitle: 'Blessing I • The Compass',
    artwork: 'elements/london.png',
    stamp: 'elements/arrowstamp.png',
    backNote:
      'May this year take you to places that excite you, surrounded by people who appreciate your warmth and humor.',
  },
  {
    id: 2,
    title: 'Steady Peace',
    subtitle: 'Blessing II • The Hourglass',
    artwork: 'elements/gold-clock.png',
    stamp: 'elements/memories-stamp.png',
    backNote:
      'I wish you calm mornings, unhurried evenings, and the kind of peace that stays even when life gets busy.',
  },
  {
    id: 3,
    title: 'Unfiltered Joy',
    subtitle: 'Blessing III • The Elixir',
    artwork: 'elements/potion.png',
    stamp: 'elements/love-stamp.png',
    backNote:
      'Here is to spontaneous laughs, good coffee, and small everyday moments that make you glad to be alive.',
  },
  {
    id: 4,
    title: 'Calla Lily Promise',
    subtitle: 'Blessing IV • Calla Lily',
    artwork: 'elements/lily.png',
    stamp: 'elements/gold-stamp.png',
    backNote:
      'Just like your favorite Calla Lily, keep standing tall and graceful—and know your big sis is always cheering for you.',
  },
];

interface LetterAndMemoriesProps {
  onDrawersRead?: (count: number) => void;
}

export const LetterAndMemories: React.FC<LetterAndMemoriesProps> = ({
  onDrawersRead,
}) => {
  const [scrollOpen, setScrollOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState<string | null>(
    APOTHECARY_DRAWERS[0].id
  );
  const [, setReadDrawers] = useState<Record<string, boolean>>({
    [APOTHECARY_DRAWERS[0].id]: true,
  });
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const toggleScroll = () => {
    soundEngine.playWaxSealBreak();
    setScrollOpen((prev) => !prev);
  };

  const toggleDrawer = (id: string) => {
    soundEngine.playCardFlip();
    setOpenDrawer((prev) => (prev === id ? null : id));
    setReadDrawers((prev) => {
      if (prev[id]) return prev;
      const next = { ...prev, [id]: true };
      onDrawersRead?.(Object.keys(next).length);
      return next;
    });
  };

  const togglePostcard = (id: number) => {
    soundEngine.playCardFlip();
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="py-12 px-4 space-y-16">
      {/* Knight's Unrolling Medieval Scroll */}
      <div className="mx-auto max-w-3xl relative">
        {/* Top Cedarwood Scroll Rod */}
        <div className="relative z-20 flex items-center justify-between px-2">
          <div className="h-6 w-4 rounded-l-full bg-gradient-to-b from-[#ecd06f] to-[#7f4f34] border border-[#4e2e1d]" />
          <div className="h-4 flex-1 bg-gradient-to-b from-[#9b6644] via-[#7f4f34] to-[#4e2e1d] border-y border-[#d4af37]/50 shadow-md" />
          <div className="h-6 w-4 rounded-r-full bg-gradient-to-b from-[#ecd06f] to-[#7f4f34] border border-[#4e2e1d]" />
        </div>

        {!scrollOpen ? (
          /* Rolled-up State */
          <button
            onClick={toggleScroll}
            className="w-full cursor-pointer text-center py-7 px-6 relative transition-transform hover:scale-[1.01] active:scale-[0.99] focus:outline-none"
            style={{
              background:
                'linear-gradient(180deg, #d9c49e 0%, #f5ecd7 45%, #cbb082 100%)',
              color: '#2b1417',
              borderLeft: '2px solid #7f4f34',
              borderRight: '2px solid #7f4f34',
              boxShadow: 'inset 0 8px 20px rgba(78, 46, 29, 0.28)',
            }}
          >
            {/* Crimson Ribbon Band */}
            <div className="mx-auto mb-3 flex items-center justify-center">
              <div className="h-1.5 w-32 bg-[#722f37]" />
              <div className="mx-2 flex h-14 w-14 items-center justify-center rounded-full bg-[#722f37] border-2 border-[#4e0d18] shadow-lg">
                <img
                  src="elements/gold-stamp.png"
                  alt="Knight Seal"
                  className="h-9 w-9 object-contain"
                />
              </div>
              <div className="h-1.5 w-32 bg-[#722f37]" />
            </div>

            <p className="font-medieval text-xl sm:text-2xl font-bold text-[#2b1417]">
              Royal Knight&apos;s Scroll for Sir Jati
            </p>
            <p className="font-mono-vintage text-xs uppercase tracking-[0.2em] text-[#722f37] mt-1 animate-pulse">
              [ Tap the Crimson Seal to Unroll the Scroll ]
            </p>
          </button>
        ) : (
          /* Unrolled Parchment Letter */
          <div
            className="animate-fade-in relative p-6 sm:p-12 text-[#2b1417]"
            style={{
              background:
                'linear-gradient(155deg, #f5ecd7 0%, #eadbc0 58%, #d9c49e 100%)',
              borderLeft: '2px solid #7f4f34',
              borderRight: '2px solid #7f4f34',
              boxShadow:
                '0 20px 50px rgba(0, 0, 0, 0.55), inset 0 0 40px rgba(127, 79, 52, 0.18)',
            }}
          >
            <img
              src="elements/pigeon.png"
              alt=""
              className="pointer-events-none absolute -top-4 right-3 sm:right-6 w-16 sm:w-22 opacity-90 drop-shadow-md"
            />
            <img
              src="elements/lily.png"
              alt="Calla Lily"
              className="pointer-events-none hidden sm:block absolute top-4 left-3 w-16 opacity-80 -rotate-12"
            />
            <img
              src="elements/love-gold.png"
              alt=""
              className="pointer-events-none absolute bottom-4 right-6 w-14 opacity-70"
            />

            <div className="flex items-center justify-between border-b border-[#a68529]/40 pb-3 mb-5">
              <span className="font-mono-vintage text-xs uppercase tracking-widest text-[#7f4f34]">
                ROYAL DECREE &bull; CHAPTER OF JATI
              </span>
              <button
                onClick={toggleScroll}
                className="font-mono-vintage text-[11px] uppercase tracking-wider text-[#722f37] underline cursor-pointer"
              >
                Roll Up
              </button>
            </div>

            <h2 className="font-medieval text-2xl sm:text-3xl font-bold text-[#2b1417] mb-5">
              To Sir Jati, Steadfast Companion,
            </h2>

            <div className="space-y-4 text-lg sm:text-xl leading-relaxed text-[#2b1417]">
              <p>
                Hear ye, hear ye—happy birthday to my favorite little cousin,
                and honestly, one of my all-time favorite humans to walk
                through life with.
              </p>
              <p>
                As your big sister in this grand adventure, I pledge to always
                stand in your corner through every season: in moments of loud
                triumph and laughter, and on the quiet, heavy days when shadows
                feel long. Whenever you need me, you never ride alone.
              </p>
              <p>
                Thank you for being the most loyal, easygoing partner-in-crime—for
                always saying yes to wherever I wander, whatever random feast we
                hunt down, and for never running out of stories to share with
                me. From our deepest midnight talks to our chaotic sugar rushes,
                every memory with you is pure treasure.
              </p>
              <p>
                May this new year bring you courage, steady peace, good food,
                and every wish your heart quietly holds.
              </p>
            </div>

            <div className="mt-8 pt-5 border-t border-[#a68529]/40 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <p className="text-base italic text-[#4e2c30]">
                  Ever your shield &amp; big sis,
                </p>
                <p className="font-script text-4xl text-[#722f37] mt-1">
                  Anagwer
                </p>
              </div>
              <div className="font-mono-vintage text-xs uppercase tracking-widest text-[#7f4f34]">
                Sealed in Crimson &amp; Gold
              </div>
            </div>
          </div>
        )}

        {/* Bottom Cedarwood Scroll Rod */}
        <div className="relative z-20 flex items-center justify-between px-2">
          <div className="h-6 w-4 rounded-l-full bg-gradient-to-b from-[#ecd06f] to-[#7f4f34] border border-[#4e2e1d]" />
          <div className="h-4 flex-1 bg-gradient-to-b from-[#9b6644] via-[#7f4f34] to-[#4e2e1d] border-y border-[#d4af37]/50 shadow-md" />
          <div className="h-6 w-4 rounded-r-full bg-gradient-to-b from-[#ecd06f] to-[#7f4f34] border border-[#4e2e1d]" />
        </div>
      </div>

      {/* Interactive "Open When..." Wax-Sealed Parchment Envelopes */}
      <div className="mx-auto max-w-4xl relative">
        <img
          src="elements/books.png"
          alt=""
          className="pointer-events-none hidden sm:block absolute -top-8 -left-6 w-20 opacity-80 -rotate-6"
        />
        <img
          src="elements/potion.png"
          alt=""
          className="pointer-events-none hidden sm:block absolute -top-6 -right-4 w-16 opacity-85 rotate-12"
        />
        <div className="text-center mb-8">
          <p className="font-mono-vintage text-xs tracking-[0.22em] uppercase text-[#d4af37] mb-2">
            The Cedar Dispatch &bull; Open At Least 2
          </p>
          <h3 className="font-medieval text-3xl font-bold text-[#f5ecd7]">
            “Open When...” Sealed Letters
          </h3>
          <p className="text-base italic text-[#eadbc0]/80 mt-1">
            Tap any wax-sealed envelope to break the seal and read Anagwer&apos;s
            note.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {APOTHECARY_DRAWERS.map((drawer, idx) => {
            const isOpen = openDrawer === drawer.id;
            return (
              <div
                key={drawer.id}
                className="relative rounded-sm transition-all duration-300"
                style={{
                  transform: `rotate(${idx % 2 === 0 ? '-0.6deg' : '0.6deg'})`,
                }}
              >
                <button
                  onClick={() => toggleDrawer(drawer.id)}
                  className="w-full p-5 flex items-center justify-between text-left cursor-pointer transition-all rounded-sm"
                  style={{
                    background: isOpen
                      ? 'linear-gradient(155deg, #581525 0%, #3b0d18 100%)'
                      : 'linear-gradient(155deg, #4e2e1d 0%, #321c10 100%)',
                    border: '1px solid rgba(212, 175, 55, 0.5)',
                    boxShadow: '0 10px 24px rgba(0,0,0,0.45)',
                  }}
                >
                  <div className="pr-3">
                    <div className="font-mono-vintage text-[10px] uppercase tracking-widest text-[#ecd06f]">
                      {drawer.tag}
                    </div>
                    <div className="font-display text-lg font-semibold text-[#f5ecd7]">
                      {drawer.label}
                    </div>
                  </div>
                  <div className="shrink-0 flex h-11 w-11 items-center justify-center rounded-full bg-[#722f37] border-2 border-[#4e0d18] shadow-md">
                    <img
                      src={isOpen ? 'elements/love-stamp.png' : 'elements/gold-stamp.png'}
                      alt=""
                      className="h-7 w-7 object-contain"
                    />
                  </div>
                </button>

                {isOpen && (
                  <div
                    className="animate-fade-in mx-2 -mt-1 p-5 rounded-b-sm border-x border-b border-[#7f4f34]"
                    style={{
                      background:
                        'linear-gradient(155deg, #f5ecd7 0%, #eadbc0 100%)',
                      color: '#2b1417',
                      boxShadow: '0 12px 28px rgba(0,0,0,0.4)',
                    }}
                  >
                    <p className="font-display text-base italic leading-relaxed">
                      “{drawer.message}”
                    </p>
                    <p className="mt-2 text-right font-script text-2xl text-[#722f37]">
                      — Anagwer
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Flippable Illuminated Scrapbook Cards */}
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-8">
          <p className="font-mono-vintage text-xs tracking-[0.22em] uppercase text-[#d4af37] mb-2">
            Illuminated Keepsakes
          </p>
          <h3 className="font-medieval text-3xl font-bold text-[#f5ecd7]">
            Tap Any Card to Reveal Its Story
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {POSTCARDS.map((card, idx) => {
            const flipped = !!flippedCards[card.id];
            return (
              <div
                key={card.id}
                onClick={() => togglePostcard(card.id)}
                className="perspective-1000 h-72 cursor-pointer"
                style={{
                  transform: `rotate(${idx % 2 === 0 ? '-1deg' : '1deg'})`,
                }}
              >
                <div
                  className={`relative h-full w-full transition-transform duration-700 preserve-3d ${
                    flipped ? 'rotate-y-180' : ''
                  }`}
                >
                  {/* Front: Illuminated Scrapbook Artwork Card */}
                  <div className="absolute inset-0 backface-hidden rounded-sm burgundy-panel p-5 flex flex-col items-center justify-between text-center washi-tape">
                    <p className="font-mono-vintage text-[10px] uppercase tracking-widest text-[#d4af37]">
                      {card.subtitle}
                    </p>
                    <img
                      src={card.artwork}
                      alt={card.title}
                      className="h-24 w-24 object-contain drop-shadow-lg animate-float"
                    />
                    <div>
                      <h4 className="font-medieval text-lg font-bold text-[#f5ecd7] leading-snug">
                        {card.title}
                      </h4>
                      <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-mono-vintage tracking-wider uppercase text-[#ecd06f]/85">
                        <Sparkles className="h-3 w-3" /> Tap to Flip
                      </span>
                    </div>
                  </div>

                  {/* Back: Stamped Vintage Postcard Note */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-sm parchment-card p-5 flex flex-col justify-between text-center">
                    <div className="flex items-center justify-between border-b border-[#a68529]/40 pb-2">
                      <span className="font-mono-vintage text-[10px] uppercase tracking-widest text-[#722f37]">
                        {card.subtitle}
                      </span>
                      <img
                        src={card.stamp}
                        alt=""
                        className="h-7 w-7 object-contain opacity-85"
                      />
                    </div>
                    <p className="font-display text-base italic text-[#2b1417] leading-snug">
                      “{card.backNote}”
                    </p>
                    <div className="font-script text-2xl text-[#722f37]">
                      — Anagwer
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
