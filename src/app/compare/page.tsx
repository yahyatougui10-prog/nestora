"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, X, ArrowLeft, Check, Minus, Star } from 'lucide-react';
import { useCompareContext } from '@/context/CompareContext';
import { FavoriteButton } from '@/components/property/FavoriteButton';
import { Property } from '@/lib/types';

const AMENITY_CHECK: string[] = ['Wifi', 'Parking', 'Pool', 'Gym', 'Kitchen', 'AC', 'Balcony', 'Beachfront', 'Spa', 'Pet friendly'];

export default function ComparePage() {
  const { compareProperties, toggleCompare, clearCompare } = useCompareContext();

  if (compareProperties.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
        <div className="w-16 h-16 rounded-full bg-cream dark:bg-white/5 flex items-center justify-center mb-4">
          <Star size={24} className="text-golden" />
        </div>
        <h1 className="text-2xl font-bold text-navy dark:text-cream">Nothing to compare yet</h1>
        <p className="text-navy/60 dark:text-cream/60 mt-2 max-w-sm">Use the scale icon on property cards to select up to 3 stays and compare them side by side.</p>
        <Link href="/explore" className="mt-6 bg-golden text-navy font-bold px-6 py-3 rounded-full hover:bg-orange transition-colors">Explore stays</Link>
      </div>
    );
  }

  const rows: { label: string; render: (p: Property) => React.ReactNode }[] = [
    {
      label: 'Price / night',
      render: (p) => <span className="font-bold text-lg text-navy dark:text-cream">${p.price}</span>,
    },
    {
      label: 'Location',
      render: (p) => <span className="text-sm text-navy dark:text-cream">{p.location}, {p.country}</span>,
    },
    {
      label: 'Type',
      render: (p) => <span className="text-sm text-navy dark:text-cream capitalize">{p.type}</span>,
    },
    {
      label: 'Guests',
      render: (p) => <span className="text-sm text-navy dark:text-cream">{p.guests}</span>,
    },
    {
      label: 'Bedrooms',
      render: (p) => <span className="text-sm text-navy dark:text-cream">{p.bedrooms}</span>,
    },
    {
      label: 'Beds',
      render: (p) => <span className="text-sm text-navy dark:text-cream">{p.beds}</span>,
    },
    {
      label: 'Bathrooms',
      render: (p) => <span className="text-sm text-navy dark:text-cream">{p.baths}</span>,
    },
    {
      label: 'Rating',
      render: (p) => (
        <span className="flex items-center justify-center gap-1 text-sm font-medium text-navy dark:text-cream">
          <Star size={14} fill="#FFB909" className="text-golden" /> {p.rating}
        </span>
      ),
    },
    {
      label: 'Instant Book',
      render: (p) => <YesNo yes={p.isInstantBook} />,
    },
    {
      label: 'Guest Favorite',
      render: (p) => <YesNo yes={p.isGuestFavorite} />,
    },
    {
      label: `Amenities (${AMENITY_CHECK.length})`,
      render: (p) => (
        <div className="flex flex-col gap-1 items-center">
          {AMENITY_CHECK.map((a) => {
            const has = (p.amenities || []).some((x: string) => x.toLowerCase().includes(a.toLowerCase()));
            return (
              <span key={a} className="flex items-center gap-1 text-xs text-navy/70 dark:text-cream/70">
                {has ? <Check size={12} className="text-green-500" /> : <Minus size={12} className="text-navy/30 dark:text-cream/30" />}
                {a}
              </span>
            );
          })}
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => window.history.back()} className="flex items-center gap-2 text-navy/70 dark:text-cream/70 hover:text-navy dark:hover:text-cream transition-colors">
          <ArrowLeft size={18} /> Back
        </button>
        <button onClick={clearCompare} className="text-sm font-medium text-navy/60 dark:text-cream/60 hover:text-orange transition-colors">Clear all</button>
      </div>

      <h1 className="text-3xl font-bold text-navy dark:text-cream mb-2">Compare stays</h1>
      <p className="text-navy/60 dark:text-cream/60 mb-8">Side-by-side comparison of {compareProperties.length} selected stays.</p>

      <div className="overflow-x-auto pb-4">
        <table className="w-full min-w-[640px] border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="w-40 p-3" />
              {compareProperties.map((p) => (
                <th key={p.id} className="p-3 align-top">
                  <motion.div layout className="relative rounded-3xl overflow-hidden shadow-lg">
                    <img src={p.image} alt={p.name} className="w-full aspect-[4/5] object-cover" />
                    <button
                      onClick={() => toggleCompare(p.id)}
                      aria-label="Remove from compare"
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white shadow"
                    >
                      <X size={16} className="text-navy" />
                    </button>
                    <div className="absolute top-3 left-3">
                      <FavoriteButton propertyId={p.id} />
                    </div>
                  </motion.div>
                  <div className="mt-3 text-center">
                    <h3 className="font-bold text-navy dark:text-cream">{p.name}</h3>
                    <p className="text-sm text-navy/60 dark:text-cream/60 flex items-center justify-center gap-1 mt-1">
                      <MapPin size={12} /> {p.location}, {p.country}
                    </p>
                    <Link href={`/properties/${p.id}`} className="mt-3 inline-block bg-navy dark:bg-cream text-cream dark:text-navy font-bold text-sm px-4 py-2 rounded-full hover:opacity-90 transition-opacity">
                      View details
                    </Link>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-t">
                <td className="p-3 font-medium text-navy/70 dark:text-cream/70 text-sm">{row.label}</td>
                {compareProperties.map((p) => (
                  <td key={p.id} className="p-3 text-center" >{row.render(p)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function YesNo({ yes }: { yes: boolean }) {
  return yes ? (
    <Check size={18} className="text-green-500 mx-auto" />
  ) : (
    <Minus size={18} className="text-navy/30 dark:text-cream/30 mx-auto" />
  );
}