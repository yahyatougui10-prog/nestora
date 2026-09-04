"use client";

import React from 'react';
import Link from 'next/link';
import { SmartImage } from '@/components/ui/SmartImage';

const DESTINATIONS = [
  { name: 'Marrakech', img: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70' },
  { name: 'Essaouira', img: 'https://images.unsplash.com/photo-1529174011133-999a36e13aa6' },
  { name: 'Agadir', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e' },
  { name: 'Tangier', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34' },
  { name: 'Chefchaouen', img: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9' },
  { name: 'Casablanca', img: 'https://images.unsplash.com/photo-1519681393784-d120267933ba' },
  { name: 'Rabat', img: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05' },
];

export function DestinationChips() {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
      {DESTINATIONS.map((d) => (
        <Link key={d.name} href={`/explore?destination=${encodeURIComponent(d.name)}`} className="group flex-shrink-0 snap-start relative w-32 h-28 rounded-2xl overflow-hidden shadow-lg shadow-navy/5 hover:shadow-xl hover:-translate-y-1 transition-[box-shadow,transform] duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-golden">
          <SmartImage src={d.img} alt={d.name} eager sizes="128px" className="absolute inset-0" imgClassName="group-hover:scale-110 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent" />
          <span className="absolute bottom-2 left-2 text-white font-bold text-sm tracking-tight drop-shadow-md">{d.name}</span>
        </Link>
      ))}
    </div>
  );
}
