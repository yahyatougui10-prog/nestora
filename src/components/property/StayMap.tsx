"use client";

import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, X } from 'lucide-react';
import { Property } from '@/lib/types';
import { useRouter } from 'next/navigation';

interface StayMapProps {
  properties: Property[];
  activeId?: string | null;
  onSelect?: (id: string | null) => void;
}

const LON_BOUNDS: [number, number] = [-11, -2];
const LAT_BOUNDS: [number, number] = [28, 36];

export function StayMap({ properties, activeId, onSelect }: StayMapProps) {
  const router = useRouter();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const positioned = useMemo(() => {
    return properties.map((p) => {
      const x = ((p.lng - LON_BOUNDS[0]) / (LON_BOUNDS[1] - LON_BOUNDS[0])) * 100;
      const y = 100 - ((p.lat - LAT_BOUNDS[0]) / (LAT_BOUNDS[1] - LAT_BOUNDS[0])) * 100;
      return { ...p, x, y };
    });
  }, [properties]);

  const active = activeId ? positioned.find((p) => p.id === activeId) : null;

  return (
    <div className="relative w-full aspect-[4/5] sm:aspect-[16/11] rounded-3xl overflow-hidden border border-navy/10 bg-gradient-to-br from-[#e8f0f7] via-[#dce6f0] to-[#c8d6e4] shadow-inner">
      {/* Stylized landmass blobs */}
      <div className="absolute inset-0 opacity-80">
        <div className="absolute rounded-full bg-[#cfdfc8] blur-md" style={{ left: '20%', top: '55%', width: '60%', height: '48%' }} />
        <div className="absolute rounded-full bg-[#d8e5d0] blur-md" style={{ left: '5%', top: '20%', width: '35%', height: '30%' }} />
        <div className="absolute rounded-full bg-[#bcd3c0] blur-sm" style={{ left: '55%', top: '10%', width: '30%', height: '25%' }} />
      </div>
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(#021F59_1px,transparent_1px),linear-gradient(90deg,#021F59_1px,transparent_1px)] bg-[size:40px_40px]" />

      {positioned.map((p) => {
        const isActive = p.id === activeId;
        const isHovered = p.id === hoveredId;
        const emphasized = isActive || isHovered;
        return (
          <button
            key={p.id}
            onClick={() => onSelect?.(isActive ? null : p.id)}
            onMouseEnter={() => setHoveredId(p.id)}
            onMouseLeave={() => setHoveredId(null)}
            aria-label={p.name}
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none group"
          >
            <motion.div
              animate={{ scale: emphasized ? 1.25 : 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className={`relative flex items-center gap-1 px-3 py-1.5 rounded-full shadow-lg font-bold text-sm transition-colors cursor-pointer pointer-events-auto ${
                isActive
                  ? 'bg-navy text-cream ring-2 ring-golden'
                  : 'bg-white text-navy border border-navy/20 hover:bg-golden hover:text-navy'
              }`}
            >
              <MapPin size={14} />
              <span>${p.price}</span>
            </motion.div>

            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -4 }}
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 translate-y-full w-56 bg-white rounded-2xl shadow-xl border border-navy/10 p-2 z-20 text-left"
                >
                  <img src={p.image} alt={p.name} className="w-full h-24 object-cover rounded-lg" />
                  <div className="p-2">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-navy text-sm leading-tight">{p.name}</h4>
                      <button onClick={(e) => { e.stopPropagation(); onSelect?.(null); }} aria-label="Close" className="text-navy/50 hover:text-navy">
                        <X size={14} />
                      </button>
                    </div>
                    <p className="text-navy/60 text-xs mt-0.5">{p.location}, {p.country}</p>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="font-bold text-navy text-sm">${p.price}<span className="font-normal text-navy/50">/night</span></span>
                      <button onClick={() => router.push(`/properties/${p.id}`)} className="bg-golden text-navy font-bold text-xs px-3 py-1.5 rounded-full hover:bg-orange transition-colors">
                        View
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        );
      })}

      {active && (
        <div className="absolute top-3 left-3 z-20 inline-flex items-center gap-1 bg-navy/85 text-cream text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur">
          <MapPin size={12} /> {active.location}, {active.country}
        </div>
      )}
    </div>
  );
}