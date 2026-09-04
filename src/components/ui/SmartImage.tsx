"use client";

import React, { useState } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ImageOff } from 'lucide-react';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  width?: number;
  height?: number;
  aspect?: string;
  loading?: 'lazy' | 'eager';
  sizes?: string;
  eager?: boolean;
  fallbackSrc?: string;
}

const RESPONSIVE_WIDTHS = [400, 800, 1200, 1600];

function buildSrcSet(url: string): string | undefined {
  if (!/images\.unsplash\.com/.test(url)) return undefined;
  try {
    const [base, query = ''] = url.split('?');
    const params = new URLSearchParams(query);
    return RESPONSIVE_WIDTHS.map((w) => {
      const q = new URLSearchParams(params);
      q.set('w', String(w));
      q.set('auto', q.get('auto') || 'format');
      q.set('fit', q.get('fit') || 'crop');
      q.set('q', q.get('q') || '80');
      return `${base}?${q.toString()} ${w}w`;
    }).join(', ');
  } catch {
    return undefined;
  }
}

export function SmartImage({
  src,
  alt,
  className,
  imgClassName,
  width,
  height,
  aspect,
  loading = 'lazy',
  sizes = '100vw',
  eager,
  fallbackSrc,
}: SmartImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const srcSet = !error ? buildSrcSet(currentSrc) : undefined;

  const handleError = () => {
    if (fallbackSrc && !error) {
      setCurrentSrc(fallbackSrc);
    } else {
      setError(true);
    }
  };

  return (
    <div
      className={cn('relative overflow-hidden bg-cream/30 dark:bg-white/5', className)}
      style={aspect ? { aspectRatio: aspect } : undefined}
    >
      {/* Skeleton shimmer while loading */}
      {!loaded && !error && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-cream/40 via-cream/20 to-cream/40 dark:from-white/10 dark:via-white/5 dark:to-white/10" aria-hidden />
      )}

      <img
        src={currentSrc}
        alt={alt}
        width={width}
        height={height}
        loading={eager ? 'eager' : loading}
        fetchPriority={eager ? 'high' : undefined}
        decoding="async"
        srcSet={srcSet}
        sizes={srcSet ? sizes : undefined}
        onLoad={() => setLoaded(true)}
        onError={handleError}
        className={cn(
          'w-full h-full object-cover transition-opacity duration-500',
          loaded && !error ? 'opacity-100' : 'opacity-0',
          imgClassName
        )}
        draggable={false}
      />

      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-navy/40 dark:text-cream/40">
          <ImageOff size={28} />
          <span className="text-xs font-medium">Image unavailable</span>
        </div>
      )}
    </div>
  );
}
