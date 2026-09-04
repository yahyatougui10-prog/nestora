"use client";

import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { useSearch } from '@/hooks/useSearch';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const AMENITIES = [
  'Wi-Fi', 'Pool', 'Parking', 'Air conditioning', 'Kitchen',
  'Washer', 'Dryer', 'Gym', 'Spa', 'Pet friendly'
];

const PROPERTY_TYPES = [
  'Villa', 'Apartment', 'Riad', 'House', 'Studio', 'Cabin', 'Guesthouse', 'Hotel'
];

const RATINGS = [4.5, 4.0, 3.5];

export function FilterDrawer() {
  const { searchParams, updateSearch } = useSearch();
  const router = useRouter();
  const [active, setActive] = useState<'price' | 'type' | 'rating' | 'amenities' | 'guests'>('price');
  const [priceFilter, setPriceFilter] = useState<[number, number]>([
    searchParams.priceRange?.[0] || 0,
    searchParams.priceRange?.[1] || 1000
  ]);
  const [typeFilter, setTypeFilter] = useState<string[]>(
    searchParams.propertyTypes || []
  );
  const [ratingFilter, setRatingFilter] = useState<number | null>(
    searchParams.ratings?.[0] || null
  );
  const [guestFilter, setGuestFilter] = useState<number>(
    searchParams.guests || 2
  );

  const applyFilters = useCallback(() => {
    const params: any = {};
    if (priceFilter[0] > 0) params.priceRange = [priceFilter[0], priceFilter[1]];
    if (typeFilter.length > 0) params.propertyTypes = typeFilter;
    if (ratingFilter) params.ratings = [ratingFilter];
    if (guestFilter && guestFilter !== 2) params.guests = guestFilter;
    updateSearch(params);
    router.push(`/explore?${new URLSearchParams(params).toString()}`);
  }, [priceFilter, typeFilter, ratingFilter, guestFilter, updateSearch, router]);

  const resetFilters = useCallback(() => {
    setPriceFilter([0, 1000]);
    setTypeFilter([]);
    setRatingFilter(null);
    setGuestFilter(2);
    updateSearch({});
    router.push('/explore');
  }, [updateSearch, router]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="fixed inset-0 z-[50] bg-navy/80 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && setActive('price')}
    >
      <div className="fixed top-0 left-0 right-0 max-w-[480px] mx-auto bottom-0 bg-white shadow-2xl p-6 sm:p-8 transform transition-transform duration-300 ease-out" style={active === 'price' ? { transform: 'translateY(0)' } : { transform: 'translateY(100%)' }}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-navy">Filters</h3>
          <button onClick={() => setActive('price')} className="text-navy/60 text-sm hover:text-golden transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-5">
          {/* Price Range */}
          {active === 'price' && (
            <div>
              <p className="text-sm text-navy/50 mb-2">Price range</p>
              <div className="flex gap-3">
                <input
                  type="number"
                  value={priceFilter[0]}
                  onChange={(e) => setPriceFilter([Number(e.target.value), priceFilter[1]])}
                  className="flex-1 px-3 py-2 rounded-xl border border-navy/10 outline-none focus:border-golden/40 text-sm"
                />
                <span className="text-navy/30">—</span>
                <input
                  type="number"
                  value={priceFilter[1]}
                  onChange={(e) => setPriceFilter([priceFilter[0], Number(e.target.value)])}
                  className="flex-1 px-3 py-2 rounded-xl border border-navy/10 outline-none focus:border-golden/40 text-sm"
                />
              </div>
            </div>
          )}

          {/* Property Type */}
          {active === 'type' && (
            <div>
              <p className="text-sm text-navy/50 mb-3">Property type</p>
              <div className="flex flex-wrap gap-1">
                {PROPERTY_TYPES.map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setTypeFilter((prev) =>
                        prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
                      );
                    }}
                    className={cn(
                      "px-3 py-1.5 rounded-xl text-xs font-medium transition-all",
                      typeFilter.includes(type)
                        ? "bg-golden text-navy"
                        : "bg-cream/20 text-navy/60 hover:bg-cream/30"
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Rating */}
          {active === 'rating' && (
            <div>
              <p className="text-sm text-navy/50 mb-3">Minimum rating</p>
              <div className="flex gap-2">
                {RATINGS.map((r) => (
                  <button
                    key={r}
                    onClick={() => setRatingFilter(ratingFilter === r ? null : r)}
                    className={cn(
                      "px-3 py-1.5 rounded-xl text-xs font-medium transition-all",
                      ratingFilter === r ? "border-golden bg-golden/10 text-navy" : "border-navy/10 text-navy/50 hover:border-golden"
                    )}
                  >
                    ★ {r}+
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Guests */}
          {active === 'guests' && (
            <div>
              <p className="text-sm text-navy/50 mb-3">Guests</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setGuestFilter((g) => Math.max(1, g - 1))}
                  className="flex-1 px-3 py-2 rounded-xl border border-navy/10 text-sm font-medium hover:bg-cream/20 transition-colors"
                  disabled={guestFilter <= 1}
                >
                  −
                </button>
                <span className="font-medium text-navy">{guestFilter}</span>
                <button
                  onClick={() => setGuestFilter((g) => g + 1)}
                  className="flex-1 px-3 py-2 rounded-xl border border-navy/10 text-sm font-medium hover:bg-cream/20 transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* Amenities */}
          {active === 'amenities' && (
            <div>
              <p className="text-sm text-navy/50 mb-3">Amenities</p>
              <div className="grid grid-cols-2 gap-2">
                {AMENITIES.map((amenity) => (
                  <button
                    key={amenity}
                    onClick={() => setActive('amenities')}
                    className="px-3 py-1 rounded-xl text-xs font-medium transition-all text-navy/60 hover:bg-cream/20"
                    aria-checked={false}
                  >
                    {amenity}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="pt-4 border-t border-navy/10">
            <button
              onClick={applyFilters}
              className="w-full py-2.5 bg-golden text-navy font-bold rounded-xl text-sm hover:bg-orange transition-colors"
            >
              Apply
            </button>
            <button
              onClick={resetFilters}
              className="w-full py-2.5 bg-white rounded-xl text-navy font-bold text-sm hover:bg-cream/20 transition-colors margin-y-2"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}