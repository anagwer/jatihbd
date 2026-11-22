import React from 'react';
import { CheckCircle2, Lock, Sparkles } from 'lucide-react';

export interface QuestProgress {
  candlesBlown: boolean;
  secretDrawersRead: boolean;
  memoriesViewed: boolean;
  arcadeWon: boolean;
}

interface QuestTrackerProps {
  progress: QuestProgress;
}

const QUEST_ITEMS = [
  {
    key: 'candlesBlown' as const,
    label: '1. Blow Candles',
    href: '#cake-section',
    stamp: '/elements/love-stamp.png',
  },
  {
    key: 'secretDrawersRead' as const,
    label: '2. Secret Notes',
    href: '#letter-section',
    stamp: '/elements/memories-stamp.png',
  },
  {
    key: 'memoriesViewed' as const,
    label: '3. This Is Us',
    href: '#scrapbook-section',
    stamp: '/elements/arrowstamp.png',
  },
  {
    key: 'arcadeWon' as const,
    label: '4. Parlor Game',
    href: '#games-section',
    stamp: '/elements/gold-stamp.png',
  },
];

export const QuestTracker: React.FC<QuestTrackerProps> = ({ progress }) => {
  const completedCount = Object.values(progress).filter(Boolean).length;
  const allDone = completedCount === 4;

  return (
    <div className="mx-auto max-w-4xl px-3 pt-4">
      <div className="cedar-panel rounded-md p-3 sm:p-4">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#ecd06f]" />
            <span className="font-cinzel text-xs tracking-[0.18em] uppercase text-[#ecd06f]">
              Jati&apos;s Birthday Quest: {completedCount}/4 Stamps
            </span>
          </div>
          {allDone ? (
            <a
              href="#vault-section"
              className="font-cinzel text-[11px] tracking-wider uppercase text-[#1e070d] bg-[#ecd06f] px-3 py-1 rounded-full font-bold animate-pulse"
            >
              Vault Unlocked &rarr;
            </a>
          ) : (
            <span className="text-xs italic text-[#eadbc0]/80 flex items-center gap-1">
              <Lock className="h-3 w-3 text-[#d4af37]" /> Complete all 4 to
              unlock the Secret Vault
            </span>
          )}
        </div>

        {/* 2x2 on iPhone XR, 4-col on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {QUEST_ITEMS.map((item) => {
            const done = progress[item.key];
            return (
              <a
                key={item.key}
                href={item.href}
                className={`flex items-center gap-2 rounded px-2.5 py-2 border transition-all ${
                  done
                    ? 'bg-[#722f37]/80 border-[#ecd06f]/80 text-[#f5ecd7]'
                    : 'bg-[#1e070d]/60 border-[#d4af37]/25 text-[#eadbc0]/75 hover:border-[#d4af37]/60'
                }`}
              >
                <img
                  src={item.stamp}
                  alt=""
                  className={`h-7 w-7 object-contain transition-all ${
                    done ? 'opacity-100 scale-105' : 'opacity-30 grayscale'
                  }`}
                />
                <div className="min-w-0 flex-1">
                  <div className="font-cinzel text-[10px] tracking-wider uppercase truncate">
                    {item.label}
                  </div>
                  <div className="text-[11px] italic flex items-center gap-1">
                    {done ? (
                      <>
                        <CheckCircle2 className="h-3 w-3 text-[#ecd06f]" />
                        <span className="text-[#ecd06f]">Stamped</span>
                      </>
                    ) : (
                      <span>Pending</span>
                    )}
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
