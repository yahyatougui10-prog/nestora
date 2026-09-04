"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Link from 'next/link';
import { useCompareContext } from '@/context/CompareContext';

export function CompareBar() {
  const { compareProperties, clearCompare, compareIds } = useCompareContext();

  return (
    <AnimatePresence>
      {compareIds.length > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="flex items-center gap-3 bg-navy text-cream rounded-full px-5 py-3 shadow-2xl border border-cream/20">
            <div className="flex items-center gap-1.5">
              {compareProperties.map((p) => (
                <div key={p.id} className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-golden">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                </div>
              ))}
              {compareIds.length < 3 && (
                <div className="w-9 h-9 rounded-full border-2 border-dashed border-cream/40 flex items-center justify-center text-cream/50 text-xs font-bold">
                  +
                </div>
              )}
            </div>
            <span className="text-sm font-medium hidden sm:block">{compareIds.length}/3 selected</span>
            <Link href="/compare" className="bg-golden text-navy font-bold text-sm px-5 py-2 rounded-full hover:bg-orange transition-colors">
              <span className="hidden sm:inline">Compare ({compareIds.length})</span>
              <span className="sm:hidden">Compare</span>
            </Link>
            <button onClick={clearCompare} aria-label="Clear comparison" className="p-2 rounded-full hover:bg-white/10 transition-colors">
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}