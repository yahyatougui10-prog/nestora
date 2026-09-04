"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize, Minimize, Grid3X3 } from 'lucide-react';
import { PropertyImage } from '@/lib/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface GalleryViewerProps {
  open: boolean;
  onClose: () => void;
  gallery: PropertyImage[];
  initialIndex?: number;
}

const CATEGORIES = ['All', 'Bedrooms', 'Living spaces', 'Bathrooms', 'Kitchen', 'Outdoor', 'Pool', 'Views', 'Exterior', 'Amenities', 'Dining', 'Workspace', 'Night view'] as const;

export function GalleryViewer({ open, onClose, gallery, initialIndex = 0 }: GalleryViewerProps) {
  const [category, setCategory] = useState<string>('All');
  const [index, setIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [touchX, setTouchX] = useState<number | null>(null);
  const [gridOpen, setGridOpen] = useState(false);

  const filtered = useMemo(() => {
    if (category === 'All') return gallery;
    return gallery.filter((g) => g.category === category);
  }, [category, gallery]);

  const safeIndex = Math.min(index, Math.max(filtered.length - 1, 0));

  const prev = () => setIndex((i) => (i - 1 + filtered.length) % filtered.length);
  const next = () => setIndex((i) => (i + 1) % filtered.length);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (gridOpen) setGridOpen(false);
        else if (zoom) setZoom(false);
        else onClose();
      }
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, zoom, gridOpen, filtered.length]);

  const toggleFullscreen = () => {
    if (isFullscreen) {
      document.exitFullscreen?.();
    } else {
      document.documentElement.requestFullscreen?.();
    }
    setIsFullscreen(!isFullscreen);
  };

  const current = filtered[safeIndex];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] bg-navy/95 backdrop-blur flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="Photo gallery"
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 z-10">
            <button onClick={onClose} className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors" aria-label="Close gallery">
              <X size={22} />
            </button>
            <div className="text-white/80 text-sm font-medium">
              {filtered.length > 0 ? `${safeIndex + 1} / ${filtered.length}` : '0 / 0'}
            </div>
            <div className="flex gap-2">
              <button onClick={toggleFullscreen} className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors" aria-label="Toggle fullscreen">
                {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
              </button>
              <button onClick={() => setGridOpen(!gridOpen)} className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors" aria-label="View grid">
                <Grid3X3 size={20} />
              </button>
            </div>
          </div>

          {/* Category filter */}
          <div className="px-4 sm:px-6 pb-3 flex gap-2 overflow-x-auto no-scrollbar z-10">
            {CATEGORIES.map((c) => {
              const count = c === 'All' ? gallery.length : gallery.filter((g) => g.category === c).length;
              if (count === 0 && c !== 'All') return null;
              return (
                <button
                  key={c}
                  onClick={() => { setCategory(c); setIndex(0); }}
                  className={cn(
                    'px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors',
                    category === c ? 'bg-golden text-navy' : 'bg-white/10 text-white/80 hover:bg-white/20'
                  )}
                >
                  {c} <span className="opacity-70">({count})</span>
                </button>
              );
            })}
          </div>

          {/* Main image area */}
          <div className="flex-1 relative min-h-0 flex items-center justify-center px-12 sm:px-20"
            onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchX === null) return;
              const dx = e.changedTouches[0].clientX - touchX;
              if (Math.abs(dx) > 40) (dx < 0 ? next() : prev());
              setTouchX(null);
            }}
          >
            <AnimatePresence mode="popLayout">
              <motion.div
                key={safeIndex}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
                onClick={() => setZoom(!zoom)}
                className="max-w-full max-h-full"
              >
                <img
                  src={current?.url}
                  alt={current?.caption || 'Photo'}
                  className={cn('max-w-full max-h-[70vh] object-contain rounded-lg transition-transform duration-300 select-none', zoom ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in')}
                  draggable={false}
                />
              </motion.div>
            </AnimatePresence>

            <button onClick={prev} className="absolute left-2 sm:left-5 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-golden hover:text-navy text-white transition-colors" aria-label="Previous photo">
              <ChevronLeft size={24} />
            </button>
            <button onClick={next} className="absolute right-2 sm:right-5 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-golden hover:text-navy text-white transition-colors" aria-label="Next photo">
              <ChevronRight size={24} />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
              <button onClick={() => setZoom(false)} className={cn('p-2 rounded-full transition-colors', !zoom ? 'bg-white/20 text-white' : 'bg-golden text-navy')} aria-label="Reset zoom" disabled={!zoom}>
                <ZoomOut size={18} />
              </button>
              <button onClick={() => setZoom(true)} className={cn('p-2 rounded-full transition-colors', zoom ? 'bg-golden text-navy' : 'bg-white/20 text-white')} aria-label="Zoom in" disabled={zoom}>
                <ZoomIn size={18} />
              </button>
            </div>
          </div>

          {/* Caption */}
          {current?.caption && (
            <div className="text-center text-white/70 text-sm py-2 px-6 z-10">{current.caption}</div>
          )}

          {/* Thumbnail strip */}
          <div className="px-4 sm:px-6 pb-5 z-10">
            <div className="flex gap-2 overflow-x-auto no-scrollbar justify-start">
              {filtered.map((g, i) => (
                <button
                  key={g.url + i}
                  onClick={() => setIndex(i)}
                  className={cn('relative w-16 h-12 rounded-md overflow-hidden shrink-0 transition-all', i === safeIndex ? 'ring-2 ring-golden' : 'ring-1 ring-white/20')}
                  aria-label={`Go to photo ${i + 1}`}
                >
                  <img src={g.url} alt={g.caption || 'Photo'} loading="lazy" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Grid overlay */}
          <AnimatePresence>
            {gridOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-20 bg-navy/95 overflow-y-auto p-6"
              >
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {filtered.map((g, i) => (
                    <button key={g.url + i} onClick={() => { setIndex(i); setGridOpen(false); }} className="relative aspect-square rounded-lg overflow-hidden">
                      <img src={g.url} alt={g.caption} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform" />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
