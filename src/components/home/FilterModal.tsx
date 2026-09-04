"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FilterModal({ isOpen, onClose }: FilterModalProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([50, 500]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);

  const types = ['Apartment', 'Villa', 'House', 'Cabin', 'Riad', 'Hotel', 'Guesthouse', 'Resort'];
  const amenities = ['Wi-Fi', 'Pool', 'Kitchen', 'Parking', 'Air conditioning', 'Workspace', 'Ocean view', 'Washing machine'];
  const ratings = [4.5, 4.0, 3.5];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-white border-b border-navy/5 p-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={20} className="text-golden" />
              <h2 className="text-xl font-bold text-navy">Filters</h2>
            </div>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-cream/50 transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="p-6 space-y-8">
            {/* Price Range */}
            <div>
              <h3 className="font-bold text-navy mb-4">Price range</h3>
              <div className="flex items-center gap-4 mb-3">
                <div className="flex-1">
                  <label className="text-xs text-navy/50 block mb-1">Min</label>
                  <input type="number" value={priceRange[0]} onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])} className="w-full p-3 rounded-xl border border-navy/10 outline-none focus:border-golden/40" />
                </div>
                <span className="text-navy/30 mt-4">—</span>
                <div className="flex-1">
                  <label className="text-xs text-navy/50 block mb-1">Max</label>
                  <input type="number" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])} className="w-full p-3 rounded-xl border border-navy/10 outline-none focus:border-golden/40" />
                </div>
              </div>
              <div className="flex justify-between text-xs text-navy/40">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}+</span>
              </div>
            </div>

            {/* Property Type */}
            <div>
              <h3 className="font-bold text-navy mb-4">Property type</h3>
              <div className="flex flex-wrap gap-2">
                {types.map((type) => (
                  <button key={type} onClick={() => setSelectedTypes((prev) => prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type])}
                    className={`px-4 py-2 rounded-xl border-2 text-sm font-medium transition-all ${selectedTypes.includes(type) ? 'border-golden bg-golden/10 text-navy' : 'border-navy/10 text-navy/50'}`}>
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div>
              <h3 className="font-bold text-navy mb-4">Rating</h3>
              <div className="flex gap-2">
                {ratings.map((r) => (
                  <button key={r} onClick={() => setSelectedRatings((prev) => prev.includes(r) ? prev.filter((v) => v !== r) : [...prev, r])}
                    className={`flex items-center gap-1 px-4 py-2 rounded-xl border-2 text-sm font-medium transition-all ${selectedRatings.includes(r) ? 'border-golden bg-golden/10 text-navy' : 'border-navy/10 text-navy/50'}`}>
                    <span className="text-golden">★</span> {r}+
                  </button>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h3 className="font-bold text-navy mb-4">Amenities</h3>
              <div className="grid grid-cols-2 gap-2">
                {amenities.map((amenity) => (
                  <button key={amenity} onClick={() => setSelectedAmenities((prev) => prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity])}
                    className={`px-4 py-2 rounded-xl border-2 text-sm font-medium text-left transition-all ${selectedAmenities.includes(amenity) ? 'border-golden bg-golden/10 text-navy' : 'border-navy/10 text-navy/50'}`}>
                    {selectedAmenities.includes(amenity) && '✓ '}{amenity}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="sticky bottom-0 bg-white border-t border-navy/5 p-6 flex justify-between items-center">
            <button onClick={() => { setPriceRange([50, 500]); setSelectedTypes([]); setSelectedAmenities([]); setSelectedRatings([]); }}
              className="text-navy font-bold hover:text-orange transition-colors text-sm">
              Clear all
            </button>
            <Button onClick={onClose}>Show {6} results</Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}