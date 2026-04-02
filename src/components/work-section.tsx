'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VideoPlayer from '@/components/ui/video-player';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/reveal';
import TiltedCard from '@/components/TiltedCard';
import { stopScroll, startScroll } from '@/components/smooth-scroll';

interface Clip {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  videoUrl: string;
}

const clips: Clip[] = [
  {
    id: '1',
    title: 'Brand Film — Altitude',
    category: 'COLOR GRADING',
    thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&q=80',
    videoUrl: 'https://videos.pexels.com/video-files/30333849/13003128_2560_1440_25fps.mp4',
  },
  {
    id: '2',
    title: 'YouTube — Tech Review',
    category: 'FULL EDIT',
    thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&q=80',
    videoUrl: 'https://videos.pexels.com/video-files/30333849/13003128_2560_1440_25fps.mp4',
  },
  {
    id: '3',
    title: 'Documentary — Neon Nights',
    category: 'POST PRODUCTION',
    thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&q=80',
    videoUrl: 'https://videos.pexels.com/video-files/30333849/13003128_2560_1440_25fps.mp4',
  },
  {
    id: '4',
    title: 'Campaign — Pulse',
    category: 'MOTION GRAPHICS',
    thumbnail: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=600&q=80',
    videoUrl: 'https://videos.pexels.com/video-files/30333849/13003128_2560_1440_25fps.mp4',
  },
  {
    id: '5',
    title: 'Short Film — Silence',
    category: 'CINEMATOGRAPHY',
    thumbnail: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80',
    videoUrl: 'https://videos.pexels.com/video-files/30333849/13003128_2560_1440_25fps.mp4',
  },
  {
    id: '6',
    title: 'Podcast — Wavelength',
    category: 'SOUND DESIGN',
    thumbnail: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&q=80',
    videoUrl: 'https://videos.pexels.com/video-files/30333849/13003128_2560_1440_25fps.mp4',
  },
];

export function WorkSection() {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Lock ALL scroll when video is open
  useEffect(() => {
    if (playingVideo) {
      stopScroll();
      const header = document.querySelector('header');
      if (header) (header as HTMLElement).style.pointerEvents = 'none';
      return () => {
        startScroll();
        if (header) (header as HTMLElement).style.pointerEvents = '';
      };
    }
  }, [playingVideo]);

  return (
    <section id="work" className="relative z-10 bg-black py-32 scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-white/30 mb-4">
            Selected work
          </p>
          <h2 className="text-2xl sm:text-4xl font-semibold text-white mb-10 sm:mb-16 max-w-xl">
            Projects that speak for themselves.
          </h2>
        </Reveal>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {clips.map((clip) => {
            const isHovered = hoveredId === clip.id;
            const isDimmed = hoveredId !== null && !isHovered;

            return (
              <StaggerItem key={clip.id}>
                <div
                  className="relative cursor-pointer transition-all duration-500"
                  style={{
                    filter: isHovered ? 'grayscale(0) brightness(1)' : isDimmed ? 'grayscale(1) brightness(0.4)' : 'grayscale(1) brightness(0.7)',
                  }}
                  onMouseEnter={() => setHoveredId(clip.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <TiltedCard
                    imageSrc={clip.thumbnail}
                    altText={clip.title}
                    captionText={clip.title}
                    containerHeight="220px"
                    containerWidth="100%"
                    imageHeight="220px"
                    imageWidth="100%"
                    scaleOnHover={1.05}
                    rotateAmplitude={8}
                    showMobileWarning={false}
                    showTooltip={false}
                    displayOverlayContent={true}
                    overlayContent={(
                      <div className="flex flex-col justify-end w-full h-[220px] p-5 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-[15px]">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-1">
                          {clip.category}
                        </p>
                        <h3 className="text-sm font-semibold text-white">
                          {clip.title}
                        </h3>
                      </div>
                    ) as any}
                  />
                  {/* Invisible click layer on top */}
                  <div
                    className="absolute inset-0 z-10"
                    onClick={() => setPlayingVideo(clip.videoUrl)}
                  />
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>

      {/* Video overlay */}
      <AnimatePresence>
        {playingVideo && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center p-6 cursor-pointer"
            style={{ zIndex: 9999 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setPlayingVideo(null)}
          >
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <div className="relative z-10 w-full max-w-5xl cursor-default">
              <VideoPlayer
                src={playingVideo}
                onClose={() => setPlayingVideo(null)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
