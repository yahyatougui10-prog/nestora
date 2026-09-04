"use client";

import React, { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { StickyNavbar } from '@/components/home/StickyNavbar';
import { DestinationChips } from '@/components/home/DestinationChips';
import { PremiumSearchBar } from '@/components/home/PremiumSearchBar';
import PropertyCard from '@/components/property/PropertyCard';
import { MapView } from '@/components/property/MapView';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_PROPERTIES } from '@/lib/data';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { SlidersHorizontal, ChevronDown, LayoutGrid, Map } from 'lucide-react';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function ExploreContent() {
  const urlParams = useSearchParams();
  const [sortBy, setSortBy] = useState<string>(urlParams.get('sortBy') || 'recommended');
  const [priceFilter, setPriceFilter] = useState<[number, number]>([0, 1000]);
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [typeFilter, setTypeFilter] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [loading, setLoading] = useState(true);

  const location = urlParams.get('location') || urlParams.get('destination') || 'All destinations';
  const guestsParam = urlParams.get('guests');
  const guests = guestsParam ? Math.max(1, parseInt(guestsParam)) : 2;

  const types = ['Apartment', 'Villa', 'House', 'Cabin', 'Riad', 'Hotel', 'Guesthouse', 'Resort'];

  const filtered = useMemo(() => {
    let results = [...MOCK_PROPERTIES];
    const loc = location.toLowerCase();
    if (location !== 'All destinations') {
      results = results.filter(p =>
        (p.city?.toLowerCase() || '').includes(loc) ||
        (p.location?.toLowerCase() || '').includes(loc) ||
        (p.country?.toLowerCase() || '').includes(loc) ||
        (p.category?.toLowerCase() || '').includes(loc)
      );
    }
    if (priceFilter[0] > 0) results = results.filter(p => p.price >= priceFilter[0]);
    if (priceFilter[1] < 1000) results = results.filter(p => p.price <= priceFilter[1]);
    if (ratingFilter) results = results.filter(p => p.rating >= ratingFilter);
    if (typeFilter.length > 0) results = results.filter(p => typeFilter.includes(p.type));
    switch (sortBy) {
      case 'priceLow': results.sort((a, b) => a.price - b.price); break;
      case 'priceHigh': results.sort((a, b) => b.price - a.price); break;
      case 'rating': results.sort((a, b) => b.rating - a.rating); break;
      case 'reviews': results.sort((a, b) => b.reviews - a.reviews); break;
    }
    return results;
  }, [location, priceFilter, ratingFilter, typeFilter, sortBy]);

  useEffect(() => { setTimeout(() => setLoading(false), 400); }, []);

  const typeBtn = (t: string) => cn("px-3 py-1.5 rounded-full text-xs font-bold border-2 transition-all", typeFilter.includes(t) ? "bg-[#021F59] text-white border-[#021F59]" : "bg-white text-navy/60 border-navy/10 hover:border-[#FFB909]");

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <StickyNavbar />

      <section className="pt-28 pb-8 px-4 sm:px-6 bg-gradient-to-b from-[#021F59] via-[#021F59]/95 to-[#021F59]/80 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-3 tracking-tight">Explore Stays</h1>
          <p className="text-white/70 text-base md:text-lg mb-8 max-w-xl">Find a place that feels like home. {filtered.length} stays near {location}.</p>
          <PremiumSearchBar />
        </div>
      </section>

      <section className="py-6 px-4 sm:px-6 max-w-7xl mx-auto">
        <DestinationChips />
      </section>

      <section className="py-4 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-black text-[#021F59]">{filtered.length} places to stay</h2>
            <p className="text-sm text-navy/50">Showing stays based on your search · {guests} {guests === 1 ? 'guest' : 'guests'}</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-navy/10 text-sm font-bold text-navy shadow-sm hover:shadow hover:border-[#FFB909]/40 transition-all"><SlidersHorizontal size={16} /> Filters</button>
            <button onClick={() => { const opts = ['recommended','priceLow','priceHigh','rating','reviews']; const i = opts.indexOf(sortBy); setSortBy(opts[(i+1)%opts.length]); }} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-navy/10 text-sm font-bold text-navy shadow-sm hover:shadow transition-all">{sortBy === 'recommended' ? 'Recommended' : sortBy === 'priceLow' ? 'Price: Low' : sortBy === 'priceHigh' ? 'Price: High' : sortBy === 'rating' ? 'Highest Rated' : 'Most Reviewed'} <ChevronDown size={14} /></button>
            <div className="flex bg-white rounded-xl border border-navy/10 overflow-hidden shadow-sm">
              <button onClick={() => setViewMode('list')} className={cn("p-2.5 transition-colors", viewMode === 'list' ? "bg-[#021F59] text-white" : "text-navy/40 hover:text-navy")} aria-label="List"><LayoutGrid size={18} /></button>
              <button onClick={() => setViewMode('map')} className={cn("p-2.5 transition-colors", viewMode === 'map' ? "bg-[#021F59] text-white" : "text-navy/40 hover:text-navy")} aria-label="Map"><Map size={18} /></button>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {showFilters && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden px-4 sm:px-6 max-w-7xl mx-auto">
            <div className="bg-white rounded-3xl border border-cream/20 shadow-xl p-6 mb-6 space-y-6">
              <div><h3 className="font-black text-[#021F59] mb-3 text-sm">Property Type</h3><div className="flex flex-wrap gap-2">{types.map(t => <button key={t} onClick={() => setTypeFilter(p => p.includes(t) ? p.filter(x => x !== t) : [...p, t])} className={typeBtn(t)}>{t}</button>)}</div></div>
              <div><h3 className="font-black text-[#021F59] mb-3 text-sm">Rating</h3><div className="flex gap-2">{[4.5, 4.0, 3.5].map(r => <button key={r} onClick={() => setRatingFilter(ratingFilter === r ? null : r)} className={cn("px-4 py-2 rounded-full text-sm font-bold border-2 transition-all", ratingFilter === r ? "bg-[#021F59] text-white border-[#021F59]" : "bg-white text-navy/50 border-navy/10 hover:border-[#FFB909]")}>★ {r}+</button>)}</div></div>
              <div className="flex justify-between items-center pt-4 border-t border-navy/5"><button onClick={() => { setPriceFilter([0, 1000]); setTypeFilter([]); setRatingFilter(null); }} className="text-sm font-bold text-[#021F59] hover:text-[#FB8605]">Clear all</button></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="px-4 sm:px-6 max-w-7xl mx-auto pb-24">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-cream/20 animate-pulse">
                <div className="aspect-[4/3] bg-navy/5" />
                <div className="p-4 space-y-3"><div className="h-5 bg-navy/10 rounded-lg w-3/4" /><div className="h-3 bg-navy/10 rounded-lg w-1/2" /><div className="h-4 bg-navy/10 rounded-lg w-1/4" /></div>
              </div>
            ))}
          </div>
        ) : viewMode === 'map' ? (
          <MapView properties={filtered.map(p => ({ id: p.id, name: p.name, price: p.price }))} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((property, i) => (
              <motion.div key={property.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-black text-[#021F59] mb-2">No stays found</h3>
            <p className="text-navy/60 mb-6">Try adjusting your filters or searching another destination.</p>
            <button onClick={() => { setPriceFilter([0, 1000]); setTypeFilter([]); setRatingFilter(null); }} className="px-6 py-3 bg-[#021F59] text-white font-bold rounded-xl shadow-lg">Clear filters</button>
          </div>
        )}
      </main>
    </div>
  );
}
