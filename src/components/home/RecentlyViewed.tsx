"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { History, Trash2 } from 'lucide-react';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import PropertyCard from '@/components/property/PropertyCard';

export function RecentlyViewed() {
  const { recentProperties, clearRecent } = useRecentlyViewed();

  if (recentProperties.length === 0) return null;

  return (
    <section className="py-12 px-6 max-w-7xl mx-auto">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-2 flex items-center gap-3">
            <History className="text-golden" /> Recently viewed
          </h2>
          <p className="text-navy/60">Pick up where you left off.</p>
        </div>
        <button
          onClick={clearRecent}
          className="flex items-center gap-2 text-sm font-medium text-navy/50 hover:text-orange transition-colors"
        >
          <Trash2 size={16} /> Clear
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
        {recentProperties.map((p, i) => (
          <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <PropertyCard property={p} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}