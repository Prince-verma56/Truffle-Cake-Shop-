"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

interface BakeryVideoProps {
  src: string;
  /** Called when the video successfully finishes playing */
  onEnded: () => void;
  /** Called when video is ready to play (canplay) */
  onCanPlay: () => void;
  /** Called if video fails or times out */
  onError: () => void;
  /** Triggered at 7.0s */
  onHeroRevealTrigger: () => void;
  /** Whether the video should be visible (opacity 1) */
  visible: boolean;
  /** External ref so parent can call play() after paper reveal */
  videoRef: React.RefObject<HTMLVideoElement | null>;
}

const VIDEO_MESSAGES = [
  { threshold: 0, text: "Something sweet\nis on its way." }
];

export default function BakeryVideo({
  src,
  onEnded,
  onCanPlay,
  onError,
  onHeroRevealTrigger,
  visible,
  videoRef,
}: BakeryVideoProps) {
  const endedCalledRef = useRef(false);
  const heroRevealTriggeredRef = useRef(false);
  const pausedRef = useRef(false);
  const rafRef = useRef<number>(0);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const progressDotRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleEnded = useCallback(() => {
    if (endedCalledRef.current) return;
    endedCalledRef.current = true;
    onEnded();
  }, [onEnded]);

  const handleCanPlay = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 2.0;
    }
    onCanPlay();
  }, [onCanPlay, videoRef]);

  const handleError = useCallback(() => {
    if (endedCalledRef.current) return;
    endedCalledRef.current = true;
    onError();
  }, [onError]);

  // Setup GSAP animation guards
  const brandRevealedRef = useRef(false);
  const captionRevealedRef = useRef(false);
  const journeyRevealedRef = useRef(false);

  // Reset guards on mount
  useEffect(() => {
    endedCalledRef.current = false;
    heroRevealTriggeredRef.current = false;
    pausedRef.current = false;
  }, []);

  // Sync progress and trigger animations based on video time
  useEffect(() => {
    if (!visible) return;

    const video = videoRef.current;
    if (!video) return;

    const trackProgress = () => {
      if (video.duration > 0) {
        const progress = video.currentTime / 8.0; // We know it's clamped to 8.0s
        const safeProgress = Math.min(progress, 1);
        
        // Update visual progress line efficiently
        if (progressLineRef.current) {
          progressLineRef.current.style.transform = `scaleX(${safeProgress})`;
        }
        if (progressDotRef.current) {
          progressDotRef.current.style.left = `${safeProgress * 100}%`;
        }

        // --- Cinematic Reveal Sequence ---
        // 2.0s: Small brand label
        if (video.currentTime >= 2.0 && !brandRevealedRef.current) {
          brandRevealedRef.current = true;
          gsap.to("#brand-label", { opacity: 1, y: 0, duration: 1.2, ease: "power2.out", startAt: { y: 15 } });
        }
        
        // 3.0s: Editorial Caption
        if (video.currentTime >= 3.0 && !captionRevealedRef.current) {
          captionRevealedRef.current = true;
          gsap.to("#editorial-caption", { opacity: 1, y: 0, duration: 1.2, ease: "power2.out", startAt: { y: 15 } });
        }

        // 4.0s: Journey Indicator
        if (video.currentTime >= 4.0 && !journeyRevealedRef.current) {
          journeyRevealedRef.current = true;
          gsap.to("#journey-indicator", { opacity: 1, y: 0, duration: 1.2, ease: "power2.out", startAt: { y: 15 } });
        }

        // Trigger Hero Reveal at exactly 7.0 seconds
        if (!heroRevealTriggeredRef.current && video.currentTime >= 7.0) {
          heroRevealTriggeredRef.current = true;
          onHeroRevealTrigger();
          
          // Fade out the video HUD (overlay) so the Hero UI can take over
          if (overlayRef.current) {
            gsap.to(overlayRef.current, { opacity: 0, duration: 0.5, ease: "power2.inOut" });
          }
        }

        // Freeze video at exactly 8.0 seconds
        if (!pausedRef.current && video.currentTime >= 8.0) {
          pausedRef.current = true;
          video.pause();
          onEnded(); // Signal that the video phase is completely done
        }
      }
      
      if (!pausedRef.current) {
        rafRef.current = requestAnimationFrame(trackProgress);
      }
    };

    rafRef.current = requestAnimationFrame(trackProgress);

    return () => cancelAnimationFrame(rafRef.current);
  }, [visible, videoRef, onHeroRevealTrigger, onEnded]);

  return (
    <div
      className="absolute inset-0"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 0.3s ease",
        zIndex: 10,
      }}
      aria-hidden="true"
    >
      {/* Responsive video container */}
      <div className="relative w-full h-full overflow-hidden bg-[#FFF8EF]">
        <video
          ref={videoRef as React.RefObject<HTMLVideoElement>}
          src={src}
          autoPlay={false} // We manually call play() after paper reveal
          muted
          playsInline
          preload="auto"
          loop={false}
          controls={false}
          disablePictureInPicture
          onEnded={handleEnded}
          onCanPlay={handleCanPlay}
          onError={handleError}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            // Default: center the truck composition
            objectPosition: "center center",
            display: "block",
            pointerEvents: "none",
          }}
        />

        {/* Cinematic Text Overlay - HUD */}
        <div 
          ref={overlayRef}
          className="absolute inset-0 pointer-events-none flex flex-col justify-between p-8 md:p-[clamp(32px,5vw,80px)] z-20"
        >
          {/* Top Left: Brand Label */}
          <div 
            id="brand-label"
            className="text-[#24365F] font-manrope uppercase opacity-0"
          >
            <div className="text-[0.75rem] font-semibold tracking-[0.2em] mb-1">
              Truffle Cakes
            </div>
            <div className="w-12 h-[1px] bg-[#C8A15A] opacity-60 mb-1" />
            <div className="text-[0.6rem] tracking-[0.25em] opacity-60">
              Est. / Sweet Moments
            </div>
          </div>

          {/* Bottom Left: Editorial Caption & Progress */}
          <div className="flex flex-col items-start justify-end w-full max-w-[400px]">
            {/* Static Cinematic Message */}
            <h2 
              id="editorial-caption"
              className="text-[#24365F] font-fraunces text-2xl md:text-3xl lg:text-4xl tracking-wide mb-6 mix-blend-color-burn opacity-0 leading-[1.1]"
              style={{ whiteSpace: "pre-line" }}
            >
              Made with a<br />little love.
            </h2>

            {/* Premium Progress / Journey Indicator */}
            <div id="journey-indicator" className="flex flex-col gap-2 w-full max-w-[200px] opacity-0">
              <div className="flex justify-between items-center w-full">
                <span className="text-[#24365F] font-manrope text-[0.6rem] tracking-[0.2em] opacity-70 uppercase">
                  Journey / 01
                </span>
              </div>
              <div className="w-full relative h-[1px] flex items-center mix-blend-color-burn opacity-60 bg-[rgba(36,54,95,0.2)]">
                {/* Active progress line */}
                <div 
                  ref={progressLineRef}
                  className="absolute left-0 h-[1px] bg-[#24365F] origin-left"
                  style={{ width: "100%", transform: "scaleX(0)" }}
                />
                
                {/* Progress dot */}
                <div 
                  ref={progressDotRef}
                  className="absolute w-[4px] h-[4px] rounded-full bg-[#24365F] -ml-[2px]"
                  style={{ left: "0%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*
        Mobile-specific object-position tweak:
        We inject a style tag to keep the truck centred
        without requiring a separate CSS module.
      */}
      <style>{`
        @media (max-width: 480px) {
          #bakery-video-el {
            object-position: 40% center;
          }
        }
        @media (min-width: 481px) and (max-width: 768px) {
          #bakery-video-el {
            object-position: 45% center;
          }
        }
      `}</style>
    </div>
  );
}
