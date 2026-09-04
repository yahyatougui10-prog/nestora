"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { SmartImage } from '@/components/ui/SmartImage';

function ZelligeStar({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden className={className}>
      <g fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round">
        <path d="M8 1.5 L9.6 6.4 L14.5 8 L9.6 9.6 L8 14.5 L6.4 9.6 L1.5 8 L6.4 6.4 Z" />
        <path d="M8 5 L8.9 7.1 L11 8 L8.9 8.9 L8 11 L7.1 8.9 L5 8 L7.1 7.1 Z" />
        <circle cx="8" cy="8" r="0.9" fill="currentColor" fillOpacity="0.55" stroke="none" />
      </g>
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="relative h-[92vh] min-h-[600px] w-full overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2 }}
          className="w-full h-full"
        >
          <SmartImage
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750"
            alt="Luxury Villa"
            eager
            sizes="100vw"
            className="w-full h-full"
            imgClassName="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/40 to-navy/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/40 to-transparent" />
        <div aria-hidden className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[680px] glow-gold opacity-60 pointer-events-none" />
        <div aria-hidden className="absolute bottom-0 inset-x-0 h-28 pattern-zellige-gold opacity-60 pointer-events-none" />
      </div>

      {/* Arch door-frame framing the content */}
      <div aria-hidden className="absolute inset-x-0 top-14 flex justify-center pointer-events-none">
        <div className="hidden md:block w-[760px] h-[600px] rounded-[999px_999px_2rem_2rem] border border-white/15 bg-white/[0.03] backdrop-blur-none" />
      </div>

      {/* Floating zellige stars */}
      <div aria-hidden className="absolute top-24 left-[8%] text-golden/70 pointer-events-none animate-float-soft">
        <ZelligeStar className="w-9 h-9" />
      </div>
      <div aria-hidden className="absolute top-1/3 right-[7%] text-golden/40 pointer-events-none animate-float-soft" style={{ animationDelay: '1.5s' }}>
        <ZelligeStar className="w-6 h-6" />
      </div>
      <div aria-hidden className="absolute bottom-40 left-[14%] text-white/25 pointer-events-none animate-float-soft" style={{ animationDelay: '3s' }}>
        <ZelligeStar className="w-4 h-4" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-golden/20 text-golden rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-golden/20"
        >
          <ZelligeStar className="w-3.5 h-3.5" />
          Discover Morocco & Beyond
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight tracking-tight"
        >
          Find your next place <br />
          <span className="text-golden">to belong.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="text-lg md:text-xl text-cream/90 mb-10 max-w-2xl mx-auto font-light leading-relaxed"
        >
          Unique stays, unforgettable destinations, and spaces made for your journey.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <SearchBarHero />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-8 flex items-center justify-center gap-8 text-cream/70 text-sm"
        >
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-golden" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
            <span>24/7 Support</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-golden" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
            <span>Secure Booking</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-golden" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
            <span>Free Cancellation</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SearchBarHero() {
  const router = useRouter();
  const [query, setQuery] = React.useState('');
  const [checkIn, setCheckIn] = React.useState('');
  const [checkOut, setCheckOut] = React.useState('');
  const [guests, setGuests] = React.useState(2);
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (submitted) return;
    setSubmitted(true);
    const params = new URLSearchParams();
    if (query.trim()) params.set('location', query.trim());
    if (checkIn && checkOut) {
      if (checkIn <= checkOut) {
        params.set('checkIn', checkIn);
        params.set('checkOut', checkOut);
      }
    } else if (checkIn) {
      params.set('checkIn', checkIn);
    }
    params.set('guests', String(Math.max(1, guests)));
    router.push(`/explore${params.toString() ? `?${params.toString()}` : ''}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="arch-card bg-white/10 backdrop-blur-xl border border-white/25 p-1.5 shadow-2xl"
    >
      <div className="flex flex-col md:flex-row items-stretch">
        <div className="flex-1 px-4 py-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Where are you going?"
            aria-label="Destination"
            className="w-full bg-transparent text-white text-lg font-medium outline-none placeholder:text-white/50"
          />
        </div>
        <div className="w-px h-8 bg-white/20 hidden md:block" aria-hidden />
        <div className="flex-1 hidden md:flex items-center gap-2 px-4 py-3 text-white/70 text-sm">
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            aria-label="Check-in"
            className="bg-transparent outline-none text-inherit w-32 [color-scheme:dark]"
          />
        </div>
        <div className="w-px h-8 bg-white/20 hidden md:block" aria-hidden />
        <div className="flex-1 hidden md:flex items-center gap-2 px-4 py-3 text-white/70 text-sm">
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            aria-label="Check-out"
            className="bg-transparent outline-none text-inherit w-32 [color-scheme:dark]"
          />
        </div>
        <div className="w-px h-8 bg-white/20 hidden md:block" aria-hidden />
        <div className="flex-1 hidden md:flex items-center gap-2 px-4 py-3 text-white/70 text-sm">
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setGuests((g) => Math.max(1, g - 1))}
              aria-label="Fewer guests"
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white text-lg leading-none"
            >
              −
            </button>
            <span className="text-white font-semibold w-6 text-center">{guests}</span>
            <button
              type="button"
              onClick={() => setGuests((g) => Math.min(16, g + 1))}
              aria-label="More guests"
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white text-lg leading-none"
            >
              +
            </button>
          </div>
        </div>
        <button type="submit" className="button-press bg-golden hover:bg-orange text-navy font-bold px-8 py-3 rounded-xl transition-colors shadow-lg">
          Search
        </button>
      </div>
    </form>
  );
}