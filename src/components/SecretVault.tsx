import React from 'react';
import { Lock, Sparkles } from 'lucide-react';
import { QuestProgress } from './QuestTracker';

interface SecretVaultProps {
  progress: QuestProgress;
}

export const SecretVault: React.FC<SecretVaultProps> = ({ progress }) => {
  const unlocked = Object.values(progress).every(Boolean);

  return (
    <section id="vault-section" className="py-12 px-3 sm:px-4">
      <div className="mx-auto max-w-3xl rounded-lg cedar-panel p-6 sm:p-10 text-center relative overflow-hidden">
        {!unlocked ? (
          <div className="py-6 space-y-3">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#d4af37]/50 bg-[#1e070d]">
              <Lock className="h-6 w-6 text-[#d4af37]" />
            </div>
            <p className="font-cinzel text-xs tracking-[0.22em] uppercase text-[#d4af37]">
              The Secret Vault Is Locked
            </p>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#f5ecd7]">
              Collect All 4 Vintage Stamps Above
            </h3>
            <p className="text-base italic text-[#eadbc0]/80 max-w-md mx-auto">
              Blow out the candles, open 2 secret drawers, view 3 memories in
              the scrapbook, and win a parlor game to unlock Anagwer&apos;s
              final surprise!
            </p>
          </div>
        ) : (
          <div className="animate-fade-in parchment-card rounded-md p-6 sm:p-10 relative">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#722f37] px-4 py-1 text-[#ecd06f] font-cinzel text-[11px] tracking-[0.2em] uppercase mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              All 4 Quests Completed
            </div>

            <div className="flex items-center justify-center gap-4 mb-4">
              <img
                src="/elements/cat-swag.png"
                alt="Swag Cat"
                className="w-20 sm:w-24 animate-float"
              />
              <img
                src="/elements/cat-bring-ballon-flower.png"
                alt="Birthday Cat"
                className="w-24 sm:w-28 animate-float"
              />
            </div>

            <h3 className="font-display text-3xl sm:text-4xl font-bold text-[#2b1417] mb-3">
              The Golden Birthday Decree
            </h3>
            <p className="text-lg italic text-[#4e2c30] max-w-lg mx-auto mb-5 leading-relaxed">
              “Official Coupon: Redeemable anytime with Anagwer for one
              unlimited food hunt + late-night sugar rush of your choice. No
              expiration date. Happy Birthday, Jati—stay the kind, funny,
              ride-or-die little cousin you have always been!”
            </p>

            <div className="flex items-center justify-center gap-3">
              <img src="/elements/love-stamp.png" alt="" className="h-10 w-10 object-contain" />
              <img src="/elements/memories-stamp.png" alt="" className="h-10 w-10 object-contain" />
              <img src="/elements/arrowstamp.png" alt="" className="h-10 w-10 object-contain" />
              <img src="/elements/gold-stamp.png" alt="" className="h-10 w-10 object-contain" />
            </div>

            <p className="mt-4 font-script text-3xl text-[#722f37]">
              With endless love, Anagwer
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
