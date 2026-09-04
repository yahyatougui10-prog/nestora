"use client";

import React, { useMemo, useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { DestinationChips } from '@/components/home/DestinationChips';
import { PremiumSearchBar } from '@/components/home/PremiumSearchBar';
import PropertyCard from '@/components/property/PropertyCard';
import { MapView } from '@/components/property/MapView';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_PROPERTIES } from '@/lib/data';
import { cn } from '@/lib/utils';
import {
  SlidersHorizontal, ChevronDown, LayoutGrid, Map as MapIcon,
  Check, X, SearchX
} from 'lucide-react';

const SORT_OPTIONS = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'priceLow', label: 'Price: Low to High' },
  { value: 'priceHigh', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'reviews', label: 'Most Reviewed' },
];

const RATING_OPTIONS = [4.5, 4.0, 3.5];
const PRICE_MAX = 1000;

function parsePrice(value: string | null, fallback: number): number {
  if (!value) return fallback;
  const n = Number(value);
  return Number.isFinite(n) && n >= 0 ? n : fallback;
}

export default function ExploreContent() {
  const urlParams = useSearchParams();
  const [sortBy, setSortBy] = useState<string>(() => {
    const s = urlParams.get('sortBy');
    return SORT_OPTIONS.some((o) => o.value === s) && s ? s : 'recommended';
  });
  const [priceFilter, setPriceFilter] = useState<[number, number]>(() => [
    Math.min(parsePrice(urlParams.get('minPrice'), 0), PRICE_MAX),
    Math.min(parsePrice(urlParams.get('maxPrice'), PRICE_MAX), PRICE_MAX),
  ]);
  const [ratingFilter, setRatingFilter] = useState<number | null>(() => {
    const r = Number(urlParams.get('rating'));
    return Number.isFinite(r) && r > 0 ? r : null;
  });
  const [typeFilter, setTypeFilter] = useState<string[]>(() =>
    (urlParams.get('type') || '').split(',').filter(Boolean)
  );
  const [bedroomsMin, setBedroomsMin] = useState<number | null>(null);
  const [bathsMin, setBathsMin] = useState<number | null>(null);
  const [guestsMin, setGuestsMin] = useState<number | null>(null);
  const [amenitiesFilter, setAmenitiesFilter] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  const [draftPrice, setDraftPrice] = useState<[number, number]>([0, PRICE_MAX]);
  const [draftRating, setDraftRating] = useState<number | null>(null);
  const [draftTypes, setDraftTypes] = useState<string[]>([]);
  const [draftBedroomsMin, setDraftBedroomsMin] = useState<number | null>(null);
  const [draftBathsMin, setDraftBathsMin] = useState<number | null>(null);
  const [draftGuestsMin, setDraftGuestsMin] = useState<number | null>(null);
  const [draftAmenities, setDraftAmenities] = useState<string[]>([]);

  const sortWrapperRef = useRef<HTMLDivElement>(null);

  const location = urlParams.get('location') || urlParams.get('destination') || 'All destinations';
  const guestsParam = urlParams.get('guests');
  const guests = guestsParam ? Math.max(1, parseInt(guestsParam, 10) || 1) : 2;

  const types = useMemo(
    () => Array.from(new Set(MOCK_PROPERTIES.map((p) => p.type))),
    []
  );

  const amenities = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of MOCK_PROPERTIES) {
      for (const a of p.amenities ?? []) counts.set(a, (counts.get(a) || 0) + 1);
    }
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 12)
      .map(([name]) => name);
  }, []);

  const filtered = useMemo(() => {
    let results = [...MOCK_PROPERTIES];
    const loc = location.toLowerCase();
    if (location !== 'All destinations') {
      results = results.filter((p) =>
        (p.city?.toLowerCase() || '').includes(loc) ||
        (p.location?.toLowerCase() || '').includes(loc) ||
        (p.country?.toLowerCase() || '').includes(loc) ||
        (p.category?.toLowerCase() || '').includes(loc)
      );
    }
    if (priceFilter[0] > 0) results = results.filter((p) => p.price >= priceFilter[0]);
    if (priceFilter[1] < PRICE_MAX) results = results.filter((p) => p.price <= priceFilter[1]);
    if (ratingFilter) results = results.filter((p) => p.rating >= ratingFilter);
    if (typeFilter.length > 0) results = results.filter((p) => typeFilter.includes(p.type));
    if (bedroomsMin) results = results.filter((p) => p.bedrooms >= bedroomsMin);
    if (bathsMin) results = results.filter((p) => p.baths >= bathsMin);
    if (guestsMin) results = results.filter((p) => p.guests >= guestsMin);
    if (amenitiesFilter.length > 0) {
      results = results.filter((p) => amenitiesFilter.every((a) => (p.amenities ?? []).includes(a)));
    }
    switch (sortBy) {
      case 'priceLow': results.sort((a, b) => a.price - b.price); break;
      case 'priceHigh': results.sort((a, b) => b.price - a.price); break;
      case 'rating': results.sort((a, b) => b.rating - a.rating); break;
      case 'reviews': results.sort((a, b) => b.reviews - a.reviews); break;
    }
    return results;
  }, [location, priceFilter, ratingFilter, typeFilter, bedroomsMin, bathsMin, guestsMin, amenitiesFilter, sortBy]);

  const sortLabel = SORT_OPTIONS.find((o) => o.value === sortBy)?.label || 'Recommended';

  const activeFilterCount =
    (priceFilter[0] > 0 || priceFilter[1] < PRICE_MAX ? 1 : 0) +
    (ratingFilter ? 1 : 0) +
    typeFilter.length +
    (bedroomsMin ? 1 : 0) +
    (bathsMin ? 1 : 0) +
    (guestsMin ? 1 : 0) +
    amenitiesFilter.length;

  const draftCount = useMemo(() => {
    let results = [...MOCK_PROPERTIES];
    const loc = location.toLowerCase();
    if (location !== 'All destinations') {
      results = results.filter((p) =>
        (p.city?.toLowerCase() || '').includes(loc) ||
        (p.location?.toLowerCase() || '').includes(loc) ||
        (p.country?.toLowerCase() || '').includes(loc) ||
        (p.category?.toLowerCase() || '').includes(loc)
      );
    }
    if (draftPrice[0] > 0) results = results.filter((p) => p.price >= draftPrice[0]);
    if (draftPrice[1] < PRICE_MAX) results = results.filter((p) => p.price <= draftPrice[1]);
    if (draftRating) results = results.filter((p) => p.rating >= draftRating);
    if (draftTypes.length > 0) results = results.filter((p) => draftTypes.includes(p.type));
    if (draftBedroomsMin) results = results.filter((p) => p.bedrooms >= draftBedroomsMin);
    if (draftBathsMin) results = results.filter((p) => p.baths >= draftBathsMin);
    if (draftGuestsMin) results = results.filter((p) => p.guests >= draftGuestsMin);
    if (draftAmenities.length > 0) {
      results = results.filter((p) => draftAmenities.every((a) => (p.amenities ?? []).includes(a)));
    }
    return results.length;
  }, [location, draftPrice, draftRating, draftTypes, draftBedroomsMin, draftBathsMin, draftGuestsMin, draftAmenities]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSortMenuOpen(false);
        setSheetOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (sortWrapperRef.current && !sortWrapperRef.current.contains(e.target as Node)) {
        setSortMenuOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, []);

  useEffect(() => {
    if (sheetOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [sheetOpen]);

  const openSheet = () => {
    setDraftPrice(priceFilter);
    setDraftRating(ratingFilter);
    setDraftTypes(typeFilter);
    setDraftBedroomsMin(bedroomsMin);
    setDraftBathsMin(bathsMin);
    setDraftGuestsMin(guestsMin);
    setDraftAmenities(amenitiesFilter);
    setSheetOpen(true);
  };

  const applySheet = () => {
    setPriceFilter(draftPrice);
    setRatingFilter(draftRating);
    setTypeFilter(draftTypes);
    setBedroomsMin(draftBedroomsMin);
    setBathsMin(draftBathsMin);
    setGuestsMin(draftGuestsMin);
    setAmenitiesFilter(draftAmenities);
    setSheetOpen(false);
  };

  const resetAll = () => {
    setPriceFilter([0, PRICE_MAX]);
    setRatingFilter(null);
    setTypeFilter([]);
    setBedroomsMin(null);
    setBathsMin(null);
    setGuestsMin(null);
    setAmenitiesFilter([]);
    setShowFilters(false);
  };

  const resetDraft = () => {
    setDraftPrice([0, PRICE_MAX]);
    setDraftRating(null);
    setDraftTypes([]);
    setDraftBedroomsMin(null);
    setDraftBathsMin(null);
    setDraftGuestsMin(null);
    setDraftAmenities([]);
  };

  const chipClass = (active: boolean) =>
    cn(
      'shrink-0 whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold border-2 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-golden active:scale-95',
      active
        ? 'bg-navy text-cream border-navy shadow-sm'
        : 'bg-white text-navy/60 border-navy/10 hover:border-golden/60'
    );

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <section className="pt-28 pb-8 px-4 sm:px-6 bg-gradient-to-b from-navy via-navy/95 to-navy/80 relative overflow-hidden">
        <div className="absolute inset-0 pattern-zellige-gold opacity-30" />
        <div aria-hidden className="absolute -top-20 -right-20 w-[520px] h-[520px] glow-gold opacity-40 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="ornament-divider mb-4">
            <span aria-hidden className="zellige-star text-lg text-golden" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-3 tracking-tight">Explore Stays</h1>
          <p className="text-white/70 text-base md:text-lg mb-8 max-w-xl">Find a place that feels like home. {filtered.length} stays near {location}.</p>
          <PremiumSearchBar />
        </div>
      </section>

      <section className="py-6 px-4 sm:px-6 max-w-7xl mx-auto">
        <DestinationChips />
      </section>

      {/* Toolbar */}
      <section className="py-4 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-2xl font-black text-navy">{filtered.length} places to stay</h2>
            <p className="text-sm text-navy/50">Showing stays based on your search · {guests} {guests === 1 ? 'guest' : 'guests'}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={openSheet}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-navy/10 text-sm font-bold text-navy shadow-sm hover:shadow md:hidden transition-all"
            >
              <SlidersHorizontal size={16} />
              Filters
              {activeFilterCount > 0 && (
                <span className="grid place-items-center min-w-5 h-5 px-1 rounded-full bg-orange text-white text-[11px]">{activeFilterCount}</span>
              )}
            </button>

            <div ref={sortWrapperRef} className="relative hidden sm:block">
              <button
                onClick={() => setSortMenuOpen((o) => !o)}
                aria-haspopup="listbox"
                aria-expanded={sortMenuOpen}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-navy/10 text-sm font-bold text-navy shadow-sm hover:shadow transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-golden"
              >
                {sortLabel}
                <ChevronDown size={14} className={cn('transition-transform', sortMenuOpen && 'rotate-180')} />
              </button>
              <AnimatePresence>
                {sortMenuOpen && (
                  <motion.ul
                    role="listbox"
                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-cream/20 p-1.5 z-40"
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <li key={opt.value}>
                        <button
                          role="option"
                          aria-selected={sortBy === opt.value}
                          onClick={() => { setSortBy(opt.value); setSortMenuOpen(false); }}
                          className={cn(
                            'w-full flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl text-sm font-medium text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-golden',
                            sortBy === opt.value ? 'bg-cream/50 text-navy' : 'text-navy/70 hover:bg-cream/30'
                          )}
                        >
                          {opt.label}
                          {sortBy === opt.value && <Check size={16} className="text-orange shrink-0" />}
                        </button>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            <div className="flex bg-white rounded-xl border border-navy/10 overflow-hidden shadow-sm">
              <button
                onClick={() => setViewMode('list')}
                className={cn('grid place-items-center w-11 h-11 transition-colors', viewMode === 'list' ? 'bg-navy text-white' : 'text-navy/40 hover:text-navy')}
                aria-label="List view"
                aria-pressed={viewMode === 'list'}
              >
                <LayoutGrid size={18} />
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={cn('grid place-items-center w-11 h-11 transition-colors', viewMode === 'map' ? 'bg-navy text-white' : 'text-navy/40 hover:text-navy')}
                aria-label="Map view"
                aria-pressed={viewMode === 'map'}
              >
                <MapIcon size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop compact filter bar */}
        <div className="hidden md:block">
          {showFilters ? (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl border border-cream/20 shadow-sm p-5 mb-2 space-y-5"
            >
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <h3 className="font-black text-navy text-sm mb-2.5">Property type</h3>
                  <div className="flex flex-wrap gap-2">
                    {types.map((t) => (
                      <button
                        key={t}
                        onClick={() => setTypeFilter((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]))}
                        className={chipClass(typeFilter.includes(t))}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-black text-navy text-sm mb-2.5">Minimum rating</h3>
                  <div className="flex flex-wrap gap-2">
                    {RATING_OPTIONS.map((r) => (
                      <button
                        key={r}
                        onClick={() => setRatingFilter(ratingFilter === r ? null : r)}
                        className={chipClass(ratingFilter === r)}
                      >
                        ★ {r}+
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-5">
                <div>
                  <h3 className="font-black text-navy text-sm mb-2.5">Bedrooms</h3>
                  <div className="flex flex-wrap gap-2">
                    {[2, 3, 4].map((n) => (
                      <button
                        key={n}
                        onClick={() => setBedroomsMin(bedroomsMin === n ? null : n)}
                        className={chipClass(bedroomsMin === n)}
                      >
                        {n}+
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-black text-navy text-sm mb-2.5">Baths</h3>
                  <div className="flex flex-wrap gap-2">
                    {[2, 3].map((n) => (
                      <button
                        key={n}
                        onClick={() => setBathsMin(bathsMin === n ? null : n)}
                        className={chipClass(bathsMin === n)}
                      >
                        {n}+
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-black text-navy text-sm mb-2.5">Guests</h3>
                  <div className="flex flex-wrap gap-2">
                    {[2, 4, 6, 8].map((n) => (
                      <button
                        key={n}
                        onClick={() => setGuestsMin(guestsMin === n ? null : n)}
                        className={chipClass(guestsMin === n)}
                      >
                        {n}+
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-black text-navy text-sm mb-2.5">Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {amenities.map((a) => (
                    <button
                      key={a}
                      onClick={() => setAmenitiesFilter((p) => (p.includes(a) ? p.filter((x) => x !== a) : [...p, a]))}
                      className={chipClass(amenitiesFilter.includes(a))}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : null}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters((s) => !s)}
              className={cn('flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border-2 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-golden', showFilters ? 'bg-navy text-cream border-navy' : 'bg-white text-navy border-navy/10 hover:border-golden/60')}
            >
              <SlidersHorizontal size={16} />
              Filters
              {activeFilterCount > 0 && (
                <span className="grid place-items-center min-w-5 h-5 px-1 rounded-full bg-orange text-white text-[11px]">{activeFilterCount}</span>
              )}
            </button>
            {activeFilterCount > 0 && (
              <button
                onClick={resetAll}
                className="text-sm font-bold text-navy/50 hover:text-orange transition-colors"
              >
                Clear all
              </button>
            )}
          </div>
        </div>

        {/* Mobile sort select */}
        <div className="sm:hidden flex items-center gap-2 mb-2">
          <label htmlFor="sort-select" className="sr-only">Sort results</label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl bg-white border border-navy/10 text-sm font-bold text-navy shadow-sm outline-none focus:border-golden/60"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </section>

      <main className="px-4 sm:px-6 max-w-7xl mx-auto pb-24">
        {viewMode === 'map' ? (
          <MapView properties={filtered.map((p) => ({ id: p.id, name: p.name, price: p.price }))} />
        ) : (
          <>
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.map((property, i) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: Math.min(i * 0.03, 0.3) }}
                  >
                    <PropertyCard property={property} eager={i === 0} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-24">
                <div className="w-20 h-20 mx-auto mb-6 grid place-items-center rounded-full bg-cream/50">
                  <SearchX size={40} className="text-navy/40" />
                </div>
                <h3 className="text-2xl font-black text-navy mb-2">No stays found</h3>
                <p className="text-navy/60 mb-6 max-w-md mx-auto">Try adjusting your filters or searching another destination.</p>
                <button
                  onClick={resetAll}
                  className="px-6 py-3 bg-navy text-white font-bold rounded-xl shadow-lg transition-transform hover:scale-[1.02] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-golden"
                >
                  Clear filters
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {/* Mobile bottom sheet */}
      <AnimatePresence>
        {sheetOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSheetOpen(false)}
            className="fixed inset-0 z-[70] bg-navy/60 backdrop-blur-sm md:hidden"
            aria-hidden
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {sheetOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Filters"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-0 inset-x-0 z-[80] md:hidden bg-white rounded-t-3xl shadow-2xl max-h-[85vh] overflow-y-auto pb-[env(safe-area-inset-bottom)]"
          >
            <div className="sticky top-0 bg-white/95 backdrop-blur-sm px-5 pt-3 pb-2 flex items-center justify-between border-b border-navy/5">
              <div />
              <h3 className="text-base font-black text-navy">Filters</h3>
              <button
                onClick={() => setSheetOpen(false)}
                aria-label="Close filters"
                className="grid place-items-center w-10 h-10 rounded-full hover:bg-cream/50 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="px-5 py-4 space-y-6">
              <div>
                <h4 className="font-black text-navy text-sm mb-2.5">Price range</h4>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={draftPrice[0]}
                    min={0}
                    onChange={(e) => setDraftPrice([Math.max(0, Number(e.target.value) || 0), draftPrice[1]])}
                    className="flex-1 px-4 py-3 rounded-xl border border-navy/10 text-sm font-medium text-navy outline-none focus:border-golden/60"
                    aria-label="Minimum price"
                  />
                  <span className="text-navy/30 font-medium">—</span>
                  <input
                    type="number"
                    value={draftPrice[1]}
                    min={draftPrice[0]}
                    onChange={(e) => setDraftPrice([draftPrice[0], Math.max(draftPrice[0], Number(e.target.value) || 0)])}
                    className="flex-1 px-4 py-3 rounded-xl border border-navy/10 text-sm font-medium text-navy outline-none focus:border-golden/60"
                    aria-label="Maximum price"
                  />
                </div>
              </div>

              <div>
                <h4 className="font-black text-navy text-sm mb-2.5">Property type</h4>
                <div className="flex flex-wrap gap-2">
                  {types.map((t) => (
                    <button
                      key={t}
                      onClick={() => setDraftTypes((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]))}
                      className={chipClass(draftTypes.includes(t))}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-black text-navy text-sm mb-2.5">Minimum rating</h4>
                <div className="flex flex-wrap gap-2">
                  {RATING_OPTIONS.map((r) => (
                    <button
                      key={r}
                      onClick={() => setDraftRating(draftRating === r ? null : r)}
                      className={chipClass(draftRating === r)}
                    >
                      ★ {r}+
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-black text-navy text-sm mb-2.5">Bedrooms</h4>
                <div className="flex flex-wrap gap-2">
                  {[2, 3, 4].map((n) => (
                    <button
                      key={n}
                      onClick={() => setDraftBedroomsMin(draftBedroomsMin === n ? null : n)}
                      className={chipClass(draftBedroomsMin === n)}
                    >
                      {n}+
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-black text-navy text-sm mb-2.5">Baths</h4>
                <div className="flex flex-wrap gap-2">
                  {[2, 3].map((n) => (
                    <button
                      key={n}
                      onClick={() => setDraftBathsMin(draftBathsMin === n ? null : n)}
                      className={chipClass(draftBathsMin === n)}
                    >
                      {n}+
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-black text-navy text-sm mb-2.5">Guests</h4>
                <div className="flex flex-wrap gap-2">
                  {[2, 4, 6, 8].map((n) => (
                    <button
                      key={n}
                      onClick={() => setDraftGuestsMin(draftGuestsMin === n ? null : n)}
                      className={chipClass(draftGuestsMin === n)}
                    >
                      {n}+
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-black text-navy text-sm mb-2.5">Amenities</h4>
                <div className="flex flex-wrap gap-2">
                  {amenities.map((a) => (
                    <button
                      key={a}
                      onClick={() => setDraftAmenities((p) => (p.includes(a) ? p.filter((x) => x !== a) : [...p, a]))}
                      className={chipClass(draftAmenities.includes(a))}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-white/95 backdrop-blur-sm px-5 py-4 flex items-center gap-3 border-t border-navy/5">
              <button
                onClick={resetDraft}
                className="flex-1 px-4 py-3.5 rounded-xl border border-navy/10 text-sm font-bold text-navy hover:bg-cream/40 transition-colors"
              >
                Reset
              </button>
              <button
                onClick={applySheet}
                className="flex-[2] px-4 py-3.5 rounded-xl bg-golden hover:bg-orange text-navy text-sm font-black transition-colors shadow-lg"
              >
                Show {draftCount} {draftCount === 1 ? 'stay' : 'stays'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}