import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Mic, MicOff, Wind, Flame, RotateCcw, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

const TOTAL_CANDLES = 5;

interface ConfettiPiece {
  id: number;
  left: number;
  delay: number;
  duration: number;
  color: string;
  size: number;
}

interface BirthdayCakeProps {
  onCandlesBlown?: () => void;
}

export const BirthdayCake: React.FC<BirthdayCakeProps> = ({
  onCandlesBlown,
}) => {
  const [litCandles, setLitCandles] = useState<boolean[]>(
    Array(TOTAL_CANDLES).fill(true)
  );
  const [micActive, setMicActive] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);
  const [blowStrength, setBlowStrength] = useState(0); // 0 to 100
  const [isBlowing, setIsBlowing] = useState(false);
  const [celebrated, setCelebrated] = useState(false);
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastExtinguishRef = useRef<number>(0);
  const holdTimerRef = useRef<number | null>(null);

  const allOut = litCandles.every((c) => !c);

  const triggerCelebration = useCallback(() => {
    if (celebrated) return;
    setCelebrated(true);
    onCandlesBlown?.();
    soundEngine.playCelebrationFanfare();

    const colors = ['#d4af37', '#ecd06f', '#722f37', '#f5ecd7', '#a97452'];
    const pieces: ConfettiPiece[] = Array.from({ length: 48 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.8,
      duration: 2.5 + Math.random() * 2,
      color: colors[i % colors.length],
      size: 6 + Math.floor(Math.random() * 7),
    }));
    setConfetti(pieces);
  }, [celebrated, onCandlesBlown]);

  const extinguishNextCandle = useCallback(() => {
    const now = Date.now();
    if (now - lastExtinguishRef.current < 280) return;
    lastExtinguishRef.current = now;

    setLitCandles((prev) => {
      const litIndices = prev
        .map((lit, idx) => (lit ? idx : -1))
        .filter((idx) => idx !== -1);
      if (litIndices.length === 0) return prev;

      const randomIdx =
        litIndices[Math.floor(Math.random() * litIndices.length)];
      const next = [...prev];
      next[randomIdx] = false;
      soundEngine.playCandleBlow();

      if (next.every((c) => !c)) {
        setTimeout(() => triggerCelebration(), 250);
      }
      return next;
    });
  }, [triggerCelebration]);

  const stopMic = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (audioCtxRef.current) {
      void audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
    setMicActive(false);
    setBlowStrength(0);
    setIsBlowing(false);
  }, []);

  const startMic = async () => {
    setMicError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        },
      });
      streamRef.current = stream;
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      setMicActive(true);

      const monitor = () => {
        analyser.getByteFrequencyData(dataArray);
        // Blowing into a mic creates strong low-to-mid broadband air turbulence
        let sum = 0;
        const bins = Math.min(36, dataArray.length);
        for (let i = 0; i < bins; i++) {
          sum += dataArray[i];
        }
        const avg = sum / bins;
        const normalized = Math.min(100, Math.round((avg / 110) * 100));
        setBlowStrength(normalized);

        if (normalized > 36) {
          setIsBlowing(true);
          extinguishNextCandle();
        } else {
          setIsBlowing(false);
        }
        rafRef.current = requestAnimationFrame(monitor);
      };

      rafRef.current = requestAnimationFrame(monitor);
    } catch {
      setMicError(
        'Microphone access was declined or unavailable. You can still use the "Hold to Blow" button below!'
      );
      setMicActive(false);
    }
  };

  useEffect(() => {
    return () => {
      stopMic();
      if (holdTimerRef.current) clearInterval(holdTimerRef.current);
    };
  }, [stopMic]);

  // Stop mic automatically once all candles are blown out
  useEffect(() => {
    if (allOut && micActive) {
      stopMic();
    }
  }, [allOut, micActive, stopMic]);

  const handleStartHoldBlow = () => {
    if (allOut) return;
    setIsBlowing(true);
    setBlowStrength(85);
    extinguishNextCandle();
    holdTimerRef.current = window.setInterval(() => {
      extinguishNextCandle();
    }, 320);
  };

  const handleStopHoldBlow = () => {
    setIsBlowing(false);
    setBlowStrength(0);
    if (holdTimerRef.current) {
      clearInterval(holdTimerRef.current);
      holdTimerRef.current = null;
    }
  };

  const handleRelight = () => {
    setLitCandles(Array(TOTAL_CANDLES).fill(true));
    setCelebrated(false);
    setConfetti([]);
    setBlowStrength(0);
  };

  const remainingCount = litCandles.filter(Boolean).length;

  return (
    <section id="cake-section" className="relative py-16 px-4">
      {/* Golden Confetti Shower */}
      {confetti.length > 0 && (
        <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
          {confetti.map((piece) => (
            <span
              key={piece.id}
              style={{
                position: 'absolute',
                top: '-20px',
                left: `${piece.left}%`,
                width: `${piece.size}px`,
                height: `${piece.size * 1.4}px`,
                backgroundColor: piece.color,
                borderRadius: '2px',
                animation: `confettiFall ${piece.duration}s ease-in ${piece.delay}s forwards`,
              }}
            />
          ))}
          <style>{`
            @keyframes confettiFall {
              0% { transform: translateY(0) rotate(0deg); opacity: 1; }
              100% { transform: translateY(105vh) rotate(540deg); opacity: 0; }
            }
          `}</style>
        </div>
      )}

      <div className="mx-auto max-w-3xl rounded-lg burgundy-panel p-6 sm:p-10 text-center relative overflow-hidden">
        {/* Scrapbook Collage Accents */}
        <img
          src="elements/candle.png"
          alt=""
          className="pointer-events-none hidden sm:block absolute top-4 left-4 w-14 opacity-80 -rotate-6"
        />
        <img
          src="elements/gold-clock.png"
          alt=""
          className="pointer-events-none hidden sm:block absolute top-5 right-5 w-16 opacity-75 rotate-12"
        />
        <img
          src="elements/spiral-star.png"
          alt=""
          className="pointer-events-none absolute bottom-3 left-3 w-12 sm:w-16 opacity-60 animate-float"
        />
        <img
          src="elements/red-plates.png"
          alt=""
          className="pointer-events-none hidden sm:block absolute bottom-3 right-4 w-16 opacity-70"
        />
        <p className="font-cinzel text-xs tracking-[0.25em] uppercase text-[#d4af37] mb-2">
          Make A Wish, Jati
        </p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#f5ecd7] mb-2">
          The Midnight Burgundy Cake
        </h2>
        <p className="text-lg italic text-[#eadbc0]/85 max-w-xl mx-auto mb-8">
          Turn on your microphone and blow gently toward your screen to
          extinguish all five beeswax candles—or hold the breeze button below.
        </p>

        {/* Vintage Medieval Calla Lily Cake Illustration */}
        <div className="relative mx-auto mt-10 mb-8 flex flex-col items-center select-none">
          {/* Calla Lily Bouquets flanking the cake */}
          <img
            src="elements/lily.png"
            alt="Calla Lily"
            className="pointer-events-none absolute -left-2 sm:left-6 bottom-6 w-20 sm:w-28 z-20 -rotate-12 drop-shadow-xl"
          />
          <img
            src="elements/lily-1.png"
            alt="Calla Lily"
            className="pointer-events-none absolute -right-2 sm:right-6 bottom-6 w-20 sm:w-28 z-20 rotate-12 drop-shadow-xl"
          />
          <img
            src="elements/lily-2.png"
            alt="Calla Lily"
            className="pointer-events-none hidden sm:block absolute left-16 top-14 w-16 z-20 -rotate-6 opacity-90 drop-shadow-lg"
          />

          {/* Candles Row */}
          <div className="relative z-20 flex items-end justify-center gap-4 sm:gap-6 mb-[-6px]">
            {litCandles.map((isLit, idx) => (
              <div key={idx} className="relative flex flex-col items-center">
                {/* Flame or Smoke */}
                <div className="relative h-10 w-6">
                  {isLit ? (
                    <div
                      className="absolute bottom-0 left-1/2 h-8 w-4 rounded-full"
                      style={{
                        background:
                          'radial-gradient(ellipse at bottom, #fff7d6 0%, #f7b733 45%, #d9480f 90%, transparent 100%)',
                        boxShadow:
                          '0 0 18px 4px rgba(247, 183, 51, 0.55), 0 0 36px 8px rgba(212, 175, 55, 0.25)',
                        animation: isBlowing
                          ? 'blowFlicker 0.14s infinite'
                          : `flicker ${1.2 + idx * 0.15}s ease-in-out infinite`,
                        transformOrigin: 'bottom center',
                      }}
                    />
                  ) : (
                    <div
                      className="absolute bottom-1 left-1/2 h-6 w-3 rounded-full bg-[#eadbc0]/50 blur-[2px]"
                      style={{
                        animation: 'smokeRise 1.4s ease-out forwards',
                      }}
                    />
                  )}
                </div>

                {/* Wick */}
                <div className="h-2 w-[2px] bg-[#2b1417]" />

                {/* Beeswax Candle Body */}
                <div
                  className="h-14 w-3.5 rounded-t-sm border border-[#d4af37]/50 shadow-inner"
                  style={{
                    background:
                      idx % 2 === 0
                        ? 'linear-gradient(90deg, #f5ecd7 0%, #d9c49e 100%)'
                        : 'linear-gradient(90deg, #d4af37 0%, #a68529 100%)',
                  }}
                />
              </div>
            ))}
          </div>

          {/* Tier 1 (Top Crown Tier) */}
          <div
            className="relative z-10 h-14 w-44 sm:w-52 rounded-t-xl border-2 border-[#d4af37]/70 shadow-lg overflow-hidden"
            style={{
              background:
                'linear-gradient(180deg, #722f37 0%, #581525 75%, #3d0d18 100%)',
            }}
          >
            {/* Scalloped Cream Icing */}
            <div
              className="h-4 w-full border-b border-[#d4af37]/50"
              style={{
                background:
                  'linear-gradient(180deg, #f5ecd7 0%, #eadbc0 100%)',
              }}
            />
            <div className="mt-1.5 font-script text-xl text-[#ecd06f]">
              Sir Jati
            </div>
          </div>

          {/* Tier 2 (Middle Tier with Gold Filigree) */}
          <div
            className="relative z-10 -mt-1 h-16 w-56 sm:w-68 rounded-t-lg border-2 border-[#d4af37]/70 shadow-xl overflow-hidden flex flex-col justify-between"
            style={{
              background:
                'linear-gradient(180deg, #63192a 0%, #46101d 70%, #2f0b14 100%)',
            }}
          >
            <div
              className="h-3.5 w-full border-b border-[#d4af37]/45"
              style={{
                background:
                  'linear-gradient(180deg, #f5ecd7 0%, #dfd0b0 100%)',
              }}
            />
            <div className="flex items-center justify-center gap-3 px-4">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ecd06f]" />
              <span className="font-medieval text-xs tracking-[0.2em] text-[#ecd06f] uppercase">
                Happy Birthday
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#ecd06f]" />
            </div>
            <div className="h-1.5 w-full bg-[#d4af37]/40" />
          </div>

          {/* Tier 3 (Grand Base Tier) */}
          <div
            className="relative z-10 -mt-1 h-20 w-68 sm:w-84 rounded-t-lg rounded-b-sm border-2 border-[#d4af37]/80 shadow-2xl flex flex-col justify-between overflow-hidden"
            style={{
              background:
                'linear-gradient(180deg, #581525 0%, #3b0d18 65%, #24070e 100%)',
            }}
          >
            <div
              className="h-4 w-full border-b border-[#d4af37]/45"
              style={{
                background:
                  'linear-gradient(180deg, #f5ecd7 0%, #d9c49e 100%)',
              }}
            />
            {/* Piped Gold Pearl Garland */}
            <div className="flex items-center justify-around px-6">
              {Array.from({ length: 7 }).map((_, i) => (
                <span
                  key={i}
                  className="h-2 w-2 rounded-full bg-[#ecd06f] shadow"
                />
              ))}
            </div>
            <div className="h-2.5 w-full bg-gradient-to-r from-[#a68529] via-[#ecd06f] to-[#a68529]" />
          </div>

          {/* Ornate Cedar & Brass Pedestal */}
          <div className="h-4 w-76 sm:w-96 rounded-full bg-gradient-to-b from-[#ecd06f] via-[#d4af37] to-[#7f4f34] shadow-xl border border-[#f5ecd7]/50" />
          <div className="h-7 w-24 bg-gradient-to-r from-[#4e2e1d] via-[#9b6644] to-[#4e2e1d] border-x border-[#d4af37]/50" />
          <div className="h-3.5 w-44 rounded-full bg-gradient-to-b from-[#d4af37] to-[#4e2e1d] shadow-lg" />
        </div>

        {/* Status & Breath Meter */}
        {!allOut ? (
          <div className="mx-auto max-w-md space-y-4">
            <div className="text-sm font-cinzel tracking-wider uppercase text-[#ecd06f]">
              {remainingCount} {remainingCount === 1 ? 'Candle' : 'Candles'} Still
              Glowing
            </div>

            {micActive && (
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono-vintage text-[#eadbc0]">
                  <span>Breath Meter</span>
                  <span>{blowStrength}%</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#1e070d] border border-[#d4af37]/40">
                  <div
                    className="h-full transition-all duration-100 rounded-full"
                    style={{
                      width: `${blowStrength}%`,
                      background:
                        'linear-gradient(90deg, #8b5a3c, #d4af37, #ecd06f)',
                    }}
                  />
                </div>
              </div>
            )}

            {micError && (
              <p className="text-sm italic text-[#ecd06f]/90 bg-[#1e070d]/60 rounded px-3 py-2 border border-[#d4af37]/25">
                {micError}
              </p>
            )}

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              {!micActive ? (
                <button onClick={startMic} className="btn-vintage btn-gold">
                  <Mic className="h-4 w-4" />
                  Use Microphone to Blow
                </button>
              ) : (
                <button onClick={stopMic} className="btn-vintage">
                  <MicOff className="h-4 w-4" />
                  Turn Off Mic
                </button>
              )}

              <button
                onMouseDown={handleStartHoldBlow}
                onMouseUp={handleStopHoldBlow}
                onMouseLeave={handleStopHoldBlow}
                onTouchStart={handleStartHoldBlow}
                onTouchEnd={handleStopHoldBlow}
                className="btn-vintage"
              >
                <Wind className="h-4 w-4" />
                Hold to Blow Candles
              </button>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in mx-auto max-w-lg rounded-md parchment-card p-6 mt-4">
            <div className="flex items-center justify-center gap-2 text-[#722f37] font-cinzel text-sm tracking-widest uppercase mb-2">
              <Sparkles className="h-4 w-4 text-[#a68529]" />
              Wish Sent Into The Universe
              <Sparkles className="h-4 w-4 text-[#a68529]" />
            </div>
            <p className="text-xl font-display font-semibold text-[#2b1417] mb-2">
              Happy Birthday, Jati!
            </p>
            <p className="text-base italic text-[#4e2c30] mb-5">
              “May every wish you just whispered come true—and remember, no
              matter what happens this year, your big sis Anagwer is always in
              your corner.”
            </p>
            <button onClick={handleRelight} className="btn-vintage">
              <RotateCcw className="h-4 w-4" />
              <Flame className="h-4 w-4" />
              Relight Candles
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
