"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useFavorites } from '@/hooks/useFavorites';
import { useToastContext } from '@/context/ToastContext';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface FavoriteButtonProps {
  propertyId: string;
  className?: string;
  size?: 'sm' | 'md';
}

const PARTICLES = Array.from({ length: 6 });

export function FavoriteButton({ propertyId, className, size = 'md' }: FavoriteButtonProps) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToast } = useToastContext();
  const [burst, setBurst] = React.useState<number>(0);
  const fav = isFavorite(propertyId);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!fav) {
      setBurst((b) => b + 1);
      addToast({ type: 'success', title: 'Favorites', message: 'Added to your favorites ❤️' });
    }
    toggleFavorite(propertyId);
  };

  const btnSize = size === 'sm' ? 'p-2' : 'p-2.5';

  return (
    <button
      onClick={handleClick}
      aria-pressed={fav}
      aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
      className={cn(
        'relative rounded-full bg-black/20 backdrop-blur-md hover:bg-black/40 transition-all hover:scale-110 active:scale-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-golden',
        btnSize,
        className
      )}
    >
      <motion.div
        key={burst}
        initial={false}
        animate={fav ? {} : {}}
        className="relative"
      >
        <motion.span
          animate={fav ? { scale: [1, 1.3, 0.9, 1.15, 1] } : {}}
          transition={{ duration: 0.45 }}
          className="block"
        >
          <Heart
            size={size === 'sm' ? 16 : 18}
            fill={fav ? '#FFB909' : 'transparent'}
            strokeWidth={fav ? 2.4 : 2}
            className={cn('transition-colors', fav ? 'text-golden' : 'text-white')}
          />
        </motion.span>

        <AnimatePresence>
          {burst > 0 && fav && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              {PARTICLES.map((_, i) => {
                const angle = (i / PARTICLES.length) * Math.PI * 2;
                const dist = 20 + (i % 3) * 6;
                return (
                  <motion.span
                    key={`${burst}-${i}`}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 0.6 }}
                    animate={{
                      x: Math.cos(angle) * dist,
                      y: Math.sin(angle) * dist - 4,
                      opacity: 0,
                      scale: 0,
                    }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className="absolute w-1.5 h-1.5 rounded-full bg-golden"
                  />
                );
              })}
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </button>
  );
}