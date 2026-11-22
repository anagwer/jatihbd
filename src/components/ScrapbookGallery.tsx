import React, { useState } from 'react';
import { X, Film, Camera, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

type FrameShape = 'rect' | 'round' | 'filmstrip';

interface PhotoMemory {
  id: string;
  src: string;
  frame: string;
  shape: FrameShape;
  pin: string;
  title: string;
  caption: string;
}

const PHOTO_MEMORIES: PhotoMemory[] = [
  {
    id: 'us-little',
    src: '/media/us/us-little.png',
    frame: '/elements/frame.png',
    shape: 'rect',
    pin: '/elements/pin.png',
    title: 'Tiny Troublemakers',
    caption: 'Day one cousin energy—still my favorite little brother.',
  },
  {
    id: 'u-cameback',
    src: '/media/us/u-cameback.png',
    frame: '/elements/redangel-frame.png',
    shape: 'rect',
    pin: '/elements/clip.png',
    title: 'The Reunion Smile',
    caption: 'Some reunions feel like zero time passed at all.',
  },
  {
    id: 'photo-1',
    src: '/media/us/photo-1.jpg',
    frame: '/elements/round-frame.png',
    shape: 'round',
    pin: '/elements/bow.png',
    title: 'Mall Detours',
    caption: 'That look when I ask if you want to walk one more lap.',
  },
  {
    id: 'photo-2',
    src: '/media/us/photo-2.jpg',
    frame: '/elements/frame.png',
    shape: 'rect',
    pin: '/elements/pin.png',
    title: 'Lakeside Breeze',
    caption: 'Quiet skies, slow afternoons, and zero rush to go home.',
  },
  {
    id: 'img-1280',
    src: '/media/us/IMG_1280.jpg',
    frame: '/elements/4-frame.png',
    shape: 'filmstrip',
    pin: '/elements/clip.png',
    title: 'Table For Two',
    caption: 'Good food tastes ten times better with your commentary.',
  },
  {
    id: 'img-1327',
    src: '/media/us/IMG_1327.jpg',
    frame: '/elements/redangel-frame.png',
    shape: 'rect',
    pin: '/elements/pin.png',
    title: 'Golden Hour',
    caption: 'No filter needed when the lighting hits just right.',
  },
  {
    id: 'img-2466',
    src: '/media/us/IMG_2466.png',
    frame: '/elements/round-frame.png',
    shape: 'round',
    pin: '/elements/bow.png',
    title: 'Sweet Chaos',
    caption: 'Proof that we have zero self-control around dessert.',
  },
  {
    id: 'img-5130',
    src: '/media/us/IMG_5130.jpg',
    frame: '/elements/frame.png',
    shape: 'rect',
    pin: '/elements/clip.png',
    title: 'Always Team Jati',
    caption: 'One of my favorite snapshots of us.',
  },
];

interface VideoMemory {
  id: string;
  src: string;
  title: string;
  note: string;
}

const VIDEO_MEMORIES: VideoMemory[] = [
  {
    id: 'u-cry',
    src: '/media/us/u-cry.mp4',
    title: 'Reel I • Unfiltered Moments',
    note: 'Even the emotional ones—always here for you.',
  },
  {
    id: 'video-1',
    src: '/media/us/video-1.mp4',
    title: 'Reel II • Our Shenanigans',
    note: 'Never a dull second when we link up.',
  },
  {
    id: 'img-1271',
    src: '/media/us/IMG_1271.mp4',
    title: 'Reel III • Out & About',
    note: 'Spontaneous plans are always the best plans.',
  },
  {
    id: 'img-4031',
    src: '/media/us/IMG_4031.mp4',
    title: 'Reel IV • Sugar Rush Energy',
    note: 'Zero chill, 100% laughs.',
  },
  {
    id: 'img-4855',
    src: '/media/us/IMG_4855.mp4',
    title: 'Reel V • Core Memory',
    note: 'Saving this one forever.',
  },
  {
    id: 'img-5900',
    src: '/media/us/IMG_5900.mp4',
    title: 'Reel VI • Just Us',
    note: 'To many more reels this year, Jati!',
  },
];

interface ScrapbookGalleryProps {
  onMemoryViewed: (count: number) => void;
}

function FramedPhoto({ photo }: { photo: PhotoMemory }) {
  // Match each frame's true aspect ratio & inner window
  const containerAspect =
    photo.shape === 'round' ? 'aspect-square' : 'aspect-[4/5]';

  const photoInsetClass =
    photo.shape === 'round'
      ? 'inset-[13%] rounded-full overflow-hidden'
      : photo.shape === 'filmstrip'
        ? 'inset-x-[17%] inset-y-[4%] overflow-hidden'
        : 'inset-[11%] overflow-hidden';

  const frameFitClass =
    photo.shape === 'round' || photo.shape === 'filmstrip'
      ? 'object-contain'
      : 'object-fill';

  return (
    <div className={`relative w-full ${containerAspect}`}>
      <div className={`absolute ${photoInsetClass} bg-[#1e070d]`}>
        <img
          src={photo.src}
          alt={photo.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <img
        src={photo.frame}
        alt=""
        className={`pointer-events-none absolute inset-0 h-full w-full ${frameFitClass} drop-shadow-xl`}
      />
    </div>
  );
}

export const ScrapbookGallery: React.FC<ScrapbookGalleryProps> = ({
  onMemoryViewed,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoMemory | null>(null);
  const [activeVideo, setActiveVideo] = useState<VideoMemory>(VIDEO_MEMORIES[0]);
  const [viewedIds, setViewedIds] = useState<Record<string, boolean>>({});

  const markViewed = (id: string) => {
    setViewedIds((prev) => {
      if (prev[id]) return prev;
      const next = { ...prev, [id]: true };
      onMemoryViewed(Object.keys(next).length);
      return next;
    });
  };

  const openPhoto = (photo: PhotoMemory) => {
    soundEngine.playCardFlip();
    setSelectedPhoto(photo);
    markViewed(photo.id);
  };

  const selectVideo = (vid: VideoMemory) => {
    soundEngine.playCardFlip();
    setActiveVideo(vid);
    markViewed(vid.id);
  };

  const viewedCount = Object.keys(viewedIds).length;

  return (
    <section id="scrapbook-section" className="py-12 px-3 sm:px-4">
      <div className="mx-auto max-w-5xl rounded-lg burgundy-panel p-5 sm:p-10 relative overflow-hidden">
        {/* Scrapbook Journal Collage Decorations */}
        <img
          src="/elements/paper-top-left-butterfly.png"
          alt=""
          className="pointer-events-none absolute -top-2 -left-2 w-28 sm:w-40 opacity-50"
        />
        <img
          src="/elements/red-camera.png"
          alt=""
          className="pointer-events-none absolute -top-2 right-2 sm:right-6 w-20 sm:w-28 opacity-90 rotate-12 drop-shadow-lg"
        />
        <img
          src="/elements/paper-fan.png"
          alt=""
          className="pointer-events-none hidden sm:block absolute bottom-4 left-4 w-24 opacity-45 -rotate-12"
        />
        <img
          src="/elements/love-shape-stamp.png"
          alt=""
          className="pointer-events-none hidden sm:block absolute top-1/3 right-3 w-16 opacity-60 rotate-12"
        />
        <img
          src="/elements/london.png"
          alt=""
          className="pointer-events-none hidden sm:block absolute top-1/2 left-2 w-20 opacity-45 -rotate-6"
        />

        {/* Header with "this is us.png" */}
        <div className="relative z-10 text-center mb-8">
          <img
            src="/elements/this is us.png"
            alt="This Is Us"
            className="mx-auto w-52 sm:w-64 mb-3 drop-shadow-lg"
          />
          <p className="font-cinzel text-xs tracking-[0.22em] uppercase text-[#d4af37]">
            Quest 3 &bull; View 3 Photos or Videos ({Math.min(viewedCount, 3)}/3)
          </p>
          <p className="text-base italic text-[#eadbc0]/85 mt-1 max-w-md mx-auto">
            Tap any pinned vintage frame to inspect the memory, or watch our
            cinema reels below.
          </p>
        </div>

        {/* Scrapbook Photo Spread */}
        <div className="relative z-10 mb-12">
          <div className="flex items-center gap-2 mb-5">
            <Camera className="h-4 w-4 text-[#d4af37]" />
            <h3 className="font-cinzel text-sm tracking-[0.18em] uppercase text-[#ecd06f]">
              Pinned Journal Frames
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-6 items-center">
            {PHOTO_MEMORIES.map((photo, idx) => (
              <button
                key={photo.id}
                onClick={() => openPhoto(photo)}
                className="group relative text-center pt-2 pb-1 px-1 cursor-pointer transition-all duration-300 hover:-translate-y-1.5 active:scale-95 focus:outline-none"
                style={{
                  transform: `rotate(${idx % 2 === 0 ? '-1.8deg' : '1.8deg'})`,
                }}
              >
                {/* Pin / Clip / Bow at top */}
                <img
                  src={photo.pin}
                  alt=""
                  className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 w-7 h-7 object-contain z-20 drop-shadow-md"
                />

                <FramedPhoto photo={photo} />

                {/* Handwritten Paper Tag below the frame */}
                <div className="mx-auto -mt-2 relative z-20 inline-block max-w-full rounded-xs bg-[#f5ecd7] px-2.5 py-1 shadow-md border border-[#a68529]/60">
                  <div className="font-display text-xs sm:text-sm font-bold text-[#2b1417] truncate">
                    {photo.title}
                  </div>
                  <div className="font-mono-vintage text-[9px] text-[#722f37] flex items-center justify-center gap-1">
                    <Sparkles className="h-2.5 w-2.5" />
                    {viewedIds[photo.id] ? 'Viewed' : 'Tap to open'}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Vintage Cinema Reel */}
        <div className="relative z-10 rounded-md bg-[#1e070d]/75 border border-[#d4af37]/35 p-4 sm:p-6">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
            <div className="flex items-center gap-2">
              <Film className="h-4 w-4 text-[#d4af37]" />
              <h3 className="font-cinzel text-sm tracking-[0.18em] uppercase text-[#ecd06f]">
                The Midnight Cinema Reel
              </h3>
            </div>
            <span className="font-mono-vintage text-[11px] text-[#eadbc0]/75">
              {activeVideo.title}
            </span>
          </div>

          <div className="mx-auto max-w-xl overflow-hidden rounded-md border-2 border-[#d4af37]/50 bg-black shadow-2xl">
            <video
              key={activeVideo.src}
              src={activeVideo.src}
              controls
              playsInline
              preload="metadata"
              onPlay={() => markViewed(activeVideo.id)}
              className="w-full max-h-[380px] object-contain bg-black"
            />
          </div>
          <p className="text-center text-sm italic text-[#eadbc0] mt-3 mb-5">
            “{activeVideo.note}”
          </p>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {VIDEO_MEMORIES.map((vid, idx) => {
              const isActive = vid.id === activeVideo.id;
              return (
                <button
                  key={vid.id}
                  onClick={() => selectVideo(vid)}
                  className={`shrink-0 rounded px-3 py-2 font-cinzel text-[11px] tracking-wider uppercase cursor-pointer border transition-all ${
                    isActive
                      ? 'bg-[#d4af37] text-[#1e070d] border-[#f7e6a3] font-bold'
                      : 'bg-[#2f0b14] text-[#eadbc0] border-[#d4af37]/30 hover:border-[#d4af37]'
                  }`}
                >
                  Reel {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Photo Lightbox Modal */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md parchment-card rounded-md p-5 sm:p-6 text-center"
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              aria-label="Close photo"
              className="absolute top-3 right-3 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-[#722f37] text-[#f5ecd7] cursor-pointer hover:bg-[#581525]"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mx-auto mb-4 w-full max-w-[290px]">
              <FramedPhoto photo={selectedPhoto} />
            </div>

            <h4 className="font-display text-2xl font-bold text-[#2b1417]">
              {selectedPhoto.title}
            </h4>
            <p className="mt-2 text-base italic text-[#4e2c30]">
              “{selectedPhoto.caption}”
            </p>
            <p className="mt-3 font-script text-2xl text-[#722f37]">
              — Anagwer
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
