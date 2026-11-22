import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Sparkles,
  RotateCcw,
  Trophy,
  Candy,
  Layers,
  Play,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

/* =========================================================
   GAME 1: THE PARLOR MEMORY MATCH (Custom Vintage Elements)
   ========================================================= */
interface MemorySymbol {
  key: string;
  label: string;
  img: string;
}

const MEMORY_SYMBOLS: MemorySymbol[] = [
  { key: 'rose', label: 'Red Rose', img: 'elements/red-rose.png' },
  { key: 'potion', label: 'Sugar Elixir', img: 'elements/potion.png' },
  { key: 'clock', label: '2 AM Talks', img: 'elements/gold-clock.png' },
  { key: 'butterfly', label: 'Butterfly', img: 'elements/butterfly.png' },
  { key: 'london', label: 'Wanderlust', img: 'elements/london.png' },
  { key: 'camera', label: 'Snapshots', img: 'elements/red-camera.png' },
  { key: 'catswag', label: 'Cool Jati', img: 'elements/cat-swag.png' },
  { key: 'candle', label: 'Make A Wish', img: 'elements/candle.png' },
];

interface CardItem {
  id: number;
  key: string;
  label: string;
  img: string;
  matched: boolean;
}

function createShuffledDeck(): CardItem[] {
  const doubled = [...MEMORY_SYMBOLS, ...MEMORY_SYMBOLS];
  for (let i = doubled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [doubled[i], doubled[j]] = [doubled[j], doubled[i]];
  }
  return doubled.map((item, idx) => ({
    id: idx,
    key: item.key,
    label: item.label,
    img: item.img,
    matched: false,
  }));
}

