"use client";

import React, { useState } from 'react';
import { Search, MapPin, Minus, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

function parseGuests(value: string | null): number {
  if (!value) return 2;
  const n = parseInt(value, 10);
  return Number.isFinite(n) && n >= 1 && n <= 16 ? n : 2;
}

function parseDate(value: string | null): string {
  if (!value) return '';
  return /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : '';
}

export function PremiumSearchBar() {
  const params = useSearchParams();
  const router = useRouter();

  const [location, setLocation] = useState(params.get('destination') || params.get('location') || '');
  const [checkIn, setCheckIn] = useState(parseDate(params.get('checkIn')));
  const [checkOut, setCheckOut] = useState(parseDate(params.get('checkOut')));
  const [guests, setGuests] = useState<number>(() => parseGuests(params.get('guests')));
  const [error, setError] = useState<string | null>(null);

  const handleSearch = () => {
    if (checkIn && checkOut && checkIn > checkOut) {
      setError('Check-out must be after check-in.');
      return;
    }
    setError(null);
    const q = new URLSearchParams();
    if (location.trim()) q.set('location', location.trim());
    if (checkIn) q.set('checkIn', checkIn);
    if (checkOut) q.set('checkOut', checkOut);
    q.set('guests', String(guests));
    router.push(`/explore?${q.toString()}`);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-2 max-w-4xl mx-auto border border-cream/30 relative">
      <form
        onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
        className="flex flex-col md:flex-row items-stretch gap-2"
      >
        <div className="flex-1 flex items-center gap-3 px-5 py-3 md:border-r md:border-navy/5">
          <MapPin className="text-golden shrink-0" size={20} />
          <div className="flex-1">
            <label htmlFor="loc" className="block text-[10px] font-bold uppercase text-navy/40 tracking-wide">Where</label>
            <input id="loc" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full bg-transparent outline-none text-sm font-medium text-navy placeholder:text-navy/40" placeholder="Where are you going?" autoComplete="off" />
          </div>
        </div>
        <div className="flex-1 flex items-center gap-3 px-5 py-3 md:border-r md:border-navy/5">
          <div className="flex-1">
            <label htmlFor="checkin" className="block text-[10px] font-bold uppercase text-navy/40 tracking-wide">Check-in</label>
            <input id="checkin" type="date" value={checkIn} min={today} max={checkOut || undefined} onChange={(e) => { setCheckIn(e.target.value); setError(null); }} className="w-full bg-transparent outline-none text-sm font-medium text-navy [color-scheme:light]" />
          </div>
        </div>
        <div className="flex-1 flex items-center gap-3 px-5 py-3 md:border-r md:border-navy/5">
          <div className="flex-1">
            <label htmlFor="checkout" className="block text-[10px] font-bold uppercase text-navy/40 tracking-wide">Check-out</label>
            <input id="checkout" type="date" value={checkOut} min={checkIn || today} onChange={(e) => { setCheckOut(e.target.value); setError(null); }} className="w-full bg-transparent outline-none text-sm font-medium text-navy [color-scheme:light]" />
          </div>
        </div>
        <div className="flex-1 flex items-center gap-3 px-5 py-3">
          <div className="flex-1">
            <label className="block text-[10px] font-bold uppercase text-navy/40 tracking-wide">Guests</label>
            <div className="flex items-center gap-2 mt-0.5">
              <button type="button" onClick={() => setGuests(Math.max(1, guests - 1))} aria-label="Fewer guests" className="grid place-items-center w-8 h-8 rounded-full border border-navy/10 text-navy/70 hover:border-golden hover:text-navy transition-colors">
                <Minus size={14} />
              </button>
              <span className="text-sm font-semibold text-navy w-8 text-center">{guests}</span>
              <button type="button" onClick={() => setGuests(Math.min(16, guests + 1))} aria-label="More guests" className="grid place-items-center w-8 h-8 rounded-full border border-navy/10 text-navy/70 hover:border-golden hover:text-navy transition-colors">
                <Plus size={14} />
              </button>
            </div>
          </div>
        </div>
        <button type="submit" className="button-press bg-navy hover:bg-[#032a6e] text-white font-bold rounded-2xl px-7 py-3.5 md:py-0 flex items-center justify-center gap-2 shadow-lg shadow-navy/20 transition-all">
          <Search size={18} /> Search
        </button>
      </form>
      {error && (
        <p role="alert" className="absolute -bottom-6 left-4 text-xs font-semibold text-orange">{error}</p>
      )}
    </div>
  );
}