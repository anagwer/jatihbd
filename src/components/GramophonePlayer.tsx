import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export const GramophonePlayer: React.FC = () => {
  const [playing, setPlaying] = useState(soundEngine.isMusicPlaying());
  const [crackle, setCrackle] = useState(soundEngine.isCrackleEnabled());

  useEffect(() => {
    const id = window.setInterval(() => {
      setPlaying(soundEngine.isMusicPlaying());
    }, 500);
    return () => clearInterval(id);
  }, []);

  const handleTogglePlay = () => {
    const next = soundEngine.toggleVintageMusic();
    setPlaying(next);
  };

  const handleToggleCrackle = () => {
    const next = !crackle;
    setCrackle(next);
    soundEngine.setCrackle(next);
  };

  return (
    <div className="fixed bottom-3 right-3 z-40 flex items-center gap-2 rounded-full cedar-panel px-3 py-1.5 shadow-2xl">
      <button
        onClick={handleTogglePlay}
        className="flex items-center gap-2 cursor-pointer text-[#f5ecd7] hover:text-[#ecd06f] transition-colors min-h-[36px]"
        title={playing ? 'Pause Vintage Music Box' : 'Play Vintage Music Box'}
      >
        <div
          className={`relative flex h-9 w-9 items-center justify-center rounded-full overflow-hidden border border-[#d4af37]/70 bg-[#1e070d] ${
            playing ? 'animate-spin-vinyl' : ''
          }`}
        >
          <img
            src="elements/plate-record.png"
            alt="Vinyl Record"
            className="h-9 w-9 object-cover"
          />
        </div>
        <div className="text-left hidden sm:block">
          <div className="font-cinzel text-[10px] tracking-[0.16em] uppercase text-[#d4af37]">
            Gramophone
          </div>
          <div className="text-xs italic text-[#eadbc0]">
            {playing ? 'Birthday Waltz' : 'Paused'}
          </div>
        </div>
        {playing ? (
          <Volume2 className="h-4 w-4 text-[#ecd06f]" />
        ) : (
          <VolumeX className="h-4 w-4 text-[#a97452]" />
        )}
      </button>

      <div className="h-5 w-px bg-[#d4af37]/25" />

      <button
        onClick={handleToggleCrackle}
        className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-cinzel tracking-wider uppercase cursor-pointer transition-colors ${
          crackle
            ? 'bg-[#722f37] text-[#ecd06f] border border-[#d4af37]/50'
            : 'bg-transparent text-[#a97452] border border-[#a97452]/30'
        }`}
        title="Toggle Vinyl Crackle"
      >
        <Sparkles className="h-3 w-3" />
        <span>Vinyl</span>
      </button>
    </div>
  );
};
