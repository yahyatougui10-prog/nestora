"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const SELECT_PROPERTIES = [
  {
    id: 'prop-1',
    name: 'Ocean View Villa',
    location: 'Essaouira, Morocco',
    type: 'Beachfront Villa',
    rating: 4.92,
    reviews: 128,
    beds: 4,
    bedrooms: 3,
    price: 180,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200',
    isGuestFavorite: true,
  },
  {
    id: 'prop-4',
    name: 'Mountain Vista Lodge',
    location: 'Ifrane, Morocco',
    type: 'Mountain Retreat',
    rating: 4.97,
    reviews: 86,
    beds: 6,
    bedrooms: 4,
    price: 320,
    image: 'https://images.unsplash.com/photo-1470770841072-f978f0fb1975?auto=format&fit=crop&q=80&w=1200',
    isGuestFavorite: true,
  },
  {
    id: 'prop-2',
    name: 'Desert Oasis Retreat',
    location: 'Merzouga, Morocco',
    type: 'Desert Retreat',
    rating: 4.89,
    reviews: 104,
    beds: 2,
    bedrooms: 2,
    price: 250,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200',
    isGuestFavorite: true,
  },
];

export default function PremiumCollection() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
        <div className="max-w-2xl">
          <div className="inline-block px-3 py-1 bg-golden/20 text-golden rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            Exclusivity
          </div>
          <h2 className="text-5xl font-bold text-navy mb-4">NESTORA SELECT</h2>
          <p className="text-xl text-navy/60 font-light">
            Handpicked homes for extraordinary trips. Each property is vetted for architecture,
            service, and experience.
          </p>
        </div>
        <Link href="/explore" className="text-navy font-bold hover:text-orange transition-colors flex items-center gap-2 group">
          View all select properties
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-12">
        {SELECT_PROPERTIES.map((prop) => (
          <motion.div
            key={prop.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative group grid grid-cols-1 lg:grid-cols-3 gap-8 bg-white p-6 rounded-[40px] shadow-xl border border-cream/20 overflow-hidden"
          >
            <Link href={`/properties/${prop.id}`} className="lg:col-span-2 relative aspect-video rounded-3xl overflow-hidden">
              <img
                src={prop.image}
                alt={prop.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 px-3 py-1 bg-navy text-golden rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
                SELECTED
              </div>
            </Link>

            <div className="flex flex-col justify-center gap-4">
              <div>
                <h3 className="text-3xl font-bold text-navy mb-2">{prop.name}</h3>
                <p className="text-navy/60 font-medium">{prop.location}</p>
              </div>

              <div className="flex items-center gap-4 text-sm font-medium text-navy/80">
                <div className="flex items-center gap-1">
                  <span className="text-golden font-bold">{prop.rating}</span>
                  <span className="text-navy/40">({prop.reviews} reviews)</span>
                </div>
                <span className="text-navy/20">|</span>
                <span>{prop.bedrooms} Bedrooms</span>
                <span className="text-navy/20">|</span>
                <span>{prop.beds} Beds</span>
              </div>

              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-navy">${prop.price}</span>
                <span className="text-navy/60">/ night</span>
              </div>

              <Link
                href={`/properties/${prop.id}`}
                className="mt-6 w-full bg-navy text-cream font-bold py-4 rounded-2xl hover:bg-orange transition-colors shadow-lg text-center"
              >
                Reserve Now
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
