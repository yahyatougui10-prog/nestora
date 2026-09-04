"use client";

import React, { useState, useEffect } from 'react';
import { Search, MapPin, CalendarDays } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';

export function PremiumSearchBar() {
  const params = useSearchParams();
  const router = useRouter();
  const [location, setLocation] = useState(params.get('destination') || 'M Marrakech');
  const [guests, setGuests] = useState(Number(params.get('guests')) || 2);

  useEffect(() => {
    const g = params.get('guests');
    if (g) setGuests(Math.max(1, parseInt(g)));
  }, [params]);

  const handleSearch = () => {
    const q = new URLSearchParams();
    q.set('location', location);
    q.set('guests', String(guests));
    router.push(`/explore?${q.toString()}`);
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-2 max-w-4xl mx-auto border border-cream/30">
      <div className="flex flex-col md:flex-row items-stretch gap-2">
        <div className="flex-1 flex items-center gap-3 px-5 py-3 md:border-r md:border-navy/5">
          <MapPin className="text-[#FFB909] shrink-0" size={20} />
          <div className="flex-1">
            <label htmlFor="loc" className="block text-[10px] font-bold uppercase text-navy/40 tracking-wide">Location</label>
            <input id="loc" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full bg-transparent outline-none text-sm font-medium text-navy placeholder:text-navy/40" placeholder="Where are you going?" />
          </div>
        </div>
        <div className="flex-1 flex items-center gap-3 px-5 py-3 md:border-r md:border-navy/5">
          <CalendarDays className="text-[#FFB909] shrink-0" size={20} />
          <div className="flex-1">
            <label className="block text-[10px] font-bold uppercase text-navy/40 tracking-wide">Guests</label>
            <button onClick={() => setGuests(Math.max(1, guests - 1))} className="text-xs font-bold text-navy/60 hover:text-navy mr-2">−</button>
            <span className="text-sm font-medium text-navy">{guests} {guests === 1 ? 'guest' : 'guests'}</span>
            <button onClick={() => setGuests(guests + 1)} className="text-xs font-bold text-navy/60 hover:text-navy ml-2">+</button>
          </div>
        </div>
        <button onClick={handleSearch} className="bg-[#021F59] hover:bg-[#032a6e] text-white font-bold rounded-2xl px-7 py-3.5 md:py-0 flex items-center justify-center gap-2 shadow-lg shadow-[#021F59]/20 transition-all hover:scale-[1.02] active:scale-[0.98]">
          <Search size={18} /> Search
        </button>
      </div>
    </div>
  );
}
