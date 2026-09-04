"use client";

import React from 'react';
import Link from 'next/link';

const DESTINATIONS = [
  { name: 'Marrakech', img: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=400&q=80' },
  { name: 'Essaouira', img: 'https://images.unsplash.com/photo-1529174011133-999a36e13aa6?w=400&q=80' },
  { name: 'Agadir', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80' },
  { name: 'Tangier', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80' },
  { name: 'Chefchaouen', img: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=400&q=80' },
  { name: 'Casablanca', img: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&q=80' },
  { name: 'Rabat', img: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&q=80' },
];

export function DestinationChips() {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
      {DESTINATIONS.map((d) => (
        <Link key={d.name} href={`/explore?destination=${encodeURIComponent(d.name)}`} className="group flex-shrink-0 snap-start relative w-32 h-28 rounded-2xl overflow-hidden shadow-lg shadow-navy/5 hover:shadow-xl transition-all hover:-translate-y-1">
          <img src={d.img} alt={d.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#021F59]/70 via-[#021F59]/10 to-transparent" />
          <span className="absolute bottom-2 left-2 text-white font-bold text-sm tracking-tight drop-shadow-md">{d.name}</span>
        </Link>
      ))}
    </div>
  );
}
