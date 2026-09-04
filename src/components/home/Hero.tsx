"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { SmartImage } from '@/components/ui/SmartImage';

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
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-block px-3 py-1.5 bg-golden/20 text-golden rounded-full text-xs font-bold uppercase tracking-widest mb-6"
        >
          ✦ Discover Morocco & Beyond
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
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (submitted) return;
    setSubmitted(true);
    const params = new URLSearchParams();
    if (query.trim()) params.set('location', query.trim());
    router.push(`/explore${params.toString() ? `?${params.toString()}` : ''}`);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-1.5">
      <div className="flex flex-col md:flex-row items-stretch">
        <div className="flex-1 px-4 py-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Where are you going?"
            className="w-full bg-transparent text-white text-lg font-medium outline-none placeholder:text-white/50"
          />
        </div>
        <div className="w-px h-8 bg-white/20 hidden md:block" />
        <div className="flex items-center px-4 py-3 text-white/70 text-sm hidden md:flex">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          Any dates
        </div>
        <div className="flex items-center px-4 py-3 text-white/70 text-sm hidden md:flex">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          Guests
        </div>
        <button type="submit" className="bg-golden hover:bg-orange text-navy font-bold px-6 py-3 rounded-xl transition-colors">
          Search
        </button>
      </div>
    </form>
  );
}