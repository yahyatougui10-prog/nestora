"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X, MessageCircle, Heart } from 'lucide-react';
import Link from 'next/link';

export function StickyNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-xl shadow-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-black text-[#021F59] tracking-tight">NESTORA</Link>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-[#021F59]/80">
            <Link href="/explore" className="hover:text-[#FFB909] transition-colors">Explore</Link>
            <Link href="/explore" className="hover:text-[#FFB909] transition-colors">Stays</Link>
            <Link href="/explore" className="hover:text-[#FFB909] transition-colors">Destinations</Link>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-5 text-[#021F59]/80">
          <Link href="/host" className="text-sm font-medium hover:text-[#021F59]">Become a Host</Link>
          <button className="hover:text-[#FFB909] transition-colors" aria-label="Favorites"><Heart size={20} /></button>
          <button className="hover:text-[#FFB909] transition-colors" aria-label="Messages"><MessageCircle size={20} /></button>
          <Link href="/profile" className="w-9 h-9 rounded-full bg-[#021F59] text-white flex items-center justify-center text-xs font-bold shadow-lg hover:shadow-xl transition-shadow">YM</Link>
        </div>
        <button className="md:hidden text-[#021F59]" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>
      {mobileOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t shadow-xl px-4 py-6 space-y-3">
          <Link href="/explore" className="block font-medium text-[#021F59]">Explore</Link>
          <Link href="/explore" className="block font-medium text-[#021F59]">Stays</Link>
          <Link href="/explore" className="block font-medium text-[#021F59]">Destinations</Link>
          <Link href="/host" className="block font-medium text-[#021F59]/70">Become a Host</Link>
        </div>
      )}
    </nav>
  );
}
