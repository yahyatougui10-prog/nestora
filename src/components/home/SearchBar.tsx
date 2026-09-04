"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Users, ChevronDown, ChevronUp, Filter, Search, X } from 'lucide-react';
import { useSearch } from '@/hooks/useSearch';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { DatePicker } from './DatePicker';
import { GuestSelector } from './GuestSelector';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function SearchBar({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const { searchParams, updateSearch, suggestions, searchByLocation, clearSearch, performSearch } = useSearch();
  const [isActive, setIsActive] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGuestSelector, setShowGuestSelector] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
        setShowDatePicker(false);
        setShowGuestSelector(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = useCallback(() => {
    performSearch();
    const params = new URLSearchParams();
    if (searchParams.location) params.set('location', searchParams.location);
    if (searchParams.checkIn) params.set('checkIn', searchParams.checkIn);
    if (searchParams.checkOut) params.set('checkOut', searchParams.checkOut);
    params.set('guests', String(searchParams.guests));
    if (searchParams.sortBy !== 'recommended') params.set('sortBy', searchParams.sortBy);
    router.push(`/explore?${params.toString()}`);
  }, [searchParams, performSearch, router]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleSearch();
      }
    },
    [handleSearch]
  );

  const selectedDates =
    searchParams.checkIn && searchParams.checkOut
      ? `${searchParams.checkIn} – ${searchParams.checkOut}`
      : 'Add dates';

  const guestText =
    searchParams.guests === 1
      ? `${searchParams.adults} guest`
      : `${searchParams.guests} guests`;

  if (compact) {
    return (
      <div className="flex items-center bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-1.5 gap-1">
        <button
          onClick={() => setShowDatePicker(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white/90 text-sm hover:bg-white/10 transition-colors"
        >
          <Calendar size={16} />
          <span>{selectedDates}</span>
        </button>
        <div className="w-px h-6 bg-white/20" />
        <button
          onClick={() => setShowGuestSelector(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white/90 text-sm hover:bg-white/10 transition-colors"
        >
          <Users size={16} />
          <span>{guestText}</span>
        </button>
        <button onClick={handleSearch} className="bg-golden hover:bg-orange text-navy font-bold px-5 py-2.5 rounded-xl transition-colors">
          Search
        </button>
      </div>
    );
  }

  return (
    <div className="relative max-w-5xl mx-auto w-full px-4" ref={wrapperRef}>
      <AnimatePresence>
        {showDatePicker && (
          <DatePicker
            onClose={() => setShowDatePicker(false)}
            checkIn={searchParams.checkIn}
            checkOut={searchParams.checkOut}
            onSelect={(checkIn, checkOut) => {
              updateSearch({ checkIn, checkOut });
              setShowDatePicker(false);
            }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showGuestSelector && (
          <GuestSelector
            onClose={() => setShowGuestSelector(false)}
            guests={searchParams.guests}
            adults={searchParams.adults}
            childCount={searchParams.children}
            infants={searchParams.infants}
            pets={searchParams.pets}
            onSelect={(guests, adults, childCount, infants, pets) => {
              updateSearch({ guests, adults, children: childCount, infants, pets });
              setShowGuestSelector(false);
            }}
          />
        )}
      </AnimatePresence>

      <motion.div
        layout
        className={cn(
          "flex flex-col md:flex-row items-stretch bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-300",
          "border-2 border-transparent focus-within:border-golden/40",
          isActive && "shadow-golden/20"
        )}
      >
        <div className="flex-1 flex flex-col md:flex-row">
          {/* Location with Autocomplete */}
          <div className="relative flex-1 px-5 py-4 border-b md:border-b-0 md:border-r border-navy/10">
            <div className="flex items-center gap-3">
              <MapPin size={18} className="text-golden shrink-0" />
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={searchParams.location}
                  onChange={(e) => {
                    searchByLocation(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setIsActive(true)}
                  onKeyDown={handleKeyDown}
                  placeholder="Where are you going?"
                  className="w-full bg-transparent text-navy font-medium text-lg outline-none placeholder:text-navy/30"
                />
                <AnimatePresence>
                  {showSuggestions && suggestions.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="absolute top-full left-0 right-0 bg-white rounded-xl shadow-xl border border-navy/10 mt-1 overflow-hidden z-20"
                    >
                      {suggestions.map((suggestion) => (
                        <button
                          key={suggestion}
                          onClick={() => {
                            searchByLocation(suggestion);
                            setShowSuggestions(false);
                          }}
                          className="w-full text-left px-5 py-3 text-navy hover:bg-cream/50 transition-colors flex items-center gap-3"
                        >
                          <MapPin size={14} className="text-navy/40" />
                          {suggestion}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Dates */}
          <button
            onClick={() => setShowDatePicker(true)}
            className="flex items-center gap-3 px-5 py-4 border-b md:border-b-0 md:border-r border-navy/10 hover:bg-cream/30 transition-colors text-left"
          >
            <Calendar size={18} className="text-golden shrink-0" />
            <div>
              <span className="text-[10px] font-bold text-navy uppercase tracking-wider block">Check-in</span>
              <span className="text-sm font-medium text-navy">{selectedDates}</span>
            </div>
          </button>

          {/* Guests */}
          <button
            onClick={() => setShowGuestSelector(true)}
            className="flex items-center gap-3 px-5 py-4 border-b md:border-b-0 md:border-r border-navy/10 hover:bg-cream/30 transition-colors text-left"
          >
            <Users size={18} className="text-golden shrink-0" />
            <div>
              <span className="text-[10px] font-bold text-navy uppercase tracking-wider block">Guests</span>
              <span className="text-sm font-medium text-navy">{guestText}</span>
            </div>
          </button>
        </div>

        {/* Search Button */}
        <div className="p-2 md:p-3 bg-golden flex items-center justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSearch}
            className="w-full h-full bg-navy hover:bg-orange text-cream font-bold px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span className="hidden md:inline">Search</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}