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

const PLACEHOLDER =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="#021F59" opacity="0.15"><rect width="24" height="24" rx="4"/></svg>`
  );

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
        sizes={sizes}
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
