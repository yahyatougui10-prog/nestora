"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Zap } from 'lucide-react';
import { SmartImage } from '@/components/ui/SmartImage';
import { useFavorites } from '@/hooks/useFavorites';
import type { Property } from '@/lib/types';

interface Props {
  property: Property;
  eager?: boolean;
}

function plural(n: number, word: string): string {
  return `${n} ${word}${n === 1 ? '' : 's'}`;
}

export default function PropertyCard({ property, eager }: Props) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const [imgIdx, setImgIdx] = useState(0);
  const images = property.images?.length ? property.images : [property.image];
  const fav = isFavorite(property.id);

  const toggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(property.id);
  };

  const prev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImgIdx((i) => (i === 0 ? images.length - 1 : i - 1));
  };

  const next = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImgIdx((i) => (i === images.length - 1 ? 0 : i + 1));
  };

  return (
    <Link
      href={`/properties/${property.id}`}
      className="group block bg-white rounded-3xl overflow-hidden shadow-lg border border-cream/20 hover:shadow-2xl hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-golden focus-visible:ring-offset-2 transition-[box-shadow,transform] duration-200"
      aria-label={property.name}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <SmartImage
          src={images[imgIdx]}
          alt={property.name}
          eager={eager}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="absolute inset-0"
          imgClassName="group-hover:scale-[1.04] transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col items-start gap-1.5">
          {property.isGuestFavorite && (
            <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full shadow-sm">
              <span className="text-[10px] font-black text-navy uppercase tracking-wider">Guest Favorite</span>
            </span>
          )}
          {property.isInstantBook && (
            <span className="flex items-center gap-1 px-2.5 py-1 bg-navy/85 backdrop-blur-sm rounded-full shadow-sm">
              <Zap size={10} className="text-golden" fill="#FFB909" />
              <span className="text-[10px] font-black text-white uppercase tracking-wider">Instant Book</span>
            </span>
          )}
        </div>

        {/* Carousel controls */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous photo"
              className="absolute left-2 top-1/2 -translate-y-1/2 grid place-items-center w-11 h-11 rounded-full bg-white/90 shadow-lg hover:bg-white transition-colors md:opacity-0 md:group-hover:opacity-100 opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-golden active:scale-95"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              aria-label="Next photo"
              className="absolute right-2 top-1/2 -translate-y-1/2 grid place-items-center w-11 h-11 rounded-full bg-white/90 shadow-lg hover:bg-white transition-colors md:opacity-0 md:group-hover:opacity-100 opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-golden active:scale-95"
            >
              <ChevronRight size={20} />
            </button>
            <span className="absolute bottom-3 left-3 px-2.5 py-1 bg-black/45 text-white text-xs font-bold rounded-full backdrop-blur-sm">
              {imgIdx + 1} / {images.length}
            </span>
          </>
        )}

        {/* Favorite */}
        <motion.button
          onClick={toggleLike}
          aria-pressed={fav}
          aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
          whileTap={{ scale: 0.85 }}
          className="absolute top-3 right-3 grid place-items-center w-11 h-11 rounded-full bg-white/90 backdrop-blur-md shadow-lg hover:scale-110 active:scale-95 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-golden"
        >
          <motion.span
            key={String(fav)}
            initial={false}
            animate={fav ? { scale: [1, 1.3, 0.9, 1.15, 1] } : { scale: 1 }}
            transition={{ duration: 0.4 }}
            className="grid place-items-center"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className={fav ? 'text-orange' : 'text-navy/50'}
            >
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill={fav ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          </motion.span>
        </motion.button>
      </div>

      <div className="p-4 flex flex-col">
        <div className="flex justify-between items-start gap-2 mb-1">
          <h3 className="font-bold text-navy text-base leading-snug group-hover:text-orange transition-colors line-clamp-1">
            {property.name}
          </h3>
          <div className="flex items-center gap-0.5 shrink-0 mt-0.5" aria-label={`Rated ${property.rating} out of 5`}>
            <Star className="w-3.5 h-3.5 fill-golden text-golden" />
            <span className="text-sm font-bold text-navy">{property.rating}</span>
          </div>
        </div>
        <p className="text-xs text-navy/50 mb-1 line-clamp-1">
          {property.city}, {property.country}
        </p>
        <p className="text-[11px] text-navy/40 mb-2">
          {property.type} · {plural(property.beds, 'bed')} · {plural(property.baths, 'bath')}
        </p>
        <div className="flex items-center justify-between mt-auto pt-1">
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-black text-navy">${property.price}</span>
            <span className="text-xs text-navy/40">/ night</span>
          </div>
          {property.reviews > 0 && (
            <span className="text-[11px] text-navy/40">({property.reviews} reviews)</span>
          )}
        </div>
      </div>
    </Link>
  );
}