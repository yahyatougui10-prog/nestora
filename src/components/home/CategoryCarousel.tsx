"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Palmtree,
  Mountain,
  Home,
  Building,
  Tent,
  Castle,
  Sun,
  Waves,
  Sparkles,
  Leaf
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const categories = [
  { label: 'Beachfront', icon: Palmtree },
  { label: 'Mountains', icon: Mountain },
  { label: 'Villas', icon: Home },
  { label: 'City stays', icon: Building },
  { label: 'Cabins', icon: Tent },
  { label: 'Historic homes', icon: Castle },
  { label: 'Desert', icon: Sun },
  { label: 'Ocean views', icon: Waves },
  { label: 'Luxury', icon: Sparkles },
  { label: 'Countryside', icon: Leaf },
];

export default function CategoryCarousel() {
  const [activeCategory, setActiveCategory] = useState('Beachfront');

  return (
    <div className="py-8 px-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-8 overflow-x-auto no-scrollbar pb-4">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.label;

          return (
            <motion.button
              key={cat.label}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat.label)}
              className={cn(
                "flex flex-col items-center gap-3 min-w-fit px-6 py-4 rounded-2xl transition-all duration-300",
                isActive
                  ? "bg-golden text-navy shadow-lg shadow-golden/20"
                  : "bg-white text-navy/60 hover:bg-white/50"
              )}
            >
              <Icon
                size={24}
                className={cn(
                  "transition-colors",
                  isActive ? "text-navy" : "text-navy/40 group-hover:text-navy"
                )}
              />
              <span className={cn(
                "text-xs font-bold whitespace-nowrap",
                isActive ? "text-navy" : "text-navy/60"
              )}>
                {cat.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
