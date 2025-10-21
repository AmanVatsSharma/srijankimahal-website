"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";

const leftImages = [
  "/sri-janaki-mahal/IMG-20251017-WA0022.jpg",
  "/sri-janaki-mahal/IMG-20251017-WA0028.jpg",
  "/sri-janaki-mahal/IMG-20251017-WA0034.jpg",
  "/sri-janaki-mahal/IMG-20251017-WA0035.jpg",
  "/sri-janaki-mahal/IMG-20251017-WA0029.jpg",
  "/sri-janaki-mahal/IMG-20251017-WA0031.jpg",
];

const rightImages = [
  "/sri-janaki-mahal/IMG-20251017-WA0032.jpg",
  "/sri-janaki-mahal/IMG-20251017-WA0030.jpg",
  "/sri-janaki-mahal/IMG-20251017-WA0033.jpg",
  "/sri-janaki-mahal/IMG-20251017-WA0023.jpg",
  "/sri-janaki-mahal/IMG-20251017-WA0027.jpg",
  "/sri-janaki-mahal/IMG-20251017-WA0034.jpg",
];

const AUTO_DURATION_SEC = 15; // user preference

export default function GallerySection() {
  const leftLaneRef = useRef<HTMLDivElement>(null);
  const rightLaneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Seamless loop via scrollLeft with wrap-around.
    // - Drag-to-scroll and wheel-to-horizontal pause auto.
    // - Scroll-snap active only during user interaction.
    const lanes = [leftLaneRef.current, rightLaneRef.current].filter(Boolean) as HTMLDivElement[];
    if (!lanes.length) return;

    lanes.forEach((lane) => {
      const track = lane.querySelector('.lane-track') as HTMLElement;
      if (!track) return;

      let dragging = false;
      let startX = 0;
      let startScrollLeft = 0;
      let isPaused = false;
      let last = performance.now();
      let halfWidth = 0; // width of one set of items (we duplicated arrays)

      const recalc = () => {
        // half of total scrollWidth because items are duplicated
        halfWidth = Math.floor(track.scrollWidth / 2);
        if (!halfWidth) halfWidth = 1;
        // Initialize scrollLeft position for rightward lanes to end
        if ((lane.getAttribute('data-direction') || 'left') === 'right' && lane.scrollLeft === 0) {
          lane.scrollLeft = halfWidth;
        }
      };

      const pause = () => { isPaused = true; lane.classList.add('snap-active'); };
      const resume = () => { isPaused = false; lane.classList.remove('snap-active'); last = performance.now(); };

      // Don't pause on mere hover to avoid jitter; only during active interactions

      lane.addEventListener('pointerdown', (e) => {
        dragging = true;
        try { lane.setPointerCapture(e.pointerId); } catch {}
        startX = e.clientX;
        startScrollLeft = lane.scrollLeft;
        pause();
      });
      lane.addEventListener('pointermove', (e) => {
        if (!dragging) return;
        lane.scrollLeft = startScrollLeft - (e.clientX - startX);
      });
      lane.addEventListener('pointerup', () => { dragging = false; resume(); });
      lane.addEventListener('pointercancel', () => { dragging = false; resume(); });

      lane.addEventListener('wheel', (e) => {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          e.preventDefault();
          lane.scrollLeft += e.deltaY;
        }
        pause();
        clearTimeout((lane as HTMLDivElement & { _wheelResumeTimer?: NodeJS.Timeout })._wheelResumeTimer);
        (lane as HTMLDivElement & { _wheelResumeTimer?: NodeJS.Timeout })._wheelResumeTimer = setTimeout(resume, 150);
      }, { passive: false });

      const speed = () => {
        const dur = Number(lane.getAttribute('data-duration') || 15);
        return halfWidth / Math.max(1, dur); // px/sec
      };

      const step = (now: number) => {
        if (!lane.isConnected) return;
        const dt = (now - last) / 1000;
        last = now;
        if (!isPaused && !dragging) {
          const dir = (lane.getAttribute('data-direction') || 'left');
          const delta = speed() * dt;
          if (dir === 'left') {
            lane.scrollLeft += delta;
            if (lane.scrollLeft >= halfWidth) lane.scrollLeft -= halfWidth;
          } else {
            lane.scrollLeft -= delta;
            if (lane.scrollLeft <= 0) lane.scrollLeft += halfWidth;
          }
        }
        requestAnimationFrame(step);
      };

      // Initial measurements after images load
      const imgs = Array.from(track.querySelectorAll('img'));
      let pending = imgs.length;
      const done = () => { pending = Math.max(0, pending - 1); if (pending === 0) { recalc(); } };
      imgs.forEach((im) => { if ((im as HTMLImageElement).complete) done(); else im.addEventListener('load', done, { once: true }); });
      recalc();
      requestAnimationFrame(step);
    });
  }, []);

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 text-balance">
            Gallery
          </h2>
          <p className="text-lg text-gray-600">Explore the beauty and serenity of Sri Janaki Mahal</p>
        </div>

        {/* Dual-lane gallery: manual scroll + auto-scroll in opposite directions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left lane - auto scrolls left */}
          <div className="relative h-96 rounded-lg">
            <div 
              ref={leftLaneRef}
              className="lane no-scrollbar gallery-scroll overflow-x-auto overflow-y-hidden h-96" 
              data-direction="left" 
              data-duration={AUTO_DURATION_SEC} 
              aria-label="Auto-scrolling gallery lane left"
            >
              <div className="lane-track flex gap-4" style={{ willChange: 'scroll-position' }}>
                {[...leftImages, ...leftImages].map((src, i) => (
                  <div key={i} className="gallery-item flex-shrink-0 w-80 h-96 rounded-lg overflow-hidden shadow-lg">
                    <Image 
                      src={src} 
                      alt={`Gallery image ${i + 1}`} 
                      width={320}
                      height={384}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" 
                      loading="lazy"
                      sizes="(max-width: 768px) 80vw, 20rem"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right lane - auto scrolls right */}
          <div className="relative h-96 rounded-lg">
            <div 
              ref={rightLaneRef}
              className="lane no-scrollbar gallery-scroll overflow-x-auto overflow-y-hidden h-96" 
              data-direction="right" 
              data-duration={AUTO_DURATION_SEC} 
              aria-label="Auto-scrolling gallery lane right"
            >
              <div className="lane-track flex gap-4" style={{ willChange: 'scroll-position' }}>
                {[...rightImages, ...rightImages].map((src, i) => (
                  <div key={i} className="gallery-item flex-shrink-0 w-80 h-96 rounded-lg overflow-hidden shadow-lg">
                    <Image 
                      src={src} 
                      alt={`Gallery image ${i + 1}`} 
                      width={320}
                      height={384}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" 
                      loading="lazy"
                      sizes="(max-width: 768px) 80vw, 20rem"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}