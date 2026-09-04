"use client";

import React, { useMemo, useState } from 'react';
import { useFavorites } from '@/hooks/useFavorites';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { MOCK_PROPERTIES } from '@/lib/data';
import PropertyCard from '@/components/property/PropertyCard';
import { useCompareContext } from '@/context/CompareContext';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function FavoritesPage() {
  const router = useRouter();
  const { favorites } = useFavorites();
  const { compareIds } = useCompareContext();
  const [sortBy, setSortBy] = useState<string>('recent');
  const [typeFilter, setTypeFilter] = useState<string[]>([]);

  const properties = useMemo(
    () => favorites.map((f) => MOCK_PROPERTIES.find((p) => p.id === f.propertyId)).filter(Boolean) as typeof MOCK_PROPERTIES,
    [favorites]
  );

  const types = useMemo(() => Array.from(new Set(properties.map((p) => p.type))), [properties]);

  const filtered = useMemo(() => {
    const results = typeFilter.length > 0 ? properties.filter((p) => typeFilter.includes(p.type)) : [...properties];
    switch (sortBy) {
      case 'priceLow': results.sort((a, b) => a.price - b.price); break;
      case 'priceHigh': results.sort((a, b) => b.price - a.price); break;
      case 'rating': results.sort((a, b) => b.rating - a.rating); break;
    }
    return results;
  }, [properties, typeFilter, sortBy]);

  const comparedCount = favorites.filter((f) => compareIds.includes(f.propertyId)).length;

  if (properties.length === 0) {
    return (
      <div className="pt-32 pb-12 px-6 max-w-7xl mx-auto text-center">
        <div className="text-6xl mb-4">🤍</div>
        <h2 className="text-3xl font-bold text-navy mb-2">No saved stays yet</h2>
        <p className="text-navy/60 mb-8 max-w-md mx-auto">Start exploring and save places you&apos;d love to visit.</p>
        <Button onClick={() => router.push('/explore')}>Explore stays</Button>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-cream/50 transition-colors">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-3xl font-bold text-navy">Saved Stays</h1>
          <span className="bg-cream/50 text-navy px-3 py-1 rounded-full text-sm font-bold">{properties.length}</span>
        </div>

        {/* Type filters */}
        <div className="flex flex-wrap gap-2 mb-4">
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setTypeFilter((prev) => prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type])}
              className={cn("px-3 py-1.5 rounded-full text-sm font-medium transition-all", typeFilter.includes(type) ? "bg-navy text-cream" : "bg-cream/40 text-navy/60 hover:bg-cream/70")}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Sort + compare across favorites */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white border border-navy/10 rounded-xl px-4 py-2 text-sm font-medium text-navy outline-none focus:border-golden/40"
          >
            <option value="recent">Recently saved</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
          <div className="flex items-center gap-3">
            {comparedCount > 0 && (
              <button onClick={() => router.push('/compare')} className="px-4 py-2 bg-navy text-cream rounded-xl text-sm font-bold hover:bg-orange transition-colors">
                Compare selected ({comparedCount})
              </button>
            )}
            <span className="text-sm text-navy/50">{filtered.length} stays</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
          <AnimatePresence>
            {filtered.map((property, index) => (
              <motion.div
                key={property.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.03 }}
              >
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}