const ParlorMemoryGame: React.FC<{ onWin?: () => void }> = ({ onWin }) => {
  const [cards, setCards] = useState<CardItem[]>(createShuffledDeck);
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [locked, setLocked] = useState(false);

  const allMatched = cards.every((c) => c.matched);

  useEffect(() => {
    if (allMatched) {
      onWin?.();
    }
  }, [allMatched, onWin]);

  const resetGame = () => {
    setCards(createShuffledDeck());
    setFlippedIds([]);
    setMoves(0);
    setLocked(false);
  };

  const handleCardClick = (card: CardItem) => {
    if (locked || card.matched || flippedIds.includes(card.id)) return;

    soundEngine.playCardFlip();
    const nextFlipped = [...flippedIds, card.id];
    setFlippedIds(nextFlipped);

    if (nextFlipped.length === 2) {
      setMoves((m) => m + 1);
      setLocked(true);
      const [firstId, secondId] = nextFlipped;
      const firstCard = cards.find((c) => c.id === firstId);
      const secondCard = cards.find((c) => c.id === secondId);

      if (firstCard && secondCard && firstCard.key === secondCard.key) {
        setTimeout(() => {
          soundEngine.playMatchChime();
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstId || c.id === secondId
                ? { ...c, matched: true }
                : c
            )
          );
          setFlippedIds([]);
          setLocked(false);
        }, 320);
      } else {
        setTimeout(() => {
          setFlippedIds([]);
          setLocked(false);
        }, 720);
      }
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#d4af37]/25 pb-3">
        <div>
          <h4 className="font-display text-xl sm:text-2xl font-bold text-[#f5ecd7]">
            The Parlor Memory Deck
          </h4>
          <p className="text-sm italic text-[#eadbc0]/80">
            Match all 8 vintage keepsake pairs to earn Quest Stamp #4.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="font-mono-vintage text-sm text-[#ecd06f]">
            Moves: <strong>{moves}</strong>
          </div>
          <button onClick={resetGame} className="btn-vintage py-2 px-3 text-xs">
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </button>
        </div>
      </div>

      {allMatched ? (
        <div className="animate-fade-in parchment-card rounded-md p-6 sm:p-8 text-center">
          <Trophy className="mx-auto h-10 w-10 text-[#a68529] mb-2" />
          <h5 className="font-display text-2xl font-bold text-[#2b1417] mb-2">
            Splendidly Played, Jati!
          </h5>
          <p className="text-base sm:text-lg italic text-[#4e2c30] mb-4">
            You cleared the Parlor Deck in {moves} moves and earned your
            Golden Stamp!
          </p>
          <button onClick={resetGame} className="btn-vintage btn-gold">
            Play Again
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-lg mx-auto">
          {cards.map((card) => {
            const isRevealed =
              card.matched || flippedIds.includes(card.id);
            return (
              <button
                key={card.id}
                onClick={() => handleCardClick(card)}
                className="perspective-1000 h-22 sm:h-28 w-full cursor-pointer focus:outline-none"
              >
                <div
                  className={`relative h-full w-full transition-transform duration-500 preserve-3d ${
                    isRevealed ? 'rotate-y-180' : ''
                  }`}
                >
                  {/* Card Back */}
                  <div className="absolute inset-0 backface-hidden rounded-md cedar-panel flex items-center justify-center border border-[#d4af37]/50 hover:border-[#ecd06f] transition-colors">
                    <div className="h-14 w-10 sm:h-16 sm:w-12 rounded-sm border border-[#d4af37]/40 flex items-center justify-center bg-[#2f0b14]/80">
                      <span className="font-script text-2xl text-[#d4af37]">
                        J
                      </span>
                    </div>
                  </div>

                  {/* Card Front */}
                  <div
                    className={`absolute inset-0 backface-hidden rotate-y-180 rounded-md flex flex-col items-center justify-center p-1.5 border-2 ${
                      card.matched
                        ? 'border-[#d4af37] bg-[#f5ecd7]'
                        : 'border-[#a68529] bg-[#eadbc0]'
                    } text-[#2b1417]`}
                  >
                    <img
                      src={card.img}
                      alt={card.label}
                      className="h-10 w-10 sm:h-12 sm:w-12 object-contain mb-1"
                    />
                    <span className="font-cinzel text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-[#581525] leading-tight truncate max-w-full">
                      {card.label}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

/* =========================================================
   GAME 2: SUGAR RUSH CATCHER (iPhone XR Touch-Optimized)
   ========================================================= */
interface FallingItem {
  x: number;
  y: number;
  speed: number;
  glyph: string;
  points: number;
  isBad: boolean;
}

const GOOD_TREATS = [
  { glyph: '🍬', points: 15 },
  { glyph: '🧁', points: 20 },
  { glyph: '🍩', points: 25 },
  { glyph: '🍫', points: 30 },
  { glyph: '🧋', points: 35 },
];

const BAD_ITEMS = [
  { glyph: '⏰', points: -15 },
  { glyph: '🥦', points: -10 },
];

const SugarRushCatcher: React.FC<{ onWin?: () => void }> = ({ onWin }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [running, setRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);

  const trayXRef = useRef(210);
  const itemsRef = useRef<FallingItem[]>([]);
  const scoreRef = useRef(0);
  const runningRef = useRef(false);

  const startGame = useCallback(() => {
    scoreRef.current = 0;
    itemsRef.current = [];
    trayXRef.current = 210;
    setScore(0);
    setTimeLeft(10);
    setGameOver(false);
    setRunning(true);
    runningRef.current = true;
  }, []);

  useEffect(() => {
    if (score >= 50) {
      onWin?.();
    }
  }, [score, onWin]);

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          runningRef.current = false;
          setRunning(false);
          setGameOver(true);
          soundEngine.playCelebrationFanfare();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [running]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!runningRef.current) return;
      if (e.key === 'ArrowLeft' || e.key === 'a') {
        trayXRef.current = Math.max(45, trayXRef.current - 30);
      } else if (e.key === 'ArrowRight' || e.key === 'd') {
        trayXRef.current = Math.min(375, trayXRef.current + 30);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    if (!running) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    let lastSpawn = 0;

    const loop = (timestamp: number) => {
      if (!runningRef.current) return;

      if (timestamp - lastSpawn > 340) {
        lastSpawn = timestamp;
        const isBad = Math.random() < 0.2;
        const template = isBad
          ? BAD_ITEMS[Math.floor(Math.random() * BAD_ITEMS.length)]
          : GOOD_TREATS[Math.floor(Math.random() * GOOD_TREATS.length)];

        itemsRef.current.push({
          x: 28 + Math.random() * (canvas.width - 56),
          y: -20,
          speed: 3.1 + Math.random() * 2.2,
          glyph: template.glyph,
          points: template.points,
          isBad,
        });
      }

      ctx.fillStyle = '#1e070d';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(212, 175, 55, 0.35)';
      ctx.lineWidth = 2;
      ctx.strokeRect(8, 8, canvas.width - 16, canvas.height - 16);

      const trayY = canvas.height - 32;
      const trayW = 86;

      const remaining: FallingItem[] = [];
      for (const item of itemsRef.current) {
        item.y += item.speed;

        if (
          item.y >= trayY - 12 &&
          item.y <= trayY + 14 &&
          Math.abs(item.x - trayXRef.current) < trayW / 2 + 12
        ) {
          scoreRef.current = Math.max(0, scoreRef.current + item.points);
          setScore(scoreRef.current);
          if (item.isBad) {
            soundEngine.playBitterMiss();
          } else {
            soundEngine.playCandyCatch();
          }
          continue;
        }

        if (item.y < canvas.height + 24) {
          remaining.push(item);
          ctx.font = '26px serif';
          ctx.textAlign = 'center';
          ctx.fillText(item.glyph, item.x, item.y);
        }
      }
      itemsRef.current = remaining;

      ctx.fillStyle = '#7f4f34';
      ctx.strokeStyle = '#ecd06f';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.roundRect(trayXRef.current - trayW / 2, trayY, trayW, 16, 6);
      ctx.fill();
      ctx.stroke();

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [running]);

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!running || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = canvasRef.current.width / rect.width;
    const x = (e.clientX - rect.left) * scaleX;
    trayXRef.current = Math.max(45, Math.min(375, x));
  };

  const nudgeTray = (delta: number) => {
    trayXRef.current = Math.max(45, Math.min(375, trayXRef.current + delta));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#d4af37]/25 pb-3">
        <div>
          <h4 className="font-display text-xl sm:text-2xl font-bold text-[#f5ecd7]">
            Sugar Rush Catcher
          </h4>
          <p className="text-sm italic text-[#eadbc0]/80">
            Score 50+ pts in 10 seconds to earn Quest Stamp #4!
          </p>
        </div>
        <div className="flex items-center gap-4 font-mono-vintage text-sm">
          <span className="text-[#ecd06f]">
            Score: <strong>{score}</strong>
          </span>
          <span className="text-[#f5ecd7]">
            Time: <strong>{timeLeft}s</strong>
          </span>
        </div>
      </div>

      <div className="relative mx-auto max-w-[420px] overflow-hidden rounded-md border-2 border-[#d4af37]/50 bg-[#1e070d] shadow-2xl">
        <canvas
          ref={canvasRef}
          width={420}
          height={300}
          onPointerMove={handlePointerMove}
          onPointerDown={handlePointerMove}
          className="block w-full h-auto touch-none cursor-ew-resize"
        />

        {!running && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#1e070d]/85 p-5 text-center">
            {gameOver ? (
              <div className="animate-fade-in space-y-3">
                <Candy className="mx-auto h-9 w-9 text-[#ecd06f]" />
                <h5 className="font-display text-2xl font-bold text-[#f5ecd7]">
                  Sugar Rush Score: {score}
                </h5>
                <p className="text-sm sm:text-base italic text-[#eadbc0] max-w-xs mx-auto">
                  {score >= 50
                    ? 'Quest Stamp #4 Earned! Certified Sugar Rush Champion!'
                    : 'So close! Hit 50 points in 10s to unlock the Golden Stamp.'}
                </p>
                <button onClick={startGame} className="btn-vintage btn-gold">
                  <RotateCcw className="h-4 w-4" />
                  Play Again
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <Candy className="mx-auto h-9 w-9 text-[#d4af37]" />
                <p className="text-sm sm:text-base italic text-[#eadbc0] max-w-xs">
                  Catch 🍬 🧁 🍩 🍫 🧋 for points. Avoid ⏰ &amp; 🥦!
                </p>
                <button onClick={startGame} className="btn-vintage btn-gold">
                  <Play className="h-4 w-4" />
                  Start 10s Sugar Rush
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Thumb Controls for iPhone XR */}
      {running && (
        <div className="flex justify-center gap-4 sm:hidden">
          <button
            onTouchStart={() => nudgeTray(-42)}
            onClick={() => nudgeTray(-42)}
            className="btn-vintage flex-1 max-w-[140px]"
          >
            <ChevronLeft className="h-5 w-5" /> Left
          </button>
          <button
            onTouchStart={() => nudgeTray(42)}
            onClick={() => nudgeTray(42)}
            className="btn-vintage flex-1 max-w-[140px]"
          >
            Right <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
};

/* =========================================================
   MAIN PARLOR ARCADE WRAPPER
   ========================================================= */
export const VintageGames: React.FC<{ onArcadeWin?: () => void }> = ({
  onArcadeWin,
}) => {
  const [activeTab, setActiveTab] = useState<'memory' | 'sugar'>('memory');

  return (
    <section id="games-section" className="py-12 px-3 sm:px-4">
      <div className="mx-auto max-w-4xl rounded-lg burgundy-panel p-5 sm:p-10 relative overflow-hidden">
        <img
          src="elements/disco.png"
          alt=""
          className="pointer-events-none absolute -top-2 left-3 w-14 sm:w-20 opacity-80 animate-float"
        />

        <div className="text-center mb-6">
          <p className="font-cinzel text-xs tracking-[0.25em] uppercase text-[#d4af37] mb-1">
            Quest 4 &bull; The Parlor Arcade
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#f5ecd7]">
            Vintage Games For Two
          </h2>
          <p className="text-base italic text-[#eadbc0]/80 mt-1">
            Win either game below to collect your final Golden Stamp.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <button
            onClick={() => setActiveTab('memory')}
            className={`btn-vintage ${
              activeTab === 'memory' ? 'btn-gold' : ''
            }`}
          >
            <Layers className="h-4 w-4" />
            Memory Deck
          </button>
          <button
            onClick={() => setActiveTab('sugar')}
            className={`btn-vintage ${
              activeTab === 'sugar' ? 'btn-gold' : ''
            }`}
          >
            <Sparkles className="h-4 w-4" />
            Sugar Rush
          </button>
        </div>

        <div className="rounded-md bg-[#1e070d]/55 border border-[#d4af37]/25 p-4 sm:p-7">
          {activeTab === 'memory' ? (
            <ParlorMemoryGame onWin={onArcadeWin} />
          ) : (
            <SugarRushCatcher onWin={onArcadeWin} />
          )}
        </div>
      </div>
    </section>
  );
};
